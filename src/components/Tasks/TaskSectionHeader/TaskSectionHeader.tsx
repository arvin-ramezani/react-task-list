import React from 'react';

import {
  TasksListHeading,
  TasksListSubHeading,
  TasksListParagraph,
} from '../../../../styles/components/Tasks/TasksSections.styled';
import { StyledTasksListHeader } from '../../../../styles/components/Tasks/TasksSections.styled';
import { Variants } from 'framer-motion';
import {
  headerItemsVariants,
  headerVariants,
} from './TaskSectionHeader.variants';

function TaskListHeader() {
  return (
    <StyledTasksListHeader
      variants={headerVariants}
      initial={'initial'}
      animate={'animate'}
      transition={{ duration: 0.6, staggerChildren: 0.2 }}
    >
      <TasksListHeading
        variants={headerItemsVariants}
        transition={{ duration: 0.6 }}
      >
        <span>&#10003;</span>
        Task List
        <span>&#10003;</span>
      </TasksListHeading>

      <TasksListSubHeading
        variants={headerItemsVariants}
        transition={{ duration: 0.6 }}
      >
        Break your life to simple tasks to get things done!
      </TasksListSubHeading>
      <TasksListParagraph
        variants={headerItemsVariants}
        transition={{ duration: 0.8 }}
      >
        Does not matter how many tasks you done, It’s important to break to
        small tasks and be on progress.
      </TasksListParagraph>
    </StyledTasksListHeader>
  );
}

export default TaskListHeader;
