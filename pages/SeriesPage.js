class SeriesPage {
  constructor(page) {
    this.page = page;
    this.botonMenu = page.locator('#imdbHeader-navDrawerOpen');
    this.categoriaSeries = page.locator(
      'label[for="nav-link-categories-tvshows"]'
    );
    this.enlaceTop250Series = page.locator(
      'a[href*="/chart/toptv"]'
    );
    this.breakingBad = page
      .locator('a')
      .filter({ hasText: 'Breaking Bad' })
      .first();
  }
  // Método para navegar a la sección de Top 250 Series
  async navegarATop250Series() {
    await this.botonMenu.click();
    await this.page.waitForSelector('[data-testid="panel"]');
    await this.categoriaSeries.waitFor({
      state: 'visible',
      timeout: 10000
    });

    // Click con JavaScript para evitar error de viewport
    await this.categoriaSeries.evaluate(
      element => element.click()
    );

    await this.enlaceTop250Series.waitFor({
      state: 'visible',
      timeout: 10000
    });

  await this.enlaceTop250Series.evaluate(
  element => element.click()
);

    await this.page.waitForURL(/toptv/, {
      timeout: 15000
    });
  }
// Método para abrir el detalle de Breaking Bad
  async abrirBreakingBad() {
    await this.breakingBad.waitFor({
      state: 'visible',
      timeout: 10000
    });
    await this.breakingBad.click();
    await this.page.waitForURL(/\/title\/tt/, {
      timeout: 15000
    });
  }
// Método para validar que el título de la serie es visible.
 async irAFotos() {
  const enlaceFotos = this.page.locator(
    '[data-testid="hero__photo-link"]'
  );

  await enlaceFotos.waitFor({
    state: 'visible',
    timeout: 10000
  });
  await enlaceFotos.click();
  await this.page.waitForURL(/mediaviewer/, {
    timeout: 15000
  });
}

// Método para filtrar fotos por el actor Danny Trejo
async filtrarPorDannyTrejo() {
  const botonGaleria = this.page.locator(
    'button:has(svg), a:has(svg)'
  ).filter({
    has: this.page.locator('path[d*="M4.8 14"]')
  }).first();

  await botonGaleria.click({
    force: true
  });

  await this.page.waitForTimeout(1000);

  // Abrir filtro azul
  const botonFiltro = this.page.locator(
    'button[aria-label="Abrir aviso de filtro"]'
  ).first();

  await botonFiltro.waitFor({
    state: 'visible',
    timeout: 10000
  });

  await botonFiltro.click({
    force: true
  });

  await this.page.waitForTimeout(1000);

  // Seleccionar Danny Trejo desde el select del filtro
  const selectorPersona = this.page.locator(
    'select[name="Persona-filter-select-dropdown"]'
  );

  await selectorPersona.waitFor({
    state: 'attached',
    timeout: 10000
  });

  await selectorPersona.selectOption({
    value: 'nm0001803'
  });

  await this.page.waitForLoadState('domcontentloaded');
const botonCerrarFiltro = this.page.locator(
  'button:has(path[d*="M18.3 5.71"])'
).last();

await botonCerrarFiltro.waitFor({
  state: 'attached',
  timeout: 10000
});

await botonCerrarFiltro.evaluate(el => el.click());

await this.page.waitForTimeout(1000);
}

async abrirSegundaFoto() {
  await this.page.waitForTimeout(1000);

  // Cerrar cualquier overlay/comercial si aparece
  await this.page.keyboard.press('Escape');

  // Tomar la segunda foto desde el enlace padre
  const segundaFoto = this.page
    .locator('a:has(img.ipc-image)')
    .nth(1);

  await segundaFoto.waitFor({
    state: 'visible',
    timeout: 10000
  });

  await segundaFoto.evaluate(el => el.click());

  await this.page.waitForURL(/mediaviewer|rm/, {
    timeout: 15000
  });

  console.log('Segunda foto abierta correctamente');
}
}

module.exports = { SeriesPage };