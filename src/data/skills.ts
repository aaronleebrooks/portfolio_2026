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
    items: ["React", "Redux Toolkit", "Micro front-ends", "SASS", "CKEditor 5"],
  },
  {
    category: "Backend & Cloud",
    items: ["Node", "AWS Lambda", "DynamoDB", "MySQL", "S3", "CloudFront", "OpenSearch"],
  },
  {
    category: "AI",
    items: ["OpenAI API", "Prompt-driven generation", "Usage metering"],
  },
  {
    category: "Practices",
    items: ["QTI", "CI/CD", "WCAG accessibility", "Automated testing", "Code review"],
  },
  {
    category: "Leadership",
    items: ["Tech design ownership", "Scrum leadership", "Mentoring"],
  },
];
