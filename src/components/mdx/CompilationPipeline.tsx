import { Fragment, useState } from "react";
import { Box, Stack, Typography, Button, ButtonBase } from "@mui/material";

const MONO =
  'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace';

type StageId = "source" | "tokens" | "ast" | "ir" | "assembly" | "bytes";

const STAGES: { id: StageId; label: string; caption: string }[] = [
  {
    id: "source",
    label: "Source",
    caption:
      "What you wrote. Human-readable, easy to think in, meaningless to the CPU.",
  },
  {
    id: "tokens",
    label: "Tokens",
    caption:
      "The lexer breaks the source text into the smallest meaningful pieces (keywords, identifiers, operators, literals).",
  },
  {
    id: "ast",
    label: "AST",
    caption:
      "The parser arranges those tokens into a tree that captures structure and operator precedence.",
  },
  {
    id: "ir",
    label: "IR",
    caption:
      "An intermediate representation: a flat sequence of simple operations using temporaries. Easier for the compiler to analyze and optimize.",
  },
  {
    id: "assembly",
    label: "Assembly",
    caption:
      "Machine instructions written as readable mnemonics. Each line corresponds to one CPU instruction for the target ISA (x86-64 here).",
  },
  {
    id: "bytes",
    label: "Bytes",
    caption:
      "The final form: just bytes. This is what gets loaded into memory and fed to the CPU one instruction at a time.",
  },
];

const SOURCE = "let x = (3 + 4) * 5;";

const TOKENS = [
  { type: "LET", value: "let" },
  { type: "IDENT", value: "x" },
  { type: "EQUALS", value: "=" },
  { type: "LPAREN", value: "(" },
  { type: "NUMBER", value: "3" },
  { type: "PLUS", value: "+" },
  { type: "NUMBER", value: "4" },
  { type: "RPAREN", value: ")" },
  { type: "STAR", value: "*" },
  { type: "NUMBER", value: "5" },
  { type: "SEMI", value: ";" },
];

const IR_LINES = ["t1 = 3 + 4", "t2 = t1 * 5", "x  = t2"];

const ASSEMBLY = [
  { instr: "mov  eax, 3", comment: "load constant 3" },
  { instr: "add  eax, 4", comment: "eax = eax + 4   (= 7)" },
  { instr: "imul eax, eax, 5", comment: "eax = eax * 5   (= 35)" },
  { instr: "mov  [x], eax", comment: "store eax into the memory slot for x" },
];

const BYTES_LINES = [
  { bytes: "B8 03 00 00 00", asm: "mov  eax, 3" },
  { bytes: "83 C0 04", asm: "add  eax, 4" },
  { bytes: "6B C0 05", asm: "imul eax, eax, 5" },
  { bytes: "89 05 ?? ?? ?? ??", asm: "mov  [x], eax" },
];

export default function CompilationPipeline() {
  const [idx, setIdx] = useState(0);
  const stage = STAGES[idx];

  return (
    <Box
      sx={{
        my: 3,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1,
        bgcolor: "background.default",
      }}
    >
      <Box sx={{ p: { xs: 2, sm: 3 } }}>
        <Stack spacing={3}>
          <StageNav current={idx} onSelect={setIdx} />

          <Typography
            variant="body2"
            sx={{ color: "text.secondary", lineHeight: 1.65 }}
          >
            {stage.caption}
          </Typography>

          <Box sx={{ minHeight: 220 }}>
            {stage.id === "source" && <SourceView />}
            {stage.id === "tokens" && <TokensView />}
            {stage.id === "ast" && <ASTView />}
            {stage.id === "ir" && <IRView />}
            {stage.id === "assembly" && <AssemblyView />}
            {stage.id === "bytes" && <BytesView />}
          </Box>

          <Stack direction="row" justifyContent="space-between" spacing={2}>
            <Button
              onClick={() => setIdx((i) => Math.max(0, i - 1))}
              disabled={idx === 0}
              sx={{
                color: "text.secondary",
                "&:hover": { bgcolor: "transparent", color: "text.primary" },
                "&.Mui-disabled": { color: "text.disabled" },
              }}
            >
              ← Previous
            </Button>
            <Button
              onClick={() => setIdx((i) => Math.min(STAGES.length - 1, i + 1))}
              disabled={idx === STAGES.length - 1}
              variant="contained"
              sx={{
                bgcolor: "text.primary",
                color: "background.default",
                "&:hover": { bgcolor: "text.primary", opacity: 0.85 },
                "&.Mui-disabled": {
                  bgcolor: "text.primary",
                  color: "background.default",
                  opacity: 0.3,
                },
              }}
            >
              Next →
            </Button>
          </Stack>
        </Stack>
      </Box>

      <Box
        sx={{
          px: { xs: 2, sm: 3 },
          py: 1.25,
          borderTop: "1px solid",
          borderColor: "divider",
          bgcolor: "grey.50",
        }}
      >
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          one program at every level — what you write at the top, what the CPU
          eats at the bottom
        </Typography>
      </Box>
    </Box>
  );
}

function StageNav({
  current,
  onSelect,
}: {
  current: number;
  onSelect: (i: number) => void;
}) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{ flexWrap: "wrap", gap: 0.5 }}
    >
      {STAGES.map((s, i) => {
        const active = i === current;
        const visited = i < current;
        return (
          <Fragment key={s.id}>
            <ButtonBase
              onClick={() => onSelect(i)}
              sx={{
                px: 1,
                py: 0.5,
                fontSize: { xs: "0.75rem", sm: "0.8125rem" },
                fontWeight: active ? 600 : 500,
                color: active
                  ? "text.primary"
                  : visited
                    ? "text.primary"
                    : "text.secondary",
                opacity: active || visited ? 1 : 0.6,
                borderBottom: active ? "2px solid" : "2px solid transparent",
                borderColor: active ? "text.primary" : "transparent",
                borderRadius: 0,
                "&:hover": { color: "text.primary", opacity: 1 },
              }}
            >
              {s.label}
            </ButtonBase>
            {i < STAGES.length - 1 && (
              <Typography
                aria-hidden
                sx={{
                  color: "text.secondary",
                  fontSize: "0.75rem",
                  mx: 0.25,
                  userSelect: "none",
                }}
              >
                →
              </Typography>
            )}
          </Fragment>
        );
      })}
    </Stack>
  );
}

function SourceView() {
  return (
    <Box
      sx={{
        p: 2,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 0.5,
        bgcolor: "grey.50",
      }}
    >
      <Typography
        sx={{
          fontFamily: MONO,
          fontSize: "1rem",
          lineHeight: 1.6,
        }}
      >
        {SOURCE}
      </Typography>
    </Box>
  );
}

function TokensView() {
  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 0.5,
        overflow: "hidden",
      }}
    >
      {TOKENS.map((t, i) => (
        <Stack
          key={i}
          direction="row"
          spacing={2}
          sx={{
            px: 2,
            py: 0.75,
            borderBottom:
              i === TOKENS.length - 1 ? "none" : "1px solid",
            borderColor: "divider",
            fontFamily: MONO,
            fontSize: "0.8125rem",
          }}
        >
          <Typography
            sx={{
              fontFamily: MONO,
              fontSize: "0.75rem",
              color: "text.secondary",
              width: "6em",
              flexShrink: 0,
            }}
          >
            {t.type}
          </Typography>
          <Typography sx={{ fontFamily: MONO, fontSize: "0.8125rem" }}>
            "{t.value}"
          </Typography>
        </Stack>
      ))}
    </Box>
  );
}

function ASTView() {
  const nodes: { id: string; label: string; x: number; y: number }[] = [
    { id: "eq", label: "=", x: 200, y: 30 },
    { id: "x", label: "x", x: 80, y: 90 },
    { id: "mul", label: "*", x: 320, y: 90 },
    { id: "plus", label: "+", x: 240, y: 150 },
    { id: "five", label: "5", x: 400, y: 150 },
    { id: "three", label: "3", x: 180, y: 210 },
    { id: "four", label: "4", x: 300, y: 210 },
  ];
  const edges: [string, string][] = [
    ["eq", "x"],
    ["eq", "mul"],
    ["mul", "plus"],
    ["mul", "five"],
    ["plus", "three"],
    ["plus", "four"],
  ];

  const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 0.5,
        bgcolor: "grey.50",
        p: 1,
      }}
    >
      <svg
        viewBox="0 0 480 240"
        width="100%"
        style={{ display: "block", maxHeight: 280 }}
      >
        {edges.map(([from, to], i) => {
          const a = nodeMap[from];
          const b = nodeMap[to];
          return (
            <line
              key={i}
              x1={a.x}
              y1={a.y + 16}
              x2={b.x}
              y2={b.y - 16}
              stroke="#000"
              strokeWidth={1.2}
            />
          );
        })}
        {nodes.map((n) => (
          <g key={n.id}>
            <circle
              cx={n.x}
              cy={n.y}
              r={16}
              fill="#fff"
              stroke="#000"
              strokeWidth={1.5}
            />
            <text
              x={n.x}
              y={n.y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={14}
              fontWeight={600}
              fontFamily={MONO}
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    </Box>
  );
}

function IRView() {
  return (
    <Box
      sx={{
        p: 2,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 0.5,
        bgcolor: "grey.50",
      }}
    >
      <Stack spacing={0.5} sx={{ fontFamily: MONO, fontSize: "0.9375rem" }}>
        {IR_LINES.map((line, i) => (
          <Typography key={i} sx={{ fontFamily: MONO, fontSize: "0.9375rem" }}>
            {line}
          </Typography>
        ))}
      </Stack>
    </Box>
  );
}

function AssemblyView() {
  return (
    <Box
      sx={{
        p: 2,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 0.5,
        bgcolor: "grey.50",
      }}
    >
      <Stack spacing={0.5}>
        {ASSEMBLY.map((row, i) => (
          <Stack
            key={i}
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 0, sm: 2 }}
          >
            <Typography
              sx={{
                fontFamily: MONO,
                fontSize: "0.875rem",
                minWidth: { sm: "10.5em" },
              }}
            >
              {row.instr}
            </Typography>
            <Typography
              sx={{
                fontFamily: MONO,
                fontSize: "0.75rem",
                color: "text.secondary",
              }}
            >
              ; {row.comment}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}

function BytesView() {
  return (
    <Box
      sx={{
        p: 2,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 0.5,
        bgcolor: "grey.50",
      }}
    >
      <Stack spacing={0.75}>
        {BYTES_LINES.map((row, i) => (
          <Stack
            key={i}
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 0, sm: 2.5 }}
          >
            <Typography
              sx={{
                fontFamily: MONO,
                fontSize: "0.875rem",
                fontWeight: 600,
                minWidth: { sm: "12em" },
                letterSpacing: "0.05em",
              }}
            >
              {row.bytes}
            </Typography>
            <Typography
              sx={{
                fontFamily: MONO,
                fontSize: "0.75rem",
                color: "text.secondary",
              }}
            >
              ; {row.asm}
            </Typography>
          </Stack>
        ))}
      </Stack>
      <Typography
        variant="caption"
        sx={{ color: "text.secondary", display: "block", mt: 1.5 }}
      >
        ?? = the linker fills these bytes in once it knows the address of{" "}
        <Box component="code" sx={{ fontFamily: MONO }}>
          x
        </Box>
      </Typography>
    </Box>
  );
}
