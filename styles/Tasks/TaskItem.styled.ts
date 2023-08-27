import { styled } from "styled-components";

import { TaskStatus } from "../../utils/types/tasks.types";

export const StyledTaskItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  background-color: #fff;
  padding: 12px 10px;
  border-radius: 4px;
  position: relative;
`;

export const TaskItemCheckBox = styled.input<{ status: TaskStatus }>`
  width: 16px;
  height: 16px;
`;

export const StyledTextArea = styled.textarea<{ status: TaskStatus }>`
  font-size: 0.75rem;
  line-height: 130%;
  color: #000;
  width: 70%;
  resize: none;
  border-radius: 3px;
  padding: 0.2rem 0.3rem;

  border-color: ${({ theme, status }) => theme.colors[status].borderColor};

  &:focus {
    outline: none;
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  /* &::-webkit-scrollbar-track {
    background: orange;
  } */

  &::-webkit-scrollbar-thumb {
    border-radius: 20px;

    background-color: ${({ theme, status }) =>
      theme.colors[status].disabledText};
  }
`;

export const TaskItemText = styled.p<{ status: TaskStatus }>`
  font-size: 0.75rem;
  line-height: 130%;

  text-decoration: ${({ status }) =>
    status === TaskStatus.DONE ? "line-through" : "none"};
`;

export const EditActionsBlock = styled.div<{ status: TaskStatus }>`
  font-size: 12px;
  font-weight: 600;

  color: ${({ theme, status }) => theme.colors[status].disabledText};

  & button {
    display: block;
    padding: 0.3rem 0;
    cursor: pointer;
    display: block;
    padding: 0.3rem 0;
    cursor: pointer;
    background: transparent;
    border: none;
    font-size: inherit;
    font-weight: inherit;
    color: inherit;
  }
`;

export const EditBtn = styled.button<{ status: TaskStatus }>`
  color: ${({ status, theme }) => theme.colors[status].heading} !important;
`;

export const RemoveTask = styled.div<{
  status: TaskStatus;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;

  color: ${({ theme, status }) => theme.colors[status].borderColor};
`;
