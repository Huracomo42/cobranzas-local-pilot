# Tecnología y plan de implementación — PILOT-004

> Estado: propuesta para aprobación en P4-11.
> Esta decisión selecciona la tecnología y define cómo iniciar la implementación, pero no autoriza todavía escribir código de producto ni instalar dependencias.

## 1. Identificación

* Proyectocs/REQUIREMENTS.md`.

* Dominio y diseño: `docs/DOMAIN-AND-DESIGN.md`.

* Slices y pruebas: `docs/IMPLEMENTATION-PLAN.md`.

* Entorno principal: Windows y Visual Studio Code.

* Agente de implementación: Claude Code.

* Repositorio: `Huracomo42/couna pila tecnológica que:

* implemente las 14 vertical slices;

* funcione como aplicación web local;

* conserve los datos en la computadora;

* permita transacciones financieras exactas;

* soporteea compatible con Windows;

* pueda ser mantenida por un único repositorio;

* reduzca la cantidad de tecnologías diferentes;

* permita construir una interfaz visualmente avanzada y accesible;

* sea adecuada para implementación asistida por Claude Code.

## 3. Decisión tecnológica principal

La aplicación se implementará como una aplicación web local de pila TypeScript.

### Componentes principales

| Área                         | Tecnología seleccionada                 |
| ---------------------------- | --------------------------------------- |
| Lenguaje                     | TypeScript                              |
| Entorno                      | Node.js 24 LTS                          |
| Gestor de paquetes           | npm                                     |
| Interfaz                     | React                                   |
| Build frontend               | Vite                                    |
| Estilos                      | Tailwind CSS                            |
| Componentes accesibles       | shadcn/ui con Base UI, de uso selectivo |
| Servidor local               | Fastify                                 |
| Validación de límites        | Zod                                     |
| Persistencia                 | SQLite                                  |
| Adaptador SQLite             | better-sqlite3                          |
| Pruebas unitarias            | Vitest                                  |
| Pruebas de componentes       | React Testing Library                   |
| Interacciones de componentes | Testing Library User Event              |
| Pruebas end-to-end           | Playwright                              |
| Accesibilidad automatizada   | axe-core mediante Playwright            |
| CI                           | GitHub Actions                          |
| Formato                      | Prettier                                |
| Análisis estático            | ESLint con soporte TypeScript           |

## 4. Versión de ejecución

### TEC-RUN-01

Se utilizará Node.js 24 LTS.

La versión inicialmente fijada será:

```text
24.18.0
```

Se registrará en:

```text
.nvmrc
.node-version
package.json
```

### TEC-RUN-02

No se utilizará una versión `Current` de Node para el piloto.

### TEC-RUN-03

El proyecto declarará:

```json
{
  "engines": {
    "node": ">=24 <25"
  }
}
```

### TEC-RUN-04

`package-lock.json` deberá versionarse y será la fuente exacta de versiones instaladas.

### TEC-RUN-05

Las instalaciones reproducibles utilizarán:

```powershell
npm ci
```

después de crear el lockfile inicial.

## 5. Razón para usar una sola pila TypeScript

TypeScript se utilizará tanto en frontend como en backend.

Esto permite:

* una sola sintaxis principal;
* tipos compartidos;
* menos cambio de contexto;
* validación consistente;
* reutilización de objetos y contratos;
* mejor navegación en VS Code;
* menor ambigüedad para Claude Code;
* una sola herramienta de paquetes;
* una sola suite principal de pruebas.

### TEC-TS-01

No se mezclará Python con TypeScript en el runtime del producto.

Python podrá seguir utilizándose como herramienta externa del entorno cuando sea necesario, pero no será una dependencia funcional de la aplicación.

### TEC-TS-02

El navegador no accederá directamente a SQLite.

Toda lectura o escritura pasará por el servidor local y los casos de uso.

## 6. Arquitectura física seleccionada

La aplicación tendrá dos partes ejecutadas desde el mismo repositorio:

1. frontend React;
2. servidor local Fastify.

En desarrollo:

```text
Navegador
    ↓
Vite
    ↓ /api
Fastify
    ↓
Aplicación y dominio
    ↓
SQLite
```

En ejecución local integrada:

```text
Navegador
    ↓
Fastify
    ├── sirve archivos frontend compilados
    └── atiende /api
          ↓
       Aplicación
          ↓
        Dominio
          ↓
        SQLite
```

### TEC-ARQ-01

El servidor escuchará únicamente en:

```text
127.0.0.1
```

No se expondrá por defecto a la red local.

### TEC-ARQ-02

El puerto propuesto para ejecución integrada será:

```text
3210
```

### TEC-ARQ-03

El frontend compilado será servido por el mismo proceso local que expone la API.

### TEC-ARQ-04

No se utilizará Electron durante PILOT-004.

### TEC-ARQ-05

No se utilizará Docker.

### TEC-ARQ-06

No se utilizará una base de datos remota ni servicios en la nube.

## 7. Frontend

### 7.1 React

React se utilizará para:

* formularios;
* vistas de clientes;
* vistas de deudas;
* filtros;
* resúmenes;
* confirmaciones;
* historial;
* papelera;
* restauración;
* mensajes;
* gestión de foco.

### 7.2 Vite

Vite será responsable de:

* servidor de desarrollo;
* transformación TypeScript;
* actualización rápida;
* compilación del frontend;
* generación de activos estáticos.

### 7.3 Tailwind CSS

Tailwind se utilizará para:

* diseño responsivo;
* espaciado;
* tipografía;
* estados visuales;
* foco;
* contraste;
* composición;
* sistema de tokens.

### TEC-FE-01

Tailwind no sustituirá la semántica HTML.

### TEC-FE-02

No se utilizarán clases visuales como única representación de un estado.

### TEC-FE-03

Los estilos repetidos podrán encapsularse en componentes, pero se evitará crear abstracciones antes de identificar repetición real.

## 8. Componentes accesibles

Se selecciona shadcn/ui con Base UI como fuente limitada de componentes accesibles.

No se instalará un catálogo completo.

Se incorporarán únicamente los componentes necesarios, por ejemplo:

* Button;
* Input;
* Label;
* Textarea;
* Select;
* Dialog;
* Alert Dialog;
* Table;
* Tabs, solo si resultan necesarias;
* Tooltip, solo para información complementaria;
* Toast o sistema equivalente de mensajes;
* Badge.

### TEC-CMP-01

Los componentes incorporados pasan a formar parte del repositorio y serán revisables.

### TEC-CMP-02

No se aceptará un componente sin revisar:

* semántica;
* teclado;
* foco;
* contraste;
* dependencias;
* comportamiento móvil;
* mensajes accesibles.

### TEC-CMP-03

Se preferirán controles HTML nativos cuando cumplan el comportamiento requerido.

### TEC-CMP-04

No se utilizarán componentes únicamente para decorar.

## 9. Servidor local

Fastify será responsable de:

* iniciar el servidor;
* servir el frontend compilado;
* recibir solicitudes;
* validar entradas estructurales;
* invocar casos de uso;
* devolver resultados;
* manejar errores;
* cerrar recursos;
* limitar el acceso al entorno local.

### TEC-SRV-01

Las rutas no contendrán reglas financieras.

### TEC-SRV-02

Los manejadores HTTP serán delgados.

Su secuencia será:

1. recibir;
2. validar estructura;
3. invocar caso de uso;
4. traducir resultado;
5. responder.

### TEC-SRV-03

Los errores del dominio no se transformarán en errores genéricos sin explicación.

### TEC-SRV-04

Las respuestas tendrán estructura estable:

```text
success
code
message
data
fieldErrors
warnings
```

## 10. API local

Se utilizará una API HTTP local bajo:

```text
/api
```

Grupos conceptuales:

```text
/api/health
/api/clients
/api/debts
/api/payments
/api/reversals
/api/trash
/api/backups
/api/summary
```

### TEC-API-01

La API no será pública ni se diseñará como servicio multiusuario.

### TEC-API-02

La presentación no enviará órdenes genéricas para reemplazar todo el estado.

Usará comandos específicos.

### TEC-API-03

Las confirmaciones ocurrirán en presentación, pero el servidor volverá a validar las precondiciones.

### TEC-API-04

Los valores monetarios viajarán como unidades mínimas enteras o como una representación textual estricta definida por contrato.

No viajarán como números binarios ambiguos.

## 11. Validación con Zod

Zod se utilizará en los límites técnicos:

* solicitudes HTTP;
* respuestas relevantes;
* configuración;
* contenido cargado;
* estructura de respaldos;
* variables de entorno;
* datos recibidos desde presentación.

### TEC-VAL-01

Zod no sustituirá las invariantes del dominio.

### TEC-VAL-02

Existirán dos niveles:

1. validación estructural con Zod;
2. validación de negocio en dominio.

### TEC-VAL-03

Los esquemas compartidos se ubicarán fuera de los componentes visuales y de los manejadores HTTP.

## 12. Persistencia SQLite

SQLite será la base de datos local.

La integración se realizará mediante:

```text
better-sqlite3
```

### Razones

* archivo local;
* transacciones;
* claves foráneas;
* restricciones;
* consultas estructuradas;
* respaldo;
* recuperación;
* tamaño muy superior a la escala prevista;
* ausencia de servidor externo;
* facilidad de pruebas en memoria o archivos temporales.

### TEC-DB-01

Se activarán claves foráneas:

```sql
PRAGMA foreign_keys = ON;
```

### TEC-DB-02

La política de journal deberá probarse antes de fijarla.

WAL será la opción inicial evaluada, no una suposición irreversible.

### TEC-DB-03

Las operaciones financieras utilizarán transacciones.

### TEC-DB-04

No se utilizará un ORM en PILOT-004.

Se utilizarán:

* repositorios explícitos;
* SQL parametrizado;
* migraciones revisables;
* mapeos controlados.

### Razón para no usar ORM

Para la escala y dominio del piloto, un ORM:

* añade una abstracción adicional;
* puede ocultar SQL y transacciones;
* aumenta dependencias;
* no elimina la necesidad de comprender las restricciones;
* dificulta revisar con precisión algunas operaciones financieras.

## 13. Representación monetaria

Se selecciona la representación mediante unidades monetarias mínimas enteras.

Ejemplos:

```text
S/ 100.00 → 10000
USD 50.25 → 5025
```

En código conceptual:

```text
amountMinor: integer
currency: PEN | USD
```

En SQLite:

```text
amount_minor INTEGER NOT NULL
currency TEXT NOT NULL
```

### TEC-MON-01

No se almacenarán importes financieros como `REAL`.

### TEC-MON-02

Toda conversión desde entrada decimal deberá validarse antes de producir unidades mínimas.

### TEC-MON-03

Toda operación deberá verificar enteros seguros.

### TEC-MON-04

La presentación formateará el valor, pero no realizará el cálculo financiero oficial.

### TEC-MON-05

PEN y USD nunca se sumarán.

## 14. Fechas y tiempo

### Fecha civil

Se almacenará como texto ISO:

```text
YYYY-MM-DD
```

Aplicable a:

* vencimiento;
* fecha declarada del pago.

### Instante

Se almacenará como texto ISO UTC:

```text
YYYY-MM-DDTHH:mm:ss.sssZ
```

Aplicable a:

* creación;
* modificación;
* reversión;
* registro;
* respaldo.

### TEC-DATE-01

No se construirá una fecha civil mediante conversiones UTC que puedan cambiar el día.

### TEC-DATE-02

La infraestructura proporcionará `Clock`.

### TEC-DATE-03

Las pruebas utilizarán un reloj fijo.

### TEC-DATE-04

La zona horaria del sistema solo se utilizará para determinar la fecha civil local actual.

## 15. Identificadores

Se utilizarán identificadores UUID generados por Node.

### TEC-ID-01

Se usará:

```text
crypto.randomUUID()
```

### TEC-ID-02

Los identificadores serán:

* opacos;
* estables;
* no editables;
* no reutilizables.

### TEC-ID-03

Los identificadores de prueba podrán ser deterministas mediante un generador sustituible.

## 16. Estructura física propuesta

```text
cobranzas-local-pilot/
  src/
    domain/
      clients/
      debts/
      payments/
      shared/

    application/
      clients/
      debts/
      payments/
      backups/
      ports/

    infrastructure/
      database/
        migrations/
        repositories/
        connection/
      backup/
      clock/
      identifiers/
      logging/
      paths/

    server/
      routes/
      schemas/
      errors/
      bootstrap/

    presentation/
      app/
      pages/
      components/
      forms/
      accessibility/
      api/
      state/
      styles/

    shared/
      contracts/
      result/

  tests/
    domain/
    application/
    infrastructure/
    server/
    presentation/
    end-to-end/
    fixtures/
    helpers/

  scripts/
    start-app.ps1
    reset-demo.ps1
    verify-environment.ps1

  data/
    .gitkeep

  docs/
  workflow/
```

La estructura podrá ajustarse durante el scaffolding si conserva las responsabilidades aprobadas.

## 17. Ubicación de datos locales

En Windows se utilizará una carpeta equivalente a:

```text
%LOCALAPPDATA%\CobranzasLocal\
```

Subdirectorios:

```text
CobranzasLocal/
  data/
    cobranzas.sqlite

  backups/
    <backup-id>.sqlite

  logs/
    application.log
```

### TEC-PATH-01

La ruta no se codificará directamente en componentes o casos de uso.

### TEC-PATH-02

La infraestructura resolverá la ruta.

### TEC-PATH-03

En pruebas se utilizarán directorios temporales.

### TEC-PATH-04

El repositorio ignorará:

```text
data/*
backups/*
logs/*
*.sqlite
*.sqlite-shm
*.sqlite-wal
```

## 18. Migraciones

Las migraciones serán archivos SQL secuenciales.

Ejemplo:

```text
001_initial_schema.sql
002_add_backup_metadata.sql
```

Se mantendrá una tabla:

```text
schema_migrations
```

### TEC-MIG-01

Cada migración tendrá:

* número;
* nombre;
* fecha;
* SQL;
* prueba;
* reversibilidad documentada.

### TEC-MIG-02

No se editará una migración ya aplicada en una versión compartida.

### TEC-MIG-03

Antes de una migración sobre datos existentes se intentará crear respaldo.

### TEC-MIG-04

Una migración fallida no marcará la versión como aplicada.

## 19. Respaldos

Los respaldos utilizarán una operación de backup válida de SQLite expuesta por el adaptador seleccionado.

### TEC-BKP-01

No se copiará el archivo de base de datos de manera ingenua mientras exista una transacción activa.

### TEC-BKP-02

El respaldo deberá producir un archivo SQLite validable.

### TEC-BKP-03

Después de crearlo se verificará:

* existencia;
* apertura;
* versión;
* integridad;
* contenido mínimo esperado.

### TEC-BKP-04

Solo después de validar el nuevo respaldo podrá eliminarse el sexto respaldo automático.

### TEC-BKP-05

El catálogo de respaldos se mantendrá fuera del contenido restaurado.

### TEC-BKP-06

Restaurar seguirá esta secuencia:

1. seleccionar;
2. validar;
3. confirmar;
4. intentar respaldo previo;
5. cerrar acceso de escritura;
6. preparar estado restaurado;
7. validar;
8. sustituir;
9. reabrir;
10. recalcular derivados;
11. informar.

## 20. Pruebas unitarias y de integración

Se utilizará Vitest para:

* dominio;
* aplicación;
* utilidades;
* contratos;
* repositorios;
* migraciones;
* servidor;
* fallos simulados.

### TEC-TEST-01

Las pruebas de dominio no cargarán React, Fastify ni SQLite.

### TEC-TEST-02

Las pruebas de aplicación usarán dobles de los puertos.

### TEC-TEST-03

Las pruebas de persistencia utilizarán bases temporales independientes.

### TEC-TEST-04

No se compartirán bases modificables entre pruebas.

### TEC-TEST-05

Las pruebas financieras no usarán snapshots como verificación principal.

Usarán valores explícitos.

## 21. Pruebas de componentes

Se utilizarán:

```text
@testing-library/react
@testing-library/user-event
```

Las pruebas deberán interactuar mediante:

* roles;
* etiquetas;
* texto visible;
* nombres accesibles.

### TEC-COMPTEST-01

No se consultará como primera opción por clases CSS internas.

### TEC-COMPTEST-02

No se probará el estado interno de React.

### TEC-COMPTEST-03

Los formularios se probarán como los usa una persona.

## 22. Pruebas end-to-end

Se utilizará Playwright.

Entornos:

* Chromium administrado por Playwright en CI;
* Microsoft Edge instalado localmente para verificación adicional;
* viewport de escritorio;
* viewport estrecho representativo.

### TEC-E2E-01

Los escenarios serán los definidos en VS-14.

### TEC-E2E-02

Las pruebas iniciarán con datos temporales o fixtures controlados.

### TEC-E2E-03

No utilizarán la base operativa real.

### TEC-E2E-04

Los localizadores preferirán:

* `getByRole`;
* `getByLabel`;
* `getByText` cuando sea estable.

### TEC-E2E-05

Los identificadores de prueba se utilizarán solo cuando no exista una alternativa semántica razonable.

## 23. Accesibilidad

Se utilizará:

```text
@axe-core/playwright
```

La automatización se complementará con revisión manual.

### Verificaciones manuales obligatorias

* recorrido completo con teclado;
* foco visible;
* apertura y cierre de diálogo;
* retorno de foco;
* lectura de etiquetas;
* mensajes dinámicos;
* estado vencido sin depender del color;
* zoom;
* contraste;
* flujo financiero completo.

### TEC-A11Y-01

Una prueba axe en verde no equivale a accesibilidad completa.

### TEC-A11Y-02

Cada slice con interfaz tendrá criterios manuales y automatizados.

## 24. CI

GitHub Actions se configurará después de la fase roja inicial.

El workflow ejecutará:

```text
npm ci
npm run format:check
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:e2e
```

### Entorno principal

```text
windows-latest
```

Se selecciona Windows porque:

* es el entorno operativo del usuario;
* permite verificar rutas locales;
* permite verificar scripts PowerShell;
* reduce diferencias en componentes nativos.

### Entorno secundario

Podrá incorporarse:

```text
ubuntu-latest
```

para detectar dependencias accidentales del sistema, pero no será condición inicial de P4-12.

### TEC-CI-01

Se utilizará `actions/setup-node` con Node 24.

### TEC-CI-02

No se versionarán secretos.

### TEC-CI-03

CI utilizará datos temporales.

## 25. Scripts npm previstos

```json
{
  "scripts": {
    "dev": "iniciar frontend y servidor de desarrollo",
    "build": "compilar servidor y frontend",
    "start": "iniciar aplicación compilada",
    "app": "compilar si corresponde, iniciar servidor y abrir navegador",
    "test": "ejecutar pruebas Vitest",
    "test:watch": "ejecutar Vitest en observación",
    "test:e2e": "ejecutar Playwright",
    "test:a11y": "ejecutar escenarios de accesibilidad",
    "typecheck": "verificar TypeScript sin emitir",
    "lint": "ejecutar ESLint",
    "format": "aplicar Prettier",
    "format:check": "verificar formato"
  }
}
```

Las implementaciones exactas se establecerán durante el scaffolding.

## 26. Inicio local

El flujo objetivo para el usuario será:

```powershell
npm install
npm run app
```

Después de contar con lockfile:

```powershell
npm ci
npm run app
```

El script `app` deberá:

1. verificar requisitos;
2. iniciar el servidor local;
3. esperar respuesta de salud;
4. abrir Microsoft Edge o el navegador predeterminado;
5. mostrar la dirección local;
6. permitir detener con `Ctrl+C`.

## 27. Reversión técnica

### Dependencias

Para restaurar una instalación limpia:

```powershell
Remove-Item -Recurse -Force node_modules
npm ci
```

### Build

```powershell
Remove-Item -Recurse -Force dist
npm run build
```

### Datos de demostración

Se creará un script específico:

```powershell
npm run demo:reset
```

Este script no podrá operar sobre la base real sin una confirmación diferenciada.

### TEC-REV-01

No se indicará eliminar manualmente `%LOCALAPPDATA%\CobranzasLocal` como procedimiento normal.

### TEC-REV-02

Toda reversión de datos reales utilizará respaldo.

## 28. Decisiones rechazadas

## 28.1 Python + frontend JavaScript

Rechazado para el piloto porque:

* introduce dos ecosistemas;
* duplica configuración;
* aumenta el cambio de contexto;
* dificulta compartir contratos;
* no aporta una ventaja necesaria para esta aplicación.

## 28.2 Aplicación solo en navegador con localStorage

Rechazado porque:

* limita control sobre archivos;
* dificulta respaldos robustos;
* complica restauración;
* no ofrece transacciones equivalentes a SQLite;
* aumenta riesgo de borrar datos del navegador.

## 28.3 IndexedDB como persistencia principal

Rechazado porque:

* queda vinculada al perfil del navegador;
* complica respaldos externos controlados;
* dificulta la inspección y recuperación manual;
* no mejora el objetivo de aplicación local.

## 28.4 Electron

Rechazado en PILOT-004 porque:

* añade empaquetado;
* añade otro runtime de navegador;
* aumenta superficie de actualización;
* no es necesario para probar el workflow.

Podrá reconsiderarse fuera del piloto.

## 28.5 Base de datos remota

Rechazada porque:

* el producto es local;
* no requiere multiusuario;
* introduce autenticación y red;
* aumenta riesgos y alcance.

## 28.6 ORM

Rechazado para mantener transacciones y SQL visibles.

## 28.7 `node:sqlite`

Diferido porque la API incluida en Node 24 todavía no se considera estable para esta decisión.

## 29. Skills seleccionados

Los skills se utilizarán como asistencia controlada.

## 29.1 UI UX Pro Max

Rol:

* proponer sistema visual;
* generar referencias de composición;
* revisar jerarquía;
* proponer tokens;
* evaluar patrones por tipo de producto.

Uso permitido:

* antes de construir la estructura visual;
* en revisiones de diseño;
* para alternativas visuales.

Uso prohibido:

* modificar reglas;
* generar datos financieros;
* seleccionar dependencias sin revisión;
* sobreescribir componentes funcionales completos sin prueba.

## 29.2 Emil Design Engineering

Rol:

* refinar interacción;
* revisar microinteracciones;
* evaluar claridad y calidad percibida;
* revisar animaciones y estados;
* evitar interfaz genérica.

Uso permitido:

* después de tener una ruta funcional;
* durante refinamiento;
* en revisión visual independiente.

Uso prohibido:

* introducir animaciones que afecten accesibilidad;
* retrasar la operación;
* ocultar información;
* sustituir pruebas.

## 29.3 Skill de shadcn/ui

Podrá utilizarse exclusivamente para:

* instalar componentes seleccionados;
* consultar patrones;
* mantener componentes fuente;
* migraciones controladas del sistema de componentes.

## 29.4 Política de instalación

Los skills deberán:

1. instalarse después de aprobar P4-11;
2. fijarse a una versión, tag o commit;
3. registrarse en el log;
4. revisarse antes de uso;
5. limitarse al alcance declarado;
6. poder eliminarse sin afectar el producto.

### TEC-SKL-01

No se instalará un skill únicamente por popularidad.

### TEC-SKL-02

El resultado de un skill será una propuesta, no una orden.

### TEC-SKL-03

Claude Code deberá indicar qué skill utilizó en cada cambio relevante.

## 30. Dependencias iniciales previstas

### Producción

```text
react
react-dom
fastify
@fastify/static
zod
better-sqlite3
```

Los componentes shadcn añadirán únicamente sus dependencias necesarias.

### Desarrollo

```text
typescript
vite
@vitejs/plugin-react
vitest
jsdom
@testing-library/react
@testing-library/dom
@testing-library/user-event
@playwright/test
@axe-core/playwright
eslint
prettier
tsx
concurrently
```

La lista definitiva surgirá del scaffolding aprobado y será revisada antes del primer commit de implementación.

## 31. Secuencia de instalación prevista

Después de cerrar P4-11:

### Paso 1 — verificar entorno

```powershell
node --version
npm --version
git status
```

### Paso 2 — crear rama de fase roja

```powershell
git switch -c pilot-004/p4-12-red-phase
```

### Paso 3 — crear scaffolding mínimo

Se crearán únicamente:

* configuración;
* estructura;
* runner de pruebas;
* primeras pruebas de VS-01;
* scripts mínimos;
* documentación del entorno.

### Paso 4 — verificar fase roja

La fase roja deberá mostrar pruebas:

* ejecutables;
* fallando por comportamiento ausente;
* no fallando por configuración.

### Paso 5 — PR de fase roja

No se implementará VS-01 dentro de la misma revisión que verifica P4-12.

## 32. Orden técnico de implementación

La implementación seguirá las slices aprobadas.

En cada slice:

1. revisar requisitos;
2. crear o ajustar rama;
3. escribir pruebas;
4. verificar rojo;
5. implementar dominio;
6. implementar aplicación;
7. implementar persistencia incremental;
8. implementar API;
9. implementar presentación;
10. ejecutar pruebas;
11. revisar accesibilidad;
12. actualizar evidencia;
13. abrir PR;
14. realizar revisión independiente;
15. corregir;
16. autorizar merge.

## 33. Política de ramas

Formato:

```text
pilot-004/vs-01-empty-state
pilot-004/vs-02-client-management
pilot-004/vs-03-debt-registration
```

Para gates transversales:

```text
pilot-004/p4-12-red-phase
pilot-004/p4-15-ci
```

### TEC-GIT-01

Una rama tendrá un objetivo principal.

### TEC-GIT-02

No se reutilizará una rama ya integrada.

### TEC-GIT-03

Cada merge será autorizado explícitamente.

## 34. Política de commits

Formato recomendado:

```text
test: add failing empty-state specifications
feat: implement valid empty operational state
fix: preserve confirmed state after write failure
docs: record VS-01 evidence
```

### TEC-COM-01

No se agruparán cambios sin relación.

### TEC-COM-02

Los commits deberán conservar una historia comprensible.

### TEC-COM-03

No se incluirán datos operativos.

## 35. Riesgos tecnológicos

### RT-01 — Dependencia nativa SQLite

Riesgo:

`better-sqlite3` utiliza un componente nativo.

Mitigación:

* Node LTS;
* versión compatible;
* lockfile;
* comprobación temprana en Windows;
* CI Windows;
* plan de sustitución encapsulado mediante puerto.

### RT-02 — Complejidad frontend

Mitigación:

* componentes limitados;
* sin estado global prematuro;
* sin librería adicional de gestión de estado inicialmente;
* slices pequeñas;
* pruebas de comportamiento.

### RT-03 — Dependencias de componentes

Mitigación:

* incorporar solo componentes usados;
* revisar diff;
* evitar instalación masiva.

### RT-04 — Respaldo durante escritura

Mitigación:

* transacciones;
* API válida de respaldo;
* prueba de fallos;
* validación posterior.

### RT-05 — Desviación producida por skills

Mitigación:

* requisitos congelados;
* registro;
* revisión;
* capacidad de reversión.

## 36. Gates técnicos antes de implementar

Antes de iniciar P4-12 deberá verificarse que:

* Node 24 puede instalarse o ya está disponible;
* npm funciona;
* Git está limpio;
* Claude Code puede operar en el repositorio;
* el usuario comprende dónde se almacenarán los datos;
* no se utilizarán datos reales durante el piloto;
* la instalación será reversible;
* la lista de dependencias está aprobada;
* los skills seleccionados están aprobados.

## 37. Criterios de aprobación de P4-11

P4-11 podrá cerrarse cuando el responsable humano confirme:

* TypeScript como lenguaje único;
* Node 24 LTS;
* React y Vite;
* Tailwind;
* shadcn/ui de uso selectivo;
* Fastify;
* Zod;
* SQLite;
* better-sqlite3;
* dinero en unidades mínimas enteras;
* fechas civiles ISO;
* UUID;
* Vitest;
* React Testing Library;
* Playwright;
* axe-core;
* GitHub Actions en Windows;
* datos en `%LOCALAPPDATA%`;
* ausencia de Electron, Docker, ORM y nube;
* selección controlada de skills;
* secuencia de implementación;
* política de ramas y commits;
* plan de instalación y reversión.

## 38. Estado final de la propuesta

La tecnología y el plan de implementación permanecen propuestos y pendientes de:

1. revisión metodológica;
2. presión técnica;
3. aprobación humana;
4. integración documental.

No se instalarán dependencias ni se escribirá código antes de completar esas acciones.
