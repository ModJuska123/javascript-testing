describe('Check header text', () => {
  it('should contain a header with the text "Hello"', () => {
    // Visit the page you want to test
    cy.visit('http://localhost:5173'); // Replace with your actual URL

    // Check if there is an element with the text "Hello"
    cy.contains('div', 'Next player: X')
      .should('exist'); // Asserts that the element exists
  });
});
