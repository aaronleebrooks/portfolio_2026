import { type FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { closeChat } from "../../features/ai/aiSlice";
import { useAppDispatch } from "../../store";
import { useAiChat, type EmbedderFactory } from "./useAiChat";

export interface AimChatProps {
  createEmbedder: EmbedderFactory;
}

export function AimChat({ createEmbedder }: AimChatProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const {
    open,
    messages,
    status,
    modelProgress,
    muted,
    seededPrompts,
    ask,
    toggleSound,
  } = useAiChat({ createEmbedder });
  const [draft, setDraft] = useState("");

  if (!open) return null;

  const busy = status === "thinking" || status === "loading-model";

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const value = draft;
    setDraft("");
    void ask(value);
  };

  let statusText: string | null = null;
  if (status === "thinking") statusText = t("apps.ai.thinking");
  if (status === "loading-model") {
    statusText = t("apps.ai.loadingModel", {
      progress: Math.round((modelProgress ?? 0) * 100),
    });
  }
  if (status === "error") statusText = t("apps.ai.error");

  return (
    <div
      role="dialog"
      aria-label={t("apps.ai.title")}
      aria-modal={false}
      className="window absolute bottom-10 right-2 z-[100] flex w-[min(100%-1rem,360px)] flex-col shadow-lg"
      style={{ maxHeight: "min(70vh, 480px)" }}
    >
      <div className="title-bar">
        <div className="title-bar-text">{t("apps.ai.title")}</div>
        <div className="title-bar-controls">
          <button
            type="button"
            aria-label={muted ? t("apps.ai.soundOff") : t("apps.ai.soundOn")}
            aria-pressed={!muted}
            onClick={toggleSound}
          >
            {muted ? "🔇" : "🔊"}
          </button>
          <button
            type="button"
            aria-label={t("apps.ai.close")}
            data-control="close"
            onClick={() => dispatch(closeChat())}
          />
        </div>
      </div>

      <div className="window-body flex min-h-0 flex-1 flex-col gap-2 overflow-hidden p-2 text-sm">
        <p className="text-xs italic text-[#555]">{t("apps.ai.limitedDemo")}</p>
        <p className="text-xs">{t("apps.ai.greeting")}</p>

        <div
          role="log"
          aria-live="polite"
          aria-relevant="additions"
          aria-label={t("apps.ai.liveRegion")}
          className="min-h-0 flex-1 space-y-2 overflow-y-auto rounded border border-[#aca899] bg-white p-2"
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={
                msg.role === "user"
                  ? "ml-6 rounded bg-[#dfefff] px-2 py-1"
                  : "mr-6 rounded bg-[#f0f0f0] px-2 py-1"
              }
            >
              <div className="text-[10px] font-bold uppercase text-[#666]">
                {msg.role === "user" ? "You" : t("apps.ai.buddyName")}
              </div>
              <div>{msg.text}</div>
              {msg.bestMatch && (
                <div className="mt-1 text-[10px] italic text-[#666]">
                  {t("apps.ai.bestMatchLabel")}
                </div>
              )}
            </div>
          ))}
        </div>

        {statusText && (
          <p role="status" className="text-xs text-[#555]">
            {statusText}
          </p>
        )}

        <div>
          <div className="mb-1 text-[10px] font-bold uppercase">
            {t("apps.ai.promptsHeading")}
          </div>
          <div className="flex flex-wrap gap-1">
            {seededPrompts.map((prompt) => (
              <button
                key={prompt.id}
                type="button"
                className="rounded border border-[#7f9db9] bg-[#ece9d8] px-1.5 py-0.5 text-left text-[11px]"
                disabled={busy}
                onClick={() => void ask(prompt.question)}
              >
                {prompt.question}
              </button>
            ))}
          </div>
        </div>

        <form className="flex gap-1" onSubmit={onSubmit}>
          <input
            type="text"
            className="min-w-0 flex-1"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder={t("apps.ai.placeholder")}
            aria-label={t("apps.ai.placeholder")}
            disabled={busy}
            autoFocus={false}
          />
          <button type="submit" className="default" disabled={busy || !draft.trim()}>
            {t("apps.ai.send")}
          </button>
        </form>
      </div>
    </div>
  );
}
