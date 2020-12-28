import React, { FC, useRef, useEffect } from 'react';
import OlVectorLayer from 'ol/layer/Vector';
import { Options } from 'ol/layer/BaseVector';

import { useLayer } from '../hooks';

export type LayerProps = Options;

const VectorLayer: FC<LayerProps> = ({
  visible,
  ...props
}): null => {
  const layerRef = useRef<OlVectorLayer>(undefined as any);
  useLayer(
    () => {
      layerRef.current = new OlVectorLayer({
        visible,
        ...props
      });
      return layerRef.current;
    },
    props,
    [props.renderBuffer, props.updateWhileAnimating, props.updateWhileInteracting, props.declutter]
  );

  const { renderOrder, style } = props;
  useEffect(() => {
    if (renderOrder !== undefined) {
      layerRef.current.setRenderOrder(renderOrder);
    }
    if (style !== undefined) {
      layerRef.current.setStyle(style);
    }
  }, [renderOrder, style]);

  return null;
};

VectorLayer.defaultProps = {};
VectorLayer.displayName = 'VectorLayer';

export default VectorLayer;
