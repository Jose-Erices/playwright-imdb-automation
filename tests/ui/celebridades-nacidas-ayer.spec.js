const { test } = require("@playwright/test");
const { NacidosHoyPage } = require("../../pages/NacidosHoyPage");

test.describe("IMDb - Celebridades nacidas ayer", () => {
  test("Buscar celebridades nacidas ayer y tomar captura del tercer resultado", async ({
    page,
  }) => {
    const nacidosHoyPage = new NacidosHoyPage(page);
    await page.goto("/", {
      waitUntil: "domcontentloaded",
    });

    await nacidosHoyPage.navegarANacidosHoy();

    await nacidosHoyPage.eliminarFiltroPredeterminado();

    await nacidosHoyPage.seleccionarCumpleanos();

    await nacidosHoyPage.buscarCelebridadesNacidasAyer();

    await nacidosHoyPage.verResultados();

    await nacidosHoyPage.seleccionarTercerResultado();

    await nacidosHoyPage.tomarCaptura("celebridad-nacida-ayer");
  });
});
