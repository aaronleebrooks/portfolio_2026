import type { EmbedProgress, Embedder } from "../embedder";

const DIM = 32;

function hashToken(token: string): number {
  let hash = 2166136261;
  for (let i = 0; i < token.length; i += 1) {
    hash ^= token.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function embedText(text: string): number[] {
  const vector = new Array<number>(DIM).fill(0);
  const tokens = text.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
  for (const token of tokens) {
    const idx = hashToken(token) % DIM;
    vector[idx] += 1;
  }
  const mag = Math.sqrt(vector.reduce((sum, v) => sum + v * v, 0));
  if (mag === 0) return vector;
  return vector.map((v) => v / mag);
}

export function createFakeEmbedder(): Embedder {
  return {
    async embed(
      texts: string[],
      onProgress?: (progress: EmbedProgress) => void
    ): Promise<number[][]> {
      onProgress?.({ status: "ready", progress: 1 });
      return texts.map(embedText);
    },
  };
}
