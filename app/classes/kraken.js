import chalk from 'chalk';
import { NodeSSH } from 'node-ssh';

import log from '../lib/log.js';
import * as fn from '../util/functions.js';

import krakenArt from '../../data/kraken-ascii.js';

class Kraken {
  constructor(config) {
    this.config = config;
    this.ssh = new NodeSSH();
  }

  async init() {
    console.log();
    console.log();
    console.log(chalk.white.bold(fn.centerText('RELEASE THE KRAKEN!!!')));
    console.log();
    console.log(chalk.green(fn.centerText(krakenArt)));

    console.log(chalk.grey(fn.centerText('{ SCOLabs }')));
    console.log();
    log.debug(`SCOLabs Kraken Release Tool v${global.App.packageJson.version}`);
  }

  async connect(server) {
    await this.ssh
      .connect({
        host: server.host,
        username: this.config.identity.user,
        privateKeyPath: this.config.identity.privatekey,
        passphrase: this.config.identity.passphrase,
      });
  }

  async exec(command) {
    log.info(`${chalk.yellow('Executing command:')} [${command}]`);
    await this.ssh.execCommand(command, { cwd: '.' }).then((result) => {
      if (result.stdout) {
        log.debug(`(stdout):\n\t\t ${chalk.grey((result.stdout).replace(/\n\r?/g, '\n\t\t'))}`);
      }
      if (result.stderr) {
        log.error(`(stderr):\n\t\t ${chalk.red((result.stderr).replace(/\n\r?/g, '\n\t\t'))}`);
      }
    });
  }
}

export default Kraken;
