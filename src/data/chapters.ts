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

const data: {
  title: string;
  videoId?: string;
  description?: string;
  sections?: string[];
}[] = [
  {
    title: "The Machine",
    videoId: "dQw4w9WgXcQ",
    description:
      "What a computer is at the hardware level — the parts, how data is encoded, and how the CPU executes code.",
    sections: [
      "The Parts of a Computer",
      "Bits and Bytes",
      "The Instruction Cycle",
      "The Memory Hierarchy",
      "Buses and Interrupts",
    ],
  },
  {
    title: "Software and Execution",
    description:
      "How source code becomes a running program — compilation, memory layout, linking, runtimes, and the boundary between software and the OS.",
    sections: [
      "From Source to Machine Code",
      "The Stack and the Heap",
      "Linking and Libraries",
      "Runtimes and Virtual Machines",
      "System Calls",
    ],
  },
  { title: "Operating Systems" },
  { title: "Processes and Concurrency" },
  { title: "Networking and Communication" },
  { title: "The Web as a System" },
  { title: "Data and Persistence" },
  { title: "Servers and Distributed Systems" },
  { title: "Infrastructure, Virtualization, and Cloud" },
  { title: "Performance, Reliability, and Security" },
  { title: "The Life of a Request" },
];

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

export const chapters: Chapter[] = data.map((d, i) => ({
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

export const getChapterBySlug = (slug: string) =>
  chapters.find((c) => c.slug === slug);

export const getSectionBySlug = (chapterSlug: string, sectionSlug: string) => {
  const chapter = getChapterBySlug(chapterSlug);
  if (!chapter) return null;
  const section = chapter.sections.find((s) => s.slug === sectionSlug);
  return section ? { chapter, section } : null;
};
