import React, { FC, RefObject } from "react";

import {
  DropPlaceHolder,
  EditActionsBlock,
  EditBtn,
  StyledTaskItem,
  StyledTextArea,
  TaskItemWrapper,
} from "../../../../styles/components/Tasks/TaskItem.styled";
import DeleteTaskConfirmModal from "../DeleteTaskConfirmModal/DeleteTaskConfirmModal";
import CheckBox from "../../ui/CheckBox";
import { ITask, TaskStatus } from "../../../../utils/types/tasks.types";

export interface AddModeTaskItemProps {
  status: TaskStatus;
  onDeleteClick: () => void;
  onCancelDelete: () => void;
  onConfirmDelete: () => void;
  onToggleDoneTask: () => void;
  showDeleteModal: boolean;
  inputRef: RefObject<HTMLTextAreaElement>;
  onAddTask: () => void;
  onCancelAddTask: () => void;
  id: ITask["id"];
}

const AddModeTaskItem: FC<AddModeTaskItemProps> = ({
  status,
  onCancelDelete,
  onConfirmDelete,
  onToggleDoneTask,
  showDeleteModal,
  inputRef,
  onAddTask,
  onCancelAddTask,
  id,
}) => {
  return (
    <TaskItemWrapper data-cy={`${status}-add-task-${id}`}>
      <DropPlaceHolder $dragging={"false"} $status={status} />

      <StyledTaskItem $status={status} $dragging={"false"} $draggable="false">
        {showDeleteModal && (
          <DeleteTaskConfirmModal
            status={status}
            onCancel={onCancelDelete}
            onConfirm={onConfirmDelete}
            id={id.toString()}
          />
        )}

        <div>
          <CheckBox
            onChange={onToggleDoneTask}
            name={"addTask"}
            status={status}
            disabled={showDeleteModal}
            id={id.toString()}
          />
        </div>

        <StyledTextArea
          ref={inputRef}
          name={`newTask`}
          aria-label={"newTask"}
          $status={status}
        />

        <EditActionsBlock $status={status}>
          <button onClick={onCancelAddTask}>Cancel</button>

          <EditBtn onClick={onAddTask} $status={status}>
            Add
          </EditBtn>
        </EditActionsBlock>
      </StyledTaskItem>
    </TaskItemWrapper>
  );
};

export default AddModeTaskItem;
