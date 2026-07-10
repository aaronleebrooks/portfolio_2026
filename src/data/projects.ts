export type Project = {
  id: string;
  name: string;
  description: string;
  tech: string[];
  /** Optional public live demo URL (e.g. future Godot embeds). */
  liveUrl?: string;
  /** Optional public repository URL. */
  repoUrl?: string;
};

export const projects: Project[] = [
  {
    id: "ai-item-generator",
    name: "Question Creator",
    description:
      "Replaced a legacy jQuery question-creation page with a React SPA (Redux Toolkit, Lambda, DynamoDB, CKEditor 5), unifying 15 question types into a single QTI-standardized editor for all Performance Matters users. Added an AI question generator (OpenAI API) that scales from 1 to 10 questions per minute, cutting config time 2–3 minutes per question. Serves 30M+ students across 5,000+ institutions.",
    tech: ["React", "TypeScript", "OpenAI API", "QTI", "Redux Toolkit", "CKEditor 5"],
  },
  {
    id: "assessment-creator",
    name: "Assessment Creator",
    description:
      "Built a QTI-based assessment creator as a micro front-end, assembling questions into full tests with integration into host grading systems. Reduced load times and enabled the first UX update since 2014. Designed for integration into Performance Matters.",
    tech: ["React", "Redux Toolkit", "Lambda", "DynamoDB", "QTI", "MFE"],
  },
  {
    id: "ai-allotments",
    name: "AI Credit Entitlements",
    description:
      "Designed \"allotments,\" an AI credit entitlement system for per-org metered billing across a platform serving 1M+ users. Generated $1M+ in revenue and capped exposure to uncapped OpenAI costs that average $20K+/month per org. All AI content across the platform is tracked through this system.",
    tech: ["Node", "AWS Lambda", "DynamoDB", "REST APIs"],
  },
  {
    id: "rubric-suite",
    name: "Rubric Suite & Micro Front-Ends",
    description:
      "Built rubric applications (creator, viewer, access-aware catalog) with React, Redux Toolkit, DynamoDB, Lambda, and AWS OpenSearch. Now serving Performance Matters and Schoology customers with district-level access control.",
    tech: ["React", "Redux Toolkit", "MFE", "OpenSearch", "DynamoDB"],
  },
];
