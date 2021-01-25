import React, { FC, useRef } from 'react';
import OlImageLayer from 'ol/layer/Image';
import { Options } from 'ol/layer/BaseImage';

import { useLayer } from '../hooks';

export type LayerOption = Options & {
  id?: string;
};

const ImageLayer: FC<LayerOption> = ({
  id,
  visible,
  opacity,
  ...props
}): null => {
  const layer = useRef<OlImageLayer>(undefined as any);
  useLayer(
    () => {
      layer.current = new OlImageLayer({
        visible,
        opacity,
        ...props
      });
      return layer.current;
    },
    props,
    [id]
  )
  return null;
};

ImageLayer.defaultProps = {
  opacity: 0.6
};
ImageLayer.displayName = 'ImageLayer';

export default ImageLayer;
