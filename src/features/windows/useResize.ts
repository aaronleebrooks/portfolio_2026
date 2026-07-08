import { useCallback, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import {
  MIN_WINDOW_HEIGHT,
  MIN_WINDOW_WIDTH,
} from "./windowConstants";

export type ResizeEdge = "e" | "s" | "se";

interface UseResizeOptions {
  x: number;
  y: number;
  width: number;
  height: number;
  disabled?: boolean;
  edge: ResizeEdge;
  onResize: (x: number, y: number, width: number, height: number) => void;
}

interface ResizeOrigin {
  pointerX: number;
  pointerY: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

const CURSOR_BY_EDGE: Record<ResizeEdge, string> = {
  e: "ew-resize",
  s: "ns-resize",
  se: "nwse-resize",
};

export function useResize({
  x,
  y,
  width,
  height,
  disabled,
  edge,
  onResize,
}: UseResizeOptions) {
  const origin = useRef<ResizeOrigin | null>(null);
  const [resizing, setResizing] = useState(false);

  const onPointerMove = useCallback(
    (event: PointerEvent) => {
      const start = origin.current;
      if (!start) return;

      const dx = event.clientX - start.pointerX;
      const dy = event.clientY - start.pointerY;

      let nextX = start.x;
      let nextY = start.y;
      let nextWidth = start.width;
      let nextHeight = start.height;

      if (edge === "e" || edge === "se") {
        nextWidth = Math.max(MIN_WINDOW_WIDTH, start.width + dx);
      }
      if (edge === "s" || edge === "se") {
        nextHeight = Math.max(MIN_WINDOW_HEIGHT, start.height + dy);
      }

      const maxWidth = window.innerWidth - nextX - 8;
      const maxHeight = window.innerHeight - nextY - 40;
      nextWidth = Math.min(nextWidth, maxWidth);
      nextHeight = Math.min(nextHeight, maxHeight);

      onResize(nextX, nextY, nextWidth, nextHeight);
    },
    [edge, onResize]
  );

  const onPointerUp = useCallback(() => {
    origin.current = null;
    setResizing(false);
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
  }, [onPointerMove]);

  const onPointerDown = useCallback(
    (event: ReactPointerEvent) => {
      if (disabled) return;
      event.stopPropagation();
      event.preventDefault();
      origin.current = {
        pointerX: event.clientX,
        pointerY: event.clientY,
        x,
        y,
        width,
        height,
      };
      setResizing(true);
      document.body.style.cursor = CURSOR_BY_EDGE[edge];
      document.body.style.userSelect = "none";
      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp);
    },
    [disabled, x, y, width, height, edge, onPointerMove, onPointerUp]
  );

  return { onPointerDown, resizing, cursor: CURSOR_BY_EDGE[edge] };
}
