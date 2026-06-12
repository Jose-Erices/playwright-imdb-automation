class MoviesPage {
  constructor(page) {
    this.page = page;
    this.listItems = page.locator('.ipc-metadata-list-summary-item, .ipc-metadata-list-video-item');
    this.unratedButton = page.locator('[data-testid="hero-rating-bar__user-rating__unrated"], .ipc-rating-star--unrated');
    this.ratePopupButton = page.locator('button:has-text("Rate"), .ipc-rating-prompt__rate-button');
  }

  async hacerClicEnElementoPorPosicion(index) {
    await this.listItems.nth(index).scrollIntoViewIfNeeded();
    await this.listItems.nth(index).click();
  }

  async calificarConEstrellas(cantidad) {
    await this.unratedButton.click();
    await this.page.waitForSelector(`button[aria-label="Rate \${cantidad}"]`);
    await this.page.click(`button[aria-label="Rate \${cantidad}"]`);
    await this.ratePopupButton.click();
  }

  async eliminarFiltroPredeterminado() {
    const cerrarFiltro = this.page.locator('.chip__close-icon, [aria-label="Clear Today"], .ipc-chip__close-icon').first();
    await cerrarFiltro.click();
  }

  async buscarNacidosAyer() {
    await this.page.click('text=Birthday');
    const ayer = new Date();
    ayer.setDate(ayer.getDate() - 1);
    const mesDiaAyer = `${String(ayer.getMonth() + 1).padStart(2, '0')}-${String(ayer.getDate()).padStart(2, '0')}`;
    
    await this.page.fill('input[placeholder="MM-DD"], input[name="birthday-input"]', mesDiaAyer);
    await this.page.press('input[placeholder="MM-DD"], input[name="birthday-input"]', 'Enter');
  }

  async buscarNacidosHace40Anos() {
    await this.page.click('text=Birth date');
    const anoObjetivo = new Date().getFullYear() - 40;
    const mesDiaHoy = `${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`;
    const fechaCompleta = `${anoObjetivo}-${mesDiaHoy}`;

    await this.page.fill('input[name="birthDate-start"]', fechaCompleta);
    await this.page.fill('input[name="birthDate-end"]', fechaCompleta);
    await this.page.click('button:has-text("See results"), .ipc-btn--theme-base');
  }

  async tomarCaptura(nombreArchivo) {
    await this.page.screenshot({ path: `screenshots/${nombreArchivo}.png`, fullPage: false });
  }
}

module.exports = { MoviesPage };
