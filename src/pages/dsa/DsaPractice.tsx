import { useEffect, useMemo, useState } from "react";
import { useParams, Navigate, Link as RouterLink } from "react-router-dom";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import {
  Box,
  Container,
  Stack,
  Typography,
  Divider,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import { dataStructures } from "../../courses/dsa/dataStructures";
import { getQuestion } from "../../courses/dsa/questions";
import { runTests } from "../../courses/dsa/runCode";
import type { RunResult } from "../../courses/dsa/runCode";
import Tag from "../../components/Tag";

function storageKey(qid: string) {
  return `dsa-code-${qid}`;
}

const framedBox = {
  p: 3,
  border: "1px solid",
  borderColor: "divider",
  borderRadius: 1,
} as const;

export default function DsaPractice() {
  const { structureId = "", questionId = "" } = useParams();
  const ds = dataStructures.find((d) => d.id === structureId);
  const question = getQuestion(questionId);

  const [tab, setTab] = useState(0);
  const [code, setCode] = useState("");
  const [result, setResult] = useState<RunResult | null>(null);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!question) return;
    const saved = window.localStorage.getItem(storageKey(question.id));
    setCode(saved ?? question.starterCode);
    setResult(null);
    setTab(0);
  }, [question]);

  useEffect(() => {
    if (!question) return;
    window.localStorage.setItem(storageKey(question.id), code);
  }, [code, question]);

  const extensions = useMemo(() => [javascript()], []);

  if (!ds || !question || question.dsId !== ds.id) {
    return <Navigate to="/courses/dsa" replace />;
  }

  const handleRun = () => {
    setRunning(true);
    // Let the button's pressed state paint before we block the main thread.
    setTimeout(() => {
      setResult(runTests(code, question));
      setRunning(false);
    }, 0);
  };

  const handleReset = () => {
    setCode(question.starterCode);
    setResult(null);
  };

  const passCount = result?.results.filter((r) => r.pass).length ?? 0;
  const totalCount = result?.results.length ?? 0;
  const allPassed = totalCount > 0 && passCount === totalCount;

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
              to={`/courses/dsa/${ds.id}`}
              sx={{
                alignSelf: "flex-start",
                px: 0,
                color: "text.secondary",
                "&:hover": { bgcolor: "transparent", color: "text.primary" },
              }}
            >
              ← {ds.name}
            </Button>

            <Stack spacing={2}>
              <Typography
                variant="overline"
                sx={{ letterSpacing: "0.2em", color: "text.secondary" }}
              >
                Practice
              </Typography>
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Typography variant="h2" component="h1">
                  {question.title}
                </Typography>
                <Tag>{question.difficulty}</Tag>
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
        <Stack spacing={4}>
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            sx={{
              minHeight: 0,
              borderBottom: "1px solid",
              borderColor: "divider",
              "& .MuiTab-root": {
                textTransform: "none",
                fontWeight: 500,
                minHeight: 0,
                py: 1.5,
                px: 0,
                mr: 4,
                color: "text.secondary",
              },
              "& .MuiTab-root.Mui-selected": { color: "text.primary" },
              "& .MuiTabs-indicator": { bgcolor: "text.primary" },
            }}
          >
            <Tab label="Problem" disableRipple />
            <Tab label="Solution" disableRipple />
          </Tabs>

          {tab === 0 && (
            <Stack spacing={3}>
              <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                {question.prompt}
              </Typography>

              <Box sx={{ border: "1px solid", borderColor: "divider", borderRadius: 1, overflow: "hidden" }}>
                <CodeMirror
                  value={code}
                  height="260px"
                  extensions={extensions}
                  onChange={setCode}
                  basicSetup={{ tabSize: 2 }}
                />
              </Box>

              <Stack direction="row" spacing={2} alignItems="center">
                <Button
                  variant="contained"
                  onClick={handleRun}
                  disabled={running}
                  sx={{
                    bgcolor: "text.primary",
                    color: "background.default",
                    "&:hover": { bgcolor: "text.primary", opacity: 0.85 },
                    "&.Mui-disabled": {
                      bgcolor: "text.primary",
                      color: "background.default",
                      opacity: 0.3,
                    },
                  }}
                >
                  Run Tests
                </Button>
                <Button
                  onClick={handleReset}
                  sx={{
                    px: 0,
                    color: "text.secondary",
                    "&:hover": { bgcolor: "transparent", color: "text.primary" },
                  }}
                >
                  Reset
                </Button>
              </Stack>

              {result?.compileError && (
                <Box sx={framedBox}>
                  <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
                    ✕ Error
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      fontFamily:
                        'ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace',
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {result.compileError}
                  </Typography>
                </Box>
              )}

              {result && !result.compileError && (
                <Box sx={framedBox}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ mb: 2 }}
                  >
                    <Typography variant="h6">Test Results</Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: allPassed ? 600 : 400,
                        color: allPassed ? "text.primary" : "text.secondary",
                        fontFamily:
                          'ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace',
                      }}
                    >
                      {passCount} / {totalCount} passed
                      {allPassed ? " ✓" : ""}
                    </Typography>
                  </Stack>
                  <Stack divider={<Divider />} spacing={1.5}>
                    {result.results.map((r, i) => (
                      <Box key={i} sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
                        <Box
                          sx={{
                            width: 16,
                            fontFamily:
                              'ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace',
                            fontSize: "0.9rem",
                          }}
                        >
                          {r.pass ? "✓" : "✕"}
                        </Box>
                        <Box sx={{ minWidth: 0 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            Test {i + 1}
                          </Typography>
                          <Typography
                            variant="body2"
                            component="pre"
                            sx={{
                              m: 0,
                              color: "text.secondary",
                              fontFamily:
                                'ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace',
                              whiteSpace: "pre-wrap",
                              wordBreak: "break-word",
                            }}
                          >
                            input: {JSON.stringify(r.args)}
                            {"\n"}expected: {JSON.stringify(r.expected)}
                            {!r.pass &&
                              `\nactual: ${r.error ? `error — ${r.error}` : JSON.stringify(r.actual)}`}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              )}
            </Stack>
          )}

          {tab === 1 && (
            <Stack spacing={3}>
              <Box sx={framedBox}>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  No judgment here — peek if you want, then head back to Problem and
                  try it yourself.
                </Typography>
              </Box>
              <Box sx={{ border: "1px solid", borderColor: "divider", borderRadius: 1, overflow: "hidden" }}>
                <CodeMirror
                  value={question.solutionCode}
                  height="260px"
                  extensions={extensions}
                  editable={false}
                  basicSetup={{ tabSize: 2 }}
                />
              </Box>
            </Stack>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
