class SeriesPage {
  constructor(page) {
    this.page = page;

    this.botonMenu = page.locator('#imdbHeader-navDrawerOpen');

    this.categoriaSeries = page.locator(
      'label[for="nav-link-categories-tv"]'
    );

    this.enlaceTop250 = page.locator(
      'a[href*="/chart/toptv"]'
    );
  }

  async navegarATop250Series() {
    await this.botonMenu.click();

    await this.page.waitForSelector(
      '[data-testid="panel"]'
    );

    await this.categoriaSeries.click({
      force: true
    });

    await this.enlaceTop250.click({
      force: true
    });
  }

  async abrirBreakingBad() {
    await this.page
      .locator('a')
      .filter({ hasText: 'Breaking Bad' })
      .first()
      .click();
  }

  async irAFotos() {
    await this.page
      .locator('a')
      .filter({ hasText: 'Photos' })
      .first()
      .click();
  }

  async filtrarDannyTrejo() {
    await this.page
      .locator('text=Danny Trejo')
      .click();
  }

  async abrirSegundaFoto() {
    await this.page
      .locator('img')
      .nth(1)
      .click();
  }
}

module.exports = { SeriesPage };