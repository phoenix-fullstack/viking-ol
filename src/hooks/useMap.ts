import { useContext } from 'react';

import { OpenlayersContext } from '../context';

export const useMap = () => {
  const context = useContext(OpenlayersContext);
  if (!context) {
    throw new Error('useMap must be used within an Openlayers.Provider');
  }
  return context.map;
};
