class TaquillaPage {
  constructor(page) {
    this.page = page;

    // Menú principal
    this.botonMenu = page.locator('#imdbHeader-navDrawerOpen');

    // Categoría Películas
  this.categoriaPeliculas = page
  .locator('[data-testid="category-expando"]')
  .filter({ hasText: 'Películas' });

    // Enlace Taquilla Superior
    this.enlaceTaquilla = page.locator(
      'span.ipc-list-item__text:has-text("Taquilla superior")'
    );

    // Lista de películas de la página
    this.listaPeliculas = page.locator(
      'ul li.ipc-metadata-list-summary-item'
    );

   // Botón Puntuar
this.botonCalificacion = page.locator(
  '[data-testid="hero-rating-bar__user-rating__unrated"]'
).first();

    // Barra de estrellas del modal
    this.barraEstrellas = page.locator(
      'div.ipc-starbar__touch'
    );
  }

  async navegarATaquillaSuperior() {

    // Abrir menú lateral
    await this.botonMenu.click();

    // Esperar panel lateral
    await this.page.waitForSelector(
      '[data-testid="panel"]'
    );

   // Esperar categoría Películas
await this.categoriaPeliculas.waitFor({
  state: 'visible'
});

// Click usando JS para evitar problemas de viewport
 await this.categoriaPeliculas.evaluate(
    element => element.click()
  );

  await this.enlaceTaquilla.click();


    // Validar navegación
    await this.page.waitForURL(
      /boxoffice/,
      {
        timeout: 15000
      }
    );
  }

  async abrirSegundaPelicula() {

    // Obtener segunda película del listado
    const segundaPelicula = this.listaPeliculas.nth(1);

    await segundaPelicula.waitFor({
      state: 'visible'
    });

    const titulo = await segundaPelicula
      .locator('h3, h4')
      .first()
      .textContent();

    console.log(`Película seleccionada: ${titulo}`);

    // Abrir detalle de la película
    await segundaPelicula
      .locator('a')
      .first()
      .click();

    // Validar navegación al detalle
    await this.page.waitForURL(
      /\/title\/tt/,
      {
        timeout: 15000
      }
    );
  }

 async calificarConCincoEstrellas() {

  await this.botonCalificacion.waitFor({
    state: 'visible'
  });

  await this.botonCalificacion.click();

  await this.barraEstrellas.waitFor({
    state: 'visible',
    timeout: 10000
  });

  const box = await this.barraEstrellas.boundingBox();

  if (box) {

    const posicionX = box.width * 0.45;
    const posicionY = box.height / 2;

    await this.barraEstrellas.click({
      position: {
        x: posicionX,
        y: posicionY
      }
    });
  }

const botonPuntuarFinal = this.page.locator(
  'button:has-text("Puntuar")'
).last();

await botonPuntuarFinal.waitFor({
  state: 'visible',
  timeout: 10000
});

await botonPuntuarFinal.click({
  force: true
});

  console.log('Calificación enviada');


console.log('Calificación de 5 estrellas enviada');
  }

}

module.exports = { TaquillaPage };