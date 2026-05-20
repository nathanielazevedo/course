import { useState } from "react";
import { Box, Stack, Typography, ButtonBase } from "@mui/material";

const TEXT = "These same 64 bytes mean something different in each view. Same.";
const BYTES = new TextEncoder().encode(TEXT);

const MONO =
  'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace';

type View = "hex" | "text" | "image" | "numbers" | "code";

const VIEWS: { id: View; label: string }[] = [
  { id: "text", label: "Text" },
  { id: "hex", label: "Hex" },
  { id: "numbers", label: "Numbers" },
  { id: "image", label: "Image" },
  { id: "code", label: "Code" },
];

export default function BytesLens() {
  const [view, setView] = useState<View>("text");

  return (
    <Box
      sx={{
        my: 3,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1,
        overflow: "hidden",
        bgcolor: "background.default",
      }}
    >
      <Stack
        direction="row"
        sx={{ borderBottom: "1px solid", borderColor: "divider" }}
      >
        {VIEWS.map((v) => {
          const active = view === v.id;
          return (
            <ButtonBase
              key={v.id}
              onClick={() => setView(v.id)}
              sx={{
                flex: 1,
                py: 1.25,
                fontSize: "0.8125rem",
                fontWeight: 500,
                letterSpacing: "0.02em",
                bgcolor: active ? "text.primary" : "transparent",
                color: active ? "background.default" : "text.secondary",
                borderRight: "1px solid",
                borderColor: "divider",
                "&:last-of-type": { borderRight: "none" },
                "&:hover": {
                  bgcolor: active ? "text.primary" : "grey.100",
                  color: active ? "background.default" : "text.primary",
                },
              }}
            >
              {v.label}
            </ButtonBase>
          );
        })}
      </Stack>

      <Box sx={{ p: { xs: 2, sm: 3 }, minHeight: 200 }}>
        {view === "hex" && <HexView />}
        {view === "text" && <TextView />}
        {view === "image" && <ImageView />}
        {view === "numbers" && <NumbersView />}
        {view === "code" && <CodeView />}
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
          64 bytes · the same data interpreted five ways
        </Typography>
      </Box>
    </Box>
  );
}

function HexView() {
  const rows: number[][] = [];
  for (let i = 0; i < BYTES.length; i += 16) {
    rows.push(Array.from(BYTES.slice(i, i + 16)));
  }
  return (
    <Box sx={{ fontFamily: MONO, fontSize: "0.8125rem", lineHeight: 1.9, overflowX: "auto" }}>
      {rows.map((row, i) => (
        <Stack key={i} direction="row" spacing={2} sx={{ whiteSpace: "pre" }}>
          <Box sx={{ color: "text.secondary", userSelect: "none" }}>
            {(i * 16).toString(16).padStart(4, "0").toUpperCase()}
          </Box>
          <Box>
            {row
              .map((b) => b.toString(16).padStart(2, "0").toUpperCase())
              .join(" ")}
          </Box>
        </Stack>
      ))}
    </Box>
  );
}

function TextView() {
  return (
    <Box
      sx={{
        fontFamily: MONO,
        fontSize: "0.9375rem",
        lineHeight: 1.7,
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
      }}
    >
      {TEXT}
    </Box>
  );
}

function ImageView() {
  const size = 8;
  const cell = 28;
  return (
    <Stack alignItems="center" spacing={1.5}>
      <svg
        width={size * cell}
        height={size * cell}
        role="img"
        aria-label="The same 64 bytes interpreted as an 8 by 8 grid of grayscale pixels"
        style={{ display: "block", imageRendering: "pixelated" }}
      >
        {Array.from(BYTES).map((b, i) => {
          const x = (i % size) * cell;
          const y = Math.floor(i / size) * cell;
          return (
            <rect
              key={i}
              x={x}
              y={y}
              width={cell}
              height={cell}
              fill={`rgb(${b},${b},${b})`}
            />
          );
        })}
      </svg>
      <Typography variant="caption" sx={{ color: "text.secondary" }}>
        each byte → one pixel's brightness (0 = black, 255 = white)
      </Typography>
    </Stack>
  );
}

function NumbersView() {
  const view = new DataView(BYTES.buffer, BYTES.byteOffset, BYTES.byteLength);
  const ints: number[] = [];
  for (let i = 0; i < 16; i++) {
    ints.push(view.getUint32(i * 4, true));
  }
  return (
    <Stack spacing={1.5}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(4, 1fr)" },
          gap: 1.5,
          fontFamily: MONO,
          fontSize: "0.8125rem",
        }}
      >
        {ints.map((n, i) => (
          <Box key={i}>
            <Box sx={{ color: "text.secondary", fontSize: "0.6875rem" }}>
              [{i.toString().padStart(2, "0")}]
            </Box>
            <Box>{n.toLocaleString()}</Box>
          </Box>
        ))}
      </Box>
      <Typography variant="caption" sx={{ color: "text.secondary" }}>
        sixteen 32-bit unsigned integers (little-endian)
      </Typography>
    </Stack>
  );
}

function CodeView() {
  const instructions = disassemble(BYTES);
  return (
    <Stack spacing={1.5}>
      <Box
        sx={{
          fontFamily: MONO,
          fontSize: "0.8125rem",
          lineHeight: 1.85,
          overflowX: "auto",
        }}
      >
        {instructions.map((inst, i) => (
          <Stack key={i} direction="row" spacing={2} sx={{ whiteSpace: "pre" }}>
            <Box sx={{ color: "text.secondary", width: "3.5em" }}>
              {inst.offset.toString(16).padStart(4, "0").toUpperCase()}
            </Box>
            <Box sx={{ color: "text.secondary", width: "11em" }}>
              {inst.bytes
                .map((b) => b.toString(16).padStart(2, "0").toUpperCase())
                .join(" ")}
            </Box>
            <Box sx={{ color: inst.known ? "text.primary" : "text.secondary" }}>
              {inst.mnemonic}
            </Box>
          </Stack>
        ))}
      </Box>
      <Typography variant="caption" sx={{ color: "text.secondary" }}>
        bytes greedily decoded as x86-64 · unrecognized bytes shown as raw{" "}
        <Box component="code" sx={{ fontFamily: MONO }}>
          db
        </Box>
      </Typography>
    </Stack>
  );
}

type Instruction = {
  offset: number;
  bytes: number[];
  mnemonic: string;
  known: boolean;
};

function disassemble(bytes: Uint8Array): Instruction[] {
  const result: Instruction[] = [];
  const r64 = ["rax", "rcx", "rdx", "rbx", "rsp", "rbp", "rsi", "rdi"];
  const r32 = ["eax", "ecx", "edx", "ebx", "esp", "ebp", "esi", "edi"];
  const r8 = ["al", "cl", "dl", "bl", "ah", "ch", "dh", "bh"];
  const cc = [
    "jo", "jno", "jb", "jae", "je", "jne", "jbe", "ja",
    "js", "jns", "jp", "jnp", "jl", "jge", "jle", "jg",
  ];

  let i = 0;
  while (i < bytes.length) {
    const start = i;
    const op = bytes[i];

    const push = (size: number, mnemonic: string) => {
      result.push({
        offset: start,
        bytes: Array.from(bytes.slice(start, start + size)),
        mnemonic,
        known: true,
      });
      i += size;
    };

    if (op >= 0x50 && op <= 0x57) {
      push(1, `push ${r64[op - 0x50]}`);
      continue;
    }
    if (op >= 0x58 && op <= 0x5f) {
      push(1, `pop ${r64[op - 0x58]}`);
      continue;
    }
    if (op === 0x68 && i + 5 <= bytes.length) {
      const imm =
        bytes[i + 1] |
        (bytes[i + 2] << 8) |
        (bytes[i + 3] << 16) |
        (bytes[i + 4] << 24);
      push(5, `push 0x${(imm >>> 0).toString(16)}`);
      continue;
    }
    if (op === 0x6a && i + 2 <= bytes.length) {
      push(2, `push 0x${bytes[i + 1].toString(16)}`);
      continue;
    }
    if (op >= 0x70 && op <= 0x7f && i + 2 <= bytes.length) {
      const rel = bytes[i + 1];
      const signed = rel >= 0x80 ? rel - 0x100 : rel;
      const target = i + 2 + signed;
      push(2, `${cc[op - 0x70]} 0x${target.toString(16)}`);
      continue;
    }
    if (op >= 0xb0 && op <= 0xb7 && i + 2 <= bytes.length) {
      push(2, `mov ${r8[op - 0xb0]}, 0x${bytes[i + 1].toString(16)}`);
      continue;
    }
    if (op >= 0xb8 && op <= 0xbf && i + 5 <= bytes.length) {
      const imm =
        bytes[i + 1] |
        (bytes[i + 2] << 8) |
        (bytes[i + 3] << 16) |
        (bytes[i + 4] << 24);
      push(5, `mov ${r32[op - 0xb8]}, 0x${(imm >>> 0).toString(16)}`);
      continue;
    }
    if (op === 0xeb && i + 2 <= bytes.length) {
      const rel = bytes[i + 1];
      const signed = rel >= 0x80 ? rel - 0x100 : rel;
      push(2, `jmp 0x${(i + 2 + signed).toString(16)}`);
      continue;
    }
    if ((op === 0xe8 || op === 0xe9) && i + 5 <= bytes.length) {
      const mn = op === 0xe8 ? "call" : "jmp";
      const rel =
        bytes[i + 1] |
        (bytes[i + 2] << 8) |
        (bytes[i + 3] << 16) |
        (bytes[i + 4] << 24);
      const signed = rel >= 0x80000000 ? rel - 0x100000000 : rel;
      push(5, `${mn} 0x${(i + 5 + signed).toString(16)}`);
      continue;
    }
    if (op === 0xc3) {
      push(1, "ret");
      continue;
    }
    if (op === 0xc9) {
      push(1, "leave");
      continue;
    }
    if (op === 0xcc) {
      push(1, "int3");
      continue;
    }
    if (op === 0x90) {
      push(1, "nop");
      continue;
    }

    result.push({
      offset: start,
      bytes: [op],
      mnemonic: `db 0x${op.toString(16).padStart(2, "0")}`,
      known: false,
    });
    i += 1;
  }
  return result;
}
