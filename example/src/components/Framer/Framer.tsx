/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import { motion, type Variant, type MotionProps } from 'framer-motion';

interface FramerDefaultProps extends MotionProps {
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

interface FramerMoveProps extends FramerDefaultProps {
  startX?: string | number;
  startY?: string | number;
  endX?: string | number | Array<string | number>;
  endY?: string | number | Array<string | number>;
}

interface FramerScaleProps extends FramerDefaultProps {
  scale: number[];
  times: number[];
}

interface FramerScreenItemProps extends FramerDefaultProps {
  onscreen?: Variant;
  offscreen?: Variant;
}

export const FramerDefault = motion.div;

const FramerMove: React.FC<FramerMoveProps> = ({
  startX,
  startY,
  startOpacity,
  endX,
  endY,
  endOpacity,
  duration,
  children,
  repeat,
  delay,
  ...rest
}) => {
  const initial = React.useMemo(
    () => ({
      x: startX || 0,
      y: startY || 0,
      opacity: typeof startOpacity === 'number' ? startOpacity : 1,
      ...(typeof rest.initial === 'object' ? rest.initial : {}),
    }),
    [startX, startY, startOpacity, rest.initial],
  );

  const animate = React.useMemo(
    () => ({
      x: endX || 0,
      y: endY || 0,
      opacity: typeof endOpacity === 'number' ? endOpacity : 1,
      ...(typeof rest.animate === 'object' ? rest.animate : {}),
    }),
    [endX, endY, endOpacity, rest.animate],
  );

  const transition = React.useMemo(
    () => ({
      duration: duration || 1,
      repeat: repeat === true ? Infinity : repeat || 0,
      delay: delay || 0,
      ...(rest.transition || {}),
    }),
    [duration, repeat, delay, rest.transition],
  );
  return (
    <motion.div initial={initial} animate={animate} transition={transition} {...rest}>
      {children}
    </motion.div>
  );
};

const FramerScale: React.FC<FramerScaleProps> = ({
  scale,
  times,
  duration,
  repeat,
  delay,
  startOpacity,
  endOpacity,
  children,

  ...rest
}) => {
  const initial = React.useMemo(
    () => ({
      opacity: typeof startOpacity === 'number' ? startOpacity : 1,
      ...(typeof rest.initial === 'object' ? rest.initial : {}),
    }),
    [rest.whileInView, startOpacity, rest.initial],
  );

  const animate = React.useMemo(
    () => ({
      scale,
      opacity: typeof endOpacity === 'number' ? endOpacity : 1,
      ...(typeof rest.animate === 'object' ? rest.animate : {}),
    }),
    [scale, endOpacity, rest.animate],
  );

  const transition = React.useMemo(
    () => ({
      duration: duration || 1,
      repeat: repeat === true ? Infinity : repeat || 0,
      delay: delay || 0,
      times,
      ...(rest.transition || {}),
    }),
    [duration, repeat, delay, times, rest.transition],
  );

  return (
    <motion.div initial={initial} animate={animate} transition={transition} {...rest}>
      {children}
    </motion.div>
  );
};

const FramerScreen: React.FC<FramerDefaultProps> = ({ children, ...rest }) => {
  return (
    <motion.div
      className='card-container'
      initial='offscreen'
      whileInView='onscreen'
      viewport={{ once: true, amount: 0.8 }}
    >
      {children}
    </motion.div>
  );
};

const FramerScreenItem: React.FC<FramerScreenItemProps> = ({
  children,
  offscreen = { opacity: 0 },
  onscreen = { opacity: 1 },
  ...rest
}) => {
  return (
    <motion.div variants={{ offscreen, onscreen }} {...rest}>
      {children}
    </motion.div>
  );
};

export const Framer = {
  Default: FramerDefault,
  Move: FramerMove,
  Scale: FramerScale,
  Screen: FramerScreen,
  ScreenItem: FramerScreenItem,
};
