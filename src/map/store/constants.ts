import View from "ol/View";

enum MAP_ACTIONS {
  SET_VIEW = 'SET_VIEW',
  SET_TARGET = 'SET_TARGET',
  SET_LISTENERS = 'SET_LISTENERS'
}

interface MapState {
  view: View;
  target: HTMLDivElement | null;
  listeners: { [key: string]: ((e: any) => boolean)[] };
};

interface MapAction<T> {
  type: MAP_ACTIONS;
  payload: T;
};

const DEFAULT_VIEW = new View({
  center: [0, 0],
  zoom: 4,
  projection: 'EPSG:3857'
});

export {
  MAP_ACTIONS,
  MapState,
  MapAction,
  DEFAULT_VIEW
};
