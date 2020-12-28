import { useEffect, MutableRefObject } from 'react';

import OlMap from 'ol/Map';



export interface IMapTragetOptions {
  map: OlMap;
  target: MutableRefObject<HTMLDivElement | null>;
  onTargetChange: (target?: HTMLDivElement) => void;
}

export const useMapTarget = ({ map, target, onTargetChange }: IMapTragetOptions) => {
  useEffect(() => {
    const sub = map.on('change:target', e => onTargetChange(e.target.getTargetElement()))
    map.setTarget(target.current as any);

    return () => {
      if (target.current && map.getTargetElement()) {
        map.getTargetElement().remove();
      }
      map.un('change:target', (sub as any).listener);
      map.setTarget(undefined);
    }
  }, [map, target.current])
}