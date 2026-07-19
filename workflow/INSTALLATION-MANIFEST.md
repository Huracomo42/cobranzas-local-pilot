# Manifiesto de incorporación del workflow

## 1. Identificación

* Proyecto: `cobranzas-local-pilot`
* Piloto: PILOT-004
* Repositorio de ejecución: `Huracomo42/cobranzas-local-pilot`
* Repositorio metodológico: `Huracomo42/workflow-ai-sandbox`
* Commit metodológico de origen: `bac26b3cc0e7b3429aa2671e74885cc463c2c254`
* Fecha de incorporación: 19 de julio de 2026
* Mecanismo: snapshot versionado y autocontenido
* Estado: incorporación verificada

## 2. Archivos incorporados

* `docs/PILOT-004-operational-package.md`
* `workflow/WORKFLOW.md`
* `workflow/GATES.md`
* `workflow/INSTALLATION-MANIFEST.md`
* `workflow/SESSION-LOG.md`
* `workflow/SKILLS-INVENTORY.md`

## 3. Exclusiones

No se copiaron:

* código de la aplicación de tareas del sandbox;
* experimentos EXP-001 a EXP-010;
* registros históricos completos;
* informes de pilotos anteriores;
* ramas de prueba;
* dependencias;
* configuraciones técnicas de implementación;
* decisiones tecnológicas de proyectos anteriores.

## 4. Adaptaciones locales

Se añadió `workflow/SKILLS-INVENTORY.md` para registrar y evaluar skills especializadas solicitadas para PILOT-004.

Esta adición no modifica la metodología base. Es un control específico del piloto para validar investigación, selección, incorporación y uso trazable de capacidades reutilizables.

## 5. Excepción de bootstrap

El repositorio fue creado completamente vacío.

El primer commit deberá realizarse directamente sobre `main`, porque no existe todavía una rama base con historial contra la cual abrir un pull request.

La excepción se limita al commit inicial de incorporación del workflow.

Medidas compensatorias:

* el commit solo contendrá documentación del workflow;
* no contendrá código de producto;
* se verificará el contenido antes del commit;
* se registrará la excepción en el historial;
* todos los cambios posteriores se realizarán mediante ramas y pull requests.

## 6. Política de actualización

El snapshot no se actualizará automáticamente.

Toda actualización deberá:

1. identificar el nuevo commit de origen;
2. comparar cambios;
3. justificar la actualización;
4. evaluar su impacto;
5. obtener autorización humana;
6. realizarse mediante rama y pull request;
7. actualizar este manifiesto.

## 7. Verificación requerida

La incorporación será válida cuando una sesión nueva pueda determinar, usando únicamente el repositorio:

* propósito del workflow;
* roles;
* gates;
* reglas de autorización;
* momento permitido para implementar;
* protocolo de revisión;
* protocolo de evaluación;
* reglas de trazabilidad;
* tratamiento de skills;
* condiciones de cierre.

## 8. Resultado

Incorporación verificada.

El repositorio contiene el paquete operativo, las reglas esenciales, los gates congelados, el manifiesto, el registro de sesión y el inventario inicial de skills.

El commit inicial de bootstrap es `1180fa3b5d15f8f3ed144d28b0f480fb8c2affbb`.

Una sesión nueva puede determinar desde el repositorio:

- el propósito del workflow;
- los roles y autoridades;
- la numeración de gates;
- la prohibición de implementar antes de P4-11;
- el protocolo de revisión y evaluación independiente;
- las reglas de trazabilidad;
- el tratamiento de skills;
- las condiciones de cierre.

P4-4 queda cerrado.
