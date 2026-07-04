import { useMemo, useState } from 'react';
import { ContentBlock } from '../components/detail/ContentBlock.jsx';

const checks = [
  'Edad registrada en años y meses.',
  'Peso registrado.',
  'Constantes disponibles.',
  'Signos de gravedad revisados.',
  'Fuente clínica consultable.',
];

export function Tools() {
  const [selected, setSelected] = useState([]);
  const [copied, setCopied] = useState(false);
  const missing = checks.filter((item) => !selected.includes(item));
  const summary = useMemo(() => `NexoClx Ped - preparación de valoración\n${selected.map((item) => `- ${item}`).join('\n') || '- Sin elementos marcados.'}\nPendiente:\n${missing.map((item) => `- ${item}`).join('\n') || '- Sin pendientes.'}`, [missing, selected]);
  const toggle = (item) => {
    setSelected((current) => (current.includes(item) ? current.filter((value) => value !== item) : [...current, item]));
    setCopied(false);
  };
  const copySummary = async () => {
    await navigator.clipboard.writeText(summary);
    setCopied(true);
  };

  return (
    <div className="screen">
      <div className="section-heading">
        <h1>Herramientas</h1>
        <p>Preparación rápida de datos mínimos antes de decidir.</p>
      </div>
      <ContentBlock title="Checklist estructural">
        <div className="checklist-grid">
          {checks.map((item) => (
            <label className={selected.includes(item) ? 'clinical-check is-checked' : 'clinical-check'} key={item}>
              <input type="checkbox" checked={selected.includes(item)} onChange={() => toggle(item)} />
              <span>{item}</span>
            </label>
          ))}
        </div>
        <div className="decision-result">
          <h3>{selected.length === checks.length ? 'Datos mínimos preparados' : 'Faltan datos para decidir'}</h3>
          <p>{missing.length === 0 ? 'Puedes abrir el protocolo correspondiente y aplicar la salida clínica con los datos básicos ya revisados.' : `Revisa: ${missing.join(', ')}.`}</p>
          <button className="copy-button" type="button" onClick={copySummary}>{copied ? 'Resumen copiado' : 'Copiar resumen'}</button>
        </div>
      </ContentBlock>
    </div>
  );
}
