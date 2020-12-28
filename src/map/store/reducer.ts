import { MapState, MapAction, MAP_ACTIONS } from './constants';

export default (state: MapState, { type, payload }: MapAction<Partial<MapState>>): MapState => {
  switch (type) {
    case MAP_ACTIONS.SET_VIEW:
      return { ...state, view: payload.view! };
    case MAP_ACTIONS.SET_TARGET:
      return { ...state, target: payload.target! };
    case MAP_ACTIONS.SET_LISTENERS:
      return { ...state, listeners: payload.listeners! };
    default:
      throw new Error()
  }
};
