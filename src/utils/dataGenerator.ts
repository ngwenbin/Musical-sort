export const randomUniqueInts = (
  qty: number,
  max: number,
  min?: number
): Array<number> => {
  const uniqueSet = new Set<number>();
  min ??= 0;
  while (uniqueSet.size < qty) {
    uniqueSet.add(Math.floor(Math.random() * (max - min) + min));
  }
  return [...uniqueSet];
};
