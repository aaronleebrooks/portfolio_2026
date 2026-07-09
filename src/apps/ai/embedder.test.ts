import {
  createEmbedRequest,
  matchResponse,
  parseProgressEvent,
  resetEmbedRequestIds,
  type EmbedWorkerMessage,
} from "./embedder";

describe("embedder protocol helpers", () => {
  beforeEach(() => {
    resetEmbedRequestIds();
  });

  it("creates embed requests with unique incremental ids", () => {
    const first = createEmbedRequest(["hello"]);
    const second = createEmbedRequest(["world"]);

    expect(first).toEqual({
      type: "embed",
      id: "embed-1",
      texts: ["hello"],
    });
    expect(second.id).toBe("embed-2");
    expect(second.texts).toEqual(["world"]);
  });

  it("matchResponse correlates success and error replies to a pending id", () => {
    const success: EmbedWorkerMessage = {
      type: "embed-result",
      id: "embed-1",
      embeddings: [[1, 0]],
    };
    const error: EmbedWorkerMessage = {
      type: "embed-error",
      id: "embed-1",
      message: "boom",
    };
    const other: EmbedWorkerMessage = {
      type: "embed-result",
      id: "embed-2",
      embeddings: [[0, 1]],
    };
    const progress: EmbedWorkerMessage = {
      type: "embed-progress",
      id: "embed-1",
      progress: { status: "progress", progress: 0.5 },
    };

    expect(matchResponse("embed-1", success)).toEqual(success);
    expect(matchResponse("embed-1", error)).toEqual(error);
    expect(matchResponse("embed-1", other)).toBeNull();
    expect(matchResponse("embed-1", progress)).toBeNull();
  });

  it("parseProgressEvent extracts progress payloads only", () => {
    const progress: EmbedWorkerMessage = {
      type: "embed-progress",
      id: "embed-1",
      progress: { status: "progress", progress: 0.25, file: "model.onnx" },
    };
    const success: EmbedWorkerMessage = {
      type: "embed-result",
      id: "embed-1",
      embeddings: [[1]],
    };

    expect(parseProgressEvent(progress)).toEqual({
      status: "progress",
      progress: 0.25,
      file: "model.onnx",
    });
    expect(parseProgressEvent(success)).toBeNull();
  });
});
