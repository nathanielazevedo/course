import { useState } from "react";
import { Box, Stack, Typography, TextField } from "@mui/material";

const MAX = 64;
const GRID = 8;
const CELL = 36;
const MONO =
  'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace';

export default function TextToPixels() {
  const [text, setText] = useState("hello world!");
  const [active, setActive] = useState<number | null>(null);

  const bytes = new TextEncoder().encode(text);

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
        <Stack spacing={2.5}>
          <TextField
            value={text}
            onChange={(e) => {
              const cleaned = e.target.value
                .replace(/[^\x20-\x7e]/g, "")
                .slice(0, MAX);
              setText(cleaned);
              setActive(null);
            }}
            placeholder="type something..."
            fullWidth
            size="small"
            inputProps={{
              maxLength: MAX,
              style: { fontFamily: MONO, fontSize: "0.9375rem" },
              "aria-label": "Text to render as pixels",
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "divider" },
                "&:hover fieldset": { borderColor: "text.secondary" },
                "&.Mui-focused fieldset": { borderColor: "text.primary" },
              },
            }}
          />

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <svg
              width={GRID * CELL}
              height={GRID * CELL}
              style={{ display: "block" }}
              role="img"
              aria-label="Each character of your text rendered as a grayscale pixel"
            >
              {Array.from({ length: GRID * GRID }).map((_, i) => {
                const x = (i % GRID) * CELL;
                const y = Math.floor(i / GRID) * CELL;
                const hasByte = i < bytes.length;
                const b = hasByte ? bytes[i] : 0;
                const isActive = active === i;
                return (
                  <rect
                    key={i}
                    x={x}
                    y={y}
                    width={CELL}
                    height={CELL}
                    fill={hasByte ? `rgb(${b},${b},${b})` : "#ffffff"}
                    stroke={
                      isActive ? "#000" : hasByte ? "transparent" : "#ececec"
                    }
                    strokeWidth={isActive ? 2 : 1}
                    style={{ cursor: hasByte ? "pointer" : "default" }}
                    onMouseEnter={() => hasByte && setActive(i)}
                    onMouseLeave={() => setActive(null)}
                  />
                );
              })}
            </svg>
          </Box>

          <Box
            sx={{
              minHeight: 22,
              fontFamily: MONO,
              fontSize: "0.8125rem",
              color: "text.secondary",
              textAlign: "center",
            }}
          >
            {active !== null && bytes[active] !== undefined ? (
              <>
                <Box component="span" sx={{ color: "text.primary" }}>
                  '{String.fromCharCode(bytes[active])}'
                </Box>{" "}
                · byte{" "}
                <Box component="span" sx={{ color: "text.primary" }}>
                  0x
                  {bytes[active].toString(16).toUpperCase().padStart(2, "0")}
                </Box>{" "}
                · brightness{" "}
                <Box component="span" sx={{ color: "text.primary" }}>
                  {bytes[active]} / 255
                </Box>
              </>
            ) : (
              "hover a pixel to see what it is"
            )}
          </Box>
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
        }}
      >
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          one character → one byte → one pixel's brightness (0 = black, 255 =
          white)
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: "text.secondary", fontFamily: MONO, flexShrink: 0 }}
        >
          {bytes.length} / {MAX}
        </Typography>
      </Box>
    </Box>
  );
}
