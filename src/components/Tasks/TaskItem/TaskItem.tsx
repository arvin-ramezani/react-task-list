import React, { useEffect } from "react";

import { ITask } from "../../../../utils/types/tasks.types";
import TaskItemLogic from "./TaskItemLogic";
import AddModeTaskItem from "./AddModeTaskItem";
import ShowModeTaskItem from "./ShowModeTaskItem";

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
    confirmDeleteHandler,
    cancelDeleteHandler,
    deleteClickHandler,
    addTaskHandler,
    editTaskHandler,
    cancelEditHandler,
    editTaskClickHandler,
    startHoverHandler,
    endHoverHandler,
    toggleDoneTaskHandler,
    clearSetTimeoutHandler,
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
        <AddModeTaskItem
          status={status}
          onDeleteClick={deleteClickHandler}
          onCancelDelete={cancelDeleteHandler}
          onConfirmDelete={confirmDeleteHandler}
          onToggleDoneTask={toggleDoneTaskHandler}
          showDeleteModal={showDeleteModal}
          inputRef={inputRef}
          onAddTask={addTaskHandler}
          onCancelAddTask={cancelEditHandler}
          id={id}
        />
      ) : (
        <ShowModeTaskItem
          onStartHover={startHoverHandler}
          onEndHover={endHoverHandler}
          isHovering={isHovering}
          status={status}
          onDeleteClick={deleteClickHandler}
          onCancelDelete={cancelDeleteHandler}
          onConfirmDelete={confirmDeleteHandler}
          onToggleDoneTask={toggleDoneTaskHandler}
          showDeleteModal={showDeleteModal}
          inputRef={inputRef}
          onEdit={editTaskHandler}
          onEditTaskClick={editTaskClickHandler}
          onCancelEdit={cancelEditHandler}
          onClearSetTimeout={clearSetTimeoutHandler}
          isEditing={isEditing}
          delayRef={delayRef}
          id={id}
          text={text}
          index={index!}
        />
      )}
    </>
  );
}

export default TaskItem;
