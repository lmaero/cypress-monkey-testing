const { faker } = require("@faker-js/faker");

// Adjust values according to your testing needs
const WAITING_TIME = 1000;
const MONKEYS_LEFT = 10;
const EVENTS_LEFT = 100;
const URL = "https://losestudiantes.co";

describe("Los estudiantes under monkeys", function () {
  it("visits los estudiantes and survives monkeys", function () {
    cy.visit(URL);
    cy.wait(WAITING_TIME);
    randomClick(MONKEYS_LEFT);
  });

  it("visits 'los estudiantes' and deploy random events", function () {
    cy.visit(URL);
    cy.wait(WAITING_TIME);
    randomEvent(EVENTS_LEFT);
  });
});

// getRandomInt utility function extracted to be used in other contexts
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

// Modified function to extract getRandomInt method and remove reassigned
// variable
function randomClick(monkeysLeft) {
  if (monkeysLeft > 0) {
    cy.get("a").then(($links) => {
      const randomLink = $links.get(getRandomInt(0, $links.length));

      if (!Cypress.dom.isHidden(randomLink)) {
        cy.wrap(randomLink).click({ force: true });
        monkeysLeft -= 1;
      }

      cy.wait(WAITING_TIME);
      randomClick(monkeysLeft);
    });
  }
}

function randomEvent(eventsLeft) {
  //In order to fire a random event we need to know which are the possible
  // tags, based on the selected tag, a different event should be selected.
  const possibleTags = ["a", "input", "select", "button"];

  // Obtain a random tag to be used in this iteration
  const selectedTag = possibleTags[getRandomInt(0, possibleTags.length)];

  // If the selectedTag was not found, the length of the array will be
  // zero, so we need to run again the randomEvent function, this validation
  // prevents a failing 'cy.get()' call
  if (Cypress.$(selectedTag).length === 0) {
    randomEvent(eventsLeft);
  } else if (eventsLeft > 0) {
    console.groupCollapsed(`Iteration ${eventsLeft}`);

    cy.get(selectedTag).then(($elements) => {
      const randomElement = $elements.get(getRandomInt(0, $elements.length));

      // Log left here if you want to inspect which element was selected in
      // the current call of the recursive function
      console.log(randomElement);

      if (!Cypress.dom.isHidden(randomElement)) {
        // The case to run should depend on the selected tag
        switch (selectedTag) {
          case "a":
            cy.wrap(randomElement).click({ force: true });
            cy.wait(WAITING_TIME);
            break;

          case "button":
            // If a disabled attribute was found...
            if ($elements.is(":disabled")) {
              // ...we need to skip this iteration...
              break;
            } else {
              //...in other case element can be clicked
              cy.wrap(randomElement).click({ force: true });
              break;
            }

          case "input":
            // If a disabled attribute was found...
            if ($elements.is(":disabled")) {
              // ...we need to skip this iteration...
              break;
            } else {
              // ...in other case element can be typed
              cy.wrap(randomElement).type(faker.lorem.word());
              break;
            }

          //  This case won't be fired because explored page has no 'select'
          //  elements. Validation in line 58. However, if the site decides
          //  to add 'select' elements, it will be supported by this case
          case "select":
            const randomNumber = getRandomInt(0, randomElement.length);
            if (cy.wrap(randomElement).should("exist")) {
              cy.wrap(randomElement).select(randomNumber);
              break;
            } else {
              break;
            }
        }
      }
      randomEvent(eventsLeft);
    });

    //Ends recursion call
    eventsLeft -= 1;
    console.groupEnd();
  }
}
