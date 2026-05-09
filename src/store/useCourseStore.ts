import { create } from "zustand";
import { persist } from "zustand/middleware";

type CourseState = {
  quizAnswers: Record<string, number>;
  setQuizAnswer: (id: string, choice: number) => void;
  resetQuizAnswer: (id: string) => void;
};

export const useCourseStore = create<CourseState>()(
  persist(
    (set) => ({
      quizAnswers: {},
      setQuizAnswer: (id, choice) =>
        set((state) => ({
          quizAnswers: { ...state.quizAnswers, [id]: choice },
        })),
      resetQuizAnswer: (id) =>
        set((state) => {
          const next = { ...state.quizAnswers };
          delete next[id];
          return { quizAnswers: next };
        }),
    }),
    { name: "course-progress" },
  ),
);
