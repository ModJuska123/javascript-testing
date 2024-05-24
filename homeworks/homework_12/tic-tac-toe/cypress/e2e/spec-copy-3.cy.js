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

  
  it('should allow to restart the game', () => {
    cy.get('.square').first().click();
    cy.contains('Go to game start').click();
    cy.get('.square').first().should('not.contain', 'X');
  });
});


