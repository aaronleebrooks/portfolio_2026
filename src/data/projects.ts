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
      "Unified React SPA for authoring QTI questions across 15 interaction types, with AI-assisted generation from the same editor via the OpenAI API. Grew from single-item generation to bulk item generation based on customer feedback — paving the way for full-test generation in Assessment Creator.",
    tech: ["React", "TypeScript", "OpenAI API", "QTI", "Redux Toolkit", "CKEditor 5"],
  },
  {
    id: "assessment-creator",
    name: "Assessment Creator",
    description:
      "Assessment builder that assembles new and existing questions into full tests with automatic scoring and gradebook posting. Includes AI-assisted assessment authoring via the OpenAI API — the next step after single- and bulk-item generation, driven by customer demand for end-to-end test creation.",
    tech: ["React", "Redux Toolkit", "OpenAI API", "Lambda", "DynamoDB", "QTI"],
  },
  {
    id: "ai-allotments",
    name: "AI Credit Entitlements",
    description:
      "Platform-wide “allotments” system that checks org balances before AI actions run across a product serving 1M+ users — enabling accurate billing and protecting against uncapped, customer-driven AI spend.",
    tech: ["Node", "AWS Lambda", "DynamoDB", "REST APIs"],
  },
  {
    id: "rubric-suite",
    name: "Rubric Suite & Micro Front-Ends",
    description:
      "Suite of rubric applications (creator, viewer, access-aware catalog) and product-agnostic micro front-ends that slot into multiple company applications instead of a single app.",
    tech: ["React", "Redux Toolkit", "MFE", "OpenSearch", "DynamoDB"],
  },
];
