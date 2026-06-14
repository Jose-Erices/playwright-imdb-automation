describe('PokeAPI - Berry Flavor', () => {
  it('Should return a berry flavor using a valid name', () => {
    cy.request('https://pokeapi.co/api/v2/berry-flavor/spicy/').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq('spicy');
      expect(response.body.berries).to.be.an('array');
    });
  });

  it('Should find the spiciest berry and validate its detail', () => {
    cy.request('https://pokeapi.co/api/v2/berry-flavor/spicy/').then((response) => {
      expect(response.status).to.eq(200);

      const berries = response.body.berries;

      const spiciestBerry = berries.reduce((max, current) => {
        return current.potency > max.potency ? current : max;
      });

      const berryName = spiciestBerry.berry.name;

      cy.request(`https://pokeapi.co/api/v2/berry/${berryName}/`).then((berryResponse) => {
        expect(berryResponse.status).to.eq(200);
        expect(berryResponse.body.name).to.eq(berryName);
      });
    });
  });
});