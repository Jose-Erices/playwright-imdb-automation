class TopBarPage {
  constructor(page) {
    this.page = page;
    this.searchInput = page.locator('input[id="suggestion-search"], input[name="q"]').first();
    this.firstActorResult = page.locator('.imdb-header__search-menu .ipc-list-item__text, [data-testid="search-result--const"]').first();
  }

  async buscarActor(nombre) {
    await this.searchInput.waitFor({ state: 'visible', timeout: 5000 });
    await this.searchInput.click();
    await this.searchInput.pressSequentially(nombre, { delay: 100 });
    
    await this.firstActorResult.waitFor({ state: 'visible', timeout: 6000 });
    await this.firstActorResult.click();
  }
}

module.exports = { TopBarPage };
