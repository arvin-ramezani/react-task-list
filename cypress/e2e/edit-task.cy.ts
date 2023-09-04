import { TASKS_LIST } from "../../utils/dummy-data";
import { TaskStatus } from "../../utils/types/tasks.types";

import "@testing-library/cypress/add-commands";

describe("user can edit task", () => {
  it("Should Edit Task by one click on task text", () => {
    const todoList = TASKS_LIST.filter((t) => t.status === TaskStatus.TODO);
    const todoItemsLength = todoList.length; // length: 3

    cy.visit("http://localhost:3000");

    cy.get('[data-cy="todo-list"]').as("todoList");
    cy.get("@todoList").find("article").should("have.length", todoItemsLength);

    cy.get("[data-cy='todo-task-item-1']").click().as("taskToEdit");
    cy.get("@taskToEdit").get("textarea").click().clear();

    const editText = "Edit Task";

    cy.get("@taskToEdit").get("textarea").type(editText);
    cy.get("@taskToEdit").get("button").contains("Edit").click();

    cy.get("@taskToEdit").contains(editText);
    cy.get("@todoList").contains(todoItemsLength);
    cy.get("@todoList").find("article").should("have.length", todoItemsLength);
  });
});
