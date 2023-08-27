import { styled } from "styled-components";

import { TaskStatus } from "../../utils/types/tasks.types";

export const StyledTasksList = styled.div<{ status: TaskStatus }>`
  padding: 20px;
  border-radius: 10px;
  margin: 2rem 0;

  background-color: ${({ status, theme }) => theme.colors[status].background};
`;

export const TasksListHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const TasksListTitle = styled.h4<{ status: TaskStatus }>`
  font-size: 0.95rem;
  font-weight: bold;

  color: ${({ status, theme }) => theme.colors[status].heading};
`;

export const TasksLength = styled.span<{ status: TaskStatus }>`
  font-size: 0.75rem;

  color: ${({ theme, status }) => theme.colors[status].disabledText};
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

export const NewTaskIcon = styled.img``;

export const NewTaskText = styled.img``;
