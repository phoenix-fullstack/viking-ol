import React, { FC, ReactElement, useRef, useState } from 'react';
import styled, { CSSProperties } from 'styled-components';

import { WindLayer as OLWindLayer, IWindOptions, Field } from 'ol-wind';
import { transform } from 'ol/proj';
import MapBrowserEvent from 'ol/MapBrowserEvent';

import { useMap, useLayer, useObservable } from '../hooks';

import { getWindSpeed, getWindDirection } from '../util';
import { getDirection, getSpeed } from '../util/helper';

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

interface IPosition {
  top: number;
  left: number;
}

const WindLayer: FC<any> = ({
  id,
  visible,
  data,
  showInfo,
  isLoading,
  isError,
  ...props
}): ReactElement | null => {
  const map = useMap();
  const layer = useRef<OLWindLayer>(undefined as any);
  const [description, setDescription] = useState<string>('');
  const [position, setPosition] = useState<IPosition>();
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
  );

  useObservable(map, 'pointermove', (event) => {
    const coordinate = (event as any).coordinate;
    const [lng, lat] = transform(coordinate, 'EPSG:3857', 'EPSG:4326')
    const field: Field = layer.current.getData();
    const gridValue = field.interpolatedValueAt(lng, lat);
    const { u, v } = gridValue;
    const direction = getDirection(u, v, 'bearingCCW');
    const speed = getSpeed(u, v);
    const speedLevel = getWindSpeed(speed);
    const windDirection = getWindDirection(direction);
    const description = `${windDirection}  ${speed.toFixed(1)} m/s (${speedLevel}级)`
    let [left, top] = (event as any).pixel;
    top = top - 30;
    left = left - 150 * 1.1 - 5;
    if (top < 0) top = 0;
    if (left < 0) left = 0;
    setDescription(description);
    setPosition({ top, left });
  }, []);

  return showInfo ?
    <WindWrapper style={{ ...position }}>
      <p>
        <span>{description}</span>
      </p>
    </WindWrapper>
    : null;
};

const WindWrapper = styled.div<CSSProperties>`
  width: 10rem;
  background: rgba(131, 131, 131, 0.5);
  position: absolute;
  z-index: 100;
  padding: 0.1rem;
  color: #fff;
  line-height: 2rem;
  border-radius: 0.4rem;  
  >P {
    width: 100%;
    height: 50%;
    margin: 0;
    text-align: center;
  }
`;

WindLayer.defaultProps = {
  showInfo: true
}
WindLayer.displayName = 'WindLayer';

export default WindLayer;
