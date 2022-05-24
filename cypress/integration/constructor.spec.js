describe('burger ordering is available', function () {
    it('should be available on localhost:3000', function () {
        cy.visit('http://localhost:3000');
    });

    it('should open Burger Constructor by default', function () {
        cy.contains('Соберите бургер');
    });

    it('open and close ingredient modal', () => {
        cy.get('[data-test="60d3b41abdacab0026a733c8"]').click();
        cy.location('pathname').should('eq', '/ingredients/60d3b41abdacab0026a733c8');
        cy.get('[data-test="modal"]').as('modal');
        cy.get('@modal').should('exist');
        cy.get('@modal').find('svg').first().click();
        cy.get('@modal').should('not.exist');
    });

    it('drag and drop ingredients', () => {
        const dataTransfer = new DataTransfer();
        cy.get('[data-tabname="one"] ~ ul li:first').trigger('dragstart', { dataTransfer });
        cy.get('[data-test="constructor_target"]').trigger('drop', { dataTransfer });
        cy.get('[data-tabname="two"] ~ ul li:first').trigger('dragstart', { dataTransfer });
        cy.get('[data-test="constructor_target"]').trigger('drop', { dataTransfer });
    });

    it('log in', () => {
        cy.contains('Оформить заказ').should('be.enabled').click();
        cy.location('pathname').should('eq', '/login');
        cy.get('input[name=email]').click().type('kijos-01@royins.com');
        cy.get('input[type=password]').click().type('111111');
        cy.contains('Войти').click();
    });

    it('create an order', () => {
        cy.location('pathname').should('eq', '/');
        cy.contains('Оформить заказ').should('be.enabled').click();
        cy.get('[data-test="modal"]').should('exist');
    });

    it('close modal', () => {
        cy.get('[data-test="modal"]').as('modal');
        cy.get('@modal').find('svg').first().click();
        cy.get('@modal').should('not.exist');
    });
});