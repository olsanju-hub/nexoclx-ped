import { EmptyClinicalState } from '../components/feedback/EmptyClinicalState.jsx';

export function Procedures() {
  return (
    <div className="screen">
      <div className="section-heading">
        <h1>Procedimientos</h1>
        <p>Sección secundaria.</p>
      </div>
      <EmptyClinicalState
        title="Sin procedimientos pediátricos publicados"
        text="Los procedimientos se añadirán solo con fuente validada y utilidad clínica real."
      />
    </div>
  );
}
