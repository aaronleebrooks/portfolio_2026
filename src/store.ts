import { configureStore, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import windowsReducer from "./features/windows/windowsSlice";
import {
  readStoredLocale,
  readStoredMuted,
  type SupportedLocale,
} from "./i18n/locales";

interface SettingsState {
  soundMuted: boolean;
  language: SupportedLocale;
}

const settingsSlice = createSlice({
  name: "settings",
  initialState: (): SettingsState => ({
    soundMuted: readStoredMuted(),
    language: readStoredLocale(),
  }),
  reducers: {
    setMuted(state, action: PayloadAction<boolean>) {
      state.soundMuted = action.payload;
      try {
        localStorage.setItem("soundMuted", String(action.payload));
      } catch {
        // ignore
      }
    },
    toggleMuted(state) {
      state.soundMuted = !state.soundMuted;
      try {
        localStorage.setItem("soundMuted", String(state.soundMuted));
      } catch {
        // ignore
      }
    },
    setLanguage(state, action: PayloadAction<SupportedLocale>) {
      state.language = action.payload;
      try {
        localStorage.setItem("locale", action.payload);
      } catch {
        // ignore
      }
    },
  },
});

export const { setMuted, toggleMuted, setLanguage } = settingsSlice.actions;

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
