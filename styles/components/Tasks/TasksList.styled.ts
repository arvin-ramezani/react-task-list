import styled from 'styled-components';
import { motion } from 'framer-motion';

import { TaskStatus } from '../../../utils/types/tasks.types';

export const StyledTasksList = styled(motion.section)<{ $status: TaskStatus }>`
  padding: 20px 20px 40px 20px;
  border-radius: 10px;
  margin: 2rem auto;
  position: relative;
  min-height: 80px;
  height: 100%;
  width: 85%;
  max-width: 340px;

  background-color: ${({ $status, theme }) => theme.colors[$status].background};
`;

export const TasksListHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const TasksListTitle = styled.h4<{ $status: TaskStatus }>`
  font-size: 0.95rem;
  font-weight: bold;

  color: ${({ $status, theme }) => theme.colors[$status].heading};
`;

export const TasksLength = styled(motion.span)<{ $status: TaskStatus }>`
  font-size: 0.75rem;

  color: ${({ theme, $status }) => theme.colors[$status].disabledText};

  & > span {
    display: inline-block;
    font-size: 0.9rem;
    font-weight: 800;
    margin-right: 0.2rem;
  }
`;
