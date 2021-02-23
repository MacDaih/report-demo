const TITLE = 'This is a demo app';
describe('Main Test', () => {
    it('Simple Test', () => {
        cy.visit('http://localhost:3000');
        cy.get('[data-cy=maintitle]').should('be.visible');
        cy.get('.App-header').contains(TITLE);
    });
});