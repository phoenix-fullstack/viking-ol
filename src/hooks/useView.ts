import { useEffect } from 'react';

import OlMap from 'ol/Map';
import OlView from 'ol/View';
import { EventsKey } from 'ol/events';

export const useView = (map: OlMap, view: OlView) => {
  useEffect(() => {
    const sub = view.on('propertychange', ({ key, target: newView }) => {
      // console.log('view:change', { key, view: newView });
    }) as EventsKey;
    map.setView(view);

    return () => view.un('change', sub.listener);
  }, [view])
};
