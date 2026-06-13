class BarraSuperiorPage {
  constructor(page) {
    this.page = page;

    this.campoBusqueda = page
      .locator('input[id="suggestion-search"], input[name="q"]')
      .first();

    this.primerResultadoActor = page
      .locator(
        '.imdb-header__search-menu .ipc-list-item__text, [data-testid="search-result--const"]'
      )
      .first();
  }

  async buscarActor(nombreActor) {
    await this.campoBusqueda.waitFor({
      state: 'visible',
      timeout: 10000
    });

    await this.campoBusqueda.click();

    await this.campoBusqueda.pressSequentially(
      nombreActor,
      { delay: 100 }
    );

    await this.primerResultadoActor.waitFor({
      state: 'visible',
      timeout: 10000
    });

    await this.primerResultadoActor.click();
  }
}

module.exports = { BarraSuperiorPage };