import { configureStore, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import windowsReducer from "./features/windows/windowsSlice";

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

export const makeStore = () =>
  configureStore({
    reducer: {
      settings: settingsSlice.reducer,
      windows: windowsReducer,
    },
  });

export const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
