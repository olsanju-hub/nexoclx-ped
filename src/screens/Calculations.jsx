import { useMemo, useState } from 'react';
import { ContentBlock } from '../components/detail/ContentBlock.jsx';

export function Calculations() {
  const [weight, setWeight] = useState('');
  const [totalDose, setTotalDose] = useState('');
  const message = useMemo(() => {
    const weightNumber = Number(weight);
    const doseNumber = Number(totalDose);
    if (!weight || !totalDose) return 'Calcula mg/kg a partir de dosis total y peso. No recomienda pauta.';
    if (Number.isNaN(weightNumber) || Number.isNaN(doseNumber) || weightNumber <= 0) return 'Datos no válidos para calcular.';
    return `${(doseNumber / weightNumber).toFixed(2)} mg/kg`;
  }, [totalDose, weight]);

  return (
    <div className="screen">
      <div className="section-heading">
        <h1>Cálculos</h1>
        <p>Verificación matemática por peso, sin recomendar dosis.</p>
      </div>
      <ContentBlock title="Calculadora mg/kg">
        <label className="tool-field">
          <span>Peso</span>
          <span className="tool-input-wrap">
            <input
              inputMode="decimal"
              min="0"
              max="120"
              type="number"
              value={weight}
              onChange={(event) => setWeight(event.target.value)}
            />
            <small>kg</small>
          </span>
        </label>
        <label className="tool-field">
          <span>Dosis total prescrita o indicada</span>
          <span className="tool-input-wrap">
            <input
              inputMode="decimal"
              min="0"
              type="number"
              value={totalDose}
              onChange={(event) => setTotalDose(event.target.value)}
            />
            <small>mg</small>
          </span>
        </label>
        <div className="decision-result">
          <h3>{weight && totalDose ? 'Resultado' : 'Datos requeridos'}</h3>
          <p>{message}</p>
          <ul className="clinical-bullets">
            <li>No sustituye una pauta farmacológica.</li>
            <li>No aporta dosis máximas, frecuencia ni indicación.</li>
            <li>Contrasta siempre con una fuente pediátrica específica del fármaco.</li>
          </ul>
        </div>
      </ContentBlock>
    </div>
  );
}
