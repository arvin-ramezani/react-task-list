import React, { MouseEventHandler, useRef, useState } from "react";

import { useTasks } from "../../../context/TasksContext";
import { ITask, TaskStatus } from "../../../../utils/types/tasks.types";
import { validateTaskText } from "../../../../utils/helpers/validate";
import { splitTaskTextToMultiLine } from "../../../../utils/helpers/splitMultilineTaskText";

interface ITaskItemLogic {
  addMode?: boolean;
  status: ITask["status"];
  id: ITask["id"];
  text: ITask["text"];
  onExitAddMode?: () => void;
}

function TaskItemLogic({
  addMode,
  id,
  status,
  text,
  onExitAddMode,
}: ITaskItemLogic) {
  const { doneTask, undoneTask, editTask, deleteTask, addTask, isDragging } =
    useTasks();
  const [isHovering, setIsHovering] = useState(false);
  const [isEditing, setIsEditing] = useState(addMode || false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDone, setIsDone] = useState(status === TaskStatus.DONE);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const delayRef = useRef<number>(null);

  const confirmDeleteHandler = () => {
    deleteTask({ id });
  };

  const cancelDeleteHandler = () => {
    setShowDeleteModal(false);
  };

  const deleteClickHandler = () => {
    setShowDeleteModal(true);

    if (delayRef.current && isDone) {
      setIsDone(false);
      clearTimeout(delayRef.current);
    }
  };

  const addTaskHandler = () => {
    const text = inputRef.current?.value;

    const textIsValid = validateTaskText(text);
    if (!textIsValid) return onExitAddMode && onExitAddMode();

    const splittedText = splitTaskTextToMultiLine(text!);

    splittedText.forEach((text) => {
      if (validateTaskText(text)) {
        addTask({ status, text });
      }
    });

    onExitAddMode && onExitAddMode();
  };

  const editTaskHandler = () => {
    if (
      !inputRef.current ||
      inputRef.current.value.trim() === "" ||
      inputRef.current.value === text
    )
      return setIsEditing(false);

    editTask({ id, text: inputRef.current.value });

    return setIsEditing(false);
  };

  const cancelEditHandler = () => {
    setIsEditing(false);
    onExitAddMode && onExitAddMode();
  };

  const editTaskClickHandler: MouseEventHandler<HTMLParagraphElement> = (e) => {
    setIsEditing(true);

    if (delayRef.current) {
      setIsDone((prev) => !prev);
      clearTimeout(delayRef.current);
    }
  };

  const startHoverHandler = () => {
    return setIsHovering(() => true);
  };

  const endHoverHandler = () => {
    return setIsHovering(() => false);
  };

  const toggleDoneTaskHandler = () => {
    setIsDone((prev) => !prev);

    clearSetTimeoutHandler();

    // @ts-ignore
    delayRef.current = setTimeout(() => {
      if (isDone) {
        doneTask({ id, currentStatus: status });
      } else {
        undoneTask({ id });
      }
    }, 3000);
  };

  const clearSetTimeoutHandler = () => {
    delayRef.current && clearTimeout(delayRef.current);
  };
  return {
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
  };
}

export default TaskItemLogic;
