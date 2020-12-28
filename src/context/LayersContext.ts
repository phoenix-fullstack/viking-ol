import { createContext } from 'react';

import Layer from 'ol/layer/Layer';
import Source from 'ol/source/Source';

export interface ILayersContextProps {
  addLayer: <T extends Source>(layer: Layer<T>) => void;
  removeLayer: <T extends Source>(layer: Layer<T>) => void;
}


const LayersContext = createContext<ILayersContextProps>(undefined as any);

export default LayersContext;
