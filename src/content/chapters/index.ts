import type { ComponentType } from "react";

const modules = import.meta.glob<{ default: ComponentType }>("./*/*.mdx", {
  eager: true,
});

export function getSectionContent(
  chapterSlug: string,
  sectionSlug: string,
): ComponentType | null {
  const mod = modules[`./${chapterSlug}/${sectionSlug}.mdx`];
  return mod?.default ?? null;
}
