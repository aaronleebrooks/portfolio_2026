export const profile = {
  name: "Aaron Brooks",
  title: "Full Stack Software Engineer",
  tagline:
    "I build the test-taking software 30 million students can't opt out of.",
  location: "Ithaca, NY",
  email: "HireAaronBrooks@pm.me",
  resumeUrl: "./AaronBrooksResume.pdf",
  github: "https://github.com/aaronleebrooks",
  linkedin: "https://linkedin.com/in/aaronleebrooks",
  letterboxd: "https://letterboxd.com/aaron_brooks/",
  /** Compact career proof shown in the hero, above the nav. */
  tenure: {
    org: "PowerSchool",
    rows: [
      { period: "2021 — now", role: "Senior Software Engineer" },
      { period: "2018 — 2021", role: "Software Engineer I–III" },
    ],
    note: "Promoted 5× in 3 years.",
  },
  about: [
    "I'm a full-stack engineer with eight years at PowerSchool, working on the assessment software K–12 students take tests on. I lead front-end work across a QTI-standardized authoring stack, a set of micro front-ends that other PowerSchool products consume, and the entitlement system that meters our AI features.",
    "Accessibility drives a lot of that work. Students don't get to choose this software, so the burden is on us to make it usable. I built the text-to-speech, the focus reader, and the on-screen ruler, protractor, and compass that students use during tests. I've also covered as acting team lead for months at a stretch, and I'm looking for a role where leading is part of the job rather than something I fill in.",
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
