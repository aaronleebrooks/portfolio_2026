import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BootSplash } from "./BootSplash";

describe("BootSplash", () => {
  it("lets the user skip straight to the desktop", async () => {
    const onDone = jest.fn();
    const user = userEvent.setup();
    render(<BootSplash onDone={onDone} />);

    await user.click(screen.getByRole("button", { name: /skip/i }));
    expect(onDone).toHaveBeenCalledTimes(1);
  });

  it("auto-advances after a timeout", () => {
    jest.useFakeTimers();
    try {
      const onDone = jest.fn();
      render(<BootSplash onDone={onDone} />);
      expect(onDone).not.toHaveBeenCalled();
      jest.advanceTimersByTime(2400);
      expect(onDone).toHaveBeenCalledTimes(1);
    } finally {
      jest.useRealTimers();
    }
  });
});
