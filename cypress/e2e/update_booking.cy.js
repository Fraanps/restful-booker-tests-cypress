let headers = {};


describe('Test Suit - Booking API Testing - PUT | PATCH', () => {

  beforeEach(() => {
    cy.getToken("admin", "password123").as('token');

    cy.fixture('booking/bookingPost.json').as('newBooking')
    cy.fixture('booking/bookingPut.json').as('updateBooking')
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

  it('Update booking by id without authorization', () => {

    // cy.fixture('booking/bookingPost.json').as('newBooking');
    // cy.fixture('booking/bookingPut.json').as('updateBooking');
    headers = {
      'Accept': 'application/json',
      'Content-type': 'application/json',
    };

    cy.get('@newBooking').then((newBooking) => {
      cy.postRequest('/booking', {'Content-type': 'application/json'}, newBooking)
        .then((response) => {
          cy.get('@updateBooking').then((updateBooking) => {
            cy.putRequest('/booking/' + response.body.bookingid, headers, updateBooking)
              .then((response) => {
                expect(response.status).to.eq(403)
                expect(response.headers).to.have.property('content-type', 'text/plain; charset=utf-8')
                expect(response.body).to.be.an('string');
              });
          });

        });
    });
  });

});