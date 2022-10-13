import React from 'react';
import { motion } from 'framer-motion';
import { FramerMoveProps } from './types';

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
      ...(typeof rest.initial === 'object' ? rest.initial : {})
    }),
    [startX, startY, startOpacity, rest.initial]
  );

  const animate = React.useMemo(
    () => ({
      x: endX || 0,
      y: endY || 0,
      opacity: typeof endOpacity === 'number' ? endOpacity : 1,
      ...(typeof rest.animate === 'object' ? rest.animate : {})
    }),
    [endX, endY, endOpacity, rest.animate]
  );

  const transition = React.useMemo(
    () => ({
      duration: duration || 1,
      repeat: repeat === true ? Infinity : repeat || 0,
      delay: delay || 0,
      ...(rest.transition || {})
    }),
    [duration, repeat, delay, rest.transition]
  );

  return (
    <motion.div initial={initial} animate={animate} transition={transition} {...rest}>
      {children}
    </motion.div>
  );
};

export default FramerMove;
