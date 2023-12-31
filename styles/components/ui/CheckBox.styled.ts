import styled from "styled-components";
import { motion } from "framer-motion";

import { TaskStatus } from "../../../utils/types/tasks.types";

export const StyledLabel = styled.label<{
  disabled?: boolean;
}>`
  display: block;
  position: relative;
  cursor: pointer;

  opacity: ${({ disabled }) => (disabled === true ? 0.3 : 1)};
`;

export const StyledCheckBox = styled.input`
  visibility: hidden;
`;

export const CustomCheckBox = styled(motion.span)<{
  $status: TaskStatus;
  checked: boolean;
}>`
  position: absolute;
  top: 0;
  left: 0;
  width: 16px;
  height: 16px;
  cursor: pointer;

  border: 1px solid;
  border-color: ${({ theme, $status }) => theme.colors[$status].borderColor};
`;

export const MarkIcon = styled(motion.span)<{
  $status: TaskStatus;
  checked: boolean;
}>`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 6px;
  height: 9px;
  border: solid black;
  border-width: 0 2px 2px 0;
  transform: translate(-50%, -60%) rotate(45deg);

  color: ${({ theme }) => theme.colors.done.cta};

  border-color: ${({ theme, $status }) => theme.colors[$status].cta};
`;
