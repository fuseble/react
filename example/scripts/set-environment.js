/* eslint-disable */

const fs = require('fs-extra');
const chalk = require('chalk');
const selectedEnv = process.argv[2];

const targetEnv = __dirname + `/../env/${selectedEnv.toLowerCase()}.ts`;

fs.exists(targetEnv, (exists) => {
  if (!exists) {
    console.log(chalk.red(`env ${selectedEnv} not found`));
    process.exit(1);
  }

  fs.copySync(targetEnv, __dirname + '/../src/config.ts');
});
