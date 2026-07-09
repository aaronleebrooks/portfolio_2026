import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export const AI_STORAGE_KEY = "aiChat";

export type AiMessageRole = "user" | "buddy";

export type AiStatus = "idle" | "thinking" | "loading-model" | "error";

export interface AiMessage {
  id: string;
  role: AiMessageRole;
  text: string;
  bestMatch: boolean;
  createdAt: number;
}

export interface AiState {
  open: boolean;
  messages: AiMessage[];
  status: AiStatus;
  modelProgress: number | null;
  autoOpened: boolean;
}

interface StoredAiState {
  open: boolean;
  messages: AiMessage[];
}

function isAiMessage(value: unknown): value is AiMessage {
  if (!value || typeof value !== "object") return false;
  const msg = value as Record<string, unknown>;
  return (
    typeof msg.id === "string" &&
    (msg.role === "user" || msg.role === "buddy") &&
    typeof msg.text === "string" &&
    typeof msg.bestMatch === "boolean" &&
    typeof msg.createdAt === "number"
  );
}

export function readStoredAiState(): Pick<AiState, "open" | "messages"> {
  try {
    const raw = localStorage.getItem(AI_STORAGE_KEY);
    if (!raw) return { open: false, messages: [] };
    const parsed = JSON.parse(raw) as Partial<StoredAiState>;
    // Default closed until auto-open; only restore true when explicitly persisted.
    const open = parsed.open === true;
    const messages = Array.isArray(parsed.messages)
      ? parsed.messages.filter(isAiMessage)
      : [];
    return { open, messages };
  } catch {
    return { open: false, messages: [] };
  }
}

function persist(state: AiState): void {
  try {
    const payload: StoredAiState = {
      open: state.open,
      messages: state.messages,
    };
    localStorage.setItem(AI_STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // ignore quota / private mode
  }
}

let messageSeq = 0;

function nextMessageId(): string {
  messageSeq += 1;
  return `msg-${Date.now()}-${messageSeq}`;
}

const initialState = (): AiState => {
  const stored = readStoredAiState();
  return {
    open: stored.open,
    messages: stored.messages,
    status: "idle",
    modelProgress: null,
    autoOpened: false,
  };
};

const aiSlice = createSlice({
  name: "ai",
  initialState,
  reducers: {
    openChat(state) {
      state.open = true;
      persist(state);
    },
    closeChat(state) {
      state.open = false;
      persist(state);
    },
    toggleChat(state) {
      state.open = !state.open;
      persist(state);
    },
    addUserMessage(state, action: PayloadAction<string>) {
      state.messages.push({
        id: nextMessageId(),
        role: "user",
        text: action.payload,
        bestMatch: false,
        createdAt: Date.now(),
      });
      persist(state);
    },
    addBuddyMessage(
      state,
      action: PayloadAction<{ text: string; bestMatch?: boolean }>
    ) {
      state.messages.push({
        id: nextMessageId(),
        role: "buddy",
        text: action.payload.text,
        bestMatch: Boolean(action.payload.bestMatch),
        createdAt: Date.now(),
      });
      persist(state);
    },
    setStatus(state, action: PayloadAction<AiStatus>) {
      state.status = action.payload;
      if (action.payload === "idle" || action.payload === "error") {
        state.modelProgress = null;
      }
    },
    setModelProgress(state, action: PayloadAction<number | null>) {
      state.modelProgress = action.payload;
    },
    markAutoOpened(state) {
      state.autoOpened = true;
    },
  },
});

export const {
  openChat,
  closeChat,
  toggleChat,
  addUserMessage,
  addBuddyMessage,
  setStatus,
  setModelProgress,
  markAutoOpened,
} = aiSlice.actions;

export default aiSlice.reducer;
