import 'dotenv/config';

const config = {
  identity: {
    user: 'node-deploy',
    privatekey: process.env.SSH_privatekey,
    passphrase: process.env.SSH_passphrase,
  },
  appName: 'myApp',
  log: {
    file: './log/kraken.log',
  },
  environments: {
    dev: {
      description: 'Development',
      appRoot: `/opt/nodejs/myAppdev`,
      webpackBuild: false,
      reloadApp: true,
      npmInstall: false,
      runUser: 'node-run',
      servers: [
        {
          enabled: false,
          host: 'docker1.akinstech.home'
        },
        {
          enabled: true,
          host: 'docker2.akinstech.home'
        },
      ]
    },
    prod: {
      description: 'Production',
      servers: [
        {
          enabled: true,
          host: 'docker2.akinstech.home'
        }
      ]
    }
  }
}

export default config;
