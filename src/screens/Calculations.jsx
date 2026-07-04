import { useMemo, useState } from 'react';
import { ContentBlock } from '../components/detail/ContentBlock.jsx';

export function Calculations() {
  const [weight, setWeight] = useState('');
  const message = useMemo(() => {
    if (!weight) return 'Introduce peso para validar el flujo de entrada.';
    return 'Peso registrado. No hay cálculo de dosis activo hasta añadir una fórmula validada.';
  }, [weight]);

  return (
    <div className="screen">
      <div className="section-heading">
        <h1>Cálculos</h1>
        <p>Base para futuras dosis por peso.</p>
      </div>
      <ContentBlock title="Peso">
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
        <div className="decision-result">
          <h3>{weight ? 'Dato listo' : 'Dato requerido'}</h3>
          <p>{message}</p>
        </div>
      </ContentBlock>
    </div>
  );
}
