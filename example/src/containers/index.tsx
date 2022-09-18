import React from 'react';
import { NextPage } from 'next';
import { Framer } from '@/components/Framer';
import styles from './styles.module.scss';

const IndexContainer: NextPage = () => {
  return (
    <div className={styles.mainContainer}>
      <Framer.Move startX='-100%' startOpacity={0} delay={0}>
        <Framer.Scale scale={[0.5, 1]} times={[0, 1]} delay={1} />
      </Framer.Move>

      <Framer.Move repeat endX={[-50, 50, -50]} />

      <Framer.Default />

      <Framer.Screen>
        <Framer.ScreenItem className={styles.scrollInView} transition={{ duration: 1.5 }} />
      </Framer.Screen>
    </div>
  );
};

export default IndexContainer;
