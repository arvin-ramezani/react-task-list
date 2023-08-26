import { styled } from "styled-components";

import { TaskStatus } from "../utils/types/tasks.types";

export const StyledTaskItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  background-color: #fff;
  padding: 12px 10px;
  border-radius: 4px;
`;

export const TaskItemCheckBox = styled.input<{ status: TaskStatus }>`
  width: 16px;
  height: 16px;
`;

export const TaskItemText = styled.p<{ status: TaskStatus }>`
  font-size: 0.75rem;
  line-height: 130%;

  text-decoration: ${({ status }) =>
    status === TaskStatus.DONE ? "line-through" : "none"};
`;
