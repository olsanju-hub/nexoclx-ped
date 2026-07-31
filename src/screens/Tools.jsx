import { CompactList } from '../components/lists/CompactList.jsx';
import { ListRow } from '../components/lists/ListRow.jsx';
import { decisionProtocols } from '../data/decisionProtocols.js';

export function Tools({ onOpen }) {
  return (
    <div className="screen">
      <div className="section-heading">
        <h1>Herramientas</h1>
        <p>Asistentes pediátricos orientados a conducta.</p>
      </div>
      <CompactList label="Herramientas pediátricas">
        {decisionProtocols.map((tool) => (
          <ListRow
            key={tool.id}
            title={tool.title}
            description={tool.description}
            meta={tool.status}
            onClick={() => onOpen(tool.id)}
          />
        ))}
      </CompactList>
    </div>
  );
}
