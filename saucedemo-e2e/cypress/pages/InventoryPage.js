class InventoryPage {
  // Selectors
  get pageTitle()        { return cy.get('.title'); }
  get cartBadge()        { return cy.get('.shopping_cart_badge'); }
  get cartIcon()         { return cy.get('.shopping_cart_link'); }

  productByName(name) {
    return cy.contains('.inventory_item_name', name)
      .parents('.inventory_item');
  }

  addToCartButtonOf(productName) {
    return this.productByName(productName)
      .find('button[id^="add-to-cart"]');
  }

  removeButtonOf(productName) {
    return this.productByName(productName)
      .find('button[id^="remove"]');
  }


  addProductToCart(productName) {
  cy.get('.inventory_item').should('have.length.greaterThan', 0);
  this.addToCartButtonOf(productName).click();
}

  goToCart() {
    this.cartIcon.click();
  }

  assertOnInventoryPage() {
    this.pageTitle.should('be.visible').and('have.text', 'Products');
    cy.url().should('include', '/inventory.html');
  }

  assertCartCount(count) {
    this.cartBadge.should('have.text', String(count));
  }

  assertProductAddedToCart(productName) {
    this.removeButtonOf(productName).should('be.visible');
  }
}

export default new InventoryPage();
