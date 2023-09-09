import styled from "styled-components";

import { TaskStatus } from "../../../utils/types/tasks.types";
import { motion } from "framer-motion";

export const StyledAddTask = styled.div<{ $absolute: "true" | "false" }>`
  bottom: 10px;
  left: 16px;
  width: calc(100% - 40px);

  width: ${({ $absolute }) =>
    $absolute === "true" ? "calc(100% - 40px)" : "100%"};

  position: ${({ $absolute }) =>
    $absolute === "true" ? "absolute" : "static"};
`;

export const NewTaskBtn = styled(motion.button)<{
  $status: TaskStatus;
}>`
  background: transparent;
  border: none;
  cursor: pointer;
  align-items: center;
  font-size: 0.8rem;
  font-weight: 600;

  display: ${({ $status }) => ($status === TaskStatus.DONE ? "none" : "flex")};

  color: ${({ $status, theme }) => theme.colors[$status].cta};

  & > span {
    margin-right: 0.3rem;
    font-size: 20px;
    font-weight: 500;
  }
`;
