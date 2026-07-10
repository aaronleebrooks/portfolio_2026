export type SkillGroup = {
  category: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    category: "Languages",
    items: ["TypeScript", "JavaScript", "Java", "SQL", "XML"],
  },
  {
    category: "Frontend",
    items: [
      "React",
      "Redux / Redux Toolkit",
      "Micro front-ends (MFE)",
      "SASS",
      "CKEditor 5",
      "jQuery",
      "DataTables",
    ],
  },
  {
    category: "Backend & Cloud",
    items: [
      "Node",
      "AWS Lambda",
      "DynamoDB",
      "MySQL",
      "S3",
      "CloudFront",
      "AWS OpenSearch",
      "REST APIs",
    ],
  },
  {
    category: "AI",
    items: [
      "OpenAI API integration",
      "Prompt-driven content generation",
      "Usage metering",
    ],
  },
  {
    category: "Standards & Practices",
    items: [
      "QTI assessment standards",
      "CI/CD",
      "Accessibility (WCAG)",
      "Automated testing",
      "Code review",
      "Modular architecture",
    ],
  },
  {
    category: "Leadership",
    items: [
      "Tech design ownership",
      "Scrum leadership",
      "Mentoring",
      "Cross-functional collaboration",
    ],
  },
];
