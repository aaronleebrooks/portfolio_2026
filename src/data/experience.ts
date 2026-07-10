export type ExperienceItem = {
  id: string;
  role: string;
  company: string;
  location: string;
  start: string;
  end: string;
  highlights: string[];
  tech: string[];
};

export const experience: ExperienceItem[] = [
  {
    id: "ps-senior",
    role: "Senior Software Engineer I",
    company: "PowerSchool LLC",
    location: "Remote, US",
    start: "Jul 2021",
    end: "Present",
    highlights: [
      "Overhauled the student test-taking app, migrating 32 bespoke components to PowerSchool's shared React component library — eliminating ad-hoc CSS duplication and improving accessibility with built-in WCAG-compliant components.",
      "Replaced a legacy jQuery question-creation page with a React SPA (Redux Toolkit, Lambda, DynamoDB, CKEditor 5), unifying 15 question types into a single QTI-standardized editor with AI generation scaling from 1 to 10 questions per minute. Serves 30M+ students across 5,000+ institutions.",
      "Built product-agnostic micro front-ends consumed by Performance Matters and other PowerSchool applications — including a QTI assessment creator and rubric suite (creator, viewer, access-aware catalog) with district-level access control.",
      "Designed \"allotments,\" an AI credit entitlement system for per-org metered billing across a platform serving 1M+ users — generating $1M+ in revenue and capping exposure to uncapped OpenAI costs averaging $20K+/month per org.",
      "Stepped up as acting team lead for 3 months, directing a team of 3 through a migration to PowerSchool's Neon design library (60+ components). Now front-end tech lead and epic owner for the assessment creator.",
    ],
    tech: [
      "React",
      "TypeScript",
      "Redux Toolkit",
      "AWS Lambda",
      "DynamoDB",
      "OpenSearch",
      "OpenAI",
      "QTI",
    ],
  },
  {
    id: "ps-swe",
    role: "Software Engineer I, II, III",
    company: "PowerSchool LLC",
    location: "Remote, US",
    start: "May 2018",
    end: "Jul 2021",
    highlights: [
      "Promoted 5 times in 3 years, from Associate Software Engineer through Senior Software Engineer II.",
      "Cleared a 4-year bug backlog as the sole junior developer on the product, stabilizing customer-facing applications across jQuery, CSS, and Maven.",
      "Built a full-stack FTP log viewer (REST APIs + DataTables UI), turning multi-day internal support data requests into self-serve access.",
      "Migrated 50GB of static assets from on-prem to versioned S3 + CloudFront, improving data security and enabling asset versioning for resources delivered to millions of students.",
      "Built accessibility and geometry test-taking tools for students — focus reader, text-to-speech, on-screen ruler, protractor, and compass — available to all users, activated by teachers as needed.",
    ],
    tech: ["React", "jQuery", "Node", "S3", "CloudFront", "REST APIs", "DataTables"],
  },
  {
    id: "thinkful",
    role: "Full Stack Development Program",
    company: "Thinkful",
    location: "Atlanta, GA",
    start: "May 2017",
    end: "Dec 2017",
    highlights: [
      "Built 6 single-page applications covering RESTful APIs, MongoDB, Node, Express, and React.",
    ],
    tech: ["React", "Node", "Express", "MongoDB"],
  },
];
