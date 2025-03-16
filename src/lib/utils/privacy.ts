
/**
 * Hashea un nombre para proteger la privacidad del usuario
 * manteniendo visible solo la primera y última letra
 */
export const hashName = (name: string): string => {
  if (!name) return '****';
  const firstChar = name.charAt(0);
  const lastChar = name.charAt(name.length - 1);
  const middleHash = '*'.repeat(Math.min(4, name.length - 2));
  return `${firstChar}${middleHash}${lastChar}`;
};
