import { configureStore, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

interface SettingsState {
  soundMuted: boolean;
}

const initialState: SettingsState = {
  soundMuted: true,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setMuted(state, action: PayloadAction<boolean>) {
      state.soundMuted = action.payload;
    },
    toggleMuted(state) {
      state.soundMuted = !state.soundMuted;
    },
  },
});

export const { setMuted, toggleMuted } = settingsSlice.actions;

export const store = configureStore({
  reducer: {
    settings: settingsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
