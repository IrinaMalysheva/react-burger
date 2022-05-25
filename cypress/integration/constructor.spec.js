describe('Main page', function () {
    beforeEach(() => {
        cy.visit('/');
        cy.contains('Соберите бургер');
    })

    it('should allow to open and close ingredient modal', () => {
        cy.get('[data-test="60d3b41abdacab0026a733c8"]').click();
        cy.location('pathname').should('eq', '/ingredients/60d3b41abdacab0026a733c8');
        cy.get('[data-test="modal"]').as('modal');
        cy.get('@modal').should('exist');
        cy.get('@modal').find('svg').first().click();
        cy.get('@modal').should('not.exist');
    });
    
    it('should allow to drag and drop ingredients', () => {
        const dataTransfer = new DataTransfer();
        cy.get('[data-test="constructor_target"]').as('constructorTarget');
        cy.get('@constructorTarget').find('section').should('have.length', 1);
        cy.get('@constructorTarget').find('ul li').should('have.length', 0);

        cy.get('[data-tabname="one"] ~ ul li:first').trigger('dragstart', { dataTransfer });
        cy.get('@constructorTarget').trigger('drop', { dataTransfer });
        cy.get('@constructorTarget').find('> section:first > div').should('have.length', 1);
        cy.get('@constructorTarget').find('> section:last > div').should('have.length', 1);

        cy.get('[data-tabname="two"] ~ ul li:first').trigger('dragstart', { dataTransfer });
        cy.get('@constructorTarget').trigger('drop', { dataTransfer });
        cy.get('@constructorTarget').find('li').should('have.length', 1);
    });
});

describe('Burger ordering', function () {
    before(() => {
        cy.visit('/');
        cy.contains('Соберите бургер');

        const dataTransfer = new DataTransfer();
        cy.get('[data-test="constructor_target"]').as('constructorTarget');

        cy.get('[data-tabname="one"] ~ ul li:first').trigger('dragstart', { dataTransfer });
        cy.get('@constructorTarget').trigger('drop', { dataTransfer });

        cy.get('[data-tabname="two"] ~ ul li:first').trigger('dragstart', { dataTransfer });
        cy.get('@constructorTarget').trigger('drop', { dataTransfer });
    })

    it('should allow to create an order', () => {
        cy.contains('Оформить заказ').should('be.enabled').click();
        cy.location('pathname').then(($pathname) => {
            if ($pathname == '/login') {
                cy.contains('Войти');
            } else {
                cy.get('[data-test="modal"]').should('exist');
            }
          })
    });
});

describe('Login page', function () {
    it('should allow to log in', () => {
        cy.visit('/login');
        cy.get('input[name=email]').click().type('kijos-01@royins.com');
        cy.get('input[type=password]').click().type('111111');
        cy.contains('Войти').click();
        cy.location('pathname', { timeout: 5000 }).should('eq', '/');
    });
});