import {
  Baby,
  BookOpen,
  Calculator,
  FileText,
  FolderOpen,
  HeartPulse,
  Library,
  MoreHorizontal,
  Ruler,
  Stethoscope,
  Wrench,
} from 'lucide-react';
import { routes } from '../app/routes.js';

export const appConfig = {
  name: 'NexoClx Ped',
  context: 'Pediatría clínica práctica',
  icon: `${import.meta.env.BASE_URL}icons/icon-192.png`,
  accent: '#A88020',
  homeVariant: 'standard',
};

export const primarySections = [
  {
    id: routes.protocols,
    title: 'Protocolos',
    description: 'Herramientas pediátricas validadas.',
    icon: FileText,
  },
  {
    id: routes.tools,
    title: 'Herramientas',
    description: 'Datos mínimos, gravedad y peso.',
    icon: Calculator,
  },
  {
    id: routes.bibliography,
    title: 'Bibliografía',
    description: 'Fuentes pediátricas trazables.',
    icon: BookOpen,
  },
];

export const secondarySections = [
  { id: routes.protocols, title: 'Protocolos', description: 'Herramientas pediátricas validadas.', icon: FolderOpen },
  { id: routes.tools, title: 'Herramientas', description: 'Datos mínimos, gravedad y peso.', icon: Wrench },
  { id: routes.calculations, title: 'Cálculos', description: 'Base para dosis por peso.', icon: Ruler },
  { id: routes.bibliography, title: 'Bibliografía', description: 'Fuentes pediátricas trazables.', icon: Library },
];

export const bottomNavItems = [
  { id: routes.home, label: 'Inicio', icon: HeartPulse },
  { id: routes.protocols, label: 'Protocolos', icon: FileText },
  { id: routes.tools, label: 'Herramientas', icon: Calculator },
  { id: routes.more, label: 'Más', icon: MoreHorizontal },
];

export const desktopNavItems = [
  { id: routes.protocols, label: 'Protocolos' },
  { id: routes.tools, label: 'Herramientas' },
  { id: routes.bibliography, label: 'Bibliografía' },
];

export const sectionIcons = {
  [routes.procedures]: Stethoscope,
  [routes.calculations]: Baby,
};
