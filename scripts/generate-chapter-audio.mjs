#!/usr/bin/env node
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const ROOT = process.cwd();
const CHAPTERS_DIR = path.join(ROOT, "src", "content", "chapters");
const CHAPTERS_META_FILE = path.join(ROOT, "src", "data", "chapters.ts");
const DEFAULT_MODEL = process.env.OPENAI_TTS_MODEL || "gpt-4o-mini-tts";
const DEFAULT_VOICE = process.env.OPENAI_TTS_VOICE || "alloy";

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function parseArgs(argv) {
  const args = {
    chapter: "",
    outDir: path.join(ROOT, "generated-audio", "chapters"),
    voice: DEFAULT_VOICE,
    model: DEFAULT_MODEL,
  };

  for (let i = 2; i < argv.length; i += 1) {
    const token = argv[i];

    if (token === "--out" && argv[i + 1]) {
      args.outDir = path.resolve(ROOT, argv[i + 1]);
      i += 1;
      continue;
    }

    if (token === "--voice" && argv[i + 1]) {
      args.voice = argv[i + 1];
      i += 1;
      continue;
    }

    if (token === "--model" && argv[i + 1]) {
      args.model = argv[i + 1];
      i += 1;
      continue;
    }

    if (token === "--help" || token === "-h") {
      printHelp();
      process.exit(0);
    }

    if (!token.startsWith("--") && !args.chapter) {
      args.chapter = token;
      continue;
    }

    console.error(`Unknown argument: ${token}`);
    printHelp();
    process.exit(1);
  }

  return args;
}

function printHelp() {
  console.log("Generate chapter narration audio from MDX content using OpenAI TTS.");
  console.log("");
  console.log("Usage:");
  console.log("  node scripts/generate-chapter-audio.mjs <chapter> [--voice alloy] [--model gpt-4o-mini-tts] [--out generated-audio/chapters]");
  console.log("");
  console.log("Chapter selector examples:");
  console.log("  1");
  console.log("  the-machine");
  console.log("  \"The Machine\"");
  console.log("");
  console.log("Environment variables:");
  console.log("  OPENAI_API_KEY (required)");
  console.log("  OPENAI_TTS_MODEL (optional default model)");
  console.log("  OPENAI_TTS_VOICE (optional default voice)");
}

function getChapterDirectories() {
  if (!existsSync(CHAPTERS_DIR)) {
    throw new Error(`Missing chapters directory: ${CHAPTERS_DIR}`);
  }

  return readdirSync(CHAPTERS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));
}

function getChapterMetadata(chapterDirs) {
  if (!existsSync(CHAPTERS_META_FILE)) {
    return chapterDirs.map((slug, index) => ({ number: index + 1, slug, title: slug }));
  }

  const src = readFileSync(CHAPTERS_META_FILE, "utf8");
  const titleMatches = [...src.matchAll(/title:\s*"([^"]+)"/g)].map((m) => m[1]);
  const mapped = titleMatches.map((title, index) => ({
    number: index + 1,
    title,
    slug: slugify(title),
  }));

  const filtered = mapped.filter((item) => chapterDirs.includes(item.slug));
  if (filtered.length > 0) return filtered;

  return chapterDirs.map((slug, index) => ({ number: index + 1, slug, title: slug }));
}

function resolveChapter(query, chapterMeta) {
  if (!query) return null;

  if (/^\d+$/.test(query)) {
    const n = Number(query);
    return chapterMeta.find((c) => c.number === n) || null;
  }

  const normalized = query.toLowerCase().trim();
  return (
    chapterMeta.find((c) => c.slug === normalized) ||
    chapterMeta.find((c) => c.title.toLowerCase() === normalized) ||
    chapterMeta.find((c) => c.slug === slugify(normalized)) ||
    null
  );
}

function stripMdxToSpeechText(content) {
  return content
    .replace(/^---[\s\S]*?---\s*/m, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`]*`/g, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^>\s?/gm, "")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "")
    .replace(/[*_~]/g, "")
    .replace(/\r/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function buildChapterText(chapterSlug) {
  const chapterPath = path.join(CHAPTERS_DIR, chapterSlug);
  if (!existsSync(chapterPath)) {
    throw new Error(`Could not find chapter folder: ${chapterPath}`);
  }

  const sectionFiles = readdirSync(chapterPath)
    .filter((name) => name.endsWith(".mdx"))
    .sort((a, b) => a.localeCompare(b));

  if (sectionFiles.length === 0) {
    throw new Error(`No .mdx files found in ${chapterPath}`);
  }

  const parts = sectionFiles.map((fileName) => {
    const fullPath = path.join(chapterPath, fileName);
    const raw = readFileSync(fullPath, "utf8");
    const text = stripMdxToSpeechText(raw);
    const sectionName = fileName.replace(/\.mdx$/, "").replace(/-/g, " ");
    return `Section: ${sectionName}\n\n${text}`;
  });

  return parts.join("\n\n");
}

async function generateAudio({ text, model, voice }) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is missing. Set it in your shell before running this script.");
  }

  const response = await fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      voice,
      input: text,
      response_format: "mp3",
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI API error (${response.status}): ${errorText}`);
  }

  const audioBuffer = Buffer.from(await response.arrayBuffer());
  return audioBuffer;
}

function printChapterList(chapterMeta) {
  console.log("Available chapters:");
  for (const chapter of chapterMeta) {
    console.log(`${chapter.number}. ${chapter.title} (${chapter.slug})`);
  }
}

async function main() {
  const args = parseArgs(process.argv);
  const chapterDirs = getChapterDirectories();
  const chapterMeta = getChapterMetadata(chapterDirs);

  if (!args.chapter) {
    printHelp();
    console.log("");
    printChapterList(chapterMeta);
    process.exit(1);
  }

  const chapter = resolveChapter(args.chapter, chapterMeta);
  if (!chapter) {
    console.error(`Unknown chapter selector: ${args.chapter}`);
    console.log("");
    printChapterList(chapterMeta);
    process.exit(1);
  }

  const text = buildChapterText(chapter.slug);
  if (!text) {
    throw new Error(`No text content extracted for chapter: ${chapter.slug}`);
  }

  mkdirSync(args.outDir, { recursive: true });

  console.log(`Generating chapter audio for ${chapter.title}...`);
  console.log(`Model: ${args.model} | Voice: ${args.voice}`);

  const audio = await generateAudio({
    text,
    model: args.model,
    voice: args.voice,
  });

  const outputPath = path.join(args.outDir, `${chapter.slug}.mp3`);
  writeFileSync(outputPath, audio);

  console.log(`Saved: ${outputPath}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
