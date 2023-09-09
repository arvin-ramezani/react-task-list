import React from "react";
import { render, screen } from "@testing-library/react";

import TasksHeader from "../../../src/components/Tasks/TaskSectionHeader/TaskSectionHeader";

describe("<TasksHeader />", () => {
  it("Should show correct heading and subHeadings", () => {
    render(<TasksHeader />);

    const headingText = /task list/i;

    const firstSubHeadingText =
      /Break your life to simple tasks to get things done!/i;

    const secondSubHeadingText =
      /Does not matter how many tasks you done, It’s important to break to small tasks and be on progress./i;

    const heading = screen.getByRole("heading", { name: headingText });
    const firstSubHeading = screen.getByText(firstSubHeadingText);

    const secondSubHeading = screen.getByText(secondSubHeadingText);

    expect(heading).toBeInTheDocument();
    expect(firstSubHeading).toBeInTheDocument();
    expect(secondSubHeading).toBeInTheDocument();
  });
});
