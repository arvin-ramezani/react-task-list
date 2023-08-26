import React from "react";
import { render, screen } from "@testing-library/react";

import TasksHeader from "./TaskListHeader";

describe("<TasksHeader />", () => {
  it("Should render correct heading and subHeadings", () => {
    render(<TasksHeader />);

    const heading = screen.getByRole("heading", { name: /task list/i });

    expect(heading).toBeInTheDocument();
  });
});
