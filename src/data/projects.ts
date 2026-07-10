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
    name: "AI Item Generator",
    description:
      "Prompt-driven assessment authoring that turns a teacher prompt into properly formatted QTI questions via the OpenAI API, feeding directly into a React question editor.",
    tech: ["React", "TypeScript", "OpenAI API", "QTI", "Redux Toolkit"],
  },
  {
    id: "qti-test-creator",
    name: "QTI Test Creator",
    description:
      "Assessment builder that assembles new and existing questions into tests with automatic scoring and gradebook posting — replacing a legacy HTML/jQuery authoring flow with a unified React SPA.",
    tech: ["React", "Redux Toolkit", "Lambda", "DynamoDB", "QTI", "XML↔JSON"],
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
