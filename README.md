<<<<<<< HEAD
# Desafío de Automatización IMDb y PokeAPI

## Descripción

Este proyecto contiene la implementación de pruebas automatizadas de interfaz de usuario (UI) y pruebas de API desarrolladas como solución al desafío técnico propuesto.

## Tecnologías Utilizadas

### Automatización UI

* Playwright
* JavaScript
* Node.js
* Patrón Page Object Model (POM)

### Automatización API

* Cypress
* JavaScript

---

# Estructura del Proyecto

```text
pages/
├─ BarraSuperiorPage.js
├─ PerfilActorPage.js
├─ TaquillaPage.js
├─ SeriesPage.js
├─ NacidosHoyPage.js

tests/
├─ api/
│  ├─ berry-id.cy.js
│  ├─ berry-name.cy.js
│  └─ berry-flavor.cy.js
│
└─ ui/
   ├─ nicolas_cage.spec.js
   ├─ peliculas-mas-taquilleras.spec.js
   ├─ breaking-bad-fotos.spec.js
   ├─ celebridades-nacidas-ayer.spec.js
   └─ celebridades-nacidas-hace-40-anios.spec.js
```

---

# Instalación

Instalar dependencias del proyecto:

```bash
npm install
```

Instalar navegadores de Playwright:

```bash
npx playwright install
```

---

# Ejecución de Pruebas UI

Ejecutar todos los casos en Chromium:

```bash
npx playwright test --project=chromium
```

Ejecutar todos los casos en Firefox:

```bash
npx playwright test --project=firefox
```

### Caso 1 - Nicolas Cage

```bash
npx playwright test tests/ui/nicolas_cage.spec.js --headed --project=chromium
```

### Caso 2 - Películas más taquilleras

```bash
npx playwright test tests/ui/peliculas-mas-taquilleras.spec.js --headed --project=chromium
```

### Caso 3 - Fotos de Breaking Bad

```bash
npx playwright test tests/ui/breaking-bad-fotos.spec.js --headed --project=chromium
```

### Caso 4 - Celebridades nacidas ayer

```bash
npx playwright test tests/ui/celebridades-nacidas-ayer.spec.js --headed --project=chromium
```

### Caso 5 - Celebridades nacidas hace 40 años

```bash
npx playwright test tests/ui/celebridades-nacidas-hace-40-anios.spec.js --headed --project=chromium
```

---

# Ejecución de Pruebas API

Ejecutar todos los casos API:

```bash
npx cypress run --e2e --spec "tests/api/**/*.cy.js"
```

### Berry por ID

```bash
npx cypress run --e2e --spec "tests/api/berry-id.cy.js"
```

### Berry por Nombre

```bash
npx cypress run --e2e --spec "tests/api/berry-name.cy.js"
```

### Berry Flavor

```bash
npx cypress run --e2e --spec "tests/api/berry-flavor.cy.js"
```

---

# Cobertura de Pruebas

## Casos UI

1. Búsqueda de Nicolas Cage y apertura de la primera película completada en próximos estrenos.
2. Navegación a películas más taquilleras y calificación de una película.
3. Filtrado de fotografías de Breaking Bad por Danny Trejo.
4. Búsqueda de celebridades nacidas ayer y apertura del tercer resultado.
5. Búsqueda de celebridades nacidas el mismo día de hoy, pero hace exactamente 40 años.

## Casos API

1. Consulta de Berry mediante ID válido e inválido.
2. Consulta de Berry mediante nombre válido e inválido.
3. Consulta de Berry Flavor y validación de la baya con mayor potencia para sabor picante.

---

# Autor

**Jose Antonio Erices Gonzalez**

Solución desarrollada utilizando Playwright y Cypress para pruebas automatizadas UI y API.
=======
# playwright-imdb-automation
Proyecto QA Automation con Playwright y JavaScript, enfocado en pruebas end-to-end UI sobre IMDb y validaciones API, utilizando Page Object Model.
>>>>>>> 81dbd90044749c6974e7baea8b437c105ebb2b60
