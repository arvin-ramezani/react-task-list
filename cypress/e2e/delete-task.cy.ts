import { TASKS_LIST } from "../../utils/dummy-data";
import { TaskStatus } from "../../utils/types/tasks.types";

import "@testing-library/cypress/add-commands";

describe("user can delete a task (Doing Task)", () => {
  it("User can delete Task Item (Doing Tasks)", () => {
    const doingList = TASKS_LIST.filter((t) => t.status === TaskStatus.DOING);
    const doingItemsLength = doingList.length; // Initial 2

    const taskToDelete = {
      id: 4,
      text: "Engage & question in meetings",
      status: TaskStatus.DOING,
    };

    cy.visit("http://localhost:3000");

    cy.findAllByLabelText(/doing task item/i).should(
      "have.length",
      doingItemsLength
    );

    cy.get("[data-cy='doing-task-item-4']")
      .as("taskToDelete")
      .contains(taskToDelete.text)
      .should("have.length", 1);

    cy.get("@taskToDelete").realHover();
    cy.get("[data-cy='doing-delete-item-4").click();

    cy.get("[data-cy='doing-cancel-delete-item-4']").click();

    cy.get("@taskToDelete").realHover();
    cy.get("[data-cy='doing-delete-item-4").click();

    cy.get("[data-cy='doing-confirm-delete-item-4']").click();

    cy.get("@taskToDelete").should("not.exist");
  });
});
