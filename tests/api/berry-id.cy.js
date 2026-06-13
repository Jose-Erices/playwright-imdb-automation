describe('PokeAPI - Berry por ID', () => {
  it('Obtiene una berry con ID válido', () => {
    cy.request('https://pokeapi.co/api/v2/berry/1/')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('id', 1);
        expect(response.body).to.have.property('name');
      });
  });

  it('Retorna error con ID inválido', () => {
    cy.request({
      url: 'https://pokeapi.co/api/v2/berry/999999/',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });
});