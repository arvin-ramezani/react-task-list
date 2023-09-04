import React, { FC } from "react";

import { TaskStatus } from "../../../../utils/types/tasks.types";
import { StyledDeleteTask } from "../../../../styles/components/Tasks/DeleteTaskConfirmModal.styled";

interface DeleteTaskConfirmModalProps {
  status: TaskStatus;
  onConfirm: () => void;
  onCancel: () => void;
  id?: string;
}

const DeleteTaskConfirmModal: FC<DeleteTaskConfirmModalProps> = ({
  status,
  onCancel,
  onConfirm,
  id,
}) => {
  return (
    <StyledDeleteTask $status={status}>
      <button onClick={onCancel} data-cy={`${status}-cancel-delete-item-${id}`}>
        Cancel
      </button>

      <button
        onClick={onConfirm}
        data-cy={`${status}-confirm-delete-item-${id}`}
      >
        Delete
      </button>
    </StyledDeleteTask>
  );
};

export default DeleteTaskConfirmModal;
