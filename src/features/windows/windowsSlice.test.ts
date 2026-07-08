import reducer, {
  closeWindow,
  focusWindow,
  minimizeWindow,
  moveWindow,
  openWindow,
  resizeWindow,
  toggleMaximize,
} from "./windowsSlice";
import type { OpenWindowPayload, WindowsState } from "./windowsSlice";

function open(appId: string): OpenWindowPayload {
  return { appId, x: 10, y: 10, width: 300, height: 200 };
}

describe("windowsSlice", () => {
  it("opens a window, focuses it, and advances the z-index counter", () => {
    const state = reducer(undefined, openWindow(open("about")));
    expect(state.windows).toHaveLength(1);
    expect(state.focusedId).toBe("about");
    expect(state.windows[0].zIndex).toBe(1);
    expect(state.nextZIndex).toBe(2);
  });

  it("re-opening an existing app restores and refocuses it instead of duplicating", () => {
    let state = reducer(undefined, openWindow(open("about")));
    state = reducer(state, openWindow(open("resume")));
    state = reducer(state, minimizeWindow("about"));
    state = reducer(state, openWindow(open("about")));

    expect(state.windows).toHaveLength(2);
    const about = state.windows.find((w) => w.id === "about")!;
    expect(about.minimized).toBe(false);
    expect(state.focusedId).toBe("about");
    expect(about.zIndex).toBeGreaterThan(
      state.windows.find((w) => w.id === "resume")!.zIndex
    );
  });

  it("focusing a window brings it above the previously focused one", () => {
    let state = reducer(undefined, openWindow(open("about")));
    state = reducer(state, openWindow(open("resume")));
    expect(state.focusedId).toBe("resume");

    state = reducer(state, focusWindow("about"));
    expect(state.focusedId).toBe("about");
    const about = state.windows.find((w) => w.id === "about")!;
    const resume = state.windows.find((w) => w.id === "resume")!;
    expect(about.zIndex).toBeGreaterThan(resume.zIndex);
  });

  it("minimizing the focused window refocuses the topmost visible window", () => {
    let state = reducer(undefined, openWindow(open("about")));
    state = reducer(state, openWindow(open("resume")));
    state = reducer(state, minimizeWindow("resume"));
    expect(state.focusedId).toBe("about");
  });

  it("minimizing the last visible window clears focus", () => {
    let state = reducer(undefined, openWindow(open("about")));
    state = reducer(state, minimizeWindow("about"));
    expect(state.focusedId).toBeNull();
  });

  it("closing the focused window removes it and refocuses what remains", () => {
    let state = reducer(undefined, openWindow(open("about")));
    state = reducer(state, openWindow(open("resume")));
    state = reducer(state, closeWindow("resume"));
    expect(state.windows).toHaveLength(1);
    expect(state.focusedId).toBe("about");
  });

  it("moves a window to new coordinates", () => {
    let state = reducer(undefined, openWindow(open("about")));
    state = reducer(state, moveWindow({ id: "about", x: 123, y: 45 }));
    expect(state.windows[0]).toMatchObject({ x: 123, y: 45 });
  });

  it("resizes a window and enforces minimum dimensions", () => {
    let state = reducer(undefined, openWindow(open("about")));
    state = reducer(
      state,
      resizeWindow({ id: "about", x: 10, y: 10, width: 100, height: 80 })
    );
    expect(state.windows[0].width).toBeGreaterThanOrEqual(280);
    expect(state.windows[0].height).toBeGreaterThanOrEqual(160);
  });

  it("does not resize a maximized window", () => {
    let state = reducer(undefined, openWindow(open("about")));
    state = reducer(state, toggleMaximize("about"));
    const before = { ...state.windows[0] };
    state = reducer(
      state,
      resizeWindow({ id: "about", x: 0, y: 0, width: 999, height: 999 })
    );
    expect(state.windows[0]).toMatchObject(before);
  });

  it("saves and restores bounds when toggling maximize", () => {
    let state = reducer(undefined, openWindow(open("about")));
    const original = { ...state.windows[0] };

    state = reducer(state, toggleMaximize("about"));
    expect(state.windows[0].maximized).toBe(true);
    expect(state.windows[0].restoreBounds).toMatchObject({
      x: original.x,
      y: original.y,
      width: original.width,
      height: original.height,
    });

    state = reducer(state, toggleMaximize("about"));
    expect(state.windows[0].maximized).toBe(false);
    expect(state.windows[0]).toMatchObject({
      x: original.x,
      y: original.y,
      width: original.width,
      height: original.height,
    });
  });

  it("ignores actions targeting unknown window ids", () => {
    const base: WindowsState = reducer(undefined, openWindow(open("about")));
    for (const action of [
      focusWindow("ghost"),
      moveWindow({ id: "ghost", x: 1, y: 1 }),
      resizeWindow({ id: "ghost", x: 0, y: 0, width: 400, height: 300 }),
      minimizeWindow("ghost"),
      toggleMaximize("ghost"),
    ]) {
      expect(reducer(base, action)).toEqual(base);
    }
  });
});
