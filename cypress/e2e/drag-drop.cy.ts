import { TASKS_LIST } from "../../utils/dummy-data";

describe("user can Drag and Drop a task item", () => {
  it("Should Drag first todoList task item and Drop to done-list, and change status to 'Done'", () => {
    const taskItemsLength = TASKS_LIST.length; // length: 7
    const taskToDrag = TASKS_LIST[0];

    cy.visit("http://localhost:3000");
    cy.get('[data-cy="todo-list"]').as("todoList").should("exist");
    cy.get('[data-cy="doing-list"]').as("doingList").should("exist");
    cy.get('[data-cy="done-list"]').as("doneList").should("exist");

    cy.get("article").should("have.length", taskItemsLength);

    cy.get("[data-cy='todo-task-item-1']").drag('[data-cy="done-list"]');

    // .findAllByLabelText(/task item/i)
    cy.get('[data-cy="done-list"]').find("article").should("have.length", 3);
    cy.get("[data-cy='done-task-item-1']").should("exist");

    cy.contains("p", taskToDrag.text)
      .invoke("css", "text-decoration")
      .should("include", "line-through");
  });

  it("Should Drag and Drop between 'Doing' and 'Done' task list and apply text-decoration style to task text", () => {
    const doingTaskToDone = TASKS_LIST[3];
    const doneTaskToDoing = TASKS_LIST[TASKS_LIST.length - 2];

    cy.visit("http://localhost:3000");

    cy.get('[data-cy="doing-list"]')
      .as("doingList")
      .find("article")
      .should("have.length", 2);
    cy.get('[data-cy="done-list"]')
      .as("doneList")
      .find("article")
      .should("have.length", 2);

    cy.get("[data-cy='doing-task-item-4']")
      .as("doingTaskToDone")
      .drag('[data-cy="done-list"]');

    cy.get("@doneList").find("article").should("have.length", 3);
    cy.get("@doingTaskToDone").should("exist");

    cy.contains("p", doingTaskToDone.text)
      .invoke("css", "text-decoration")
      .should("include", "line-through");

    cy.get("[data-cy='done-task-item-6']")
      .as("taskToDoing")
      .drag('[data-cy="doing-list"]');
    cy.get("@doingList").find("article").should("have.length", 2);
    cy.get("@taskToDoing").should("exist");

    cy.contains("p", doneTaskToDoing.text)
      .invoke("css", "text-decoration")
      .should("include", "none");
  });
});
