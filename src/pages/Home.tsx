import {
  Box,
  Container,
  Stack,
  Typography,
  Divider,
  List,
  ListItemButton,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { chapters } from "../data/chapters";

export default function Home() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Container maxWidth="md" sx={{ py: { xs: 6, md: 12 } }}>
        <Stack spacing={6}>
          <Stack spacing={2}>
            <Typography
              variant="overline"
              sx={{ letterSpacing: "0.2em", color: "text.secondary" }}
            >
              A Course
            </Typography>
            <Typography variant="h2" component="h1">
              From Web Developer to Systems Thinker
            </Typography>
            <Typography variant="h5" sx={{ color: "text.secondary", fontWeight: 400 }}>
              First Principles for the Age of AI
            </Typography>
          </Stack>

          <Divider />

          <Stack spacing={2}>
            <Typography variant="h6">Chapters</Typography>
            <List disablePadding>
              {chapters.map((chapter, i) => (
                <ListItemButton
                  key={chapter.slug}
                  component={RouterLink}
                  to={`/chapters/${chapter.slug}`}
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
        </Stack>
      </Container>
    </Box>
  );
}
