import { useRef, useState } from "react";
import { Box, Stack, Typography, Button } from "@mui/material";

const MONO =
  'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace';
const MAX_LEN = 8;
const CELL = 44;

type Cell = { id: number; value: number; phase: "entering" | "settled" | "leaving" };

const randomValue = () => Math.floor(Math.random() * 90) + 10;

// Interactive array diagram: push/pop, insert-at-start, and click-to-remove,
// each annotated with the Big-O cost so the shifting cost is visible, not
// just stated.
export default function ArrayVisual() {
  const nextId = useRef(0);
  const [cells, setCells] = useState<Cell[]>(() =>
    [12, 47, 8, 33].map((value) => ({ id: nextId.current++, value, phase: "settled" })),
  );
  const [note, setNote] = useState("Push, pop, or click a cell to remove it.");

  const settle = (id: number) =>
    setCells((prev) =>
      prev.map((c) => (c.id === id ? { ...c, phase: "settled" } : c)),
    );

  const addCell = (value: number, atStart: boolean) => {
    const id = nextId.current++;
    setCells((prev) =>
      atStart
        ? [{ id, value, phase: "entering" }, ...prev]
        : [...prev, { id, value, phase: "entering" }],
    );
    requestAnimationFrame(() => requestAnimationFrame(() => settle(id)));
  };

  const push = () => {
    if (cells.length >= MAX_LEN) {
      setNote(`Array is at the display cap of ${MAX_LEN} elements.`);
      return;
    }
    addCell(randomValue(), false);
    setNote("Push (end): O(1) — space already exists at the end.");
  };

  const unshift = () => {
    if (cells.length >= MAX_LEN) {
      setNote(`Array is at the display cap of ${MAX_LEN} elements.`);
      return;
    }
    addCell(randomValue(), true);
    setNote("Insert at start: O(n) — every existing element shifts right.");
  };

  const pop = () => {
    if (cells.length === 0) return;
    const last = cells[cells.length - 1];
    setCells((prev) =>
      prev.map((c) => (c.id === last.id ? { ...c, phase: "leaving" } : c)),
    );
    setTimeout(() => {
      setCells((prev) => prev.filter((c) => c.id !== last.id));
    }, 160);
    setNote("Pop (end): O(1) — no shifting required.");
  };

  const removeAt = (index: number) => {
    const target = cells[index];
    setCells((prev) =>
      prev.map((c) => (c.id === target.id ? { ...c, phase: "leaving" } : c)),
    );
    setTimeout(() => {
      setCells((prev) => prev.filter((c) => c.id !== target.id));
    }, 160);
    setNote(
      index === cells.length - 1
        ? "Removed the last element: O(1)."
        : "Removed a middle element: O(n) — later elements shift left to fill the gap.",
    );
  };

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
              onClick={unshift}
              sx={{
                borderColor: "divider",
                color: "text.primary",
                "&:hover": { borderColor: "text.primary" },
              }}
            >
              Insert at start
            </Button>
          </Stack>

          <Box
            sx={{
              minHeight: 100,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: cells.length ? "flex-start" : "center",
              overflowX: "auto",
              py: 1,
            }}
          >
            {cells.length === 0 ? (
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Array is empty — push something onto it.
              </Typography>
            ) : (
              cells.map((cell, index) => (
                <Stack
                  key={cell.id}
                  alignItems="center"
                  spacing={0.5}
                  sx={{
                    mr: 1,
                    flexShrink: 0,
                    transition: "opacity 160ms ease, transform 160ms ease",
                    opacity: cell.phase === "settled" ? 1 : 0,
                    transform:
                      cell.phase === "leaving"
                        ? "translateY(6px) scale(0.85)"
                        : cell.phase === "entering"
                          ? "translateY(-6px) scale(0.85)"
                          : "none",
                  }}
                >
                  <Box
                    onClick={() => removeAt(index)}
                    sx={{
                      width: CELL,
                      height: CELL,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: 1,
                      fontFamily: MONO,
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      cursor: "pointer",
                      transition: "border-color 160ms, background-color 160ms",
                      "&:hover": {
                        borderColor: "text.primary",
                        bgcolor: "grey.50",
                      },
                    }}
                  >
                    {cell.value}
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary", fontFamily: MONO }}
                  >
                    {index}
                  </Typography>
                </Stack>
              ))
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
          flexWrap: "wrap",
        }}
      >
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          {note}
        </Typography>
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          click a cell to remove it
        </Typography>
      </Box>
    </Box>
  );
}
