export type MarkdownSegment =
  | { type: "markdown"; body: string }
  | { type: "executionResult"; code: string; info: string };

export function splitMarkdownByExecutionResults(source: string): MarkdownSegment[] {
  const segments: MarkdownSegment[] = [];
  const re =
    /(?:^|[\r\n]{2,})실행 결과:\s*[\r\n]+\s*(```([^\r\n]*)[\r\n]([\s\S]*?)```)/g;

  let lastIndex = 0;
  let m: RegExpExecArray | null;

  while ((m = re.exec(source)) !== null) {
    if (m.index > lastIndex) {
      segments.push({
        type: "markdown",
        body: source.slice(lastIndex, m.index),
      });
    }
    segments.push({
      type: "executionResult",
      code: m[3] ?? "",
      info: (m[2] ?? "").trim(),
    });
    lastIndex = re.lastIndex;
  }

  if (lastIndex < source.length) {
    segments.push({
      type: "markdown",
      body: source.slice(lastIndex),
    });
  }

  return segments;
}
