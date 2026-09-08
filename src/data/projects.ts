export type Project = {
  id: string;
  name: string;
  /** Short context tag shown above the title, e.g. "PowerSchool · Shipped 2024". */
  status: string;
  description: string;
  tech: string[];
  /** Optional public live demo URL. */
  liveUrl?: string;
  /** Optional public repository URL. */
  repoUrl?: string;
};

export const projects: Project[] = [
  {
    id: "ai-allotments",
    name: "Allotments",
    status: "PowerSchool · Shipped 2024",
    description:
      "We were shipping AI features with no meter on them. A single district could run $20K+/month of OpenAI spend with nothing in the way. We designed allotments: per-org AI credits, metered and enforced at the API. It capped the exposure and turned the AI features into $1M+ of tracked revenue. Every piece of AI content on the platform now bills through it.",
    tech: ["Node", "AWS Lambda", "DynamoDB", "REST APIs"],
  },
  {
    id: "ai-item-generator",
    name: "Question Creator",
    status: "PowerSchool · Shipped 2023",
    description:
      "Fifteen question types had fifteen ways to be authored, all of them living in a jQuery page nobody wanted to touch. I replaced it with a single QTI-standardized React editor, then wired in an OpenAI generator that moved teachers from roughly one question a minute to ten. It is the authoring surface for 30M+ students across 5,000+ institutions.",
    tech: ["React", "TypeScript", "OpenAI API", "QTI", "Redux Toolkit", "CKEditor 5"],
  },
  {
    id: "assessment-creator",
    name: "Assessment Creator",
    status: "PowerSchool · Shipped 2025",
    description:
      "A QTI assessment builder that assembles authored questions into full tests and hands them off to the host grading system. Built as a micro front-end so it could drop into Performance Matters without owning the shell, which is also how the product got its first UX update since 2014.",
    tech: ["React", "Redux Toolkit", "Lambda", "DynamoDB", "QTI", "MFE"],
  },
  {
    id: "rubric-suite",
    name: "Rubric Suite",
    status: "PowerSchool · Shipped 2026",
    description:
      "Three apps that share a spine: a rubric creator, a viewer, and a catalog that only shows you the rubrics your district is allowed to see. Access control turned out to be the hard part; OpenSearch does the filtering. Serving Performance Matters and Schoology customers.",
    tech: ["React", "Redux Toolkit", "MFE", "OpenSearch", "DynamoDB"],
  },
  {
    id: "picross-quest",
    name: "Picross Quest",
    status: "Side project · Playable 2026",
    description:
      "A nonogram game that thinks it is a dungeon crawl. Each room is a logic puzzle; solving it is how you get through the door. Built in Godot 4 and exported to WebAssembly, so it runs in the browser with nothing to install.",
    tech: ["Godot 4", "GDScript", "WebAssembly"],
    liveUrl: "https://a-a-ron.party/games/picross-quest/",
  },
];
