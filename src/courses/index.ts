import { buildChapters, makeChapterHelpers } from "../lib/chapters";
import type { Chapter } from "../lib/chapters";

import { chapterInput as systemsThinkingInput } from "./systems-thinking/chapters";
import { getSectionContent as getSystemsThinkingContent } from "./systems-thinking/content";

import { chapterInput as labAutomationInput } from "./lab-automation/chapters";
import { getSectionContent as getLabAutomationContent } from "./lab-automation/content";

export type { Chapter, Section } from "../lib/chapters";

export type Course = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  chapters: Chapter[];
  getChapterBySlug: (slug: string) => Chapter | undefined;
  getSectionBySlug: (
    chapterSlug: string,
    sectionSlug: string,
  ) => { chapter: Chapter; section: Chapter["sections"][number] } | null;
  getSectionContent: (
    chapterSlug: string,
    sectionSlug: string,
  ) => ReturnType<typeof getSystemsThinkingContent>;
};

export const courses: Course[] = [
  {
    slug: "systems-thinking",
    title: "From Web Developer to Systems Thinker",
    tagline: "First Principles for the Age of AI",
    description:
      "How computers, networks, and the software running on them actually work — from bits and bytes up through distributed systems.",
    ...makeChapterHelpers(buildChapters(systemsThinkingInput)),
    getSectionContent: getSystemsThinkingContent,
  },
  {
    slug: "lab-automation",
    title: "Lab Automation",
    tagline: "First Principles for the Automated Lab",
    description:
      "How the automated laboratory works — from liquid handling and instruments through scheduling, LIMS, and validation in a regulated environment.",
    ...makeChapterHelpers(buildChapters(labAutomationInput)),
    getSectionContent: getLabAutomationContent,
  },
];

export const getCourseBySlug = (slug: string) =>
  courses.find((c) => c.slug === slug);

// The homepage picker doesn't care about a course's internal shape (chapters
// vs. reference + practice) — it just needs something to list and link to.
export type CatalogEntry = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
};

export const catalog: CatalogEntry[] = [
  ...courses.map(({ slug, title, tagline, description }) => ({
    slug,
    title,
    tagline,
    description,
  })),
  {
    slug: "dsa",
    title: "Data Structures & Algorithms",
    tagline: "Reference and Practice",
    description:
      "The common data structures at a glance — what each one is, how it behaves, its time complexity — with practice problems you can solve and test right in the browser.",
  },
];
