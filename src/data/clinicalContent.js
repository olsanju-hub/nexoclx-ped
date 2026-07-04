export const clinicalSources = [
  'AAP. Clinical Practice Guideline for Screening and Management of High Blood Pressure in Children and Adolescents. Pediatrics. 2017;140(3):e20171904. https://publications.aap.org/pediatrics/article/140/3/e20171904/38358/Clinical-Practice-Guideline-for-Screening-and',
  'Royal Children’s Hospital Melbourne. Clinical Practice Guideline: Chest pain. https://www.rch.org.au/clinicalguide/guideline_index/chest_pain/',
  'Children’s Hospital of Philadelphia. Chest Pain Clinical Pathway - Emergency Department. https://www.chop.edu/clinical-pathway/chest-pain-clinical-pathway',
  'NexoClx Ped: las tablas, percentiles, umbrales, dosis y conductas pediátricas deben cargarse y validarse antes de activar recomendaciones clínicas.',
];

export const clinicalProtocols = [
  {
    id: 'dolor-toracico',
    title: 'Dolor torácico',
    description: 'Estructura pediátrica para valoración inicial y gravedad, sin conducta clínica activa.',
    status: 'Validación pendiente',
    sections: [
      {
        step: '01',
        title: 'Datos mínimos pediátricos',
        body: 'La herramienta final deberá recoger edad, peso, constantes, contexto, antecedentes y hallazgos de gravedad antes de orientar conducta.',
        items: [
          'La etiología pediátrica no debe extrapolarse de protocolos de adultos.',
          'Los signos de gravedad y criterios de derivación deben cargarse desde guías pediátricas validadas.',
          'No se publican algoritmos ni tratamiento en esta estructura inicial.',
        ],
      },
      {
        step: '02',
        title: 'Salida pendiente de validación',
        body: 'El módulo comprueba el flujo de datos y resumen copiable, pero no clasifica ni recomienda conducta clínica.',
        items: [
          'No hay criterios pediátricos activos.',
          'No hay umbrales de constantes por edad activos.',
          'Las fuentes se muestran al final para trazabilidad futura.',
        ],
      },
    ],
    tools: [
      'Entrada de edad, peso y estado general.',
      'Selector de contexto pediátrico.',
      'Resultado no operativo hasta validación clínica.',
    ],
    assessment: {
      title: 'Dolor torácico pediátrico',
      intro: 'Introduce datos para validar el flujo. No devuelve conducta clínica activa.',
      copyPrefix: 'NexoClx Ped - dolor torácico',
      fields: [
        { id: 'ageMonths', type: 'number', label: 'Edad', min: 0, max: 216, unit: 'meses', required: true },
        { id: 'weight', type: 'number', label: 'Peso', min: 0, max: 120, unit: 'kg', required: true },
        {
          id: 'context',
          type: 'select',
          label: 'Contexto',
          required: true,
          options: [
            { value: 'first-contact', label: 'Primera valoración' },
            { value: 'urgent', label: 'Valoración urgente' },
            { value: 'follow-up', label: 'Revisión' },
          ],
        },
        { id: 'alarm', type: 'checkbox', label: 'Hay datos que deberán validarse como posible gravedad pediátrica' },
        { id: 'cardiacHistory', type: 'checkbox', label: 'Antecedente cardiológico o familiar relevante a validar' },
      ],
      outcomes: [
        {
          any: ['alarm', 'cardiacHistory'],
          status: 'Validar',
          tone: 'alert',
          title: 'Interpretación pendiente de validación clínica pediátrica',
          body: 'El módulo no contiene criterios pediátricos activos para clasificar gravedad ni recomendar derivación.',
          actions: [
            'Cargar criterios pediátricos desde fuente validada antes de activar conducta.',
            'No extrapolar algoritmos de dolor torácico adulto.',
            'Documentar fuente por cada criterio cuando se implemente.',
          ],
        },
      ],
      incompleteOutcome: {
        status: 'Datos',
        title: 'Completa datos mínimos',
        body: 'Edad, peso y contexto son necesarios para cualquier futura herramienta pediátrica.',
        actions: [
          'Introducir edad.',
          'Introducir peso.',
          'Seleccionar contexto.',
        ],
      },
      defaultOutcome: {
        status: 'Validar',
        title: 'Interpretación pendiente de validación clínica pediátrica',
        body: 'La estructura está preparada, pero todavía no hay reglas pediátricas activas.',
        actions: [
          'Añadir criterios solo con fuente pediátrica validada.',
          'Conectar hallazgos con conducta cuando esté validado.',
          'Mantener fuentes al final.',
        ],
      },
    },
    sources: clinicalSources,
  },
  {
    id: 'hta-pediatrica',
    title: 'HTA pediátrica',
    description: 'Estructura para TA pediátrica con percentiles pendientes de validación.',
    status: 'Validación pendiente',
    sections: [
      {
        step: '01',
        title: 'Datos necesarios',
        body: 'La interpretación pediátrica de la tensión arterial depende de edad, sexo, talla o percentil de talla y cifras sistólica/diastólica.',
        items: [
          'No se han cargado tablas ni percentiles pediátricos.',
          'No se clasifica HTA, HTA grave ni conducta de derivación.',
          'No se publican tratamientos ni dosis antihipertensivas pediátricas.',
        ],
      },
      {
        step: '02',
        title: 'Validación pendiente',
        body: 'El módulo solo recoge datos y avisa de que la interpretación requiere tablas pediátricas validadas.',
        items: [
          'Las tablas AAP/guía seleccionada deberán implementarse antes de activar resultados.',
          'Los umbrales por edad, sexo y talla no se inventan.',
          'La conducta clínica deberá citar fuente por bloque.',
        ],
      },
    ],
    tools: [
      'Entrada de edad, sexo, talla o percentil y TA.',
      'Aviso de dependencia de tablas/percentiles pediátricos.',
      'Resultado no operativo hasta validación clínica.',
    ],
    assessment: {
      title: 'HTA pediátrica',
      intro: 'Introduce datos para comprobar qué necesita la futura interpretación por percentiles.',
      copyPrefix: 'NexoClx Ped - HTA pediátrica',
      fields: [
        { id: 'ageMonths', type: 'number', label: 'Edad', min: 0, max: 216, unit: 'meses', required: true },
        {
          id: 'sex',
          type: 'select',
          label: 'Sexo para tablas pediátricas',
          required: true,
          options: [
            { value: 'female', label: 'Femenino' },
            { value: 'male', label: 'Masculino' },
          ],
        },
        { id: 'height', type: 'number', label: 'Talla', min: 40, max: 220, unit: 'cm' },
        { id: 'heightPercentile', type: 'number', label: 'Percentil de talla si disponible', min: 1, max: 99 },
        { id: 'sbp', type: 'number', label: 'TA sistólica', min: 40, max: 260, unit: 'mmHg', required: true },
        { id: 'dbp', type: 'number', label: 'TA diastólica', min: 20, max: 160, unit: 'mmHg', required: true },
      ],
      outcomes: [],
      incompleteOutcome: {
        status: 'Datos',
        title: 'Completa datos mínimos',
        body: 'Edad, sexo y cifras de TA son necesarios antes de consultar tablas pediátricas.',
        actions: [
          'Introducir edad.',
          'Seleccionar sexo para tablas.',
          'Introducir TA sistólica y diastólica.',
          'Añadir talla o percentil de talla cuando se implemente interpretación.',
        ],
      },
      defaultOutcome: {
        status: 'Validar',
        title: 'Interpretación pendiente de validación clínica pediátrica',
        body: 'La interpretación requiere tablas/percentiles pediátricos no cargados en esta versión.',
        actions: [
          'No clasificar HTA sin tablas validadas.',
          'No proponer tratamiento ni derivación sin criterios pediátricos.',
          'Implementar fuente y fórmula antes de activar resultados.',
        ],
      },
    },
    sources: clinicalSources,
  },
];
