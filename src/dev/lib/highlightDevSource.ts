import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import markdown from "highlight.js/lib/languages/markdown";
import "highlight.js/styles/github.css";

let languagesRegistered = false;

function ensureHighlightLanguages() {
  if (languagesRegistered) return;
  hljs.registerLanguage("javascript", javascript);
  hljs.registerLanguage("markdown", markdown);
  languagesRegistered = true;
}

/** `.js` `.jsx` 는 javascript, `.md` 는 markdown 으로 highlight.js 하이라이트 */
export function highlightDevSource(filePath: string, content: string): string {
  ensureHighlightLanguages();
  const ext = filePath.includes(".") ? (filePath.split(".").pop()?.toLowerCase() ?? "") : "";
  const language = ext === "md" ? "markdown" : "javascript";
  try {
    return hljs.highlight(content, { language, ignoreIllegals: true }).value;
  } catch {
    return hljs.highlightAuto(content).value;
  }
}
