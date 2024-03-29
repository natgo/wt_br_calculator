/* eslint-disable no-undef */
// main.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe("Normal App test", () => {
  it("Visits the Kitchen Sink", () => {
    cy.visit("http://localhost:3000/");
  });
  it("Testing picture uploading", () => {
    cy.get("input[type=\"file\"]").attachFile("ss.png", { subjectType: "drag-n-drop" });
    //cy.fixture("ss.png").then(fileContent => {
    //  
    //  cy.get("input[type=\"file\"]").attachFile({
    //    fileContent: atob(fileContent.toString()),
    //    fileName: "ss.png",
    //    mimeType: "image/png"
    //  });
    //});
  });
  it("Input BR", () => {
    cy.get("#name")
      .type("3.3")
      .should("have.value", "3.3");
    cy.contains("Ok").click();
    cy.contains("Your br: 3.3");
  });
});

describe("Ingame App test", () => {
  it("Visits the Kitchen Sink", () => {
    cy.visit("http://localhost:3000/");
  });
  it("Testing picture uploading", () => {
    cy.get("input[type=\"file\"]").attachFile("ss.png", { subjectType: "drag-n-drop" });
    //cy.fixture("ss.png").then(fileContent => {
    //  
    //  cy.get("input[type=\"file\"]").attachFile({
    //    fileContent: atob(fileContent.toString()),
    //    fileName: "ss.png",
    //    mimeType: "image/png"
    //  });
    //});
  });
  it("Test Ingame BR", () => {
    cy.intercept("GET", "http://localhost:8111/indicators", {
      statusCode: 200,
      body: {
        "valid": true,
        "type": "p_108b_serie1",
      },
    });
  });
});