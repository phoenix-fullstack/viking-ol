const getDirection = (uMs: number, vMs: number, angleConvention: string) => {
  // Default angle convention is CW
  if (angleConvention.endsWith('CCW')) {
    // vMs comes out upside-down..
    vMs = vMs > 0 ? vMs = -vMs : Math.abs(vMs);
  }
  const velocityAbs = Math.sqrt(Math.pow(uMs, 2) + Math.pow(vMs, 2));
  const velocityDir = Math.atan2(uMs / velocityAbs, vMs / velocityAbs);
  let velocityDirToDegrees = velocityDir * 180 / Math.PI + 180;
  if (angleConvention === 'bearingCW' || angleConvention === 'meteoCCW') {
    velocityDirToDegrees += 180;
    if (velocityDirToDegrees >= 360) velocityDirToDegrees -= 360;
  }
  return velocityDirToDegrees;
};

const getSpeed = (uMs: number, vMs: number, unit?: string) => {
  const velocityAbs = Math.sqrt(Math.pow(uMs, 2) + Math.pow(vMs, 2));
  // Default is m/s
  if (unit === 'k/h') {
    return meterSec2kilometerHour(velocityAbs);
  } else if (unit === 'kt') {
    return meterSec2Knots(velocityAbs);
  } else {
    return velocityAbs;
  }
};

const meterSec2Knots = (meters: number) => {
  return meters / 0.514
};

const meterSec2kilometerHour = (meters: number) => {
  return meters * 3.6
};

export {
  getDirection,
  getSpeed
}