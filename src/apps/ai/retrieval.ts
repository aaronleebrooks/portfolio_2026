import type { CorpusChunk } from "./corpus";

export interface RankedChunk {
  chunk: CorpusChunk;
  score: number;
}

export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length || a.length === 0) return 0;

  let dot = 0;
  let magA = 0;
  let magB = 0;
  for (let i = 0; i < a.length; i += 1) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }

  if (magA === 0 || magB === 0) return 0;
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

export function rankChunks(
  queryEmbedding: number[],
  chunks: CorpusChunk[],
  embeddings: Map<string, number[]>,
  topK: number
): RankedChunk[] {
  const ranked: RankedChunk[] = [];

  for (const chunk of chunks) {
    const embedding = embeddings.get(chunk.id);
    if (!embedding) continue;
    ranked.push({
      chunk,
      score: cosineSimilarity(queryEmbedding, embedding),
    });
  }

  ranked.sort((left, right) => {
    if (right.score !== left.score) return right.score - left.score;
    return left.chunk.id.localeCompare(right.chunk.id);
  });

  return ranked.slice(0, topK);
}
