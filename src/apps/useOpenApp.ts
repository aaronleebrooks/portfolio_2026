import { useCallback } from "react";
import { openWindow } from "../features/windows/windowsSlice";
import { setHashForApp } from "../routing/useHashDeepLink";
import { useAppDispatch, useAppSelector } from "../store";
import { getApp, isExternalApp } from "./registry";

const CASCADE_STEP = 28;
const BASE_X = 48;
const BASE_Y = 48;

export function useOpenApp() {
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.windows.windows.length);

  return useCallback(
    (appId: string) => {
      const app = getApp(appId);
      if (!app) return;

      if (isExternalApp(app)) {
        window.open(app.externalUrl, "_blank", "noopener,noreferrer");
        return;
      }

      dispatch(
        openWindow({
          appId: app.id,
          x: BASE_X + count * CASCADE_STEP,
          y: BASE_Y + count * CASCADE_STEP,
          width: app.defaultWidth,
          height: app.defaultHeight,
        })
      );
      setHashForApp(appId);
    },
    [dispatch, count]
  );
}
