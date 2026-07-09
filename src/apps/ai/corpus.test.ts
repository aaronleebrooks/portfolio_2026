import { CORPUS_CHUNKS, SEEDED_PROMPTS } from "./corpus";

describe("CORPUS_CHUNKS", () => {
  it("contains non-empty chunks with unique ids", () => {
    expect(CORPUS_CHUNKS.length).toBeGreaterThan(0);
    const ids = CORPUS_CHUNKS.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const chunk of CORPUS_CHUNKS) {
      expect(chunk.id).toBeTruthy();
      expect(chunk.title).toBeTruthy();
      expect(chunk.text.trim().length).toBeGreaterThan(0);
    }
  });

  it("covers summary, skills, work experience, and education", () => {
    const ids = CORPUS_CHUNKS.map((c) => c.id);
    expect(ids).toEqual(
      expect.arrayContaining([
        "summary",
        "skills",
        "work-senior",
        "work-earlier",
        "education",
      ])
    );
  });
});

describe("SEEDED_PROMPTS", () => {
  it("has unique ids and non-empty question/answer pairs", () => {
    expect(SEEDED_PROMPTS.length).toBeGreaterThanOrEqual(5);
    const ids = SEEDED_PROMPTS.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const prompt of SEEDED_PROMPTS) {
      expect(prompt.question.trim().length).toBeGreaterThan(0);
      expect(prompt.answer.trim().length).toBeGreaterThan(0);
    }
  });

  it("includes the planned phone-screen prompts", () => {
    const ids = SEEDED_PROMPTS.map((p) => p.id);
    expect(ids).toEqual(
      expect.arrayContaining([
        "about-yourself",
        "react-redux",
        "biggest-project",
        "ai-work",
        "testing-a11y",
      ])
    );
  });
});
