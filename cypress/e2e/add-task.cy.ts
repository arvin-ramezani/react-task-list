import { TASKS_LIST } from "../../utils/dummy-data";
import { TaskStatus } from "../../utils/types/tasks.types";

import "@testing-library/cypress/add-commands";

describe("user can add task", () => {
  it("Add Todo Task", () => {
    const taskItemsLength = TASKS_LIST.length; // length: 7

    const newTaskText = "Add Todo Task";

    cy.visit("http://localhost:3000");
    cy.get("article").should("have.length", taskItemsLength);

    cy.contains("New").click();
    cy.get("button").contains("Cancel").click();

    cy.contains("New").click();
    cy.get("textarea").type(newTaskText);

    cy.get("button").contains("Add").click();

    cy.get("article").contains(newTaskText);
  });

  it("Add Doing Task", () => {
    const doingList = TASKS_LIST.filter((t) => t.status === TaskStatus.DOING);
    const doingItemsLength = doingList.length; // length: 2
    const newTaskText = "Add Doing Task";

    cy.visit("http://localhost:3000");

    cy.findAllByLabelText(/doing task item/i).should(
      "have.length",
      doingItemsLength
    );

    cy.findByLabelText(/doing tasks list/i)
      .contains("New")
      .click();

    cy.get("textarea").type(newTaskText);

    cy.get("button").contains("Add").click();

    cy.get("article").contains(newTaskText);
  });

  it("Should add each line with a line break as a separate item - (Add 3 Todo Task)", () => {
    const todoList = TASKS_LIST.filter((t) => t.status === TaskStatus.TODO);
    const todoItemsLength = todoList.length; // length: 3
    const threeNewTaskText = `
    Add Task Item 1
    Add Task Item 2
    Add Task Item 3
    `;

    cy.visit("http://localhost:3000");

    cy.findAllByLabelText(/todo task item/i).should(
      "have.length",
      todoItemsLength
    );

    cy.get('[data-cy="todo-list"]')
      .as("todoList")
      .contains("New")
      .click()
      .as("addTaskBtn");

    cy.get("@todoList").get("textarea").type(threeNewTaskText);

    cy.get("@todoList").contains("Add").click();

    cy.get('[data-cy="todo-list"]')
      .find("article")
      .should("have.length", todoItemsLength + 3);
  });
});
