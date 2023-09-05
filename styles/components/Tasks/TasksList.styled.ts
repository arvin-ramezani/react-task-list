import styled from "styled-components";

import { TaskStatus } from "../../../utils/types/tasks.types";

export const StyledTasksList = styled.section<{ $status: TaskStatus }>`
  padding: 20px 20px 40px 20px;
  border-radius: 10px;
  margin: 2rem 0;
  position: relative;

  background-color: ${({ $status, theme }) => theme.colors[$status].background};
`;

export const TasksListHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const TasksListTitle = styled.h4<{ $status: TaskStatus }>`
  font-size: 0.95rem;
  font-weight: bold;

  color: ${({ $status, theme }) => theme.colors[$status].heading};
`;

export const TasksLength = styled.span<{ $status: TaskStatus }>`
  font-size: 0.75rem;

  color: ${({ theme, $status }) => theme.colors[$status].disabledText};
`;
