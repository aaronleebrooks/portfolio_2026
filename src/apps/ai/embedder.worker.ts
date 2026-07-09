/// <reference lib="webworker" />

import {
  env,
  pipeline,
  type FeatureExtractionPipeline,
  type ProgressCallback,
} from "@huggingface/transformers";
import type { EmbedRequest, EmbedWorkerMessage } from "./embedder";

env.allowLocalModels = false;

const MODEL_ID = "Xenova/all-MiniLM-L6-v2";

let extractorPromise: Promise<FeatureExtractionPipeline> | null = null;

function getExtractor(
  onProgress: ProgressCallback
): Promise<FeatureExtractionPipeline> {
  if (!extractorPromise) {
    extractorPromise = pipeline("feature-extraction", MODEL_ID, {
      progress_callback: onProgress,
    }) as Promise<FeatureExtractionPipeline>;
  }
  return extractorPromise;
}

function post(message: EmbedWorkerMessage): void {
  self.postMessage(message);
}

self.onmessage = async (event: MessageEvent<EmbedRequest>) => {
  const data = event.data;
  if (!data || data.type !== "embed") return;

  const { id, texts } = data;

  try {
    const extractor = await getExtractor((progress) => {
      const status =
        typeof progress === "object" && progress && "status" in progress
          ? String((progress as { status: string }).status)
          : "progress";
      const ratio =
        typeof progress === "object" &&
        progress &&
        "progress" in progress &&
        typeof (progress as { progress: unknown }).progress === "number"
          ? (progress as { progress: number }).progress
          : undefined;
      const file =
        typeof progress === "object" &&
        progress &&
        "file" in progress &&
        typeof (progress as { file: unknown }).file === "string"
          ? (progress as { file: string }).file
          : undefined;

      post({
        type: "embed-progress",
        id,
        progress: {
          status,
          progress: ratio !== undefined ? ratio / 100 : undefined,
          file,
        },
      });
    });

    const embeddings: number[][] = [];
    for (const text of texts) {
      const output = await extractor(text, {
        pooling: "mean",
        normalize: true,
      });
      embeddings.push(Array.from(output.data as Float32Array));
    }

    post({ type: "embed-result", id, embeddings });
  } catch (error) {
    post({
      type: "embed-error",
      id,
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

export {};
