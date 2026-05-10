import { useEffect, useRef, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";

type Heading = {
  id: string;
  text: string;
  level: number;
};

type Props = {
  containerRef: React.RefObject<HTMLElement>;
  contentKey: string;
};

export default function SectionToc({ containerRef, contentKey }: Props) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const nodes = Array.from(
      container.querySelectorAll<HTMLElement>("h2[id], h3[id]"),
    );
    const next = nodes.map((n) => ({
      id: n.id,
      text: n.textContent ?? "",
      level: Number(n.tagName.slice(1)),
    }));
    setHeadings(next);
    setActiveId(next[0]?.id ?? null);

    if (nodes.length === 0) return;

    observerRef.current?.disconnect();
    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.set(e.target.id, e.intersectionRatio);
          else visible.delete(e.target.id);
        }
        if (visible.size > 0) {
          const top = Array.from(visible.entries()).sort(
            (a, b) => b[1] - a[1],
          )[0][0];
          setActiveId(top);
          return;
        }
        const scrollY = window.scrollY;
        let current: string | null = null;
        for (const n of nodes) {
          if (n.offsetTop - 100 <= scrollY) current = n.id;
        }
        if (current) setActiveId(current);
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: [0, 0.5, 1] },
    );
    nodes.forEach((n) => observer.observe(n));
    observerRef.current = observer;

    return () => observer.disconnect();
  }, [containerRef, contentKey]);

  if (headings.length < 2) return null;

  return (
    <Box
      component="nav"
      aria-label="On this page"
      sx={{
        position: "sticky",
        top: 32,
        alignSelf: "flex-start",
        maxHeight: "calc(100vh - 64px)",
        overflowY: "auto",
        width: 220,
        flexShrink: 0,
        ml: 6,
      }}
    >
      <Typography
        variant="overline"
        sx={{
          letterSpacing: "0.2em",
          color: "text.secondary",
          display: "block",
          mb: 1.5,
        }}
      >
        On this page
      </Typography>
      <Stack spacing={0.75}>
        {headings.map((h) => {
          const isActive = h.id === activeId;
          return (
            <Box
              key={h.id}
              component="a"
              href={`#${h.id}`}
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                const el = document.getElementById(h.id);
                if (!el) return;
                const top =
                  el.getBoundingClientRect().top + window.scrollY - 24;
                window.scrollTo({ top, behavior: "smooth" });
                history.replaceState(null, "", `#${h.id}`);
                setActiveId(h.id);
              }}
              sx={{
                display: "block",
                fontSize: "0.8125rem",
                lineHeight: 1.5,
                pl: h.level === 3 ? 1.5 : 0,
                color: isActive ? "text.primary" : "text.secondary",
                fontWeight: isActive ? 600 : 400,
                textDecoration: "none",
                borderLeft: "2px solid",
                borderColor: isActive ? "text.primary" : "transparent",
                ml: -1,
                paddingLeft: h.level === 3 ? "20px" : "8px",
                py: 0.25,
                "&:hover": { color: "text.primary" },
              }}
            >
              {h.text}
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}
