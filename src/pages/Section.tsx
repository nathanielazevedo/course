import { useRef } from "react";
import { Box, Stack, Typography, Divider, Button } from "@mui/material";
import { Link as RouterLink, useParams, Navigate } from "react-router-dom";
import { getSectionBySlug } from "../data/chapters";
import { getSectionContent } from "../content/chapters";
import SectionToc from "../components/SectionToc";

export default function Section() {
  const { chapterSlug = "", sectionSlug = "" } = useParams();
  const found = getSectionBySlug(chapterSlug, sectionSlug);
  const articleRef = useRef<HTMLElement>(null);

  if (!found) return <Navigate to="/" replace />;

  const { chapter, section } = found;
  const idx = chapter.sections.findIndex((s) => s.slug === section.slug);
  const prev = chapter.sections[idx - 1];
  const next = chapter.sections[idx + 1];
  const Content = getSectionContent(chapter.slug, section.slug);
  const contentKey = `${chapter.slug}/${section.slug}`;

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          px: { xs: 3, md: 6 },
          py: { xs: 6, md: 12 },
          display: "flex",
          alignItems: "flex-start",
        }}
      >
        <Box sx={{ flex: 1, minWidth: 0, maxWidth: 720, mx: { xs: "auto", lg: 0 } }}>
          <Stack spacing={6}>
            <Button
              component={RouterLink}
              to={`/chapters/${chapter.slug}`}
              sx={{
                alignSelf: "flex-start",
                px: 0,
                color: "text.secondary",
                "&:hover": { bgcolor: "transparent", color: "text.primary" },
              }}
            >
              ← {chapter.title}
            </Button>

            <Stack spacing={2}>
              <Typography
                variant="overline"
                sx={{ letterSpacing: "0.2em", color: "text.secondary" }}
              >
                Chapter {String(chapter.number).padStart(2, "0")} · Section{" "}
                {String(section.number).padStart(2, "0")} of{" "}
                {String(chapter.sections.length).padStart(2, "0")}
              </Typography>
              <Typography variant="h2" component="h1">
                {section.title}
              </Typography>
            </Stack>

            <Divider />

            <Box
              component="article"
              ref={articleRef}
              sx={{
                minWidth: 0,
                "& h2": {
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  mt: 6,
                  mb: 2,
                  scrollMarginTop: "32px",
                  "&:first-of-type": { mt: 0 },
                },
                "& h3": {
                  fontSize: "1.125rem",
                  fontWeight: 600,
                  mt: 4,
                  mb: 1.5,
                  scrollMarginTop: "32px",
                },
                "& p": {
                  fontSize: "1rem",
                  lineHeight: 1.7,
                  mb: 2,
                  color: "text.primary",
                },
                "& ul, & ol": { pl: 3, mb: 2 },
                "& li": { lineHeight: 1.7, mb: 0.5 },
                "& strong": { fontWeight: 600 },
                "& code": {
                  bgcolor: "#f5f5f5",
                  px: 0.75,
                  py: 0.25,
                  borderRadius: 0.5,
                  fontSize: "0.9em",
                  fontFamily:
                    'ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace',
                },
                "& a": {
                  color: "text.primary",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                },
              }}
            >
              {Content ? (
                <Content />
              ) : (
                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                  Content for this section is coming soon.
                </Typography>
              )}
            </Box>

            <Divider />

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
            >
              <Box sx={{ flex: 1 }}>
                {prev && (
                  <Button
                    component={RouterLink}
                    to={`/chapters/${chapter.slug}/sections/${prev.slug}`}
                    sx={{
                      px: 0,
                      color: "text.secondary",
                      "&:hover": { bgcolor: "transparent", color: "text.primary" },
                    }}
                  >
                    ← {prev.title}
                  </Button>
                )}
              </Box>
              <Box sx={{ flex: 1, textAlign: "right" }}>
                {next ? (
                  <Button
                    component={RouterLink}
                    to={`/chapters/${chapter.slug}/sections/${next.slug}`}
                    sx={{
                      px: 0,
                      color: "text.secondary",
                      "&:hover": { bgcolor: "transparent", color: "text.primary" },
                    }}
                  >
                    {next.title} →
                  </Button>
                ) : (
                  <Button
                    component={RouterLink}
                    to={`/chapters/${chapter.slug}`}
                    sx={{
                      px: 0,
                      color: "text.secondary",
                      "&:hover": { bgcolor: "transparent", color: "text.primary" },
                    }}
                  >
                    Back to chapter →
                  </Button>
                )}
              </Box>
            </Stack>
          </Stack>
        </Box>

        <Box sx={{ display: { xs: "none", lg: "block" } }}>
          <SectionToc containerRef={articleRef} contentKey={contentKey} />
        </Box>
      </Box>
    </Box>
  );
}
