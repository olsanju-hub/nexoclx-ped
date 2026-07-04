import { useMemo, useState } from 'react';
import { ContentBlock } from '../components/detail/ContentBlock.jsx';

const checks = [
  'Edad registrada.',
  'Peso registrado.',
  'Constantes disponibles.',
  'Signos de gravedad revisables.',
  'Fuente clínica preparada para validación.',
];

export function Tools() {
  const [selected, setSelected] = useState([]);
  const [copied, setCopied] = useState(false);
  const summary = useMemo(() => `NexoClx Ped - base de herramienta\n${selected.map((item) => `- ${item}`).join('\n') || '- Sin elementos marcados.'}`, [selected]);
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
        <p>Base pediátrica no operativa.</p>
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
          <h3>{selected.length === checks.length ? 'Estructura completa' : 'Completar estructura'}</h3>
          <p>Esta pantalla valida interacción y resumen, sin devolver tratamiento ni conducta clínica.</p>
          <button className="copy-button" type="button" onClick={copySummary}>{copied ? 'Resumen copiado' : 'Copiar resumen'}</button>
        </div>
      </ContentBlock>
    </div>
  );
}
