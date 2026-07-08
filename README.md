# NexoClx Ped

NexoClx Ped es una app independiente de la familia NexoClx orientada a pediatría clínica práctica. Debe funcionar como herramienta rápida, mobile first, para sospecha diagnóstica, detección de gravedad, cálculo de dosis por peso, tratamiento pediátrico, derivación/ingreso y verificación de fuentes.

La familia NexoClx está formada por AP, Urg, 061 y Ped. Ped no es una copia pediatrizada de las apps adultas y no debe mezclarse con ellas.

## Modelo de conducta

Cada tema debe responder: "estoy ante esta patología en este paciente pediátrico, ¿qué hago ahora?". La secuencia de trabajo es patología -> edad/peso/grupo etario -> gravedad -> pruebas -> tratamiento pediátrico -> dosis mg/kg si procede -> escalada -> revisión -> derivación/urgencias/ingreso/traslado -> fuentes documentadas internamente.

La interfaz debe priorizar conducta pediátrica. No debe mostrar capítulos, pasos de lectura ni bibliografía como parte del flujo clínico.

El patrón técnico base es `src/lib/clinicalToolEngine.js` + `ClinicalActionTool`: cada tema debe expresarse como `assessment.fields`, `assessment.calculations`, `assessment.interpretations` y `assessment.outcomes`.

## Identidad

- Contexto: Pediatría clínica práctica.
- Acento visual: amarillo ocre clínico.
- Estilo: sobrio, sanitario, limpio y profesional.
- No debe parecer infantil, escolar, lúdica, comercial ni decorativa.
- Mantener colores, iconos, rutas, home, bottom nav y estética aprobada.

## Pertinencia de temas

Añadir un tema solo si una herramienta pediátrica puede ayudar a tomar una decisión real:

- sospechar patología pediátrica;
- identificar gravedad;
- pedir datos mínimos pediátricos;
- considerar edad, peso y grupo etario;
- calcular dosis pediátricas si procede;
- ajustar tratamiento por peso, edad o superficie corporal;
- reconocer signos de alarma;
- decidir seguimiento, derivación, urgencia, traslado o activación.

No añadir temas por simetría con AP, Urg o 061. No añadir capítulos pediátricos que solo sirvan para leer.

## Cómo decidir si aplica

Antes de crear un tema, responder:

- ¿Pediatría cambia diagnóstico, tratamiento, derivación o seguimiento?
- ¿Qué edad, peso, constantes o grupo etario condicionan la salida?
- ¿Qué cálculo es necesario y está validado?
- ¿Qué fuente pediátrica respalda criterios, dosis o umbrales?

Si no hay utilidad pediátrica suficiente, no se añade y se documenta en el reporte.

## Herramienta clínica pediátrica

Cada tema debe:

- usar `PediatricAgeInput` para edad en años y meses cuando la edad condicione dosis, constantes o interpretación;
- pedir peso si condiciona dosis;
- pedir constantes, síntomas, signos de gravedad y contexto;
- devolver grupo de edad relevante si procede;
- devolver gravedad y conducta práctica;
- calcular dosis si procede y si hay fórmula validada;
- mostrar dosis mg/kg, dosis máxima, vía, intervalo y restricción por edad si la fuente lo especifica;
- indicar cuándo revisar, derivar, enviar a Urgencias, activar o trasladar;
- permitir copiar un resumen útil;
- documentar fuentes en reportes o README, no como bloque visible de la herramienta.

Si una recomendación, dosis, algoritmo, escala, percentil o cálculo no tiene fuente trazable, no se muestra como herramienta activa.

## Tratamiento pediátrico

Cuando el tema requiera tratamiento, incluir:

- grupo farmacológico;
- indicación;
- dosis por kg, edad o superficie corporal si procede;
- dosis máxima;
- intervalo, vía y duración si la fuente lo especifica;
- escalada terapéutica;
- contraindicaciones o restricciones por edad;
- medidas coadyuvantes;
- seguimiento y mala respuesta;
- derivación o ingreso.

No usar dosis adultas si no están respaldadas para pediatría. No usar umbrales adultos si existen umbrales pediátricos.

## Cálculos

No mencionar cálculos si no se calculan realmente. En Pediatría, si el tema requiere dosis mg/kg, dosis máxima, percentiles, superficie corporal o escala de gravedad, debe implementarse correctamente o no mostrarse como herramienta activa.

Si no se puede calcular de forma segura, documentarlo en `report.json` como omitido.

## Fuentes internas

Fuentes aceptables: guías clínicas, organismos oficiales, consensos publicados, sociedades científicas pediátricas y documentos sanitarios oficiales referenciados.

Fuentes preferentes pediátricas: AEP, AEPap, SEUP, NICE pediátrico, AAP, WHO/OMS, CDC/ECDC, GINA, AHA/ERC pediátrico, guías pediátricas oficiales autonómicas o nacionales y consensos pediátricos publicados.

No usar blogs, webs comerciales, apuntes, contenido generado por IA, presentaciones sin respaldo, protocolos locales no publicados ni textos sin trazabilidad.

Las fuentes sostienen la herramienta por detrás. No añadir "Fuentes" o "Bibliografía" como card, paso o bloque visible dentro de cada herramienta clínica.

## Ejemplos de temas pediátricos

Fiebre sin foco, bronquiolitis, crisis asmática, gastroenteritis/deshidratación, dolor abdominal, convulsión febril, anafilaxia pediátrica, dolor torácico pediátrico e HTA pediátrica si está implementada con fuentes, tablas o límites seguros.

## Estética

No rediseñar. Mantener patrón visual family-discovery-aesthetic, tipografía, cards, espaciados, bordes, sombras, navegación, home, bottom nav, rutas, iconos y colores.

## Reglas permanentes

- No poner temas por poner.
- No copiar contenido adulto sin adaptación pediátrica.
- No mostrar textos internos, pendientes, mocks ni placeholders.
- No mostrar contenido clínico sin fuente.
- No mencionar cálculos si no se calculan.
- No mostrar bibliografía como ítem del flujo de la herramienta.
- No tocar Vercel.

## Validación antes de commit/push

- `npm run build` pasa.
- El tema aporta una decisión pediátrica real.
- No hay contenido clínico visible sin fuente.
- No hay cálculos mencionados sin cálculo real.
- Tratamiento/dosis/escalones tienen fuente pediátrica trazable.
- Pediatría no usa contenido adulto sin adaptación.
- No se modifican colores, iconos, navegación ni estética global.
- No se mezclan apps.
- `report.json` documenta fuentes, omisiones, cálculos, riesgos y pertinencia.
