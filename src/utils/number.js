export function floorFragment(num, digits) {
  const factor = Math.pow(10, digits);
  return Math.floor(num * factor) / factor;
}
