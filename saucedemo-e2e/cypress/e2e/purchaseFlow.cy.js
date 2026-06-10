// cypress/e2e/purchaseFlow.cy.js
import LoginPage    from '../pages/LoginPage';
import InventoryPage from '../pages/InventoryPage';
import CartPage     from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';

describe('Flujo de Compra E2E - SauceDemo', () => {

  let testData;

  before(() => {
    cy.fixture('testData').then((data) => {
      testData = data;
    });
  });

  context('1. Autenticación', () => {
    it('Debería fallar al ingresar credenciales incorrectas', () => {
      LoginPage.visit();
      LoginPage.login('wrong_user', 'wrong_pass');
      LoginPage.assertLoginError('Username and password do not match');
    });

    it('Debería autenticarse exitosamente con standard_user', () => {
      LoginPage.visit();
      LoginPage.login(testData.username, testData.password);
      InventoryPage.assertOnInventoryPage();
    });
  });

  context('2. Flujo completo de compra', () => {
    beforeEach(() => {
      cy.loginBypassUI();
    });

    it('Debería agregar dos productos al carrito', () => {
      const [product1, product2] = testData.products;

      InventoryPage.addProductToCart(product1);
      InventoryPage.assertProductAddedToCart(product1);
      InventoryPage.assertCartCount(1);

      InventoryPage.addProductToCart(product2);
      InventoryPage.assertProductAddedToCart(product2);
      InventoryPage.assertCartCount(2);
    });

    it('Debería visualizar ambos productos en el carrito', () => {
      const [product1, product2] = testData.products;

      // Agregar productos
      cy.addProductToCart(product1);
      cy.addProductToCart(product2);

      // Ir al carrito
      InventoryPage.goToCart();

      // Verificar carrito
      CartPage.assertOnCartPage();
      CartPage.assertCartItemCount(2);
      CartPage.assertProductInCart(product1);
      CartPage.assertProductInCart(product2);
    });

    it('Debería completar el formulario de checkout (paso 1)', () => {
      const [product1, product2] = testData.products;
      const { firstName, lastName, postalCode } = testData.checkout;

      cy.addProductToCart(product1);
      cy.addProductToCart(product2);
      InventoryPage.goToCart();
      CartPage.proceedToCheckout();

      CheckoutPage.assertOnCheckoutStepOne();
      CheckoutPage.fillPersonalInfo(firstName, lastName, postalCode);
      CheckoutPage.continue();

      CheckoutPage.assertOnCheckoutStepTwo();
    });

    it('Debería fallar al continuar checkout sin datos requeridos', () => {
      const [product1] = testData.products;

      cy.addProductToCart(product1);
      InventoryPage.goToCart();
      CartPage.proceedToCheckout();

      CheckoutPage.assertOnCheckoutStepOne();
      CheckoutPage.continue(); // Sin llenar campos
      CheckoutPage.assertCheckoutError('First Name is required');
    });

    it('Debería mostrar el resumen de compra antes de finalizar', () => {
      const [product1, product2] = testData.products;
      const { firstName, lastName, postalCode } = testData.checkout;

      cy.addProductToCart(product1);
      cy.addProductToCart(product2);
      InventoryPage.goToCart();
      CartPage.proceedToCheckout();

      CheckoutPage.fillPersonalInfo(firstName, lastName, postalCode);
      CheckoutPage.continue();

      CheckoutPage.assertOnCheckoutStepTwo();
      CheckoutPage.assertSummaryItemCount(2);
      CheckoutPage.assertSubtotalVisible();
      CheckoutPage.assertTotalVisible();
    });

    it('Debería finalizar la compra con confirmación "THANK YOU FOR YOUR ORDER"', () => {
      const [product1, product2] = testData.products;
      const { firstName, lastName, postalCode } = testData.checkout;

      // Login → Agregar productos
      cy.addProductToCart(product1);
      cy.addProductToCart(product2);

      // Ir al carrito
      InventoryPage.goToCart();
      CartPage.assertOnCartPage();
      CartPage.assertCartItemCount(2);

      // Iniciar checkout
      CartPage.proceedToCheckout();
      CheckoutPage.assertOnCheckoutStepOne();
      CheckoutPage.fillPersonalInfo(firstName, lastName, postalCode);
      CheckoutPage.continue();

      // Revisar resumen
      CheckoutPage.assertOnCheckoutStepTwo();
      CheckoutPage.assertSummaryItemCount(2);

      // Finalizar compra
      CheckoutPage.finishPurchase();

      // Verificar confirmación
      CheckoutPage.assertOnConfirmationPage();
      CheckoutPage.assertOrderConfirmed();
      CheckoutPage.assertConfirmationMessage();
    });
  });

});
