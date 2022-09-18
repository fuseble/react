import React from 'react';
import cx from 'classnames';

export const useClassName = (defaultClassName: string, ...args: (string | undefined)[]) => {
  return React.useMemo(() => cx(defaultClassName, ...args), [args]);
};
