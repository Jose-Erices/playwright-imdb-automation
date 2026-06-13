const { test } = require('@playwright/test');
const { SeriesPage } = require('../../pages/SeriesPage');

test.describe('IMDb - Breaking Bad Fotos', () => {

  test('Filtrar fotos por Danny Trejo y abrir la segunda foto', async ({ page }) => {

    const seriesPage = new SeriesPage(page);

    await page.goto('https://www.imdb.com', {
      waitUntil: 'domcontentloaded'
    });

    await seriesPage.navegarATop250Series();

    await seriesPage.abrirBreakingBad();

    await seriesPage.irAFotos();

    await seriesPage.filtrarPorDannyTrejo();

    await seriesPage.abrirSegundaFoto();

  });

});