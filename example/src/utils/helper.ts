let idCounter = 0;

export function generateID(prefix = 'blog-id-') {
  // eslint-disable-next-line no-return-assign
  return `${prefix}${(idCounter += 1)}`;
}
