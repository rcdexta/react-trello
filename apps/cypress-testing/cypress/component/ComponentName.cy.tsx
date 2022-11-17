import Board from "react-trello-ts";

describe("ComponentName.cy.ts", () => {
  it("renders cards", () => {
    cy.fixture("data.json").then((data) => {
      cy.mount(<Board data={data} />);
      cy.get(".horizontal")
        .findAllByText("Planned Tasks")
        .should("exist")
        .should("have.length", 1);
      cy.findCardByTitle("Buy milk");
      cy.findCardByTitle("Dispose Garbage");
      cy.findCardByTitle("Write Blog");
      cy.findCardByTitle("Pay Rent");
      cy.findCardByTitle("Clean House");
      cy.findCardByTitle("Practice Meditation");
      cy.findCardByTitle("Maintain Daily Journal");
      cy.findCardByTitle("Morning Jog");
      cy.findCardByTitle("Go Trekking");
      cy.findCardByTitle("Go Jogging");
      cy.findCardByTitle("Go Cycling");
    });
  });

  it("Can drag a card between lanes", () => {
    cy.fixture("data.json").then((data) => {
      cy.mount(<Board data={data} />);
      cy.findCardByTitle("Buy milk").move({
        deltaX: 300,
        deltaY: 50,
        force: true,
      });
      cy.get(".horizontal > :nth-child(1)")
        .findByText("Buy milk")
        .should("not.exist");
      cy.get(".horizontal > :nth-child(2)")
        .findByText("Buy milk")
        .should("exist");
    });
  });
});

export {};
