import type { ComponentType } from "react";

export type LiveExampleEntry = {
  id: string;
  title: string;
  description?: string;
  /** Markdown 옆에 보여 줄 예제 소스(하이라이트). */
  sourceCode?: string;
  Component: ComponentType<object>;
};

export function getLiveExampleEntry(id: string): LiveExampleEntry | null;
