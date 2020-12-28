import React, { FC, ReactElement, useCallback } from 'react';

import { LayersContext } from '../context';
import { useMap } from '../hooks';

export interface ILayerProps { }

const Layers: React.FC<ILayerProps> = ({
  children
}): ReactElement => {
  const map = useMap();
  const addLayer = useCallback(layer => map.addLayer(layer), []);
  const removeLayer = useCallback(layer => map.removeLayer(layer), []);

  return (
    <LayersContext.Provider value={{
      addLayer,
      removeLayer
    }}>
      {children}
    </LayersContext.Provider>
  )
};

Layers.defaultProps = {};
Layers.displayName = 'Layers';

export default Layers;
