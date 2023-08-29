import React from "react";
import { render, screen } from "@testing-library/react";

import TasksHeader from "../../src/components/Tasks/TaskListHeader/TaskListHeader";

describe("<TasksHeader />", () => {
  it("Should render correct heading and subHeadings", () => {
    render(<TasksHeader />);

    const heading = screen.getByRole("heading", { name: /task list/i });

    expect(heading).toBeInTheDocument();
  });
});
