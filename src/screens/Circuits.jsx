import { EmptyClinicalState } from '../components/feedback/EmptyClinicalState.jsx';

export function Circuits() {
  return (
    <div className="screen">
      <div className="section-heading">
        <h1>Circuitos</h1>
        <p>Sección secundaria.</p>
      </div>
      <EmptyClinicalState
        title="Sin circuitos pediátricos publicados"
        text="Los circuitos se crearán solo cuando orienten derivación, ingreso o activación."
      />
    </div>
  );
}
