import type { ChapterInput } from "../../lib/chapters";

export const chapterInput: ChapterInput[] = [
  {
    title: "The Machine",
    description:
      "What a computer is at the hardware level — the parts, how data is encoded, and how the CPU executes code.",
    sections: [
      "The Parts of a Computer",
      "Bits and Bytes",
      "The Memory Hierarchy",
      "The Instruction Cycle",
      "Buses and Interrupts",
    ],
  },
  {
    title: "Software and Execution",
    description:
      "How source code becomes a running program — compilation, linking, memory layout, runtimes, and the boundary between software and the OS.",
    sections: [
      "From Source to Machine Code",
      "Linking and Libraries",
      "The Stack and the Heap",
      "Runtimes and Virtual Machines",
      "System Calls",
    ],
  },
  {
    title: "Operating Systems",
    description:
      "The software layer that manages hardware on behalf of all running programs — processes, virtual memory, the file system, and isolation.",
    sections: [
      "What an Operating System Does",
      "Processes and Scheduling",
      "Virtual Memory",
      "The File System",
      "Permissions and Isolation",
    ],
  },
  {
    title: "Processes and Concurrency",
    description:
      "How a system runs many things at once — processes vs threads, shared memory and race conditions, synchronization, IPC, and event-driven I/O.",
    sections: [
      "Processes vs Threads",
      "Shared Memory and Race Conditions",
      "Synchronization Primitives",
      "Inter-Process Communication",
      "Asynchronous and Event-Driven Concurrency",
    ],
  },
  {
    title: "Networking and Communication",
    description:
      "How bytes move between machines — the network stack, IP and routing, TCP and UDP, DNS, and TLS.",
    sections: [
      "The Network Stack",
      "IP and Routing",
      "TCP and UDP",
      "DNS",
      "TLS",
    ],
  },
  {
    title: "The Web as a System",
    description:
      "How the web works mechanically — HTTP, the browser as a runtime, origins and CORS, caching and CDNs, and how state is layered onto a stateless protocol.",
    sections: [
      "HTTP",
      "The Browser as a Runtime",
      "URLs, Origins, and the Same-Origin Policy",
      "Caching and CDNs",
      "State on a Stateless Protocol",
    ],
  },
  {
    title: "Data and Persistence",
    description:
      "How data is stored and retrieved durably — block devices, relational databases, transactions, non-relational stores, and how data scales across machines.",
    sections: [
      "How Storage Works",
      "Relational Databases",
      "Transactions and ACID",
      "Non-Relational Stores",
      "Replication, Sharding, and CAP",
    ],
  },
  {
    title: "Servers and Distributed Systems",
    description:
      "How services run and coordinate — what a server actually is, load balancers, service-to-service communication, the failure modes of distributed systems, and consensus.",
    sections: [
      "What a Server Is",
      "Load Balancers and Reverse Proxies",
      "Service-to-Service Communication",
      "Distributed Systems Failure Modes",
      "Consensus and Coordination",
    ],
  },
  {
    title: "Infrastructure, Virtualization, and Cloud",
    description:
      "What runs everything else — virtual machines, containers, orchestration, the cloud service model, and infrastructure as code.",
    sections: [
      "Virtual Machines and Hypervisors",
      "Containers",
      "Orchestration",
      "The Cloud Service Model",
      "Infrastructure as Code",
    ],
  },
  {
    title: "Performance, Reliability, and Security",
    description:
      "How systems are measured, kept up, and protected — latency and percentiles, where time goes, reliability engineering, threat models, and the cryptography you actually rely on.",
    sections: [
      "Measuring Performance",
      "Where Time Goes",
      "Reliability",
      "Threat Model and Defenses",
      "Cryptography Basics",
    ],
  },
  {
    title: "The Life of a Request",
    description:
      "A single HTTP request walked end-to-end through every layer in the course — DNS to TCP to TLS, through the edge, into the server, down to the data layer, and back.",
    sections: [
      "From Click to Resolution",
      "Through the Edge",
      "Inside the Server",
      "Reaching the Data",
      "The Response Path",
    ],
  },
];
