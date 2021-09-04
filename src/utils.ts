export const last = <T>(arr: T[]) => arr[arr.length - 1]
export const first = <T>(arr: T[]) => arr[0]
export const upperFirst = (string: string) => `${string[0].toUpperCase()}${string.slice(1)}`

const _numbersMap: Record<string, number> = {
  M: 1000,
  CM: 900,
  D: 500,
  CD: 400,
  C: 100,
  XC: 90,
  L: 50,
  XL: 40,
  X: 10,
  IX: 9,
  V: 5,
  IV: 4,
  I: 1
}
export const cardinalToRoman = (num: number) => {
  if (num >= 4000) {
    throw new Error('Number is too big');
  }

  let roman = '';
  for (const i of Object.keys(_numbersMap)) {
    const q = Math.floor(num / _numbersMap[i]);
    num -= q * _numbersMap[i];
    roman += i.repeat(q);
  }

  return roman;
};

