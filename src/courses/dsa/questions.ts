import type { Question } from "./types";

export const questions: Question[] = [
  // ---------- Array ----------
  {
    id: 'two-sum',
    dsId: 'array',
    title: 'Two Sum',
    difficulty: 'Easy',
    prompt:
      'Given an array of integers `nums` and an integer `target`, return the indices of the two numbers that add up to `target`, as `[i, j]`. Assume exactly one solution exists and you may not use the same element twice.',
    functionName: 'twoSum',
    starterCode: `function twoSum(nums, target) {
  // your code here
}`,
    solutionCode: `function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) return [seen.get(complement), i];
    seen.set(nums[i], i);
  }
  return [];
}`,
    tests: [
      { args: [[2, 7, 11, 15], 9], expected: [0, 1] },
      { args: [[3, 2, 4], 6], expected: [1, 2] },
      { args: [[3, 3], 6], expected: [0, 1] },
    ],
  },
  {
    id: 'move-zeroes',
    dsId: 'array',
    title: 'Move Zeroes',
    difficulty: 'Easy',
    prompt:
      'Given an array `nums`, return a **new** array with all zeroes moved to the end, preserving the relative order of the non-zero elements.',
    functionName: 'moveZeroes',
    starterCode: `function moveZeroes(nums) {
  // your code here
}`,
    solutionCode: `function moveZeroes(nums) {
  const nonZero = nums.filter((n) => n !== 0);
  const zeroCount = nums.length - nonZero.length;
  return [...nonZero, ...Array(zeroCount).fill(0)];
}`,
    tests: [
      { args: [[0, 1, 0, 3, 12]], expected: [1, 3, 12, 0, 0] },
      { args: [[0, 0, 1]], expected: [1, 0, 0] },
      { args: [[1, 2, 3]], expected: [1, 2, 3] },
    ],
  },

  // ---------- Linked List ----------
  {
    id: 'reverse-linked-list',
    dsId: 'linked-list',
    title: 'Reverse a Linked List',
    difficulty: 'Easy',
    prompt:
      'A linked list is represented here as an array of values from head to tail. Return a **new** array representing the list reversed.',
    functionName: 'reverseList',
    starterCode: `function reverseList(list) {
  // your code here
}`,
    solutionCode: `function reverseList(list) {
  return [...list].reverse();
}`,
    tests: [
      { args: [[1, 2, 3, 4, 5]], expected: [5, 4, 3, 2, 1] },
      { args: [[1]], expected: [1] },
      { args: [[]], expected: [] },
    ],
  },
  {
    id: 'merge-two-sorted-lists',
    dsId: 'linked-list',
    title: 'Merge Two Sorted Lists',
    difficulty: 'Medium',
    prompt:
      'Two sorted linked lists are represented as arrays `list1` and `list2`. Return a new array representing the merged list, still in sorted order.',
    functionName: 'mergeLists',
    starterCode: `function mergeLists(list1, list2) {
  // your code here
}`,
    solutionCode: `function mergeLists(list1, list2) {
  const result = [];
  let i = 0;
  let j = 0;
  while (i < list1.length && j < list2.length) {
    if (list1[i] <= list2[j]) result.push(list1[i++]);
    else result.push(list2[j++]);
  }
  return result.concat(list1.slice(i)).concat(list2.slice(j));
}`,
    tests: [
      { args: [[1, 2, 4], [1, 3, 4]], expected: [1, 1, 2, 3, 4, 4] },
      { args: [[], []], expected: [] },
      { args: [[], [0]], expected: [0] },
    ],
  },

  // ---------- Stack ----------
  {
    id: 'valid-parentheses',
    dsId: 'stack',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    prompt:
      "Given a string `s` containing just the characters '(', ')', '{', '}', '[' and ']', return true if every bracket is closed in the correct order.",
    functionName: 'isValid',
    starterCode: `function isValid(s) {
  // your code here
}`,
    solutionCode: `function isValid(s) {
  const pairs = { ')': '(', ']': '[', '}': '{' };
  const stack = [];
  for (const ch of s) {
    if (ch === '(' || ch === '[' || ch === '{') {
      stack.push(ch);
    } else if (stack.pop() !== pairs[ch]) {
      return false;
    }
  }
  return stack.length === 0;
}`,
    tests: [
      { args: ['()'], expected: true },
      { args: ['()[]{}'], expected: true },
      { args: ['(]'], expected: false },
      { args: ['([)]'], expected: false },
      { args: [''], expected: true },
    ],
  },
  {
    id: 'evaluate-rpn',
    dsId: 'stack',
    title: 'Evaluate Reverse Polish Notation',
    difficulty: 'Medium',
    prompt:
      "Evaluate an arithmetic expression given in Reverse Polish Notation as an array of tokens, each either an integer or one of '+', '-', '*', '/'. Division should truncate toward zero.",
    functionName: 'evalRPN',
    starterCode: `function evalRPN(tokens) {
  // your code here
}`,
    solutionCode: `function evalRPN(tokens) {
  const stack = [];
  for (const t of tokens) {
    if (['+', '-', '*', '/'].includes(t)) {
      const b = stack.pop();
      const a = stack.pop();
      if (t === '+') stack.push(a + b);
      else if (t === '-') stack.push(a - b);
      else if (t === '*') stack.push(a * b);
      else stack.push(Math.trunc(a / b));
    } else {
      stack.push(Number(t));
    }
  }
  return stack.pop();
}`,
    tests: [
      { args: [['2', '1', '+', '3', '*']], expected: 9 },
      { args: [['4', '13', '5', '/', '+']], expected: 6 },
    ],
  },

  // ---------- Queue ----------
  {
    id: 'reverse-first-k',
    dsId: 'queue',
    title: 'Reverse First K of a Queue',
    difficulty: 'Easy',
    prompt:
      'Given a queue represented as an array `queue` and an integer `k`, return a new array where the first `k` elements are reversed and the rest keep their original order.',
    functionName: 'reverseFirstK',
    starterCode: `function reverseFirstK(queue, k) {
  // your code here
}`,
    solutionCode: `function reverseFirstK(queue, k) {
  const first = queue.slice(0, k).reverse();
  const rest = queue.slice(k);
  return [...first, ...rest];
}`,
    tests: [
      { args: [[1, 2, 3, 4, 5], 3], expected: [3, 2, 1, 4, 5] },
      { args: [[1, 2, 3, 4, 5], 0], expected: [1, 2, 3, 4, 5] },
      { args: [[1, 2, 3, 4, 5], 5], expected: [5, 4, 3, 2, 1] },
    ],
  },
  {
    id: 'sliding-window-max',
    dsId: 'queue',
    title: 'Sliding Window Maximum',
    difficulty: 'Medium',
    prompt:
      'Given an array `nums` and a window size `k`, return an array of the maximum value in each contiguous window of size `k` as it slides from left to right.',
    functionName: 'maxSlidingWindow',
    starterCode: `function maxSlidingWindow(nums, k) {
  // your code here
}`,
    solutionCode: `function maxSlidingWindow(nums, k) {
  const result = [];
  const deque = []; // stores indices, values decreasing
  for (let i = 0; i < nums.length; i++) {
    while (deque.length && deque[0] <= i - k) deque.shift();
    while (deque.length && nums[deque[deque.length - 1]] < nums[i]) deque.pop();
    deque.push(i);
    if (i >= k - 1) result.push(nums[deque[0]]);
  }
  return result;
}`,
    tests: [
      { args: [[1, 3, -1, -3, 5, 3, 6, 7], 3], expected: [3, 3, 5, 5, 6, 7] },
      { args: [[1], 1], expected: [1] },
    ],
  },

  // ---------- Hash Table ----------
  {
    id: 'contains-duplicate',
    dsId: 'hash-table',
    title: 'Contains Duplicate',
    difficulty: 'Easy',
    prompt: 'Given an array `nums`, return true if any value appears at least twice.',
    functionName: 'containsDuplicate',
    starterCode: `function containsDuplicate(nums) {
  // your code here
}`,
    solutionCode: `function containsDuplicate(nums) {
  return new Set(nums).size !== nums.length;
}`,
    tests: [
      { args: [[1, 2, 3, 1]], expected: true },
      { args: [[1, 2, 3, 4]], expected: false },
      { args: [[1, 1, 1, 3, 3, 4, 3, 2, 4, 2]], expected: true },
    ],
  },
  {
    id: 'first-unique-char',
    dsId: 'hash-table',
    title: 'First Unique Character',
    difficulty: 'Easy',
    prompt:
      'Given a string `s`, return the index of the first non-repeating character. Return -1 if none exists.',
    functionName: 'firstUniqChar',
    starterCode: `function firstUniqChar(s) {
  // your code here
}`,
    solutionCode: `function firstUniqChar(s) {
  const counts = {};
  for (const ch of s) counts[ch] = (counts[ch] || 0) + 1;
  for (let i = 0; i < s.length; i++) {
    if (counts[s[i]] === 1) return i;
  }
  return -1;
}`,
    tests: [
      { args: ['leetcode'], expected: 0 },
      { args: ['loveleetcode'], expected: 2 },
      { args: ['aabb'], expected: -1 },
    ],
  },

  // ---------- Binary Tree ----------
  {
    id: 'max-depth',
    dsId: 'binary-tree',
    title: 'Maximum Depth of Binary Tree',
    difficulty: 'Easy',
    prompt:
      'A binary tree is given as `root`, where each node has `.val`, `.left`, and `.right`. Return the maximum depth — the number of nodes along the longest path from root to a leaf.',
    functionName: 'maxDepth',
    argTypes: ['tree'],
    starterCode: `function maxDepth(root) {
  // your code here
}`,
    solutionCode: `function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`,
    tests: [
      { args: [[3, 9, 20, null, null, 15, 7]], expected: 3 },
      { args: [[1, null, 2]], expected: 2 },
      { args: [[]], expected: 0 },
    ],
  },
  {
    id: 'invert-tree',
    dsId: 'binary-tree',
    title: 'Invert a Binary Tree',
    difficulty: 'Easy',
    prompt:
      'Given the `root` of a binary tree, invert it (swap every left/right child) and return the root.',
    functionName: 'invertTree',
    argTypes: ['tree'],
    resultType: 'tree',
    starterCode: `function invertTree(root) {
  // your code here
}`,
    solutionCode: `function invertTree(root) {
  if (!root) return null;
  [root.left, root.right] = [invertTree(root.right), invertTree(root.left)];
  return root;
}`,
    tests: [
      { args: [[4, 2, 7, 1, 3, 6, 9]], expected: [4, 7, 2, 9, 6, 3, 1] },
      { args: [[2, 1, 3]], expected: [2, 3, 1] },
      { args: [[]], expected: [] },
    ],
  },

  // ---------- Binary Search Tree ----------
  {
    id: 'validate-bst',
    dsId: 'binary-search-tree',
    title: 'Validate a Binary Search Tree',
    difficulty: 'Medium',
    prompt:
      'Given the `root` of a binary tree, return true if it is a valid binary search tree (every left descendant is smaller than its ancestor, every right descendant is larger).',
    functionName: 'isValidBST',
    argTypes: ['tree'],
    starterCode: `function isValidBST(root, min = -Infinity, max = Infinity) {
  // your code here
}`,
    solutionCode: `function isValidBST(root, min = -Infinity, max = Infinity) {
  if (!root) return true;
  if (root.val <= min || root.val >= max) return false;
  return isValidBST(root.left, min, root.val) && isValidBST(root.right, root.val, max);
}`,
    tests: [
      { args: [[2, 1, 3]], expected: true },
      { args: [[5, 1, 4, null, null, 3, 6]], expected: false },
    ],
  },
  {
    id: 'kth-smallest-bst',
    dsId: 'binary-search-tree',
    title: 'Kth Smallest in a BST',
    difficulty: 'Medium',
    prompt:
      'Given the `root` of a binary search tree and an integer `k`, return the `k`th smallest value in the tree (1-indexed).',
    functionName: 'kthSmallest',
    argTypes: ['tree', 'raw'],
    starterCode: `function kthSmallest(root, k) {
  // your code here
}`,
    solutionCode: `function kthSmallest(root, k) {
  const stack = [];
  let node = root;
  while (node || stack.length) {
    while (node) {
      stack.push(node);
      node = node.left;
    }
    node = stack.pop();
    if (--k === 0) return node.val;
    node = node.right;
  }
  return -1;
}`,
    tests: [
      { args: [[3, 1, 4, null, 2], 1], expected: 1 },
      { args: [[5, 3, 6, 2, 4, null, null, 1], 3], expected: 3 },
    ],
  },

  // ---------- Heap ----------
  {
    id: 'kth-largest',
    dsId: 'heap',
    title: 'Kth Largest Element',
    difficulty: 'Medium',
    prompt: 'Given an array `nums` and an integer `k`, return the `k`th largest element.',
    functionName: 'findKthLargest',
    starterCode: `function findKthLargest(nums, k) {
  // your code here
}`,
    solutionCode: `function findKthLargest(nums, k) {
  return [...nums].sort((a, b) => b - a)[k - 1];
}`,
    tests: [
      { args: [[3, 2, 1, 5, 6, 4], 2], expected: 5 },
      { args: [[3, 2, 3, 1, 2, 4, 5, 5, 6], 4], expected: 4 },
    ],
  },
  {
    id: 'k-smallest',
    dsId: 'heap',
    title: 'K Smallest Numbers',
    difficulty: 'Easy',
    prompt:
      'Given an array `nums` and an integer `k`, return the `k` smallest values, sorted ascending.',
    functionName: 'kSmallest',
    starterCode: `function kSmallest(nums, k) {
  // your code here
}`,
    solutionCode: `function kSmallest(nums, k) {
  return [...nums].sort((a, b) => a - b).slice(0, k);
}`,
    tests: [
      { args: [[7, 10, 4, 3, 20, 15], 3], expected: [3, 4, 7] },
      { args: [[1], 1], expected: [1] },
    ],
  },

  // ---------- Graph ----------
  {
    id: 'bfs-traversal',
    dsId: 'graph',
    title: 'Breadth-First Traversal',
    difficulty: 'Easy',
    prompt:
      'A graph is given as an adjacency list — an object mapping each node to an array of its neighbors. Given the graph and a `start` node, return the nodes in breadth-first order.',
    functionName: 'bfs',
    starterCode: `function bfs(graph, start) {
  // your code here
}`,
    solutionCode: `function bfs(graph, start) {
  const visited = new Set([start]);
  const queue = [start];
  const order = [];
  while (queue.length) {
    const node = queue.shift();
    order.push(node);
    for (const neighbor of graph[node] || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return order;
}`,
    tests: [
      {
        args: [{ A: ['B', 'C'], B: ['D'], C: ['D'], D: [] }, 'A'],
        expected: ['A', 'B', 'C', 'D'],
      },
    ],
  },
  {
    id: 'has-path',
    dsId: 'graph',
    title: 'Path Exists',
    difficulty: 'Easy',
    prompt:
      'A graph is given as an adjacency list. Given the graph, a source node `src`, and a destination node `dst`, return true if a path exists from `src` to `dst`.',
    functionName: 'hasPath',
    starterCode: `function hasPath(graph, src, dst) {
  // your code here
}`,
    solutionCode: `function hasPath(graph, src, dst) {
  const visited = new Set();
  function dfs(node) {
    if (node === dst) return true;
    visited.add(node);
    for (const next of graph[node] || []) {
      if (!visited.has(next) && dfs(next)) return true;
    }
    return false;
  }
  return dfs(src);
}`,
    tests: [
      { args: [{ A: ['B'], B: ['C'], C: [] }, 'A', 'C'], expected: true },
      { args: [{ A: ['B'], B: [], C: [] }, 'A', 'C'], expected: false },
    ],
  },

  // ---------- Trie ----------
  {
    id: 'longest-common-prefix',
    dsId: 'trie',
    title: 'Longest Common Prefix',
    difficulty: 'Easy',
    prompt:
      'Given an array of strings `strs`, return the longest common prefix shared by all of them. Return an empty string if there is none.',
    functionName: 'longestCommonPrefix',
    starterCode: `function longestCommonPrefix(strs) {
  // your code here
}`,
    solutionCode: `function longestCommonPrefix(strs) {
  if (!strs.length) return '';
  let prefix = strs[0];
  for (const s of strs.slice(1)) {
    while (!s.startsWith(prefix)) {
      prefix = prefix.slice(0, -1);
      if (!prefix) return '';
    }
  }
  return prefix;
}`,
    tests: [
      { args: [['flower', 'flow', 'flight']], expected: 'fl' },
      { args: [['dog', 'racecar', 'car']], expected: '' },
    ],
  },
  {
    id: 'count-prefix-matches',
    dsId: 'trie',
    title: 'Count Prefix Matches',
    difficulty: 'Easy',
    prompt:
      'Given an array of `words` and a `prefix` string, return how many words start with that prefix.',
    functionName: 'countPrefixMatches',
    starterCode: `function countPrefixMatches(words, prefix) {
  // your code here
}`,
    solutionCode: `function countPrefixMatches(words, prefix) {
  return words.filter((w) => w.startsWith(prefix)).length;
}`,
    tests: [
      { args: [['apple', 'app', 'apricot', 'banana'], 'ap'], expected: 3 },
      { args: [['dog', 'cat'], 'z'], expected: 0 },
    ],
  },
];

export function getQuestionsForDataStructure(dsId: string): Question[] {
  return questions.filter((q) => q.dsId === dsId);
}

export function getQuestion(id: string): Question | undefined {
  return questions.find((q) => q.id === id);
}
