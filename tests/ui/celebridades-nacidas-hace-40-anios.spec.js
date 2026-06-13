const { test } = require('@playwright/test');
const { NacidosHoyPage } = require('../../pages/NacidosHoyPage');

test.describe('IMDb - Celebridades nacidas hace 40 años', () => {

  test('Buscar celebridades nacidas hace exactamente 40 años y abrir primer enlace de descripción', async ({ page }) => {

    const nacidosHoyPage = new NacidosHoyPage(page);

    await page.goto('/', {
      waitUntil: 'domcontentloaded'
    });

  await nacidosHoyPage.navegarANacidosHoy();
await nacidosHoyPage.eliminarFiltroPredeterminado();
await nacidosHoyPage.seleccionarFechaNacimiento();
await nacidosHoyPage.buscarCelebridadesNacidasHace40Anios();
await nacidosHoyPage.verResultados();
await nacidosHoyPage.abrirPrimerLinkDescripcion();
await nacidosHoyPage.tomarCaptura("celebridad-nacida-hace-40-anios");

  });

});