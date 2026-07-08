import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface WindowState {
  id: string;
  appId: string;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  minimized: boolean;
  maximized: boolean;
}

export interface WindowsState {
  windows: WindowState[];
  focusedId: string | null;
  nextZIndex: number;
}

const initialState: WindowsState = {
  windows: [],
  focusedId: null,
  nextZIndex: 1,
};

export interface OpenWindowPayload {
  appId: string;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * The topmost, non-minimized window becomes focused. Returns null when every
 * window is minimized or none exist.
 */
function topmostVisibleId(state: WindowsState): string | null {
  let best: WindowState | null = null;
  for (const w of state.windows) {
    if (w.minimized) continue;
    if (best === null || w.zIndex > best.zIndex) best = w;
  }
  return best ? best.id : null;
}

function bringToFront(state: WindowsState, win: WindowState): void {
  win.zIndex = state.nextZIndex;
  state.nextZIndex += 1;
  state.focusedId = win.id;
}

const windowsSlice = createSlice({
  name: "windows",
  initialState,
  reducers: {
    // Single-instance per app for now: reopening an app focuses/restores it.
    openWindow(state, action: PayloadAction<OpenWindowPayload>) {
      const { appId, title, x, y, width, height } = action.payload;
      const existing = state.windows.find((w) => w.id === appId);
      if (existing) {
        existing.minimized = false;
        bringToFront(state, existing);
        return;
      }
      const win: WindowState = {
        id: appId,
        appId,
        title,
        x,
        y,
        width,
        height,
        zIndex: state.nextZIndex,
        minimized: false,
        maximized: false,
      };
      state.nextZIndex += 1;
      state.windows.push(win);
      state.focusedId = win.id;
    },

    closeWindow(state, action: PayloadAction<string>) {
      state.windows = state.windows.filter((w) => w.id !== action.payload);
      if (state.focusedId === action.payload) {
        state.focusedId = topmostVisibleId(state);
      }
    },

    focusWindow(state, action: PayloadAction<string>) {
      const win = state.windows.find((w) => w.id === action.payload);
      if (!win) return;
      win.minimized = false;
      bringToFront(state, win);
    },

    moveWindow(
      state,
      action: PayloadAction<{ id: string; x: number; y: number }>
    ) {
      const win = state.windows.find((w) => w.id === action.payload.id);
      if (!win) return;
      win.x = action.payload.x;
      win.y = action.payload.y;
    },

    minimizeWindow(state, action: PayloadAction<string>) {
      const win = state.windows.find((w) => w.id === action.payload);
      if (!win) return;
      win.minimized = true;
      if (state.focusedId === win.id) {
        state.focusedId = topmostVisibleId(state);
      }
    },

    toggleMaximize(state, action: PayloadAction<string>) {
      const win = state.windows.find((w) => w.id === action.payload);
      if (!win) return;
      win.maximized = !win.maximized;
      win.minimized = false;
      bringToFront(state, win);
    },
  },
});

export const {
  openWindow,
  closeWindow,
  focusWindow,
  moveWindow,
  minimizeWindow,
  toggleMaximize,
} = windowsSlice.actions;

export default windowsSlice.reducer;
