import React, { FC, ReactElement, useCallback, useReducer, useRef } from 'react';
import { MapOptions } from 'ol/PluggableMap';

import { MapContext } from '../context';
import { useMap, useMapTarget, useView } from '../hooks';
import { MAP_ACTIONS } from './store/constants';
import { initStateFromProps } from './store/actionCreators';
import reducer from './store/reducer';

import 'ol/ol.css';

type OlMapOptions = Omit<MapOptions, 'controls' | 'overlays' | 'interactions' | 'target' | 'keyboardEventTarget'>
export type MapProps = OlMapOptions & {
  className?: string;
  id?: string;
};

const Map: FC<MapProps> = ({
  id,
  className,
  children,
  ...props
}): ReactElement => {
  const map = useMap();
  const mapRef = useRef<HTMLDivElement | null>(null);

  const [state, dispatch] = useReducer(reducer, initStateFromProps(props));
  const { view, target, listeners } = state;

  const setView = useCallback(newView => dispatch({ type: MAP_ACTIONS.SET_VIEW, payload: { view: newView } }), []);

  const pushEventListener = useCallback((type: string, callback) => {
    const listenersForType = listeners[type] || [];
    const newListeners = {
      ...listeners,
      [type]: listenersForType.concat(callback)
    };

    dispatch({ type: MAP_ACTIONS.SET_LISTENERS, payload: { listeners: newListeners } });
  }, [listeners]);

  const removeEventListener = useCallback((type: string, callback) => {
    const listenersForType = listeners[type] || [];
    const newListeners = {
      ...listeners,
      [type]: listenersForType.filter(l => l !== callback)
    };

    dispatch({ type: MAP_ACTIONS.SET_LISTENERS, payload: { listeners: newListeners } });

    return newListeners[type].length !== listenersForType.length;
  }, [listeners]);

  useMapTarget({
    map,
    target: mapRef,
    onTargetChange: el => dispatch({ type: MAP_ACTIONS.SET_TARGET, payload: { target: el } })
  });

  useView(map, view);
  console.log(children)
  return (
    <MapContext.Provider value={{ target, view, setView, pushEventListener, removeEventListener }}>
      <div className={className} ref={mapRef}>
        {children}
      </div>
    </MapContext.Provider>
  )
};

export default Map;
