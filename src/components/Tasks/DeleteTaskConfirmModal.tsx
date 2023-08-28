import React, { FC } from "react";

import { TaskStatus } from "../../../utils/types/tasks.types";
import { StyledDeleteTask } from "../../../styles/Tasks/DeleteTaskConfirmModal.styled";

interface DeleteTaskConfirmModalProps {
  status: TaskStatus;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteTaskConfirmModal: FC<DeleteTaskConfirmModalProps> = ({
  status,
  onCancel,
  onConfirm,
}) => {
  return (
    <StyledDeleteTask $status={status}>
      <button onClick={onCancel}>Cancel</button>

      <button onClick={onConfirm}>Delete</button>
    </StyledDeleteTask>
  );
};

export default DeleteTaskConfirmModal;
