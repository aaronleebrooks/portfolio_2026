import type { CorpusChunk, SeededPrompt } from "./corpus";
import type { Embedder } from "./embedder";
import { rankChunks } from "./retrieval";

export type AnswerSource = "seeded" | "retrieval" | "empty";

export interface AnswerResult {
  text: string;
  bestMatch: boolean;
  source: AnswerSource;
}

export interface ResolveAnswerOptions {
  embedder: Embedder;
  corpus: CorpusChunk[];
  seededPrompts: SeededPrompt[];
  onProgress?: Parameters<Embedder["embed"]>[1];
}

const EMPTY_QUERY_MESSAGE =
  "Ask me something about Aaron's experience, or pick one of the suggested questions.";

function normalize(text: string): string {
  return text.trim().toLowerCase().replace(/\s+/g, " ");
}

function findSeeded(
  query: string,
  seededPrompts: SeededPrompt[]
): SeededPrompt | undefined {
  const trimmed = query.trim();
  const byId = seededPrompts.find((p) => p.id === trimmed);
  if (byId) return byId;

  const normalized = normalize(query);
  return seededPrompts.find((p) => normalize(p.question) === normalized);
}

export async function resolveAnswer(
  query: string,
  options: ResolveAnswerOptions
): Promise<AnswerResult> {
  const { embedder, corpus, seededPrompts, onProgress } = options;

  if (!query.trim()) {
    return {
      text: EMPTY_QUERY_MESSAGE,
      bestMatch: false,
      source: "empty",
    };
  }

  const seeded = findSeeded(query, seededPrompts);
  if (seeded) {
    return {
      text: seeded.answer,
      bestMatch: false,
      source: "seeded",
    };
  }

  const texts = [query, ...corpus.map((c) => `${c.title}\n${c.text}`)];
  const embeddings = await embedder.embed(texts, onProgress);
  const queryEmbedding = embeddings[0];
  const chunkEmbeddings = new Map<string, number[]>();
  corpus.forEach((chunk, index) => {
    chunkEmbeddings.set(chunk.id, embeddings[index + 1]);
  });

  const ranked = rankChunks(queryEmbedding, corpus, chunkEmbeddings, 1);
  if (ranked.length === 0) {
    return {
      text: "I couldn't find a matching snippet in Aaron's résumé for that.",
      bestMatch: true,
      source: "retrieval",
    };
  }

  const best = ranked[0];
  return {
    text: `${best.chunk.title}: ${best.chunk.text}`,
    bestMatch: true,
    source: "retrieval",
  };
}
