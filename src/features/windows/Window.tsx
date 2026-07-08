import type { ReactNode } from "react";
import {
  closeWindow,
  focusWindow,
  minimizeWindow,
  moveWindow,
  toggleMaximize,
} from "./windowsSlice";
import type { WindowState } from "./windowsSlice";
import { useDrag } from "./useDrag";
import { useAppDispatch } from "../../store";

interface WindowProps {
  window: WindowState;
  focused: boolean;
  children: ReactNode;
}

export function Window({ window: win, focused, children }: WindowProps) {
  const dispatch = useAppDispatch();
  const { onPointerDown, dragging } = useDrag({
    x: win.x,
    y: win.y,
    disabled: win.maximized,
    onMove: (x, y) => dispatch(moveWindow({ id: win.id, x, y })),
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
          {win.title}
        </div>
        <div className="title-bar-controls">
          <button
            aria-label="Minimize"
            onClick={() => dispatch(minimizeWindow(win.id))}
          />
          <button
            aria-label={win.maximized ? "Restore" : "Maximize"}
            onClick={() => dispatch(toggleMaximize(win.id))}
          />
          <button
            aria-label="Close"
            onClick={() => dispatch(closeWindow(win.id))}
          />
        </div>
      </div>
      <div className="window-body flex-1 overflow-auto">{children}</div>
    </div>
  );
}
