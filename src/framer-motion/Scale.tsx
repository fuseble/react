import React from 'react';
import { motion } from 'framer-motion';
import { FramerScaleProps } from './types';

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
      ...(typeof rest.initial === 'object' ? rest.initial : {})
    }),
    [rest.whileInView, startOpacity, rest.initial]
  );

  const animate = React.useMemo(
    () => ({
      scale,
      opacity: typeof endOpacity === 'number' ? endOpacity : 1,
      ...(typeof rest.animate === 'object' ? rest.animate : {})
    }),
    [scale, endOpacity, rest.animate]
  );

  const transition = React.useMemo(
    () => ({
      duration: duration || 1,
      repeat: repeat === true ? Infinity : repeat || 0,
      delay: delay || 0,
      times,
      ...(rest.transition || {})
    }),
    [duration, repeat, delay, times, rest.transition]
  );

  return (
    <motion.div initial={initial} animate={animate} transition={transition} {...rest}>
      {children}
    </motion.div>
  );
};
export default FramerScale;
