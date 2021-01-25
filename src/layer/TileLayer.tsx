import React, { FC, useEffect, useRef } from 'react';

import OlTileLayer from 'ol/layer/Tile';
import { Options } from 'ol/layer/BaseTile';

import { useLayer } from '../hooks';
import { Vector } from 'ol/src/source';

export type LayerProps = Options & {
  id?: string;
}

const TileLayer: FC<LayerProps> = ({
  id,
  visible,
  ...props
}): null => {
  const layerRef = useRef<OlTileLayer>(undefined as any);
  useLayer(
    () => {
      layerRef.current = new OlTileLayer({
        visible,
        ...props
      });
      layerRef.current.set('id', id);
      return layerRef.current;
    },
    props,
    [id]
  );

  const { preload, useInterimTilesOnError } = props;
  useEffect(() => {
    if (preload !== undefined) {
      layerRef.current.setPreload(preload)
    }
    if (useInterimTilesOnError !== undefined) {
      layerRef.current.setUseInterimTilesOnError(useInterimTilesOnError);
    }
  }, [preload, useInterimTilesOnError])

  return null;
};

TileLayer.defaultProps = {
  preload: 2
};
TileLayer.displayName = 'TileLayer';

export default TileLayer;
