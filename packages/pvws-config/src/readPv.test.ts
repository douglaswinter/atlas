import { parseNumericPV } from "./readPv";

describe("Test Pv utils", () => {
  it("parse numerical value returns string", () => {
    expect(parseNumericPV(3.1415926)).toBe("3.14");
    expect(parseNumericPV(1.23, 0)).toBe("1");
  });
});
