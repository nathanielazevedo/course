import type { ChapterInput } from "../../lib/chapters";

export const chapterInput: ChapterInput[] = [
  {
    title: "Laboratory Fundamentals",
    description:
      "The lab before any automation — the containers samples live in, what goes into them, the math that describes it, the manual techniques you'd otherwise do by hand, and the experiments it all adds up to.",
    sections: [
      "Plates, Tubes, and Vessels",
      "Reagents, Buffers, and Samples",
      "Units, Concentrations, and Dilutions",
      "Core Lab Techniques",
      "Common Assays: ELISA, ASEC, and More",
    ],
  },
  {
    title: "The Automated Laboratory",
    description:
      "What lab automation actually is — the manual workflow it replaces, the parts of an automated system, and how to decide when automation is worth it.",
    sections: [
      "What Lab Automation Is",
      "Manual Workflows and Their Limits",
      "Anatomy of an Automated System",
      "When to Automate",
      "Throughput, Walk-Away Time, and ROI",
    ],
  },
  {
    title: "Liquid Handling",
    description:
      "The core mechanical act of the automated lab — the physics of a pipette, how volume is moved accurately, and why some liquids fight back.",
    sections: [
      "The Physics of a Pipette",
      "Aspirate and Dispense",
      "Tips, Channels, and Heads",
      "Handling Difficult Liquids",
      "Calibration and Accuracy",
    ],
  },
  {
    title: "Laboratory Instruments",
    description:
      "The devices a workflow strings together — what plate readers, thermal cyclers, centrifuges, sealers, and washers do, and how each is driven.",
    sections: [
      "Plate Readers and Detection",
      "Thermal Control: Cyclers and Incubators",
      "Centrifuges, Sealers, and Peelers",
      "Washers and Bulk Dispensers",
      "Imaging and High-Content Systems",
    ],
  },
  {
    title: "Labware and Consumables",
    description:
      "The physical standard everything is built around — the SBS microplate footprint, the formats data lives in, and how labware is identified and tracked.",
    sections: [
      "The SBS / ANSI Microplate Standard",
      "Plates, Tubes, and Reservoirs",
      "Pipette Tips and Tip Management",
      "Barcoding and Identification",
      "Storage and Environmental Control",
    ],
  },
  {
    title: "Robotics and Motion",
    description:
      "How labware moves on its own — robotic arms and degrees of freedom, gripping and transport, coordinate systems, and keeping motion safe.",
    sections: [
      "Robotic Arms and Degrees of Freedom",
      "Grippers and Plate Handling",
      "Coordinate Systems and Teaching",
      "Deck Layout and Transport",
      "Safety and Collision Avoidance",
    ],
  },
  {
    title: "Instrument Control and Communication",
    description:
      "How software talks to hardware — device drivers and abstraction, the physical interfaces underneath, and the standards that make instruments interchangeable.",
    sections: [
      "Drivers and Device Abstraction",
      "Serial, USB, and Network Interfaces",
      "Command and Response Protocols",
      "SiLA 2 and Standardized Interfaces",
      "OPC-UA and Industrial Integration",
    ],
  },
  {
    title: "Scheduling and Orchestration",
    description:
      "How many devices run as one coordinated process — the scheduling problem, static vs dynamic plans, resource conflicts, timing constraints, and recovery.",
    sections: [
      "The Scheduling Problem",
      "Static vs Dynamic Scheduling",
      "Resource Allocation and Conflicts",
      "Time Constraints and Dependencies",
      "Error Recovery in a Running Method",
    ],
  },
  {
    title: "Data, Samples, and LIMS",
    description:
      "How identity and results are tracked — sample identity, barcodes and chain of custody, the LIMS and ELN layer, and capturing instrument output.",
    sections: [
      "Sample Identity and Tracking",
      "Barcodes and the Chain of Custody",
      "LIMS and Electronic Lab Notebooks",
      "Capturing Instrument Data",
      "Integration and Interoperability",
    ],
  },
  {
    title: "Assay Development and Protocols",
    description:
      "Turning science into a repeatable method — decomposing a manual protocol into automated steps, optimizing and miniaturizing, and proving it reproduces.",
    sections: [
      "From Manual Protocol to Automated Method",
      "Decomposing a Workflow into Steps",
      "Optimization and Miniaturization",
      "Controls and Edge Cases",
      "Validation and Reproducibility",
    ],
  },
  {
    title: "Process Reliability",
    description:
      "What keeps an unattended run from failing — the failure modes of automation, detecting and recovering from errors, monitoring, and maintenance.",
    sections: [
      "Failure Modes in Automation",
      "Detecting and Recovering from Errors",
      "Maintaining Walk-Away Operation",
      "Alerting and Monitoring",
      "Maintenance and Uptime",
    ],
  },
  {
    title: "Quality, Compliance, and Validation",
    description:
      "Running automation in a regulated environment — GxP, electronic records under 21 CFR Part 11, equipment qualification, audit trails, and change control.",
    sections: [
      "GxP and the Regulated Lab",
      "21 CFR Part 11 and Electronic Records",
      "IQ, OQ, and PQ",
      "Audit Trails and Data Integrity",
      "Change Control and Documentation",
    ],
  },
];
