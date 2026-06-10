
/**
 *login via UI
 */
Cypress.Commands.add('loginBypassUI', () => {
  cy.visit('/');
  cy.get('#user-name').type('standard_user');
  cy.get('#password').type('secret_sauce');
  cy.get('#login-button').click();
  cy.url().should('include', '/inventory.html');
});


/**
 * Útil para tests que no son de login pero necesitan estar autenticados
 */

Cypress.Commands.add('loginBypassUI', () => {
  cy.visit('/');
  cy.get('#user-name').type('standard_user');
  cy.get('#password').type('secret_sauce');
  cy.get('#login-button').click();
  cy.url().should('include', '/inventory.html');
  cy.get('.inventory_list').should('be.visible');
});

/**
 * agrega el producto a la carta por nombre, útil para tests que no son de agregar al carrito pero necesitan tener productos en el carrito
 */
Cypress.Commands.add('addProductToCart', (productName) => {
  cy.contains('.inventory_item_name', productName)
    .parents('.inventory_item')
    .find('button[id^="add-to-cart"]')
    .click();
});