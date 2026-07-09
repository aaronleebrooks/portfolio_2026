import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import type { ReactElement } from "react";
import { Provider } from "react-redux";
import { Shell } from "./Shell";
import { makeStore } from "./store";

function renderShell() {
  const store = makeStore();
  const ui: ReactElement = (
    <Provider store={store}>
      <Shell />
    </Provider>
  );
  return { store, ...render(ui) };
}

async function boot(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole("button", { name: /skip/i }));
}

describe("Shell", () => {
  afterEach(() => {
    window.location.hash = "";
    localStorage.clear();
  });

  it("boots into a desktop with app icons", async () => {
    const user = userEvent.setup();
    renderShell();
    await boot(user);
    expect(
      screen.getByRole("button", { name: /open about me/i })
    ).toBeInTheDocument();
  });

  it("opens a window from a desktop icon and lists it in the taskbar", async () => {
    const user = userEvent.setup();
    renderShell();
    await boot(user);

    await user.dblClick(screen.getByRole("button", { name: /open about me/i }));

    expect(
      screen.getByRole("dialog", { name: "About Me" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "About Me" })
    ).toBeInTheDocument();
  });

  it("minimizes to the taskbar and restores from it", async () => {
    const user = userEvent.setup();
    renderShell();
    await boot(user);
    await user.dblClick(screen.getByRole("button", { name: /open about me/i }));

    await user.click(screen.getByRole("button", { name: /minimize/i }));
    expect(screen.queryByRole("dialog", { name: "About Me" })).toBeNull();

    await user.click(screen.getByRole("button", { name: "About Me" }));
    expect(
      screen.getByRole("dialog", { name: "About Me" })
    ).toBeInTheDocument();
  });

  it("closes a window, removing it from the desktop and taskbar", async () => {
    const user = userEvent.setup();
    renderShell();
    await boot(user);
    await user.dblClick(screen.getByRole("button", { name: /open about me/i }));

    await user.click(screen.getByRole("button", { name: /close/i }));

    expect(screen.queryByRole("dialog", { name: "About Me" })).toBeNull();
    expect(screen.queryByRole("button", { name: "About Me" })).toBeNull();
  });

  it("opens apps from the Start menu", async () => {
    const user = userEvent.setup();
    renderShell();
    await boot(user);

    await user.click(screen.getByRole("button", { name: /^start$/i }));
    const menu = screen.getByRole("menu", { name: /start menu/i });
    await user.click(
      within(menu).getByRole("menuitem", { name: /adobe acrobat reader/i })
    );

    expect(
      screen.getByRole("dialog", { name: "Adobe Acrobat Reader" })
    ).toBeInTheDocument();
  });

  it("opens the résumé viewer from a hash deep link after boot", async () => {
    window.location.hash = "#/resume";
    const user = userEvent.setup();
    renderShell();
    await boot(user);

    expect(
      screen.getByRole("dialog", { name: "Adobe Acrobat Reader" })
    ).toBeInTheDocument();
  });

  it("reveals email from the email app", async () => {
    const user = userEvent.setup();
    renderShell();
    await boot(user);

    await user.dblClick(screen.getByRole("button", { name: /open email/i }));
    await user.click(screen.getByRole("button", { name: /show email address/i }));

    expect(
      screen.getByRole("link", { name: "TheAaronLeeBrooks@gmail.com" })
    ).toBeInTheDocument();
  });

  it("opens plain résumé accessible mode from the taskbar", async () => {
    const user = userEvent.setup();
    renderShell();
    await boot(user);

    await user.click(screen.getByRole("button", { name: /plain résumé view/i }));

    expect(
      screen.getByRole("heading", { name: /aaron brooks — résumé/i })
    ).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /^start$/i })).toBeNull();
  });

  it("has no axe violations in accessible mode", async () => {
    const user = userEvent.setup();
    const { container } = renderShell();
    await boot(user);
    await user.click(screen.getByRole("button", { name: /plain résumé view/i }));

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("passes axe checks on the desktop shell with contrast rules relaxed", async () => {
    const user = userEvent.setup();
    const { container } = renderShell();
    await boot(user);

    const results = await axe(container, {
      rules: {
        "color-contrast": { enabled: false },
      },
    });
    expect(results).toHaveNoViolations();
  });

  it("renders LinkedIn and GitHub as external links on the desktop", async () => {
    renderShell();
    await boot(userEvent.setup());

    expect(screen.getByRole("link", { name: /open linkedin/i })).toHaveAttribute(
      "href",
      "https://linkedin.com/in/aaronleebrooks"
    );
    expect(screen.getByRole("link", { name: /open github/i })).toHaveAttribute(
      "href",
      "https://github.com/aaronleebrooks/portfolio_2026"
    );
  });

  it("updates visible UI when the language is changed", async () => {
    const user = userEvent.setup();
    renderShell();
    await boot(user);
    await user.dblClick(screen.getByRole("button", { name: /open about me/i }));

    const select = screen.getByRole("combobox", { name: /language/i });
    await user.selectOptions(select, "fr");

    expect(
      screen.getByRole("button", { name: /ouvrir à propos/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /réduire/i })
    ).toHaveAttribute("data-control", "minimize");
  });
});
