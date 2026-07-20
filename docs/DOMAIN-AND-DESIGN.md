# Modelo de dominio y diseño — PILOT-004

> Estado: modelo de dominio propuesto para aprobación en P4-8.
> La sección de diseño técnico permanece pendiente para P4-9.
> Este documento no selecciona tecnología, no instala skills y no autoriza implementación.

## 1. Identificación

* Proyecto: aplicación local de seguimiento de cobranzas.
* Gate actual: P4-8 — modelo de dominio.
* Requisitos de origen: `docs/REQUIREMENTS.md`.
* Usuario: pequeño comerciante o responsable de negocio familiar.
* Escala objetivo:

  * hasta 100 clientes;
  * hasta 500 deudas;
  * pagos asociados;
  * cinco respaldos automáticos.
* Monedas:

  * PEN;
  * USD.
* Implementación: no autorizada.

## 2. Propósito del modelo

El modelo debe representar de forma consistente:

* clientes;
* deudas;
* pagos;
* reversiones;
* saldos pendientes;
* saldos a favor;
* clientes archivados;
* elementos enviados a papelera;
* respaldos;
* restauraciones;
* estados derivados.

El modelo deberá impedir o detectar estados financieros contradictorios.

## 3. Principios del dominio

### MD-PR-01 — Trazabilidad

Los movimientos financieros no se eliminan silenciosamente.

Un pago revertido permanece registrado y deja de participar en los cálculos.

### MD-PR-02 — Estados derivados

El estado de una deuda se calcula a partir de sus datos y pagos.

No se introduce un estado manual independiente que pueda contradecir el saldo.

### MD-PR-03 — Separación monetaria

PEN y USD se calculan por separado.

No existe conversión entre monedas.

### MD-PR-04 — Deudas sin saldo negativo

Una deuda nunca puede presentar saldo pendiente menor que cero.

Un pago excedente genera saldo a favor.

### MD-PR-05 — Conservación histórica

Los clientes que tengan o hayan tenido deudas no se eliminan.

Pueden archivarse y reactivarse.

### MD-PR-06 — Eliminación recuperable

La eliminación de una deuda implica moverla a papelera, junto con sus pagos y reversiones.

No implica destrucción física inmediata.

### MD-PR-07 — Tiempo civil local

Las reglas de vencimiento se interpretan mediante fecha civil.

Una deuda que vence hoy permanece pendiente durante todo el día y se considera vencida a partir del día siguiente.

### MD-PR-08 — Datos calculados

Los siguientes valores se derivan y no constituyen fuentes independientes de verdad:

* estado de deuda;
* saldo pendiente;
* monto pagado válido;
* saldo a favor;
* total pendiente;
* cantidad de vencidas.

## 4. Agregados del dominio

Se definen cuatro agregados principales:

1. Cliente;
2. Deuda;
3. Estado de datos de la aplicación;
4. Respaldo.

### 4.1 Cliente como agregado

El agregado Cliente controla:

* identidad;
* nombre;
* nota;
* condición activo o archivado;
* historial de deudas asociadas;
* saldo a favor por moneda.

### 4.2 Deuda como agregado

El agregado Deuda controla:

* monto original;
* moneda;
* concepto;
* vencimiento;
* pagos;
* reversiones;
* saldo pendiente;
* estado derivado;
* presencia en papelera.

Los pagos no se modifican directamente fuera de la deuda a la que pertenecen.

### 4.3 Estado de la aplicación

Representa el conjunto coherente de:

* clientes;
* deudas;
* papelera;
* metadatos;
* versión del esquema de datos.

### 4.4 Respaldo

Representa una captura validable del estado completo de la aplicación en un momento determinado.

## 5. Entidad Cliente

### 5.1 Identidad

Cada cliente posee un identificador estable y único.

El identificador:

* no depende del nombre;
* no cambia al editar el cliente;
* no se reutiliza;
* permanece estable al archivar o reactivar.

### 5.2 Atributos

| Atributo            | Tipo conceptual       | Regla                                             |
| ------------------- | --------------------- | ------------------------------------------------- |
| `id`                | Identificador         | Obligatorio, único e inmutable                    |
| `nombre`            | Texto                 | Obligatorio y normalizado                         |
| `nota`              | Texto opcional        | Puede estar vacía                                 |
| `estado`            | Activo o archivado    | Nunca ambos                                       |
| `creadoEn`          | Fecha y hora          | Inmutable                                         |
| `actualizadoEn`     | Fecha y hora          | Se actualiza con cambios                          |
| `archivadoEn`       | Fecha y hora opcional | Obligatoria si está archivado                     |
| `reactivadoEn`      | Fecha y hora opcional | Registra la reactivación más reciente             |
| `enPapelera`        | Booleano              | Solo válido para clientes sin historial de deudas |
| `enviadoPapeleraEn` | Fecha y hora opcional | Obligatoria cuando está en papelera               |

### 5.3 Invariantes

#### INV-CLI-01

El nombre normalizado no puede quedar vacío.

#### INV-CLI-02

Un cliente archivado no puede recibir nuevas deudas.

#### INV-CLI-03

Un cliente debe reactivarse antes de recibir una nueva deuda.

#### INV-CLI-04

Un cliente que tenga o haya tenido una deuda no puede enviarse a la papelera.

#### INV-CLI-05

Un cliente en papelera no puede estar activo ni archivado.

#### INV-CLI-06

Un cliente archivado conserva todas sus relaciones históricas.

#### INV-CLI-07

La restauración de un cliente desde papelera lo devuelve como activo.

### 5.4 Operaciones conceptuales

* crear cliente;
* editar cliente;
* archivar cliente;
* reactivar cliente;
* enviar cliente sin historial a papelera;
* restaurar cliente desde papelera.

## 6. Entidad Deuda

### 6.1 Identidad

Cada deuda posee un identificador único, estable e inmutable.

### 6.2 Atributos fuente

| Atributo            | Tipo conceptual       | Regla                                      |
| ------------------- | --------------------- | ------------------------------------------ |
| `id`                | Identificador         | Único e inmutable                          |
| `clienteId`         | Referencia            | Cliente existente y activo al crear        |
| `concepto`          | Texto                 | Obligatorio y no vacío                     |
| `montoOriginal`     | Dinero                | Mayor que cero                             |
| `moneda`            | PEN o USD             | Inmutable después del primer pago          |
| `fechaVencimiento`  | Fecha opcional        | Puede estar ausente                        |
| `creadaEn`          | Fecha y hora          | Inmutable                                  |
| `actualizadaEn`     | Fecha y hora          | Cambia con edición válida                  |
| `enPapelera`        | Booleano              | Excluye la deuda de operaciones y cálculos |
| `enviadaPapeleraEn` | Fecha y hora opcional | Obligatoria si está en papelera            |

### 6.3 Valores derivados

| Valor               | Cálculo conceptual                                     |
| ------------------- | ------------------------------------------------------ |
| `totalPagosValidos` | Suma de pagos no revertidos                            |
| `saldoPendiente`    | Máximo entre cero y monto original menos pagos válidos |
| `excedente`         | Máximo entre cero y pagos válidos menos monto original |
| `estado`            | Derivado del saldo, vencimiento y fecha actual         |
| `tienePagos`        | Existe al menos un pago registrado, válido o revertido |

### 6.4 Invariantes

#### INV-DEU-01

Toda deuda pertenece exactamente a un cliente.

#### INV-DEU-02

La deuda solo puede crearse para un cliente activo.

#### INV-DEU-03

El concepto normalizado no puede estar vacío.

#### INV-DEU-04

El monto original debe ser mayor que cero.

#### INV-DEU-05

El monto debe expresarse con precisión monetaria de dos decimales.

#### INV-DEU-06

La moneda debe ser PEN o USD.

#### INV-DEU-07

Una deuda sin pagos puede editarse.

#### INV-DEU-08

Después del primer pago registrado, incluso si luego fue revertido, la deuda queda bloqueada para edición.

La existencia histórica del pago conserva el bloqueo.

#### INV-DEU-09

Una deuda en papelera no acepta nuevos pagos.

#### INV-DEU-10

Una deuda en papelera no participa en resúmenes, filtros operativos ni saldos a favor disponibles.

#### INV-DEU-11

Al restaurar una deuda se restauran conjuntamente sus pagos y reversiones.

#### INV-DEU-12

La restauración requiere que el cliente asociado exista y no esté en papelera.

#### INV-DEU-13

El saldo pendiente nunca es negativo.

#### INV-DEU-14

El estado no puede editarse manualmente.

### 6.5 Operaciones conceptuales

* crear deuda;
* editar deuda sin pagos;
* registrar pago;
* revertir pago;
* enviar deuda a papelera;
* restaurar deuda;
* calcular saldo;
* calcular estado.

## 7. Entidad Pago

### 7.1 Identidad

Cada pago posee un identificador único e inmutable.

### 7.2 Atributos

| Atributo         | Tipo conceptual    | Regla                                            |
| ---------------- | ------------------ | ------------------------------------------------ |
| `id`             | Identificador      | Único                                            |
| `deudaId`        | Referencia         | Deuda existente y fuera de papelera al registrar |
| `monto`          | Dinero             | Mayor que cero                                   |
| `moneda`         | PEN o USD          | Igual a la moneda de la deuda                    |
| `fechaPago`      | Fecha              | No futura                                        |
| `registradoEn`   | Fecha y hora       | Inmutable                                        |
| `estado`         | Válido o revertido | Derivado de existencia de reversión              |
| `reversion`      | Reversión opcional | Máximo una                                       |
| `montoAplicado`  | Dinero derivado    | Parte que reduce la deuda                        |
| `montoExcedente` | Dinero derivado    | Parte que genera saldo a favor                   |

### 7.3 Invariantes

#### INV-PAG-01

El monto debe ser mayor que cero.

#### INV-PAG-02

El pago utiliza la misma moneda que la deuda.

#### INV-PAG-03

La fecha del pago no puede ser posterior a la fecha actual.

#### INV-PAG-04

Un pago pertenece exactamente a una deuda.

#### INV-PAG-05

Un pago revertido no puede revertirse nuevamente.

#### INV-PAG-06

Un pago revertido no participa en cálculos.

#### INV-PAG-07

El pago no se elimina físicamente por una reversión.

#### INV-PAG-08

El monto aplicado más el monto excedente debe ser igual al monto del pago.

#### INV-PAG-09

El monto aplicado no puede superar el saldo existente inmediatamente antes del pago.

#### INV-PAG-10

El monto excedente es cero cuando el pago no supera el saldo previo.

### 7.4 Distribución conceptual del pago

Para un pago `P` y un saldo previo `S`:

* monto aplicado = mínimo entre `P` y `S`;
* monto excedente = máximo entre cero y `P - S`;
* nuevo saldo = máximo entre cero y `S - P`.

### 7.5 Orden de aplicación

Los pagos válidos se aplican según:

1. fecha de registro;
2. identificador estable como desempate.

La fecha declarada del pago representa cuándo ocurrió, pero el orden interno de aplicación se basa en el registro para mantener resultados deterministas.

Esta regla evita que la edición retrospectiva de fechas altere silenciosamente la distribución histórica de excedentes.

## 8. Objeto Reversión de Pago

### 8.1 Naturaleza

La reversión no constituye un pago negativo.

Es un registro asociado a un pago que invalida su efecto financiero.

### 8.2 Atributos

| Atributo         | Tipo conceptual    | Regla                       |
| ---------------- | ------------------ | --------------------------- |
| `id`             | Identificador      | Único                       |
| `pagoId`         | Referencia         | Pago válido                 |
| `revertidoEn`    | Fecha y hora       | Obligatoria                 |
| `motivo`         | Texto opcional     | Puede solicitarse en diseño |
| `saldoAnterior`  | Evidencia opcional | Para trazabilidad           |
| `saldoPosterior` | Evidencia opcional | Para trazabilidad           |

### 8.3 Invariantes

#### INV-REV-01

Solo un pago válido puede revertirse.

#### INV-REV-02

Cada pago admite como máximo una reversión.

#### INV-REV-03

La reversión conserva el pago original.

#### INV-REV-04

Después de revertir se recalcula toda la deuda utilizando únicamente pagos válidos.

#### INV-REV-05

Si el pago generó excedente, dicho excedente deja de formar parte del saldo a favor.

#### INV-REV-06

Una reversión puede reabrir una deuda previamente pagada.

## 9. Saldo a favor

### 9.1 Naturaleza

El saldo a favor no se almacena como un valor editable independiente.

Se calcula a partir de los excedentes de pagos válidos.

### 9.2 Identidad conceptual

El saldo a favor se agrupa por:

* cliente;
* moneda.

### 9.3 Fórmula

Para un cliente y una moneda:

`saldo a favor = suma de excedentes de pagos válidos en deudas no eliminadas`

### 9.4 Invariantes

#### INV-SAF-01

El saldo a favor nunca es negativo.

#### INV-SAF-02

PEN y USD se calculan separadamente.

#### INV-SAF-03

No se aplica automáticamente a otras deudas.

#### INV-SAF-04

Los excedentes de pagos revertidos no participan.

#### INV-SAF-05

Las deudas en papelera no aportan saldo a favor disponible.

#### INV-SAF-06

Al restaurar una deuda, sus excedentes válidos vuelven a participar en el cálculo.

## 10. Estado de la deuda

### 10.1 Estados posibles

* `PAGADA`;
* `PENDIENTE`;
* `PENDIENTE_SIN_FECHA`;
* `VENCIDA`.

### 10.2 Regla de derivación

#### PAGADA

Cuando:

`saldoPendiente = 0`

#### PENDIENTE_SIN_FECHA

Cuando:

* saldo pendiente mayor que cero;
* fecha de vencimiento ausente.

#### PENDIENTE

Cuando:

* saldo pendiente mayor que cero;
* existe fecha de vencimiento;
* fecha actual menor o igual que fecha de vencimiento.

#### VENCIDA

Cuando:

* saldo pendiente mayor que cero;
* existe fecha de vencimiento;
* fecha actual posterior a fecha de vencimiento.

### 10.3 Precedencia

La evaluación ocurre en este orden:

1. si saldo es cero: pagada;
2. si no existe vencimiento: pendiente sin fecha;
3. si hoy es posterior al vencimiento: vencida;
4. en cualquier otro caso: pendiente.

### 10.4 Casos imposibles

* deuda pagada y vencida simultáneamente;
* deuda vencida sin fecha;
* deuda con saldo negativo;
* deuda con estado manual diferente del derivado.

## 11. Papelera

### 11.1 Elementos admitidos

* cliente sin historial de deudas;
* deuda con o sin pagos;
* pagos y reversiones pertenecientes a una deuda eliminada.

### 11.2 Naturaleza

La papelera se representa mediante marcas de eliminación lógica y metadatos.

No es obligatorio duplicar físicamente los elementos en otra colección.

### 11.3 Reglas

#### INV-PAP-01

Una deuda en papelera mantiene su relación con el cliente.

#### INV-PAP-02

Los pagos de una deuda en papelera no participan en cálculos operativos.

#### INV-PAP-03

Un cliente con historial de deuda no puede entrar en papelera.

#### INV-PAP-04

Restaurar una deuda restaura conjuntamente su historial financiero.

#### INV-PAP-05

No puede restaurarse una deuda si su cliente está en papelera.

#### INV-PAP-06

La eliminación física definitiva queda fuera del flujo principal.

## 12. Respaldo

### 12.1 Naturaleza

Un respaldo es una captura completa y coherente del estado operativo de la aplicación.

No incluye el historial ni el contenido de otros respaldos.

### 12.2 Atributos conceptuales

| Atributo         | Regla                              |
| ---------------- | ---------------------------------- |
| `id`             | Identificador único                |
| `creadoEn`       | Fecha y hora                       |
| `motivo`         | Cambio relevante o respaldo diario |
| `versionEsquema` | Versión de estructura de datos     |
| `integridad`     | Estado de validación               |
| `contenido`      | Captura completa                   |
| `checksum`       | Opcional según diseño técnico      |

### 12.3 Contenido mínimo

* clientes;
* deudas;
* pagos;
* reversiones;
* marcas de archivo;
* papelera;
* metadatos;
* versión del esquema.

El respaldo no contendrá:

- historial de respaldos;
- contenido de otros respaldos;
- copias recursivas de sí mismo;
- información derivada que pueda recalcularse de forma segura.

Los valores derivados podrán recalcularse después de restaurar.

### 12.4 Invariantes

#### INV-BKP-01

Un respaldo debe representar un estado coherente.

#### INV-BKP-02

Un respaldo inválido no reemplaza silenciosamente a uno válido.

#### INV-BKP-03

Se conservan como máximo cinco respaldos automáticos.

#### INV-BKP-04

Al crear el sexto respaldo automático se elimina el más antiguo de los cinco anteriores.

#### INV-BKP-05

La restauración requiere confirmación humana.

#### INV-BKP-06

Antes de restaurar se intenta crear un respaldo del estado vigente.

#### INV-BKP-07

Después de restaurar se recalculan todos los valores derivados.

#### INV-BKP-08

Los datos restaurados deben validar la versión del esquema.

## 13. Estado completo de la aplicación

### 13.1 Estructura conceptual

El estado administrado por la aplicación se divide en:

### Estado operativo respaldable

- versión del esquema;
- colección de clientes;
- colección de deudas;
- pagos contenidos en sus deudas o relacionados por identificador;
- reversiones;
- metadatos operativos.

### Estado de administración de respaldos

- catálogo de respaldos disponibles;
- metadatos de retención;
- ubicación o referencias a cada respaldo.

El estado de administración de respaldos no se incluye dentro del contenido respaldado.

### 13.2 Invariantes globales

#### INV-APP-01

Todo `clienteId` de una deuda debe existir.

#### INV-APP-02

Todo `deudaId` de un pago debe existir.

#### INV-APP-03

Todo `pagoId` de una reversión debe existir.

#### INV-APP-04

No hay identificadores duplicados dentro del mismo tipo de entidad.

#### INV-APP-05

Toda referencia monetaria de un pago coincide con su deuda.

#### INV-APP-06

Los datos operativos no forman parte del repositorio Git.

#### INV-APP-07

Los valores derivados pueden reconstruirse desde los datos fuente.

#### INV-APP-08

Un estado que no cumpla invariantes no puede sustituir silenciosamente al estado válido vigente.

#### INV-APP-09

Ningún respaldo puede contener directa o indirectamente otro respaldo.

La restauración reemplaza únicamente el estado operativo y no el catálogo de respaldos disponibles.

## 14. Eventos de dominio

### Cliente

* `ClienteCreado`;
* `ClienteEditado`;
* `ClienteArchivado`;
* `ClienteReactivado`;
* `ClienteEnviadoAPapelera`;
* `ClienteRestaurado`.

### Deuda

* `DeudaCreada`;
* `DeudaEditada`;
* `DeudaEnviadaAPapelera`;
* `DeudaRestaurada`;
* `EstadoDeudaRecalculado`.

### Pago

* `PagoRegistrado`;
* `PagoRevertido`;
* `SaldoFavorGenerado`;
* `SaldoFavorReducido`;
* `DeudaPagada`;
* `DeudaReabierta`.

### Respaldo

* `RespaldoCreado`;
* `RespaldoDescartadoPorRetencion`;
* `RestauracionSolicitada`;
* `RespaldoPrevioARestauracionCreado`;
* `EstadoRestaurado`;
* `RestauracionRechazadaPorDatosInvalidos`.

## 15. Comandos del dominio

Los comandos representan intenciones del usuario:

* `CrearCliente`;
* `EditarCliente`;
* `ArchivarCliente`;
* `ReactivarCliente`;
* `EliminarClienteSinHistorial`;
* `RestaurarCliente`;
* `CrearDeuda`;
* `EditarDeuda`;
* `EliminarDeuda`;
* `RestaurarDeuda`;
* `RegistrarPago`;
* `RevertirPago`;
* `CrearRespaldo`;
* `RestaurarRespaldo`.

Cada comando deberá:

1. validar precondiciones;
2. rechazar estados inválidos;
3. generar un resultado explícito;
4. actualizar valores derivados;
5. producir respaldo cuando corresponda.

## 16. Errores de dominio

Se definen categorías conceptuales de error:

### Error de validación

Ejemplos:

* nombre vacío;
* concepto vacío;
* monto cero;
* más de dos decimales;
* fecha futura de pago.

### Error de referencia

Ejemplos:

* cliente inexistente;
* deuda inexistente;
* pago inexistente.

### Error de estado

Ejemplos:

* crear deuda para cliente archivado;
* editar deuda con pagos;
* pagar deuda en papelera;
* revertir pago ya revertido.

### Error de integridad

Ejemplos:

* moneda del pago diferente;
* respaldo incompleto;
* referencia huérfana;
* identificador duplicado.

### Error de confirmación

La operación requiere confirmación y esta no fue otorgada.

## 17. Casos críticos modelados

### 17.1 Pago parcial

* deuda: PEN 100;
* pago: PEN 40;
* saldo: PEN 60;
* estado depende del vencimiento.

### 17.2 Pago exacto

* deuda: PEN 100;
* pago: PEN 100;
* saldo: PEN 0;
* estado: pagada;
* saldo a favor: PEN 0.

### 17.3 Pago excedente

* deuda: PEN 100;
* pago: PEN 120;
* saldo: PEN 0;
* estado: pagada;
* saldo a favor: PEN 20.

### 17.4 Reversión de pago excedente

* se revierte el pago de PEN 120;
* saldo de deuda vuelve a PEN 100;
* saldo a favor PEN 20 desaparece;
* estado se recalcula.

### 17.5 Vencimiento hoy

* saldo mayor que cero;
* fecha de vencimiento igual a hoy;
* estado: pendiente.

### 17.6 Día posterior al vencimiento

* saldo mayor que cero;
* hoy posterior al vencimiento;
* estado: vencida.

### 17.7 Deuda sin fecha

* saldo mayor que cero;
* vencimiento ausente;
* estado: pendiente sin fecha.

### 17.8 Cliente archivado

* permanece consultable;
* no admite nuevas deudas;
* puede reactivarse.

### 17.9 Deuda en papelera

* conserva pagos;
* no aparece en totales;
* no genera saldo a favor disponible;
* puede restaurarse.

### 17.10 Restauración de respaldo

* se valida el respaldo;
* se crea respaldo del estado actual cuando sea posible;
* se reemplaza el estado;
* se recalculan valores derivados;
* se verifica integridad.

## 18. Decisiones diferidas a P4-9

El diseño técnico deberá resolver:

* representación física de entidades;
* formato de persistencia;
* mecanismo de almacenamiento local;
* mecanismo de respaldo;
* estrategia de validación de esquema;
* organización de componentes;
* flujo de actualización de interfaz;
* estrategia de accesibilidad;
* límites entre dominio, persistencia y presentación;
* manejo técnico de fechas y dinero;
* pruebas automatizadas;
* estructura de archivos;
* mecanismo de restauración.

Estas decisiones no forman parte de P4-8.

## 19. Decisiones diferidas a P4-11

La selección tecnológica deberá resolver:

* lenguaje;
* framework o ausencia de framework;
* librerías;
* herramientas de pruebas;
* herramientas de CI;
* instalación de skills;
* mecanismo de ejecución local;
* empaquetado o servidor local.

## 20. Trazabilidad de requisitos

| Área         | Requisitos relacionados |
| ------------ | ----------------------- |
| Cliente      | RF-CLI-01 a RF-CLI-08   |
| Deuda        | RF-DEU-01 a RF-DEU-12   |
| Estados      | RF-EST-01 a RF-EST-06   |
| Pagos        | RF-PAG-01 a RF-PAG-10   |
| Cálculos     | RF-CAL-01 a RF-CAL-06   |
| Papelera     | RF-PAP-01 a RF-PAP-04   |
| Respaldo     | RF-BKP-01 a RF-BKP-07   |
| Persistencia | RF-PER-01 a RF-PER-03   |
| Seguridad    | RNF-SEG-01 a RNF-SEG-05 |
| Escala       | RNF-REN-01 a RNF-REN-03 |

## 21. Criterios de aprobación de P4-8

P4-8 podrá cerrarse cuando el responsable humano confirme que:

* las entidades principales están identificadas;
* sus responsabilidades no se contradicen;
* las relaciones están definidas;
* las invariantes monetarias son explícitas;
* los estados se derivan sin ambigüedad;
* pagos y reversiones mantienen trazabilidad;
* saldo a favor tiene una única fuente de cálculo;
* archivo y papelera están diferenciados;
* respaldo y restauración tienen reglas conceptuales;
* los casos imposibles están identificados;
* las decisiones técnicas permanecen diferidas;
* no se seleccionó tecnología;
* no se escribió código.

## 22. Estado

El modelo de dominio permanece propuesto y pendiente de presión final y aprobación humana en P4-8.

La sección de diseño técnico se elaborará únicamente después de cerrar P4-8.

## 23. Diseño técnico conceptual — P4-9

> Estado: diseño técnico propuesto para revisión y aprobación en P4-9.
> Este diseño define responsabilidades, límites y flujos, pero no selecciona tecnologías concretas ni autoriza implementación.

## 24. Objetivos del diseño

El diseño técnico deberá permitir que la aplicación:

* ejecute las reglas del modelo de dominio sin duplicarlas en la interfaz;
* mantenga separados los cálculos financieros de la persistencia y la presentación;
* preserve coherencia ante errores;
* pueda respaldar y restaurar el estado operativo;
* funcione con una escala de hasta 100 clientes y 500 deudas;
* sea usable mediante teclado y lector de pantalla;
* pueda probarse por capas;
* permita reemplazar decisiones tecnológicas sin reescribir el dominio;
* mantenga trazabilidad desde requisitos hasta pruebas.

## 25. Arquitectura lógica

La aplicación se organizará en cinco áreas lógicas:

1. presentación;
2. aplicación;
3. dominio;
4. persistencia;
5. infraestructura local.

Estas áreas describen responsabilidades. No obligan a utilizar procesos, paquetes o proyectos físicos separados.

### 25.1 Presentación

Responsable de:

* mostrar información;
* capturar intenciones del usuario;
* gestionar navegación, foco y mensajes;
* solicitar confirmaciones;
* transformar entradas visuales en comandos;
* presentar resultados y errores;
* actualizar la interfaz después de cada operación.

No será responsable de:

* calcular saldos;
* determinar estados de deuda;
* decidir si una operación es válida;
* modificar directamente el almacenamiento;
* generar identificadores financieros;
* interpretar reglas de negocio.

### 25.2 Aplicación

Responsable de coordinar cada caso de uso.

Sus funciones incluyen:

* recibir comandos;
* cargar el estado necesario;
* solicitar confirmación cuando corresponda;
* invocar operaciones del dominio;
* coordinar persistencia;
* coordinar respaldos;
* devolver un resultado explícito;
* traducir errores internos a resultados comprensibles para presentación.

No contiene reglas financieras fundamentales que pertenezcan al dominio.

### 25.3 Dominio

Responsable de:

* entidades;
* objetos de valor;
* invariantes;
* cálculos financieros;
* estados derivados;
* comandos conceptuales;
* eventos de dominio;
* validaciones de negocio.

El dominio:

* no conoce la interfaz;
* no conoce el mecanismo físico de almacenamiento;
* no conoce detalles del entorno de ejecución;
* no realiza operaciones de entrada o salida directamente.

### 25.4 Persistencia

Responsable de:

* leer el estado operativo;
* guardar el estado operativo;
* validar su estructura;
* administrar versiones del esquema;
* escribir cambios de forma segura;
* detectar datos corruptos o incompletos;
* administrar el catálogo de respaldos;
* restaurar estados validados.

No determina si un pago es válido ni calcula estados de deuda.

### 25.5 Infraestructura local

Responsable de las capacidades dependientes del entorno:

* lectura y escritura local;
* generación de fecha y hora actual;
* generación de identificadores;
* gestión física de respaldos;
* registro técnico de errores;
* mecanismo de inicio local;
* interacción con capacidades del navegador o sistema cuando corresponda.

## 26. Regla de dependencias

Las dependencias conceptuales seguirán esta dirección:

`Presentación → Aplicación → Dominio`

La persistencia será accedida mediante contratos definidos para la aplicación.

La infraestructura implementará capacidades requeridas por aplicación y persistencia.

### DT-DEP-01

El dominio no dependerá de presentación, persistencia ni infraestructura.

### DT-DEP-02

La presentación no accederá directamente al almacenamiento.

### DT-DEP-03

Los cálculos financieros tendrán una única implementación en la capa de dominio.

### DT-DEP-04

Las reglas de validación no deberán duplicarse de manera contradictoria entre capas.

La interfaz podrá efectuar validaciones tempranas para mejorar la experiencia, pero el dominio volverá a validar antes de aceptar una operación.

## 27. Flujo general de un comando

Toda operación iniciada por el usuario seguirá el flujo conceptual:

1. el usuario ejecuta una acción;
2. presentación captura y normaliza la entrada;
3. presentación crea una solicitud de comando;
4. aplicación valida la forma mínima de la solicitud;
5. aplicación obtiene el estado requerido;
6. si corresponde, presentación muestra una confirmación;
7. aplicación invoca el dominio;
8. dominio valida invariantes;
9. dominio produce un nuevo estado y eventos;
10. aplicación solicita persistencia segura;
11. persistencia confirma o rechaza la escritura;
12. aplicación coordina el respaldo exigido;
13. presentación recibe el resultado;
14. presentación actualiza datos, foco y mensajes.

### DT-FLU-01

La interfaz solo mostrará éxito cuando la persistencia confirme el cambio.

### DT-FLU-02

Si la persistencia falla, el estado visible deberá conservar o recuperar la última versión confirmada.

### DT-FLU-03

La aplicación devolverá resultados explícitos y no dependerá de excepciones silenciosas.

## 28. Unidad de cambio y consistencia

### 28.1 Cambio lógico

Cada comando de escritura constituye una unidad lógica indivisible.

Ejemplos:

* registrar un pago;
* revertir un pago;
* eliminar una deuda;
* restaurar una deuda;
* archivar un cliente;
* restaurar un respaldo.

### 28.2 Principio de atomicidad

Un cambio deberá quedar:

* completamente aplicado; o
* completamente rechazado.

No podrá persistirse un estado parcial.

### 28.3 Secuencia de escritura segura

La persistencia deberá seguir conceptualmente esta secuencia:

1. construir el estado candidato;
2. validar invariantes;
3. serializar o preparar el estado candidato;
4. escribir en una ubicación temporal o equivalente;
5. verificar que el contenido sea legible;
6. sustituir el estado confirmado;
7. conservar evidencia del resultado;
8. actualizar la interfaz.

El mecanismo concreto se definirá en la selección tecnológica.

### DT-CON-01

Un fallo durante la escritura no debe destruir el último estado válido.

### DT-CON-02

Los eventos y cálculos asociados a un comando se persisten junto con el cambio principal.

### DT-CON-03

La eliminación de una deuda y la exclusión de sus pagos de los cálculos forman una sola unidad lógica.

### DT-CON-04

La reversión de un pago y el recálculo de deuda y saldo a favor forman una sola unidad lógica.

## 29. Persistencia del estado operativo

### 29.1 Fuente de verdad

La fuente persistente de verdad contendrá únicamente datos fuente y metadatos necesarios.

Incluirá:

* versión del esquema;
* clientes;
* deudas;
* pagos;
* reversiones;
* marcas de archivo;
* marcas de papelera;
* fechas de creación y modificación;
* identificadores;
* metadatos operativos indispensables.

### 29.2 Datos derivados

No será obligatorio persistir como fuente de verdad:

* saldo pendiente;
* estado de deuda;
* total pendiente;
* cantidad de vencidas;
* saldo a favor;
* monto aplicado;
* monto excedente.

Estos valores podrán almacenarse como ayudas de rendimiento únicamente si:

* pueden reconstruirse;
* se validan contra los datos fuente;
* nunca sustituyen al cálculo del dominio.

### 29.3 Carga inicial

Al iniciar, la aplicación deberá:

1. localizar el estado operativo;
2. verificar que pueda leerse;
3. validar la versión del esquema;
4. validar referencias e invariantes;
5. recalcular valores derivados;
6. mostrar el estado operativo;
7. informar cualquier recuperación o degradación.

### DT-PER-01

Un estado inválido no será aceptado silenciosamente.

### DT-PER-02

La ausencia de datos iniciales deberá producir un estado vacío válido.

### DT-PER-03

Los datos reales del usuario no se incluirán en el repositorio.

### DT-PER-04

Los datos de demostración deberán ser ficticios y separables de los datos operativos.

## 30. Versionado y migración del esquema

### 30.1 Versión explícita

Todo estado persistido y todo respaldo incluirán una versión de esquema.

### 30.2 Compatibilidad

La carga deberá distinguir entre:

* versión vigente;
* versión anterior compatible;
* versión migrable;
* versión desconocida;
* contenido corrupto.

### 30.3 Migración

Una migración deberá:

1. conservar el contenido original hasta confirmar el resultado;
2. transformar una versión conocida;
3. validar referencias;
4. validar invariantes;
5. recalcular derivados;
6. registrar la nueva versión;
7. crear respaldo cuando sea posible;
8. rechazar el resultado si alguna validación falla.

### DT-MIG-01

No se migrarán automáticamente versiones desconocidas.

### DT-MIG-02

Una migración fallida no sustituirá el estado anterior.

### DT-MIG-03

Las migraciones deberán ser deterministas y comprobables con pruebas.

### DT-MIG-04

La estrategia concreta de migración se documentará antes de modificar el esquema después de la primera versión operativa.

## 31. Diseño de respaldos

### 31.1 Tipos conceptuales

Se reconocen:

* respaldo por cambio relevante;
* respaldo diario;
* respaldo previo a restauración;
* respaldo manual, si se incorpora posteriormente.

### 31.2 Cambio relevante

Como mínimo, deberán generar o solicitar respaldo:

* registrar pago;
* revertir pago;
* eliminar deuda;
* restaurar deuda;
* eliminar cliente sin historial;
* restaurar cliente;
* restaurar respaldo;
* migrar el esquema.

La agrupación o optimización física podrá definirse después, siempre que no se pierda recuperabilidad razonable.

### 31.3 Catálogo

El catálogo de respaldos mantendrá:

* identificador;
* fecha y hora;
* motivo;
* versión del esquema;
* estado de integridad;
* referencia física;
* tamaño o información equivalente, si resulta útil.

### 31.4 Retención

Se conservarán hasta cinco respaldos automáticos válidos.

La eliminación del respaldo más antiguo solo ocurrirá después de confirmar que el nuevo respaldo es válido.

### DT-BKP-01

Un respaldo no contiene otros respaldos.

### DT-BKP-02

La creación fallida de un respaldo no debe borrar respaldos válidos anteriores.

### DT-BKP-03

La restauración reemplaza únicamente el estado operativo.

### DT-BKP-04

Antes de restaurar se intentará preservar el estado vigente.

### DT-BKP-05

Después de restaurar se validará el estado y se recalcularán todos los derivados.

### DT-BKP-06

Si la restauración falla, la aplicación conservará el último estado válido.

## 32. Manejo técnico conceptual del dinero

### 32.1 Representación

Los importes no deberán depender de aritmética binaria que pueda introducir errores visibles de redondeo.

La selección tecnológica deberá elegir una representación que garantice precisión exacta de dos decimales.

Alternativas admisibles conceptualmente:

* unidades monetarias mínimas enteras;
* tipo decimal exacto;
* estructura de dinero validada.

No se selecciona todavía una alternativa.

### 32.2 Objeto conceptual Dinero

Un valor monetario estará compuesto por:

* cantidad;
* moneda.

### DT-DIN-01

No se suman importes de monedas diferentes.

### DT-DIN-02

Toda operación monetaria conserva dos decimales como máximo.

### DT-DIN-03

No se utilizarán aproximaciones de coma flotante sin una estrategia explícita de corrección y prueba.

### DT-DIN-04

Los formateadores visuales no alteran el valor interno.

### DT-DIN-05

La entrada monetaria se normaliza antes de llegar al dominio.

### DT-DIN-06

La presentación mostrará siempre la moneda junto al monto cuando exista riesgo de ambigüedad.

## 33. Manejo técnico conceptual de fechas

### 33.1 Fecha civil

Las fechas de pago y vencimiento se tratarán como fechas civiles, sin hora asociada.

### 33.2 Marca temporal

Las fechas de creación, modificación, reversión y respaldo se tratarán como marcas temporales.

### DT-FEC-01

La fecha de vencimiento no debe desplazarse por conversiones de zona horaria.

### DT-FEC-02

La fecha de pago no podrá ser posterior a la fecha civil actual del entorno local.

### DT-FEC-03

“Vence hoy” se evalúa comparando fechas civiles.

### DT-FEC-04

Las marcas temporales deberán conservar un orden determinista.

### DT-FEC-05

La capa de infraestructura proveerá la fecha actual mediante una abstracción sustituible en pruebas.

### DT-FEC-06

Las pruebas no dependerán directamente del reloj real.

## 34. Identificadores y orden determinista

### 34.1 Identificadores

Cada entidad tendrá un identificador:

* único;
* estable;
* no reutilizable;
* independiente de datos editables.

### 34.2 Orden de pagos

Cuando sea necesario reconstruir cálculos, los pagos válidos se ordenarán por:

1. marca temporal de registro;
2. identificador como desempate.

### DT-ID-01

Dos operaciones no deben producir resultados ambiguos por compartir fecha o monto.

### DT-ID-02

La generación concreta de identificadores queda diferida a la selección tecnológica.

## 35. Presentación y estado de interfaz

### 35.1 Estado visible

La presentación mantendrá únicamente el estado necesario para:

* formulario actual;
* filtros;
* ordenamiento;
* selección;
* mensajes;
* confirmaciones;
* foco;
* vistas derivadas.

La fuente financiera de verdad seguirá siendo el estado gestionado por aplicación y dominio.

### 35.2 Actualización

Después de un comando exitoso, la interfaz deberá:

1. obtener el resultado confirmado;
2. actualizar la vista afectada;
3. recalcular o recibir resúmenes;
4. mostrar un mensaje comprensible;
5. mover el foco a un destino lógico.

### 35.3 Evitar estados obsoletos

No deberán coexistir copias independientes del mismo saldo que puedan divergir.

### DT-UI-01

La presentación no modificará localmente un saldo antes de confirmar el resultado del dominio y persistencia.

### DT-UI-02

Los filtros y ordenamientos no alteran los datos fuente.

### DT-UI-03

Cerrar o cancelar una confirmación no ejecuta el comando.

### DT-UI-04

Los formularios conservan la información necesaria cuando una validación corregible falla.

## 36. Confirmaciones

### 36.1 Acciones financieras

Antes de registrar, revertir o eliminar un movimiento financiero, la confirmación mostrará:

* cliente;
* deuda;
* monto;
* moneda;
* fecha;
* efecto sobre saldo pendiente;
* efecto sobre saldo a favor;
* consecuencias adicionales.

### 36.2 Acciones destructivas o estructurales

También requerirán confirmación:

* eliminar cliente;
* archivar cliente;
* reactivar cliente;
* eliminar deuda;
* restaurar elemento;
* restaurar respaldo.

### DT-CNF-01

La confirmación se genera a partir del estado vigente y no de información obsoleta del formulario.

### DT-CNF-02

Después de confirmar, el comando vuelve a validar las precondiciones.

### DT-CNF-03

Una confirmación no se reutiliza para otra operación.

## 37. Accesibilidad técnica

La accesibilidad se incorporará como parte de la estructura y no como revisión tardía.

### 37.1 Navegación

La aplicación deberá permitir:

* recorrer controles mediante teclado;
* activar acciones sin ratón;
* cerrar diálogos mediante teclado;
* mantener un orden lógico de tabulación;
* evitar trampas de foco.

### 37.2 Foco

Después de cada acción:

* al abrir un diálogo, el foco entra en él;
* al cerrarlo, el foco vuelve al control originador o a un destino lógico;
* después de crear, editar o restaurar, el foco se mueve a la confirmación o elemento relevante;
* después de eliminar, el foco se mueve al siguiente elemento disponible o al encabezado de la lista.

### 37.3 Semántica

La presentación deberá ofrecer:

* etiquetas asociadas;
* encabezados jerárquicos;
* nombres accesibles;
* estados comunicados textualmente;
* tablas o listas con estructura comprensible;
* mensajes anunciables;
* botones con propósito identificable.

### 37.4 Mensajes

Los mensajes deberán distinguir:

* éxito;
* advertencia;
* error de validación;
* error de integridad;
* error de persistencia;
* acción cancelada.

### DT-ACC-01

El color no será el único indicador de estado.

### DT-ACC-02

Los mensajes dinámicos críticos deberán ser detectables por tecnologías de asistencia.

### DT-ACC-03

Los diálogos deberán tener título, descripción y límites de foco adecuados.

### DT-ACC-04

La deuda vencida deberá identificarse mediante texto además de estilo visual.

### DT-ACC-05

Las pruebas incluirán recorridos completos solo con teclado.

## 38. Tratamiento de errores

### 38.1 Categorías

El sistema distinguirá:

* error de entrada;
* error de dominio;
* error de confirmación;
* error de referencia;
* error de persistencia;
* error de integridad;
* error de respaldo;
* error de restauración;
* error inesperado.

### 38.2 Resultado estructurado

Cada resultado de operación deberá poder expresar:

* éxito o rechazo;
* código o categoría;
* mensaje para usuario;
* detalles técnicos internos;
* campos afectados;
* acción de recuperación;
* eventos producidos.

### DT-ERR-01

Los detalles técnicos no reemplazarán el mensaje comprensible para el usuario.

### DT-ERR-02

Los errores no deberán dejar la interfaz mostrando un éxito inexistente.

### DT-ERR-03

Un error inesperado deberá conservar el último estado confirmado.

### DT-ERR-04

Los errores de corrupción deberán impedir la escritura sobre el estado válido.

### DT-ERR-05

Los registros técnicos no deberán incluir innecesariamente información sensible.

## 39. Recuperación ante corrupción

Al detectar que el estado principal no puede validarse:

1. no se sobrescribe;
2. se informa el problema;
3. se consulta el catálogo de respaldos;
4. se identifican respaldos válidos;
5. se ofrece restauración controlada;
6. se conserva evidencia del estado problemático cuando sea seguro;
7. se registra el resultado.

### DT-REC-01

La aplicación no restaurará automáticamente un respaldo sin informar al usuario.

### DT-REC-02

El usuario deberá conocer cuál respaldo se utilizará y su fecha.

### DT-REC-03

Si no existe respaldo válido, la aplicación no inventará datos ni iniciará silenciosamente un estado vacío sobre los archivos existentes.

## 40. Seguridad y privacidad local

Aunque la aplicación sea local, deberá aplicar principios básicos:

* no incluir credenciales embebidas;
* no transmitir datos sin una decisión explícita futura;
* no incluir datos operativos en Git;
* limitar datos técnicos registrados;
* validar todas las entradas;
* tratar archivos restaurados como contenido no confiable;
* impedir interpretación insegura de contenido almacenado.

### DT-SEG-01

La aplicación no dependerá de conexión externa para las funciones principales.

### DT-SEG-02

La restauración validará estructura y tipos antes de aceptar contenido.

### DT-SEG-03

Los textos ingresados por usuarios se mostrarán como datos y no como contenido ejecutable.

### DT-SEG-04

Las rutas y mecanismos concretos de almacenamiento deberán evitar exposición accidental razonable.

## 41. Rendimiento

Para la escala objetivo, la prioridad será claridad y consistencia antes que optimizaciones prematuras.

### 41.1 Operaciones esperadas

Con hasta 100 clientes y 500 deudas:

* la carga deberá ser perceptiblemente rápida;
* los filtros deberán responder de forma inmediata para el usuario;
* los cálculos podrán reconstruirse al cargar;
* registrar y consultar una deuda no deberá requerir procesos largos;
* identificar vencidas y total pendiente deberá tomar menos de diez segundos de interacción humana.

### DT-REN-01

No se introducirán caches persistentes complejos sin evidencia de necesidad.

### DT-REN-02

Toda optimización deberá conservar una ruta de reconstrucción desde datos fuente.

### DT-REN-03

Las pruebas de rendimiento utilizarán el volumen máximo previsto y una cantidad razonable de pagos.

## 42. Estrategia de pruebas

Las pruebas se organizarán por responsabilidad.

### 42.1 Pruebas de dominio

Cubrirán:

* validación de entidades;
* dinero;
* pagos parciales;
* pagos exactos;
* excedentes;
* múltiples pagos;
* reversiones;
* estados de deuda;
* archivo;
* papelera;
* restauración;
* invariantes globales.

Serán independientes de interfaz y almacenamiento físico.

### 42.2 Pruebas de aplicación

Cubrirán:

* coordinación de comandos;
* confirmaciones;
* persistencia exitosa;
* persistencia fallida;
* respaldo requerido;
* restauración;
* traducción de errores;
* secuencia de efectos.

### 42.3 Pruebas de persistencia

Cubrirán:

* guardar y cargar;
* escritura incompleta;
* datos corruptos;
* referencias huérfanas;
* versiones de esquema;
* migraciones;
* retención de respaldos;
* restauración.

### 42.4 Pruebas de presentación

Cubrirán:

* formularios;
* errores;
* filtros;
* ordenamiento;
* confirmaciones;
* mensajes;
* foco;
* navegación por teclado;
* nombres accesibles;
* actualización después de comandos.

### 42.5 Pruebas end-to-end

Cubrirán al menos:

1. crear cliente;
2. crear deuda;
3. registrar pago parcial;
4. completar pago;
5. registrar excedente;
6. revertir pago;
7. archivar y reactivar cliente;
8. eliminar y restaurar deuda;
9. filtrar vencidas;
10. observar totales por moneda;
11. crear respaldo;
12. restaurar respaldo.

### 42.6 Pruebas de regresión

Cada defecto corregido deberá producir una prueba que falle antes de la corrección y pase después.

### DT-TST-01

El reloj y la generación de identificadores serán sustituibles en pruebas.

### DT-TST-02

Los casos financieros utilizarán montos exactos y resultados explícitos.

### DT-TST-03

Las pruebas no dependerán de datos personales reales.

### DT-TST-04

Las pruebas end-to-end no sustituirán las pruebas de dominio.

## 43. Integración futura de skills

Los skills frontend se utilizarán como capacidades de apoyo, no como autoridad sobre requisitos o dominio.

### 43.1 Ámbitos posibles

Podrán apoyar:

* sistema visual;
* composición de pantallas;
* jerarquía;
* formularios;
* tablas;
* estados vacíos;
* accesibilidad;
* microinteracciones;
* revisión de experiencia;
* consistencia visual.

### 43.2 Restricciones

Los skills no podrán:

* modificar requisitos congelados sin aprobación;
* cambiar reglas financieras;
* introducir dependencias sin evaluación;
* reemplazar la revisión humana;
* ocultar decisiones de diseño;
* incorporar código no comprendido o no probado.

### 43.3 Trazabilidad

Cuando se utilice un skill, deberá registrarse:

* nombre;
* fuente;
* versión o referencia;
* objetivo;
* instrucciones relevantes;
* artefactos producidos;
* cambios aceptados;
* cambios rechazados;
* evaluación final.

### DT-SKL-01

La selección e instalación de skills no pertenece a P4-9.

### DT-SKL-02

La arquitectura deberá permitir que el diseño visual evolucione sin modificar el dominio.

### DT-SKL-03

El resultado de un skill será revisado contra requisitos, accesibilidad y consistencia.

## 44. Estructura conceptual de archivos

La estructura definitiva dependerá de la tecnología seleccionada, pero deberá conservar responsabilidades equivalentes a:

```text
src/
  domain/
    entities/
    value-objects/
    rules/
    calculations/
    errors/

  application/
    commands/
    use-cases/
    results/
    ports/

  presentation/
    screens/
    components/
    forms/
    accessibility/
    state/

  persistence/
    repositories/
    schema/
    migrations/
    backups/
    validation/

  infrastructure/
    clock/
    identifiers/
    storage/
    logging/

tests/
  domain/
  application/
  persistence/
  presentation/
  end-to-end/
```

Esta estructura es conceptual y no constituye todavía una decisión de lenguaje, framework o sistema de módulos.

### DT-EST-01

La estructura final deberá permitir localizar rápidamente:

* reglas financieras;
* casos de uso;
* componentes visuales;
* persistencia;
* pruebas.

### DT-EST-02

No se concentrará toda la aplicación en un único archivo si ello impide revisión, prueba o mantenimiento.

### DT-EST-03

Tampoco se dividirá artificialmente en una cantidad excesiva de archivos sin responsabilidad clara.

## 45. Contratos conceptuales principales

La aplicación deberá contar con contratos equivalentes a:

### Repositorio de estado

* cargar estado;
* guardar estado candidato;
* validar estado;
* informar versión.

### Administrador de respaldos

* crear respaldo;
* listar respaldos;
* validar respaldo;
* restaurar respaldo;
* aplicar retención.

### Reloj

* obtener fecha civil actual;
* obtener marca temporal actual.

### Generador de identificadores

* generar identificador único.

### Registro técnico

* registrar información;
* registrar advertencia;
* registrar error sin exponer datos innecesarios.

Los nombres y firmas concretas se definirán durante implementación.

## 46. Decisiones arquitectónicas registrables

Las decisiones técnicas relevantes deberán documentarse mediante registros breves de decisión.

Como mínimo se registrarán después:

* representación de dinero;
* almacenamiento local;
* formato de datos;
* estrategia de escritura segura;
* mecanismo de respaldo;
* manejo de fechas;
* estrategia de interfaz;
* herramientas de prueba;
* selección de skills;
* ejecución local.

Cada decisión deberá incluir:

* contexto;
* alternativas;
* decisión;
* razones;
* consecuencias;
* riesgos;
* posibilidad de reversión.

## 47. Decisiones todavía abiertas

P4-9 no decide:

* lenguaje;
* framework;
* librería visual;
* formato físico de persistencia;
* navegador objetivo definitivo;
* servidor local o ausencia de servidor;
* herramienta de pruebas;
* mecanismo de empaquetado;
* sistema de estilos;
* skills concretos;
* mecanismo físico de respaldo;
* formato de identificadores.

Estas elecciones deberán evaluarse después contra este diseño.

## 48. Casos de presión técnica

### 48.1 Falla al guardar un pago

Resultado requerido:

* el pago no se presenta como confirmado;
* el estado anterior permanece válido;
* no se muestra saldo modificado;
* se informa el error;
* puede reintentarse.

### 48.2 Falla al crear respaldo después de un cambio

El diseño tecnológico deberá definir una política explícita.

No podrá:

* fingir que el respaldo fue creado;
* eliminar respaldos anteriores;
* perder el cambio confirmado sin informar.

La política final deberá equilibrar persistencia y recuperabilidad.

### 48.3 Dos pagos con la misma fecha

El resultado se mantiene determinista mediante la marca de registro y el identificador.

### 48.4 Restauración de respaldo antiguo

* se valida versión;
* se migra cuando sea compatible;
* se rechaza cuando sea desconocida;
* se conserva el estado vigente hasta confirmar el nuevo estado.

### 48.5 Datos principales corruptos

* no se sobrescriben;
* se informa;
* se ofrecen respaldos válidos;
* no se crea silenciosamente un estado vacío.

### 48.6 Deuda eliminada con pagos

* deuda, pagos y reversiones mantienen relación;
* dejan de afectar cálculos;
* pueden restaurarse conjuntamente.

### 48.7 Cliente archivado con deudas pendientes

* conserva sus deudas;
* las deudas siguen apareciendo en consultas y totales;
* no puede recibir nuevas deudas hasta reactivarse.

### 48.8 Cambio de día con aplicación abierta

El diseño de presentación deberá recalcular estados sensibles a la fecha:

* al iniciar;
* al recuperar el foco después de un periodo;
* antes de operaciones relevantes;
* mediante otro mecanismo equivalente.

No se permitirá que una deuda permanezca indefinidamente con un estado temporal obsoleto.

## 49. Criterios de aprobación de P4-9

P4-9 podrá cerrarse cuando el responsable humano confirme que:

* las capas y responsabilidades están definidas;
* la dirección de dependencias protege el dominio;
* los comandos tienen un flujo claro;
* las escrituras se tratan como unidades indivisibles;
* el estado operativo tiene una fuente de verdad;
* los valores derivados pueden reconstruirse;
* respaldo y restauración no son recursivos;
* existe una estrategia conceptual de versionado y migración;
* dinero y fechas tienen restricciones técnicas explícitas;
* la interfaz no duplica reglas financieras;
* la accesibilidad forma parte del diseño;
* los errores y la corrupción tienen rutas de recuperación;
* la estrategia de pruebas cubre todas las capas;
* los skills quedan subordinados a requisitos y revisión;
* las decisiones tecnológicas permanecen abiertas;
* no se escribió código.

## 50. Estado de P4-9

El diseño técnico permanece propuesto y pendiente de presión final y aprobación humana.

La selección tecnológica, instalación de skills e implementación permanecen prohibidas hasta cerrar los gates correspondientes.
