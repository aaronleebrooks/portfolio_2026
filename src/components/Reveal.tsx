import { useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current as HTMLDivElement;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(el);

    // opacity: 0 hides content but leaves it in the tab order, so a keyboard
    // user tabbing ahead of their scroll lands focus on something invisible.
    // Revealing on focusin closes that without touching the scroll behaviour.
    const reveal = () => {
      setVisible(true);
      observer.disconnect();
    };
    el.addEventListener("focusin", reveal);

    return () => {
      el.removeEventListener("focusin", reveal);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", visible && "reveal-visible", className)}
      style={delay > 0 ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
