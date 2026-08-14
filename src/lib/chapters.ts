export type Section = {
  number: number;
  title: string;
  slug: string;
};

export type Chapter = {
  number: number;
  title: string;
  slug: string;
  videoId?: string;
  description?: string;
  sections: Section[];
};

export type ChapterInput = {
  title: string;
  videoId?: string;
  description?: string;
  sections?: string[];
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

export function buildChapters(data: ChapterInput[]): Chapter[] {
  return data.map((d, i) => ({
    number: i + 1,
    title: d.title,
    slug: slugify(d.title),
    videoId: d.videoId,
    description: d.description,
    sections: (d.sections ?? []).map((s, j) => ({
      number: j + 1,
      title: s,
      slug: slugify(s),
    })),
  }));
}

export function makeChapterHelpers(chapters: Chapter[]) {
  const getChapterBySlug = (slug: string) =>
    chapters.find((c) => c.slug === slug);

  const getSectionBySlug = (chapterSlug: string, sectionSlug: string) => {
    const chapter = getChapterBySlug(chapterSlug);
    if (!chapter) return null;
    const section = chapter.sections.find((s) => s.slug === sectionSlug);
    return section ? { chapter, section } : null;
  };

  return { chapters, getChapterBySlug, getSectionBySlug };
}
