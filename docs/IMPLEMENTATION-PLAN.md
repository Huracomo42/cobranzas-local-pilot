# Plan de implementación — PILOT-004

> Estado: propuesta de vertical slices, backlog y plan de pruebas para aprobación en P4-10.
> Este documento no selecciona tecnología, no instala skills y no autoriza todavía la implementación.

## 1. Identificación

* Proyecto: aplicación local de seguimiento de cobranzas.
* Gate actual: P4-10.
* Requisitos congelados: `docs/REQUIREMENTS.md`.
* Modelo de dominio y diseño técnico: `docs/DOMAIN-AND-DESIGN.md`.
* Usuario principal: pequeño comerciante o responsable de negocio familiar.
* Escala objetivo:

  * hasta 100 clientes;
  * hasta 500 deudas;
  * pagos asociados;
  * cinco respaldos automáticos.
* Implementación: no autorizada hasta cerrar P4-11.

## 2. Propósito

Este plan convierte los requisitos y el diseño aprobados en unidades implementables y verificables.

Debe establecer:

* vertical slices funcionales;
* orden de construcción;
* backlog priorizado;
* criterios de aceptación;
* dependencias;
* pruebas exigidas;
* datos ficticios;
* condiciones de finalización;
* gates internos de cada slice.

## 3. Principios de planificación

### PI-PR-01 — Verticalidad

Cada slice deberá atravesar, cuando corresponda:

* dominio;
* aplicación;
* persistencia;
* presentación;
* pruebas.

No se considerará terminada una slice que solo implemente interfaz o solo implemente almacenamiento sin comportamiento observable.

### PI-PR-02 — Incrementos verificables

Cada slice deberá producir una capacidad demostrable mediante una ruta de usuario completa.

### PI-PR-03 — Riesgo primero

Las capacidades con mayor riesgo financiero o de integridad se validarán antes que los refinamientos visuales.

### PI-PR-04 — Fase roja antes de implementación

Las pruebas críticas de cada slice deberán existir y fallar por la razón esperada antes de implementar el comportamiento.

### PI-PR-05 — Sin anticipar tecnología

P4-10 define qué debe construirse y probarse.

P4-11 decidirá con qué herramientas se implementará.

### PI-PR-06 — Trazabilidad

Cada slice deberá relacionarse con:

* requisitos;
* invariantes;
* criterios de aceptación;
* pruebas;
* evidencia de ejecución.

### PI-PR-07 — Datos ficticios

Toda prueba, captura o demostración utilizará datos ficticios.

### PI-PR-08 — Finalización real

Una slice no estará terminada únicamente porque “funciona en pantalla”.

Debe cumplir pruebas, accesibilidad, persistencia y regresión aplicables.

## 4. Definición de vertical slice

Una vertical slice es una unidad de valor observable que:

1. responde a una necesidad concreta del usuario;
2. modifica o consulta el dominio;
3. atraviesa las capas necesarias;
4. posee criterios de aceptación;
5. incluye pruebas;
6. puede demostrarse independientemente;
7. no deja datos en un estado incoherente.

## 5. Orden general de implementación

El orden propuesto es:

1. VS-01 — Estado vacío y arranque seguro;
2. VS-02 — Gestión básica de clientes;
3. VS-03 — Registro y consulta de deudas;
4. VS-04 — Estados, vencimientos y resumen;
5. VS-05 — Pagos parciales y exactos;
6. VS-06 — Excedentes y saldo a favor;
7. VS-07 — Reversión de pagos;
8. VS-08 — Archivo y reactivación de clientes;
9. VS-09 — Papelera y restauración;
10. VS-10 — Endurecimiento de persistencia y recuperación;
11. VS-11 — Respaldos y restauración;
12. VS-12 — Filtros, ordenamiento y búsqueda operativa;
13. VS-13 — Accesibilidad y navegación completa;
14. VS-14 — Integración end-to-end y endurecimiento.

El orden puede ajustarse durante P4-11 únicamente si:

* se documenta la razón;
* no se omite una slice;
* no se debilitan las dependencias;
* se mantiene la cobertura funcional;
* se obtiene aprobación humana cuando el cambio sea sustancial.

## 6. Dependencias principales

| Slice | Depende de                  |
| ----- | --------------------------- |
| VS-01 | Ninguna                     |
| VS-02 | VS-01                       |
| VS-03 | VS-02                       |
| VS-04 | VS-03                       |
| VS-05 | VS-03 y VS-04               |
| VS-06 | VS-05                       |
| VS-07 | VS-05 y VS-06               |
| VS-08 | VS-02 y VS-03               |
| VS-09 | VS-02, VS-03, VS-05 y VS-07 |
| VS-10 | VS-01 a VS-09               |
| VS-11 | VS-10                       |
| VS-12 | VS-03 y VS-04               |
| VS-13 | VS-02 a VS-12               |
| VS-14 | Todas las anteriores        |

### 6.1 Persistencia incremental

La persistencia no comienza en VS-10.

Desde VS-01 se implementará el mínimo vertical de carga y guardado requerido por cada slice. Cada capacidad incorporada deberá sobrevivir un reinicio antes de considerarse terminada.

VS-10 consolidará y endurecerá esa persistencia mediante:

- escritura segura;
- sustitución controlada;
- simulación de fallos;
- detección de corrupción;
- validación integral;
- recuperación del último estado válido;
- compatibilidad y versionado del esquema.

Por tanto, VS-10 no reemplaza la persistencia desarrollada en las slices anteriores: la somete a pruebas integrales y completa sus mecanismos de recuperación.

## 7. VS-01 — Estado vacío y arranque seguro

### 7.1 Objetivo

Permitir que la aplicación inicie sin datos previos y muestre un estado vacío válido.

### 7.2 Valor para el usuario

El usuario puede abrir la aplicación por primera vez y comprender que todavía no existen clientes ni deudas.

### 7.3 Alcance

Incluye:

* inicialización del estado;
* versión de esquema;
* estructura vacía válida;
* carga inicial;
* detección de ausencia de datos;
* pantalla inicial;
* estados vacíos;
* manejo básico de error de carga.

No incluye todavía creación de clientes.

### 7.4 Criterios de aceptación

#### CA-VS01-01

Cuando no existe almacenamiento previo, la aplicación inicia con un estado vacío válido.

#### CA-VS01-02

No se muestra un error por la ausencia normal de datos.

#### CA-VS01-03

La vista informa claramente que no existen clientes ni deudas.

#### CA-VS01-04

El total pendiente se muestra en cero por moneda o de forma no ambigua.

#### CA-VS01-05

La cantidad de deudas vencidas es cero.

#### CA-VS01-06

El estado vacío puede guardarse y volver a cargarse.

#### CA-VS01-07

Un estado corrupto no se interpreta como estado vacío.

### 7.5 Pruebas rojas iniciales

* crear estado vacío;
* validar versión de esquema;
* cargar cuando no existe archivo o registro;
* rechazar estructura inválida;
* renderizar estado vacío;
* navegación inicial por teclado.

### 7.6 Definición de terminado

* pruebas de dominio y persistencia en verde;
* estado vacío visible;
* error de carga distinguible;
* datos reales no versionados;
* documentación mínima de ejecución.

## 8. VS-02 — Gestión básica de clientes

### 8.1 Objetivo

Crear, consultar y editar clientes sin historial de deudas.

### 8.2 Alcance

Incluye:

* crear cliente;
* validar nombre;
* normalizar espacios;
* nota opcional;
* listar clientes;
* editar cliente;
* identificador estable;
* confirmación al enviar cliente sin historial a papelera;
* restaurar cliente sin historial.

### 8.3 Criterios de aceptación

#### CA-VS02-01

El usuario puede crear un cliente con nombre válido.

#### CA-VS02-02

No se acepta un nombre vacío ni compuesto solo por espacios.

#### CA-VS02-03

Los espacios iniciales y finales se normalizan.

#### CA-VS02-04

La nota es opcional.

#### CA-VS02-05

Editar el nombre no cambia el identificador.

#### CA-VS02-06

Un cliente sin historial puede enviarse a papelera después de confirmación.

#### CA-VS02-07

Un cliente en papelera no aparece en la lista operativa.

#### CA-VS02-08

El cliente puede restaurarse y vuelve como activo.

#### CA-VS02-09

La operación se conserva después de reiniciar.

### 8.4 Pruebas rojas iniciales

* cliente válido;
* nombre vacío;
* nombre con espacios;
* edición;
* estabilidad de identificador;
* envío a papelera;
* cancelación de confirmación;
* restauración;
* persistencia.

### 8.5 Definición de terminado

* ruta crear-editar-eliminar-restaurar demostrable;
* mensajes comprensibles;
* foco gestionado;
* persistencia confirmada;
* regresión de VS-01 en verde.

## 9. VS-03 — Registro y consulta de deudas

### 9.1 Objetivo

Registrar deudas asociadas a clientes activos.

### 9.2 Alcance

Incluye:

* concepto obligatorio;
* monto mayor que cero;
* máximo dos decimales;
* moneda PEN o USD;
* vencimiento opcional;
* creación para cliente activo;
* edición antes del primer pago;
* listado por cliente;
* consulta de detalle.

### 9.3 Criterios de aceptación

#### CA-VS03-01

Una deuda requiere cliente, concepto, monto y moneda.

#### CA-VS03-02

La deuda puede no tener vencimiento.

#### CA-VS03-03

No se aceptan montos cero, negativos o no numéricos.

#### CA-VS03-04

No se aceptan más de dos decimales.

#### CA-VS03-05

PEN y USD se conservan sin conversión.

#### CA-VS03-06

La deuda puede editarse mientras no tenga pagos.

#### CA-VS03-07

La deuda no puede crearse para cliente inexistente, archivado o en papelera.

#### CA-VS03-08

La deuda persiste después de reiniciar.

#### CA-VS03-09

La fecha se muestra sin desplazamientos por zona horaria.

### 9.4 Pruebas rojas iniciales

* crear deuda PEN;
* crear deuda USD;
* deuda sin fecha;
* concepto vacío;
* monto inválido;
* precisión decimal;
* cliente inválido;
* edición;
* fecha civil;
* persistencia.

### 9.5 Definición de terminado

* creación y edición verificadas;
* datos financieros exactos;
* referencias válidas;
* regresiones anteriores en verde.

## 10. VS-04 — Estados, vencimientos y resumen

### 10.1 Objetivo

Calcular y mostrar estados de deuda, total pendiente y cantidad de vencidas.

### 10.2 Alcance

Incluye:

* `PENDIENTE`;
* `PENDIENTE_SIN_FECHA`;
* `VENCIDA`;
* `PAGADA`, aunque aún no exista interfaz de pagos;
* vence hoy;
* total pendiente separado por moneda;
* cantidad de vencidas;
* actualización ante cambio de fecha.

### 10.3 Criterios de aceptación

#### CA-VS04-01

Una deuda sin fecha y con saldo se clasifica como pendiente sin fecha.

#### CA-VS04-02

Una deuda con vencimiento futuro se clasifica como pendiente.

#### CA-VS04-03

Una deuda que vence hoy permanece pendiente.

#### CA-VS04-04

Una deuda con fecha anterior a hoy se clasifica como vencida.

#### CA-VS04-05

Una deuda con saldo cero siempre se clasifica como pagada.

#### CA-VS04-06

Los totales PEN y USD se muestran separados.

#### CA-VS04-07

Las deudas en papelera no participan en el resumen.

#### CA-VS04-08

El estado se recalcula al cambiar la fecha relevante.

#### CA-VS04-09

El usuario puede identificar vencidas y total pendiente en menos de diez segundos.

### 10.4 Pruebas rojas iniciales

* vencimiento ayer;
* vencimiento hoy;
* vencimiento mañana;
* deuda sin fecha;
* saldo cero;
* totales por moneda;
* exclusión de papelera;
* reloj sustituible;
* actualización con aplicación abierta.

### 10.5 Definición de terminado

* estados derivados sin campo manual;
* resumen correcto;
* pruebas con reloj controlado;
* demostración de criterio de diez segundos.

## 11. VS-05 — Pagos parciales y exactos

### 11.1 Objetivo

Registrar pagos que reduzcan o cancelen una deuda.

### 11.2 Alcance

Incluye:

* pago mayor que cero;
* misma moneda;
* fecha obligatoria;
* fecha por defecto actual;
* prohibición de fecha futura;
* pago parcial;
* pago exacto;
* historial;
* confirmación financiera;
* bloqueo de edición de deuda tras el primer pago.

### 11.3 Criterios de aceptación

#### CA-VS05-01

Un pago parcial reduce el saldo correctamente.

#### CA-VS05-02

Un pago exacto lleva el saldo a cero.

#### CA-VS05-03

Una deuda con saldo cero queda pagada.

#### CA-VS05-04

La fecha futura se rechaza.

#### CA-VS05-05

La moneda debe coincidir con la deuda.

#### CA-VS05-06

La confirmación muestra cliente, deuda, monto, moneda, fecha y efecto.

#### CA-VS05-07

Cancelar la confirmación no registra el pago.

#### CA-VS05-08

Después del primer pago la deuda no puede editarse.

#### CA-VS05-09

El pago aparece en el historial.

#### CA-VS05-10

Pago, nuevo saldo e historial se persisten como una unidad lógica.

### 11.4 Pruebas rojas iniciales

* pago parcial;
* pago exacto;
* pago cero;
* pago negativo;
* moneda diferente;
* fecha futura;
* cancelación;
* bloqueo de edición;
* persistencia fallida;
* recarga del historial.

### 11.5 Definición de terminado

* ruta de pago completa;
* confirmación accesible;
* atomicidad verificada;
* regresiones financieras en verde.

## 12. VS-06 — Excedentes y saldo a favor

### 12.1 Objetivo

Gestionar pagos mayores que el saldo y calcular saldo a favor.

### 12.2 Alcance

Incluye:

* monto aplicado;
* monto excedente;
* deuda sin saldo negativo;
* saldo a favor por cliente y moneda;
* no aplicación automática a otras deudas;
* visualización clara.

### 12.3 Criterios de aceptación

#### CA-VS06-01

Un pago mayor al saldo deja la deuda en cero.

#### CA-VS06-02

El excedente se registra como saldo a favor.

#### CA-VS06-03

La deuda nunca presenta saldo negativo.

#### CA-VS06-04

El saldo a favor se calcula separadamente en PEN y USD.

#### CA-VS06-05

El saldo a favor no se aplica automáticamente a otra deuda.

#### CA-VS06-06

La confirmación muestra el excedente previsto.

#### CA-VS06-07

La recarga reconstruye el mismo saldo a favor desde los pagos válidos.

### 12.4 Pruebas rojas iniciales

* excedente simple;
* varios pagos;
* excedentes en dos monedas;
* varias deudas del mismo cliente;
* reconstrucción;
* ausencia de saldo negativo;
* no aplicación automática.

### 12.5 Definición de terminado

* cálculo exacto;
* visualización por moneda;
* reconstrucción desde datos fuente;
* regresiones en verde.

## 13. VS-07 — Reversión de pagos

### 13.1 Objetivo

Revertir un pago manteniendo trazabilidad y recalculando saldos.

### 13.2 Alcance

Incluye:

* confirmación;
* pago marcado como revertido;
* fecha de reversión;
* exclusión de cálculos;
* reapertura de deuda;
* reducción de saldo a favor;
* prohibición de doble reversión.

### 13.3 Criterios de aceptación

#### CA-VS07-01

Un pago revertido permanece visible en historial.

#### CA-VS07-02

El pago revertido deja de participar en cálculos.

#### CA-VS07-03

El saldo pendiente se recalcula.

#### CA-VS07-04

Una deuda pagada puede reabrirse.

#### CA-VS07-05

El saldo a favor generado por el pago se reduce o elimina.

#### CA-VS07-06

Un pago no puede revertirse dos veces.

#### CA-VS07-07

Cancelar la confirmación no modifica el pago.

#### CA-VS07-08

La reversión y los recálculos se persisten de forma indivisible.

### 13.4 Pruebas rojas iniciales

* revertir pago parcial;
* revertir pago exacto;
* revertir pago excedente;
* doble reversión;
* cancelación;
* persistencia fallida;
* reconstrucción tras recarga.

### 13.5 Definición de terminado

* trazabilidad completa;
* recálculos exactos;
* historial comprensible;
* regresiones financieras en verde.

## 14. VS-08 — Archivo y reactivación de clientes

### 14.1 Objetivo

Conservar históricamente clientes con deudas y controlar su uso futuro.

### 14.2 Alcance

Incluye:

* archivar cliente con historial;
* reactivar cliente;
* impedir nuevas deudas mientras esté archivado;
* mantener deudas en consultas y totales;
* edición de datos del cliente archivado;
* confirmaciones.

### 14.3 Criterios de aceptación

#### CA-VS08-01

Un cliente con historial no puede enviarse a papelera.

#### CA-VS08-02

Puede archivarse después de confirmación.

#### CA-VS08-03

Sus deudas continúan participando en consultas y resúmenes.

#### CA-VS08-04

No puede recibir nuevas deudas.

#### CA-VS08-05

Puede editarse su información.

#### CA-VS08-06

Puede reactivarse.

#### CA-VS08-07

Después de reactivarse puede recibir nuevas deudas.

### 14.4 Pruebas rojas iniciales

* archivar cliente;
* intento de papelera;
* nueva deuda bloqueada;
* consulta histórica;
* total pendiente;
* reactivación;
* nueva deuda posterior.

### 14.5 Definición de terminado

* archivo diferenciado de eliminación;
* reglas históricas verificadas;
* regresiones en verde.

## 15. VS-09 — Papelera y restauración

### 15.1 Objetivo

Eliminar de forma recuperable clientes sin historial y deudas con todo su historial financiero.

### 15.2 Alcance

Incluye:

* eliminar deuda sin pagos;
* eliminar deuda con pagos;
* mover pagos y reversiones lógicamente;
* exclusión de cálculos;
* restauración conjunta;
* validación del cliente asociado;
* papelera consultable.

### 15.3 Criterios de aceptación

#### CA-VS09-01

Eliminar una deuda requiere confirmación explícita.

#### CA-VS09-02

La deuda deja de aparecer en vistas operativas.

#### CA-VS09-03

Sus pagos dejan de participar en saldos.

#### CA-VS09-04

Sus excedentes dejan de participar en saldo a favor disponible.

#### CA-VS09-05

La deuda permanece en papelera con su historial.

#### CA-VS09-06

Restaurarla recupera pagos y reversiones.

#### CA-VS09-07

Los cálculos vuelven a incorporar la deuda restaurada.

#### CA-VS09-08

No se restaura una deuda si su cliente no existe o está en papelera.

### 15.4 Pruebas rojas iniciales

* eliminar deuda sin pagos;
* eliminar deuda con pagos;
* exclusión de totales;
* exclusión de saldo a favor;
* restauración;
* relación inválida;
* cancelación;
* persistencia.

### 15.5 Definición de terminado

* eliminación lógica verificable;
* restauración íntegra;
* sin referencias huérfanas;
* regresiones en verde.

## 16. VS-10 — Endurecimiento de persistencia y recuperación

### 16.1 Objetivo

Endurecer la persistencia incremental desarrollada desde VS-01 y garantizar que los fallos, la corrupción o las versiones incompatibles no destruyan el último estado válido.

### 16.2 Alcance

Incluye:

- revisión integral de la carga y guardado desarrollados en las slices anteriores;
- escritura segura;
- estado candidato;
- validación antes de sustitución;
- sustitución controlada;
- simulación de escritura interrumpida;
- detección de corrupción;
- validación de referencias e invariantes globales;
- versión del esquema;
- rechazo de versiones desconocidas;
- reconstrucción de valores derivados;
- recuperación del último estado válido;
- separación entre datos operativos y datos de demostración.

No incluye crear por primera vez la persistencia básica de clientes, deudas o pagos, porque esa persistencia forma parte de sus respectivas vertical slices.

### 16.3 Criterios de aceptación

#### CA-VS10-01

Todas las operaciones implementadas en VS-01 a VS-09 permanecen después de reiniciar y superan la validación integral del estado.

#### CA-VS10-02

Una escritura fallida no destruye el último estado válido.

#### CA-VS10-03

No se muestra éxito cuando la escritura falla.

#### CA-VS10-04

Un estado corrupto se rechaza explícitamente.

#### CA-VS10-05

Una versión desconocida no se migra silenciosamente.

#### CA-VS10-06

Los datos derivados se reconstruyen desde datos fuente.

#### CA-VS10-07

Los datos operativos no se versionan en Git.

### 16.4 Pruebas rojas iniciales

* guardar y cargar;
* escritura interrumpida;
* contenido ilegible;
* referencia huérfana;
* versión desconocida;
* datos derivados inconsistentes;
* recuperación del último estado válido.

### 16.5 Definición de terminado

* fallas simuladas;
* integridad verificada;
* ausencia de pérdida silenciosa;
* todas las slices anteriores persisten correctamente.

## 17. VS-11 — Respaldos y restauración

### 17.1 Objetivo

Crear, listar, retener y restaurar respaldos del estado operativo.

### 17.2 Alcance

Incluye:

* respaldo por cambio relevante;
* respaldo diario;
* respaldo previo a restauración;
* catálogo separado;
* máximo cinco respaldos automáticos;
* validación;
* restauración;
* no recursividad.

### 17.3 Criterios de aceptación

#### CA-VS11-01

Un respaldo contiene el estado operativo y no otros respaldos.

#### CA-VS11-02

El catálogo no forma parte del contenido respaldado.

#### CA-VS11-03

Se conservan como máximo cinco respaldos automáticos válidos.

#### CA-VS11-04

El respaldo más antiguo solo se elimina después de validar el nuevo.

#### CA-VS11-05

Restaurar requiere confirmación.

#### CA-VS11-06

Antes de restaurar se intenta respaldar el estado vigente.

#### CA-VS11-07

La restauración no sustituye el catálogo.

#### CA-VS11-08

Una restauración fallida conserva el estado vigente.

#### CA-VS11-09

Después de restaurar se recalculan todos los derivados.

### 17.4 Pruebas rojas iniciales

* crear respaldo;
* respaldo no recursivo;
* retención 5+1;
* nuevo respaldo inválido;
* restauración correcta;
* respaldo previo;
* restauración fallida;
* catálogo preservado;
* versión migrable;
* versión desconocida.

### 17.5 Definición de terminado

* creación y restauración demostrables;
* política de retención verificada;
* integridad y no recursividad probadas;
* regresiones en verde.

## 18. VS-12 — Filtros, ordenamiento y búsqueda operativa

### 18.1 Objetivo

Permitir encontrar rápidamente la información relevante.

### 18.2 Alcance

Incluye:

* todos;
* pendientes;
* pendientes sin fecha;
* vencidas;
* pagadas;
* filtro por cliente;
* combinación de filtros;
* orden configurable;
* actualización de resultados y resúmenes.

### 18.3 Criterios de aceptación

#### CA-VS12-01

Cada filtro muestra únicamente deudas compatibles.

#### CA-VS12-02

El filtro por cliente puede combinarse con estado.

#### CA-VS12-03

El ordenamiento no modifica los datos fuente.

#### CA-VS12-04

Las deudas en papelera no aparecen.

#### CA-VS12-05

Los clientes archivados siguen disponibles en consultas históricas.

#### CA-VS12-06

Cambiar filtros actualiza la cantidad mostrada.

#### CA-VS12-07

El usuario identifica vencidas y total pendiente en menos de diez segundos.

### 18.4 Pruebas rojas iniciales

* cada estado;
* combinación cliente y estado;
* orden ascendente y descendente;
* igualdad de fechas;
* clientes archivados;
* exclusión de papelera;
* criterio de velocidad de interacción.

### 18.5 Definición de terminado

* filtros completos;
* orden determinista;
* interacción rápida;
* accesibilidad básica.

## 19. VS-13 — Accesibilidad y navegación completa

### 19.1 Objetivo

Garantizar que todos los flujos principales puedan utilizarse con teclado y tecnologías de asistencia.

### 19.2 Alcance

Incluye:

* orden de tabulación;
* foco;
* diálogos;
* etiquetas;
* encabezados;
* nombres accesibles;
* mensajes dinámicos;
* contraste;
* estados no dependientes del color;
* navegación sin ratón.

### 19.3 Criterios de aceptación

#### CA-VS13-01

Todos los controles principales son alcanzables mediante teclado.

#### CA-VS13-02

No existen trampas de foco.

#### CA-VS13-03

Los diálogos reciben y devuelven el foco correctamente.

#### CA-VS13-04

Los campos tienen etiquetas asociadas.

#### CA-VS13-05

Los mensajes críticos pueden ser anunciados.

#### CA-VS13-06

El estado vencido se comunica mediante texto.

#### CA-VS13-07

Las confirmaciones financieras tienen título y descripción.

#### CA-VS13-08

Los flujos end-to-end principales pueden completarse sin ratón.

### 19.4 Pruebas rojas iniciales

* recorrido de teclado;
* apertura y cierre de diálogo;
* retorno de foco;
* nombres accesibles;
* mensajes de error;
* mensajes de éxito;
* estado vencido;
* eliminación de elemento;
* restauración.

### 19.5 Definición de terminado

* revisión automatizada cuando sea posible;
* revisión manual con teclado;
* inspección semántica;
* evidencia registrada.

## 20. VS-14 — Integración end-to-end y endurecimiento

### 20.1 Objetivo

Validar el flujo completo y preparar la aplicación para revisión independiente.

### 20.2 Alcance

Incluye:

* recorrido completo;
* volumen máximo;
* regresión;
* corrupción;
* respaldos;
* accesibilidad;
* errores;
* datos ficticios;
* limpieza de artefactos;
* documentación de ejecución.

### 20.3 Escenarios obligatorios

#### E2E-01 — Ciclo básico

1. iniciar en vacío;
2. crear cliente;
3. crear deuda;
4. registrar pago parcial;
5. revisar saldo;
6. completar pago;
7. confirmar estado pagada.

#### E2E-02 — Excedente y reversión

1. crear deuda;
2. registrar pago excedente;
3. verificar saldo a favor;
4. revertir pago;
5. verificar reapertura;
6. verificar eliminación del saldo a favor.

#### E2E-03 — Archivo

1. crear cliente con deuda;
2. archivar cliente;
3. comprobar que no admite nueva deuda;
4. verificar que sus deudas siguen en totales;
5. reactivar;
6. crear nueva deuda.

#### E2E-04 — Papelera

1. eliminar deuda con pagos;
2. verificar exclusión de cálculos;
3. consultar papelera;
4. restaurar;
5. verificar historial y cálculos.

#### E2E-05 — Respaldo

1. generar estado con datos;
2. crear respaldo;
3. modificar estado;
4. restaurar respaldo;
5. verificar recuperación;
6. comprobar catálogo preservado.

#### E2E-06 — Corrupción

1. disponer de estado válido;
2. simular estado principal corrupto;
3. iniciar aplicación;
4. verificar rechazo;
5. ofrecer respaldo válido;
6. restaurar controladamente.

#### E2E-07 — Accesibilidad

Completar el ciclo básico usando únicamente teclado.

### 20.4 Criterios de aceptación

#### CA-VS14-01

Todos los escenarios obligatorios pasan.

#### CA-VS14-02

No existen fallos bloqueantes conocidos.

#### CA-VS14-03

El conjunto completo de pruebas está en verde.

#### CA-VS14-04

La aplicación funciona con el volumen máximo previsto.

#### CA-VS14-05

Los datos de prueba son ficticios.

#### CA-VS14-06

La documentación permite repetir la ejecución.

### 20.5 Definición de terminado

* pruebas completas en verde;
* regresión verificada;
* evidencia guardada;
* lista de riesgos residuales;
* preparación para separación de contexto y revisión independiente.

## 21. Backlog priorizado

### Prioridad P0 — Integridad y ruta crítica

| ID     | Trabajo                        |
| ------ | ------------------------------ |
| BL-001 | Estado vacío válido            |
| BL-002 | Modelo persistente versionado  |
| BL-003 | Crear y validar cliente        |
| BL-004 | Crear y validar deuda          |
| BL-005 | Cálculo exacto de dinero       |
| BL-006 | Estados de deuda               |
| BL-007 | Registrar pago parcial         |
| BL-008 | Registrar pago exacto          |
| BL-009 | Pago excedente                 |
| BL-010 | Saldo a favor                  |
| BL-011 | Revertir pago                  |
| BL-012 | Escritura segura               |
| BL-013 | Detección de corrupción        |
| BL-014 | Pruebas financieras de dominio |

### Prioridad P1 — Recuperabilidad y control operativo

| ID     | Trabajo                           |
| ------ | --------------------------------- |
| BL-015 | Archivo de clientes               |
| BL-016 | Reactivación                      |
| BL-017 | Papelera de deudas                |
| BL-018 | Restauración de deuda             |
| BL-019 | Papelera de cliente sin historial |
| BL-020 | Catálogo de respaldos             |
| BL-021 | Respaldo por cambio relevante     |
| BL-022 | Respaldo diario                   |
| BL-023 | Retención de cinco respaldos      |
| BL-024 | Restauración validada             |
| BL-025 | Respaldo previo a restauración    |

### Prioridad P2 — Operación eficiente

| ID     | Trabajo                         |
| ------ | ------------------------------- |
| BL-026 | Resumen por moneda              |
| BL-027 | Cantidad de vencidas            |
| BL-028 | Filtros por estado              |
| BL-029 | Filtro por cliente              |
| BL-030 | Ordenamiento configurable       |
| BL-031 | Actualización por cambio de día |
| BL-032 | Historial de pagos              |
| BL-033 | Historial de reversiones        |

### Prioridad P3 — Experiencia y endurecimiento

| ID     | Trabajo                     |
| ------ | --------------------------- |
| BL-034 | Navegación por teclado      |
| BL-035 | Gestión de foco             |
| BL-036 | Semántica accesible         |
| BL-037 | Mensajes dinámicos          |
| BL-038 | Estados vacíos              |
| BL-039 | Confirmaciones detalladas   |
| BL-040 | Pruebas end-to-end          |
| BL-041 | Pruebas de volumen          |
| BL-042 | Documentación de ejecución  |
| BL-043 | Evidencia de uso de skills  |
| BL-044 | Revisión de seguridad local |

## 22. Reglas del backlog

### BL-RG-01

Un ítem no puede cerrarse si sus pruebas aplicables no están en verde.

### BL-RG-02

Los ítems P0 no pueden diferirse sin detener el piloto y obtener aprobación.

### BL-RG-03

Los ítems P1 pueden reordenarse, pero no omitirse.

### BL-RG-04

Los ítems P2 y P3 podrán dividirse en tareas menores sin alterar sus criterios.

### BL-RG-05

Todo defecto nuevo deberá:

* registrarse;
* clasificarse;
* vincularse con una prueba;
* corregirse antes del cierre si es bloqueante.

## 23. Plan de pruebas por capa

## 23.1 Dominio

### Clientes

* nombre válido;
* nombre vacío;
* espacios;
* archivo;
* reactivación;
* papelera sin historial;
* prohibición de papelera con historial.

### Deudas

* monto válido;
* monto cero;
* monto negativo;
* más de dos decimales;
* moneda;
* vencimiento opcional;
* edición sin pagos;
* bloqueo con historial de pagos.

### Pagos

* parcial;
* exacto;
* excedente;
* moneda incorrecta;
* fecha futura;
* varios pagos;
* orden determinista;
* reversión;
* doble reversión.

### Estados

* pendiente;
* pendiente sin fecha;
* vence hoy;
* vencida;
* pagada;
* reapertura.

### Saldos

* pendiente;
* saldo a favor;
* separación monetaria;
* exclusión de revertidos;
* exclusión de papelera;
* restauración.

## 23.2 Aplicación

* comandos válidos;
* rechazo por precondición;
* confirmación cancelada;
* confirmación obsoleta;
* persistencia exitosa;
* persistencia fallida;
* respaldo requerido;
* resultado estructurado;
* traducción de errores.

## 23.3 Persistencia

* estado vacío;
* guardar;
* cargar;
* escritura temporal;
* sustitución segura;
* versión;
* migración conocida;
* versión desconocida;
* corrupción;
* referencias huérfanas;
* reconstrucción de derivados.

## 23.4 Respaldos

* creación;
* validación;
* no recursividad;
* catálogo;
* retención;
* fallo de creación;
* restauración;
* respaldo previo;
* catálogo preservado;
* fallo de restauración.

## 23.5 Presentación

* formularios;
* errores por campo;
* conservación de entrada;
* filtros;
* ordenamiento;
* resúmenes;
* confirmaciones;
* mensajes;
* estados vacíos;
* foco;
* teclado;
* lector de pantalla.

## 23.6 End-to-end

Se ejecutarán los escenarios E2E-01 a E2E-07.

## 24. Fase roja

Antes de implementar una slice deberá existir evidencia de que:

1. las pruebas fueron escritas;
2. fallan;
3. la falla corresponde a comportamiento ausente;
4. no fallan por configuración accidental;
5. el alcance de la prueba coincide con la slice.

### PR-RED-01

No cuenta como fase roja una prueba que no pueda ejecutarse.

### PR-RED-02

No cuenta como fase roja una prueba que falle por error de sintaxis o configuración no relacionado.

### PR-RED-03

La evidencia mínima incluirá:

* comando ejecutado;
* cantidad de pruebas;
* pruebas fallidas;
* razón esperada;
* referencia al commit.

### PR-RED-04

Las pruebas de una slice pueden escribirse en grupos, pero deben cubrir su riesgo principal antes de implementar.

## 25. Datos ficticios de prueba

Se utilizará un conjunto base reproducible.

### Clientes

| ID lógico | Nombre             |
| --------- | ------------------ |
| C-001     | Bodega Sol         |
| C-002     | Librería Norte     |
| C-003     | Taller Central     |
| C-004     | Cliente Sin Deudas |
| C-005     | Negocio Archivado  |

### Deudas PEN

| Caso      |  Monto | Vencimiento  |
| --------- | -----: | ------------ |
| D-PEN-001 | 100.00 | ayer         |
| D-PEN-002 | 250.50 | hoy          |
| D-PEN-003 |  80.00 | mañana       |
| D-PEN-004 |  60.00 | sin fecha    |
| D-PEN-005 | 150.00 | fecha pasada |

### Deudas USD

| Caso      |  Monto | Vencimiento |
| --------- | -----: | ----------- |
| D-USD-001 |  50.00 | ayer        |
| D-USD-002 | 120.25 | futuro      |
| D-USD-003 |  75.00 | sin fecha   |

### Pagos

| Caso  | Deuda     |  Monto |
| ----- | --------- | -----: |
| P-001 | D-PEN-001 |  40.00 |
| P-002 | D-PEN-001 |  60.00 |
| P-003 | D-PEN-002 | 300.00 |
| P-004 | D-USD-001 |  20.00 |
| P-005 | D-USD-001 |  30.00 |

### Casos especiales

* pago excedente PEN 50.00;
* pago revertido;
* deuda eliminada con pagos;
* cliente archivado con deuda pendiente;
* respaldo válido;
* respaldo corrupto;
* versión de esquema desconocida.

## 26. Volumen de prueba

La prueba de volumen deberá incluir al menos:

* 100 clientes;
* 500 deudas;
* combinación de PEN y USD;
* deudas con y sin fecha;
* estados variados;
* clientes activos y archivados;
* deudas en papelera;
* al menos 1,000 pagos;
* pagos revertidos;
* saldos a favor;
* cinco respaldos disponibles.

El objetivo no es medir alta concurrencia, sino confirmar:

* carga razonable;
* filtros responsivos;
* cálculos correctos;
* ausencia de bloqueo perceptible;
* persistencia manejable.

## 27. Matriz de trazabilidad resumida

| Slice | Requisitos principales                      |
| ----- | ------------------------------------------- |
| VS-01 | RF-PER, RNF-SEG, RNF-REN                    |
| VS-02 | RF-CLI-01 a RF-CLI-08                       |
| VS-03 | RF-DEU-01 a RF-DEU-11                       |
| VS-04 | RF-EST, RF-CAL                              |
| VS-05 | RF-PAG-01 a RF-PAG-04, RF-PAG-06, RF-PAG-10 |
| VS-06 | RF-PAG-04 y RF-PAG-05, RF-CAL-02            |
| VS-07 | RF-PAG-07 a RF-PAG-09                       |
| VS-08 | RF-CLI-05 a RF-CLI-07                       |
| VS-09 | RF-DEU-09 a RF-DEU-11, RF-PAP               |
| VS-10 | RF-PER, RNF-SEG                             |
| VS-11 | RF-BKP                                      |
| VS-12 | RF-FIL, RF-ORD, RF-RES                      |
| VS-13 | RNF-ACC y requisitos UX                     |
| VS-14 | Conjunto completo                           |

La codificación exacta deberá verificarse contra `docs/REQUIREMENTS.md` durante la implementación.

## 28. Definition of Ready de una slice

Una slice estará lista para comenzar cuando:

* su objetivo esté claro;
* sus dependencias estén terminadas o disponibles;
* sus requisitos estén identificados;
* sus criterios de aceptación estén definidos;
* sus pruebas rojas estén especificadas;
* sus datos de prueba estén disponibles;
* no exista una decisión tecnológica bloqueante sin resolver;
* el responsable humano haya autorizado su ejecución cuando corresponda.

## 29. Definition of Done de una slice

Una slice estará terminada cuando:

* criterios de aceptación cumplidos;
* pruebas de dominio en verde;
* pruebas de aplicación en verde;
* pruebas de persistencia en verde, cuando aplique;
* pruebas de presentación en verde, cuando aplique;
* prueba end-to-end mínima en verde;
* accesibilidad aplicable verificada;
* errores tratados;
* persistencia confirmada;
* datos ficticios;
* documentación actualizada;
* CI en verde cuando ya esté habilitado;
* revisión de código realizada;
* sin hallazgos bloqueantes conocidos.

## 30. Evidencia por slice

Cada slice deberá registrar:

* identificador;
* requisitos cubiertos;
* archivos modificados;
* pruebas agregadas;
* resultado rojo inicial;
* resultado verde final;
* comandos ejecutados;
* capturas o evidencia necesaria;
* riesgos;
* deuda diferida;
* decisión humana.

## 31. Política de defectos

### Bloqueante

Impide continuar o compromete:

* dinero;
* integridad;
* recuperación;
* trazabilidad;
* seguridad;
* función principal.

Debe corregirse antes de continuar.

### Alto

Afecta un flujo principal sin alternativa razonable.

Debe corregirse antes de cerrar la slice.

### Medio

Afecta experiencia o caso secundario.

Puede diferirse con registro y aprobación.

### Bajo

Mejora menor sin impacto funcional relevante.

Puede quedar como deuda documentada.

## 32. Riesgos del plan

### R-PI-01 — Exceso de alcance

Mitigación:

* mantener las slices;
* impedir funciones no congeladas;
* diferir mejoras no esenciales.

### R-PI-02 — Duplicación de reglas

Mitigación:

* dominio como única fuente;
* pruebas directas;
* revisión de dependencias.

### R-PI-03 — Persistencia frágil

Mitigación:

* VS-10 y VS-11 obligatorias;
* simulación de fallas;
* escritura segura.

### R-PI-04 — Interfaz visualmente avanzada pero inconsistente

Mitigación:

* criterios de aceptación;
* skills subordinados;
* revisión funcional antes que estética.

### R-PI-05 — Pruebas end-to-end demasiado tardías

Mitigación:

* una prueba mínima por slice;
* suite completa en VS-14.

### R-PI-06 — Deuda técnica oculta

Mitigación:

* registro por slice;
* clasificación;
* aprobación explícita.

## 33. Decisiones diferidas a P4-11

P4-11 deberá decidir:

* lenguaje;
* framework o ausencia de framework;
* sistema de módulos;
* formato físico de persistencia;
* servidor local o ejecución directa;
* herramienta de pruebas;
* herramienta de pruebas de navegador;
* automatización CI;
* representación monetaria;
* manejo concreto de fechas;
* skills a instalar;
* estructura física de archivos;
* estrategia de estilos;
* mecanismo de respaldo;
* comandos de instalación y ejecución.

## 34. Restricciones de P4-10

Durante P4-10 no se permite:

* escribir código de producto;
* crear pruebas ejecutables;
* instalar dependencias;
* seleccionar framework;
* instalar skills;
* iniciar implementación;
* omitir P4-11;
* modificar requisitos congelados sin autorización.

## 35. Criterios de aprobación de P4-10

P4-10 podrá cerrarse cuando el responsable humano confirme que:

* las vertical slices cubren el producto;
* el orden es razonable;
* las dependencias están identificadas;
* los riesgos financieros se prueban temprano;
* cada slice tiene criterios de aceptación;
* existe Definition of Ready;
* existe Definition of Done;
* el backlog está priorizado;
* la fase roja está definida;
* el plan cubre dominio, aplicación, persistencia, presentación y end-to-end;
* existen datos ficticios reproducibles;
* se incluye prueba de volumen;
* respaldo, restauración y corrupción están cubiertos;
* accesibilidad está incorporada;
* las decisiones tecnológicas permanecen diferidas;
* no se escribió código.

## 36. Estado

El plan de implementación permanece propuesto y pendiente de presión final y aprobación humana en P4-10.

La selección tecnológica y la implementación continúan prohibidas hasta cerrar los gates correspondientes.
