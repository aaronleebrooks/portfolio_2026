export type Project = {
  id: string;
  name: string;
  /** Short context tag shown above the title, e.g. "PowerSchool · Shipped 2024". */
  status: string;
  /**
   * What Aaron's role on it actually was, appended to the status line. Leadership
   * belongs on the evidence, not in a bullet six items deep in Experience.
   */
  role?: string;
  description: string;
  tech: string[];
  /**
   * Optional screenshots. Intrinsic width/height are required so the card can
   * reserve space (no layout shift) and pick a layout: portrait sets sit in a
   * narrow strip, landscape ones stack full width.
   */
  images?: {
    src: string;
    alt: string;
    width: number;
    height: number;
    /** Pixel art: keep hard edges instead of smoothing. */
    pixelated?: boolean;
  }[];
  /**
   * Optional third-party or vendor page that corroborates this work, for
   * claims a reader would otherwise have to take on faith.
   */
  evidence?: { label: string; url: string };
  /** Optional public live demo URL. */
  liveUrl?: string;
  /** Optional public repository URL. */
  repoUrl?: string;
};

export const projects: Project[] = [
  {
    id: "ai-item-generator",
    name: "Question Creator",
    status: "PowerSchool · Shipped 2023",
    role: "Front-end tech lead · epic owner · team of 3",
    description:
      "Fifteen question types had fifteen ways to be authored, all of them living in a jQuery page nobody wanted to touch. I replaced it with a single QTI-standardized React editor, then wired in an OpenAI generator that moved teachers from roughly one question a minute to ten. It is the authoring surface for 30M+ students across 5,000+ institutions.",
    images: [
      {
        src: "/images/question-creator/qti-editor.png",
        alt: "The item editor: a rich-text toolbar over a multiple-choice block, beside an Interactions panel listing QTI types such as Gap Match, Hot Spot, Hot Text and Inline Choice.",
        width: 1177,
        height: 495,
      },
      {
        src: "/images/question-creator/ai-generator.png",
        alt: "The AI generator: a standard picker and a prompt describing the item needed, beside three generated multiple-choice questions with correct answers marked.",
        width: 633,
        height: 370,
      },
    ],
    evidence: {
      label: "PowerSchool's page for this feature",
      url: "https://www.powerschool.com/solutions/powerschool-ai/powerbuddy/powerbuddy-for-assessment/",
    },
    tech: ["React", "TypeScript", "OpenAI API", "QTI", "Redux Toolkit", "CKEditor 5"],
  },
  {
    id: "accessibility-tools",
    name: "Student Test-Taking Tools",
    status: "PowerSchool · Shipped 2018–2021",
    role: "Front-end developer",
    description:
      "Read-aloud, a focus reader that isolates the line a student is on, and the on-screen geometry set: ruler, protractor, and compass. They ship to every student in the test app, and teachers turn on what each student is entitled to use.",
    tech: ["React", "jQuery", "WCAG", "Text-to-speech"],
  },
  {
    id: "assessment-creator",
    name: "Assessment Creator",
    status: "PowerSchool · Shipped 2025",
    role: "Front-end tech lead",
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
    id: "ai-allotments",
    name: "Allotments",
    status: "PowerSchool · Shipped 2024",
    role: "Designed the entitlement model",
    description:
      "We were shipping AI features with no meter on them. A single district could run $20K+/month of OpenAI spend with nothing in the way. We designed allotments: per-org AI credits, metered and enforced at the API. It capped the exposure and turned the AI features into $1M+ of tracked revenue. Every piece of AI content on the platform now bills through it.",
    tech: ["Node", "AWS Lambda", "DynamoDB", "REST APIs", "FusionCharts"],
  },
  {
    id: "picross-quest",
    name: "Nonagram Goblin",
    status: "Side project · Playable 2026",
    description:
      "A nonogram game that thinks it is a dungeon crawl. Each room is a logic puzzle; solving it is how you get through the door. Built in Godot 4 and exported to WebAssembly, so it runs in the browser with nothing to install.",
    images: [
      {
        src: "/images/picross/village.png",
        width: 360,
        height: 800,
        pixelated: true,
        alt: "Nonagram Goblin's Village overworld screen, a grid of sixteen locked puzzle tiles above a pixel-art map.",
      },
      {
        src: "/images/picross/festival.png",
        width: 360,
        height: 800,
        pixelated: true,
        alt: "A partly solved nonogram grid over a festival scene, with filled cells forming a shape.",
      },
      {
        src: "/images/picross/grove.png",
        width: 360,
        height: 800,
        pixelated: true,
        alt: "A nonogram in a forest grove, with a dark cross-shaped picture emerging in the grid.",
      },
    ],
    tech: ["Godot 4", "GDScript", "WebAssembly"],
    liveUrl: "https://a-a-ron.party/games/picross-quest/",
  },
  {
    id: "this-site",
    name: "This Site",
    status: "Side project · Shipped 2026",
    role: "Everything",
    description:
      "Built the way I argue front-end work should be built: React 19 and Tailwind v4 on a design system with one radius token, three type faces with three jobs, and a palette that exists so product screenshots sit on it without glaring. Accessibility is enforced rather than asserted — axe-core runs against WCAG 2.1 AA in CI and fails the build on anything serious, every reveal animation has a reduced-motion path, and every image ships intrinsic dimensions so nothing shifts under you. Held at 100% unit coverage with a Playwright end-to-end suite. Both reports are public.",
    evidence: {
      label: "Coverage and end-to-end reports",
      url: "/tests/coverage/",
    },
    tech: ["React 19", "TypeScript", "Tailwind v4", "Vitest", "Playwright", "axe-core"],
    repoUrl: "https://github.com/aaronleebrooks/portfolio_2026",
  },
];
