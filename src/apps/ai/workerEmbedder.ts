import {
  createEmbedRequest,
  matchResponse,
  parseProgressEvent,
  type EmbedProgress,
  type Embedder,
  type EmbedWorkerMessage,
} from "./embedder";

type WorkerFactory = () => Worker;

function defaultWorkerFactory(): Worker {
  return new Worker(new URL("./embedder.worker.ts", import.meta.url));
}

export function createWorkerEmbedder(
  createWorker: WorkerFactory = defaultWorkerFactory
): Embedder {
  let worker: Worker | null = null;
  const pending = new Map<
    string,
    {
      resolve: (embeddings: number[][]) => void;
      reject: (error: Error) => void;
      onProgress?: (progress: EmbedProgress) => void;
    }
  >();

  const ensureWorker = () => {
    if (worker) return worker;
    worker = createWorker();
    worker.onmessage = (event: MessageEvent<EmbedWorkerMessage>) => {
      const message = event.data;
      const progress = parseProgressEvent(message);
      if (progress && message.type === "embed-progress") {
        pending.get(message.id)?.onProgress?.(progress);
        return;
      }

      if (message.type !== "embed-result" && message.type !== "embed-error") {
        return;
      }

      const matched = matchResponse(message.id, message);
      if (!matched) return;

      const entry = pending.get(matched.id);
      if (!entry) return;
      pending.delete(matched.id);

      if (matched.type === "embed-result") {
        entry.resolve(matched.embeddings);
      } else {
        entry.reject(new Error(matched.message));
      }
    };
    worker.onerror = (event) => {
      const error = new Error(event.message || "Embedder worker failed");
      for (const [, entry] of pending) {
        entry.reject(error);
      }
      pending.clear();
    };
    return worker;
  };

  return {
    embed(texts, onProgress) {
      const request = createEmbedRequest(texts);
      const activeWorker = ensureWorker();

      return new Promise<number[][]>((resolve, reject) => {
        pending.set(request.id, { resolve, reject, onProgress });
        activeWorker.postMessage(request);
      });
    },
  };
}
