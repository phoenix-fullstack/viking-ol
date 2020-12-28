import { createContext } from 'react';
import View from 'ol/View';

export interface IMapContextProps {
  target: HTMLDivElement | null;
  view: View;
  setView: (view: View) => void;

  pushEventListener: (type: string, callback: (e: any) => boolean) => void;
  removeEventListener: (type: string, callback: (e: any) => boolean) => void;
};

const MapContext = createContext<IMapContextProps>(undefined as any);

export default MapContext;
