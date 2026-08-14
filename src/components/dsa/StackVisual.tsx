import { useRef, useState } from "react";
import { Box, Stack, Typography, Button } from "@mui/material";

const MONO =
  'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace';
const MAX_LEN = 6;

type Frame = { id: number; value: number; phase: "entering" | "settled" | "leaving" };

const randomValue = () => Math.floor(Math.random() * 90) + 10;

// Interactive stack diagram (LIFO): push/pop grow and shrink from the top,
// peek pulses the top frame without removing it.
export default function StackVisual() {
  const nextId = useRef(0);
  const [frames, setFrames] = useState<Frame[]>(() =>
    [51, 19, 7].map((value) => ({ id: nextId.current++, value, phase: "settled" })),
  );
  const [peeking, setPeeking] = useState(false);
  const [note, setNote] = useState("Push adds to the top, pop removes from the top.");

  const push = () => {
    if (frames.length >= MAX_LEN) {
      setNote(`Stack is at the display cap of ${MAX_LEN} frames.`);
      return;
    }
    const id = nextId.current++;
    setFrames((prev) => [...prev, { id, value: randomValue(), phase: "entering" }]);
    requestAnimationFrame(() =>
      requestAnimationFrame(() =>
        setFrames((prev) => prev.map((f) => (f.id === id ? { ...f, phase: "settled" } : f))),
      ),
    );
    setNote("Push: O(1) — only the top pointer moves.");
  };

  const pop = () => {
    if (frames.length === 0) return;
    const top = frames[frames.length - 1];
    setFrames((prev) => prev.map((f) => (f.id === top.id ? { ...f, phase: "leaving" } : f)));
    setTimeout(() => {
      setFrames((prev) => prev.filter((f) => f.id !== top.id));
    }, 160);
    setNote("Pop: O(1) — only the top element is ever touched.");
  };

  const peek = () => {
    if (frames.length === 0) return;
    setPeeking(true);
    setNote("Peek: O(1) — look at the top without removing it.");
    setTimeout(() => setPeeking(false), 500);
  };

  const top = frames[frames.length - 1];

  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1,
        bgcolor: "background.default",
      }}
    >
      <Box sx={{ p: { xs: 2, sm: 3 } }}>
        <Stack spacing={3}>
          <Stack direction="row" spacing={1.5}>
            <Button
              variant="contained"
              onClick={push}
              sx={{
                bgcolor: "text.primary",
                color: "background.default",
                "&:hover": { bgcolor: "text.primary", opacity: 0.85 },
              }}
            >
              Push
            </Button>
            <Button
              variant="outlined"
              onClick={pop}
              sx={{
                borderColor: "divider",
                color: "text.primary",
                "&:hover": { borderColor: "text.primary" },
              }}
            >
              Pop
            </Button>
            <Button
              variant="outlined"
              onClick={peek}
              sx={{
                borderColor: "divider",
                color: "text.primary",
                "&:hover": { borderColor: "text.primary" },
              }}
            >
              Peek
            </Button>
          </Stack>

          <Box
            sx={{
              minHeight: 240,
              display: "flex",
              flexDirection: "column-reverse",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Box sx={{ width: 100, borderBottom: "2px solid", borderColor: "text.primary" }} />
            <Box sx={{ display: "flex", flexDirection: "column-reverse" }}>
              {frames.map((frame) => {
                const isTop = frame.id === top?.id;
                return (
                  <Box key={frame.id} sx={{ position: "relative" }}>
                    <Box
                      sx={{
                        width: 100,
                        height: 40,
                        mt: 0.5,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 1,
                        fontFamily: MONO,
                        fontSize: "0.875rem",
                        fontWeight: 500,
                        bgcolor: isTop && peeking ? "grey.50" : "background.default",
                        transition:
                          "opacity 160ms ease, transform 160ms ease, background-color 200ms",
                        opacity: frame.phase === "settled" ? 1 : 0,
                        transform:
                          frame.phase === "settled"
                            ? isTop && peeking
                              ? "scale(1.06)"
                              : "none"
                            : "translateY(-10px) scale(0.85)",
                      }}
                    >
                      {frame.value}
                    </Box>
                    {isTop && frame.phase === "settled" && (
                      <Typography
                        variant="caption"
                        sx={{
                          position: "absolute",
                          left: "100%",
                          top: "50%",
                          transform: "translateY(-50%)",
                          ml: 1,
                          whiteSpace: "nowrap",
                          color: "text.secondary",
                          fontFamily: MONO,
                        }}
                      >
                        ← top
                      </Typography>
                    )}
                  </Box>
                );
              })}
            </Box>
            {frames.length === 0 && (
              <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
                Stack is empty — push something onto it.
              </Typography>
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
        }}
      >
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          {note}
        </Typography>
      </Box>
    </Box>
  );
}
