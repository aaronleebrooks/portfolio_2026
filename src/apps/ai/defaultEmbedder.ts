import { createWorkerEmbedder } from "./workerEmbedder";
import type { EmbedderFactory } from "./useAiChat";

/** Production default: transformers.js in a Web Worker. */
export const defaultCreateEmbedder: EmbedderFactory = () =>
  createWorkerEmbedder();
