const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  timeout: 50000, // Le damos un poquito más de tiempo por si IMDb anda lento
  use: {
    baseURL: 'https://www.imdb.com',
    screenshot: 'on',
    video: 'retain-on-failure',
    
    // 🌍 FORZAR IDIOMA GLOBAL EN ESPAÑOL
    locale: 'es-ES',
    timezoneId: 'America/Bogota', // Puedes cambiarlo por tu zona horaria local

    // Engañamos a IMDb enviando encabezados de un navegador real de escritorio
    contextOptions: {
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      
      // Reforzamos el idioma dentro del contexto del navegador
      locale: 'es-ES',
      extraHTTPHeaders: {
        'Accept-Language': 'es-ES,es;q=0.9' // Le dice a IMDb: "Quiero la página en español"
      }
    }
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
});