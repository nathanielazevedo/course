export type ComplexityRow = {
  op: string;
  value: string;
};

export type DataStructure = {
  id: string;
  name: string;
  tagline: string;
  definition: string;
  properties: string[];
  complexity: ComplexityRow[];
  useCases: string[];
};

export type Difficulty = "Easy" | "Medium" | "Hard";

export type ArgType = "raw" | "tree";

export type TestCase = {
  args: unknown[];
  expected: unknown;
};

export type Question = {
  id: string;
  dsId: string;
  title: string;
  difficulty: Difficulty;
  prompt: string;
  functionName: string;
  starterCode: string;
  solutionCode: string;
  argTypes?: ArgType[];
  resultType?: ArgType;
  tests: TestCase[];
};
