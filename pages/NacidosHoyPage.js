class NacidosHoyPage {
  constructor(page) {
    this.page = page;

    this.botonMenu = page.locator("#imdbHeader-navDrawerOpen");
  }

  // Navegar a la sección "Personas nacidas hoy" desde el menú 
  async navegarANacidosHoy() {
    await this.botonMenu.click();
    await this.page.waitForSelector('[data-testid="panel"]');
    const categoriaFamosos = this.page.locator(
      'label[for="nav-link-categories-celebs"]',
    );

    await categoriaFamosos.waitFor({
      state: "visible",
      timeout: 10000,
    });

    await categoriaFamosos.evaluate((el) => el.click());
    const enlaceNacidosHoy = this.page.locator(
      'a:has(span.ipc-list-item__text:has-text("Personas nacidas hoy"))',
    );

    await enlaceNacidosHoy.waitFor({
      state: "visible",
      timeout: 10000,
    });

    await enlaceNacidosHoy.evaluate((el) => el.click());
    await this.page.waitForLoadState("domcontentloaded");
  }


  // Eliminar filtro de cumpleaños predeterminado para evitar conflictos con la fecha que se ingresará
  async eliminarFiltroPredeterminado() {
    const filtro = this.page
      .locator('button[data-testid^="selected-input-chip-list-birthday"]')
      .first();

    await filtro.click({
      force: true,
    });
  }

  // Hacer clic en la pestaña "Cumpleaños" para activar el campo de entrada de fecha
  async seleccionarCumpleanos() {
    await this.page.getByText("Cumpleaños").click({
      force: true,
    });
  }

  // Ingresar fecha de cumpleaños para buscar celebridades nacidas ayer
  async buscarCelebridadesNacidasAyer() {
    const ayer = new Date();
    ayer.setDate(ayer.getDate() - 1);
    const dia = String(ayer.getDate()).padStart(2, "0");
    const mes = String(ayer.getMonth() + 1).padStart(2, "0");
    const fechaAyer = `${dia}-${mes}`;
    const inputCumpleanos = this.page.locator(
      '[data-testid="birthday-input-test-id"]',
    );

    await inputCumpleanos.waitFor({
      state: "visible",
      timeout: 10000,
    });

    await inputCumpleanos.fill(fechaAyer);
    await inputCumpleanos.press("Enter");
    await this.page.waitForLoadState("domcontentloaded");
  }

  // Hacer clic en "Ver resultados" para mostrar la lista de celebridades nacidas ayer
  async verResultados() {
    const botonVerResultados = this.page.locator(
      'button[data-testid="adv-search-get-results"]',
    );

    await botonVerResultados.waitFor({
      state: "visible",
      timeout: 10000,
    });

    await botonVerResultados.evaluate((el) => el.click());
    await this.page.waitForLoadState("domcontentloaded");
  }

  // Seleccionar el tercer resultado de la lista de celebridades nacidas ayer
  async seleccionarTercerResultado() {
    const tercerResultado = this.page
      .locator('[data-testid="nlib-title"] a')
      .nth(2);

    await tercerResultado.scrollIntoViewIfNeeded();
    await tercerResultado.click();
    await this.page.waitForURL(/\/name\//);
  }

// Tomamos la captura del perfil de la celebridad nacida ayer.
  async tomarCaptura(nombre) {
    await this.page.screenshot({
      path: `screenshots/${nombre}.png`,
      fullPage: true,
    });
  }
}

module.exports = { NacidosHoyPage };
