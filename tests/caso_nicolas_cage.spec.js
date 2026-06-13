const { test, expect } = require('@playwright/test'); 
const { TopBarPage } = require('../pages/TopBarPage');
const { ActorProfilePage } = require('../pages/ActorProfilePage');

test.describe('Desafío IMDb - QA Automation', () => {
  test('Escenario 1: Próximos estrenos de Nicolas Cage', async ({ page }) => {
    const topBar = new TopBarPage(page);
    const actorProfile = new ActorProfilePage(page);

    await page.goto('https://www.imdb.com', { waitUntil: 'load', timeout: 30000 });
    await topBar.buscarActor('Nicolas Cage');
    
    await page.waitForLoadState('domcontentloaded');

    try {
      await page.waitForSelector('[data-testid="nm-flmg-all-credits"]', { timeout: 6000 });
    } catch (error) {
      await page.reload({ waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(2000);
    }
    
    await actorProfile.desplegarProximosEstrenos();
    
    const pelicula = page.locator('a.ipc-metadata-list-summary-item__t').filter({ hasText: 'The Prince' }).first();
    
    await expect(pelicula).toBeAttached();
    
    const rutaPelicula = await actorProfile.obtenerEnlacePelicula();
    
    await page.goto(`https://www.imdb.com${rutaPelicula}`, { waitUntil: 'load' });

    await expect(page).toHaveURL(/.*\/title\/.*/, { timeout: 15000 });
  });
});
