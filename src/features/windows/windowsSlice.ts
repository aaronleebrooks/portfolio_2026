import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  MIN_WINDOW_HEIGHT,
  MIN_WINDOW_WIDTH,
} from "./windowConstants";

export interface WindowBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface WindowState {
  id: string;
  appId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  minimized: boolean;
  maximized: boolean;
  restoreBounds: WindowBounds | null;
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
  x: number;
  y: number;
  width: number;
  height: number;
}

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
    openWindow(state, action: PayloadAction<OpenWindowPayload>) {
      const { appId, x, y, width, height } = action.payload;
      const existing = state.windows.find((w) => w.id === appId);
      if (existing) {
        existing.minimized = false;
        bringToFront(state, existing);
        return;
      }
      const win: WindowState = {
        id: appId,
        appId,
        x,
        y,
        width,
        height,
        zIndex: state.nextZIndex,
        minimized: false,
        maximized: false,
        restoreBounds: null,
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
      if (!win || win.maximized) return;
      win.x = action.payload.x;
      win.y = action.payload.y;
    },

    resizeWindow(state, action: PayloadAction<WindowBounds & { id: string }>) {
      const win = state.windows.find((w) => w.id === action.payload.id);
      if (!win || win.maximized) return;
      const { id: _id, x, y, width, height } = action.payload;
      win.x = x;
      win.y = y;
      win.width = Math.max(MIN_WINDOW_WIDTH, width);
      win.height = Math.max(MIN_WINDOW_HEIGHT, height);
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

      if (win.maximized) {
        win.maximized = false;
        if (win.restoreBounds) {
          win.x = win.restoreBounds.x;
          win.y = win.restoreBounds.y;
          win.width = win.restoreBounds.width;
          win.height = win.restoreBounds.height;
          win.restoreBounds = null;
        }
      } else {
        win.restoreBounds = {
          x: win.x,
          y: win.y,
          width: win.width,
          height: win.height,
        };
        win.maximized = true;
      }

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
  resizeWindow,
  minimizeWindow,
  toggleMaximize,
} = windowsSlice.actions;

export default windowsSlice.reducer;
