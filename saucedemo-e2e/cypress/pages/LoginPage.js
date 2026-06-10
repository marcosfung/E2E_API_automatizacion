class LoginPage {

  get usernameInput()    { return cy.get('#user-name'); }
  get passwordInput()    { return cy.get('#password'); }
  get loginButton()      { return cy.get('#login-button'); }
  get errorMessage()     { return cy.get('[data-test="error"]'); }


  visit() {
    cy.visit('/');
  }

  login(username, password) {
    this.usernameInput.clear().type(username);
    this.passwordInput.clear().type(password);
    this.loginButton.click();
  }

  // Assertions
  assertLoginError(message) {
    this.errorMessage.should('be.visible').and('contain.text', message);
  }
}

export default new LoginPage();
