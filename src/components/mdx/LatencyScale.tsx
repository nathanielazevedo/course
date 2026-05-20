import { Box, Stack, Typography } from "@mui/material";
import { keyframes } from "@mui/system";

const MONO =
  'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace';

type Tier = {
  name: string;
  ns: number;
  group: "on-chip" | "in-machine" | "beyond";
};

const REGISTER_NS = 0.3;

const TIERS: Tier[] = [
  { name: "CPU register", ns: 0.3, group: "on-chip" },
  { name: "L1 cache", ns: 1, group: "on-chip" },
  { name: "L2 cache", ns: 3, group: "on-chip" },
  { name: "L3 cache", ns: 10, group: "on-chip" },
  { name: "RAM (DRAM)", ns: 100, group: "in-machine" },
  { name: "SSD (random read)", ns: 100_000, group: "in-machine" },
  { name: "HDD (random seek)", ns: 10_000_000, group: "beyond" },
  {
    name: "Internet round-trip (cross-country)",
    ns: 50_000_000,
    group: "beyond",
  },
];

const GROUP_LABEL: Record<Tier["group"], string> = {
  "on-chip": "On the chip",
  "in-machine": "In the machine",
  beyond: "Beyond the machine",
};

const BALL_SIZE = 10;

const bounce = keyframes`
  0%, 100% { left: 0; }
  50% { left: calc(100% - ${BALL_SIZE}px); }
`;

function formatRealLatency(ns: number): string {
  if (ns < 1000) return `${ns} ns`;
  if (ns < 1_000_000) return `${ns / 1000} µs`;
  return `${ns / 1_000_000} ms`;
}

function formatScaledTime(ns: number): string {
  const seconds = ns / REGISTER_NS;
  if (seconds <= 1.5) return "1 second";
  if (seconds < 60) return `${Math.round(seconds)} seconds`;
  const minutes = seconds / 60;
  if (minutes < 60)
    return minutes < 2
      ? `${minutes.toFixed(1)} minutes`
      : `${Math.round(minutes)} minutes`;
  const hours = minutes / 60;
  if (hours < 24)
    return hours < 2
      ? `${hours.toFixed(1)} hours`
      : `${Math.round(hours)} hours`;
  const days = hours / 24;
  if (days < 365)
    return days < 2 ? `${days.toFixed(1)} days` : `${Math.round(days)} days`;
  const years = days / 365;
  return years < 2
    ? `${years.toFixed(1)} years`
    : `${Math.round(years)} years`;
}

function Track({ ns }: { ns: number }) {
  const durationSec = ns / REGISTER_NS;
  return (
    <Box
      sx={{
        position: "relative",
        height: 18,
        flex: 1,
        minWidth: { xs: 60, sm: 100 },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "50%",
          height: "1px",
          bgcolor: "divider",
          transform: "translateY(-50%)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          width: BALL_SIZE,
          height: BALL_SIZE,
          borderRadius: "50%",
          bgcolor: "text.primary",
          transform: "translateY(-50%)",
          animation: `${bounce} ${durationSec}s linear infinite`,
        }}
      />
    </Box>
  );
}

export default function LatencyScale() {
  const groups: { key: Tier["group"]; label: string; tiers: Tier[] }[] = [];
  for (const tier of TIERS) {
    let g = groups.find((x) => x.key === tier.group);
    if (!g) {
      g = { key: tier.group, label: GROUP_LABEL[tier.group], tiers: [] };
      groups.push(g);
    }
    g.tiers.push(tier);
  }

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
        <Stack spacing={0.75}>
          <Typography
            variant="overline"
            sx={{ color: "text.secondary", letterSpacing: "0.2em" }}
          >
            If a CPU register access took 1 second...
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            ...this is how long the other tiers would take. Each ball is
            traveling back and forth at its tier's real (scaled) speed — the
            faster tiers blur, the slower ones look frozen. They're all moving.
          </Typography>
        </Stack>

        <Stack spacing={3.5} sx={{ mt: 3 }}>
          {groups.map((group) => (
            <Stack key={group.key} spacing={1}>
              <Typography
                sx={{
                  fontSize: "0.6875rem",
                  letterSpacing: "0.2em",
                  color: "text.secondary",
                  textTransform: "uppercase",
                }}
              >
                {group.label}
              </Typography>
              <Box
                sx={{
                  borderTop: "1px solid",
                  borderColor: "divider",
                }}
              >
                {group.tiers.map((tier) => (
                  <Stack
                    key={tier.name}
                    direction="row"
                    alignItems="center"
                    spacing={{ xs: 1.25, sm: 2 }}
                    sx={{
                      py: 1.25,
                      borderBottom: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    <Typography
                      sx={{
                        width: { xs: "8.5em", sm: "11em" },
                        fontSize: { xs: "0.8125rem", sm: "0.9375rem" },
                        flexShrink: 0,
                      }}
                    >
                      {tier.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: MONO,
                        fontSize: "0.75rem",
                        color: "text.secondary",
                        width: { xs: "3.5em", sm: "4.5em" },
                        textAlign: "right",
                        flexShrink: 0,
                      }}
                    >
                      {formatRealLatency(tier.ns)}
                    </Typography>
                    <Track ns={tier.ns} />
                    <Typography
                      sx={{
                        fontFamily: MONO,
                        fontSize: { xs: "0.8125rem", sm: "0.9375rem" },
                        fontWeight: 600,
                        width: { xs: "5.5em", sm: "7em" },
                        textAlign: "right",
                        flexShrink: 0,
                      }}
                    >
                      {formatScaledTime(tier.ns)}
                    </Typography>
                  </Stack>
                ))}
              </Box>
            </Stack>
          ))}
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
          actual latencies scaled by ~3.3 × 10⁹ so register access = 1 second ·
          balls animate at their scaled cycle time
        </Typography>
      </Box>
    </Box>
  );
}
