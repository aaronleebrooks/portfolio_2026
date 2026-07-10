import { useEffect, useState } from "react";

import type { NavItemId } from "@/data/profile";

/**
 * Highlights the nav section currently in view via IntersectionObserver.
 */
export function useScrollSpy(sectionIds: readonly NavItemId[], offset = 120) {
  const [activeId, setActiveId] = useState<NavItemId>(sectionIds[0]);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id as NavItemId);
          return;
        }

        // Fallback: pick the last section whose top is above the offset line.
        let current: NavItemId = sectionIds[0];
        for (const el of elements) {
          if (el.getBoundingClientRect().top - offset <= 0) {
            current = el.id as NavItemId;
          }
        }
        setActiveId(current);
      },
      {
        root: null,
        rootMargin: `-${offset}px 0px -55% 0px`,
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    for (const el of elements) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, [sectionIds, offset]);

  return activeId;
}
