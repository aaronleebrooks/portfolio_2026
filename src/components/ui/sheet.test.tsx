import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

describe("Sheet", () => {
  it("opens from a trigger and closes via the close button", async () => {
    const user = userEvent.setup();

    render(
      <Sheet>
        <SheetTrigger render={<Button>Open sheet</Button>} />
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Sheet title</SheetTitle>
            <SheetDescription>Sheet description</SheetDescription>
          </SheetHeader>
          <p>Sheet body</p>
          <SheetFooter>
            <SheetClose render={<Button>Done</Button>} />
          </SheetFooter>
        </SheetContent>
      </Sheet>,
    );

    await user.click(screen.getByRole("button", { name: "Open sheet" }));

    const dialog = await screen.findByRole("dialog");
    expect(
      within(dialog).getByRole("heading", { name: "Sheet title" }),
    ).toBeInTheDocument();
    expect(within(dialog).getByText("Sheet description")).toBeInTheDocument();
    expect(within(dialog).getByText("Sheet body")).toBeInTheDocument();

    await user.click(within(dialog).getByRole("button", { name: "Close" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it.each(["top", "bottom", "left", "right"] as const)(
    "supports the %s side",
    async (side) => {
      const user = userEvent.setup();

      render(
        <Sheet>
          <SheetTrigger render={<Button>Open {side}</Button>} />
          <SheetContent side={side} showCloseButton={false}>
            <SheetHeader>
              <SheetTitle>{side} sheet</SheetTitle>
            </SheetHeader>
          </SheetContent>
        </Sheet>,
      );

      await user.click(screen.getByRole("button", { name: `Open ${side}` }));

      const dialog = await screen.findByRole("dialog");
      expect(
        within(dialog).getByRole("heading", { name: `${side} sheet` }),
      ).toBeInTheDocument();
      expect(
        within(dialog).queryByRole("button", { name: "Close" }),
      ).not.toBeInTheDocument();
    },
  );
});
