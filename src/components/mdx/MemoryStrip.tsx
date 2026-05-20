import { useState } from "react";
import { Box, Stack, Typography, TextField } from "@mui/material";

const MAX = 32;
const BYTES_PER_ROW = 8;
const ROW_COUNT = MAX / BYTES_PER_ROW;
const MONO =
  'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace';

const BIT_W = 6;
const BIT_H = 16;
const BYTE_W = BIT_W * 8;
const BYTE_GAP = 12;
const NUM_H = 7;
const NUM_GAP = 2;
const ROW_BLOCK_H = NUM_H + NUM_GAP + BIT_H;
const ROW_GAP = 8;
const VIEWBOX_W = BYTE_W * BYTES_PER_ROW + BYTE_GAP * (BYTES_PER_ROW - 1);
const VIEWBOX_H = ROW_BLOCK_H * ROW_COUNT + ROW_GAP * (ROW_COUNT - 1);

export default function MemoryStrip() {
  const [text, setText] = useState("Hi!");
  const bytes = new TextEncoder().encode(text);

  const rows: (number | null)[][] = [];
  for (let r = 0; r < ROW_COUNT; r++) {
    const rowBytes: (number | null)[] = [];
    for (let b = 0; b < BYTES_PER_ROW; b++) {
      const idx = r * BYTES_PER_ROW + b;
      rowBytes.push(idx < bytes.length ? bytes[idx] : null);
    }
    rows.push(rowBytes);
  }

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
          <TextField
            value={text}
            onChange={(e) => {
              const cleaned = e.target.value
                .replace(/[^\x20-\x7e]/g, "")
                .slice(0, MAX);
              setText(cleaned);
            }}
            placeholder="type ASCII text..."
            fullWidth
            size="small"
            inputProps={{
              maxLength: MAX,
              style: { fontFamily: MONO, fontSize: "0.9375rem" },
              "aria-label": "Text to render as bits in memory",
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "divider" },
                "&:hover fieldset": { borderColor: "text.secondary" },
                "&.Mui-focused fieldset": { borderColor: "text.primary" },
              },
            }}
          />

          <svg
            viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
            width="100%"
            style={{ display: "block" }}
            role="img"
            aria-label="Your text rendered as raw bits in memory, 8 bits per byte, 8 bytes per row"
          >
            {rows.map((row, r) => {
              const rowY = r * (ROW_BLOCK_H + ROW_GAP);
              const bitsY = rowY + NUM_H + NUM_GAP;
              return (
                <g key={r}>
                  {row.map((byte, b) => {
                    const byteX = b * (BYTE_W + BYTE_GAP);
                    const isEmpty = byte === null;
                    const bits = isEmpty
                      ? null
                      : byte!.toString(2).padStart(8, "0");
                    return (
                      <g key={b}>
                        {!isEmpty && (
                          <text
                            x={byteX + BYTE_W / 2}
                            y={rowY + NUM_H / 2}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize={6}
                            fontFamily={MONO}
                            fill="#666"
                            style={{ userSelect: "none" }}
                          >
                            {byte}
                          </text>
                        )}
                        <rect
                          x={byteX}
                          y={bitsY}
                          width={BYTE_W}
                          height={BIT_H}
                          fill="none"
                          stroke={isEmpty ? "#e5e5e5" : "#666"}
                          strokeDasharray={isEmpty ? "1.5 1.5" : undefined}
                          strokeWidth={0.6}
                        />
                        {!isEmpty &&
                          bits!.split("").map((bit, j) =>
                            bit === "1" ? (
                              <rect
                                key={`bit-${j}`}
                                x={byteX + j * BIT_W}
                                y={bitsY}
                                width={BIT_W}
                                height={BIT_H}
                                fill="#000"
                              />
                            ) : null,
                          )}
                        {!isEmpty &&
                          Array.from({ length: 7 }).map((_, j) => {
                            const lineX = byteX + (j + 1) * BIT_W;
                            return (
                              <line
                                key={`line-${j}`}
                                x1={lineX}
                                y1={bitsY}
                                x2={lineX}
                                y2={bitsY + BIT_H}
                                stroke="#999"
                                strokeWidth={0.5}
                              />
                            );
                          })}
                      </g>
                    );
                  })}
                </g>
              );
            })}
          </svg>
        </Stack>
      </Box>

      <Box
        sx={{
          px: { xs: 2, sm: 3 },
          py: 1.25,
          borderTop: "1px solid",
          borderColor: "divider",
          bgcolor: "grey.50",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          what your text actually is in memory · each square is one bit · 8
          bits per byte
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: "text.secondary", fontFamily: MONO, flexShrink: 0 }}
        >
          {bytes.length} / {MAX} bytes
        </Typography>
      </Box>
    </Box>
  );
}
