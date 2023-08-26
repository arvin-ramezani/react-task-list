import { styled } from "styled-components";

import { TaskStatus } from "../../utils/types/tasks.types";

export const StyledLabel = styled.label`
  display: block;
  position: relative;
  cursor: pointer;

  & input:checked ~ span:after {
    display: block;
  }
`;

export const StyledCheckBox = styled.input`
  visibility: hidden;
`;

export const CustomCheckBox = styled.span<{ status: TaskStatus }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 16px;
  height: 16px;

  border: 1px solid;
  border-color: ${({ theme, status }) => theme.colors[status].borderColor};

  &:after {
    content: "";
    display: none;
    position: absolute;
    left: 50%;
    top: 50%;
    width: 4px;
    height: 7px;
    border: solid black;
    border-width: 0 2px 2px 0;
    transform: translate(-50%, -60%) rotate(45deg);

    color: ${({ theme }) => theme.colors.done.cta};
  }
`;
