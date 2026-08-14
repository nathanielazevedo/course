import type { DataStructure } from "./types";

export const dataStructures: DataStructure[] = [
  {
    id: 'array',
    name: 'Array',
    tagline: 'Fixed-layout, indexed collection',
    definition:
      'A collection of elements stored in contiguous memory, each accessible directly by a numeric index. The size is typically fixed at creation (dynamic arrays like JS arrays or Python lists resize automatically behind the scenes).',
    properties: [
      'Elements are stored contiguously in memory',
      'Access by index is direct (no traversal needed)',
      'Insertion/removal in the middle requires shifting elements',
    ],
    complexity: [
      { op: 'Access', value: 'O(1)' },
      { op: 'Search', value: 'O(n)' },
      { op: 'Insert (end)', value: 'O(1)*' },
      { op: 'Insert (middle)', value: 'O(n)' },
      { op: 'Delete', value: 'O(n)' },
    ],
    useCases: [
      'Storing ordered, fixed or predictable-size collections',
      'When fast random access by index matters most',
      'Building blocks for other structures (stacks, heaps, hash tables)',
    ],
  },
  {
    id: 'linked-list',
    name: 'Linked List',
    tagline: 'Chain of nodes connected by pointers',
    definition:
      'A linear collection of nodes where each node holds a value and a reference (pointer) to the next node (and optionally the previous one, in a doubly linked list). Elements are not stored contiguously in memory.',
    properties: [
      'No random access — must traverse from the head to reach a node',
      'Efficient insertion/removal once you have a reference to the node',
      'Comes in singly, doubly, and circular variants',
    ],
    complexity: [
      { op: 'Access', value: 'O(n)' },
      { op: 'Search', value: 'O(n)' },
      { op: 'Insert (head)', value: 'O(1)' },
      { op: 'Insert (at node)', value: 'O(1)' },
      { op: 'Delete (at node)', value: 'O(1)' },
    ],
    useCases: [
      'Frequent insertions/removals without shifting elements',
      'Implementing stacks, queues, and adjacency lists',
      'When the final size is unknown and grows/shrinks often',
    ],
  },
  {
    id: 'stack',
    name: 'Stack',
    tagline: 'Last-in, first-out (LIFO)',
    definition:
      'An ordered collection where elements are added and removed from the same end, called the top. The most recently added element is the first one removed — Last In, First Out.',
    properties: [
      'Only the top element is directly accessible',
      'Core operations: push (add), pop (remove), peek (view top)',
      'Can be implemented with an array or a linked list',
    ],
    complexity: [
      { op: 'Push', value: 'O(1)' },
      { op: 'Pop', value: 'O(1)' },
      { op: 'Peek', value: 'O(1)' },
      { op: 'Search', value: 'O(n)' },
    ],
    useCases: [
      'Undo/redo functionality',
      'Function call management (the call stack)',
      'Expression evaluation and syntax parsing (matching brackets)',
      'Depth-first search (DFS)',
    ],
  },
  {
    id: 'queue',
    name: 'Queue',
    tagline: 'First-in, first-out (FIFO)',
    definition:
      'An ordered collection where elements are added at the back and removed from the front. The first element added is the first one removed — First In, First Out.',
    properties: [
      'Two ends: the front (for removal) and the back (for insertion)',
      'Core operations: enqueue (add), dequeue (remove), peek (view front)',
      'Variants include circular queues, deques, and priority queues',
    ],
    complexity: [
      { op: 'Enqueue', value: 'O(1)' },
      { op: 'Dequeue', value: 'O(1)' },
      { op: 'Peek', value: 'O(1)' },
      { op: 'Search', value: 'O(n)' },
    ],
    useCases: [
      'Task scheduling and job processing',
      'Breadth-first search (BFS)',
      'Buffering data streams (e.g., IO, message queues)',
    ],
  },
  {
    id: 'hash-table',
    name: 'Hash Table',
    tagline: 'Key-value lookup via hashing',
    definition:
      'A structure that maps keys to values using a hash function to compute an index into an underlying array (bucket), enabling near-constant-time lookups. Collisions (two keys hashing to the same bucket) are handled via chaining or open addressing.',
    properties: [
      'Keys are hashed to determine storage location',
      'No inherent ordering of elements',
      'Performance depends on hash function quality and load factor',
    ],
    complexity: [
      { op: 'Access', value: 'O(1) avg / O(n) worst' },
      { op: 'Search', value: 'O(1) avg / O(n) worst' },
      { op: 'Insert', value: 'O(1) avg / O(n) worst' },
      { op: 'Delete', value: 'O(1) avg / O(n) worst' },
    ],
    useCases: [
      'Fast lookups by key (dictionaries, caches, sets)',
      'Counting/frequency tracking',
      'Deduplication',
    ],
  },
  {
    id: 'binary-tree',
    name: 'Binary Tree',
    tagline: 'Hierarchical nodes, up to two children',
    definition:
      'A hierarchical structure of nodes where each node has at most two children, typically referred to as the left and right child. The topmost node is the root.',
    properties: [
      'Hierarchical, non-linear structure',
      'Each node has 0, 1, or 2 children',
      'Special forms include balanced, complete, and full binary trees',
    ],
    complexity: [
      { op: 'Access', value: 'O(n)' },
      { op: 'Search', value: 'O(n)' },
      { op: 'Insert', value: 'O(n)' },
      { op: 'Delete', value: 'O(n)' },
    ],
    useCases: [
      'Representing hierarchical data (file systems, org charts)',
      'Basis for more specialized trees (BSTs, heaps, tries)',
      'Expression trees for parsing',
    ],
  },
  {
    id: 'binary-search-tree',
    name: 'Binary Search Tree (BST)',
    tagline: 'Ordered binary tree for fast search',
    definition:
      'A binary tree with an ordering rule: for every node, all values in its left subtree are smaller and all values in its right subtree are larger. This ordering enables efficient searching, insertion, and deletion.',
    properties: [
      'In-order traversal visits nodes in sorted order',
      'Performance depends on the tree staying balanced',
      'Unbalanced BSTs can degrade to a linked list (O(n))',
    ],
    complexity: [
      { op: 'Access', value: 'O(log n) avg / O(n) worst' },
      { op: 'Search', value: 'O(log n) avg / O(n) worst' },
      { op: 'Insert', value: 'O(log n) avg / O(n) worst' },
      { op: 'Delete', value: 'O(log n) avg / O(n) worst' },
    ],
    useCases: [
      'Maintaining sorted data with efficient lookups',
      'Range queries (find all values between X and Y)',
      'Basis for self-balancing trees (AVL, Red-Black)',
    ],
  },
  {
    id: 'heap',
    name: 'Heap',
    tagline: 'Priority-ordered complete binary tree',
    definition:
      'A complete binary tree that satisfies the heap property: in a min-heap, every parent is smaller than its children; in a max-heap, every parent is larger. The root always holds the min (or max) element.',
    properties: [
      'Always a complete tree — efficiently stored as an array',
      'Only the root is directly accessible for min/max',
      'Not fully sorted — only the heap-order property holds',
    ],
    complexity: [
      { op: 'Find min/max', value: 'O(1)' },
      { op: 'Insert', value: 'O(log n)' },
      { op: 'Delete min/max', value: 'O(log n)' },
      { op: 'Search (arbitrary)', value: 'O(n)' },
    ],
    useCases: [
      'Priority queues',
      'Scheduling algorithms',
      'Heap sort',
      "Efficient graph algorithms (Dijkstra's, Prim's)",
    ],
  },
  {
    id: 'graph',
    name: 'Graph',
    tagline: 'Nodes connected by arbitrary edges',
    definition:
      'A collection of nodes (vertices) connected by edges, which may be directed or undirected, and weighted or unweighted. Unlike trees, graphs can contain cycles and have no single root.',
    properties: [
      'Represented via adjacency lists or adjacency matrices',
      'Can be directed, undirected, weighted, cyclic, or acyclic',
      'Traversed via BFS or DFS',
    ],
    complexity: [
      { op: 'Add vertex', value: 'O(1)' },
      { op: 'Add edge', value: 'O(1)' },
      { op: 'Traversal (BFS/DFS)', value: 'O(V + E)' },
      { op: 'Search', value: 'O(V + E)' },
    ],
    useCases: [
      'Modeling networks (social, road, computer)',
      'Dependency resolution',
      'Shortest-path and routing algorithms',
    ],
  },
  {
    id: 'trie',
    name: 'Trie (Prefix Tree)',
    tagline: 'Tree structured for string prefixes',
    definition:
      'A tree in which each node represents a character, and paths from the root spell out strings. Common prefixes are shared among branches, making it efficient for prefix-based string operations.',
    properties: [
      'Each path from root to a marked node represents a stored word',
      'Shared prefixes reduce redundant storage',
      'Lookup time depends on key length, not the number of stored entries',
    ],
    complexity: [
      { op: 'Search', value: 'O(k), k = key length' },
      { op: 'Insert', value: 'O(k)' },
      { op: 'Delete', value: 'O(k)' },
      { op: 'Prefix search', value: 'O(k)' },
    ],
    useCases: [
      'Autocomplete and typeahead suggestions',
      'Spell checking',
      'IP routing (longest prefix match)',
    ],
  },
];
