import Source from 'ol/source/Source';

export const compareSource = (sourceA: Source, sourceB: Source) => {
  const idA = (sourceA as any).key_;
  const idB = (sourceB as any).key_;

  return idA === idB;
};

const windSpeedRange: Array<number> = [
  0.3, 1.6, 3.4, 5.5, 8.0, 10.8, 13.9, 17.2, 20.8, 24.5, 28.5, 32.7, 37, 42, 46, 52, 60, 70
];

const windDirectionRange: Array<number> = [
  45, 90, 135, 180, 225, 270, 315
];

const windDirectionDescription: Array<string> = [
  "南风",
  "东南风",
  "东风",
  "东北风",
  "北风",
  "西北风",
  "西风",
  "西南风",
];

const findRangeIndexByValue = (value: number, range: Array<number>): number => {
  if (value < 0) return -1;
  if (value > Math.max.apply(null, range)) {
    return range.length;
  }
  for (var i = 0; i < range.length; i++) {
    if (range[i] > value) {
      return i;
    }
  }
  return 0;
};

export const getWindSpeed = (speed: number): string => {
  const index = findRangeIndexByValue(speed, windSpeedRange);
  return index === -1 ? '暂无' : `${index}`;
};

export const getWindDirection = (driection: number): string => {
  const index = findRangeIndexByValue(driection, windDirectionRange);
  return index === -1 ? '暂无' : windDirectionDescription[index];
};

