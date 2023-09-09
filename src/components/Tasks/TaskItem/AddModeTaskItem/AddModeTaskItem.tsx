import React, { FC, RefObject, useEffect } from "react";
import { AnimationControls, motion } from "framer-motion";

import {
  DropPlaceHolder,
  EditActionsBlock,
  EditBtn,
  StyledTaskItem,
  StyledTextArea,
  StyledMotionTaskItem,
} from "../../../../../styles/components/Tasks/TaskItem.styled";
import DeleteTaskConfirmModal from "../../DeleteTaskConfirmModal/DeleteTaskConfirmModal";
import { ITask, TaskStatus } from "../../../../../utils/types/tasks.types";
import {
  AddTaskBtnVariants,
  addModeTaskItemVariants,
} from "./AddModeTaskItem.variants";

export interface AddModeTaskItemProps {
  status: TaskStatus;
  onCancelDelete: () => void;
  onConfirmDelete: () => void;
  onInvalidInputAnimation: AnimationControls;
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
  showDeleteModal,
  inputRef,
  onAddTask,
  onCancelAddTask,
  onInvalidInputAnimation,
  id,
}) => {
  useEffect(() => {
    onInvalidInputAnimation.start(
      { opacity: [0, 1], scale: [0.4, 1] },
      { delay: 0.2 }
    );
  }, []);

  return (
    <StyledMotionTaskItem
      data-cy={`${status}-add-task-${id}`}
      as={motion.article}
      variants={addModeTaskItemVariants}
      initial={"hidden"}
      animate={"show"}
      exit={"exit"}
    >
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

        <StyledTextArea
          ref={inputRef}
          as={motion.textarea}
          name={`newTask`}
          aria-label={"newTask"}
          $status={status}
          animate={onInvalidInputAnimation}
        />

        <EditActionsBlock $status={status}>
          <motion.button
            variants={AddTaskBtnVariants}
            initial={"initial"}
            animate={"animate"}
            whileHover={"hover"}
            whileTap={"tap"}
            onClick={onCancelAddTask}
            transition={{ duration: 0.8 }}
          >
            Cancel
          </motion.button>

          <EditBtn
            onClick={onAddTask}
            $status={status}
            variants={AddTaskBtnVariants}
            initial={"initial"}
            animate={"animate"}
            whileHover={"hover"}
            whileTap={"tap"}
            transition={{ delay: 0.4 }}
          >
            Add
          </EditBtn>
        </EditActionsBlock>
      </StyledTaskItem>
    </StyledMotionTaskItem>
  );
};

export default AddModeTaskItem;
