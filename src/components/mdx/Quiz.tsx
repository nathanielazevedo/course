import { useState } from "react";
import { Box, Stack, Typography, Button, ButtonBase } from "@mui/material";
import { useCourseStore } from "../../store/useCourseStore";

type QuizProps = {
  id: string;
  question: string;
  options: string[];
  answer: number;
  explanation?: string;
};

export default function Quiz({
  id,
  question,
  options,
  answer,
  explanation,
}: QuizProps) {
  const submittedAnswer = useCourseStore((s) => s.quizAnswers[id]);
  const setQuizAnswer = useCourseStore((s) => s.setQuizAnswer);
  const resetQuizAnswer = useCourseStore((s) => s.resetQuizAnswer);
  const [selected, setSelected] = useState<number | null>(null);

  const isSubmitted = submittedAnswer !== undefined;
  const isCorrect = isSubmitted && submittedAnswer === answer;

  const handleSubmit = () => {
    if (selected === null) return;
    setQuizAnswer(id, selected);
  };

  const handleReset = () => {
    resetQuizAnswer(id);
    setSelected(null);
  };

  return (
    <Box
      sx={{
        my: 4,
        p: 3,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1,
      }}
    >
      <Stack spacing={2.5}>
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          {question}
        </Typography>

        <Stack spacing={1}>
          {options.map((option, i) => {
            const isChosenNow = (isSubmitted ? submittedAnswer : selected) === i;
            const showAsCorrect = isSubmitted && i === answer;
            const showAsWrong =
              isSubmitted && submittedAnswer === i && i !== answer;

            return (
              <ButtonBase
                key={i}
                disabled={isSubmitted}
                onClick={() => setSelected(i)}
                sx={{
                  justifyContent: "flex-start",
                  textAlign: "left",
                  px: 1.75,
                  py: 1.25,
                  border: "1px solid",
                  borderColor:
                    showAsCorrect || showAsWrong || isChosenNow
                      ? "text.primary"
                      : "divider",
                  borderRadius: 1,
                  bgcolor: showAsCorrect ? "text.primary" : "transparent",
                  color: showAsCorrect ? "background.default" : "text.primary",
                  transition: "all 120ms",
                  "&.Mui-disabled": {
                    color: showAsCorrect
                      ? "background.default"
                      : "text.primary",
                    opacity:
                      showAsCorrect || showAsWrong || isChosenNow ? 1 : 0.45,
                  },
                  "&:hover": { borderColor: "text.primary" },
                }}
              >
                <Box
                  sx={{
                    width: 20,
                    mr: 1.5,
                    fontFamily:
                      'ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace',
                    fontSize: "0.95rem",
                    textAlign: "center",
                  }}
                >
                  {showAsCorrect
                    ? "✓"
                    : showAsWrong
                    ? "✕"
                    : isChosenNow
                    ? "●"
                    : "○"}
                </Box>
                <Typography variant="body2" sx={{ flex: 1 }}>
                  {option}
                </Typography>
              </ButtonBase>
            );
          })}
        </Stack>

        {!isSubmitted ? (
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={selected === null}
            sx={{
              alignSelf: "flex-start",
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
            Check answer
          </Button>
        ) : (
          <Stack spacing={1.5}>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {isCorrect ? "✓ Correct" : "✕ Not quite"}
            </Typography>
            {explanation && (
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", lineHeight: 1.6 }}
              >
                {explanation}
              </Typography>
            )}
            <Button
              onClick={handleReset}
              sx={{
                alignSelf: "flex-start",
                px: 0,
                color: "text.secondary",
                "&:hover": { bgcolor: "transparent", color: "text.primary" },
              }}
            >
              Reset
            </Button>
          </Stack>
        )}
      </Stack>
    </Box>
  );
}
