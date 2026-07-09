import { createFakeEmbedder } from "./__mocks__/fakeEmbedder";
import type { EmbedderFactory } from "./useAiChat";

/** Production default: lazy worker embedder. Overridden in tests via AimChat props. */
export const defaultCreateEmbedder: EmbedderFactory = () => {
  // Worker embedder is wired in Phase G; until then use the fake so seeded prompts work.
  return createFakeEmbedder();
};
