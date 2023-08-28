import { styled } from "styled-components";

import { TaskStatus } from "../../utils/types/tasks.types";

export const StyledAddTask = styled.div<{ absolute: "true" | "false" }>`
  position: ${({ absolute }) => (absolute === "true" ? "absolute" : "static")};
  bottom: 10px;
  left: 16px;
`;

export const NewTaskBtn = styled.button<{ status: TaskStatus }>`
  background: transparent;
  border: none;
  cursor: pointer;
  align-items: center;
  font-size: 0.8rem;
  font-weight: 600;

  display: ${({ status }) => (status === TaskStatus.DONE ? "none" : "flex")};

  color: ${({ status, theme }) => theme.colors[status].cta};

  & > span {
    margin-right: 0.3rem;
    font-size: 20px;
    font-weight: 500;
  }
`;
