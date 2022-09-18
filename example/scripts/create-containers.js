/* eslint-disable */

const path = require('path');
const fs = require('fs');
const fsExtra = require('fs-extra');
const chalk = require('chalk');
const camelCase = require('camelcase');

const { resolve } = require('path');
const { readdir, readFile, writeFile } = require('fs').promises;

const pagesFilePath = path.join(__dirname + '/../src/pages/');
const containersFilePath = path.join(__dirname + '/../src/containers/');

const getCaptializeString = (str) => str.charAt(0).toUpperCase() + str.slice(1);

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

async function getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : res;
    }),
  );
  return Array.prototype.concat(...files);
}

async function createFilesInContainers(files) {
  for await (const file of files) {
    if (file.includes('src/pages/index.tsx')) continue;
    const pageFilePath = file;
    const containerFilePath = `${containersFilePath}${file.replace(pagesFilePath, '')}`;

    const fileContent = await readFile(file).then((file) => file.toString('utf-8'));
    const { fileName, directoryName, directory, srcDirectory, extname } =
      getFileNameAndDirectory(file);

    const isReactContainer = extname === '.tsx' && !fileName.startsWith('_');

    if (isReactContainer) {
      // move page -> container
      if (fs.existsSync(containerFilePath)) {
        console.log(chalk.red(`containers ${directoryName}/${fileName} Already Exist!`));
      } else {
        fsExtra.outputFileSync(containerFilePath, fileContent, { encoding: 'utf-8' });
      }
    }
    if (isReactContainer && !fileName.startsWith('_')) {
      // scss create mode
      const scssFileName = `${
        fileName === 'index.tsx' ? 'style' : fileName.replace('.tsx', '')
      }.module.scss`;

      const destScss = `${directory.replace('pages', 'containers')}/${scssFileName}`;
      if (!fs.existsSync(destScss)) {
        fsExtra.outputFileSync(destScss, '', { encoding: 'utf-8' });
      }

      // hook create mode
      const useHookName = camelCase(`use ${directoryName}`);
      const useHookFileName = `${useHookName}.tsx`;
      const destContainer = `${directory.replace('pages', 'containers')}/${useHookFileName}`;
      if (!fs.existsSync(destContainer)) {
        fsExtra.outputFileSync(destContainer, getUseHook(useHookName), {
          encoding: 'utf-8',
        });
      } else {
        console.log(chalk.red(`useHook ${destContainer} Already Exist!`));
      }

      // rewrite pages file
      fsExtra.outputFileSync(
        pageFilePath,
        `/* eslint-disable */\nexport { default } from '${srcDirectory
          .replace('.tsx', '')
          .replace('pages', 'containers')}';`,
      );
    }

    if (extname === '.scss') {
      // remove pages scss file
      fsExtra.removeSync(pageFilePath);
    }
  }
}

(async () => {
  await createFilesInContainers(await getFiles(pagesFilePath));
})();
