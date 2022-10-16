export const randomUniqueInts = (max: number, qty: number): Array<number> => {
  const uniqueSet = new Set<number>();
  while (uniqueSet.size < qty) {
    uniqueSet.add(Math.floor(Math.random() * max));
  }
  return [...uniqueSet];
};
