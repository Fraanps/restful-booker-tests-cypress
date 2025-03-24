describe('Test Suit - Booking API Testing', () => {
  it('Get all booking id', () => {
    cy.request({
      method: 'GET',
      url: Cypress.env('booking_url'),
      headers: {'Content-Type': 'application/json'}
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array') // retorno é um array
      expect(response.body).to.have.lengthOf.at.least(1) // retornar pelo menos 1 dado
      expect(response.body[0]).to.have.property('bookingid')
    });

  });

  it('Get booking id by firstname', () => {
    cy.request({
      method: 'GET',
      url: Cypress.env('booking_url'),
      qs: {'firstname': 'test'},
      headers: {'Content-Type': 'application/json'}
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array') // retorno é um array
    });

  });

  it('Get booking id by lastname', () => {
    cy.request({
      method: 'GET',
      url: Cypress.env('booking_url'),
      qs: {'lastname': 'test'},
      headers: {'Content-Type': 'application/json'}
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array') // retorno é um array
    });

  });

  it('Get booking id by checkin', () => {
    cy.request({
      method: 'GET',
      url: Cypress.env('booking_url'),
      qs: {'checkin': '2014-03-13'},
      headers: {'Content-Type': 'application/json'}
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array') // retorno é um array
    });

  });

  it('Get booking id by checkout', () => {
    cy.request({
      method: 'GET',
      url: Cypress.env('booking_url'),
      qs: {'checkout': '2020-01-13'},
      headers: {'Content-Type': 'application/json'}
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array')
    });

  });

  it('Get booking by id', () => {
    // a unica forma de garantir que um id exista é vc criar-lo para usar
    cy.postBooking({
      firstname: "Francilene",
      lastname: "Silva",
      totalprice: 111,
      depositpaid: true,
      bookingdates: {
        checkin: "2018-01-01",
        checkout: "2019-01-01"
      },
      additionalneeds: "Breakfast"
    }).then((bookingid) => {
      cy.log(`reserva criada com ID: ${bookingid}`)
      cy.request({
        method: 'GET',
        url: `/booking/${bookingid}`,
        headers: {'Accept': 'application/json'}
      }).then((response) => {
        // não precisa de tantas validações, o importante é o que a documentação pede
        expect(response.status).to.eq(200);
        expect(response.headers).to.have.property('content-type', 'application/json; charset=utf-8');
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('firstname').and.to.be.a('string')
        expect(response.body).to.have.property('lastname').and.to.be.a('string')
        expect(response.body).to.have.property('totalprice').and.to.be.a('number')
        expect(response.body).to.have.property('depositpaid').and.to.be.a('boolean')
        expect(response.body).to.have.property('bookingdates').and.to.be.a('object')
        expect(response.body.bookingdates).to.have.property('checkin').and.to.be.a('string')
        expect(response.body.bookingdates).to.have.property('checkout').and.to.be.a('string')

      });
    });
  });


});