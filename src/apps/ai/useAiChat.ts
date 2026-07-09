import { useCallback, useRef } from "react";
import { resolveAnswer } from "./answer";
import { CORPUS_CHUNKS, SEEDED_PROMPTS } from "./corpus";
import type { Embedder } from "./embedder";
import {
  addBuddyMessage,
  addUserMessage,
  setModelProgress,
  setStatus,
} from "../../features/ai/aiSlice";
import {
  createSoundPlayer,
  type SoundPlayer,
} from "../../features/ai/soundPlayer";
import { toggleMuted, useAppDispatch, useAppSelector } from "../../store";

export type EmbedderFactory = () => Embedder;

export interface UseAiChatOptions {
  createEmbedder: EmbedderFactory;
  createSoundPlayer?: () => SoundPlayer;
}

export function useAiChat(options: UseAiChatOptions) {
  const dispatch = useAppDispatch();
  const muted = useAppSelector((state) => state.settings.soundMuted);
  const status = useAppSelector((state) => state.ai.status);
  const modelProgress = useAppSelector((state) => state.ai.modelProgress);
  const messages = useAppSelector((state) => state.ai.messages);
  const open = useAppSelector((state) => state.ai.open);

  const embedderRef = useRef<Embedder | null>(null);
  const soundRef = useRef<SoundPlayer | null>(null);
  const mutedRef = useRef(muted);
  mutedRef.current = muted;

  const getSound = useCallback(() => {
    if (!soundRef.current) {
      soundRef.current =
        options.createSoundPlayer?.() ??
        createSoundPlayer({ isMuted: () => mutedRef.current });
    }
    return soundRef.current;
  }, [options]);

  const getEmbedder = useCallback(() => {
    if (!embedderRef.current) {
      embedderRef.current = options.createEmbedder();
    }
    return embedderRef.current;
  }, [options]);

  const ask = useCallback(
    async (query: string) => {
      const trimmed = query.trim();
      if (!trimmed || status === "thinking" || status === "loading-model") {
        return;
      }

      dispatch(addUserMessage(trimmed));
      dispatch(setStatus("thinking"));

      try {
        const seeded = SEEDED_PROMPTS.some(
          (p) => p.id === trimmed || p.question.toLowerCase() === trimmed.toLowerCase()
        );

        const result = await resolveAnswer(trimmed, {
          embedder: getEmbedder(),
          corpus: CORPUS_CHUNKS,
          seededPrompts: SEEDED_PROMPTS,
          onProgress: (progress) => {
            if (!seeded) {
              dispatch(setStatus("loading-model"));
              if (typeof progress.progress === "number") {
                dispatch(setModelProgress(progress.progress));
              }
            }
          },
        });

        dispatch(
          addBuddyMessage({ text: result.text, bestMatch: result.bestMatch })
        );
        getSound().play("messageReceived");
        dispatch(setStatus("idle"));
      } catch {
        dispatch(setStatus("error"));
      }
    },
    [dispatch, getEmbedder, getSound, status]
  );

  const toggleSound = useCallback(() => {
    dispatch(toggleMuted());
  }, [dispatch]);

  return {
    open,
    messages,
    status,
    modelProgress,
    muted,
    seededPrompts: SEEDED_PROMPTS,
    ask,
    toggleSound,
  };
}
