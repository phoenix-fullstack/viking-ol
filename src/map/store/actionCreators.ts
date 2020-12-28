import { DEFAULT_VIEW, MapState } from './constants';
import { MapProps } from '../index';

export const initStateFromProps = ({ view = DEFAULT_VIEW }: MapProps): MapState => {
  return {
    view,
    target: null,
    listeners: {}
  };
};

