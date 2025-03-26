describe('Test Suit - Booking API Testing with custom commands', () => {

  it('1 - Get All booking ids', () => {
    cy.getRequest('/booking', {'Content-Type': 'application/json'}).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      expect(response.body).to.have.lengthOf.at.least(1);
      expect(response.body[0]).to.have.property('bookingid');
    });

  });

  it('2 - Get booking id by firstname - create booking before', () => {
    cy.fixture('booking/bookingPost.json').then((newBooking) => {
      cy.postRequest('/booking', {'Content-type': 'application/json'}, newBooking).then((response) => {
        expect(response.body.booking).to.have.property('firstname');
        cy.wrap(response.body.booking.firstname).as('user');
      });
    });
    cy.get('@user').then((firstname) => {
      cy.getRequest('/booking?firstname=' + firstname, {'Content-Type': 'application/json'},).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body).to.have.lengthOf.at.least(1);
        expect(response.body[0]).to.have.property('bookingid');
      });

    });
  });

  it('3 - Get booking id by firstname', () => {

    let queryString = {'firstname': 'Francilene'}
    cy.getRequest('/booking', {'Content-Type': 'application/json'}, queryString).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      expect(response.body).to.have.lengthOf.at.least(1);
      expect(response.body[0]).to.have.property('bookingid');
    });
  });

  it.only('4 - Create a new booking with success return status code 200', () => {
    cy.fixture('booking/bookingPost.json').then((newBooking) => {
      cy.postRequest('/booking', {'Content-type': 'application/json'}, newBooking).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.headers).to.have.property('content-type', 'application/json; charset=utf-8');
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('bookingid');
        expect(response.body).to.have.property('booking').and.to.be.a('object')
        expect(response.body.booking).to.have.property('firstname', 'Francisco').and.to.be.a('string')
        expect(response.body.booking).to.have.property('lastname', 'Doca').and.to.be.a('string')
        expect(response.body.booking).to.have.property('totalprice').and.to.be.a('number')
        expect(response.body.booking).to.have.property('depositpaid').and.to.be.a('boolean')
        expect(response.body.booking).to.have.property('bookingdates').and.to.be.a('object')
        expect(response.body.booking.bookingdates).to.have.property('checkin').and.to.be.a('string')
        expect(response.body.booking.bookingdates).to.have.property('checkout').and.to.be.a('string')
        cy.wrap(response).as('bookingCreated', {type: 'static'})
      }).then((function() {
        cy.getRequest('/booking/'+this.bookingCreated.body.bookingid, {'Content-type': 'application/json'})
          .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.headers).to.have.property('content-type', 'application/json; charset=utf-8');
            expect(response.body).to.be.an('object');expect(response.body).to.have.property('totalprice').and.to.be.a('number')
            expect(response.body).to.have.property('depositpaid').and.to.be.a('boolean')
            expect(response.body).to.have.property('bookingdates').and.to.be.a('object')
            expect(response.body.bookingdates).to.have.property('checkin').and.to.be.a('string')
            expect(response.body.bookingdates).to.have.property('checkout').and.to.be.a('string')
          })

      }))
    });


  });


  });