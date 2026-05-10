import React, { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useCourseStore } from "../../store/useCourseStore";

type QuizChildProps = {
  id: string;
  answer: number;
  onNext?: () => void;
};

export default function QuizSet({ children }: { children: React.ReactNode }) {
  const answers = useCourseStore((s) => s.quizAnswers);

  const items = React.Children.toArray(children).filter(
    React.isValidElement,
  ) as React.ReactElement<QuizChildProps>[];

  const [currentIndex, setCurrentIndex] = useState(() => {
    let i = 0;
    while (
      i < items.length &&
      answers[items[i].props.id] === items[i].props.answer
    )
      i++;
    return i;
  });

  if (items.length === 0) return null;

  const isDone = currentIndex >= items.length;

  return (
    <Box sx={{ my: 4 }}>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{ mb: 1 }}
        aria-label="Quiz progress"
      >
        {items.map((_, i) => (
          <Box
            key={i}
            sx={{
              width: 28,
              height: 4,
              borderRadius: 2,
              bgcolor:
                i < currentIndex
                  ? "text.primary"
                  : i === currentIndex
                    ? "text.secondary"
                    : "divider",
            }}
          />
        ))}
        <Typography
          variant="caption"
          sx={{
            ml: 1,
            color: "text.secondary",
            fontFamily:
              'ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace',
            letterSpacing: "0.05em",
          }}
        >
          {isDone
            ? `${items.length} / ${items.length} ✓`
            : `${currentIndex + 1} / ${items.length}`}
        </Typography>
      </Stack>

      {isDone ? (
        <Box
          sx={{
            my: 2,
            p: 3,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 1,
            textAlign: "center",
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            ✓ Section quiz complete
          </Typography>
        </Box>
      ) : (
        React.cloneElement(items[currentIndex], {
          onNext: () => setCurrentIndex((i) => i + 1),
        })
      )}
    </Box>
  );
}
