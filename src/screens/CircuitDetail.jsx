import { DetailHeader } from '../components/detail/DetailHeader.jsx';
import { EmptyClinicalState } from '../components/feedback/EmptyClinicalState.jsx';

export function CircuitDetail({ onBack }) {
  return (
    <div className="screen">
      <DetailHeader title="Circuito pediátrico" subtitle="Estructura no operativa" onBack={onBack} />
      <EmptyClinicalState
        title="Circuito no publicado"
        text="No hay contenido operativo hasta validar fuentes y criterios."
      />
    </div>
  );
}
