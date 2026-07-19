# Workflow operativo — PILOT-004

## 1. Propósito

Este repositorio utiliza un snapshot autocontenido del Workflow Profesional de Desarrollo con IA.

El workflow debe conducir el proyecto desde una idea vaga hasta una aplicación funcional, probada, revisada independientemente, desplegada, reversible y cerrada mediante evaluación formal.

## 2. Fuente metodológica

* Repositorio de origen: `Huracomo42/workflow-ai-sandbox`
* Commit de origen: `bac26b3cc0e7b3429aa2671e74885cc463c2c254`
* Piloto: PILOT-004
* Paquete operativo: `docs/PILOT-004-operational-package.md`

## 3. Autoridad

El responsable humano es la única persona que puede:

* aprobar alcance;
* cerrar gates;
* resolver decisiones funcionales;
* autorizar tecnología;
* autorizar implementación;
* aceptar excepciones;
* autorizar despliegue;
* autorizar merge;
* cerrar el piloto.

La IA no puede autorizar su propio trabajo.

## 4. Roles

### ChatGPT

* investigación;
* arquitectura;
* documentación;
* revisión metodológica;
* guía operativa;
* detección de desviaciones.

### Claude Code

* implementación técnica;
* modificación de archivos autorizados;
* ejecución de pruebas;
* corrección de hallazgos autorizados.

Claude Code no puede revisar ni aprobar independientemente su propia implementación.

### Revisor independiente

Debe operar en un contexto separado del contexto de implementación.

### Evaluador independiente

Debe operar en un tercer contexto, separado tanto de implementación como de revisión.

## 5. Clasificación

* Ruta general: estándar.
* Nivel general de control: alto.
* Descubrimiento y presión de requisitos: ruta exploratoria, control medio.
* Diseño, implementación, revisión, despliegue y cierre: control alto.

La documentación debe ser proporcional a la fase y al riesgo.

## 6. Reglas obligatorias

1. No escribir código antes de cerrar P4-11.
2. No seleccionar tecnología antes de la fase autorizada.
3. No ampliar el alcance sin detener el proceso y obtener autorización.
4. No modificar archivos no autorizados.
5. Mantener código, pruebas y narrativa correspondiente en el mismo commit.
6. No narrar resultados de código que todavía no exista en ese commit.
7. Usar `workflow/GATES.md` como única fuente de numeración.
8. Verificar separación de contexto antes de iniciar una revisión independiente.
9. Verificar separación de contexto antes de iniciar la evaluación final.
10. Integrar cambios funcionales mediante pull request.
11. Mantener un punto de restauración y un procedimiento de reversión.
12. Registrar excepciones sin reescribir ni ocultar el historial.

## 7. Flujo obligatorio

1. incorporación del workflow;
2. investigación del problema, usuario y contexto;
3. Project Charter;
4. presión y congelamiento de requisitos;
5. modelado de dominio;
6. diseño técnico;
7. vertical slices, backlog y pruebas;
8. decisión tecnológica;
9. fase roja;
10. implementación;
11. pruebas y CI;
12. revisión independiente;
13. correcciones;
14. despliegue;
15. reversión y restauración;
16. merge;
17. evaluación independiente;
18. prueba de repetibilidad;
19. cierre.

## 8. Uso de skills

Las skills externas no se instalarán ni utilizarán automáticamente.

Cada skill deberá:

* responder a una necesidad identificada;
* tener origen y versión registrados;
* ser evaluada por licencia, compatibilidad, mantenimiento y riesgo;
* ser aprobada antes de su instalación;
* dejar evidencia de su uso;
* no sustituir requisitos ni decisiones humanas;
* ser revisada críticamente;
* poder descartarse si no aporta valor.

Las skills de frontend candidatas se registran en `workflow/SKILLS-INVENTORY.md`.

## 9. Evidencia

La evidencia del piloto se conservará mediante:

* documentos;
* commits;
* registro de sesión;
* pruebas;
* CI;
* revisiones;
* pull requests;
* despliegue;
* reversión;
* evaluación;
* informe de cierre.

## 10. Bloqueo

Ante un error, desviación, gate omitido, ampliación de alcance o decisión humana pendiente, el proceso debe detenerse.
