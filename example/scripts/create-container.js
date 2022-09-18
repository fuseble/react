/* eslint-disable */

const fs = require('fs');
const fsExtra = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const camelCase = require('camelcase');

const addFile = process.argv[2];
const addFilename = `/${addFile}.tsx`;

const pagesFolder = path.join(__dirname + '/../src/pages');
const containersFolder = path.join(__dirname + '/../src/containers');

const getCaptializeString = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const getContainer = (fileName) => `import React from 'react';
import type { NextPage } from 'next';

import './${fileName === 'index' ? 'style' : fileName}.module.scss';

const ${getCaptializeString(fileName)}Container: NextPage = () => {
  return <div className="${getCaptializeString(fileName)}"><h1>${getCaptializeString(
  fileName,
)}</h1></div>
};

export default ${getCaptializeString(fileName)}Container;`;

const getUseHook = (hookName) => `import React from 'react';

interface ${getCaptializeString(hookName)} {}

const ${hookName} = (): ${getCaptializeString(hookName)} => {
  return {};
};

export default ${hookName};
`;

const getFileNameAndDirectory = (file) => {
  let srcDirectory = undefined;
  const splittedPaths = file.split('/');

  let directoryName = splittedPaths[splittedPaths.length - 2];
  if (directoryName.includes('[') && directoryName.includes(']')) {
    const beforeDirectory = splittedPaths[splittedPaths.length - 3];
    directoryName = `${beforeDirectory} detail`;
  }

  const srcIndex = splittedPaths.findIndex((path) => path === 'src');
  if (srcIndex > -1) {
    srcDirectory = `@/${splittedPaths.slice(srcIndex + 1, splittedPaths.length).join('/')}`;
  }

  return {
    fileName: splittedPaths[splittedPaths.length - 1],
    directoryName,
    directory: splittedPaths.slice(0, splittedPaths.length - 1).join('/'),
    srcDirectory,
    extname: path.extname(file),
  };
};

(async () => {
  console.log({
    addFile,
    pagesFolder,
    containersFolder,
  });

  const pagesFilePath = pagesFolder + addFilename;
  const containersFilePath = containersFolder + addFilename;

  if (!fs.existsSync(pagesFilePath)) {
    const { srcDirectory } = getFileNameAndDirectory(pagesFilePath);
    fsExtra.outputFileSync(
      pagesFilePath,
      `/* eslint-disable */\nexport { default } from '${srcDirectory
        .replace('.tsx', '')
        .replace('pages', 'containers')}';`,
    );
  }

  if (!fs.existsSync(containersFilePath)) {
    const { fileName, directory, directoryName } = getFileNameAndDirectory(containersFilePath);

    // container create mode
    fsExtra.outputFileSync(containersFilePath, getContainer(fileName.replace('.tsx', '')));

    // useHook create mode
    const useHookName = camelCase(`use ${directoryName}`);
    const useHookFileName = `${useHookName}.tsx`;
    const destHook = `${directory.replace('pages', 'containers')}/${useHookFileName}`;
    if (!fs.existsSync(destHook)) {
      fsExtra.outputFileSync(destHook, getUseHook(useHookName), {
        encoding: 'utf-8',
      });
    } else {
      console.log(chalk.red(`useHook ${destHook} Already Exist!`));
    }

    // scss create mode
    const scssFileName = `${
      fileName === 'index.tsx' ? 'style' : fileName.replace('.tsx', '')
    }.module.scss`;

    const destScss = `${directory.replace('pages', 'containers')}/${scssFileName}`;
    if (!fs.existsSync(destScss)) {
      fsExtra.outputFileSync(destScss, '', { encoding: 'utf-8' });
    }
  }
})();
