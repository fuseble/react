import { MotionProps, Variant } from 'framer-motion';

export interface FramerDefaultProps extends MotionProps {
  children?: React.ReactNode;
  className?: string;
  onClick?(): void | Promise<void>;
  repeat?: number | boolean;
  delay?: number;
  duration?: number;
  startOpacity?: number;
  endOpacity?: number;
  variant?: Variant;
}

export interface FramerMoveProps extends FramerDefaultProps {
  startX?: string | number;
  startY?: string | number;
  endX?: string | number | Array<string | number>;
  endY?: string | number | Array<string | number>;
}

export interface FramerScaleProps extends FramerDefaultProps {
  scale: number[];
  times: number[];
}

export interface FramerScreenItemProps extends FramerDefaultProps {
  onscreen?: Variant;
  offscreen?: Variant;
}
