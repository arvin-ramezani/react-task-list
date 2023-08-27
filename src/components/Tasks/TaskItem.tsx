import React, {
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";

import { ITask, TaskStatus } from "../../../utils/types/tasks.types";
import {
  EditActionsBlock,
  EditBtn,
  RemoveTask,
  StyledTaskItem,
  StyledTextArea,
  TaskItemText,
} from "../../../styles/Tasks/TaskItem.styled";
import CheckBox from "../ui/CheckBox";
import { useTasks } from "./TasksContext";
import DeleteTaskConfirmModal from "./DeleteTaskConfirmModal";

interface TaskItemProps extends ITask {}

function TaskItem({ text, status, id }: TaskItemProps) {
  const { doneTask, undoneTask, editTask, deleteTask } = useTasks();
  const [isHovering, setIsHovering] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const onConfirmDelete = () => {
    deleteTask({ id });
  };

  const onCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const onDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const onEdit = () => {
    console.log(inputRef.current!.value === text, "Edit");
    if (
      !inputRef.current ||
      inputRef.current.value.trim() === "" ||
      inputRef.current.value === text
    )
      return setIsEditing(false);

    editTask({ id, text: inputRef.current.value });

    return setIsEditing(false);
  };

  const onEditInputChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    if (!inputRef.current) return;

    console.log(e);

    inputRef.current.value = e.target.value;
  };

  const onEditTaskClick: MouseEventHandler<HTMLParagraphElement> = (e) => {
    setIsEditing(true);
  };

  const startHovering = () => {
    setIsHovering(true);
  };

  const endHovering = () => {
    setIsHovering(false);
  };

  const onTaskStatusChange = () => {
    if (status !== TaskStatus.DONE) {
      doneTask({ id, currentStatus: status });
    } else {
      console.log("undoneTask");
      undoneTask({ id });
    }
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.value = text;
      inputRef.current.focus({});
    }
  }, [isEditing]);

  return (
    <StyledTaskItem onMouseEnter={startHovering} onMouseLeave={endHovering}>
      {showDeleteModal && (
        <DeleteTaskConfirmModal
          status={status}
          onCancel={onCancelDelete}
          onConfirm={onConfirmDelete}
        />
      )}

      <div>
        <CheckBox
          onChange={onTaskStatusChange}
          name={`tasksItem${id}`}
          status={status}
        />
      </div>

      {isEditing ? (
        <StyledTextArea
          ref={inputRef}
          onChange={onEditInputChange}
          name={`editTask${id}`}
          status={status}
        />
      ) : (
        <TaskItemText onClick={onEditTaskClick} status={status}>
          {text}
        </TaskItemText>
      )}

      {isEditing && (
        <EditActionsBlock status={status}>
          <button onClick={setIsEditing.bind(null, false)}>Cancel</button>
          <EditBtn onClick={onEdit} status={status}>
            Edit
          </EditBtn>
        </EditActionsBlock>
      )}

      {!isEditing && isHovering && (
        <RemoveTask onClick={onDeleteClick} status={status}>
          <span>🗙</span>
        </RemoveTask>
      )}
    </StyledTaskItem>
  );
}

export default TaskItem;
