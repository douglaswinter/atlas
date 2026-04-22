import { parseNumericPV } from "./readPv";

describe("Test Pv utils", () => {
  it("parse numerical value returns string", () => {
    expect(parseNumericPV(3.1415926)).toEqual("3.14"); // toBe("3.14");
    expect(parseNumericPV("1.2", 1, 10)).toEqual("12.0");
    expect(parseNumericPV("not connected")).toEqual("not connected");
    expect(parseNumericPV("undefined")).toEqual("undefined");
  });
});
