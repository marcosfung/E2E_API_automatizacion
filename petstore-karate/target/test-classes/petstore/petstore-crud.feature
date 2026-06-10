Feature: CRUD Usuario PetStore

Scenario: Crear, Consultar, Actualizar y Eliminar Usuario

    * def username = 'marcosqa01'

    # CREAR USUARIO

    Given url baseUrl + '/user'
    And request
    """
    {
      "id": 10001,
      "username": "#(username)",
      "firstName": "Marcos",
      "lastName": "Fung",
      "email": "marcos@test.com",
      "password": "123456",
      "phone": "999999999",
      "userStatus": 1
    }
    """
    When method post
    Then status 200
    And match response.message == '10001'

    # BUSCAR USUARIO

    Given url baseUrl + '/user/' + username
    When method get
    Then status 200
    And match response.username == username
    And match response.email == 'marcos@test.com'

    # ACTUALIZAR USUARIO

    Given url baseUrl + '/user/' + username
    And request
    """
    {
      "id": 10001,
      "username": "#(username)",
      "firstName": "Marcos",
      "lastName": "Fung",
      "email": "actualizado@test.com",
      "password": "123456",
      "phone": "999999999",
      "userStatus": 1
    }
    """
    When method put
    Then status 200

    # BUSCAR USUARIO ACTUALIZADO

    Given url baseUrl + '/user/' + username
    When method get
    Then status 200
    And match response.email == 'actualizado@test.com'

    # ELIMINAR USUARIO

    Given url baseUrl + '/user/' + username
    When method delete
    Then status 200

    # VALIDAR ELIMINACIÓN

    Given url baseUrl + '/user/' + username
    When method get
    Then status 404