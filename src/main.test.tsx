import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Root } from "react-dom/client";

const renderMock = vi.fn();
const createRootMock = vi.fn<(container: Element | DocumentFragment) => Root>(
  () => ({ render: renderMock, unmount: vi.fn() }),
);

vi.mock("react-dom/client", () => ({
  createRoot: (container: Element | DocumentFragment) =>
    createRootMock(container),
}));

vi.mock("@/App", () => ({
  default: function MockApp() {
    return null;
  },
}));

describe("main", () => {
  beforeEach(() => {
    renderMock.mockClear();
    createRootMock.mockClear();
    document.body.replaceChildren();
    const root = document.createElement("div");
    root.id = "root";
    document.body.append(root);
  });

  it("mounts the app into #root", async () => {
    await import("@/main");

    expect(createRootMock).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledTimes(1);
  });
});
