import { splitTaskTextToMultiLine } from "../../utils/helpers/splitMultilineTaskText";

describe("splitMultilineTaskText()", () => {
  it("should return an array of three strings which each array item represents one task text, splitted by line breaks", () => {
    const text = `Task Item 1.
    Task Item 2.
    Task Item 3.`;

    const textList = splitTaskTextToMultiLine(text);

    expect(textList).toHaveLength(3);
    expect(textList[0].trim()).toBe("Task Item 1.");
    expect(textList[1].trim()).toBe("Task Item 2.");
    expect(textList[2].trim()).toBe("Task Item 3.");
  });
});
