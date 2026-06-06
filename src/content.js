import pickmyspotImg from './assets/pickmyspot.png';
import geovaultImg from './assets/geovault.png';
import hyperfocusImg from './assets/hyperfocus.png';
import revvyImg from './assets/revvy.png';
import binrouteImg from './assets/binroute.png';
import campusrentImg from './assets/campusrent.png';
import rootlockImg from './assets/rootlock.png';
import kalicmdImg from './assets/kalicmd.png';

export const content = {
  dev: {
    navbar: {
      logo: "AK",
      links: [
        { label: "About", href: "#about" },
        { label: "Projects", href: "#projects" },
        { label: "Blog", href: "#blog" },
        { label: "Skills", href: "#skills" },
        { label: "Contact", href: "#contact" }
      ],
      badge: "atharva-profile.exe"
    },
    hero: {
      title: "Atharva Kulkarni",
      subtitle: "Cybersecurity Enthusiast, Frontend Developer and Builder",
      description: "I design and build interactive digital experiences with clean logic, strong visuals, and user-first thinking.",
      cta: [
        { label: "View Projects", href: "#projects" },
        { label: "Contact Me", href: "#contact" }
      ],
      stats: [
        { value: "6", label: "Featured Builds" },
        { value: "Cyber Security", label: "Focus Area" },
        { value: "UI/UX", label: "Craft" },
        { value: "Always", label: "Learning" }
      ]
    },
    about: {
      text: "I'm a frontend developer who obsesses over the gap between design and code. I build fast, interactive web experiences using React, Tailwind, and Vite — from hackathon prototypes to production-ready apps. I care deeply about UI details, smooth animations, and interfaces that feel good to use. Currently a CS student, always shipping something new."
    },
    projects: [
      {
        id: "01",
        status: "live",
        title: "PickMySpot",
        description: "Real-time smart seat booking and allocation system.",
        detailedDescription: "PickMySpot is a smart Android and web seat-booking platform designed for educational institutions to modernise attendance and seat allocation. Built around an interactive real-time visual seating layout, it allows students to book specific seats for scheduled lectures in advance, promoting responsibility and academic growth. Features include complete student profile lookup per seat (name, roll number, contact info), real-time seat status tracking (occupied vs. available), multi-lecture booking scheduling, and a facility damage reporting system for prompt maintenance.",
        url: "https://pickmyspot.netlify.app",
        image: pickmyspotImg
      },
      {
        id: "02",
        status: "stable",
        title: "GeoVault",
        description: "3D globe marketplace for sovereign land acquisitions.",
        detailedDescription: "GeoVault is an immersive orbital marketplace and cataloging platform for fictional sovereign acquisitions. Built with a responsive 3D interactive virtual globe that represents territories dynamically, it enables users to buy entire countries. Features include detailed listings of countries complete with populations, capitals, and total market cap statistics, a dynamic real-time shopping cart system to process acquisitions, and filter tools to explore countries by continents (Asia, Europe, Africa, Americas, Oceania).",
        url: "https://geovault.netlify.app",
        image: geovaultImg
      },
      {
        id: "03",
        status: "active",
        title: "Hyper Focus",
        description: "Cyberpunk Pomodoro timer and task manager.",
        detailedDescription: "Hyper Focus is a cyberpunk-themed productivity cockpit and task manager designed to eliminate digital distractions and optimize deep work. It features a customizable countdown timer (Pomodoro framework) with smooth pulsing animations, integrated wellness preferences, and a Session Archive that monitors focus streaks and daily quotas. It includes an in-app Spotify player shortcut for study tracks, a Signal Log for tracking task interference, and a Task Nexus board to organize, queue, and complete work.",
        url: "https://hyper-focus-omega.vercel.app/",
        image: hyperfocusImg
      },
      {
        id: "04",
        status: "stable",
        title: "Revvy",
        description: "AI-powered automated code review and security auditing cockpit.",
        detailedDescription: "Revvy is a security-first dark IDE code review cockpit and PR auditing dashboard that automates code analysis. Powered by Claude engines, it performs deep security checks, bug detection, style compliance checks, and performance reviews. It features a Review Cockpit displaying average quality scores, PR approval metrics, and critical issue tallies. The platform includes an interactive workspace explorer, an active file review editor, and a live review feed highlighting vulnerability severities.",
        url: "https://revvy-iota.vercel.app/",
        image: revvyImg
      },
      {
        id: "05",
        status: "stable",
        title: "BinRoute",
        description: "AI-powered municipal waste routing and fleet optimizer.",
        detailedDescription: "BinRoute is an AI-powered smart waste management dashboard and route optimization system designed to optimize municipal garbage collection. It integrates a live MapBox interactive fleet map showing truck locations and status across districts (like Mumbai). Features include live routing logs tracking truck delay times (such as traffic bottlenecks) and container overflow warnings, real-time analytics dashboards reporting route efficiencies, and automated rescheduling tools to minimize fuel and emission footprints.",
        url: "https://bin-route.vercel.app/",
        image: binrouteImg
      },
      {
        id: "06",
        status: "active",
        title: "CampusRent",
        description: "Peer-to-peer rental marketplace for campus communities.",
        detailedDescription: "CampusRent is a peer-to-peer campus marketplace designed for college students to safely lend and borrow equipment, textbooks, and tools. Built using React, Zustand, and Tailwind, it features a reverse auction pricing mechanism where borrowers bid and lenders choose the best offer. It includes tailored lender/borrower dashboard views, custom hourly rental windows, real-time Socket.io notification updates, and secure campus-only email domain authentication to ensure community safety.",
        url: "https://github.com/AtharvaK-XD/CampusRent",
        image: campusrentImg,
        btnText: "Open Repository"
      }
    ],
    techSkills: [
      "HTML",
      "CSS",
      "Figma",
      "Graphic Design",
      "Canva",
      "Vibe Coding",
      "React",
      "Tailwind CSS",
      "JavaScript",
      "TypeScript",
      "Vite",
      "Git & GitHub",
      "Framer Motion",
      "Responsive Design"
    ],
    softSkills: [
      "Communication",
      "Teamwork",
      "Problem-Solving",
      "Critical Thinking",
      "Time Management",
      "Adaptability",
      "Learning Mindset",
      "Leadership",
      "Emotional Intelligence",
      "Decision-Making"
    ],
    blogs: [],
    emptyState: {
      title: "Dev logs coming soon",
      subtitle: "Writing about builds, experiments, and lessons learned."
    },
    contact: {
      heading: "Let's Collaborate",
      subtext: "Open to collaboration, freelance opportunities, and creative technical projects.",
      email: "kulkarniatharva529@gmail.com",
      github: "https://github.com/AtharvaK-XD",
      linkedin: "https://www.linkedin.com/in/atharva-kulkarni-a16a5a3b9/"
    }
  },
  hacker: {
    navbar: {
      logo: "AK",
      links: [
        { label: "About", href: "#about" },
        { label: "Projects", href: "#projects" },
        { label: "Write-ups", href: "#blog" },
        { label: "Skills", href: "#skills" },
        { label: "Contact", href: "#contact" }
      ],
      badge: "root@atharva:~$"
    },
    hero: {
      title: "Atharva Kulkarni",
      subtitle: "Ethical Hacker. Security Researcher. CTF Player.",
      description: "I break systems to understand them, then patch them to protect them. Penetration testing, OSINT, and security tooling are my playground.",
      cta: [
        { label: "View Projects", href: "#projects" },
        { label: "Contact Me", href: "#contact" }
      ],
      stats: [
        { value: "2", label: "Security Tools" },
        { value: "CTF", label: "Player" },
        { value: "OSINT", label: "Specialist" },
        { value: "Always", label: "Learning" }
      ]
    },
    about: {
      text: "I'm a cybersecurity enthusiast who approaches security from both sides of the fence. My journey started with curiosity — what happens when I push a system past its limits? Now I build tools that defend, write scripts that probe, and study vulnerabilities that others overlook. I'm comfortable navigating Kali Linux, running recon with Nmap and OSINT frameworks, and building Python automation for security workflows. My goal: think like an attacker, act like a defender, and document everything for the community."
    },
    projects: [
      {
        id: "01",
        status: "tool",
        title: "Rootlock",
        description: "Password strength analyzer with entropy-based scoring.",
        detailedDescription: "Rootlock is a terminal-themed password strength analyzer and security evaluation tool (Protocol v2.0). It features a real-time breach simulation engine that estimates password crack times, a visual entropy circular LED gauge that displays bitwise entropy levels, password feedback with security alerts/suggestions to fix vulnerabilities, a secure key generator to create strong passphrases, and a quick copy-to-clipboard action.",
        url: "https://rootlock.netlify.app",
        image: rootlockImg
      },
      {
        id: "02",
        status: "tool",
        title: "KaliCMD",
        description: "A-Z reference directory for Kali Linux commands.",
        detailedDescription: "KaliCMD is an A-Z commands directory and reference index designed for penetration testers and security researchers. It houses an index of 256 Kali Linux commands organized across 24 lettered dropdown sections. It features real-time search with keyword matching across command names and descriptions, quick lettered anchor navigation bar, keyboard hotkey triggers (like pressing '/' to search and 'Esc' to clear), and one-click copy buttons to copy commands instantly.",
        url: "https://kalicmd.netlify.app/",
        image: kalicmdImg
      }
    ],
    techSkills: [
      "Penetration Testing",
      "Ethical Hacking",
      "Kali Linux",
      "Nmap & Recon",
      "OSINT",
      "Burp Suite",
      "Metasploit (basics)",
      "Wireshark",
      "Social Engineering Awareness",
      "Offensive Security",
      "Defensive Security",
      "Vulnerability Assessment",
      "Network Security",
      "Web App Security",
      "OWASP Top 10",
      "Python",
      "Python Automation",
      "Security Tool Building",
      "Bash Scripting",
      "TryHackMe",
      "Hack The Box",
      "Linux CLI"
    ],
    softSkills: [
      "Communication",
      "Teamwork",
      "Problem-Solving",
      "Critical Thinking",
      "Time Management",
      "Adaptability",
      "Learning Mindset",
      "Leadership",
      "Emotional Intelligence",
      "Decision-Making"
    ],
    blogs: [
      {
        id: "01",
        tag: "Automation",
        title: "I Built an AI-Powered Q&A Chatbot — Without Writing a Single Line of Code",
        description: "A step-by-step walkthrough of building a fully functional intelligent chatbot using n8n and Google Gemini, complete with auto-tagging pipelines and semantic search capabilities.",
        date: "JUNE 2026",
        readTime: "8 MIN READ",
        url: "https://n8nwriteup.netlify.app/"
      }
    ],
    emptyState: {
      title: "Write-ups coming soon",
      subtitle: "Documenting CTF walkthroughs, penetration tests, and security research."
    },
    contact: {
      heading: "Let's Collaborate",
      subtext: "Open to bug bounty collabs, security research, CTF teams, and freelance security consulting.",
      email: "kulkarniatharva529@gmail.com",
      github: "https://github.com/AtharvaK-XD",
      linkedin: "https://www.linkedin.com/in/atharva-kulkarni-a16a5a3b9/"
    }
  }
};
