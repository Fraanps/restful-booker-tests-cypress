describe('Test Suit - Booking API Testing - PUT | PATCH', () => {

  beforeEach(() => {
    cy.request({
      method: 'POST',
      url: '/auth',
      headers: {'Content-type': 'application/json'},
      body: {
        "username": "admin",
        "password": "password123",
      }
    }).then((response) => {
      cy.wrap(response.body.token).as('token');
    });
  });


  it('Update booking by id with authorization header - opção 1', () => {

    cy.request({
      method: 'POST',
      url: '/booking',
      headers: {'Content-Type': 'application/json'},
      body: {
        "firstname": "Luiza",
        "lastname": "Santos",
        "totalprice": 250,
        "depositpaid": false,
        "bookingdates": {
          "checkin": "2024-01-01",
          "checkout": "2024-01-05"
        },
        "additionalneeds": "Lunch"
      }
    }).then((response) => {
      cy.request({
        method: 'PUT',
        url: '/booking/' + response.body.bookingid,
        auth: {username: 'admin', password: 'password123'},
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: {
          "firstname": "Luiza",
          "lastname": "Santos Modificado",
          "totalprice": 250,
          "depositpaid": false,
          "bookingdates": {
            "checkin": "2024-01-01",
            "checkout": "2024-01-05"
          },
          "additionalneeds": "Lunch"
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(200); // Validação do sucesso esperado
      });
    });
  });

  it('Update booking by id with authorization header - opção 2', () => {

    cy.get('@token').then((token) => {
      cy.request({
        method: 'POST',
        url: '/booking',
        headers: {'Content-Type': 'application/json'},
        body: {
          "firstname": "Luiza",
          "lastname": "Santos",
          "totalprice": 250,
          "depositpaid": false,
          "bookingdates": {
            "checkin": "2024-01-01",
            "checkout": "2024-01-05"
          },
          "additionalneeds": "Lunch"
        }
      }).then((response) => {
        cy.request({
          method: 'PUT',
          url: '/booking/' + response.body.bookingid,
          //auth: {user: 'admin', password: 'password123'},
          headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'Cookie': `token=${token}`
          },
          body: {
            "firstname": "Luiza",
            "lastname": "Santos Modificado",
            "totalprice": 250,
            "depositpaid": false,
            "bookingdates": {
              "checkin": "2024-01-01",
              "checkout": "2024-01-05"
            },
            "additionalneeds": "Lunch"
          },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(200); // Validação do sucesso esperado

        });
      });

    });

  });


});