import { resources } from "../../i18n/locales";

const AI_KEYS = [
  "title",
  "buddyName",
  "greeting",
  "limitedDemo",
  "bestMatchLabel",
  "placeholder",
  "send",
  "close",
  "thinking",
  "loadingModel",
  "error",
  "promptsHeading",
  "reopen",
  "soundOn",
  "soundOff",
  "liveRegion",
] as const;

describe("apps.ai i18n key parity", () => {
  it("has the same apps.ai keys in en, fr, and es", () => {
    for (const locale of ["en", "fr", "es"] as const) {
      const ai = resources[locale].translation.apps.ai;
      for (const key of AI_KEYS) {
        expect(ai[key]).toBeTruthy();
      }
    }
  });
});
