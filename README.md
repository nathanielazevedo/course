# course

## Generate chapter audio (local script)

Use this script to generate one mp3 narration file for a chapter from MDX text.

1. Export your OpenAI key:

```bash
export OPENAI_API_KEY="your_key_here"
```

2. Run the script with a chapter selector (number, slug, or full title):

```bash
npm run tts:chapter -- 1
npm run tts:chapter -- the-machine
npm run tts:chapter -- "The Machine"
```

Optional flags:

```bash
npm run tts:chapter -- the-machine --voice alloy --model gpt-4o-mini-tts --out generated-audio/chapters
```

Output files are saved as `generated-audio/chapters/<chapter-slug>.mp3` by default.
