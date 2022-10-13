import React from 'react';
import { motion } from 'framer-motion';
import { FramerDefaultProps } from './types';

const FramerScreen: React.FC<FramerDefaultProps> = ({ children, ...rest }) => {
  return (
    <motion.div
      className='card-container'
      initial='offscreen'
      whileInView='onscreen'
      viewport={{ once: true, amount: 0.8 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default FramerScreen;
