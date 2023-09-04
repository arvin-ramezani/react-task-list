import { TASKS_LIST } from "../../utils/dummy-data";
import { TaskStatus } from "../../utils/types/tasks.types";

import "@testing-library/cypress/add-commands";

describe("Should correctly filter tasks based on different statuses and shows item length  ", () => {
  it("Show Filtered Task List", () => {
    cy.visit("http://localhost:3000");

    const doneList = TASKS_LIST.filter((t) => t.status === TaskStatus.DONE);

    cy.get('[data-cy="todo-list"]').find("article").should("have.length", 3);
    cy.get('[data-cy="doing-list"]').find("article").should("have.length", 2);
    cy.get('[data-cy="done-list"]').find("article").should("have.length", 2);

    cy.get('[data-cy="todo-list"]').contains("3 Tasks");
    cy.get('[data-cy="doing-list"]').contains("2 Tasks");
    cy.get('[data-cy="done-list"]').contains("2 Tasks");

    cy.contains("p", doneList[0].text)
      .invoke("css", "text-decoration")
      .should("include", "line-through");

    cy.contains("p", doneList[1].text)
      .invoke("css", "text-decoration")
      .should("include", "line-through");
  });
});
