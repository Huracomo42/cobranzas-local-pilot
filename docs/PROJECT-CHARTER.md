# Descubrimiento y Project Charter — PILOT-004

> Estado: investigación de P4-5 concluida; Project Charter propuesto para aprobación en P4-6.
> Este documento no congela requisitos, no selecciona tecnología y no autoriza implementación.

## 1. Identificación

* Proyecto: aplicación local de seguimiento de cobranzas.
* Repositorio: `Huracomo42/cobranzas-local-pilot`.
* Piloto metodológico: PILOT-004.
* Responsable humano: Hugo Cornejo Villena.
* Gate actual: P4-5 — problema, usuario y contexto investigados.
* Ruta de esta fase: exploratoria.
* Nivel de control de esta fase: medio.
* Implementación: no autorizada.
* Instalación de skills: no autorizada.

## 2. Idea inicial conservada

> Quiero una aplicación sencilla para controlar quién me debe dinero, cuánto debe y qué pagos están vencidos.

Esta idea se conserva como entrada original del proceso. No debe interpretarse todavía como una especificación funcional completa.

## 3. Pregunta de descubrimiento

¿Puede una aplicación local y pequeña ayudar a una persona que lleva cobranzas simples a identificar con rapidez:

* quién mantiene una deuda;
* cuánto debe;
* cuándo vence o venció;
* qué deudas requieren atención;
* cuáles ya fueron pagadas;

sin incorporar la complejidad de un sistema contable, una plataforma multiusuario o una solución de cobranza automatizada?

## 4. Usuario provisional

### 4.1 Usuario primario provisional

Persona independiente, profesional o responsable de un negocio pequeño que:

* vende productos o presta servicios a crédito;
* mantiene un número manejable de clientes;
* controla las deudas personalmente;
* no necesita un sistema contable completo;
* utiliza principalmente una computadora personal;
* requiere una visión rápida de obligaciones pendientes y vencidas;
* acepta registrar manualmente clientes, deudas y pagos.

### 4.2 Usuario no confirmado

Todavía no se ha determinado si el usuario real será:

* un profesional independiente;
* un pequeño comerciante;
* un administrador de negocio familiar;
* una persona que realiza préstamos personales;
* un usuario ficticio creado únicamente para validar el workflow.

Esta ambigüedad deberá resolverse antes de aprobar el Project Charter en P4-6.

### 4.3 Usuarios excluidos provisionalmente

No se diseña inicialmente para:

* grandes empresas;
* equipos de cobranza;
* estudios contables;
* entidades financieras;
* múltiples usuarios simultáneos;
* gestores legales de cobranzas;
* operaciones reguladas;
* contabilidad empresarial completa.

## 5. Problema provisional

El usuario puede registrar deudas en medios fragmentados, como:

* memoria personal;
* mensajes;
* notas físicas;
* hojas de cálculo;
* agendas;
* aplicaciones genéricas de tareas;
* conversaciones con clientes.

La fragmentación puede dificultar:

* conocer el total pendiente;
* reconocer qué deuda ya venció;
* distinguir obligaciones pagadas de pendientes;
* localizar rápidamente la información de un cliente;
* mantener un registro consistente después de recibir un pago.

No se ha demostrado todavía que este problema exista en un usuario real específico. Por ahora constituye una hipótesis razonable que debe validarse.

## 6. Resultado que el usuario buscaría

El resultado esperado no es “usar una aplicación”, sino poder responder con rapidez:

1. ¿Quién me debe?
2. ¿Cuánto me debe?
3. ¿Qué venció?
4. ¿Qué sigue pendiente?
5. ¿Qué ya fue pagado?
6. ¿Cuál es el monto pendiente total?
7. ¿Qué registro debo atender primero?

## 7. Flujo actual probable

### 7.1 Registro inicial

1. El usuario acuerda una deuda o pago pendiente.
2. Registra, o intenta recordar:

   * cliente;
   * concepto;
   * monto;
   * fecha de vencimiento.
3. Consulta posteriormente sus notas o mensajes.

### 7.2 Seguimiento

1. Revisa manualmente vencimientos.
2. identifica obligaciones atrasadas.
3. contacta al cliente por un medio externo.
4. actualiza o elimina la anotación cuando recibe el pago.

### 7.3 Fallas probables

* registro omitido;
* fecha ausente o equivocada;
* deuda duplicada;
* pago recibido pero no actualizado;
* pérdida de la fuente original;
* dificultad para distinguir deuda próxima a vencer de deuda vencida;
* falta de resumen consolidado;
* eliminación accidental;
* falta de respaldo.

El envío de mensajes o recordatorios al cliente queda fuera del alcance inicial.

## 8. Flujo futuro provisional

1. Registrar un cliente.
2. Registrar una deuda asociada.
3. Consultar todas las deudas.
4. distinguir automáticamente pendiente, vencida y pagada.
5. filtrar o priorizar las obligaciones.
6. marcar una deuda como pagada.
7. consultar un resumen básico.
8. cerrar y volver a abrir la aplicación sin perder la información.

Este flujo deberá ser presionado y congelado en P4-7.

## 9. Entidades conceptuales provisionales

### Cliente

Representa a la persona que mantiene una obligación.

Atributos provisionales:

* identificador;
* nombre;
* referencia o nota opcional.

### Deuda

Representa un monto pendiente asociado a un cliente.

Atributos provisionales:

* identificador;
* cliente;
* concepto;
* monto;
* fecha de vencimiento;
* estado;
* fecha de pago, si corresponde.

### Pago

No se ha decidido si el pago será:

* una entidad independiente;
* un evento que modifica la deuda;
* un simple estado y fecha dentro de la deuda.

Esta decisión pertenece al modelado de dominio de P4-8.

## 10. Estados provisionales

### Pendiente

La deuda no está pagada y su vencimiento no ha pasado.

### Vencida

La deuda no está pagada y su fecha de vencimiento es anterior a la fecha vigente.

### Pagada

La obligación fue marcada explícitamente como pagada.

### Ambigüedades pendientes

Debe resolverse:

* qué ocurre con una deuda sin fecha;
* si vence al inicio o al final del día indicado;
* si puede revertirse un pago;
* si existe pago parcial;
* si una deuda puede editarse después de pagarse;
* cómo se tratan fechas inválidas;
* cómo se elimina un cliente con deudas;
* si el estado vencido se almacena o se calcula.

## 11. Alcance funcional provisional

La aplicación podría incluir:

* registro de clientes;
* registro de deudas;
* monto;
* concepto;
* fecha de vencimiento;
* estados pendiente, vencida y pagada;
* marcado como pagada;
* listado;
* búsqueda o filtrado;
* resumen básico;
* persistencia local.

Esta sección no constituye requisitos congelados.

## 12. Fuera de alcance provisional

* integración real con WhatsApp;
* correos o notificaciones;
* pasarela de pagos;
* autenticación;
* múltiples usuarios;
* sincronización entre dispositivos;
* base de datos remota;
* aplicación móvil nativa;
* intereses;
* cuotas;
* pagos parciales;
* conciliación bancaria;
* facturación;
* contabilidad formal;
* cobranza legal;
* calificación crediticia;
* análisis predictivo;
* inteligencia artificial dentro del producto;
* importación masiva;
* información real sensible durante el piloto.

Cualquier inclusión posterior exigirá una modificación formal del alcance.

## 13. Contexto operativo provisional

* Sistema operativo de desarrollo: Windows.
* Editor: Visual Studio Code.
* Ejecución técnica futura: Claude Code.
* Dirección metodológica: ChatGPT.
* Control y autorización: responsable humano.
* Repositorio: GitHub público.
* Datos del piloto: ficticios o anonimizados.
* Uso esperado: local y en una sola computadora.
* Conectividad durante el uso: por determinar.
* Navegador objetivo: por determinar.
* Tecnología: no seleccionada.

## 14. Privacidad y datos

### 14.1 Datos previsibles

La aplicación podría almacenar:

* nombre o alias del cliente;
* concepto de deuda;
* monto;
* vencimiento;
* estado;
* fecha de pago;
* observaciones.

### 14.2 Riesgos

* exposición de nombres y montos;
* acceso de terceros a la computadora;
* pérdida o corrupción del archivo local;
* inclusión accidental de información real en GitHub;
* uso de datos reales durante pruebas;
* persistencia sin mecanismo de recuperación;
* exportaciones o capturas con información personal.

### 14.3 Controles provisionales

* usar únicamente datos ficticios o anonimizados;
* no subir archivos de datos locales al repositorio;
* definir exclusiones en `.gitignore` cuando se seleccione la persistencia;
* evitar información financiera real;
* probar respaldo y restauración;
* mantener el repositorio sin secretos;
* revisar qué datos son realmente necesarios.

### 14.4 Contexto normativo

Perú cuenta con la Ley N.º 29733, Ley de Protección de Datos Personales, y con un nuevo Reglamento aprobado mediante Decreto Supremo N.º 016-2024-JUS, vigente desde el 31 de marzo de 2025.

Este piloto no realizará todavía un análisis jurídico exhaustivo. La referencia normativa se utiliza para justificar minimización, cautela y uso de datos ficticios.

## 15. Seguridad provisional

Aunque el producto sea pequeño y local, deberán considerarse:

* validación de entradas;
* manipulación de montos;
* fechas inválidas;
* datos corruptos;
* eliminación accidental;
* archivos locales accesibles;
* dependencias externas;
* scripts de instalación de skills;
* contenido introducido por skills de terceros.

No se presupone que “local” sea equivalente a “seguro”.

## 16. Accesibilidad y usabilidad

La interfaz deberá priorizar:

* legibilidad;
* jerarquía visual clara;
* navegación comprensible;
* formularios con etiquetas;
* estados distinguibles sin depender únicamente del color;
* contraste suficiente;
* uso mediante teclado;
* mensajes de error específicos;
* confirmación de acciones destructivas;
* diseño apropiado para escritorio;
* ausencia de animaciones innecesarias.

Los criterios exactos se definirán en requisitos y diseño.

## 17. Soluciones alternativas

Antes de construir una aplicación, el problema podría resolverse mediante:

* hoja de cálculo;
* plantilla de cuentas por cobrar;
* aplicación de tareas;
* aplicación de notas;
* software contable;
* CRM;
* software especializado de cobranza;
* aplicación financiera personal.

### Hipótesis de diferenciación

La aplicación solo tendría sentido si ofrece una combinación suficientemente simple de:

* cliente;
* deuda;
* vencimiento;
* estado;
* resumen;
* persistencia;

con menor complejidad que un sistema contable y mayor estructura que una nota o tarea genérica.

Esta diferenciación todavía no ha sido validada.

## 18. Investigación de repositorios y skills

### 18.1 Regla

Una skill no se seleccionará por popularidad ni se instalará automáticamente. Debe responder a una necesidad del proyecto y superar evaluación de:

* origen;
* licencia;
* mantenimiento;
* compatibilidad;
* riesgo;
* reversibilidad;
* aporte verificable.

### 18.2 SK-01 — `frontend-design`

* Fuente identificada: repositorio oficial `anthropics/claude-code`.
* Propósito declarado: producir interfaces frontend distintivas y de calidad de producción, evitando resultados visuales genéricos.
* Origen: verificable.
* Compatibilidad declarada: Claude Code.
* Licencia: debe verificarse en el archivo específico señalado por el repositorio.
* Estado: candidata pendiente de evaluación.
* Instalación: no autorizada.
* Valor potencial:

  * dirección estética explícita;
  * jerarquía visual;
  * mayor intencionalidad del frontend;
  * reducción de resultados genéricos.
* Riesgo:

  * priorizar apariencia sobre simplicidad;
  * introducir decisiones estéticas no justificadas;
  * generar código antes de que el diseño esté aprobado.

### 18.3 SK-02 — `emil-design-eng`

* Fuente identificada: `emilkowalski/skill`.
* Propósito declarado: transmitir principios de pulido de UI, diseño de componentes, animación y detalles de interacción.
* Origen: verificable.
* Releases publicados: no identificados en la revisión inicial.
* Estado: candidata pendiente de evaluación.
* Instalación: no autorizada.
* Valor potencial:

  * refinamiento de interacción;
  * estados de componentes;
  * microdetalles;
  * movimiento deliberado.
* Riesgo:

  * animación innecesaria;
  * subjetividad estética;
  * aporte limitado para un producto funcional pequeño;
  * dificultad para fijar una versión si no existen releases.

### 18.4 SK-03 — `ui-ux-pro-max`

* Fuente identificada: `nextlevelbuilder/ui-ux-pro-max-skill`.
* Propósito declarado: aportar inteligencia de diseño, sistemas visuales, patrones UX y soporte para múltiples plataformas.
* Compatibilidad declarada: Claude Code y otros asistentes.
* Licencia identificada para el CLI: CC-BY-NC-4.0.
* Estado: candidata pendiente de evaluación.
* Instalación: no autorizada.
* Valor potencial:

  * sistema de diseño;
  * patrones;
  * accesibilidad;
  * tipografía;
  * estructura de interfaz.
* Riesgos identificados:

  * alcance desproporcionado para una aplicación pequeña;
  * instalación mediante CLI global;
  * descarga de contenido remoto;
  * incidencias reportadas de instalación o rutas;
  * problemas reportados en Windows;
  * modificaciones no deseadas en carpetas del asistente;
  * posible conflicto entre instrucciones múltiples;
  * restricciones de licencia que deben analizarse según el uso.

### 18.5 Hipótesis de uso combinado

Una posible división futura sería:

* `ui-ux-pro-max`: estructura, patrones y sistema;
* `frontend-design`: dirección visual diferenciada;
* `emil-design-eng`: revisión final de interacción y pulido.

Esta combinación es solamente una hipótesis. Puede producir redundancia, conflicto o complejidad innecesaria.

### 18.6 Criterio de logro metodológico

El logro no consistirá en instalar las tres skills.

Se considerará logrado cuando:

1. las candidatas sean evaluadas formalmente;
2. se seleccione o descarte cada una con justificación;
3. la instalación sea autorizada;
4. se registre versión u origen exacto;
5. su uso ocurra en la fase correcta;
6. exista evidencia del aporte;
7. la revisión independiente evalúe el resultado;
8. pueda repetirse el proceso desde el repositorio.

## 19. Restricciones conocidas

* El repositorio es público.
* No deben utilizarse datos reales.
* El usuario trabaja en Windows.
* Claude Code opera dentro de VS Code.
* La aplicación debe mantenerse pequeña.
* La documentación debe ser proporcional.
* La implementación no puede comenzar antes de cerrar P4-11.
* La investigación no puede decidir tecnología unilateralmente.
* La interfaz debe tener calidad suficiente para probar el aporte de skills frontend.
* La experimentación con skills no puede poner en riesgo el entorno global sin reversión.

## 20. Riesgos del proyecto

| Riesgo                                          | Probabilidad inicial | Impacto | Tratamiento provisional                       |
| ----------------------------------------------- | -------------------: | ------: | --------------------------------------------- |
| Crecimiento de alcance                          |                 Alta |    Alto | Congelar requisitos y detener ampliaciones    |
| Construir antes de entender el problema         |                Media |    Alto | Mantener bloqueo hasta P4-11                  |
| Sobreingeniería                                 |                 Alta |   Medio | Diseño proporcional                           |
| Uso de datos reales                             |                Media |    Alto | Datos ficticios y exclusión de persistencia   |
| Pérdida de información local                    |                Media |    Alto | Diseñar respaldo y restauración               |
| Interfaz visualmente atractiva pero poco usable |                Media |   Medio | Criterios verificables y revisión             |
| Skills incompatibles o invasivas                |                Media |    Alto | Evaluación, instalación local y reversión     |
| Dependencia excesiva de una skill               |                Media |   Medio | Mantener artefactos y decisiones propios      |
| Revisión no independiente                       |                Media |    Alto | Verificar separación de contexto              |
| Narrativa anticipada                            |                Media |    Alto | Código, pruebas y registro en el mismo commit |
| Merge sin autorización previa                   |                Media |   Medio | Registrar desviación y reforzar gate          |

## 21. Desviación operativa registrada

### DEV-P4-01 — Merge anticipado de PR #1

* Hecho: la PR #1 fue fusionada antes de la revisión y autorización final en la conversación metodológica.
* Alcance del cambio:

  * cierre documental de P4-4;
  * tres archivos modificados;
  * sin código de producto;
  * sin decisiones tecnológicas.
* Evaluación: desviación no bloqueante.
* Consecuencia:

  * el contenido fue revisado después del merge y resultó consistente;
  * no se reescribirá el historial;
  * la desviación debe conservarse como evidencia.
* Medida preventiva:

  * toda PR futura permanecerá abierta hasta recibir autorización explícita;
  * “compartir el enlace” no significa “hacer merge”;
  * el cierre de un gate exige revisión previa.
* Estado: registrada; pendiente de incorporar al registro de sesión.

## 22. Clasificación de afirmaciones

### 22.1 Hechos documentados

* El repositorio de ejecución existe y es público.
* El workflow fue incorporado mediante un snapshot.
* P4-0 a P4-4 están cerrados.
* No existe código de producto.
* La idea original solicita controlar deudores, montos y vencimientos.
* La integración con WhatsApp está fuera del alcance inicial.
* Perú cuenta con legislación vigente sobre protección de datos personales.
* Existe una skill oficial `frontend-design` en el repositorio de Claude Code.
* Existe la skill `emil-design-eng`.
* Existe el repositorio `ui-ux-pro-max-skill`.
* UI/UX Pro Max declara compatibilidad con Claude Code.
* Existen incidencias públicas recientes relacionadas con su instalación o funcionamiento.
* La PR #1 fue fusionada antes de la autorización metodológica final.

### 22.2 Inferencias razonables

* El usuario probable necesita una alternativa más estructurada que una nota y más simple que un sistema contable.
* Los estados pendiente, vencida y pagada constituyen el núcleo del problema.
* Una solución local puede reducir exposición frente a una plataforma remota, pero incrementa la importancia del respaldo.
* Las tres skills podrían ser complementarias.
* Usarlas todas podría generar redundancia.
* El diseño para escritorio puede ser suficiente para el piloto.
* Los datos ficticios permiten validar el producto sin asumir riesgo innecesario.

### 22.3 Vacíos documentales

* Usuario real definitivo.
* Volumen esperado de clientes y deudas.
* Frecuencia de uso.
* Flujo actual real.
* Necesidad de conceptos o notas.
* Necesidad de editar o eliminar.
* Tratamiento de pagos parciales.
* Tratamiento de deudas sin vencimiento.
* Reglas de reversión de pagos.
* Necesidad de búsqueda y filtros específicos.
* Contenido exacto del resumen.
* Requisitos de respaldo.
* Navegadores objetivo.
* Tecnología.
* Método de persistencia.
* Skill o combinación final.
* Versiones exactas a instalar.
* Compatibilidad real de las skills con el entorno local del usuario.
* Licencias aplicables a cada componente y al uso previsto.

## 23. Preguntas que debe resolver P4-6

1. ¿Quién es exactamente el usuario del piloto?
2. ¿La aplicación representa deudas comerciales, personales o ambas?
3. ¿Qué volumen aproximado manejará?
4. ¿Una deuda requiere concepto?
5. ¿La fecha de vencimiento es obligatoria?
6. ¿Se permiten pagos parciales?
7. ¿Puede desmarcarse una deuda pagada?
8. ¿Puede editarse o eliminarse una deuda?
9. ¿Puede eliminarse un cliente con deudas?
10. ¿Qué filtros son realmente necesarios?
11. ¿Qué métricas debe mostrar el resumen?
12. ¿Debe existir respaldo manual?
13. ¿Debe funcionar sin conexión?
14. ¿Qué significa “aplicación local” para este piloto?
15. ¿Qué nivel de calidad visual será suficiente?
16. ¿Cómo se demostrará el aporte de las skills?
17. ¿Qué información nunca deberá almacenarse?
18. ¿Qué condición define que el producto es útil?

## 24. Hipótesis de éxito del producto

El producto será útil si un usuario puede, sin capacitación especializada:

* registrar una deuda;
* reconocer inmediatamente su estado;
* encontrar obligaciones vencidas;
* marcar un pago;
* consultar el total pendiente;
* cerrar y reabrir la aplicación sin pérdida de datos;
* comprender la interfaz sin explicación externa.

Esta hipótesis debe transformarse en criterios medibles antes de congelar requisitos.

## 25. Decisiones humanas de descubrimiento

Las siguientes decisiones fueron tomadas por el responsable humano el 19 de julio de 2026.

### 25.1 Usuario y contexto

* Usuario principal: pequeño comerciante o responsable de un negocio familiar.
* Tipo de obligaciones: deudas comerciales y préstamos personales.
* Escala objetivo: hasta 100 clientes y 500 deudas.
* Uso principal: una sola persona desde una computadora.
* Forma del producto: página web ejecutada localmente.
* Funcionamiento sin conexión: no constituye requisito obligatorio.

### 25.2 Registro de deudas

Toda deuda deberá incluir:

* cliente;
* concepto obligatorio;
* monto;
* fecha de vencimiento opcional.

Una deuda sin fecha de vencimiento se clasificará como `pendiente sin fecha` y no como vencida.

### 25.3 Pagos

Los pagos parciales forman parte del alcance.

La solución deberá permitir:

* registrar uno o más pagos parciales;
* calcular el saldo pendiente;
* identificar cuándo la deuda queda pagada;
* revertir un pago registrado por error.

La representación exacta de pagos y saldos se decidirá durante el modelado de dominio.

### 25.4 Edición, eliminación y archivo

* Los clientes pueden editarse.
* Las deudas pueden editarse y eliminarse.
* Un cliente sin deudas puede eliminarse.
* Un cliente con deudas no puede eliminarse; debe archivarse.
* Las consecuencias de eliminar una deuda con pagos registrados deberán definirse durante la presión de requisitos.

### 25.5 Consulta y resumen

Los filtros mínimos serán:

* todas;
* pendientes;
* vencidas;
* pagadas.

El resumen principal mostrará:

* total monetario pendiente;
* cantidad de deudas vencidas.

No se incorpora todavía búsqueda por cliente ni filtros por rango de fechas.

### 25.6 Persistencia y respaldo

La aplicación utilizará persistencia local e incluirá respaldo automático local.

Durante P4-7 deberán definirse:

* evento que genera el respaldo;
* frecuencia;
* cantidad de copias;
* ubicación;
* formato;
* restauración;
* comportamiento ante corrupción;
* exclusión de los datos del repositorio Git.

### 25.7 Calidad visual y skills

El frontend tendrá un nivel de demostración visual avanzada para evaluar el aporte de skills especializadas.

Esto no autoriza todavía la selección o instalación de ninguna skill.

El resultado deberá seguir priorizando:

* claridad;
* accesibilidad;
* eficiencia;
* legibilidad;
* ausencia de ornamentación innecesaria.

### 25.8 Criterio mínimo de utilidad

Un usuario sin asistencia deberá poder:

1. registrar una deuda;
2. consultar una deuda;
3. registrar un pago total o parcial;
4. identificar las deudas vencidas;
5. consultar el total pendiente;

y deberá poder reconocer las deudas vencidas y el total pendiente en menos de diez segundos desde la vista principal.

### 25.9 Cambios frente al alcance provisional

Se incorporan formalmente durante descubrimiento:

* pagos parciales;
* reversión de pagos;
* respaldo automático local;
* archivo de clientes;
* nivel visual avanzado para evaluar skills.

Estos cambios son válidos porque se realizan antes del congelamiento de requisitos de P4-7.

No autorizan implementación ni selección tecnológica.


## 26. Criterio de cierre de P4-5

P4-5 podrá cerrarse cuando el responsable humano confirme que:

* el problema investigado representa adecuadamente la intención del piloto;
* existe un usuario provisional suficientemente delimitado;
* se reconocen alternativas y riesgos;
* las afirmaciones están clasificadas;
* los vacíos principales están identificados;
* las skills permanecen como candidatas, no como seleccionadas;
* no se eligió tecnología;
* no se escribió código;
* la desviación de PR #1 quedó registrada;
* las preguntas pendientes permiten preparar el Project Charter.

## 27. Estado

La investigación de problema, usuario y contexto ha concluido.

Los principales vacíos de producto fueron resueltos mediante decisiones humanas y los restantes fueron derivados explícitamente a presión de requisitos, modelado de dominio o diseño técnico.

P4-5 queda cerrado.

El documento pasa a estado de Project Charter propuesto para revisión y aprobación en P4-6.