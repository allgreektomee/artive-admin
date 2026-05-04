import type { ComponentType } from "react";

export type LiveExampleEntry = {
  id: string;
  title: string;
  description?: string;
  Component: ComponentType<object>;
};

export function getLiveExampleEntry(id: string): LiveExampleEntry | null;
