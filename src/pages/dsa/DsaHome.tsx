import {
  Box,
  Container,
  Stack,
  Typography,
  List,
  ListItemButton,
  Button,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { dataStructures } from "../../courses/dsa/dataStructures";

export default function DsaHome() {
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
              Reference & Practice
            </Typography>
            <Typography variant="h2" component="h1">
              Data Structures & Algorithms
            </Typography>
            <Typography variant="h5" sx={{ color: "text.secondary", fontWeight: 400 }}>
              The most common data structures, at a glance
            </Typography>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
        <Stack spacing={2}>
          <Typography variant="h6">Structures</Typography>
          <List disablePadding>
            {dataStructures.map((ds, i) => (
              <ListItemButton
                key={ds.id}
                component={RouterLink}
                to={`/courses/dsa/${ds.id}`}
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
                <Stack spacing={0.25} sx={{ flex: 1 }}>
                  <Typography variant="body1">{ds.name}</Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {ds.tagline}
                  </Typography>
                </Stack>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  →
                </Typography>
              </ListItemButton>
            ))}
          </List>
        </Stack>
      </Container>
    </Box>
  );
}
