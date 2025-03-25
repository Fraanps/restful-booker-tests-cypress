describe('Test Suit - Booking API Testing - POSTs', () => {

  it.only('Create a new booking with success', () => {
    cy.request({
      method: 'POST',
      url: '/booking/',
      headers: {'Content-Type': 'application/json'},
      body: {
        "firstname": "Pedro",
        "lastname": "Brown",
        "totalprice": 200,
        "depositpaid": true,
        "bookingdates": {
          "checkin": "2025-01-01",
          "checkout": "2025-01-05"
        },
        "additionalneeds": "Breakfast"
      }
    }).then((response) => {
      // não precisa de tantas validações, o importante é o que a documentação pede
      expect(response.status).to.eq(200);
      expect(response.headers).to.have.property('content-type', 'application/json; charset=utf-8');
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('bookingid').and.to.be.a('number')

      cy.wrap(response).as('bookingCreated', {type: 'static'});

      expect(response.body).to.have.property('booking').and.to.be.a('object')
      expect(response.body.booking).to.have.property('firstname', 'Pedro').and.to.be.a('string')
      expect(response.body.booking).to.have.property('lastname', 'Brown').and.to.be.a('string')
      expect(response.body.booking).to.have.property('totalprice').and.to.be.a('number')
      expect(response.body.booking).to.have.property('depositpaid').and.to.be.a('boolean')
      expect(response.body.booking).to.have.property('bookingdates').and.to.be.a('object')
      expect(response.body.booking.bookingdates).to.have.property('checkin').and.to.be.a('string')
      expect(response.body.booking.bookingdates).to.have.property('checkout').and.to.be.a('string')
    }).then(function () {
      cy.request({
        method: 'GET',
        url: '/booking/' + this.bookingCreated.body.bookingid,
        headers: {'Accept': 'application/json'}
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.headers).to.have.property('content-type', 'application/json; charset=utf-8');
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('firstname', 'Pedro').and.to.be.a('string')
        expect(response.body).to.have.property('lastname', 'Brown').and.to.be.a('string')
        expect(response.body).to.have.property('totalprice').and.to.be.a('number')
        expect(response.body).to.have.property('depositpaid').and.to.be.a('boolean')
        expect(response.body).to.have.property('bookingdates').and.to.be.a('object')
        expect(response.body.bookingdates).to.have.property('checkin').and.to.be.a('string')
        expect(response.body.bookingdates).to.have.property('checkout').and.to.be.a('string')
      });
    });
  });

  it.only('Create a new booking with success - Alternativa 2', () => {
    cy.request({
      method: 'POST',
      url: '/booking/',
      headers: {'Content-Type': 'application/json'},
      body: {
        "firstname": "Pedro",
        "lastname": "Brown",
        "totalprice": 200,
        "depositpaid": true,
        "bookingdates": {
          "checkin": "2025-01-01",
          "checkout": "2025-01-05"
        },
        "additionalneeds": "Breakfast"
      }
    }).then((response) => {
      // não precisa de tantas validações, o importante é o que a documentação pede
      expect(response.status).to.eq(200);
      expect(response.headers).to.have.property('content-type', 'application/json; charset=utf-8');
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('bookingid').and.to.be.a('number')
      expect(response.body).to.have.property('booking').and.to.be.a('object')
      expect(response.body.booking).to.have.property('firstname', 'Pedro').and.to.be.a('string')
      expect(response.body.booking).to.have.property('lastname', 'Brown').and.to.be.a('string')
      expect(response.body.booking).to.have.property('totalprice').and.to.be.a('number')
      expect(response.body.booking).to.have.property('depositpaid').and.to.be.a('boolean')
      expect(response.body.booking).to.have.property('bookingdates').and.to.be.a('object')
      expect(response.body.booking.bookingdates).to.have.property('checkin').and.to.be.a('string')
      expect(response.body.booking.bookingdates).to.have.property('checkout').and.to.be.a('string')

      cy.wrap(response.body.bookingid).as('bookingid');

      cy.get('@bookingid').then(bookingId => {
        cy.request({
          method: 'GET',
          url: '/booking/' + bookingId,
          headers: {'Accept': 'application/json'}
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.headers).to.have.property('content-type', 'application/json; charset=utf-8');
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('firstname', 'Pedro').and.to.be.a('string')
          expect(response.body).to.have.property('lastname', 'Brown').and.to.be.a('string')
          expect(response.body).to.have.property('totalprice').and.to.be.a('number')
          expect(response.body).to.have.property('depositpaid').and.to.be.a('boolean')
          expect(response.body).to.have.property('bookingdates').and.to.be.a('object')
          expect(response.body.bookingdates).to.have.property('checkin').and.to.be.a('string')
          expect(response.body.bookingdates).to.have.property('checkout').and.to.be.a('string')
        });
      });

    });
  });

});
