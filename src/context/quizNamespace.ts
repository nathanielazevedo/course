import { createContext, useContext } from "react";

// Quiz ids in MDX content are only unique within a single course. Section
// wraps rendered content in a QuizNamespaceContext.Provider keyed by course
// slug so two courses can't collide in the shared quizAnswers store.
export const QuizNamespaceContext = createContext<string>("");

export const useQuizNamespace = () => useContext(QuizNamespaceContext);

export const namespacedQuizId = (namespace: string, id: string) =>
  namespace ? `${namespace}:${id}` : id;
