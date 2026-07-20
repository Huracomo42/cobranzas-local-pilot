# P4-12 — Evidencia de fase roja

## Entorno verificado

- Node.js: 24.18.0
- npm: 11.16.0
- Sistema principal: Windows
- Rama: `pilot-004/p4-12-red-phase`

## Scaffolding mínimo

Se incorporó únicamente:

- configuración básica de npm;
- TypeScript;
- Vitest;
- estructura inicial de dominio y pruebas;
- exclusiones de archivos generados;
- módulo deliberadamente no implementado para VS-01.

## Prueba roja

Archivo:

`tests/domain/create-empty-operational-state.test.ts`

Comportamiento esperado:

Crear un estado operativo vacío y válido con:

- `schemaVersion: 1`;
- clientes vacíos;
- deudas vacías;
- pagos vacíos;
- reversiones vacías.

## Resultado observado

```text
Test Files  1 failed (1)
Tests       1 failed (1)
Error: Not implemented: VS-01