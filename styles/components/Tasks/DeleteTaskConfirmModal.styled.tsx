import styled from "styled-components";

import { TaskStatus } from "../../../utils/types/tasks.types";

export const StyledDeleteTask = styled.div<{ $status: TaskStatus }>`
  position: absolute;
  left: 0;
  width: 100%;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  z-index: 1;
  font-size: 0.75rem;
  font-weight: 600;
  background-color: #fff;

  color: ${({ theme, $status }) => theme.colors[$status].cta};

  & button {
    cursor: pointer;
    background: transparent;
    border: none;
    font-size: inherit;
    font-weight: inherit;
    color: inherit;
    padding: 0.5rem 1rem;
  }

  & button:first-child {
    color: ${({ theme, $status }) => theme.colors[$status].disabledText};
  }
`;
