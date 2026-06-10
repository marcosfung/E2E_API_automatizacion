class CheckoutPage {

  get firstNameInput()   { return cy.get('#first-name'); }
  get lastNameInput()    { return cy.get('#last-name'); }
  get postalCodeInput()  { return cy.get('#postal-code'); }
  get continueButton()   { return cy.get('#continue'); }
  get cancelButton()     { return cy.get('#cancel'); }
  get pageTitle()        { return cy.get('.title'); }
  get errorMessage()     { return cy.get('[data-test="error"]'); }


  get summaryItems()     { return cy.get('.cart_item'); }
  get subtotalLabel()    { return cy.get('.summary_subtotal_label'); }
  get taxLabel()         { return cy.get('.summary_tax_label'); }
  get totalLabel()       { return cy.get('.summary_total_label'); }
  get finishButton()     { return cy.get('#finish'); }


  get confirmationHeader()  { return cy.get('.complete-header'); }
  get confirmationText()    { return cy.get('.complete-text'); }
  get backHomeButton()      { return cy.get('#back-to-products'); }


  fillPersonalInfo(firstName, lastName, postalCode) {
    this.firstNameInput.clear().type(firstName);
    this.lastNameInput.clear().type(lastName);
    this.postalCodeInput.clear().type(postalCode);
  }

  continue() {
    this.continueButton.click();
  }


  finishPurchase() {
    this.finishButton.click();
  }


  assertOnCheckoutStepOne() {
    this.pageTitle.should('have.text', 'Checkout: Your Information');
    cy.url().should('include', '/checkout-step-one.html');
  }

  assertCheckoutError(message) {
    this.errorMessage.should('be.visible').and('contain.text', message);
  }

  assertOnCheckoutStepTwo() {
    this.pageTitle.should('have.text', 'Checkout: Overview');
    cy.url().should('include', '/checkout-step-two.html');
  }

  assertSummaryItemCount(count) {
    this.summaryItems.should('have.length', count);
  }

  assertSubtotalVisible() {
    this.subtotalLabel.should('be.visible');
  }

  assertTotalVisible() {
    this.totalLabel.should('be.visible');
  }

  // Confirmation - Assertions
  assertOnConfirmationPage() {
    cy.url().should('include', '/checkout-complete.html');
  }

  assertOrderConfirmed() {
    this.confirmationHeader
      .should('be.visible')
      .and('have.text', 'Thank you for your order!');
  }

  assertConfirmationMessage() {
    this.confirmationText.should('be.visible');
  }
}

export default new CheckoutPage();
