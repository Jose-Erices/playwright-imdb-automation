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


  // IMDb actualmente no está aplicando correctamente el filtro
  // mediante el campo DD-MM, incluso realizando la prueba manualmente.
  // Se utiliza búsqueda por URL como alternativa estable, que corresponde al metodo que esta mas abajo
  //se debe desbloquear parametros en Celebridades nacidas ayer.spec.js 
  // Ingresar fecha de cumpleaños para buscar celebridades nacidas ayer
/*
  async buscarCelebridadesNacidasAyer() {
    const ayer = new Date();
    ayer.setDate(ayer.getDate() - 1);
    const dia = String(ayer.getDate()).padStart(2, "0");
    const mes = String(ayer.getMonth() + 1).padStart(2, "0");
    const fechaAyer = `${dia}-${mes}`;
    const inputCumpleanos = this.page.getByPlaceholder("DD-MM").first();

    await inputCumpleanos.waitFor({
      state: "visible",
      timeout: 15000,
    });

    await inputCumpleanos.click();
    await inputCumpleanos.fill("");
    await inputCumpleanos.type(fechaAyer, { delay: 80 });
    await this.page.waitForTimeout(1000);
    await inputCumpleanos.press("Enter");

    const botonVerResultados = this.page.getByRole("button", {
      name: /Ver resultados/i,
    });

    await botonVerResultados.waitFor({
      state: "visible",
      timeout: 15000,
    });

    await botonVerResultados.click();
    await this.page.waitForLoadState("domcontentloaded");

    console.log(`Fecha ingresada: ${fechaAyer}`);
  }*/

     //se deja la siguiente solucion,  Se utiliza búsqueda por URL como alternativa estable.
    async buscarCelebridadesNacidasAyer() {
  const ayer = new Date();
  ayer.setDate(ayer.getDate() - 1);
  const dia = String(ayer.getDate()).padStart(2, "0");
  const mes = String(ayer.getMonth() + 1).padStart(2, "0");
  const fechaAyerUrl = `${mes}-${dia}`;

  await this.page.goto(
    `https://www.imdb.com/search/name/?birth_monthday=${fechaAyerUrl}`
  );

  await this.page.waitForLoadState("domcontentloaded");
  console.log(`Fecha enviada por URL: ${fechaAyerUrl}`);
}

  // Seleccionar el tercer resultado de la lista de celebridades nacidas ayer
  async seleccionarTercerResultado() {
    const resultados = this.page
      .locator("li")
      .filter({ has: this.page.locator('a[href^="/name/nm"]') });

    await resultados.nth(2).waitFor({
      state: "visible",
      timeout: 15000,
    });

    const tercerResultado = resultados
      .nth(2)
      .locator('a[href^="/name/nm"]')
      .first();

    await tercerResultado.scrollIntoViewIfNeeded();
    await tercerResultado.click();

    await this.page.waitForURL(/\/name\/nm/);
  }

  // Tomamos la captura del perfil de la celebridad nacida ayer.
  async tomarCaptura(nombre) {
    await this.page.screenshot({
      path: `screenshots/${nombre}.png`,
      fullPage: true,
    });
  }

  // continuidad al caso numero 5//

  // abrir filtro Fecha de nacimiento
  async seleccionarFechaNacimiento() {
    const fechaNacimiento = this.page.locator(
      '[data-testid="accordion-item-birthDateAccordion"]',
    );

    await fechaNacimiento.click({
      force: true,
    });
  }

  // Caso 5: ingresar fecha exacta de hoy hace 40 años
  async buscarCelebridadesNacidasHace40Anios() {
    const fecha = new Date();

    fecha.setFullYear(fecha.getFullYear() - 40);

    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const dia = String(fecha.getDate()).padStart(2, "0");

    const fecha40 = `${anio}-${mes}-${dia}`;

    const fechaDesde = this.page.locator('[data-testid="birthDate-start"]');

    const fechaHasta = this.page.locator('[data-testid="birthDate-end"]');

    await fechaDesde.fill(fecha40);

    await fechaHasta.fill(fecha40);

    // Forzamos a IMDb a aplicar el filtro
    await fechaHasta.press("Enter");

    await this.page.waitForTimeout(1000);
  }

  //Abrir el primer enlace de descripción del primer resultado de la lista de celebridades nacidas hace 40 años y tomar captura del perfil de la celebridad.
  async abrirPrimerLinkDescripcion() {
    await this.page.waitForTimeout(2000);

    const primerResultado = this.page
      .locator('[data-testid="dli-bio"]')
      .first();

    const primerLinkDescripcion = primerResultado
      .locator('a[href*="/title/"], a[href*="/es-es/title/"]')
      .first();

    await primerLinkDescripcion.waitFor({
      state: "visible",
      timeout: 15000,
    });

    await primerLinkDescripcion.click({
      force: true,
    });

    await this.page.waitForURL(/\/title\//, {
      timeout: 15000,
    });
  }
}
module.exports = { NacidosHoyPage };
