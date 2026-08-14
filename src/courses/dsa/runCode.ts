// Executes user-submitted JS against a question's test cases, entirely client-side.
// Trees are represented on the "wire" as level-order arrays (LeetCode style, e.g.
// [3,9,20,null,null,15,7]) so problems can stay in plain JS values; buildTree/treeToArray
// convert to and from real {val,left,right} node objects for the user's function.

import type { ArgType, Question, TestCase } from "./types";

type TreeNode = { val: unknown; left: TreeNode | null; right: TreeNode | null };

export function buildTree(arr: unknown[] | null | undefined): TreeNode | null {
  if (!arr || arr.length === 0 || arr[0] === null || arr[0] === undefined) {
    return null;
  }
  const root: TreeNode = { val: arr[0], left: null, right: null };
  const queue = [root];
  let i = 1;
  while (queue.length && i < arr.length) {
    const node = queue.shift()!;
    if (i < arr.length) {
      const leftVal = arr[i++];
      if (leftVal !== null && leftVal !== undefined) {
        node.left = { val: leftVal, left: null, right: null };
        queue.push(node.left);
      }
    }
    if (i < arr.length) {
      const rightVal = arr[i++];
      if (rightVal !== null && rightVal !== undefined) {
        node.right = { val: rightVal, left: null, right: null };
        queue.push(node.right);
      }
    }
  }
  return root;
}

export function treeToArray(root: TreeNode | null): unknown[] {
  if (!root) return [];
  const result: unknown[] = [];
  const queue: (TreeNode | null)[] = [root];
  while (queue.length) {
    const node = queue.shift();
    if (node) {
      result.push(node.val);
      queue.push(node.left);
      queue.push(node.right);
    } else {
      result.push(null);
    }
  }
  while (result.length && result[result.length - 1] === null) {
    result.pop();
  }
  return result;
}

function transformArg(value: unknown, type: ArgType | undefined) {
  if (type === "tree") return buildTree(value as unknown[]);
  return value;
}

function transformResult(value: unknown, type: ArgType | undefined) {
  if (type === "tree") return treeToArray(value as TreeNode | null);
  return value;
}

function clone<T>(value: T): T {
  return typeof structuredClone === "function"
    ? structuredClone(value)
    : JSON.parse(JSON.stringify(value));
}

export type TestOutcome = TestCase & {
  actual?: unknown;
  pass: boolean;
  error?: string;
};

export type RunResult = {
  compileError?: string;
  results: TestOutcome[];
};

// Runs `code` (expected to define a function called `functionName`) against
// every test in `question.tests`. Returns { compileError } or { results }.
export function runTests(code: string, question: Question): RunResult {
  const { functionName, tests, argTypes = [], resultType = "raw" } = question;

  let fn: unknown;
  try {
    // eslint-disable-next-line no-new-func
    const factory = new Function(
      `${code}\n;return typeof ${functionName} === 'function' ? ${functionName} : undefined;`,
    );
    fn = factory();
  } catch (err) {
    return { compileError: (err as Error).message, results: [] };
  }

  if (typeof fn !== "function") {
    return {
      compileError: `Couldn't find a function named "${functionName}". Make sure it's declared exactly as in the starter code.`,
      results: [],
    };
  }

  const results = tests.map((test): TestOutcome => {
    try {
      const args = test.args.map((a, i) => transformArg(clone(a), argTypes[i]));
      const raw = (fn as (...args: unknown[]) => unknown)(...args);
      const actual = transformResult(raw, resultType);
      const pass = JSON.stringify(actual) === JSON.stringify(test.expected);
      return { ...test, actual, pass };
    } catch (err) {
      return { ...test, actual: undefined, pass: false, error: (err as Error).message };
    }
  });

  return { results };
}
