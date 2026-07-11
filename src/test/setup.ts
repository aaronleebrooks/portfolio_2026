import "@testing-library/jest-dom/vitest";

import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";

import "./reveal.css";

type IntersectionObserverCallback = (
  entries: IntersectionObserverEntry[],
  observer: IntersectionObserver,
) => void;

type MockObserverInstance = {
  callback: IntersectionObserverCallback;
  elements: Set<Element>;
  disconnect: () => void;
  observe: (element: Element) => void;
  unobserve: (element: Element) => void;
  takeRecords: () => IntersectionObserverEntry[];
};

const observers = new Set<MockObserverInstance>();

function createMockObserver(
  callback: IntersectionObserverCallback,
): MockObserverInstance {
  const elements = new Set<Element>();

  const instance: MockObserverInstance = {
    callback,
    elements,
    observe: (element: Element) => {
      elements.add(element);
    },
    unobserve: (element: Element) => {
      elements.delete(element);
    },
    disconnect: () => {
      elements.clear();
      observers.delete(instance);
    },
    takeRecords: () => [],
  };

  observers.add(instance);
  return instance;
}

beforeEach(() => {
  observers.clear();

  class MockIntersectionObserver implements IntersectionObserver {
    readonly root: Element | Document | null = null;
    readonly rootMargin = "";
    readonly thresholds: ReadonlyArray<number> = [];
    private readonly instance: MockObserverInstance;

    constructor(callback: IntersectionObserverCallback) {
      this.instance = createMockObserver(callback);
    }

    observe(element: Element) {
      this.instance.observe(element);
    }

    unobserve(element: Element) {
      this.instance.unobserve(element);
    }

    disconnect() {
      this.instance.disconnect();
    }

    takeRecords(): IntersectionObserverEntry[] {
      return this.instance.takeRecords();
    }
  }

  vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
});

afterEach(() => {
  cleanup();
  observers.clear();
  vi.unstubAllGlobals();
});

/**
 * Fire IntersectionObserver callbacks for all observed elements.
 * Used by Reveal / useScrollSpy tests — not a DOM query helper.
 */
export function triggerIntersection(
  overrides: Partial<IntersectionObserverEntry> = {},
) {
  for (const observer of [...observers]) {
    const entries = [...observer.elements].map(
      (target) =>
        ({
          target,
          isIntersecting: true,
          intersectionRatio: 1,
          boundingClientRect: target.getBoundingClientRect(),
          intersectionRect: target.getBoundingClientRect(),
          rootBounds: null,
          time: Date.now(),
          ...overrides,
        }) as IntersectionObserverEntry,
    );

    if (entries.length > 0) {
      observer.callback(entries, observer as unknown as IntersectionObserver);
    }
  }
}

export function getObserverCount() {
  return observers.size;
}
