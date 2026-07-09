declare module "*.css";
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.svg";
declare module "*.webp";
declare module "*.ico";
declare module "*.wasm";

declare module "jest-axe" {
  import type { AxeResults, RunOptions } from "axe-core";

  export function axe(
    container: Element | Document,
    options?: RunOptions
  ): Promise<AxeResults>;

  export function toHaveNoViolations(): unknown;
}

declare namespace jest {
  interface Matchers<R> {
    toHaveNoViolations(): R;
  }
}

interface ImportMeta {
  url: string;
}
