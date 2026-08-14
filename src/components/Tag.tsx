import type { ReactNode } from "react";
import { Box } from "@mui/material";

type TagProps = {
  children: ReactNode;
};

// A small monochrome label — used in place of MUI's colored Chip so badges
// (difficulty, counts, etc.) stay in the site's black/white/grey palette.
export default function Tag({ children }: TagProps) {
  return (
    <Box
      component="span"
      sx={{
        display: "inline-block",
        px: 1,
        py: 0.25,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1,
        fontSize: "0.6875rem",
        lineHeight: 1.6,
        color: "text.secondary",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        fontWeight: 500,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </Box>
  );
}
