export const sliceString = (value, length = 50, noDot = false) => {
  if (!value) return '';
  if (value.length > length)
    return `${value.substring(0, length)} ${noDot ? ' ' : '...'}`;
  return value;
};
