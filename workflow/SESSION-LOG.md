# Registro de sesión — PILOT-004

## Convención

Cada entrada debe registrar:

* fecha;
* gate;
* contexto;
* actividad;
* archivos afectados;
* evidencia;
* resultado;
* decisión humana;
* siguiente estado.

No se registrarán resultados futuros ni acciones todavía no ejecutadas.

---

## Entrada P4-0

* Fecha: 19 de julio de 2026
* Gate: P4-0
* Contexto: diseño conceptual
* Actividad: aprobación del alcance formal provisional y del criterio de éxito end-to-end.
* Archivos afectados: ninguno en el repositorio nuevo.
* Evidencia: conversación de preparación y paquete operativo.
* Resultado: aprobado.
* Decisión humana: autorización explícita de Hugo Cornejo Villena.
* Siguiente estado: preparar paquete operativo.

## Entrada P4-1

* Fecha: 19 de julio de 2026
* Gate: P4-1
* Contexto: diseño metodológico
* Actividad: aprobación del paquete operativo conceptual.
* Archivos afectados: ninguno en el repositorio nuevo.
* Evidencia: autorización explícita.
* Resultado: cerrado.
* Decisión humana: incorporación documental autorizada.
* Siguiente estado: incorporar paquete al repositorio metodológico.

## Entrada P4-2

* Fecha: 19 de julio de 2026
* Gate: P4-2
* Contexto: repositorio metodológico
* Actividad: incorporación del paquete operativo mediante PR #16.
* Archivos afectados: `docs/PILOT-004-operational-package.md` en `workflow-ai-sandbox`.
* Evidencia: merge commit `bac26b3cc0e7b3429aa2671e74885cc463c2c254`.
* Resultado: cerrado.
* Decisión humana: merge autorizado.
* Siguiente estado: crear repositorio nuevo.

## Entrada P4-3

* Fecha: 19 de julio de 2026
* Gate: P4-3
* Contexto: bootstrap
* Actividad: creación y clonación del repositorio `Huracomo42/cobranzas-local-pilot`.
* Archivos afectados: ninguno.
* Evidencia: repositorio público vacío y remoto `origin` verificado.
* Resultado: cerrado.
* Decisión humana: creación autorizada.
* Siguiente estado: incorporar snapshot del workflow.

## Entrada P4-4

* Fecha: 19 de julio de 2026
* Gate: P4-4
* Contexto: bootstrap del repositorio nuevo
* Actividad: preparación del snapshot versionado y autocontenido.
* Archivos previstos:

  * `docs/PILOT-004-operational-package.md`
  * `workflow/WORKFLOW.md`
  * `workflow/GATES.md`
  * `workflow/INSTALLATION-MANIFEST.md`
  * `workflow/SESSION-LOG.md`
  * `workflow/SKILLS-INVENTORY.md`
- Evidencia: commit de bootstrap `1180fa3b5d15f8f3ed144d28b0f480fb8c2affbb`, seis archivos incorporados y repositorio local sincronizado con `origin/main`.
- Resultado: cerrado.
- Decisión humana: snapshot verificado y aceptado.
- Siguiente estado: iniciar investigación del problema, usuario y contexto en P4-5.

## Entrada P4-5 — en curso

- Fecha: 19 de julio de 2026
- Gate: P4-5
- Contexto: descubrimiento e investigación
- Actividad:
  - investigación preliminar del problema;
  - delimitación del usuario provisional;
  - identificación del flujo actual probable;
  - análisis inicial de privacidad, seguridad y accesibilidad;
  - identificación de alternativas existentes;
  - registro de skills frontend candidatas;
  - clasificación de afirmaciones como hechos, inferencias y vacíos documentales.
- Archivos afectados:
  - `docs/PROJECT-CHARTER.md`
  - `workflow/GATES.md`
  - `workflow/SESSION-LOG.md`
- Evidencia:
  - borrador de descubrimiento contenido en `docs/PROJECT-CHARTER.md`;
  - ausencia de código de producto;
  - ausencia de selección tecnológica;
  - skills registradas únicamente como candidatas.
- Resultado: investigación documentada y pendiente de revisión humana.
- Decisión humana: elaboración del borrador autorizada.
- Siguiente estado: revisar la investigación y resolver los vacíos necesarios para cerrar P4-5.

### Desviación DEV-P4-01

- Hecho: la PR #1 fue fusionada antes de la autorización metodológica final.
- Evaluación: desviación operativa no bloqueante.
- Impacto:
  - únicamente documentación;
  - tres archivos modificados;
  - sin código ni decisión tecnológica.
- Medida preventiva: ninguna PR futura será fusionada antes de recibir autorización explícita.
- Estado: registrada.

## Entrada P4-5 — cierre

- Fecha: 19 de julio de 2026
- Gate: P4-5
- Contexto: decisiones humanas de descubrimiento
- Actividad:
  - definición del usuario principal;
  - delimitación del tipo y volumen de deudas;
  - decisión sobre fechas, pagos parciales y reversión;
  - reglas de edición, eliminación y archivo;
  - selección de filtros y resumen mínimo;
  - incorporación de respaldo automático local;
  - definición del nivel visual para evaluar skills;
  - establecimiento del criterio mínimo de utilidad.
- Evidencia: decisiones explícitas del responsable humano incorporadas en `docs/PROJECT-CHARTER.md`.
- Cambios de alcance aceptados:
  - pagos parciales;
  - reversión de pagos;
  - respaldo automático;
  - archivo de clientes;
  - demostración visual avanzada.
- Resultado: problema, usuario y contexto suficientemente investigados.
- Decisión humana: P4-5 aprobado.
- Siguiente estado: revisar y aprobar el Project Charter en P4-6.

## Entrada P4-6 — cierre

- Fecha: 19 de julio de 2026
- Gate: P4-6
- Contexto: aprobación del Project Charter
- Actividad: revisión y aprobación formal del Project Charter de PILOT-004.
- Evidencia: aprobación explícita del responsable humano.
- Resultado: Project Charter aprobado.
- Decisión humana: P4-6 cerrado.
- Siguiente estado: iniciar presión y congelamiento de requisitos.

## Entrada P4-7 — en curso

- Fecha: 19 de julio de 2026
- Gate: P4-7
- Contexto: presión de requisitos
- Actividad:
  - definición de reglas monetarias;
  - selección de monedas;
  - definición de pagos parciales y excedentes;
  - trazabilidad de reversiones;
  - bloqueo de edición después del primer pago;
  - definición de papelera;
  - archivo y reactivación de clientes;
  - cálculo automático de estados;
  - definición de respaldo y restauración;
  - filtros y orden configurable;
  - criterios de accesibilidad;
  - criterios de evaluación de skills.
- Decisiones relevantes:
  - pagos superiores al saldo generan saldo a favor;
  - las deudas nunca presentan saldo negativo;
  - los pagos revertidos permanecen en el historial;
  - la eliminación es recuperable;
  - los totales se separan por moneda;
  - se conservan cinco respaldos;
  - la restauración es manual;
  - se exige soporte para lector de pantalla.
- Archivos afectados:
  - `docs/REQUIREMENTS.md`
  - `workflow/GATES.md`
  - `workflow/SESSION-LOG.md`
- Resultado: requisitos documentados y pendientes de presión final.
- Decisión humana: elaboración autorizada.
- Siguiente estado: revisar casos límite y autorizar congelamiento.

## Entrada P4-7 — cierre

- Fecha: 19 de julio de 2026
- Gate: P4-7
- Contexto: congelamiento de requisitos
- Actividad: revisión, presión final y aprobación formal de requisitos funcionales y no funcionales.
- Evidencia:
  - `docs/REQUIREMENTS.md`;
  - aprobación explícita del responsable humano;
  - ambigüedades de clientes, fechas de pago y confirmaciones corregidas.
- Resultado: requisitos congelados.
- Decisión humana: P4-7 cerrado.
- Siguiente estado: iniciar modelado de dominio.

## Entrada P4-8 — en curso

- Fecha: 19 de julio de 2026
- Gate: P4-8
- Contexto: modelado de dominio
- Actividad:
  - identificación de agregados;
  - modelado de Cliente, Deuda, Pago, Reversión y Respaldo;
  - definición de invariantes monetarias;
  - modelado de saldo pendiente y saldo a favor;
  - derivación de estados;
  - diferenciación entre archivo y papelera;
  - definición de eventos y comandos;
  - identificación de errores y estados imposibles;
  - trazabilidad hacia requisitos congelados.
- Archivos afectados:
  - `docs/DOMAIN-AND-DESIGN.md`;
  - `workflow/GATES.md`;
  - `workflow/SESSION-LOG.md`.
- Restricciones respetadas:
  - sin arquitectura técnica;
  - sin selección tecnológica;
  - sin instalación de skills;
  - sin código.
- Resultado: modelo de dominio propuesto y pendiente de presión final.
- Decisión humana: elaboración autorizada.
- Siguiente estado: revisar invariantes y aprobar P4-8.

## Entrada P4-8 — cierre

- Fecha: 19 de julio de 2026
- Gate: P4-8
- Contexto: aprobación del modelo de dominio
- Actividad:
  - revisión de entidades, agregados e invariantes;
  - presión del diseño de respaldos;
  - eliminación de la recursividad entre estado operativo y catálogo de respaldos;
  - aprobación humana formal.
- Evidencia:
  - `docs/DOMAIN-AND-DESIGN.md`;
  - invariantes de Cliente, Deuda, Pago, Reversión, Papelera y Respaldo;
  - aprobación explícita del responsable humano.
- Resultado: modelo de dominio aprobado.
- Decisión humana: P4-8 cerrado.
- Siguiente estado: iniciar diseño técnico.

## Entrada P4-9 — en curso

- Fecha: 19 de julio de 2026
- Gate: P4-9
- Contexto: diseño técnico conceptual
- Actividad:
  - definición de arquitectura lógica;
  - separación entre presentación, aplicación, dominio, persistencia e infraestructura;
  - diseño del flujo de comandos;
  - definición de consistencia y escritura segura;
  - diseño de persistencia, respaldos y migraciones;
  - tratamiento conceptual de dinero, fechas e identificadores;
  - diseño de accesibilidad y recuperación de errores;
  - estrategia de pruebas por capas;
  - reglas para futura incorporación de skills;
  - estructura conceptual de archivos y contratos.
- Archivos afectados:
  - `docs/DOMAIN-AND-DESIGN.md`;
  - `workflow/GATES.md`;
  - `workflow/SESSION-LOG.md`.
- Restricciones respetadas:
  - sin selección de lenguaje;
  - sin selección de framework;
  - sin instalación de skills;
  - sin implementación;
  - sin código.
- Resultado: diseño técnico propuesto y pendiente de presión final.
- Decisión humana: elaboración autorizada.
- Siguiente estado: revisar y aprobar P4-9.

## Entrada P4-9 — cierre

- Fecha: 20 de julio de 2026
- Gate: P4-9
- Contexto: aprobación del diseño técnico
- Actividad:
  - revisión de arquitectura lógica;
  - presión del flujo de restauración;
  - diferenciación entre datos fuente y valores derivados;
  - aprobación humana formal.
- Evidencia:
  - `docs/DOMAIN-AND-DESIGN.md`;
  - flujo especializado de restauración;
  - persistencia y respaldo conceptualmente definidos;
  - aprobación explícita del responsable humano.
- Resultado: diseño técnico aprobado.
- Decisión humana: P4-9 cerrado.
- Siguiente estado: preparar vertical slices, backlog y plan de pruebas.

## Entrada P4-10 — en curso

- Fecha: 20 de julio de 2026
- Gate: P4-10
- Contexto: planificación de implementación
- Actividad:
  - definición de 14 vertical slices;
  - priorización del backlog;
  - establecimiento de dependencias;
  - definición de criterios de aceptación;
  - diseño de fase roja;
  - planificación de pruebas por capas;
  - definición de datos ficticios;
  - definición de prueba de volumen;
  - establecimiento de Definition of Ready y Definition of Done;
  - trazabilidad hacia requisitos.
- Archivos afectados:
  - `docs/IMPLEMENTATION-PLAN.md`;
  - `workflow/GATES.md`;
  - `workflow/SESSION-LOG.md`.
- Restricciones respetadas:
  - sin selección tecnológica;
  - sin instalación de skills;
  - sin dependencias;
  - sin pruebas ejecutables;
  - sin código de producto.
- Resultado: plan propuesto y pendiente de presión final.
- Decisión humana: elaboración autorizada.
- Siguiente estado: revisar y aprobar P4-10.

## Entrada P4-10 — cierre

- Fecha: 20 de julio de 2026
- Gate: P4-10
- Contexto: aprobación de vertical slices, backlog y plan de pruebas
- Actividad:
  - revisión de las 14 vertical slices;
  - presión del orden de persistencia;
  - aclaración de persistencia incremental desde VS-01;
  - redefinición de VS-10 como endurecimiento y recuperación;
  - aprobación humana formal.
- Evidencia:
  - `docs/IMPLEMENTATION-PLAN.md`;
  - criterios de aceptación;
  - backlog priorizado;
  - plan de pruebas por capas;
  - aprobación explícita del responsable humano.
- Resultado: vertical slices, backlog y plan de pruebas aprobados.
- Decisión humana: P4-10 cerrado.
- Siguiente estado: selección tecnológica.

## Entrada P4-11 — en curso

- Fecha: 20 de julio de 2026
- Gate: P4-11
- Contexto: selección tecnológica y planificación de implementación
- Actividad:
  - investigación de tecnologías vigentes;
  - selección de TypeScript y Node.js 24 LTS;
  - selección de React, Vite y Tailwind;
  - selección de Fastify y Zod;
  - selección de SQLite mediante better-sqlite3;
  - definición de dinero en unidades mínimas;
  - selección de Vitest, Testing Library, Playwright y axe-core;
  - definición de CI Windows;
  - definición de rutas locales;
  - definición de instalación y reversión;
  - evaluación y selección controlada de skills.
- Archivos afectados:
  - `docs/TECHNOLOGY-AND-IMPLEMENTATION.md`;
  - `workflow/GATES.md`;
  - `workflow/SESSION-LOG.md`.
- Restricciones respetadas:
  - sin instalación de dependencias;
  - sin instalación de skills;
  - sin scaffolding;
  - sin pruebas ejecutables;
  - sin código de producto.
- Resultado: propuesta tecnológica pendiente de presión final.
- Decisión humana: elaboración autorizada.
- Siguiente estado: revisar y aprobar P4-11.

## Entrada P4-11 — cierre

- Fecha: 20 de julio de 2026
- Gate: P4-11
- Contexto: aprobación de tecnología y plan de implementación
- Evidencia:
  - `docs/TECHNOLOGY-AND-IMPLEMENTATION.md`
  - integración de la PR #8
  - aprobación explícita del responsable humano
- Resultado: tecnología y plan de implementación aprobados.
- Decisión humana: P4-11 cerrado.
- Siguiente estado: verificación de fase roja.

## Entrada P4-12 — en curso

- Fecha: 20 de julio de 2026
- Gate: P4-12
- Contexto: preparación y verificación de fase roja para VS-01
- Actividad:
  - verificación de Node.js 24.18.0 y npm 11.16.0
  - creación del scaffolding mínimo
  - instalación de TypeScript y Vitest
  - creación de una prueba ejecutable para VS-01
  - creación de un módulo deliberadamente no implementado
  - ejecución de la prueba roja
- Evidencia:
  - `docs/P4-12-RED-PHASE-EVIDENCE.md`
  - una prueba descubierta y ejecutada
  - fallo explícito `Not implemented: VS-01`
- Restricciones respetadas:
  - sin implementación funcional de VS-01
  - sin interfaz
  - sin persistencia
  - sin skills
- Resultado: fase roja preparada y pendiente de revisión final.
- Siguiente estado: presión y aprobación de P4-12.