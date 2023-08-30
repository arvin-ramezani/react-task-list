import React, { useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";

import { ITask } from "../../../../utils/types/tasks.types";
import {
  EditActionsBlock,
  EditBtn,
  RemoveTask,
  StyledTaskItem,
  StyledTextArea,
  TaskItemText,
  DropPlaceHolder,
  TaskItemWrapper,
} from "../../../../styles/components/Tasks/TaskItem.styled";
import CheckBox from "../../ui/CheckBox";
import DeleteTaskConfirmModal from "../DeleteTaskConfirmModal/DeleteTaskConfirmModal";
import TaskItemLogic from "./TaskItemLogic";

interface TaskItemProps extends ITask {
  index?: number;
}

type TaskItemPropsTypes = TaskItemProps & {
  addMode: boolean;
  onExitAddMode?: () => void;
};

function TaskItem({
  text,
  status,
  id,
  addMode,
  onExitAddMode,
  index,
}: TaskItemPropsTypes) {
  const {
    isHovering,
    isEditing,
    showDeleteModal,
    inputRef,
    delayRef,
    onConfirmDelete,
    onCancelDelete,
    onDeleteClick,
    onAdd,
    onEdit,
    onCancelEdit,
    onEditInputChange,
    onEditTaskClick,
    startHovering,
    endHovering,
    onToggleDoneTask,
    clearSetTimeout,
  } = TaskItemLogic({ id, text, status, addMode, onExitAddMode });

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.value = text;
      inputRef.current.focus({});
    }
  }, [isEditing]);

  return (
    <>
      {addMode ? (
        <TaskItemWrapper key={"addTaskItem"} $dragging={"false"}>
          <DropPlaceHolder $dragging={"false"} $status={status} />

          <StyledTaskItem
            $status={status}
            $dragging={"false"}
            $draggable="false"
            onMouseEnter={startHovering}
            onMouseLeave={endHovering}
          >
            {showDeleteModal && (
              <DeleteTaskConfirmModal
                status={status}
                onCancel={onCancelDelete}
                onConfirm={onConfirmDelete}
              />
            )}

            <div>
              <CheckBox
                onChange={onToggleDoneTask}
                name={`tasksItem${id}`}
                status={status}
                disabled={isEditing || showDeleteModal}
              />
            </div>

            {isEditing ? (
              <StyledTextArea
                ref={inputRef}
                onChange={onEditInputChange}
                name={`editTask${id}`}
                $status={status}
              />
            ) : (
              <TaskItemText onClick={onEditTaskClick} $status={status}>
                {text}
              </TaskItemText>
            )}

            {isEditing && (
              <EditActionsBlock $status={status}>
                <button onClick={onCancelEdit}>Cancel</button>
                <EditBtn onClick={addMode ? onAdd : onEdit} $status={status}>
                  {addMode ? "Add" : "Edit"}
                </EditBtn>
              </EditActionsBlock>
            )}

            {!isEditing && isHovering && (
              <RemoveTask onClick={onDeleteClick} $status={status}>
                <span>🗙</span>
              </RemoveTask>
            )}
          </StyledTaskItem>
        </TaskItemWrapper>
      ) : (
        <Draggable
          shouldRespectForcePress
          index={index!}
          draggableId={id.toString()}
        >
          {(provided, snapshot) => {
            if (snapshot.isDragging && delayRef.current) {
              clearSetTimeout();
            }
            return (
              <TaskItemWrapper
                key={"showTaskItem"}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                $dragging={snapshot.isDragging ? "true" : "false"}
              >
                <DropPlaceHolder
                  $dragging={snapshot.isDragging ? "true" : "false"}
                  $status={status}
                />

                <StyledTaskItem
                  $status={status}
                  $dragging={snapshot.isDragging ? "true" : "false"}
                  $draggable="true"
                  onMouseEnter={startHovering}
                  onMouseLeave={endHovering}
                >
                  {showDeleteModal && (
                    <DeleteTaskConfirmModal
                      status={status}
                      onCancel={onCancelDelete}
                      onConfirm={onConfirmDelete}
                    />
                  )}

                  <div>
                    <CheckBox
                      onChange={onToggleDoneTask}
                      name={`tasksItem${id}`}
                      status={status}
                      disabled={isEditing || showDeleteModal}
                    />
                  </div>

                  {isEditing ? (
                    <StyledTextArea
                      ref={inputRef}
                      onChange={onEditInputChange}
                      name={`editTask${id}`}
                      $status={status}
                    />
                  ) : (
                    <TaskItemText onClick={onEditTaskClick} $status={status}>
                      {text}
                    </TaskItemText>
                  )}

                  {isEditing && (
                    <EditActionsBlock $status={status}>
                      <button onClick={onCancelEdit}>Cancel</button>
                      <EditBtn
                        onClick={addMode ? onAdd : onEdit}
                        $status={status}
                      >
                        {addMode ? "Add" : "Edit"}
                      </EditBtn>
                    </EditActionsBlock>
                  )}

                  {!isEditing && isHovering && (
                    <RemoveTask onClick={onDeleteClick} $status={status}>
                      <span>🗙</span>
                    </RemoveTask>
                  )}
                </StyledTaskItem>
              </TaskItemWrapper>
            );
          }}
        </Draggable>
      )}
    </>
  );
}

export default TaskItem;
