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
        <TaskItemWrapper
          key={"addTaskItem"}
          onMouseEnter={startHovering}
          onMouseLeave={endHovering}
          data-cy={`${status}-add-task-${id}`}
        >
          <DropPlaceHolder $dragging={"false"} $status={status} />

          <StyledTaskItem
            $status={status}
            $dragging={"false"}
            $draggable="false"
          >
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
                disabled={isEditing || showDeleteModal}
                id={id.toString()}
              />
            </div>

            <StyledTextArea
              ref={inputRef}
              // onChange={onEditInputChange}
              name={`newTask`}
              aria-label={"newTask"}
              $status={status}
            />

            {isEditing && (
              <EditActionsBlock $status={status}>
                <button onClick={onCancelEdit}>Cancel</button>

                <EditBtn onClick={onAdd} $status={status}>
                  Add
                </EditBtn>
              </EditActionsBlock>
            )}

            {!isEditing && isHovering && (
              <RemoveTask
                aria-label="delete add item"
                onClick={onDeleteClick}
                $status={status}
              >
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
                onMouseEnter={startHovering}
                onMouseLeave={endHovering}
                aria-label={`${status} task item`}
                data-cy={`${status}-task-item-${id.toString()}`}
              >
                <DropPlaceHolder
                  $dragging={snapshot.isDragging ? "true" : "false"}
                  $status={status}
                />

                <StyledTaskItem
                  $status={status}
                  $dragging={snapshot.isDragging ? "true" : "false"}
                  $draggable="true"
                >
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
                      name={`tasksItem${id}`}
                      status={status}
                      disabled={isEditing || showDeleteModal}
                      id={id.toString()}
                    />
                  </div>

                  {isEditing ? (
                    <StyledTextArea
                      ref={inputRef}
                      onChange={onEditInputChange}
                      name={`editTask${id}`}
                      $status={status}
                      aria-label="edit task"
                    />
                  ) : (
                    <TaskItemText
                      data-testid="task text"
                      onClick={onEditTaskClick}
                      $status={status}
                    >
                      {text}
                    </TaskItemText>
                  )}

                  {isEditing && (
                    <EditActionsBlock $status={status}>
                      <button onClick={onCancelEdit}>Cancel</button>

                      <EditBtn onClick={onEdit} $status={status}>
                        Edit
                      </EditBtn>
                    </EditActionsBlock>
                  )}

                  {!isEditing && isHovering && (
                    <RemoveTask
                      aria-label="delete add item"
                      data-testid="delete-icon"
                      onClick={onDeleteClick}
                      $status={status}
                      data-cy={`${status}-delete-item-${id.toString()}`}
                    >
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
