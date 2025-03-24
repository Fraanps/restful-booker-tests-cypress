describe('Test Suit - Auth API Testing', () => {

  it('POST credentials to auth endpoint with success - 1ª version', () => {
    cy.request({
      method: 'POST',
      url: '/auth',
      body: {
        "username": "admin",
        "password": "password123"
      },
      headers: {'Content-Type': 'application/json'},
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('token').and.to.be.a('string');
      expect(response.body).not.to.be.empty;
    });
  });

  it.only('POST credentials to auth endpoint with success - 2ª version', () => {

    let body = {
      "username": "admin",
      "password": "password123"
    };

    cy.postRequest(Cypress.env('auth_url'), {"Content-type": "application/json"}, body)
      .then((response) => {
        //debugger;
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('token').and.to.be.a('string');
        cy.pause()
        expect(response.body).not.to.be.empty;
      });
  });




});