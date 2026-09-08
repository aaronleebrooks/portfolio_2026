export type SkillGroup = {
  category: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    category: "Frontend",
    items: ["TypeScript", "React", "Redux Toolkit", "Micro front-ends"],
  },
  {
    category: "Backend & cloud",
    items: ["Node", "AWS Lambda", "DynamoDB", "OpenSearch", "S3 / CloudFront"],
  },
  {
    category: "Domain",
    items: ["QTI assessment standards", "WCAG accessibility", "OpenAI API"],
  },
];
