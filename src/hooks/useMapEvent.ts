import { toUserCoordinate } from 'ol/proj';
import { DependencyList, useContext, useEffect } from 'react';

import { MapContext } from '../context';

export function useMapEvent<T>(type: string, callback: (e: T) => boolean, deps: DependencyList = []) {
  const { pushEventListener, removeEventListener } = useContext(MapContext);

  useEffect(() => {
    pushEventListener(type, callback);

    return () => removeEventListener(type, callback);
  }, [pushEventListener, removeEventListener, ...deps])
};
