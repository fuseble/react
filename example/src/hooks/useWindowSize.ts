import { useState, useEffect } from 'react';

type WindowSize = {
  width: number | string;
  height: number | string;
};

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: '100vw',
    height: '100vh',
  });

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}
