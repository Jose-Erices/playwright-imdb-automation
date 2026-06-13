const { test, expect } = require('@playwright/test');
const { BarraSuperiorPage } = require('../../pages/BarraSuperiorPage');
const { PerfilActorPage } = require('../../pages/PerfilActorPage');

test.describe('IMDb - Nicolas Cage', () => {

  test('Abrir primera película completada de próximos estrenos', async ({ page }) => {

    const barraSuperior = new BarraSuperiorPage(page);
    const perfilActor = new PerfilActorPage(page);

    // Navegar a IMDb
    await page.goto('https://www.imdb.com', {
      waitUntil: 'load'
    });

    // Buscar actor
    await barraSuperior.buscarActor('Nicolas Cage');

    // Esperar carga del perfil
    await page.waitForLoadState('domcontentloaded');

    // Desplegar sección Próximos Estrenos
    await perfilActor.desplegarProximosEstrenos();

    // Obtener enlace de la primera película completada
    const rutaPelicula = await perfilActor.obtenerEnlacePelicula();

    // Navegar a la película
    await page.goto(
      `https://www.imdb.com${rutaPelicula}`,
      {
        waitUntil: 'load'
      }
    );

    // Validar que estamos en el detalle de una película
    await expect(page).toHaveURL(
      /.*\/title\/.*/
    );

  });

});