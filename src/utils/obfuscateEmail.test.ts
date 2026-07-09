import { getEmailAddress } from "./obfuscateEmail";

describe("getEmailAddress", () => {
  it("returns the expected contact email", () => {
    expect(getEmailAddress()).toBe("TheAaronLeeBrooks@gmail.com");
  });
});
