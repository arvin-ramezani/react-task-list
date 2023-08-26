import { styled } from "styled-components";

export const StyledTasksSection = styled.section`
  padding: 2rem 0;
`;

export const StyledTasksListHeader = styled.div``;

export const TasksListHeading = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin: 1rem 0;
`;

export const TasksListSubHeading = styled.p`
  font-size: 1rem;
  margin: 1rem 0;
`;

export const TasksListParagraph = styled.p`
  font-size: 1rem;
`;

export const TasksContainer = styled.div`
  margin-top: 2rem;
  display: grid;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    column-gap: 2rem;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 2rem;
  }
`;
