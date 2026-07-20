# Requisitos congelados — PILOT-004

> Estado: requisitos presionados y propuestos para congelamiento en P4-7.
> Este documento no selecciona tecnología, no instala skills y no autoriza implementación.

## 1. Identificación

* Proyecto: aplicación local de seguimiento de cobranzas.
* Usuario principal: pequeño comerciante o responsable de negocio familiar.
* Escala objetivo: hasta 100 clientes y 500 deudas.
* Uso: individual, desde una computadora.
* Forma del producto: página web ejecutada localmente.
* Monedas admitidas: soles peruanos y dólares estadounidenses.
* Gate: P4-7.
* Implementación: no autorizada.

## 2. Objetivo funcional

La aplicación permitirá registrar y controlar deudas comerciales y préstamos personales, sus vencimientos, pagos totales o parciales, saldos pendientes y saldos a favor.

El usuario deberá poder identificar desde la vista principal:

* deudas vencidas;
* total pendiente;
* estado de cada deuda;
* cliente asociado.

La identificación de deudas vencidas y total pendiente deberá realizarse en menos de diez segundos.

## 3. Definiciones

### 3.1 Cliente

Persona asociada a una o más deudas.

### 3.2 Deuda

Obligación monetaria registrada a nombre de un cliente.

### 3.3 Pago

Movimiento monetario aplicado a una deuda.

### 3.4 Saldo pendiente

Monto de la deuda original que todavía no ha sido cubierto por pagos válidos no revertidos.

### 3.5 Saldo a favor

Excedente producido cuando un pago supera el saldo pendiente de una deuda.

El saldo a favor pertenece al cliente y no produce un saldo negativo en la deuda.

### 3.6 Pago revertido

Pago que permanece en el historial, pero deja de afectar los cálculos financieros.

### 3.7 Papelera

Área recuperable en la que se conservan temporalmente elementos eliminados.

### 3.8 Cliente archivado

Cliente que permanece en el historial, pero no puede recibir nuevas deudas hasta ser reactivado.

## 4. Requisitos de cliente

### RF-CLI-01 — Crear cliente

El usuario podrá crear un cliente.

Datos mínimos:

* nombre obligatorio;
* referencia o nota opcional.

### RF-CLI-02 — Validar nombre

El nombre:

* no puede estar vacío;
* no puede contener únicamente espacios;
* debe normalizar espacios iniciales y finales.

### RF-CLI-03 — Editar cliente

El usuario podrá editar los datos de un cliente activo o archivado.

### RF-CLI-04 — Eliminar cliente sin historial de deudas

Solo podrá enviarse a la papelera un cliente que nunca haya tenido deudas registradas.

La acción requerirá confirmación.

### RF-CLI-05 — Archivar cliente con historial de deudas

Todo cliente que tenga o haya tenido al menos una deuda deberá conservarse para mantener la trazabilidad.

No podrá enviarse a la papelera, aunque todas sus deudas estén pagadas o hayan sido eliminadas.

Podrá archivarse y posteriormente reactivarse.

### RF-CLI-06 — Restricción del cliente archivado

Un cliente archivado:

* permanecerá visible en consultas históricas;
* no podrá recibir nuevas deudas;
* deberá reactivarse antes de registrar una nueva deuda.

### RF-CLI-07 — Reactivar cliente

El usuario podrá reactivar un cliente archivado mediante una acción confirmada.

### RF-CLI-08 — Restaurar cliente

Un cliente enviado a la papelera podrá restaurarse mientras siga disponible en ella.

## 5. Requisitos de deuda

### RF-DEU-01 — Crear deuda

El usuario podrá crear una deuda asociada a un cliente activo.

Datos obligatorios:

* cliente;
* concepto;
* monto;
* moneda.

Dato opcional:

* fecha de vencimiento.

### RF-DEU-02 — Concepto obligatorio

El concepto:

* no puede estar vacío;
* no puede contener únicamente espacios;
* deberá describir brevemente el origen de la obligación.

### RF-DEU-03 — Monto válido

El monto original:

* debe ser mayor que cero;
* admite como máximo dos decimales;
* no admite valores negativos;
* no admite caracteres no numéricos;
* debe conservar la moneda seleccionada.

### RF-DEU-04 — Moneda

Cada deuda utilizará exactamente una moneda:

* PEN — sol peruano;
* USD — dólar estadounidense.

Los importes de monedas diferentes no se sumarán entre sí en un mismo total.

### RF-DEU-05 — Fecha opcional

Una deuda podrá registrarse sin fecha de vencimiento.

Cuando no tenga fecha:

* se clasificará como pendiente sin fecha;
* no podrá clasificarse como vencida;
* seguirá formando parte del total pendiente.

### RF-DEU-06 — Fecha válida

Cuando se ingrese una fecha:

* debe ser una fecha calendario válida;
* debe conservarse sin reinterpretaciones ambiguas;
* debe mostrarse en formato comprensible para el usuario.

### RF-DEU-07 — Editar deuda sin pagos

Una deuda podrá editarse mientras no tenga pagos registrados.

Podrán modificarse:

* cliente;
* concepto;
* monto;
* moneda;
* fecha de vencimiento.

### RF-DEU-08 — Bloqueo después del primer pago

Después de registrar el primer pago, la deuda no podrá editarse.

Cualquier corrección deberá resolverse mediante:

* reversión del pago, cuando corresponda;
* eliminación controlada de la deuda;
* creación de una nueva deuda corregida.

### RF-DEU-09 — Eliminar deuda sin pagos

Una deuda sin pagos podrá enviarse a la papelera mediante confirmación.

### RF-DEU-10 — Eliminar deuda con pagos

Una deuda con pagos podrá enviarse a la papelera mediante confirmación explícita.

La operación deberá mover conjuntamente:

* la deuda;
* sus pagos;
* sus reversiones;
* su historial asociado.

La eliminación no será física mientras el elemento permanezca en la papelera.

### RF-DEU-11 — Restaurar deuda

Una deuda restaurada desde la papelera recuperará:

* sus datos;
* sus pagos;
* sus reversiones;
* su relación con el cliente;
* sus cálculos financieros.

### RF-DEU-12 — Estado calculado

El estado de una deuda no será asignado manualmente.

Se calculará a partir de:

* saldo pendiente;
* fecha de vencimiento;
* fecha actual;
* existencia o ausencia de vencimiento.

## 6. Estados de deuda

### RF-EST-01 — Pagada

Una deuda estará pagada cuando su saldo pendiente sea exactamente cero.

### RF-EST-02 — Pendiente

Una deuda estará pendiente cuando:

* tenga saldo mayor que cero;
* tenga fecha de vencimiento;
* la fecha actual no sea posterior al vencimiento.

### RF-EST-03 — Pendiente sin fecha

Una deuda estará pendiente sin fecha cuando:

* tenga saldo mayor que cero;
* no tenga fecha de vencimiento.

### RF-EST-04 — Vencida

Una deuda estará vencida cuando:

* tenga saldo mayor que cero;
* tenga fecha de vencimiento;
* la fecha actual sea posterior a la fecha de vencimiento.

### RF-EST-05 — Vence hoy

Una deuda cuya fecha de vencimiento coincida con la fecha actual seguirá pendiente durante todo ese día.

Pasará a vencida al comenzar el día siguiente.

### RF-EST-06 — Prioridad del estado pagada

Si el saldo pendiente es cero, la deuda se clasificará como pagada aunque su vencimiento ya haya pasado.

## 7. Requisitos de pagos

### RF-PAG-01 — Registrar pago

El usuario podrá registrar uno o más pagos para una deuda no eliminada.

### RF-PAG-02 — Monto de pago

El monto del pago:

* debe ser mayor que cero;
* admite como máximo dos decimales;
* debe utilizar la misma moneda que la deuda;
* puede ser igual, menor o mayor que el saldo pendiente.

### RF-PAG-03 — Fecha del pago

La fecha del pago será obligatoria.

La aplicación propondrá por defecto la fecha actual, pero el usuario podrá modificarla antes de guardar.

La fecha del pago no podrá ser posterior a la fecha actual.

Los pagos futuros o programados quedan fuera del alcance.

### RF-PAG-04 — Aplicación del pago

Cuando el pago sea menor que el saldo:

* reducirá el saldo pendiente;
* la deuda seguirá pendiente o vencida según su fecha.

Cuando el pago sea igual al saldo:

* el saldo llegará a cero;
* la deuda quedará pagada.

Cuando el pago sea mayor que el saldo:

* la deuda llegará a saldo cero;
* el excedente se registrará como saldo a favor del cliente;
* la deuda no podrá tener saldo negativo.

### RF-PAG-05 — Saldo a favor

El saldo a favor:

* se calculará por cliente y moneda;
* no mezclará PEN con USD;
* deberá mostrarse claramente;
* no se aplicará automáticamente a otras deudas durante este piloto.

La aplicación automática del saldo a favor queda fuera del alcance.

### RF-PAG-06 — Historial

Cada pago conservará:

* monto;
* moneda;
* fecha;
* deuda asociada;
* estado válido o revertido;
* fecha de registro;
* referencia interna.

### RF-PAG-07 — Revertir pago

El usuario podrá revertir un pago mediante una acción confirmada.

### RF-PAG-08 — Trazabilidad de reversión

La reversión:

* no eliminará físicamente el pago;
* marcará el pago como revertido;
* conservará monto y fecha originales;
* registrará la fecha de reversión;
* excluirá el pago de los cálculos;
* recalculará saldo pendiente, saldo a favor y estado.

### RF-PAG-09 — Efecto de la reversión sobre saldo a favor

Si el pago revertido generó saldo a favor, dicho saldo deberá reducirse o eliminarse según corresponda.

### RF-PAG-10 — Confirmación

Toda acción de registrar, revertir o eliminar un movimiento financiero requerirá confirmación.

La confirmación mostrará:

- cliente;
- deuda;
- monto;
- moneda;
- fecha;
- efecto previsto sobre el saldo pendiente;
- saldo a favor que pudiera generarse o modificarse.

## 8. Cálculos financieros

### RF-CAL-01 — Saldo pendiente

Para cada deuda:

`saldo pendiente = monto original − pagos válidos aplicados a la deuda`

El resultado mínimo será cero.

### RF-CAL-02 — Excedente

Cuando la suma de pagos válidos supere el monto original:

`excedente = pagos válidos − monto original`

El excedente se asignará como saldo a favor del cliente.

### RF-CAL-03 — Total pendiente

El total pendiente se calculará separadamente por moneda.

Debe sumar los saldos pendientes de todas las deudas no eliminadas.

### RF-CAL-04 — Cantidad de vencidas

La cantidad de vencidas contará deudas no eliminadas cuyo estado calculado sea vencida.

### RF-CAL-05 — Precisión

Los cálculos monetarios deberán mantener precisión de dos decimales y evitar errores visibles de redondeo.

### RF-CAL-06 — Historial revertido

Los pagos revertidos no se incluirán en:

* saldo pendiente;
* total pagado;
* saldo a favor;
* estado de deuda.

## 9. Consulta, filtros y ordenamiento

### RF-CON-01 — Listado principal

La aplicación mostrará un listado de deudas con información suficiente para reconocer:

* cliente;
* concepto;
* monto original;
* saldo pendiente;
* moneda;
* vencimiento;
* estado.

### RF-CON-02 — Filtro por estado

El usuario podrá filtrar por:

* todas;
* pendientes;
* pendientes sin fecha;
* vencidas;
* pagadas.

### RF-CON-03 — Filtro por cliente

El usuario podrá combinar el filtro de estado con un cliente específico.

### RF-CON-04 — Orden configurable

El usuario podrá ordenar al menos por:

* vencimiento;
* cliente;
* monto original;
* saldo pendiente;
* fecha de creación.

Deberá poder elegir orden ascendente o descendente cuando corresponda.

### RF-CON-05 — Orden inicial

El orden inicial deberá privilegiar la utilidad operativa.

La decisión exacta se definirá en diseño, sin eliminar la capacidad de configuración.

### RF-CON-06 — Clientes archivados

Las deudas de clientes archivados permanecerán visibles en consultas e historial.

## 10. Resumen principal

### RF-RES-01 — Total pendiente

La vista principal mostrará el total pendiente separado por moneda:

* total PEN;
* total USD.

### RF-RES-02 — Deudas vencidas

La vista principal mostrará la cantidad total de deudas vencidas.

### RF-RES-03 — Comprensión rápida

El total pendiente y la cantidad de vencidas deberán ser visibles sin navegar a otra sección.

### RF-RES-04 — Tiempo de reconocimiento

En una prueba moderada, el usuario deberá poder localizar:

* total pendiente;
* cantidad de vencidas;
* acceso a deudas vencidas;

en menos de diez segundos.

## 11. Persistencia local

### RF-PER-01 — Conservación de datos

Los clientes, deudas, pagos, reversiones, estados de archivo y papelera deberán conservarse al cerrar y reabrir la aplicación.

### RF-PER-02 — Datos separados del repositorio

Los datos operativos:

* no deberán almacenarse en archivos versionados;
* no deberán subirse a GitHub;
* deberán quedar excluidos mediante configuración apropiada.

### RF-PER-03 — Datos de prueba

Durante el piloto solo se utilizarán datos:

* ficticios;
* sintéticos;
* anonimizados.

## 12. Respaldo automático

### RF-BKP-01 — Eventos de respaldo

Se generará un respaldo:

* después de cada cambio relevante;
* al menos una vez al día cuando exista actividad.

Cambios relevantes incluyen:

* creación, edición, archivo o eliminación de clientes;
* creación o eliminación de deudas;
* registro o reversión de pagos;
* restauración desde papelera;
* restauración de un respaldo.

### RF-BKP-02 — Retención

La aplicación conservará los cinco respaldos automáticos más recientes.

Al generar un sexto respaldo, podrá eliminar el más antiguo.

### RF-BKP-03 — Contenido

Cada respaldo deberá conservar una copia coherente de:

* clientes;
* deudas;
* pagos;
* reversiones;
* archivo;
* papelera;
* saldos a favor;
* metadatos necesarios.

### RF-BKP-04 — Integridad

Un respaldo incompleto o inválido no deberá reemplazar automáticamente un respaldo válido.

### RF-BKP-05 — Restauración manual

El usuario podrá:

1. consultar los respaldos disponibles;
2. seleccionar uno;
3. revisar fecha y hora;
4. confirmar la restauración.

### RF-BKP-06 — Respaldo previo a restauración

Antes de restaurar un respaldo, la aplicación deberá crear una copia de seguridad del estado actual cuando sea posible.

### RF-BKP-07 — Resultado de restauración

Después de restaurar:

* los datos deberán recalcularse;
* la interfaz deberá actualizarse;
* el usuario deberá recibir confirmación;
* la acción deberá quedar registrada.

## 13. Papelera

### RF-PAP-01 — Elementos recuperables

La papelera conservará clientes y deudas eliminados, junto con sus relaciones y movimientos.

### RF-PAP-02 — Restauración

El usuario podrá restaurar elementos desde la papelera mediante confirmación.

### RF-PAP-03 — Eliminación definitiva

La eliminación definitiva desde la papelera no formará parte del flujo principal.

Podrá excluirse del piloto si no resulta necesaria para validar el workflow.

### RF-PAP-04 — Cálculos

Los elementos en papelera no participarán en:

* totales;
* filtros operativos;
* cantidad de vencidas;
* saldos a favor disponibles.

## 14. Confirmaciones

### RF-CNF-01 — Acciones importantes

La aplicación solicitará confirmación para:

* archivar clientes;
* reactivar clientes;
* enviar clientes o deudas a la papelera;
* restaurar elementos;
* registrar pagos que generen saldo a favor;
* revertir pagos;
* restaurar respaldos;
* otras modificaciones que afecten de forma sustancial el historial o los saldos.

### RF-CNF-02 — Contenido de la confirmación

La confirmación deberá indicar:

* acción;
* elemento afectado;
* consecuencia principal;
* posibilidad o imposibilidad de recuperación.

### RF-CNF-03 — Evitar exceso

Las confirmaciones no deberán aparecer en cambios triviales que no afecten saldos, historial o recuperabilidad.

## 15. Accesibilidad

### RNF-ACC-01 — Teclado

Todas las funciones principales deberán poder utilizarse mediante teclado.

### RNF-ACC-02 — Foco visible

Los elementos interactivos deberán mostrar un foco claramente visible.

### RNF-ACC-03 — Contraste

Texto, controles, estados y mensajes deberán tener contraste suficiente.

### RNF-ACC-04 — Etiquetas

Todos los campos deberán tener etiquetas accesibles asociadas.

### RNF-ACC-05 — Errores

Los mensajes de error deberán:

* identificar el campo;
* explicar el problema;
* estar asociados programáticamente con el control.

### RNF-ACC-06 — Estados sin dependencia exclusiva de color

Pendiente, vencida, pagada y pendiente sin fecha deberán distinguirse mediante texto o iconografía, no solo por color.

### RNF-ACC-07 — Lector de pantalla

Los flujos principales deberán ser comprensibles mediante lector de pantalla.

Como mínimo:

* estructura semántica;
* encabezados;
* etiquetas;
* nombres accesibles;
* anuncios de errores;
* anuncios de cambios relevantes;
* controles con estado identificable.

### RNF-ACC-08 — Movimiento

Las animaciones deberán ser limitadas, funcionales y compatibles con preferencias de movimiento reducido.

## 16. Usabilidad y frontend

### RNF-UX-01 — Calidad visual

El frontend tendrá calidad visual avanzada para evaluar el aporte de skills especializadas.

### RNF-UX-02 — Prioridades

La calidad visual no podrá reducir:

* claridad;
* legibilidad;
* velocidad de uso;
* accesibilidad;
* comprensión de saldos;
* reconocimiento de vencimientos.

### RNF-UX-03 — Vista principal

La vista principal deberá enfatizar:

* resumen;
* vencidas;
* deudas pendientes;
* acciones frecuentes.

### RNF-UX-04 — Formularios

Los formularios deberán:

* agrupar campos relacionados;
* mostrar validaciones específicas;
* conservar entradas válidas cuando exista un error;
* evitar ambigüedad monetaria.

### RNF-UX-05 — Diseño para escritorio

El diseño principal estará optimizado para uso en computadora.

La adaptación móvil podrá ser básica y no constituye el objetivo principal.

## 17. Evaluación de skills

### RNF-SKL-01 — Uso autorizado

Ninguna skill podrá instalarse o utilizarse antes de:

* evaluar origen;
* evaluar licencia;
* evaluar compatibilidad;
* seleccionar tecnología;
* obtener autorización humana.

### RNF-SKL-02 — Aplicación directa

Las skills seleccionadas podrán utilizarse directamente sobre el diseño e implementación autorizados.

No será obligatorio construir una versión base separada sin skills.

### RNF-SKL-03 — Evidencia

Para cada skill utilizada deberá registrarse:

* origen exacto;
* versión, commit o fecha de incorporación;
* mecanismo de instalación;
* fase de uso;
* instrucciones relevantes;
* decisiones influenciadas;
* evidencia visible;
* limitaciones;
* problemas encontrados;
* procedimiento de desinstalación o reversión.

### RNF-SKL-04 — Revisión final

El aporte de las skills se evaluará mediante el resultado final considerando:

* coherencia visual;
* accesibilidad;
* claridad;
* interacción;
* adecuación al problema;
* ausencia de ornamentación innecesaria;
* consistencia con requisitos.

### RNF-SKL-05 — Sin sustitución de criterio

Una recomendación de una skill podrá rechazarse cuando contradiga:

* requisitos congelados;
* accesibilidad;
* simplicidad;
* alcance;
* seguridad;
* decisiones humanas.

## 18. Seguridad y privacidad

### RNF-SEG-01 — Datos ficticios

No se utilizarán datos financieros personales reales durante el piloto.

### RNF-SEG-02 — Repositorio público

No se incluirán en Git:

* datos locales;
* respaldos;
* secretos;
* credenciales;
* información personal real.

### RNF-SEG-03 — Validación

Toda entrada deberá validarse antes de almacenarse.

### RNF-SEG-04 — Dependencias

Las dependencias y skills deberán evaluarse antes de su instalación.

### RNF-SEG-05 — Estado corrupto

La aplicación deberá detectar, en la medida razonable, datos locales o respaldos que no cumplan la estructura esperada.

No deberá sobrescribir silenciosamente datos válidos con datos corruptos.

## 19. Rendimiento y escala

### RNF-REN-01 — Escala objetivo

La aplicación deberá mantener un funcionamiento adecuado con:

* hasta 100 clientes;
* hasta 500 deudas;
* pagos asociados a dichas deudas;
* cinco respaldos.

### RNF-REN-02 — Interacción

Las operaciones habituales deberán ofrecer respuesta visible sin demoras que interrumpan el flujo normal.

### RNF-REN-03 — Resumen

El cálculo del resumen y filtros deberá completarse de forma suficientemente rápida para permitir el criterio de diez segundos.

## 20. Casos límite obligatorios

Deberán probarse al menos:

1. cliente con nombre vacío;
2. deuda con concepto vacío;
3. monto cero;
4. monto negativo;
5. más de dos decimales;
6. fecha inválida;
7. deuda sin vencimiento;
8. deuda que vence hoy;
9. deuda vencida;
10. pago parcial;
11. pago exacto;
12. pago superior al saldo;
13. varios pagos;
14. reversión de pago;
15. reversión que reabre una deuda pagada;
16. reversión que elimina saldo a favor;
17. intento de editar deuda con pagos;
18. eliminación de deuda con pagos;
19. restauración desde papelera;
20. archivo y reactivación de cliente;
21. intento de crear deuda para cliente archivado;
22. totales separados por moneda;
23. respaldo después de cambio relevante;
24. retención de cinco respaldos;
25. restauración manual;
26. respaldo inválido;
27. navegación completa por teclado;
28. mensajes anunciados por lector de pantalla;
29. filtros combinados por estado y cliente;
30. orden configurable.

## 21. Fuera de alcance congelado

Quedan fuera de PILOT-004:

* integración con WhatsApp;
* mensajes automáticos;
* correo;
* notificaciones externas;
* autenticación;
* múltiples usuarios;
* sincronización;
* almacenamiento remoto;
* aplicación móvil nativa;
* intereses;
* cuotas;
* conciliación bancaria;
* facturación;
* contabilidad formal;
* cobranza legal;
* calificación crediticia;
* análisis predictivo;
* IA dentro del producto;
* importación masiva;
* aplicación automática de saldos a favor;
* conversión entre monedas;
* tipos de cambio;
* búsqueda general por texto;
* filtros por rango de fechas;
* eliminación física inmediata;
* datos reales durante el piloto.

## 22. Reglas de cambio

Una vez cerrado P4-7:

* estos requisitos quedarán congelados;
* toda modificación deberá registrarse;
* deberá evaluarse impacto;
* requerirá aprobación humana;
* no podrá introducirse silenciosamente durante implementación;
* las skills no podrán alterar requisitos.

## 23. Trazabilidad hacia gates posteriores

* P4-8 definirá entidades, invariantes y eventos.
* P4-9 definirá arquitectura y componentes.
* P4-10 convertirá requisitos en slices, backlog y plan de pruebas.
* P4-11 seleccionará tecnología y plan de implementación.
* P4-12 verificará pruebas rojas.
* P4-13 implementará.
* P4-14 y P4-15 verificarán pruebas y CI.
* P4-17 revisará independientemente el cumplimiento.
* P4-26 evaluará el resultado con rúbrica.

## 24. Criterios para cerrar P4-7

P4-7 podrá cerrarse cuando el responsable humano confirme que:

* reglas de clientes están definidas;
* reglas de deudas están definidas;
* pagos parciales y excedentes están definidos;
* reversiones mantienen trazabilidad;
* estados se calculan sin ambigüedad;
* eliminación y papelera están definidas;
* respaldo y restauración están definidos;
* monedas no se mezclan;
* filtros y resumen están definidos;
* accesibilidad está definida;
* criterios de skills están definidos;
* casos límite están identificados;
* fuera de alcance está congelado;
* no se seleccionó tecnología;
* no se escribió código.

## 25. Estado

P4-7 permanece en curso hasta la revisión, presión final y aprobación humana de estos requisitos.
