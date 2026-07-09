import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import type { ReactElement } from "react";
import { Provider } from "react-redux";
import { createFakeEmbedder } from "./__mocks__/fakeEmbedder";
import { SEEDED_PROMPTS } from "./corpus";
import { AimChat } from "./AimChat";
import { AI_STORAGE_KEY, openChat } from "../../features/ai/aiSlice";
import { makeStore } from "../../store";
import "../../i18n";

function renderAimChat() {
  localStorage.clear();
  const store = makeStore();
  store.dispatch(openChat());
  const ui: ReactElement = (
    <Provider store={store}>
      <AimChat createEmbedder={createFakeEmbedder} />
    </Provider>
  );
  return { store, ...render(ui) };
}

describe("AimChat", () => {
  afterEach(() => {
    localStorage.clear();
  });

  it("renders greeting, limited-demo note, and seeded prompt chips", () => {
    renderAimChat();

    expect(
      screen.getByText(/limited demo: seeded answers are canned/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/hey! i'm a limited demo buddy/i)
    ).toBeInTheDocument();
    for (const prompt of SEEDED_PROMPTS) {
      expect(
        screen.getByRole("button", { name: prompt.question })
      ).toBeInTheDocument();
    }
  });

  it("does not autofocus the chat input on mount", () => {
    renderAimChat();
    const input = screen.getByRole("textbox", { name: /type a question/i });
    expect(input).not.toHaveFocus();
    expect(document.activeElement).not.toBe(input);
  });

  it("answers a seeded prompt chip without requiring free text", async () => {
    const user = userEvent.setup();
    renderAimChat();

    const prompt = SEEDED_PROMPTS[0];
    await user.click(screen.getByRole("button", { name: prompt.question }));

    const log = screen.getByRole("log", { name: /aim chat messages/i });
    expect(log).toHaveTextContent(prompt.question);
    await waitFor(() => {
      expect(log).toHaveTextContent(prompt.answer);
    });
  });

  it("answers free-text questions via the embedder", async () => {
    const user = userEvent.setup();
    renderAimChat();

    const input = screen.getByRole("textbox", { name: /type a question/i });
    await user.type(input, "OpenAI QTI item generator");
    await user.click(screen.getByRole("button", { name: /^send$/i }));

    await waitFor(() => {
      expect(screen.getByText(/best match from résumé/i)).toBeInTheDocument();
    });
  });

  it("exposes a polite aria-live region for messages", () => {
    renderAimChat();
    const live = screen.getByRole("log", { name: /aim chat messages/i });
    expect(live).toHaveAttribute("aria-live", "polite");
  });

  it("closes the panel from the close button", async () => {
    const user = userEvent.setup();
    const { store } = renderAimChat();

    await user.click(screen.getByRole("button", { name: /close chat/i }));
    expect(store.getState().ai.open).toBe(false);
    expect(screen.queryByRole("dialog", { name: /aim/i })).toBeNull();
  });

  it("reflects the global sound mute toggle", async () => {
    const user = userEvent.setup();
    const { store } = renderAimChat();

    const soundBtn = screen.getByRole("button", { name: /aim sounds muted/i });
    expect(soundBtn).toHaveAttribute("aria-pressed", "false");

    await user.click(soundBtn);
    expect(store.getState().settings.soundMuted).toBe(false);
    expect(
      screen.getByRole("button", { name: /aim sounds on/i })
    ).toHaveAttribute("aria-pressed", "true");
  });

  it("has no axe violations with contrast rules relaxed", async () => {
    const { container } = renderAimChat();
    const results = await axe(container, {
      rules: { "color-contrast": { enabled: false } },
    });
    expect(results).toHaveNoViolations();
  });

  it("persists messages when answering", async () => {
    const user = userEvent.setup();
    renderAimChat();
    const prompt = SEEDED_PROMPTS[1];
    await user.click(screen.getByRole("button", { name: prompt.question }));

    await waitFor(() => {
      const raw = localStorage.getItem(AI_STORAGE_KEY);
      expect(raw).toBeTruthy();
      const parsed = JSON.parse(raw!) as { messages: unknown[] };
      expect(parsed.messages.length).toBeGreaterThanOrEqual(2);
    });
  });
});
