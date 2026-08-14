import { useRef, useState } from "react";
import { Box, Stack, Typography, Button } from "@mui/material";

const MONO =
  'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace';
const MAX_LEN = 6;
const NODE = 44;

type Node = { id: number; value: number; phase: "entering" | "settled" | "leaving" };

const randomValue = () => Math.floor(Math.random() * 90) + 10;

// Interactive singly-linked-list diagram: prepend/append and click-to-delete,
// each labeled with its real traversal cost (no tail pointer is kept, so
// append has to walk the list first).
export default function LinkedListVisual() {
  const nextId = useRef(0);
  const [nodes, setNodes] = useState<Node[]>(() =>
    [9, 26, 41].map((value) => ({ id: nextId.current++, value, phase: "settled" })),
  );
  const [note, setNote] = useState("Prepend, append, or click a node to delete it.");

  const settle = (id: number) =>
    setNodes((prev) => prev.map((n) => (n.id === id ? { ...n, phase: "settled" } : n)));

  const prepend = () => {
    if (nodes.length >= MAX_LEN) {
      setNote(`List is at the display cap of ${MAX_LEN} nodes.`);
      return;
    }
    const id = nextId.current++;
    setNodes((prev) => [{ id, value: randomValue(), phase: "entering" }, ...prev]);
    requestAnimationFrame(() => requestAnimationFrame(() => settle(id)));
    setNote("Prepend (head): O(1) — new node just points to the old head.");
  };

  const append = () => {
    if (nodes.length >= MAX_LEN) {
      setNote(`List is at the display cap of ${MAX_LEN} nodes.`);
      return;
    }
    const id = nextId.current++;
    setNodes((prev) => [...prev, { id, value: randomValue(), phase: "entering" }]);
    requestAnimationFrame(() => requestAnimationFrame(() => settle(id)));
    setNote("Append (tail): O(n) — without a tail pointer, must walk from the head first.");
  };

  const remove = (index: number) => {
    const target = nodes[index];
    setNodes((prev) =>
      prev.map((n) => (n.id === target.id ? { ...n, phase: "leaving" } : n)),
    );
    setTimeout(() => {
      setNodes((prev) => prev.filter((n) => n.id !== target.id));
    }, 160);
    setNote(
      index === 0
        ? "Deleted the head: O(1) — the second node just becomes the new head."
        : "Deleted an inner node: O(n) — traverse from the head to find it, then relink.",
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
              onClick={prepend}
              sx={{
                bgcolor: "text.primary",
                color: "background.default",
                "&:hover": { bgcolor: "text.primary", opacity: 0.85 },
              }}
            >
              Prepend
            </Button>
            <Button
              variant="outlined"
              onClick={append}
              sx={{
                borderColor: "divider",
                color: "text.primary",
                "&:hover": { borderColor: "text.primary" },
              }}
            >
              Append
            </Button>
          </Stack>

          <Box
            sx={{
              minHeight: 90,
              display: "flex",
              alignItems: "center",
              overflowX: "auto",
              py: 1,
            }}
          >
            {nodes.length === 0 ? (
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                List is empty — prepend or append a node.
              </Typography>
            ) : (
              <Stack direction="row" alignItems="center" flexShrink={0}>
                {nodes.map((node, index) => (
                  <Stack key={node.id} direction="row" alignItems="center" flexShrink={0}>
                    <Box
                      onClick={() => remove(index)}
                      sx={{
                        width: NODE,
                        height: NODE,
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
                        flexShrink: 0,
                        transition:
                          "opacity 160ms ease, transform 160ms ease, border-color 160ms, background-color 160ms",
                        opacity: node.phase === "settled" ? 1 : 0,
                        transform:
                          node.phase === "settled" ? "none" : "scale(0.85)",
                        "&:hover": {
                          borderColor: "text.primary",
                          bgcolor: "grey.50",
                        },
                      }}
                    >
                      {node.value}
                    </Box>
                    <Box
                      sx={{
                        width: 24,
                        height: 2,
                        bgcolor: "divider",
                        position: "relative",
                        flexShrink: 0,
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          right: 0,
                          top: -3,
                          borderLeft: "5px solid",
                          borderLeftColor: "divider",
                          borderTop: "4px solid transparent",
                          borderBottom: "4px solid transparent",
                        },
                      }}
                    />
                  </Stack>
                ))}
                <Box
                  sx={{
                    px: 1,
                    py: 0.5,
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 1,
                    fontFamily: MONO,
                    fontSize: "0.75rem",
                    color: "text.secondary",
                    flexShrink: 0,
                  }}
                >
                  null
                </Box>
              </Stack>
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
          click a node to delete it
        </Typography>
      </Box>
    </Box>
  );
}
