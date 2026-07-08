import { useCallback, useRef } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";

interface UseDragOptions {
  x: number;
  y: number;
  disabled?: boolean;
  onMove: (x: number, y: number) => void;
}

interface DragOrigin {
  pointerX: number;
  pointerY: number;
  windowX: number;
  windowY: number;
}

/**
 * Pointer-events drag. Returns an `onPointerDown` handler to attach to a drag
 * handle (e.g. a title bar). Keeps at least a sliver of the window on screen so
 * it can't be dragged fully out of reach.
 */
export function useDrag({ x, y, disabled, onMove }: UseDragOptions) {
  const origin = useRef<DragOrigin | null>(null);

  const onPointerMove = useCallback(
    (event: PointerEvent) => {
      const start = origin.current;
      if (!start) return;
      const nextX = start.windowX + (event.clientX - start.pointerX);
      const nextY = start.windowY + (event.clientY - start.pointerY);
      const clampedX = Math.min(
        Math.max(nextX, -1),
        window.innerWidth - 40
      );
      const clampedY = Math.min(Math.max(nextY, 0), window.innerHeight - 40);
      onMove(clampedX, clampedY);
    },
    [onMove]
  );

  const onPointerUp = useCallback(() => {
    origin.current = null;
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
  }, [onPointerMove]);

  const onPointerDown = useCallback(
    (event: ReactPointerEvent) => {
      if (disabled) return;
      // Ignore clicks on interactive controls inside the handle.
      if ((event.target as HTMLElement).closest("button")) return;
      origin.current = {
        pointerX: event.clientX,
        pointerY: event.clientY,
        windowX: x,
        windowY: y,
      };
      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp);
    },
    [disabled, x, y, onPointerMove, onPointerUp]
  );

  return { onPointerDown };
}
