# Paquete operativo formal — PILOT-004

## 1. Identificación

* **Piloto:** PILOT-004
* **Nombre:** Validación end-to-end del Workflow Profesional de Desarrollo con IA
* **Responsable humano:** Hugo Cornejo Villena
* **Proyecto candidato:** aplicación local de seguimiento de cobranzas
* **Repositorio de ejecución:** nuevo repositorio, todavía no creado
* **Repositorio metodológico de origen:** `Huracomo42/workflow-ai-sandbox`
* **Estado:** aprobado para incorporación al repositorio metodológico
* **Inicio de implementación:** no autorizado
* **Ruta general:** estándar
* **Nivel de control general:** alto

## 2. Propósito

Validar que el workflow puede trasladarse a un proyecto nuevo y conducir de manera reproducible todo el ciclo:

1. idea vaga;
2. incorporación del workflow;
3. definición del problema y usuario;
4. investigación;
5. Project Charter;
6. presión y congelamiento de requisitos;
7. modelado de dominio;
8. diseño técnico;
9. vertical slices y backlog;
10. implementación;
11. pruebas;
12. revisión independiente;
13. correcciones;
14. despliegue;
15. reversión;
16. evaluación;
17. cierre.

El piloto no busca demostrar únicamente que puede construirse una aplicación. Busca demostrar que el proceso completo puede instalarse, ejecutarse, verificarse y repetirse en un repositorio nuevo.

## 3. Hipótesis

Un workflow versionado, incorporado explícitamente y operado mediante gates congelados puede transformar una idea vaga en un producto pequeño desplegado, manteniendo control de alcance, trazabilidad, calidad técnica y capacidad de reversión sin producir documentación desproporcionada.

## 4. Idea inicial

> Quiero una aplicación sencilla para controlar quién me debe dinero, cuánto debe y qué pagos están vencidos.

La idea inicial se conserva deliberadamente incompleta. Su función es servir como entrada a la fase de descubrimiento y presión de requisitos.

No constituye todavía una especificación funcional ni autoriza decisiones técnicas.

## 5. Alcance funcional provisional

La aplicación podrá incluir:

* registro de clientes;
* registro de deudas asociadas a clientes;
* monto de la deuda;
* fecha de vencimiento;
* estados pendiente, vencida y pagada;
* marcado de una deuda como pagada;
* visualización y filtrado de deudas;
* resumen básico;
* persistencia local.

Este alcance deberá ser interrogado, corregido y congelado antes del diseño técnico.

## 6. Fuera de alcance inicial

Quedan excluidos:

* integración real con WhatsApp;
* notificaciones externas;
* pasarela de pagos;
* autenticación;
* múltiples usuarios;
* base de datos remota;
* servicios externos;
* inteligencia artificial;
* aplicación móvil nativa;
* sincronización entre dispositivos;
* contabilidad formal;
* intereses;
* cuotas;
* conciliación bancaria;
* gestión legal de cobranza;
* información financiera sensible real.

La inclusión posterior de cualquiera de estos elementos exigirá detener el piloto y tramitar una modificación formal del alcance.

## 7. Clasificación por fases

| Fase                           | Ruta         | Control | Justificación                                               |
| ------------------------------ | ------------ | ------: | ----------------------------------------------------------- |
| Incorporación del workflow     | Estándar     |    Alto | Condiciona la reproducibilidad del piloto                   |
| Descubrimiento e investigación | Exploratoria |   Medio | Existe incertidumbre sobre usuario, problema y alternativas |
| Project Charter                | Estándar     |   Medio | Artefacto de decisión sin código                            |
| Presión de requisitos          | Exploratoria |   Medio | Debe resolver ambigüedades funcionales                      |
| Modelado y diseño              | Estándar     |    Alto | Condiciona toda la implementación                           |
| Backlog y vertical slices      | Estándar     |    Alto | Define límites de ejecución                                 |
| Implementación                 | Estándar     |    Alto | Cambio funcional completo                                   |
| Revisión técnica               | Estándar     |    Alto | Requiere independencia verificable                          |
| Despliegue y reversión         | Estándar     |    Alto | Introduce estado operativo recuperable                      |
| Evaluación final               | Estándar     |    Alto | Determina la validez metodológica del piloto                |

El nivel alto general no obliga a utilizar el mismo volumen documental en todas las fases. La documentación se ajustará a la naturaleza y riesgo de cada una.

## 8. Roles y separación de responsabilidades

### Responsable humano

Hugo Cornejo Villena:

* aprueba alcance;
* resuelve decisiones funcionales;
* autoriza gates;
* ejecuta comandos locales;
* valida resultados;
* autoriza excepciones;
* autoriza merge;
* aprueba el cierre.

### ChatGPT

Actúa como:

* investigador;
* arquitecto;
* revisor metodológico;
* diseñador de artefactos;
* guía operativa;
* evaluador de desviaciones.

No modifica repositorios ni autoriza su propio trabajo.

### Claude Code — contexto de implementación

Actúa como ejecutor técnico después de la autorización correspondiente.

No podrá:

* definir unilateralmente el alcance;
* cambiar requisitos congelados;
* aprobar su propia implementación;
* realizar la revisión independiente;
* autorizar el merge.

### Contexto independiente de revisión

Se utilizará una conversación o sesión distinta que no haya participado en la implementación.

Antes de revisar deberá declarar:

* que no es el contexto de implementación;
* que recibió únicamente los artefactos congelados, diff, pruebas y evidencia autorizada;
* que no utilizará conclusiones de la sesión implementadora como sustituto de su análisis.

### Contexto independiente de evaluación

La evaluación final mediante rúbrica se realizará en un tercer contexto:

* distinto del contexto implementador;
* distinto del contexto revisor;
* sin participación previa en correcciones;
* basado en evidencia final congelada.

Esta decisión resuelve el Ajuste O para PILOT-004, sin modificar todavía la metodología base.

## 9. Incorporación del workflow

### 9.1 Mecanismo

El workflow se incorporará mediante un **snapshot versionado y autocontenido** dentro del nuevo repositorio.

### 9.2 Manifiesto de incorporación

El nuevo repositorio deberá registrar:

* repositorio de origen;
* commit exacto de origen;
* fecha de incorporación;
* versión del workflow;
* archivos incorporados;
* archivos excluidos;
* cambios locales realizados;
* procedimiento de actualización;
* resultado de la verificación.

### 9.3 Contenido mínimo del snapshot

El snapshot incluirá únicamente:

* reglas operativas esenciales;
* rutas y niveles de control;
* reglas de autorización;
* protocolo de gates;
* plantillas proporcionales;
* protocolo de pruebas;
* protocolo de revisión independiente;
* reglas de commits y narrativa;
* protocolo de reversión;
* rúbrica;
* checklist de cierre.

No se copiará el historial completo de experimentos de PILOT-001 a PILOT-003.

### 9.4 Criterio de instalación válida

La incorporación será válida cuando una sesión nueva pueda identificar, usando solo el nuevo repositorio:

* qué proceso debe seguir;
* cuáles son sus gates;
* qué artefactos producir;
* quién puede aprobar;
* cuándo puede implementarse;
* cómo debe revisarse;
* cómo debe cerrarse.

## 10. Artefactos proporcionales

### 10.1 Núcleo obligatorio

Solo se crearán inicialmente estos documentos:

1. `docs/PILOT-004-operational-package.md`
2. `workflow/INSTALLATION-MANIFEST.md`
3. `workflow/GATES.md`
4. `workflow/SESSION-LOG.md`
5. `docs/PROJECT-CHARTER.md`
6. `docs/REQUIREMENTS.md`
7. `docs/DOMAIN-AND-DESIGN.md`
8. `docs/BACKLOG-AND-SLICES.md`
9. `docs/TEST-PLAN.md`
10. `docs/INDEPENDENT-REVIEW.md`
11. `docs/DEPLOYMENT-AND-REVERSAL.md`
12. `docs/PILOT-004-EVALUATION.md`
13. `docs/PILOT-004-CLOSURE-REPORT.md`

### 10.2 Regla de consolidación

No se crearán documentos separados para cada microdecisión.

Se consolidarán:

* presión y requisitos en `REQUIREMENTS.md`;
* modelo de dominio y diseño técnico en `DOMAIN-AND-DESIGN.md`;
* backlog y slices en `BACKLOG-AND-SLICES.md`;
* despliegue y reversión en un solo documento.

Solo se abrirá un artefacto adicional cuando exista una necesidad real de separación, revisión o trazabilidad.

## 11. Reglas de commits y narrativa

Cada commit funcional deberá contener simultáneamente:

* código correspondiente;
* pruebas correspondientes;
* actualización del registro de sesión;
* estado real del gate;
* resultados que efectivamente puedan demostrarse con ese commit.

Queda prohibido:

* narrar resultados de código aún no incorporado;
* documentar un gate como cerrado antes de ejecutarlo;
* separar retrospectivamente código y narrativa;
* reescribir el historial para ocultar errores operativos.

Los commits deberán seguir el orden cronológico real.

## 12. Gates generales congelados

La siguiente numeración será la única fuente válida durante PILOT-004.

### Preparación

* **P4-0:** alcance y criterio de éxito aprobados — cerrado.
* **P4-1:** paquete operativo conceptual aprobado — cerrado.
* **P4-2:** paquete operativo incorporado al repositorio metodológico — en curso.
* **P4-3:** creación del nuevo repositorio autorizada.
* **P4-4:** workflow incorporado y verificado en el nuevo repositorio.

### Descubrimiento

* **P4-5:** problema, usuario y contexto investigados.
* **P4-6:** Project Charter aprobado.
* **P4-7:** requisitos presionados y congelados.

### Ingeniería

* **P4-8:** modelo de dominio aprobado.
* **P4-9:** diseño técnico aprobado.
* **P4-10:** vertical slices, backlog y plan de pruebas aprobados.
* **P4-11:** tecnología y plan de implementación aprobados.

### Implementación

* **P4-12:** fase roja verificada.
* **P4-13:** implementación funcional completada.
* **P4-14:** pruebas locales y regresión en verde.
* **P4-15:** CI en verde.

### Revisión y corrección

* **P4-16:** separación de contexto de revisión verificada.
* **P4-17:** revisión independiente concluida.
* **P4-18:** hallazgos corregidos y revalidados.
* **P4-19:** evaluación técnica final sin bloqueantes.

### Entrega

* **P4-20:** despliegue autorizado.
* **P4-21:** despliegue verificado.
* **P4-22:** reversión y restauración ensayadas.
* **P4-23:** pull request final autorizado.
* **P4-24:** merge completado.

### Cierre

* **P4-25:** separación del contexto evaluador verificada.
* **P4-26:** evaluación por rúbrica concluida.
* **P4-27:** repetibilidad evaluada.
* **P4-28:** informe de cierre aprobado.
* **P4-29:** PILOT-004 cerrado formalmente.

No podrán introducirse gates alternativos ni renumeraciones durante la ejecución.

## 13. Regla de avance

Se podrá avanzar por bloques sin solicitar aprobación para cada actividad documental menor.

Será obligatoria una decisión humana cuando:

* se cierre un gate;
* se congele alcance;
* se elija tecnología;
* se autorice implementación;
* se acepte una excepción;
* se autorice despliegue;
* se autorice merge;
* se cierre el piloto.

Ante un error, desviación o necesidad de ampliar alcance, el avance se detendrá.

## 14. Investigación obligatoria

Antes del Project Charter se investigará:

* usuario probable;
* problema real que intenta resolver;
* flujos actuales de seguimiento de deudas;
* riesgos de privacidad;
* reglas de estado y vencimiento;
* soluciones existentes;
* patrones reutilizables;
* repositorios o skills relevantes;
* alternativas de despliegue;
* restricciones del entorno Windows, VS Code y Claude Code.

La investigación no podrá seleccionar tecnología de manera definitiva.

Toda afirmación se clasificará como:

* hecho documentado;
* inferencia razonable;
* vacío documental.

## 15. Protocolo de implementación

No se escribirá código hasta cerrar P4-11.

La implementación deberá:

* realizarse en rama;
* seguir vertical slices aprobadas;
* comenzar por pruebas cuando sea viable;
* limitarse a archivos autorizados;
* detenerse ante cambios de alcance;
* mantener sincronizados código y narrativa;
* conservar un punto de restauración;
* pasar CI antes de revisión final.

## 16. Revisión independiente

Antes de P4-16 deberá generarse un paquete de revisión que contenga exclusivamente:

* requisitos congelados;
* diseño aprobado;
* criterios de aceptación;
* matriz de trazabilidad;
* diff;
* resultados de pruebas;
* evidencia de CI;
* riesgos;
* limitaciones;
* instrucciones de revisión.

El revisor deberá inspeccionar de forma independiente:

* corrección funcional;
* cumplimiento del alcance;
* modelo de estados;
* persistencia;
* manejo de fechas;
* pruebas;
* regresión;
* errores;
* mantenibilidad;
* despliegue;
* reversibilidad;
* trazabilidad commit–narrativa.

Un hallazgo bloqueante impide avanzar.

## 17. Despliegue

El despliegue deberá:

* ser definido después de la decisión tecnológica;
* utilizar una versión trazable a un commit;
* ser reproducible;
* permitir verificar el alcance congelado;
* no introducir servicios funcionales fuera de alcance;
* conservar un procedimiento de retirada o reversión.

La selección del proveedor o mecanismo no está autorizada todavía.

## 18. Reversión

El piloto deberá demostrar:

1. punto de restauración identificado;
2. plan previo;
3. reversión en entorno seguro;
4. ejecución de pruebas sobre el estado revertido;
5. restauración de la versión correcta;
6. repetición de pruebas;
7. conservación del historial.

Se priorizarán mecanismos que no reescriban el historial.

## 19. Criterio de éxito end-to-end

PILOT-004 será aprobado cuando:

* parta de la idea vaga registrada;
* utilice un repositorio nuevo;
* incorpore el workflow mediante snapshot verificable;
* apruebe y congele alcance antes del código;
* atraviese los gates sin saltos no autorizados;
* entregue la aplicación acordada;
* conserve correctamente los datos locales;
* supere las pruebas obligatorias;
* tenga CI en verde;
* sea revisado desde un contexto independiente;
* corrija todos los hallazgos bloqueantes;
* quede desplegado;
* demuestre reversión y restauración;
* mantenga correspondencia entre commits y narrativa;
* cierre mediante evaluación independiente;
* permita repetir el proceso utilizando únicamente el repositorio;
* obtenga al menos 42/50;
* no active ninguna regla de bloqueo.

## 20. Rúbrica

La evaluación final utilizará diez dimensiones de cinco puntos:

1. comprensión del problema;
2. calidad del descubrimiento y Project Charter;
3. control del alcance;
4. calidad del diseño;
5. calidad de implementación;
6. pruebas y verificabilidad;
7. documentación proporcional;
8. riesgos, despliegue y reversión;
9. trazabilidad;
10. repetibilidad end-to-end.

### Umbral

* puntaje mínimo: **42/50**;
* control de alcance: mínimo 4/5;
* pruebas: mínimo 4/5;
* trazabilidad: mínimo 4/5;
* reversión: mínimo 4/5;
* repetibilidad: mínimo 4/5;
* revisión independiente obligatoria;
* CI obligatorio;
* cero hallazgos bloqueantes abiertos.

## 21. Reglas de bloqueo

El piloto quedará bloqueado cuando ocurra cualquiera de las siguientes condiciones:

* código antes de P4-11;
* creación del repositorio antes de P4-3;
* alcance sin congelar;
* gate omitido o renumerado;
* revisión realizada desde el contexto de implementación;
* evaluación realizada desde el contexto de implementación o revisión;
* hallazgo bloqueante abierto;
* CI obligatorio en rojo;
* despliegue no trazable a un commit;
* narrativa adelantada al código;
* cambio de alcance no autorizado;
* pérdida o reescritura de evidencia;
* imposibilidad de restaurar una versión estable;
* datos sensibles reales incorporados al piloto.

## 22. Excepciones

Toda excepción deberá registrar:

* regla afectada;
* causa;
* riesgo;
* alcance;
* duración;
* medida compensatoria;
* responsable que autoriza;
* resultado.

Una excepción no modifica la metodología base.

## 23. Criterio de repetibilidad

Una persona o sesión nueva deberá poder:

1. clonar el repositorio;
2. identificar la versión del workflow;
3. comprender el problema y alcance;
4. instalar lo necesario;
5. ejecutar la aplicación;
6. ejecutar las pruebas;
7. identificar el commit desplegado;
8. comprender los gates ejecutados;
9. reconstruir las decisiones principales;
10. aplicar el procedimiento de reversión.

La necesidad de consultar conversaciones anteriores se considerará una falla de repetibilidad.

## 24. Condiciones de cierre

PILOT-004 solo podrá cerrarse cuando:

* el producto esté integrado;
* el despliegue esté verificado;
* la reversión esté ensayada;
* las ramas temporales estén resueltas;
* el repositorio local esté sincronizado;
* las deudas estén registradas;
* la evaluación independiente esté terminada;
* exista decisión explícita sobre repetibilidad;
* exista informe de cierre;
* se determine qué elementos deben incorporarse permanentemente a la metodología.

## 25. Prohibiciones vigentes

Hasta aprobar este paquete y completar sus gates iniciales queda prohibido:

* crear el repositorio nuevo;
* elegir tecnología;
* diseñar arquitectura;
* instalar frameworks;
* escribir código;
* crear pruebas de implementación;
* decidir proveedor de despliegue;
* iniciar Claude Code como implementador.
