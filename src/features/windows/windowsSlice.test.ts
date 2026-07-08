import reducer, {
  closeWindow,
  focusWindow,
  minimizeWindow,
  moveWindow,
  openWindow,
  toggleMaximize,
} from "./windowsSlice";
import type { OpenWindowPayload, WindowsState } from "./windowsSlice";

function open(appId: string): OpenWindowPayload {
  return { appId, title: appId, x: 10, y: 10, width: 300, height: 200 };
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

  it("toggles maximize on and off", () => {
    let state = reducer(undefined, openWindow(open("about")));
    state = reducer(state, toggleMaximize("about"));
    expect(state.windows[0].maximized).toBe(true);
    state = reducer(state, toggleMaximize("about"));
    expect(state.windows[0].maximized).toBe(false);
  });

  it("ignores actions targeting unknown window ids", () => {
    const base: WindowsState = reducer(undefined, openWindow(open("about")));
    for (const action of [
      focusWindow("ghost"),
      moveWindow({ id: "ghost", x: 1, y: 1 }),
      minimizeWindow("ghost"),
      toggleMaximize("ghost"),
    ]) {
      expect(reducer(base, action)).toEqual(base);
    }
  });
});
