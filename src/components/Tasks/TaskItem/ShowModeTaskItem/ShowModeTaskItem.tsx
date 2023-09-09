import React, {
  ChangeEventHandler,
  FC,
  MouseEventHandler,
  RefObject,
} from "react";
import { Draggable } from "react-beautiful-dnd";
import { AnimatePresence, motion } from "framer-motion";

import {
  DropPlaceHolder,
  EditActionsBlock,
  EditBtn,
  RemoveTask,
  StyledTaskItem,
  StyledTextArea,
  TaskItemText,
  TaskItemWrapper,
  getStyle,
} from "../../../../../styles/components/Tasks/TaskItem.styled";
import DeleteTaskConfirmModal from "../../DeleteTaskConfirmModal/DeleteTaskConfirmModal";
import CheckBox from "../../../ui/CheckBox";
import { ITask, TaskStatus } from "../../../../../utils/types/tasks.types";
import {
  addTaskBtnVariants,
  removeTaskBtnVariants,
  textareaVariants,
} from "./ShowModeTaskItem.variants";

export interface ShowModeTaskItemProps {
  onStartHover: () => void;
  onEndHover: () => void;
  isHovering: boolean;
  status: TaskStatus;
  onDeleteClick: () => void;
  onCancelDelete: () => void;
  onConfirmDelete: () => void;
  onToggleDoneTask: () => void;
  showDeleteModal: boolean;
  inputRef: RefObject<HTMLTextAreaElement>;
  onEdit: () => void;
  onEditInputChange?: ChangeEventHandler<HTMLTextAreaElement>;
  onEditTaskClick: MouseEventHandler<HTMLParagraphElement>;
  onCancelEdit: () => void;
  onClearSetTimeout: () => void;
  isEditing: boolean;
  delayRef: RefObject<number>;
  id: ITask["id"];
  text: ITask["text"];
  index: number;
}

const ShowModeTaskItem: FC<ShowModeTaskItemProps> = ({
  onStartHover,
  onEndHover,
  isHovering,
  status,
  onDeleteClick,
  onCancelDelete,
  onConfirmDelete,
  onToggleDoneTask,
  showDeleteModal,
  inputRef,
  onEdit,
  onEditInputChange,
  onEditTaskClick,
  onCancelEdit,
  onClearSetTimeout,
  isEditing,
  delayRef,
  id,
  text,
  index,
}) => {
  return (
    <Draggable
      shouldRespectForcePress
      index={index!}
      draggableId={id.toString()}
    >
      {(provided, snapshot) => {
        if (snapshot.isDragging && delayRef.current) {
          onClearSetTimeout();
        }
        return (
          <TaskItemWrapper
            key={"showTaskItem"}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            $isDragging={snapshot.isDragging && !snapshot.isDropAnimating}
            style={getStyle(provided.draggableProps.style, snapshot)}
            onMouseEnter={onStartHover}
            onMouseLeave={onEndHover}
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
              <AnimatePresence>
                {showDeleteModal && (
                  <DeleteTaskConfirmModal
                    status={status}
                    onCancel={onCancelDelete}
                    onConfirm={onConfirmDelete}
                    id={id.toString()}
                  />
                )}
              </AnimatePresence>

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
                  key={"taskItemTextarea"}
                  onChange={onEditInputChange}
                  name={`editTask${id}`}
                  $status={status}
                  aria-label="edit task"
                  variants={textareaVariants}
                  initial={"hidden"}
                  animate={"show"}
                  exit={"hidden"}
                />
              ) : (
                <TaskItemText
                  data-testid="task text"
                  key={"taskItemText"}
                  as={motion.p}
                  variants={textareaVariants}
                  initial={"hidden"}
                  animate={"show"}
                  exit={"hidden"}
                  onClick={onEditTaskClick}
                  $status={status}
                >
                  {text}
                </TaskItemText>
              )}

              {isEditing && (
                <EditActionsBlock $status={status}>
                  <motion.button
                    variants={addTaskBtnVariants}
                    initial={"initial"}
                    animate={"animate"}
                    whileHover={"hover"}
                    whileTap={"tap"}
                    transition={{ duration: 0.8 }}
                    onClick={onCancelEdit}
                  >
                    Cancel
                  </motion.button>

                  <EditBtn
                    variants={addTaskBtnVariants}
                    initial={"initial"}
                    animate={"animate"}
                    whileHover={"hover"}
                    whileTap={"tap"}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    onClick={onEdit}
                    $status={status}
                  >
                    Edit
                  </EditBtn>
                </EditActionsBlock>
              )}

              <AnimatePresence>
                {!isEditing && isHovering && (
                  <RemoveTask
                    as={motion.div}
                    variants={removeTaskBtnVariants}
                    initial={"hidden"}
                    animate={"show"}
                    exit={"hidden"}
                    aria-label="delete task item"
                    data-testid="delete-icon"
                    onClick={onDeleteClick}
                    $status={status}
                    data-cy={`${status}-delete-item-${id.toString()}`}
                  >
                    <span>🗙</span>
                  </RemoveTask>
                )}
              </AnimatePresence>
            </StyledTaskItem>
          </TaskItemWrapper>
        );
      }}
    </Draggable>
  );
};

export default ShowModeTaskItem;
