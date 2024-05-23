describe('Tic-Tac-Toe App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173'); // Adjust the URL as needed
  });

  it('should load the game board', () => {
    cy.get('.board-row .square').should('have.length', 9);
  });

  it('should allow players to make moves', () => {
    cy.get('.board-row .square').eq(0).click().should('contain.text', 'X');
    cy.get('.board-row .square').eq(1).click().should('contain.text', 'O');
  });

  it('should detect a win for player X', () => {
    [0, 3, 1, 4, 2].forEach(i => cy.get('.board-row .square').eq(i).click());
    cy.contains('div', 'Winner: X')
      .should('exist'); // Asserts that the element exists
  });


});

// <reference types="cypress" />

describe('Tic-Tac-Toe Game', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173'); // Adjust the URL if necessary
  });

  it('should display the game board', () => {
    cy.get('.game-board').should('exist');
  });

  it('should allow the player to make a move', () => {
    cy.get('.square').first().click().should('contain', 'X');
  });

  it('should allow the AI to make a move after the player', () => {
    cy.get('.square').first().click();
    cy.get('.square').contains('O').should('exist');
  });

  it('should not allow a move on a taken square', () => {
    cy.get('.square').first().click();
    cy.get('.square').first().click();
    cy.get('.square').first().should('contain', 'X');
  });

  it('should display the winner', () => {
    // Simulate a winning scenario for 'X'
    cy.get('.square').eq(0).click(); // X
    cy.get('.square').eq(1).click(); // O
    cy.get('.square').eq(4).click(); // X
    cy.get('.square').eq(2).click(); // O
    cy.get('.square').eq(8).click(); // X - X wins
    cy.contains('Winner: X').should('exist');
  });

  it('should allow to restart the game', () => {
    cy.get('.square').first().click();
    cy.contains('Go to game start').click();
    cy.get('.square').first().should('not.contain', 'X');
  });
});


