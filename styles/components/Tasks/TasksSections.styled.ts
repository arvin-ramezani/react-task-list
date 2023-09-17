import { motion } from 'framer-motion';
import styled from 'styled-components';

export const StyledTasksListHeader = styled(motion.header)`
  width: 80%;
  margin: 70px auto 0;
`;

export const TasksListHeading = styled(motion.h1)`
  font-size: 2rem;
  font-weight: bold;
  margin: 1rem 0;

  & span {
    font-size: 2.2rem;
    color: blue;
    margin-right: 0.1rem;
  }
`;

export const TasksListSubHeading = styled(motion.p)`
  font-size: 1rem;
  margin: 1rem 0;
`;

export const TasksListParagraph = styled(motion.p)`
  font-size: 1rem;
`;

export const TasksContainer = styled(motion.div)`
  margin-top: 2rem;
  display: grid;
  row-gap: 6rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    column-gap: 2rem;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 2rem;
  }
`;
