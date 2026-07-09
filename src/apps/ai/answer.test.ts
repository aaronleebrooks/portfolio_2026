import { createFakeEmbedder } from "./__mocks__/fakeEmbedder";
import { resolveAnswer } from "./answer";
import type { CorpusChunk, SeededPrompt } from "./corpus";
import type { Embedder } from "./embedder";

const corpus: CorpusChunk[] = [
  {
    id: "react",
    title: "React",
    text: "Built React SPAs with Redux Toolkit for question editing.",
  },
  {
    id: "ai",
    title: "AI",
    text: "Integrated OpenAI API for QTI item generation and allotments.",
  },
];

const seeded: SeededPrompt[] = [
  {
    id: "about-yourself",
    question: "Tell me about yourself",
    answer: "I am Aaron, a full-stack engineer.",
  },
];

describe("resolveAnswer", () => {
  let embedder: Embedder;
  let embedSpy: jest.SpyInstance;

  beforeEach(() => {
    embedder = createFakeEmbedder();
    embedSpy = jest.spyOn(embedder, "embed");
  });

  afterEach(() => {
    embedSpy.mockRestore();
  });

  it("returns a canned answer for a seeded prompt id without embedding", async () => {
    const result = await resolveAnswer("about-yourself", {
      embedder,
      corpus,
      seededPrompts: seeded,
    });

    expect(result).toEqual({
      text: "I am Aaron, a full-stack engineer.",
      bestMatch: false,
      source: "seeded",
    });
    expect(embedSpy).not.toHaveBeenCalled();
  });

  it("returns a canned answer for an exact seeded question without embedding", async () => {
    const result = await resolveAnswer("Tell me about yourself", {
      embedder,
      corpus,
      seededPrompts: seeded,
    });

    expect(result.source).toBe("seeded");
    expect(result.bestMatch).toBe(false);
    expect(result.text).toContain("Aaron");
    expect(embedSpy).not.toHaveBeenCalled();
  });

  it("embeds free text and returns the best-matching chunk as a limited demo", async () => {
    const result = await resolveAnswer("OpenAI QTI generation", {
      embedder,
      corpus,
      seededPrompts: seeded,
    });

    expect(embedSpy).toHaveBeenCalled();
    expect(result.bestMatch).toBe(true);
    expect(result.source).toBe("retrieval");
    expect(result.text).toContain("OpenAI");
  });

  it("returns a graceful empty-query message without embedding", async () => {
    const result = await resolveAnswer("   ", {
      embedder,
      corpus,
      seededPrompts: seeded,
    });

    expect(result.source).toBe("empty");
    expect(result.bestMatch).toBe(false);
    expect(result.text.length).toBeGreaterThan(0);
    expect(embedSpy).not.toHaveBeenCalled();
  });
});
