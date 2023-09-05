/// <reference types="cypress" />

import "cypress-real-events";

declare global {
  namespace Cypress {
    interface Chainable {
      /** Custom command to drag subject to target */
      drag(target: string, options?: Partial<TypeOptions>): Chainable<Element>;
    }
  }
}

/** Custom command `cy.drag` */

// REFERENCE
// https://stackoverflow.com/questions/70024270/cypress-drag-and-drop-not-working-on-a-react-based-website

Cypress.Commands.add(
  "drag",
  { prevSubject: "element" },
  (
    subject: Cypress.JQueryWithSelector<HTMLElement>,
    target: string,
    _options?: Partial<Cypress.TypeOptions>
  ) => {
    const BUTTON_INDEX = 0;
    const SLOPPY_CLICK_THRESHOLD = 10;

    cy.get(target)
      .first()
      .then(($target) => {
        let coordsDrop = $target[0].getBoundingClientRect();

        const coordsDrag = subject[0].getBoundingClientRect();
        cy.wrap(subject)
          .trigger("mousedown", {
            button: BUTTON_INDEX,
            clientX: coordsDrag.x,
            clientY: coordsDrag.y,
            force: true,
          })
          .trigger("mousemove", {
            button: BUTTON_INDEX,
            clientX: coordsDrag.x + SLOPPY_CLICK_THRESHOLD,
            clientY: coordsDrag.y,
            force: true,
          });
        cy.get("body")
          .trigger("mousemove", {
            button: BUTTON_INDEX,
            clientX: coordsDrop.x,
            clientY: coordsDrop.y,
            force: true,
          })
          .trigger("mouseup");
      });
  }
);
