import { SourceList } from '../components/detail/SourceList.jsx';
import { clinicalSources } from '../data/clinicalContent.js';

export function Sources() {
  return (
    <div className="screen">
      <div className="section-heading">
        <h1>Fuentes</h1>
        <p>Verificación bibliográfica.</p>
      </div>
      <SourceList sources={clinicalSources} />
    </div>
  );
}
