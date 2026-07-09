export interface CorpusChunk {
  id: string;
  title: string;
  text: string;
}

export interface SeededPrompt {
  id: string;
  question: string;
  answer: string;
}

export const CORPUS_CHUNKS: CorpusChunk[] = [
  {
    id: "summary",
    title: "Summary",
    text: "Full-stack software engineer with 8+ years building customer-facing K-12 EdTech serving 1M+ users at 99%+ uptime, specializing in React, TypeScript, and Redux. Progressed from bug-fixing to leading product-agnostic micro front-end architecture, AI-powered assessment tooling, and QTI-based test and rubric platforms. Experienced tech lead who mentors engineers, drives technical strategy, and ships accessible, well-tested software across cross-functional teams.",
  },
  {
    id: "skills",
    title: "Skills",
    text: "Languages: TypeScript, JavaScript, Java, SQL, XML. Frontend: React, Redux / Redux Toolkit, micro front-ends (MFE), SASS, CKEditor 5, jQuery, DataTables. Backend & Cloud: Node, AWS Lambda, DynamoDB, MySQL, S3, CloudFront, AWS OpenSearch, REST APIs. AI: OpenAI API integration, prompt-driven content generation, usage metering. Standards & Practices: QTI assessment standards, CI/CD, accessibility (WCAG), automated testing, code review, modular architecture. Leadership: Tech design ownership, scrum leadership, mentoring, cross-functional collaboration.",
  },
  {
    id: "work-senior",
    title: "Senior Software Engineer I — PowerSchool",
    text: "Senior Software Engineer I at PowerSchool LLC (Remote, US), July 2021 – Present. Overhauled the student test-taking application, migrating from bespoke CSS to the company's shared styling library and React component system. Replaced a legacy HTML/CSS/jQuery question-creation page with a full React SPA (Redux Toolkit, Lambda, DynamoDB, SASS, CKEditor 5), converting 15 distinct question interaction types into a unified editor with QTI standardization and XML↔JSON transformation. Built an AI item-generator that turns a user prompt into properly formatted QTI questions via the OpenAI API. Transitioned to the New Solutions team, building product-agnostic micro front-ends. Designed allotments, an AI credit entitlement system that checks org balances before AI actions run across a platform serving 1M+ users. Built a React SPA companion to a new AI chatbot for personalized student responses. Delivered a QTI-based Test Creator with automatic scoring and gradebook posting. Built rubric applications (creator, viewer, and access-aware catalog) using React, Redux Toolkit, DynamoDB, Lambda, and AWS OpenSearch. Led a scrum team, owned epics from tech design through GA release, reviewed code, and mentored newer developers.",
  },
  {
    id: "work-earlier",
    title: "Software Engineer I–III — PowerSchool",
    text: "Software Engineer I, II, III at PowerSchool LLC (Remote, US), May 2018 – July 2021. Promoted twice while progressing from maintenance work to owning full-stack features and platform-level projects. Started with front-end and build fixes across jQuery, CSS, and Maven. Delivered a full-stack FTP log viewer application with REST APIs and DataTables-driven UI. Led a static file delivery overhaul, moving distribution from a local server warehouse to versioned S3 buckets served through CloudFront. Built accessibility and geometry test-taking tools for students, including a focus reader, on-screen ruler, protractor, and compass.",
  },
  {
    id: "education",
    title: "Education",
    text: "Full Stack Development Program at Thinkful (Atlanta, GA), May 2017 – Dec 2017 — built 6 single-page applications covering RESTful APIs, MongoDB, Node, Express, and React. Associate Degree in Creative Clown Arts at TnT Clown University (Tocoa, GA), 2010.",
  },
];

export const SEEDED_PROMPTS: SeededPrompt[] = [
  {
    id: "about-yourself",
    question: "Tell me about yourself",
    answer:
      "I'm Aaron Brooks, a full-stack software engineer with 8+ years building customer-facing K-12 EdTech at PowerSchool for 1M+ users. I specialize in React, TypeScript, and Redux Toolkit, and I've progressed from bug-fixing into tech-lead work on micro front-ends, AI-powered assessment tooling, and QTI-based test/rubric platforms. I mentor engineers, own tech design through GA, and care a lot about accessibility and automated testing.",
  },
  {
    id: "react-redux",
    question: "What's your experience with React and Redux?",
    answer:
      "React and Redux Toolkit are my daily drivers. At PowerSchool I rebuilt a legacy question-creation page as a React SPA with Redux Toolkit, Lambda, and DynamoDB, unifying 15 question interaction types. I've also shipped micro front-ends that plug into multiple company apps, React companions for AI chatbots, and rubric creator/viewer apps — all with Redux Toolkit for shared state.",
  },
  {
    id: "biggest-project",
    question: "What's the biggest project you led?",
    answer:
      "One of the largest was replacing the legacy HTML/CSS/jQuery question-creation experience with a full React SPA: Redux Toolkit, Lambda, DynamoDB, SASS, and CKEditor 5, converting 15 distinct interaction types into a unified QTI-standardized editor with XML↔JSON transformation. I also led scrum, owned epics from tech design through GA, and mentored newer developers on that work.",
  },
  {
    id: "ai-work",
    question: "Tell me about your AI work",
    answer:
      "I've built an AI item-generator that turns a prompt into properly formatted QTI questions via the OpenAI API and feeds them into the question editor. I also designed 'allotments,' an AI credit entitlement system that checks org balances before AI actions run across a 1M+ user platform — so customers can be billed accurately and the business isn't exposed to uncapped AI spend. Separately, I built a React SPA companion that lets students save interests and learning styles for personalized chatbot responses.",
  },
  {
    id: "testing-a11y",
    question: "How do you approach testing and accessibility?",
    answer:
      "Accessibility (WCAG) and automated testing are explicit skills I practice. Earlier at PowerSchool I built accessibility and geometry test-taking tools for students — focus reader, on-screen ruler, protractor, and compass. Day to day I ship accessible, well-tested software, review code for standards, and treat a11y as a hard requirement rather than a nice-to-have (this portfolio itself has axe checks and a plain résumé mode).",
  },
];
