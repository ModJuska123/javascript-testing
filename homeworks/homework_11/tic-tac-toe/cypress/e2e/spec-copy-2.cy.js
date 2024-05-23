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

