import reducer, {
  addBuddyMessage,
  addUserMessage,
  closeChat,
  markAutoOpened,
  openChat,
  readStoredAiState,
  setModelProgress,
  setStatus,
  toggleChat,
  AI_STORAGE_KEY,
} from "./aiSlice";
import type { AiState } from "./aiSlice";

describe("aiSlice", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("opens, closes, and toggles the chat panel", () => {
    let state = reducer(undefined, openChat());
    expect(state.open).toBe(true);

    state = reducer(state, closeChat());
    expect(state.open).toBe(false);

    state = reducer(state, toggleChat());
    expect(state.open).toBe(true);
  });

  it("appends user and buddy messages", () => {
    let state = reducer(undefined, addUserMessage("Hello"));
    state = reducer(state, addBuddyMessage({ text: "Hi there", bestMatch: false }));

    expect(state.messages).toHaveLength(2);
    expect(state.messages[0]).toMatchObject({
      role: "user",
      text: "Hello",
    });
    expect(state.messages[1]).toMatchObject({
      role: "buddy",
      text: "Hi there",
      bestMatch: false,
    });
    expect(state.messages[0].id).toBeTruthy();
    expect(state.messages[1].id).not.toBe(state.messages[0].id);
  });

  it("tracks status and model progress", () => {
    let state = reducer(undefined, setStatus("thinking"));
    expect(state.status).toBe("thinking");

    state = reducer(state, setModelProgress(0.4));
    expect(state.modelProgress).toBe(0.4);

    state = reducer(state, setStatus("idle"));
    expect(state.status).toBe("idle");
  });

  it("marks auto-open as completed", () => {
    const state = reducer(undefined, markAutoOpened());
    expect(state.autoOpened).toBe(true);
  });

  it("persists open and messages to localStorage", () => {
    let state = reducer(undefined, openChat());
    state = reducer(state, addUserMessage("persisted"));

    const raw = localStorage.getItem(AI_STORAGE_KEY);
    expect(raw).toBeTruthy();
    const parsed = JSON.parse(raw!) as { open: boolean; messages: AiState["messages"] };
    expect(parsed.open).toBe(true);
    expect(parsed.messages).toHaveLength(1);
    expect(parsed.messages[0].text).toBe("persisted");
  });

  it("hydrates initial state from localStorage", () => {
    localStorage.setItem(
      AI_STORAGE_KEY,
      JSON.stringify({
        open: false,
        messages: [
          {
            id: "m1",
            role: "buddy",
            text: "Welcome back",
            bestMatch: false,
            createdAt: 1,
          },
        ],
      })
    );

    const hydrated = readStoredAiState();
    expect(hydrated.open).toBe(false);
    expect(hydrated.messages).toHaveLength(1);
    expect(hydrated.messages[0].text).toBe("Welcome back");
  });

  it("falls back safely when storage is absent or corrupt", () => {
    expect(readStoredAiState().open).toBe(false);
    expect(readStoredAiState().messages).toEqual([]);

    localStorage.setItem(AI_STORAGE_KEY, "{not-json");
    expect(readStoredAiState().open).toBe(false);
    expect(readStoredAiState().messages).toEqual([]);
  });
});
