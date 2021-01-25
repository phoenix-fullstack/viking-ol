import React, { FC, useRef } from 'react';

import { WindLayer as OLWindLayer, IWindOptions } from 'ol-wind';

import { useLayer } from '../hooks';

const defaulColorScale = [
  "rgb(36,104, 180)",
  "rgb(60,157, 194)",
  "rgb(128,205,193)",
  "rgb(151,218,168)",
  "rgb(198,231,181)",
  "rgb(238,247,217)",
  "rgb(255,238,159)",
  "rgb(252,217,125)",
  "rgb(255,182,100)",
  "rgb(252,150,75)",
  "rgb(250,112,52)",
  "rgb(245,64,32)",
  "rgb(237,45,28)",
  "rgb(220,24,32)",
  "rgb(180,0,35)"
];

const params = {
  minVelocity: 0,
  maxVelocity: 10,
  velocityScale: 0.005,
  particleAge: 90,
  lineWidth: 1,
  particleMultiplier: 1 / 300,
  particleReduction: 1.6,
  frameRate: 16,
  colorScale: defaulColorScale,
  devicePixelRatio: 1
};

const WindLayer: FC<any> = ({
  id,
  visible,
  data,
  showInfo,
  isLoading,
  isError,
  ...props
}): null => {
  const layer = useRef<OLWindLayer>(undefined as any);

  useLayer(
    () => {
      layer.current = new OLWindLayer(data, {
        forceRender: false,
        projection: 'EPSG:3857',
        windOptions: params,
        ratio: 1,
        visible,
        ...props
      });
      return layer.current as any;
    },
    { visible },
    [id, data]
  )

  return null;
};

export default WindLayer;
