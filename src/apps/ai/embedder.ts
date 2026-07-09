export interface EmbedProgress {
  status: string;
  progress?: number;
  file?: string;
}

export interface Embedder {
  embed(texts: string[], onProgress?: (progress: EmbedProgress) => void): Promise<number[][]>;
}

export type EmbedRequest = {
  type: "embed";
  id: string;
  texts: string[];
};

export type EmbedSuccessResponse = {
  type: "embed-result";
  id: string;
  embeddings: number[][];
};

export type EmbedErrorResponse = {
  type: "embed-error";
  id: string;
  message: string;
};

export type EmbedProgressEvent = {
  type: "embed-progress";
  id: string;
  progress: EmbedProgress;
};

export type EmbedWorkerMessage =
  | EmbedSuccessResponse
  | EmbedErrorResponse
  | EmbedProgressEvent;

let nextRequestId = 0;

export function createEmbedRequest(texts: string[]): EmbedRequest {
  nextRequestId += 1;
  return {
    type: "embed",
    id: `embed-${nextRequestId}`,
    texts,
  };
}

/** Test helper to reset the request id counter between suites. */
export function resetEmbedRequestIds(): void {
  nextRequestId = 0;
}

export function matchResponse(
  pendingId: string,
  message: EmbedWorkerMessage
): EmbedSuccessResponse | EmbedErrorResponse | null {
  if (message.type === "embed-progress") return null;
  if (message.id !== pendingId) return null;
  return message;
}

export function parseProgressEvent(
  message: EmbedWorkerMessage
): EmbedProgress | null {
  if (message.type !== "embed-progress") return null;
  return message.progress;
}
