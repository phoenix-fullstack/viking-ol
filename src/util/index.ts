import Source from 'ol/source/Source';

export const compareSource = (sourceA: Source, sourceB: Source) => {
  const idA = (sourceA as any).key_;
  const idB = (sourceB as any).key_;

  return idA === idB;
};
