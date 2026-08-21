import type { ChapterInput } from "../../lib/chapters";

export const chapterInput: ChapterInput[] = [
  {
    title: "What Programming Really Is",
    description:
      "What a programming language actually is underneath its syntax, how the same ideas resurface in every language, and the pipeline that turns source code you type into instructions a machine executes.",
    sections: [
      "What Is a Programming Language?",
      "The Same Idea, Different Syntax",
      "How Source Code Becomes Execution",
      "Compilation, Interpretation, and JIT Compilation",
      "Runtime Environments",
    ],
  },
  {
    title: "Values, Variables, and Types",
    description:
      "The raw material every program is built from — values, the names we bind to them, and the type systems languages use to decide what operations make sense on them.",
    sections: [
      "What Is a Value?",
      "What Is a Variable?",
      "Static vs. Dynamic Typing",
      "Strong and Weak Typing",
      "Primitive and Composite Types",
    ],
  },
  {
    title: "Control Flow",
    description:
      "How programs decide what happens next — branching, looping, exiting early, and calling themselves — the handful of control-flow shapes every language builds its logic from.",
    sections: [
      "How Programs Make Decisions",
      "Iteration",
      "Control Flow Beyond Loops",
      "Recursion",
      "Pattern Matching and Structured Control",
    ],
  },
  {
    title: "Functions",
    description:
      "The unit that turns a sprawling program into composable pieces — what a function is, what actually happens on the call stack, how arguments reach it, and how functions become values in their own right.",
    sections: [
      "What Is a Function?",
      "Function Calls Under the Hood",
      "Parameters, Arguments, and Passing Data",
      "Functions as Values",
      "Higher-Order Functions",
    ],
  },
  {
    title: "Scope, State, and Memory",
    description:
      "Where names are visible, how long values live, and the two regions of memory — stack and heap — every running program is quietly juggling underneath its variables.",
    sections: [
      "Scope and Lifetime",
      "The Stack",
      "The Heap",
      "Pointers and References",
      "Memory Management",
    ],
  },
  {
    title: "Objects and Program Organization",
    description:
      "Bundling state and behavior together — what an object is, how classes and inheritance build on that idea, and the alternatives languages offer for organizing data and behavior at scale.",
    sections: [
      "What Is an Object?",
      "Classes",
      "Inheritance and Polymorphism",
      "Composition and Interfaces",
      "Structs, Records, and Data Classes",
    ],
  },
  {
    title: "Programming Paradigms",
    description:
      "The major mental models for structuring a program — procedural, object-oriented, functional, declarative, event-driven, reactive, and data-oriented — and why most real languages borrow from several at once.",
    sections: [
      "Procedural and Object-Oriented Programming",
      "Functional Programming",
      "Declarative and Event-Driven Programming",
      "Reactive and Data-Oriented Programming",
      "Multi-Paradigm Languages",
    ],
  },
  {
    title: "Errors and Failure",
    description:
      "The different ways a program can go wrong, and the competing philosophies languages use to represent and handle failure — exceptions, error values, and result types.",
    sections: [
      "What Is an Error?",
      "Exceptions",
      "Errors as Values",
      "Result Types",
      "Defensive Programming",
    ],
  },
  {
    title: "Modules, Packages, and Dependencies",
    description:
      "How programs grow past a single file — organizing code into modules and packages, importing across boundaries, and managing the dependency graphs that come with using other people's code.",
    sections: [
      "How Large Programs Are Organized",
      "Imports",
      "Libraries",
      "Package Managers",
      "Dependency Resolution",
    ],
  },
  {
    title: "Compilation and Execution Models",
    description:
      "The paths from source code to running program — ahead-of-time compilation, interpretation, virtual machines, JIT compilation, transpilation, and the linking step that assembles a final executable.",
    sections: [
      "Compiled Languages",
      "Interpreted Languages",
      "Virtual Machine Languages",
      "JIT Compilation and Transpilation",
      "Linking: Static and Dynamic",
    ],
  },
  {
    title: "Concurrency and Parallelism",
    description:
      "Doing more than one thing at a time — processes and threads, the difference between concurrency and parallelism, the tools that keep shared state safe, and the models languages use for async work.",
    sections: [
      "Processes and Threads",
      "Concurrency vs. Parallelism",
      "Synchronization: Locks, Mutexes, and Atomics",
      "Async Programming and Event Loops",
      "Message Passing: Goroutines, Channels, and Actors",
    ],
  },
  {
    title: "Comparing Languages",
    description:
      "Putting the concepts from earlier chapters side by side across the languages you're most likely to actually use, and a framework for choosing one deliberately instead of by habit.",
    sections: [
      "Python and JavaScript",
      "TypeScript and Java",
      "C# and Go",
      "C, C++, and Rust",
      "Choosing a Language",
    ],
  },
  {
    title: "From Language to Operating System",
    description:
      "What happens the moment your code stops being purely a language exercise and starts asking the operating system for something — a process, a file, a socket, a connection to a database.",
    sections: [
      "What Happens When You Run a Program?",
      "System Calls",
      "Files, Streams, and Environment Variables",
      "Networking From First Principles",
      "Databases From a Programmer's Perspective",
    ],
  },
  {
    title: "Building Real Software",
    description:
      "The concerns that show up once a program has to survive contact with real users and real scale — managing state, talking across process boundaries, structuring an architecture, and knowing whether it actually works.",
    sections: [
      "State in Real Applications",
      "APIs and Serialization",
      "Architecture: Layers, Components, and Boundaries",
      "Testing and Debugging",
      "Performance and Profiling",
    ],
  },
  {
    title: "Becoming Language-Agnostic",
    description:
      "Turning everything in this course into a transferable skill — a repeatable method for learning a new language fast, reading unfamiliar code, and recognizing that syntax was always the smallest part of the job.",
    sections: [
      "How to Learn a New Language",
      "The Universal Programming Concepts",
      "Reading Unfamiliar Code",
      "Translating Between Languages",
      "Thinking Like a Programmer",
    ],
  },
];
