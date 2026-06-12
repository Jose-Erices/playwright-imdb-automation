class ActorProfilePage {
  constructor(page) {
    this.page = page;
    this.allCreditsButton = page.locator('[data-testid="nm-flmg-all-credits"]');
    this.upcomingTab = page.locator('[id*="upcoming"], [id*="unreleased"], .ipc-accordion__item__header').first();
    this.thePrinceMovie = page.locator('a.ipc-metadata-list-summary-item__t').filter({ hasText: 'The Prince' }).first();
  }

  async desplegarProximosEstrenos() {
    await this.allCreditsButton.scrollIntoViewIfNeeded();
    await this.allCreditsButton.click();
    await this.page.waitForTimeout(1000); 

    await this.upcomingTab.scrollIntoViewIfNeeded();
    await this.upcomingTab.click();
    
    await this.page.waitForTimeout(1500);

    await this.upcomingTab.scrollIntoViewIfNeeded();
  }

  async obtenerEnlacePelicula() {
    const href = await this.thePrinceMovie.getAttribute('href');
    return href;
  }
}

module.exports = { ActorProfilePage };
