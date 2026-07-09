import { cosineSimilarity, rankChunks } from "./retrieval";
import type { CorpusChunk } from "./corpus";

describe("cosineSimilarity", () => {
  it("returns 1 for identical vectors", () => {
    expect(cosineSimilarity([1, 2, 3], [1, 2, 3])).toBeCloseTo(1);
  });

  it("returns 0 for orthogonal vectors", () => {
    expect(cosineSimilarity([1, 0], [0, 1])).toBeCloseTo(0);
  });

  it("is invariant to magnitude", () => {
    expect(cosineSimilarity([1, 2, 3], [2, 4, 6])).toBeCloseTo(1);
  });

  it("returns 0 when either vector has zero magnitude", () => {
    expect(cosineSimilarity([0, 0], [1, 2])).toBe(0);
    expect(cosineSimilarity([1, 2], [0, 0])).toBe(0);
  });
});

describe("rankChunks", () => {
  const chunks: CorpusChunk[] = [
    { id: "a", title: "A", text: "alpha" },
    { id: "b", title: "B", text: "beta" },
    { id: "c", title: "C", text: "gamma" },
  ];

  it("orders chunks by descending similarity to the query embedding", () => {
    const embeddings = new Map<string, number[]>([
      ["a", [1, 0, 0]],
      ["b", [0, 1, 0]],
      ["c", [0.9, 0.1, 0]],
    ]);
    const ranked = rankChunks([1, 0, 0], chunks, embeddings, 2);
    expect(ranked.map((r) => r.chunk.id)).toEqual(["a", "c"]);
    expect(ranked[0].score).toBeGreaterThan(ranked[1].score);
  });

  it("breaks ties by chunk id ascending for stable order", () => {
    const embeddings = new Map<string, number[]>([
      ["a", [1, 0]],
      ["b", [1, 0]],
      ["c", [0, 1]],
    ]);
    const ranked = rankChunks([1, 0], chunks, embeddings, 3);
    expect(ranked.map((r) => r.chunk.id)).toEqual(["a", "b", "c"]);
  });

  it("skips chunks missing an embedding", () => {
    const embeddings = new Map<string, number[]>([["a", [1, 0]]]);
    const ranked = rankChunks([1, 0], chunks, embeddings, 5);
    expect(ranked).toHaveLength(1);
    expect(ranked[0].chunk.id).toBe("a");
  });
});
