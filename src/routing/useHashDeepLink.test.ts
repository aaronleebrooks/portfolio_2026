import {
  parseAppIdFromHash,
  setHashForApp,
} from "./useHashDeepLink";

describe("hash deep links", () => {
  beforeEach(() => {
    window.history.replaceState(null, "", "/");
  });

  it("parses a valid app id from the hash", () => {
    expect(parseAppIdFromHash("#/about")).toBe("about");
    expect(parseAppIdFromHash("#/resume")).toBe("resume");
  });

  it("returns null for unknown or malformed hashes", () => {
    expect(parseAppIdFromHash("")).toBeNull();
    expect(parseAppIdFromHash("#/unknown")).toBeNull();
    expect(parseAppIdFromHash("#about")).toBeNull();
  });

  it("sets and clears the hash without a full navigation", () => {
    setHashForApp("about");
    expect(window.location.hash).toBe("#/about");

    setHashForApp(null);
    expect(window.location.hash).toBe("");
  });
});
