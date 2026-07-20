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

Un respaldo es una captura completa y coherente del estado de la aplicación.

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

El estado completo contiene:

* versión del esquema;
* colección de clientes;
* colección de deudas;
* pagos contenidos en sus deudas o relacionados por identificador;
* reversiones;
* metadatos operativos;
* historial de respaldos.

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
