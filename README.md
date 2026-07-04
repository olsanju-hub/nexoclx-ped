# NexoClx Ped

NexoClx Ped es una app independiente de la familia NexoClx orientada a pediatría clínica práctica. Debe funcionar como herramienta rápida, mobile first, para sospecha diagnóstica, detección de gravedad, cálculo de dosis por peso, tratamiento, derivación/ingreso y verificación de fuentes.

Esta app no debe convertirse en biblioteca pediátrica ni en protocolos largos de lectura.

## Identidad

- Nombre: NexoClx Ped.
- Contexto: Pediatría clínica práctica.
- Acento visual: amarillo/ámbar clínico.
- Estilo: sobrio, sanitario, limpio, profesional y coherente con NexoClx AP, Urg y 061.
- No debe parecer infantil, escolar, comercial ni decorativa.

## Qué temas pertenecen a Ped

Añadir un tema solo si una herramienta pediátrica puede ayudar a tomar una decisión real:

- sospechar diagnósticos frecuentes pediátricos;
- detectar gravedad;
- calcular dosis por peso;
- orientar tratamiento con dosis y máximos si procede;
- decidir derivación o ingreso;
- definir seguimiento;
- verificar fuentes.

No añadir temas por simetría con AP, Urg o 061. No añadir capítulos pediátricos que solo sirvan para leer.

## Cómo debe construirse cada herramienta

Cada tema debe:

- pedir edad y peso cuando condicionen dosis o interpretación;
- pedir constantes, síntomas, signos de gravedad y contexto;
- devolver una conducta práctica;
- calcular dosis si procede y si hay fórmula validada;
- mostrar tratamiento, rango, máximo y escalada si hay fuente;
- permitir copiar un resumen útil;
- listar fuentes al final.

Si una recomendación, dosis, algoritmo, escala o cálculo no tiene fuente trazable, no se muestra.

## Cálculos y dosis

No mencionar cálculos si no se calculan realmente. Para dosis pediátricas se requiere:

- peso;
- dosis por kg o fórmula;
- dosis máxima;
- vía/frecuencia si la fuente lo especifica;
- interpretación o conducta;
- fuente trazable.

No crear calculadoras incompletas. No modificar fórmulas futuras sin fuente y justificación.

## Fuentes aceptables

Usar guías clínicas, organismos oficiales, consensos publicados, sociedades científicas pediátricas y documentos sanitarios oficiales referenciados.

Fuentes preferentes según tema:

- AEP / Asociación Española de Pediatría;
- NICE;
- AAP / American Academy of Pediatrics;
- ESPID u otras sociedades pediátricas relevantes;
- AHA/ERC si aplica soporte vital pediátrico;
- guías nacionales/autonómicas publicadas y referenciadas.

No usar blogs, webs comerciales, apuntes, presentaciones sin respaldo, contenido generado por IA, protocolos locales no publicados ni textos sin trazabilidad.

## Estética y navegación

No rediseñar la app al añadir temas. Mantener home, navegación, bottom nav, colores, iconos, tipografía, cards, espaciado y patrón visual family-discovery-aesthetic. Las interacciones deben encajar en los componentes existentes.

## Validación antes de commit/push

- `npm run build` pasa.
- No hay contenido clínico visible sin fuente.
- No hay dosis sin fuente, rango y máximo cuando proceda.
- No hay cálculos mencionados sin cálculo real.
- No hay textos internos, mocks ni contenido de maqueta presentado como clínico.
- No se modifican AP, Urg ni 061.
- No se conecta Vercel.
