SAUCEDEMO E2E - automatizacion con cypress.io y javascript

TECNOLOGÍAS USADAS

- Cypress 13.x
- JavaScript (ES Modules)
- Patrón: Page Object Model (POM)
- Fixtures para datos de prueba
- Comandos personalizados (cy.loginBypassUI, cy.addProductToCart)
- cy.session() para optimizar reutilización de sesión


Proyecto de prueba funcional automatizada (E2E) del flujo de compra
en https://www.saucedemo.com/ usando Cypress con JavaScript y el patrón de diseño Page Object Model (POM)

Antes de instalar necesitas esto:

Node.js v16 o superior https://nodejs.org
npm v8 o superior (viene con Node.js)
Google Chrome, Edge o Firefox instalado


Casos de pruebas 

1. Login con credenciales incorrectas → verifica mensaje de error
2. Login exitoso con standard_user / secret_sauce
3. Agregar dos productos al carrito desde el inventario
4. Visualizar ambos productos en el carrito
5. Completar el formulario de checkout (paso 1)
6. Validación de campos requeridos en checkout
7. Verificar resumen de compra (paso 2) con precios
8. Finalizar compra y confirmar mensaje "Thank you for your order!"

usario y contraseña

Usuario:   standard_user
Password:  secret_sauce

Datos del formulario (en fixtures/testData.json)
First Name:   John
Last Name:    Doe
Postal Code:  12345
Productos:    Sauce Labs Backpack, Sauce Labs Bike Light


