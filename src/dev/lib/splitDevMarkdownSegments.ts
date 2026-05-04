export type DevMarkdownSegment =
  | { type: "markdown"; body: string }
  | { type: "executionResult"; code: string; info: string }
  | { type: "liveExample"; id: string };

function findNextExecutionResult(
  source: string,
  from: number,
): { start: number; end: number; info: string; code: string } | null {
  const sub = source.slice(from);
  const re =
    /(?:^|[\r\n]{2,})실행 결과:\s*[\r\n]+\s*(```([^\r\n]*)[\r\n]([\s\S]*?)```)/;
  const m = re.exec(sub);
  if (!m) return null;
  return {
    start: from + m.index,
    end: from + m.index + m[0].length,
    info: (m[2] ?? "").trim(),
    code: m[3] ?? "",
  };
}

function findNextLiveExample(
  source: string,
  from: number,
): { start: number; end: number; id: string } | null {
  const sub = source.slice(from);
  const re = /```react-live\s*\n([\s\S]*?)```/;
  const m = re.exec(sub);
  if (!m) return null;
  const inner = (m[1] ?? "").trim();
  const firstLine = inner.split(/\r?\n/)[0]?.trim() ?? "";
  return {
    start: from + m.index,
    end: from + m.index + m[0].length,
    id: firstLine,
  };
}

export function splitDevMarkdownSegments(source: string): DevMarkdownSegment[] {
  const segments: DevMarkdownSegment[] = [];
  let lastIndex = 0;

  while (lastIndex < source.length) {
    const exec = findNextExecutionResult(source, lastIndex);
    const live = findNextLiveExample(source, lastIndex);

    type Next =
      | { kind: "exec"; start: number; end: number; info: string; code: string }
      | { kind: "live"; start: number; end: number; id: string };

    let next: Next | null = null;
    if (exec && live) {
      next =
        exec.start <= live.start
          ? {
              kind: "exec",
              start: exec.start,
              end: exec.end,
              info: exec.info,
              code: exec.code,
            }
          : {
              kind: "live",
              start: live.start,
              end: live.end,
              id: live.id,
            };
    } else if (exec) {
      next = {
        kind: "exec",
        start: exec.start,
        end: exec.end,
        info: exec.info,
        code: exec.code,
      };
    } else if (live) {
      next = {
        kind: "live",
        start: live.start,
        end: live.end,
        id: live.id,
      };
    } else {
      break;
    }

    if (next.start > lastIndex) {
      segments.push({ type: "markdown", body: source.slice(lastIndex, next.start) });
    }
    if (next.kind === "exec") {
      segments.push({
        type: "executionResult",
        code: next.code,
        info: next.info,
      });
    } else {
      segments.push({ type: "liveExample", id: next.id });
    }
    lastIndex = next.end;
  }

  if (lastIndex < source.length) {
    segments.push({ type: "markdown", body: source.slice(lastIndex) });
  }

  return segments;
}
