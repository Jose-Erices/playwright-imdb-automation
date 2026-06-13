const { test } = require("@playwright/test");
const { TaquillaPage } = require("../../pages/TaquillaPage");

test.describe("IMDb - Películas Más Taquilleras", () => {
  test("Calificar segunda película con 5 estrellas", async ({ page }) => {
    const taquillaPage = new TaquillaPage(page);

    // Navegar a IMDb
    await page.goto("/", {
      waitUntil: "domcontentloaded",
    });

    // Abrir menú y navegar a Taquilla Superior
    await taquillaPage.navegarATaquillaSuperior();

    // Abrir segunda película del ranking
    await taquillaPage.abrirSegundaPelicula();

    // Calificar con cinco estrellas
    await taquillaPage.calificarConCincoEstrellas();
  });
});
