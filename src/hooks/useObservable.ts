import { DependencyList, useCallback, useEffect } from 'react';
import Observable from 'ol/Observable';

export const useObservable = <E extends Event>(
  target: Observable,
  type: string | string[],
  callback: (e: E) => void,
  deps: DependencyList
) => {
  const memoedCallback = useCallback(callback, deps);

  useEffect(() => {
    target.on(type, memoedCallback);

    return () => target.un(type, memoedCallback);
  }, [target, type, memoedCallback]);
};
