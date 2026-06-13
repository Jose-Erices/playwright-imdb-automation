class NacidosHoyPage {
  constructor(page) {
    this.page = page;

    this.botonMenu = page.locator(
      '#imdbHeader-navDrawerOpen'
    );
  }

  async navegarANacidosHoy() {
    await this.botonMenu.click();

    await this.page.waitForSelector(
      '[data-testid="panel"]'
    );

    await this.page
      .locator('a[href*="/borntoday"]')
      .click();
  }

  async eliminarFiltroPredeterminado() {
    const filtro = this.page
      .locator(
        '.ipc-chip__close-icon, [aria-label*="Remove"]'
      )
      .first();

    if (await filtro.isVisible()) {
      await filtro.click();
    }
  }

  async seleccionarTercerResultado() {
    await this.page
      .locator('[data-testid="nlib-title-text"]')
      .nth(2)
      .click();
  }

  async tomarCaptura(nombre) {
    await this.page.screenshot({
      path: `screenshots/${nombre}.png`,
      fullPage: true
    });
  }
}

module.exports = { NacidosHoyPage };