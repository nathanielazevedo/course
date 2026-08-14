import type { ChapterInput } from "../../lib/chapters";

export const chapterInput: ChapterInput[] = [
  {
    title: "The Windows Platform",
    description:
      "What makes Windows different from the systems you may already know — the NT kernel underneath Win32, where .NET and the CLR sit on top of it, and where C# fits in that stack.",
    sections: [
      "What Makes Windows Different",
      "The NT Kernel and Win32",
      ".NET on Windows: CLR, JIT, and the BCL",
      "Where C# Fits: Console, Services, WinForms, WPF",
      "Setting Up a Windows Dev Environment",
    ],
  },
  {
    title: "Processes and Threads",
    description:
      "How Windows runs code — the process and thread model, how C# exposes it through the Process class and the thread pool, and what it takes to run with elevated rights.",
    sections: [
      "The Process Class and Process Lifecycle",
      "Starting, Killing, and Monitoring Processes",
      "Threads, the Thread Pool, and Async in C#",
      "Jobs, Process Groups, and Resource Limits",
      "Elevation, UAC, and Running as Administrator",
    ],
  },
  {
    title: "The Filesystem",
    description:
      "Working with files the Windows way — paths and drives, System.IO, who is allowed to touch what, and the link types NTFS supports.",
    sections: [
      "Paths, Drives, and the Windows Filesystem",
      "Reading and Writing Files with System.IO",
      "ACLs, Ownership, and File Permissions",
      "Symbolic Links, Junctions, and Hard Links",
      "Watching the Filesystem for Changes",
    ],
  },
  {
    title: "The Registry",
    description:
      "The configuration database at the center of Windows — its structure, how to read and write it safely from C#, and the patterns real applications use it for.",
    sections: [
      "What the Registry Is and Why It Exists",
      "Hives, Keys, and Values",
      "Reading and Writing the Registry from C#",
      "Registry Virtualization and Redirection",
      "Common Registry Patterns: Startup, Uninstall, App Settings",
    ],
  },
  {
    title: "Windows Services",
    description:
      "Long-running, unattended processes — what a service is, how to build one in .NET, and how the Service Control Manager keeps it alive.",
    sections: [
      "What a Windows Service Is",
      "Building a Service with the .NET Worker SDK",
      "The Service Control Manager",
      "Installing, Starting, and Debugging Services",
      "Service Recovery, Dependencies, and Accounts",
    ],
  },
  {
    title: "Interop with Win32",
    description:
      "Reaching past the .NET base class library into the native Windows API — P/Invoke, marshaling, COM, and the memory-safety rules that come with crossing that boundary.",
    sections: [
      "Why You Need P/Invoke",
      "Marshaling Types Between C# and Native Code",
      "Calling Win32 Functions from C#",
      "COM Interop and the Windows Runtime (WinRT)",
      "Safe Handles and Native Memory Management",
    ],
  },
  {
    title: "Windows Security and Identity",
    description:
      "The model that decides who can do what — users, groups, and SIDs, access tokens and privileges, ACLs, and impersonating another identity from code.",
    sections: [
      "Users, Groups, and SIDs",
      "Access Tokens and Privileges",
      "ACLs and the Windows Security Model",
      "Impersonation and Running as Another User",
      "Code Signing and Trust on Windows",
    ],
  },
  {
    title: "Desktop Applications",
    description:
      "The GUI side of Windows development — the message loop underneath every window, and the three frameworks C# developers use to build on top of it.",
    sections: [
      "The Windows Message Loop",
      "WinForms: Windows and Controls",
      "WPF: XAML and the Visual Tree",
      "WinUI 3 and Modern Windows Apps",
      "Packaging a Desktop App with MSIX",
    ],
  },
  {
    title: "Diagnostics and System Management",
    description:
      "How to see what a Windows machine is doing — the Event Log, ETW, WMI, performance counters, and what to do when a process crashes.",
    sections: [
      "The Windows Event Log",
      "Event Tracing for Windows (ETW)",
      "WMI and CIM: Querying System State",
      "Performance Counters",
      "Crash Dumps and Debugging with WinDbg",
    ],
  },
  {
    title: "Networking and IPC",
    description:
      "Getting processes and machines talking — sockets and HttpClient, local IPC with named pipes, and the service frameworks available on Windows.",
    sections: [
      "Sockets and HttpClient on Windows",
      "Named Pipes and Local IPC",
      "WCF and Its Modern Alternatives",
      "Firewalls, Ports, and Network Configuration from C#",
      "Building a gRPC Service on Windows",
    ],
  },
  {
    title: "Automation, Deployment, and Operations",
    description:
      "Taking an application from source to a running install — scripting Windows from C#, scheduling work, packaging installers, and shipping updates.",
    sections: [
      "PowerShell Interop from C#",
      "The Task Scheduler API",
      "Building Installers with MSIX and WiX",
      "Auto-Updating a Windows Application",
      "CI/CD for Windows Apps",
    ],
  },
];
