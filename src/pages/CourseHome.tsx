import {
  Box,
  Container,
  Stack,
  Typography,
  List,
  ListItemButton,
  Button,
} from "@mui/material";
import { Link as RouterLink, useParams, Navigate } from "react-router-dom";
import { getCourseBySlug } from "../courses";

export default function CourseHome() {
  const { courseSlug = "" } = useParams();
  const course = getCourseBySlug(courseSlug);

  if (!course) return <Navigate to="/" replace />;

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Box
        sx={{
          bgcolor: "grey.50",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Container maxWidth="md" sx={{ py: { xs: 6, md: 12 } }}>
          <Stack spacing={2}>
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
              ← All courses
            </Button>
            <Typography
              variant="overline"
              sx={{ letterSpacing: "0.2em", color: "text.secondary" }}
            >
              A Course
            </Typography>
            <Typography variant="h2" component="h1">
              {course.title}
            </Typography>
            <Typography variant="h5" sx={{ color: "text.secondary", fontWeight: 400 }}>
              {course.tagline}
            </Typography>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
        <Stack spacing={2}>
          <Typography variant="h6">Chapters</Typography>
          <List disablePadding>
            {course.chapters.map((chapter, i) => (
              <ListItemButton
                key={chapter.slug}
                component={RouterLink}
                to={`/courses/${course.slug}/chapters/${chapter.slug}`}
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
                  variant="body1"
                  sx={{ flex: 1, color: "text.primary" }}
                >
                  {chapter.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {String(chapter.number).padStart(2, "0")}
                </Typography>
              </ListItemButton>
            ))}
          </List>
        </Stack>
      </Container>
    </Box>
  );
}
