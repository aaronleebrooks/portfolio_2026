import type { PointerEvent, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useAppLabels } from "../../apps/useAppLabels";
import {
  parseAppIdFromHash,
  setHashForApp,
} from "../../routing/useHashDeepLink";
import {
  closeWindow,
  focusWindow,
  minimizeWindow,
  moveWindow,
  resizeWindow,
  toggleMaximize,
} from "./windowsSlice";
import type { WindowState } from "./windowsSlice";
import { useDrag } from "./useDrag";
import { useResize, type ResizeEdge } from "./useResize";
import { useAppDispatch } from "../../store";

interface WindowProps {
  window: WindowState;
  focused: boolean;
  children: ReactNode;
}

function ResizeHandle({
  edge,
  ariaLabel,
  cursor,
  className,
  onPointerDown,
}: {
  edge: ResizeEdge;
  ariaLabel: string;
  cursor: string;
  className: string;
  onPointerDown: (event: PointerEvent) => void;
}) {
  return (
    <div
      role="separator"
      aria-label={ariaLabel}
      aria-orientation={edge === "e" ? "vertical" : "horizontal"}
      className={className}
      style={{ cursor }}
      onPointerDown={onPointerDown}
    />
  );
}

export function Window({ window: win, focused, children }: WindowProps) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { title } = useAppLabels(win.appId);

  const onMove = (x: number, y: number) =>
    dispatch(moveWindow({ id: win.id, x, y }));
  const onResize = (x: number, y: number, width: number, height: number) =>
    dispatch(resizeWindow({ id: win.id, x, y, width, height }));

  const { onPointerDown, dragging } = useDrag({
    x: win.x,
    y: win.y,
    disabled: win.maximized,
    onMove,
  });

  const resizeEast = useResize({
    x: win.x,
    y: win.y,
    width: win.width,
    height: win.height,
    disabled: win.maximized,
    edge: "e",
    onResize,
  });
  const resizeSouth = useResize({
    x: win.x,
    y: win.y,
    width: win.width,
    height: win.height,
    disabled: win.maximized,
    edge: "s",
    onResize,
  });
  const resizeSouthEast = useResize({
    x: win.x,
    y: win.y,
    width: win.width,
    height: win.height,
    disabled: win.maximized,
    edge: "se",
    onResize,
  });

  if (win.minimized) return null;

  const positioned = win.maximized
    ? { inset: 0 as const, width: "auto", height: "auto" }
    : { left: win.x, top: win.y, width: win.width, height: win.height };

  const titleId = `window-title-${win.id}`;

  return (
    <div
      role="dialog"
      aria-labelledby={titleId}
      aria-modal={false}
      className="window absolute flex flex-col"
      style={{ position: "absolute", zIndex: win.zIndex, ...positioned }}
      onPointerDownCapture={() => {
        if (!focused) dispatch(focusWindow(win.id));
      }}
    >
      <div
        className="title-bar"
        style={{
          cursor: win.maximized ? "default" : dragging ? "grabbing" : "grab",
        }}
        onPointerDown={onPointerDown}
        onDoubleClick={() => dispatch(toggleMaximize(win.id))}
      >
        <div className="title-bar-text" id={titleId}>
          {title}
        </div>
        <div className="title-bar-controls">
          <button
            aria-label={t("window.minimize")}
            onClick={() => dispatch(minimizeWindow(win.id))}
          />
          <button
            aria-label={
              win.maximized ? t("window.restore") : t("window.maximize")
            }
            onClick={() => dispatch(toggleMaximize(win.id))}
          />
          <button
            aria-label={t("window.close")}
            onClick={() => {
              dispatch(closeWindow(win.id));
              if (parseAppIdFromHash(window.location.hash) === win.appId) {
                setHashForApp(null);
              }
            }}
          />
        </div>
      </div>
      <div className="window-body relative flex-1 overflow-auto">{children}</div>
      {!win.maximized && (
        <>
          <ResizeHandle
            edge="e"
            ariaLabel={t("window.resizeRight")}
            cursor={resizeEast.cursor}
            className="absolute bottom-2 right-0 top-8 w-2"
            onPointerDown={resizeEast.onPointerDown}
          />
          <ResizeHandle
            edge="s"
            ariaLabel={t("window.resizeBottom")}
            cursor={resizeSouth.cursor}
            className="absolute bottom-0 left-2 right-2 h-2"
            onPointerDown={resizeSouth.onPointerDown}
          />
          <ResizeHandle
            edge="se"
            ariaLabel={t("window.resizeCorner")}
            cursor={resizeSouthEast.cursor}
            className="absolute bottom-0 right-0 h-4 w-4"
            onPointerDown={resizeSouthEast.onPointerDown}
          />
        </>
      )}
    </div>
  );
}
