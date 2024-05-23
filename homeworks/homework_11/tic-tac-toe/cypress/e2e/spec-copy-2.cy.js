describe('Tic-Tac-Toe App', () => {
  beforeEach(() => {
    // Visit the Tic-Tac-Toe application
    cy.visit('http://localhost:5173'); // Adjust the URL as needed
  });

  it('should load the game board', () => {
    // Check if the game board loads with 9 cells
    cy.get('.board .cell').should('have.length', 9);
  });

  it('should allow players to make moves', () => {
    // Simulate player X making a move in the top-left cell
    cy.get('.board .cell').eq(0).click();
    cy.get('.board .cell').eq(0).should('contain.text', 'X');

    // Simulate player O making a move in the top-middle cell
    cy.get('.board .cell').eq(1).click();
    cy.get('.board .cell').eq(1).should('contain.text', 'O');
  });

  it('should detect a win correctly', () => {
    // Simulate a winning scenario for player X
    cy.get('.board .cell').eq(0).click(); // X
    cy.get('.board .cell').eq(3).click(); // O
    cy.get('.board .cell').eq(1).click(); // X
    cy.get('.board .cell').eq(4).click(); // O
    cy.get('.board .cell').eq(2).click(); // X

    // Check if the win message is displayed
    cy.get('.win-message').should('contain.text', 'Player X wins');
  });

  it('should detect a draw correctly', () => {
    // Simulate a draw scenario
    cy.get('.board .cell').eq(0).click(); // X
    cy.get('.board .cell').eq(1).click(); // O
    cy.get('.board .cell').eq(2).click(); // X
    cy.get('.board .cell').eq(4).click(); // O
    cy.get('.board .cell').eq(3).click(); // X
    cy.get('.board .cell').eq(5).click(); // O
    cy.get('.board .cell').eq(7).click(); // X
    cy.get('.board .cell').eq(6).click(); // O
    cy.get('.board .cell').eq(8).click(); // X

    // Check if the draw message is displayed
    cy.get('.draw-message').should('contain.text', 'Draw');
  });

  it('should restart the game correctly', () => {
    // Simulate a game and restart
    cy.get('.board .cell').eq(0).click(); // X
    cy.get('.restart-button').click();

    // Check if the board is cleared
    cy.get('.board .cell').each(cell => {
      cy.wrap(cell).should('not.contain.text', 'X');
      cy.wrap(cell).should('not.contain.text', 'O');
    });
  });
});
