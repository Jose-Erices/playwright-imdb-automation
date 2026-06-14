describe('PokeAPI - Berry by Name', () => {
  it('Should return a berry using a valid name', () => {
    cy.request('https://pokeapi.co/api/v2/berry/cheri/').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.id).to.eq(1);
      expect(response.body.name).to.eq('cheri');
    });
  });

  it('Should return 404 using an invalid name', () => {
    cy.request({
      url: 'https://pokeapi.co/api/v2/berry/invalid-berry-name/',
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });
});