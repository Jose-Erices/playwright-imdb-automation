class PerfilActorPage {
  constructor(page) {
    this.page = page;

    this.botonCreditos = page.locator(
      '[data-testid="nm-flmg-all-credits"]'
    );

    this.pestanaProximosEstrenos = page
      .locator(
        '[id*="upcoming"], [id*="unreleased"], .ipc-accordion__item__header'
      )
      .first();

    this.primeraPeliculaCompletada = page
      .locator(
        'a.ipc-metadata-list-summary-item__t'
      )
      .filter({
        hasText: 'The Prince'
      })
      .first();
  }

  async desplegarProximosEstrenos() {
    await this.botonCreditos.scrollIntoViewIfNeeded();

    await this.botonCreditos.click();

    await this.page.waitForLoadState(
      'domcontentloaded'
    );

    await this.pestanaProximosEstrenos.scrollIntoViewIfNeeded();

    await this.pestanaProximosEstrenos.click();
  }

  async obtenerEnlacePelicula() {
    return await this.primeraPeliculaCompletada.getAttribute(
      'href'
    );
  }
}

module.exports = { PerfilActorPage };