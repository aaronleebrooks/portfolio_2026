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
      "Led AI-powered assessment tooling and product-agnostic micro front-ends serving 1M+ users — including a Question Creator covering 15 QTI interaction types with in-editor AI generation, an Assessment Creator with AI-assisted full-test authoring, and an AI credit entitlement system that protects against uncapped spend.",
      "Owned epics from tech design through GA, led a scrum team, and mentored engineers while shipping accessible React/TypeScript platforms for tests, rubrics, and personalized learning.",
    ],
    tech: ["React", "TypeScript", "Redux Toolkit", "AWS Lambda", "DynamoDB", "OpenAI"],
  },
  {
    id: "ps-swe",
    role: "Software Engineer I → III",
    company: "PowerSchool LLC",
    location: "Remote, US",
    start: "May 2018",
    end: "Jul 2021",
    highlights: [
      "Promoted twice while progressing from maintenance work to owning full-stack features, including a static-file delivery overhaul to S3 + CloudFront and accessibility tools for student test-taking.",
    ],
    tech: ["React", "jQuery", "Node", "S3", "CloudFront", "REST APIs"],
  },
  {
    id: "thinkful",
    role: "Full Stack Development Program",
    company: "Thinkful",
    location: "Atlanta, GA",
    start: "May 2017",
    end: "Dec 2017",
    highlights: [
      "Built six single-page applications covering REST APIs, MongoDB, Node, Express, and React.",
    ],
    tech: ["React", "Node", "Express", "MongoDB"],
  },
];
