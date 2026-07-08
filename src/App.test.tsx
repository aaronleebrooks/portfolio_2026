import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { App } from "./App";
import { store } from "./store";

function renderApp() {
  return render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}

describe("App", () => {
  it("renders the portfolio window title", () => {
    renderApp();
    expect(
      screen.getByText("Aaron Brooks — Portfolio")
    ).toBeInTheDocument();
  });

  it("toggles sound state via the Redux-backed button", async () => {
    const user = userEvent.setup();
    renderApp();

    const button = screen.getByRole("button", { name: /sound: off/i });
    await user.click(button);

    expect(
      screen.getByRole("button", { name: /sound: on/i })
    ).toBeInTheDocument();
  });
});
