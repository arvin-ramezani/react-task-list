import { validateTaskText } from "../../utils/helpers/validate";

describe("validate.ts", () => {
  it("should return true if valid text provided", () => {
    const text = "Task Text 1.";

    const isValid = validateTaskText(text);

    expect(isValid).toBe(true);
  });

  it("should return false if empty string provided", () => {
    const invalidTextList = [`      `, "", undefined];

    invalidTextList.forEach((inText) => {
      const isValid = validateTaskText(inText);

      expect(isValid).toBe(false);
    });
  });
});
