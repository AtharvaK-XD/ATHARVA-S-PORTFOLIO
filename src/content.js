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
        description: "A smart app that helps users easily find, book, and manage seats in real time across places like libraries, offices, and events.",
        url: "https://pickmyspot.netlify.app"
      },
      {
        id: "02",
        status: "stable",
        title: "GeoVault",
        description: "A fictional sci-fi web app where you can buy entire countries, featuring a stunning 3D globe and a slick marketplace UI.",
        url: "https://geovault.netlify.app"
      },
      {
        id: "03",
        status: "active",
        title: "Hyper Focus",
        description: "A cyberpunk-themed Pomodoro timer and task manager designed to eliminate distractions, track focus streaks, and optimize productivity sessions.",
        url: "https://hyper-focus-omega.vercel.app/"
      },
      {
        id: "04",
        status: "stable",
        title: "Revvy",
        description: "An AI-powered code and pull request review dashboard that leverages Claude engines to automate security auditing and code quality assessments.",
        url: "https://revvy-iota.vercel.app/"
      },
      {
        id: "05",
        status: "stable",
        title: "BinRoute",
        description: "An AI-powered smart waste management routing system that optimizes garbage collection truck routes, reducing fuel consumption and emissions.",
        url: "https://bin-route.vercel.app/"
      },
      {
        id: "06",
        status: "active",
        title: "CampusRent",
        description: "A peer-to-peer rental marketplace built for college life, connecting students to safely rent or borrow items like textbooks, cameras, and tools within their campus community.",
        url: "https://github.com/AtharvaK-XD/CampusRent"
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
        description: "A password strength analyzer that calculates crack time estimates using entropy-based scoring. Built to understand how attackers evaluate weak credentials.",
        url: "https://rootlock.netlify.app"
      },
      {
        id: "02",
        status: "tool",
        title: "KaliCMD",
        description: "A full A–Z reference for Kali Linux commands. Built for pentesters who need a fast lookup without leaving the browser.",
        url: "https://kalicmd.netlify.app/"
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
