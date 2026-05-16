import { useState } from "react";
import { Box, ButtonBase, Typography, Collapse } from "@mui/material";

export default function SupportingContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Box
      sx={{
        my: 4,
        borderTop: "1px solid",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <ButtonBase
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        sx={{
          width: "100%",
          justifyContent: "space-between",
          py: 1.5,
          px: 0,
          color: "text.secondary",
          "&:hover": { color: "text.primary" },
        }}
      >
        <Typography
          variant="overline"
          sx={{ letterSpacing: "0.2em", color: "inherit" }}
        >
          Supporting content
        </Typography>
        <Box
          aria-hidden
          sx={{
            fontSize: 12,
            lineHeight: 1,
            color: "inherit",
            transition: "transform 200ms",
            transform: open ? "rotate(180deg)" : "none",
          }}
        >
          ▾
        </Box>
      </ButtonBase>
      <Collapse in={open}>
        <Box sx={{ pb: 2 }}>{children}</Box>
      </Collapse>
    </Box>
  );
}
