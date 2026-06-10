class CartPage {

  get pageTitle()        { return cy.get('.title'); }
  get cartItems()        { return cy.get('.cart_item'); }
  get checkoutButton()   { return cy.get('#checkout'); }
  get continueShoppingButton() { return cy.get('#continue-shopping'); }

  cartItemByName(name) {
    return cy.contains('.inventory_item_name', name).parents('.cart_item');
  }

  proceedToCheckout() {
    this.checkoutButton.click();
  }

  continueShopping() {
    this.continueShoppingButton.click();
  }

  assertOnCartPage() {
    this.pageTitle.should('be.visible').and('have.text', 'Your Cart');
    cy.url().should('include', '/cart.html');
  }

  assertCartItemCount(count) {
    this.cartItems.should('have.length', count);
  }

  assertProductInCart(productName) {
    this.cartItemByName(productName)
      .find('.inventory_item_name')
      .should('be.visible')
      .and('have.text', productName);
  }
}

export default new CartPage();
