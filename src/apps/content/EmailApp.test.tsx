import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { makeStore } from "../../store";
import "../../i18n";
import { EmailApp } from "./EmailApp";

function renderEmailApp() {
  const store = makeStore();
  return render(
    <Provider store={store}>
      <EmailApp />
    </Provider>
  );
}

describe("EmailApp", () => {
  it("reveals the email address on demand", async () => {
    const user = userEvent.setup();
    renderEmailApp();

    expect(screen.queryByRole("link")).toBeNull();
    await user.click(screen.getByRole("button", { name: /show email address/i }));

    expect(screen.getByRole("link")).toHaveTextContent(
      "TheAaronLeeBrooks@gmail.com"
    );
  });
});
