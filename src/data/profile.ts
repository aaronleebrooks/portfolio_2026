export const profile = {
  name: "Aaron Brooks",
  title: "Full Stack Software Engineer",
  tagline: "Building accessible, AI-powered EdTech at scale.",
  location: "Ithaca, NY",
  email: "TheAaronLeeBrooks@gmail.com",
  resumeUrl: "./AaronBrooksResume.pdf",
  github: "https://github.com/aaronleebrooks",
  linkedin: "https://linkedin.com/in/aaronleebrooks",
  letterboxd: "https://letterboxd.com/aaron_brooks/",
  about: [
    "I'm a full-stack software engineer with 8+ years building customer-facing K-12 EdTech serving 1M+ users at 99%+ uptime, specializing in React, TypeScript, and Redux. I've progressed from bug-fixing to leading product-agnostic micro front-end architecture, AI-powered assessment tooling, and QTI-based test and rubric platforms.",
    "I'm an experienced tech lead who mentors engineers, drives technical strategy, and ships accessible, well-tested software across cross-functional teams. I'm looking for a quality-focused team where craft, mentorship, and shipping thoughtfully matter as much as velocity.",
  ],
} as const;

export const navItems = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
] as const;

export type NavItemId = (typeof navItems)[number]["id"];

export const sectionIds: readonly NavItemId[] = navItems.map((item) => item.id);
