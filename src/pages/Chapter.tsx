import {
  Box,
  Container,
  Stack,
  Typography,
  Divider,
  Button,
  List,
  ListItemButton,
} from "@mui/material";
import { Link as RouterLink, useParams, Navigate } from "react-router-dom";
import { chapters, getChapterBySlug } from "../data/chapters";
import ChapterVideo from "../components/ChapterVideo";

export default function Chapter() {
  const { slug = "" } = useParams();
  const chapter = getChapterBySlug(slug);

  if (!chapter) return <Navigate to="/" replace />;

  const idx = chapters.findIndex((c) => c.slug === chapter.slug);
  const prev = chapters[idx - 1];
  const next = chapters[idx + 1];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Box
        sx={{
          bgcolor: "grey.50",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Container maxWidth="md" sx={{ py: { xs: 5, md: 8 } }}>
          <Stack spacing={4}>
            <Button
              component={RouterLink}
              to="/"
              sx={{
                alignSelf: "flex-start",
                px: 0,
                color: "text.secondary",
                "&:hover": { bgcolor: "transparent", color: "text.primary" },
              }}
            >
              ← All chapters
            </Button>

            <Stack spacing={2}>
              <Typography
                variant="overline"
                sx={{ letterSpacing: "0.2em", color: "text.secondary" }}
              >
                Chapter {String(chapter.number).padStart(2, "0")}
              </Typography>
              <Typography variant="h2" component="h1">
                {chapter.title}
              </Typography>
              {chapter.description && (
                <Typography
                  variant="body1"
                  sx={{ color: "text.secondary", lineHeight: 1.7, fontSize: "1.0625rem" }}
                >
                  {chapter.description}
                </Typography>
              )}
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
        <Stack spacing={6}>
          {chapter.videoId && <ChapterVideo videoId={chapter.videoId} />}

          <Stack spacing={2}>
            <Typography variant="h6">Sections</Typography>
            {chapter.sections.length === 0 ? (
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Sections for this chapter are coming soon.
              </Typography>
            ) : (
              <List disablePadding>
                {chapter.sections.map((section, i) => (
                  <ListItemButton
                    key={section.slug}
                    component={RouterLink}
                    to={`/chapters/${chapter.slug}/sections/${section.slug}`}
                    sx={{
                      px: 0,
                      py: 1.5,
                      borderTop: i === 0 ? "1px solid" : "none",
                      borderBottom: "1px solid",
                      borderColor: "divider",
                      color: "text.primary",
                      "&:hover": { bgcolor: "transparent" },
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        width: 40,
                        color: "text.secondary",
                        fontFamily:
                          'ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace',
                      }}
                    >
                      {String(section.number).padStart(2, "0")}
                    </Typography>
                    <Typography variant="body1" sx={{ flex: 1 }}>
                      {section.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      →
                    </Typography>
                  </ListItemButton>
                ))}
              </List>
            )}
          </Stack>

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
                  to={`/chapters/${prev.slug}`}
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
              {next && (
                <Button
                  component={RouterLink}
                  to={`/chapters/${next.slug}`}
                  sx={{
                    px: 0,
                    color: "text.secondary",
                    "&:hover": { bgcolor: "transparent", color: "text.primary" },
                  }}
                >
                  {next.title} →
                </Button>
              )}
            </Box>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
