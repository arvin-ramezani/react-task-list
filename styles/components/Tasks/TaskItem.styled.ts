import { styled } from "styled-components";

import { TaskStatus } from "../../../utils/types/tasks.types";

export const TaskItemWrapper = styled.div.attrs<{
  $dragging: "true" | "false";
}>((props) => ({
  $dragging: props.$dragging,
}))`
  position: relative;
  background-color: transparent;
`;

export const StyledTaskItem = styled.div.attrs<{
  $dragging?: "true" | "false";
  $status: TaskStatus;
  $draggable: "true" | "false";
}>((props) => ({
  $dragging: props.$dragging,
  $status: props.$status,
  $draggable: props.$draggable,
}))`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  background-color: #fff;
  padding: 12px 10px;
  border-radius: 4px;
  position: relative;
  transition: transform 0.3s;

  cursor: ${({ $draggable }) => ($draggable === "true" ? "grab" : "default")};
  rotate: ${({ $dragging }) => ($dragging === "true" ? "-3deg" : "0")};

  border: 1px solid ${({ theme, $status }) => theme.colors[$status].borderColor};
`;

export const DragBackdrop = styled.div.attrs<{
  $status: TaskStatus;
  $dragging?: "true" | "false";
}>((props) => ({
  $status: props.$status,
  $dragging: props.$dragging,
}))`
  border-radius: 4px;
  background-color: #fff;
  height: 30px;
  position: absolute;
  width: 86%;
  left: 0;
  top: 0;
  width: 100%;
  transform: translateY(-12px);

  display: ${({ $dragging }) => ($dragging === "true" ? "block" : "none")};

  border: 1px dashed
    ${({ theme, $status }) => theme.colors[$status].borderColor};
`;

export const StyledTextArea = styled.textarea.attrs<{
  $status: TaskStatus;
}>((props) => ({
  $status: props.$status,
}))`
  font-size: 0.75rem;
  line-height: 130%;
  color: #000;
  width: 70%;
  resize: none;
  border-radius: 3px;
  padding: 0.2rem 0.3rem;

  border-color: ${({ theme, $status }) => theme.colors[$status].borderColor};

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

    background-color: ${({ theme, $status }) =>
      theme.colors[$status].disabledText};
  }
`;

export const TaskItemText = styled.p.attrs<{
  $status: TaskStatus;
}>((props) => ({
  $status: props.$status,
}))`
  font-size: 0.75rem;
  line-height: 130%;
  cursor: text;

  text-decoration: ${({ $status }) =>
    $status === TaskStatus.DONE ? "line-through" : "none"};
`;

export const EditActionsBlock = styled.div.attrs<{
  $status: TaskStatus;
}>((props) => ({
  $status: props.$status,
}))`
  font-size: 12px;
  font-weight: 600;

  color: ${({ theme, $status }) => theme.colors[$status].disabledText};

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

export const EditBtn = styled.button.attrs<{
  $status: TaskStatus;
}>((props) => ({
  $status: props.$status,
}))`
  color: ${({ $status, theme }) => theme.colors[$status].heading} !important;
`;

export const RemoveTask = styled.div.attrs<{
  $status: TaskStatus;
}>((props) => ({
  $status: props.$status,
}))`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  width: 24px;
  height: 24px;

  color: ${({ theme, $status }) => theme.colors[$status].borderColor};
`;
