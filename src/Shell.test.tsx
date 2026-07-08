import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
    await user.click(within(menu).getByRole("menuitem", { name: /résumé/i }));

    expect(screen.getByRole("dialog", { name: "Résumé" })).toBeInTheDocument();
  });
});
