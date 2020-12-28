import { DependencyList, useContext, useEffect, useRef } from 'react';
import Source from 'ol/source/Source';
import Layer, { Options } from 'ol/layer/Layer';

import { LayersContext } from '../context';
import { compareSource } from '../util/index';

export type LayerOptions<T extends Source> = Options & {
  source?: T;
}

export const useLayer = <T extends Source>(
  layerFactory: () => Layer<T>,
  { visible, opacity, minResolution, maxResolution, extent, source, zIndex }: LayerOptions<T> = {},
  deps: DependencyList = []
) => {
  const layer = useRef<Layer<T>>(undefined as any);
  const { addLayer, removeLayer } = useContext(LayersContext);

  useEffect(() => {
    layer.current = layerFactory();
    addLayer(layer.current);
    return () => { removeLayer(layer.current!); }
  }, deps);

  useEffect(() => {
    if (visible !== undefined) {
      layer.current.setVisible(visible);
    }
    if (opacity !== undefined) {
      layer.current.setOpacity(opacity);
    }
    if (minResolution !== undefined) {
      layer.current.setMinResolution(minResolution);
    }
    if (maxResolution !== undefined) {
      layer.current.setMaxResolution(maxResolution);
    }
    if (extent !== undefined) {
      layer.current.setExtent(extent);
    }
    if (zIndex !== undefined) {
      layer.current.setZIndex(zIndex);
    }
  }, [visible, opacity, minResolution, maxResolution, extent, zIndex]);

  useEffect(() => {
    if (source !== undefined && compareSource(layer.current.getSource(), source)) {
      layer.current.setSource(source);
    }
  }, [source]);
};
