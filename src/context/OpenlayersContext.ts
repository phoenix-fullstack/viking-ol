import { createContext } from 'react';
import Map from 'ol/Map';

export interface IOpenlayersContextProps {
  map: Map;
};

const OpenlayersContext = createContext<IOpenlayersContextProps>(undefined as any);

export const OpenlayersProvider = OpenlayersContext.Provider;

export default OpenlayersContext;

