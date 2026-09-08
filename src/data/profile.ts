export const profile = {
  name: "Aaron Brooks",
  title: "Full Stack Software Engineer",
  tagline: "Building accessible, AI-powered EdTech at scale.",
  location: "Ithaca, NY",
  email: "HireAaronBrooks@pm.me",
  resumeUrl: "./AaronBrooksResume.pdf",
  github: "https://github.com/aaronleebrooks",
  linkedin: "https://linkedin.com/in/aaronleebrooks",
  letterboxd: "https://letterboxd.com/aaron_brooks/",
  about: [
    "I write software that kids take tests on. The résumé version is eight years, 1M+ users, 99%+ uptime. The part I'd rather talk about is the on-screen protractor: a student taking a geometry test needs a protractor, so I built one, along with the ruler, the compass, the focus reader, and the text-to-speech. Every student gets them; teachers switch them on as needed.",
    "These days I lead front-end work at PowerSchool. Micro front-ends, a QTI-standardized authoring stack, and the metering system that keeps our AI features from costing more than they earn. I've covered as acting lead for stretches of weeks and months at a time, and I like that part more than I expected to. I'm looking for a place where people care how a thing gets built, not just when it ships.",
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
