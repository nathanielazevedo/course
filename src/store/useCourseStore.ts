import { create } from "zustand";
import { persist } from "zustand/middleware";

type CourseState = {
  completed: string[];
  toggleCompleted: (chapter: string) => void;
  quizAnswers: Record<string, number>;
  setQuizAnswer: (id: string, choice: number) => void;
  resetQuizAnswer: (id: string) => void;
};

export const useCourseStore = create<CourseState>()(
  persist(
    (set) => ({
      completed: [],
      toggleCompleted: (chapter) =>
        set((state) => ({
          completed: state.completed.includes(chapter)
            ? state.completed.filter((c) => c !== chapter)
            : [...state.completed, chapter],
        })),
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
