import chalk from 'chalk';
import fs from 'fs-extra';
import { format } from 'date-fns';

import Kraken from './app/classes/kraken.js'
import log from './app/lib/log.js'
import config from './app/lib/config.js';

// This is for doing any legacy "requires" such as requiring a JSON file.
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const args = process.argv;
const environment = args[2];

const kraken = new Kraken(config);

global.App = {
  logFile: config.log.file,
  packageJson: require('./package.json')
};


// TODO: This loop should be implemented as a "task" that would be run on each server
(async () => {
    await kraken.init();
    // Check if environment exists
    if (!kraken.config.environments[environment]) {
      log.error(`Environment [${chalk.cyan(environment)}] does not exist!`)
      process.exit(1);
    }
    const env = kraken.config.environments[environment];
    log.info(`Deploying to: [${chalk.cyan(environment)}] - ${env.description}`);

    // Enumerate Servers
    for (const server of kraken.config.environments[environment].servers) {
      if (!server.enabled) {
        log.warn(`Skipping disabled server [${chalk.yellow(server.host)}]`)
      } else {
        log.info(`AppRoot: ${env.appRoot}`);
        log.info(`Processing server [${chalk.cyan(server.host)}]`)
        log.info(` . Establishing connection`);
        await kraken.connect(server);

        log.info(`Sending command uptime`)
        await kraken.exec('uptime');
      }
    }
    log.info('Done sending SSH commands');
    process.exit(0);
})();