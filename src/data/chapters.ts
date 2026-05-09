export type Section = {
  number: number;
  title: string;
  slug: string;
};

export type Chapter = {
  number: number;
  title: string;
  slug: string;
  videoId?: string;
  description?: string;
  sections: Section[];
};

const data: {
  title: string;
  videoId?: string;
  description?: string;
  sections?: string[];
}[] = [
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
      "How source code becomes a running program — compilation, memory layout, linking, runtimes, and the boundary between software and the OS.",
    sections: [
      "From Source to Machine Code",
      "The Stack and the Heap",
      "Linking and Libraries",
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

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

export const chapters: Chapter[] = data.map((d, i) => ({
  number: i + 1,
  title: d.title,
  slug: slugify(d.title),
  videoId: d.videoId,
  description: d.description,
  sections: (d.sections ?? []).map((s, j) => ({
    number: j + 1,
    title: s,
    slug: slugify(s),
  })),
}));

export const getChapterBySlug = (slug: string) =>
  chapters.find((c) => c.slug === slug);

export const getSectionBySlug = (chapterSlug: string, sectionSlug: string) => {
  const chapter = getChapterBySlug(chapterSlug);
  if (!chapter) return null;
  const section = chapter.sections.find((s) => s.slug === sectionSlug);
  return section ? { chapter, section } : null;
};
