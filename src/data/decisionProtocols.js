import { toNumber } from '../lib/clinicalToolEngine.js';

const round = (value, digits = 1) => (value === null || value === undefined ? null : Number(value.toFixed(digits)));

const potassiumRisk = (values) => {
  const k = toNumber(values.potassium);
  if (values.unstable || values.ecgStatus === 'risk' || (k !== null && k >= 7)) return 'HK-PED-RSK-003: hiperpotasemia pediatrica critica';
  if (values.sampleQuality === 'hemolyzed' && k !== null && k < 7) return 'HK-PED-DX-002: muestra no valida, confirmar potasio';
  if (k === null) return 'HK-PED-DX-001: falta potasio vigente';
  if (k >= 6.5) return 'HK-PED-RSK-002: hiperpotasemia pediatrica alta';
  if (k >= 6) return 'HK-PED-RSK-001: hiperpotasemia pediatrica moderada';
  if (k > 5.5) return 'HK-PED-RSK-000: hiperpotasemia pediatrica leve';
  return 'HK-PED-DX-000: sin hiperpotasemia con el dato introducido';
};

const calciumGluconateDose = (values) => {
  const weight = toNumber(values.weight);
  if (weight === null) return '';
  const dose = Math.min(weight * 0.68, 30);
  return `${round(dose)} mL de gluconato calcico 10% IV/IO; max 30 mL`;
};

const insulinDose = (values) => {
  const weight = toNumber(values.weight);
  if (weight === null) return '';
  const dose = Math.min(weight * 0.1, 10);
  return `${round(dose, 2)} UI de insulina regular IV; confirmar glucosa y protocolo local`;
};

const renalFlag = (values) => {
  if (values.renalStatus === 'dialysis') return 'HK-PED-ESC-002: nefrologia/dialisis pediatrica';
  if (values.renalStatus === 'ckd') return 'HK-PED-ESC-001: ERC/FRA o oligoanuria';
  if (values.renalStatus === 'unknown') return 'HK-PED-DX-003: funcion renal no disponible';
  return '';
};

const hyperkalemiaProtocol = {
  id: 'hiperpotasemia-gold-standard',
  title: 'Hiperpotasemia Gold Standard',
  description: 'Asistente pediatrico para confirmar gravedad, calcular dosis por peso y decidir escalada.',
  status: 'Interactivo',
  assessment: {
    title: 'Asistente pediatrico de hiperpotasemia',
    intro: 'Usa edad, peso, potasio, ECG, estabilidad, muestra y funcion renal para llegar a una conducta segura.',
    copyPrefix: 'Valoracion pediatrica hiperpotasemia',
    fields: [
      { id: 'age', label: 'Edad', type: 'pediatricAge', required: true },
      { id: 'weight', label: 'Peso confirmado', type: 'number', unit: 'kg', min: 0.5, max: 120, required: true },
      { id: 'potassium', label: 'Potasio vigente', type: 'number', unit: 'mmol/L', min: 2, max: 10 },
      { id: 'sampleQuality', label: 'Calidad de muestra', type: 'select', required: true, options: [
        { value: 'valid', label: 'Muestra valida' },
        { value: 'hemolyzed', label: 'Hemolisis o extraccion dudosa' },
        { value: 'unknown', label: 'Calidad desconocida' },
      ] },
      { id: 'ecgStatus', label: 'ECG actual', type: 'select', required: true, options: [
        { value: 'normal', label: 'Sin cambios sugestivos' },
        { value: 'risk', label: 'Cambios compatibles o arritmia' },
        { value: 'unavailable', label: 'No disponible' },
      ] },
      { id: 'unstable', label: 'Inestabilidad, arritmia, debilidad marcada o alteracion neurologica', type: 'checkbox' },
      { id: 'glucoseAvailable', label: 'Glucemia capilar o venosa disponible', type: 'checkbox' },
      { id: 'renalStatus', label: 'Funcion renal/contexto', type: 'select', required: true, options: [
        { value: 'known-normal', label: 'Sin ERC/FRA conocida' },
        { value: 'ckd', label: 'ERC, FRA, oligoanuria o deshidratacion' },
        { value: 'dialysis', label: 'Dialisis, trasplante o nefrologia pediatrica' },
        { value: 'unknown', label: 'No disponible' },
      ] },
    ],
    calculations: [
      { id: 'Regla de riesgo', type: 'custom', fn: potassiumRisk },
      { id: 'Regla renal', type: 'custom', fn: renalFlag },
      { id: 'Calcio calculado', type: 'custom', fn: calciumGluconateDose },
      { id: 'Insulina calculada', type: 'custom', fn: insulinDose },
    ],
    interpretations: [
      {
        id: 'ped-glucose-needed',
        when: { all: [
          { source: 'computed', id: 'Regla de riesgo', equals: 'HK-PED-RSK-003: hiperpotasemia pediatrica critica' },
          { id: 'glucoseAvailable', equals: false },
        ] },
        title: 'Glucemia imprescindible antes de insulina',
        body: 'La recomendacion de insulina-glucosa exige glucemia y confirmacion profesional.',
        actions: ['Obtener glucemia inmediata; no mostrar conducta como ejecutada hasta confirmacion.'],
      },
      {
        id: 'ped-renal-risk',
        when: { source: 'computed', id: 'Regla renal', notEquals: '' },
        title: 'Riesgo renal pediatrico',
        body: 'La funcion renal y la diuresis cambian destino, monitorizacion y necesidad de UCIP/nefrologia.',
        actions: ['Actualizar creatinina, diuresis y tratamiento habitual si no son datos vigentes.'],
      },
    ],
    outcomes: [
      {
        status: 'Critico',
        tone: 'alert',
        title: 'Estabilizacion pediatrica y escalada inmediata',
        body: 'Hay criterio de hiperpotasemia pediatrica critica o ECG/inestabilidad.',
        when: { source: 'computed', id: 'Regla de riesgo', equals: 'HK-PED-RSK-003: hiperpotasemia pediatrica critica' },
        actions: [
          'ABCDE, monitor ECG continuo, via IV/IO y aviso a equipo senior/UCIP.',
          'Confirmar profesionalmente calcio IV/IO si ECG de riesgo o inestabilidad: usar dosis calculada y no mezclar con bicarbonato.',
          'Si se indica desplazamiento intracelular, confirmar glucemia y usar insulina-glucosa con monitorizacion de hipoglucemia.',
          'Repetir ECG y potasio tras intervencion; si persiste ECG de riesgo, reabrir rama critica y escalar.',
        ],
      },
      {
        status: 'Confirmar',
        title: 'Repetir muestra pediatrica',
        body: 'La muestra puede explicar el valor y no hay criterios actuales de emergencia.',
        when: { source: 'computed', id: 'Regla de riesgo', equals: 'HK-PED-DX-002: muestra no valida, confirmar potasio' },
        actions: [
          'Repetir potasio con extraccion no hemolizada y ECG si valor alto, sintomas o riesgo renal.',
          'Reabrir el asistente con potasio actualizado; no cerrar como leve si falta dato vigente.',
        ],
      },
      {
        status: 'Urgente',
        title: 'Observacion/ingreso pediatrico segun capacidad',
        body: 'El resultado o el contexto renal requiere manejo con monitorizacion y reevaluacion.',
        any: [
          { source: 'computed', id: 'Regla de riesgo', equals: 'HK-PED-RSK-002: hiperpotasemia pediatrica alta' },
          { source: 'computed', id: 'Regla renal', equals: 'HK-PED-ESC-002: nefrologia/dialisis pediatrica' },
        ],
        actions: [
          'Monitorizar, revisar causas, suspender aportes de potasio y consultar pediatria/nefrologia.',
          'Valorar traslado a centro con UCIP/nefrologia si la capacidad local no permite vigilancia segura.',
        ],
      },
      {
        status: 'Reevaluar',
        title: 'Manejo pediatrico con seguimiento estrecho',
        body: 'No hay datos criticos, pero la tendencia y la causa deben quedar verificadas.',
        any: [
          { source: 'computed', id: 'Regla de riesgo', equals: 'HK-PED-RSK-001: hiperpotasemia pediatrica moderada' },
          { source: 'computed', id: 'Regla de riesgo', equals: 'HK-PED-RSK-000: hiperpotasemia pediatrica leve' },
        ],
        actions: [
          'Revisar farmacos, aportes, funcion renal y causa; repetir potasio segun riesgo.',
          'Entregar instrucciones de alarma a la familia y reabrir asistente si cambia ECG, sintomas o potasio.',
        ],
      },
    ],
    defaultOutcome: {
      status: 'Dato insuficiente',
      title: 'Obtener potasio vigente o ECG',
      body: 'Sin potasio actual no puede clasificarse gravedad salvo que exista ECG de riesgo o inestabilidad.',
      actions: [
        'Actualizar el dato dinamico antes de cerrar conducta.',
        'Confirmar peso antes de cualquier recomendacion farmacologica dosificada.',
      ],
    },
  },
  sources: [
    { label: 'Royal Children Hospital Melbourne. Clinical Practice Guideline: Hyperkalaemia.', url: 'https://www.rch.org.au/clinicalguide/guideline_index/hyperkalaemia/', supports: 'Gravedad, monitorizacion y tratamiento pediatrico.' },
    { label: 'Children Health Ireland. Hyperkalaemia acute management guideline.', url: 'https://www.childrenshealthireland.ie/documents/666/Hyperkalaemia.pdf', supports: 'Dosis pediatrica y reevaluacion.' },
  ],
};

export const decisionProtocols = [hyperkalemiaProtocol];
