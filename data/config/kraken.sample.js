// TODO: Eliminate the need to include dotenv in this config file
import * as dotenv from 'dotenv';

dotenv.config({ path: './config/.env' });

const config = {
  identity: {
    user: 'kraken-deploy',
    privatekey: process.env.SSH_privatekey,
    passphrase: process.env.SSH_passphrase,
  },
  appName: 'testapp1',
  log: {
    file: './log/kraken.log',
  },
  environments: {
    dev: {
      description: 'Development',
      appRoot: `/opt/nodejs/testapp1`,
      webpackBuild: false,
      reloadApp: true,
      npmInstall: false,
      runUser: 'kraken-run',
      servers: [
        {
          enabled: true,
          host: 'lnxapp01.sconet.ca.gov'
        },
        {
          enabled: false,
          host: 'lnxapp02.sconet.ca.gov'
        },
      ]
    },
    prod: {
      description: 'Production',
      servers: [
        {
          enabled: true,
          host: 'lnxapp01.sconet.ca.gov'
        }
      ]
    }
  }
}

export default config;
