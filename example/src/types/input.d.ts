import { valueOf } from '@/utils/typescript-utils';

export const inputSizes = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
  FOOTER: 'footer',
} as const;

export type InputSizeType = valueOf<typeof inputSizes>;
