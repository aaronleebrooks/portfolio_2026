/** Resolves a static file copied from `public/` to the deployed site root. */
export function publicAssetUrl(filename: string): string {
  return new URL(filename, window.location.href).href;
}
