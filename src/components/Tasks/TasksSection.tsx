import React from "react";

import { StyledTasksSection } from "../../../styles/TasksSections.styled";
import TaskListHeader from "./TaskListHeader";
import { SectionContainer } from "../../../styles/common/SectionContainer";

function TasksSection() {
  return (
    <StyledTasksSection>
      <SectionContainer>
        <TaskListHeader />
      </SectionContainer>
    </StyledTasksSection>
  );
}

export default TasksSection;
