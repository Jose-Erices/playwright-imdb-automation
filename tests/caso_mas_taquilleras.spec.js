const { test, expect } = require('@playwright/test');

test.describe('IMDb - Automatización de Taquilla y Votación', () => {

  test('Caso 2: Navegar a Taquilla Superior y puntuar la segunda película con 5 estrellas', async ({ page }) => {

    // Navegar a la página principal de IMDb
    await page.goto('https://www.imdb.com/', {
      waitUntil: 'domcontentloaded'
    });

    // Abrir el menú hamburguesa lateral
    await page.locator('#imdbHeader-navDrawerOpen').click();

    // Esperar que el panel lateral esté visible
    await page.waitForSelector('[data-testid="panel"]');

    // Expandir la categoría "Películas"
    await page
      .locator('label[for="nav-link-categories-mov"]')
      .click({ force: true });

    // Seleccionar la opción "Taquilla Superior"
    await page
      .locator('a[href*="/chart/boxoffice"]')
      .click({ force: true });

    // Verificar que la navegación se realizó correctamente
    await page.waitForURL(/boxoffice/, {
      timeout: 15000
    });

    // Obtener la segunda película del listado de taquilla
    const segundaPelicula = page
      .locator('ul li.ipc-metadata-list-summary-item')
      .nth(1);

    // Esperar que la película esté visible
    await segundaPelicula.waitFor({
      state: 'visible'
    });

    // Guardar el título para evidencias o logs
    const tituloPelicula = await segundaPelicula
      .locator('h3, h4')
      .first()
      .textContent();

    console.log(`Película seleccionada: ${tituloPelicula}`);

    // Ingresar al detalle de la película
    await segundaPelicula
      .locator('a')
      .first()
      .click();

    // Verificar que se abrió la página de detalle
    await page.waitForURL(/\/title\/tt/, {
      timeout: 15000
    });

    // Abrir el modal de puntuación
    const botonPuntuar = page
      .locator('[data-testid="hero-rating-bar__user-rating"]')
      .first();

    await botonPuntuar.waitFor({
      state: 'visible',
      timeout: 10000
    });

    await botonPuntuar.click();

    // Esperar que la barra de estrellas esté disponible
    const barraEstrellas = page.locator('div.ipc-starbar__touch');

    await barraEstrellas.waitFor({
      state: 'visible',
      timeout: 10000
    });

    // Obtener dimensiones de la barra para calcular la posición de la quinta estrella
    const box = await barraEstrellas.boundingBox();

    if (box) {

      const xEstrella5 = box.width * 0.45;
      const yCentro = box.height / 2;

      // Seleccionar 5 estrellas mediante coordenadas
      await barraEstrellas.click({
        position: {
          x: xEstrella5,
          y: yCentro
        }
      });
    }

    // Confirmar la puntuación seleccionada
    const confirmar = page
      .locator('button')
      .filter({ hasText: 'Puntuar' })
      .last();

    await confirmar.waitFor({
      state: 'visible',
      timeout: 10000
    });

    await confirmar.click({ force: true });

    // Capturar evidencia final del proceso
    await page.screenshot({
      path: 'puntuacion-final.png',
      fullPage: true
    });

    console.log(`Puntuación aplicada correctamente a: ${tituloPelicula}`);

  });

});