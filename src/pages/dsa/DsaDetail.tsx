import type { ComponentType } from "react";
import {
  Box,
  Container,
  Stack,
  Typography,
  Divider,
  Button,
  List,
  ListItem,
  ListItemButton,
} from "@mui/material";
import { Link as RouterLink, useParams, Navigate } from "react-router-dom";
import { dataStructures } from "../../courses/dsa/dataStructures";
import { getQuestionsForDataStructure } from "../../courses/dsa/questions";
import Tag from "../../components/Tag";
import ArrayVisual from "../../components/dsa/ArrayVisual";
import LinkedListVisual from "../../components/dsa/LinkedListVisual";
import StackVisual from "../../components/dsa/StackVisual";

// Maps a data structure's id to its interactive visual. Structures without
// an entry simply skip the "Visualize" section below.
const visuals: Record<string, ComponentType> = {
  array: ArrayVisual,
  "linked-list": LinkedListVisual,
  stack: StackVisual,
};

export default function DsaDetail() {
  const { structureId = "" } = useParams();
  const ds = dataStructures.find((d) => d.id === structureId);
  const questions = ds ? getQuestionsForDataStructure(ds.id) : [];
  const Visual = ds ? visuals[ds.id] : undefined;

  if (!ds) return <Navigate to="/courses/dsa" replace />;

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
              to="/courses/dsa"
              sx={{
                alignSelf: "flex-start",
                px: 0,
                color: "text.secondary",
                "&:hover": { bgcolor: "transparent", color: "text.primary" },
              }}
            >
              ← All structures
            </Button>

            <Stack spacing={2}>
              <Typography
                variant="overline"
                sx={{ letterSpacing: "0.2em", color: "text.secondary" }}
              >
                {ds.tagline}
              </Typography>
              <Typography variant="h2" component="h1">
                {ds.name}
              </Typography>
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
        <Stack spacing={6}>
          <Stack spacing={2}>
            <Typography variant="h6">Definition</Typography>
            <Typography
              variant="body1"
              sx={{ color: "text.primary", lineHeight: 1.7 }}
            >
              {ds.definition}
            </Typography>
          </Stack>

          {Visual && (
            <Stack spacing={2}>
              <Typography variant="h6">Visualize</Typography>
              <Visual />
            </Stack>
          )}

          <Stack spacing={2}>
            <Typography variant="h6">Key Properties</Typography>
            <Box component="ul" sx={{ pl: 3, m: 0 }}>
              {ds.properties.map((prop, i) => (
                <Typography
                  key={i}
                  component="li"
                  variant="body1"
                  sx={{ lineHeight: 1.7, mb: 0.5 }}
                >
                  {prop}
                </Typography>
              ))}
            </Box>
          </Stack>

          <Stack spacing={2}>
            <Typography variant="h6">Time Complexity</Typography>
            <List disablePadding>
              {ds.complexity.map((row, i) => (
                <ListItem
                  key={row.op}
                  disableGutters
                  sx={{
                    py: 1,
                    borderTop: i === 0 ? "1px solid" : "none",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Typography variant="body1" sx={{ flex: 1 }}>
                    {row.op}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      fontFamily:
                        'ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace',
                    }}
                  >
                    {row.value}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </Stack>

          <Stack spacing={2}>
            <Typography variant="h6">Common Use Cases</Typography>
            <Box component="ul" sx={{ pl: 3, m: 0 }}>
              {ds.useCases.map((useCase, i) => (
                <Typography
                  key={i}
                  component="li"
                  variant="body1"
                  sx={{ lineHeight: 1.7, mb: 0.5 }}
                >
                  {useCase}
                </Typography>
              ))}
            </Box>
          </Stack>

          {questions.length > 0 && (
            <>
              <Divider />
              <Stack spacing={2}>
                <Typography variant="h6">Practice</Typography>
                <List disablePadding>
                  {questions.map((q, i) => (
                    <ListItemButton
                      key={q.id}
                      component={RouterLink}
                      to={`/courses/dsa/${ds.id}/practice/${q.id}`}
                      sx={{
                        px: 0,
                        py: 1.5,
                        gap: 1.5,
                        borderTop: i === 0 ? "1px solid" : "none",
                        borderBottom: "1px solid",
                        borderColor: "divider",
                        color: "text.primary",
                        "&:hover": { bgcolor: "transparent" },
                      }}
                    >
                      <Typography variant="body1" sx={{ flex: 1 }}>
                        {q.title}
                      </Typography>
                      <Tag>{q.difficulty}</Tag>
                      <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        →
                      </Typography>
                    </ListItemButton>
                  ))}
                </List>
              </Stack>
            </>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
