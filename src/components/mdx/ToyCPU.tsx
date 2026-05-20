import { useState, useRef, useEffect, useCallback } from "react";
import { Box, Stack, Typography, Button } from "@mui/material";

const MONO =
  'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace';

type RegName = "R0" | "R1" | "R2" | "R3";

type Instr =
  | { kind: "load"; dest: RegName; imm: number }
  | { kind: "add"; dest: RegName; src: RegName }
  | { kind: "store"; src: RegName; addr: number }
  | { kind: "halt" };

type Cell = { type: "instr"; instr: Instr } | { type: "data"; value: number };

type Stage = "idle" | "fetch" | "decode" | "execute";

type Regs = { pc: number; R0: number; R1: number; R2: number; R3: number };

const PROGRAM: Cell[] = [
  { type: "instr", instr: { kind: "load", dest: "R0", imm: 5 } },
  { type: "instr", instr: { kind: "load", dest: "R1", imm: 3 } },
  { type: "instr", instr: { kind: "add", dest: "R0", src: "R1" } },
  { type: "instr", instr: { kind: "store", src: "R0", addr: 12 } },
  { type: "instr", instr: { kind: "halt" } },
];

const INITIAL_MEMORY: Cell[] = [
  ...PROGRAM,
  ...Array.from(
    { length: 16 - PROGRAM.length },
    () => ({ type: "data", value: 0 }) as Cell,
  ),
];

const INITIAL_REGS: Regs = { pc: 0, R0: 0, R1: 0, R2: 0, R3: 0 };

const STAGE_MS = 550;
const AUTO_GAP_MS = 250;

function cellLines(cell: Cell): { line1: string; line2: string } | null {
  if (cell.type !== "instr") return null;
  const i = cell.instr;
  switch (i.kind) {
    case "load":
      return { line1: "LOAD", line2: `${i.dest}, ${i.imm}` };
    case "add":
      return { line1: "ADD", line2: `${i.dest}, ${i.src}` };
    case "store":
      return { line1: "STORE", line2: `${i.src}, [${i.addr}]` };
    case "halt":
      return { line1: "HALT", line2: "" };
  }
}

function formatInstr(i: Instr): string {
  switch (i.kind) {
    case "load":
      return `LOAD ${i.dest}, ${i.imm}`;
    case "add":
      return `ADD ${i.dest}, ${i.src}`;
    case "store":
      return `STORE ${i.src}, [${i.addr}]`;
    case "halt":
      return "HALT";
  }
}

function affectedReg(i: Instr): RegName | null {
  return i.kind === "load" || i.kind === "add" ? i.dest : null;
}

function affectedMemAddr(i: Instr): number | null {
  return i.kind === "store" ? i.addr : null;
}

function decodeRows(i: Instr): [string, string][] {
  const rows: [string, string][] = [["opcode", i.kind.toUpperCase()]];
  switch (i.kind) {
    case "load":
      rows.push(["dest", i.dest], ["value", String(i.imm)]);
      break;
    case "add":
      rows.push(["dest", i.dest], ["src", i.src]);
      break;
    case "store":
      rows.push(["src", i.src], ["address", `[${i.addr}]`]);
      break;
    case "halt":
      break;
  }
  return rows;
}

function executeDescription(i: Instr, regs: Regs): string {
  switch (i.kind) {
    case "load":
      return `${i.dest} ← ${i.imm}`;
    case "add":
      return `${i.dest} ← ${regs[i.dest]} + ${regs[i.src]} = ${
        regs[i.dest] + regs[i.src]
      }`;
    case "store":
      return `mem[${i.addr}] ← ${i.src} (${regs[i.src]})`;
    case "halt":
      return "stop";
  }
}

export default function ToyCPU() {
  const [memory, setMemory] = useState<Cell[]>(INITIAL_MEMORY);
  const [regs, setRegs] = useState<Regs>(INITIAL_REGS);
  const [ir, setIr] = useState<Instr | null>(null);
  const [stage, setStage] = useState<Stage>("idle");
  const [halted, setHalted] = useState(false);
  const [running, setRunning] = useState(false);
  const [activePC, setActivePC] = useState<number | null>(null);

  const timeoutsRef = useRef<number[]>([]);

  const clearTimeouts = useCallback(() => {
    for (const t of timeoutsRef.current) window.clearTimeout(t);
    timeoutsRef.current = [];
  }, []);

  useEffect(() => () => clearTimeouts(), [clearTimeouts]);

  const step = useCallback(() => {
    if (halted || stage !== "idle") return;
    const pc = regs.pc;
    const cell = memory[pc];
    if (!cell || cell.type !== "instr") {
      setHalted(true);
      return;
    }
    const instr = cell.instr;
    setActivePC(pc);
    setStage("fetch");
    setIr(instr);

    const t1 = window.setTimeout(() => {
      setStage("decode");
      const t2 = window.setTimeout(() => {
        setStage("execute");
        setRegs((prev) => {
          const next: Regs = { ...prev };
          switch (instr.kind) {
            case "load":
              next[instr.dest] = instr.imm;
              next.pc = prev.pc + 1;
              break;
            case "add":
              next[instr.dest] = prev[instr.dest] + prev[instr.src];
              next.pc = prev.pc + 1;
              break;
            case "store":
              setMemory((m) => {
                const nm = [...m];
                nm[instr.addr] = { type: "data", value: prev[instr.src] };
                return nm;
              });
              next.pc = prev.pc + 1;
              break;
            case "halt":
              setHalted(true);
              break;
          }
          return next;
        });
        const t3 = window.setTimeout(() => {
          setStage("idle");
          setIr(null);
          setActivePC(null);
        }, STAGE_MS);
        timeoutsRef.current.push(t3);
      }, STAGE_MS);
      timeoutsRef.current.push(t2);
    }, STAGE_MS);
    timeoutsRef.current.push(t1);
  }, [halted, stage, regs.pc, memory]);

  useEffect(() => {
    if (running && !halted && stage === "idle") {
      const t = window.setTimeout(step, AUTO_GAP_MS);
      timeoutsRef.current.push(t);
    }
  }, [running, halted, stage, step]);

  const reset = () => {
    clearTimeouts();
    setMemory(INITIAL_MEMORY);
    setRegs(INITIAL_REGS);
    setIr(null);
    setStage("idle");
    setHalted(false);
    setRunning(false);
    setActivePC(null);
  };

  const renderCell = (cell: Cell, idx: number) => {
    const isActive = activePC === idx;
    const isWritten =
      stage === "execute" && ir && affectedMemAddr(ir) === idx;
    const lines = cellLines(cell);

    return (
      <Box
        key={idx}
        sx={{
          width: { xs: 72, sm: 80 },
          height: { xs: 56, sm: 62 },
          border: "1px solid",
          borderColor: isActive ? "text.primary" : "divider",
          borderWidth: isActive ? 2 : 1,
          bgcolor: isWritten ? "grey.100" : "transparent",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          flexShrink: 0,
          transition: "background-color 200ms",
          position: "relative",
        }}
      >
        <Typography
          sx={{
            position: "absolute",
            top: 2,
            left: 4,
            fontFamily: MONO,
            fontSize: "0.5625rem",
            color: "text.secondary",
            lineHeight: 1,
          }}
        >
          {idx.toString().padStart(2, "0")}
        </Typography>
        {lines ? (
          <Stack spacing={0.25} alignItems="center">
            <Typography
              sx={{
                fontFamily: MONO,
                fontSize: { xs: "0.6875rem", sm: "0.75rem" },
                fontWeight: 600,
                lineHeight: 1,
              }}
            >
              {lines.line1}
            </Typography>
            {lines.line2 && (
              <Typography
                sx={{
                  fontFamily: MONO,
                  fontSize: { xs: "0.625rem", sm: "0.6875rem" },
                  color: "text.secondary",
                  lineHeight: 1,
                }}
              >
                {lines.line2}
              </Typography>
            )}
          </Stack>
        ) : (
          <Typography
            sx={{
              fontFamily: MONO,
              fontSize: { xs: "0.9375rem", sm: "1.0625rem" },
              fontWeight: 600,
              lineHeight: 1,
            }}
          >
            {cell.type === "data" ? cell.value : ""}
          </Typography>
        )}
      </Box>
    );
  };

  const row1 = memory.slice(0, 8);
  const row2 = memory.slice(8, 16);

  const stageLabel = halted
    ? "Halted"
    : stage === "idle"
      ? "Idle"
      : stage.charAt(0).toUpperCase() + stage.slice(1);

  return (
    <Box
      sx={{
        my: 3,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1,
        bgcolor: "background.default",
      }}
    >
      <Box sx={{ p: { xs: 2, sm: 3 } }}>
        <Stack spacing={3}>
          <Stack spacing={1}>
            <Typography
              sx={{
                fontSize: "0.6875rem",
                letterSpacing: "0.2em",
                color: "text.secondary",
                textTransform: "uppercase",
              }}
            >
              Memory
            </Typography>
            <Box
              sx={{
                overflowX: "auto",
                mx: { xs: -2, sm: -3 },
                px: { xs: 2, sm: 3 },
              }}
            >
              <Stack spacing={1} sx={{ minWidth: "fit-content" }}>
                <Stack direction="row" spacing={1}>
                  {row1.map((c, i) => renderCell(c, i))}
                </Stack>
                <Stack direction="row" spacing={1}>
                  {row2.map((c, i) => renderCell(c, i + 8))}
                </Stack>
              </Stack>
            </Box>
          </Stack>

          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={{ xs: 2, md: 3 }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  fontSize: "0.6875rem",
                  letterSpacing: "0.2em",
                  color: "text.secondary",
                  textTransform: "uppercase",
                  mb: 1,
                }}
              >
                Registers
              </Typography>
              <Stack spacing={0}>
                {(["pc", "R0", "R1", "R2", "R3"] as const).map((r) => {
                  const isAffected =
                    stage === "execute" &&
                    ir !== null &&
                    r !== "pc" &&
                    affectedReg(ir) === r;
                  return (
                    <Stack
                      key={r}
                      direction="row"
                      spacing={2}
                      sx={{
                        py: 0.625,
                        px: 1,
                        bgcolor: isAffected ? "grey.100" : "transparent",
                        transition: "background-color 200ms",
                        borderBottom: "1px solid",
                        borderColor: "divider",
                        "&:first-of-type": {
                          borderTop: "1px solid",
                          borderColor: "divider",
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: MONO,
                          fontSize: "0.8125rem",
                          color: "text.secondary",
                          width: "2.5em",
                        }}
                      >
                        {r.toUpperCase()}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: MONO,
                          fontSize: "0.8125rem",
                          fontWeight: 600,
                        }}
                      >
                        {regs[r]}
                      </Typography>
                    </Stack>
                  );
                })}
              </Stack>
            </Box>

            <Box sx={{ flex: 1.4 }}>
              <Typography
                sx={{
                  fontSize: "0.6875rem",
                  letterSpacing: "0.2em",
                  color: "text.secondary",
                  textTransform: "uppercase",
                  mb: 1,
                }}
              >
                {stageLabel}
              </Typography>
              <Box
                sx={{
                  fontFamily: MONO,
                  p: 1.5,
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 1,
                  minHeight: "6.5em",
                }}
              >
                {ir ? (
                  <Stack spacing={1}>
                    <Typography
                      sx={{
                        fontFamily: MONO,
                        fontSize: "0.9375rem",
                        fontWeight: 600,
                      }}
                    >
                      {formatInstr(ir)}
                    </Typography>
                    {stage === "decode" && (
                      <Stack spacing={0.25}>
                        {decodeRows(ir).map(([k, v]) => (
                          <Stack key={k} direction="row" spacing={1.5}>
                            <Typography
                              sx={{
                                fontFamily: MONO,
                                fontSize: "0.6875rem",
                                color: "text.secondary",
                                width: "4em",
                              }}
                            >
                              {k}
                            </Typography>
                            <Typography
                              sx={{
                                fontFamily: MONO,
                                fontSize: "0.6875rem",
                              }}
                            >
                              {v}
                            </Typography>
                          </Stack>
                        ))}
                      </Stack>
                    )}
                    {stage === "execute" && (
                      <Typography
                        sx={{
                          fontFamily: MONO,
                          fontSize: "0.75rem",
                          color: "text.secondary",
                        }}
                      >
                        {executeDescription(ir, regs)}
                      </Typography>
                    )}
                  </Stack>
                ) : (
                  <Typography
                    sx={{
                      fontFamily: MONO,
                      fontSize: "0.8125rem",
                      color: "text.secondary",
                    }}
                  >
                    {halted
                      ? "program complete"
                      : "press Step to fetch the next instruction"}
                  </Typography>
                )}
              </Box>
            </Box>
          </Stack>

          <Stack direction="row" spacing={1.5}>
            <Button
              variant="contained"
              onClick={step}
              disabled={halted || stage !== "idle" || running}
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
              Step
            </Button>
            <Button
              variant="outlined"
              onClick={() => setRunning((r) => !r)}
              disabled={halted}
              sx={{
                borderColor: "divider",
                color: "text.primary",
                "&:hover": { borderColor: "text.primary" },
              }}
            >
              {running ? "Pause" : "Run"}
            </Button>
            <Button
              onClick={reset}
              sx={{
                color: "text.secondary",
                "&:hover": { bgcolor: "transparent", color: "text.primary" },
              }}
            >
              Reset
            </Button>
          </Stack>
        </Stack>
      </Box>

      <Box
        sx={{
          px: { xs: 2, sm: 3 },
          py: 1.25,
          borderTop: "1px solid",
          borderColor: "divider",
          bgcolor: "grey.50",
        }}
      >
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          a toy CPU running a tiny program · real instructions are bit
          patterns, shown here as mnemonics
        </Typography>
      </Box>
    </Box>
  );
}
