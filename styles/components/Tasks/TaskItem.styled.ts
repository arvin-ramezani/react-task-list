import styled from "styled-components";
import { motion } from "framer-motion";

import { TaskStatus } from "../../../utils/types/tasks.types";

export const StyledMotionTaskItem = styled(motion.article)`
  position: relative;
  background-color: transparent;
`;

export const TaskItemWrapper = styled.article`
  position: relative;
  background-color: transparent;
`;

export const StyledTaskItem = styled.div<{
  $status: TaskStatus;
  $draggable: "true" | "false";
  $dragging: "true" | "false";
}>`
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

export const DropPlaceHolder = styled.div<{
  $status: TaskStatus;
  $dragging: "true" | "false";
}>`
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

export const StyledTextArea = styled(motion.textarea)<{ $status: TaskStatus }>`
  font-size: 0.75rem;
  line-height: 130%;
  color: #000;
  resize: none;
  border-radius: 3px;
  padding: 0.2rem 0.3rem;
  position: absolute;
  height: 80%;
  width: 75%;
  margin: 0 -0.6rem;
  border-left: none;
  border-right: none;
  padding-bottom: 0.2rem;

  border-color: ${({ theme, $status }) => theme.colors[$status].borderColor};

  &:focus {
    outline: none;
  }

  &::-webkit-scrollbar {
    width: 2px;
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

export const TaskItemText = styled(motion.p)<{ $status: TaskStatus }>`
  font-size: 0.75rem;
  line-height: 130%;
  cursor: pointer;

  text-decoration: ${({ $status }) =>
    $status === TaskStatus.DONE ? "line-through" : "none"};
`;

export const EditActionsBlock = styled.div<{ $status: TaskStatus }>`
  font-size: 12px;
  font-weight: 600;
  margin-left: auto;

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

export const EditBtn = styled(motion.button)<{ $status: TaskStatus }>`
  color: ${({ $status, theme }) => theme.colors[$status].heading} !important;
`;

export const RemoveTask = styled(motion.div)<{ $status: TaskStatus }>`
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
  border-radius: 50%;
  background: transparent;
  padding: 0.5rem;
  padding-right: 0;

  color: ${({ theme, $status }) => theme.colors[$status].borderColor};
`;
