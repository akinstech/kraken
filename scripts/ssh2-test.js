/**
 * This is a test of the SSH2 library.  We will likely be using the
 * node-ssh library, which is a promise-based version of SSH2.  But 
 * this code is here for reference.  Can be removed later.
 */

const Client = require('ssh2').Client;

// Create a new SSH client instance
const sshClient = new Client();

// Configure the connection parameters
const connectionParams = {
  host: 'docker2.mynetwork.home',
  username: 'node-deploy',
  // agentForward: true,
  privateKey: require('fs').readFileSync('/home/user/.ssh/id_ed25519'),
  passphrase: 'MyPassphrase'
};

// Handle events when the connection is established
console.log('Setting ready event handler');
sshClient.on('ready', () => {
  console.log('Connected via SSH!');
  // Now you can execute commands, transfer files, etc.
});

// Handle errors during the SSH connection process
console.log('Setting error event handler');
sshClient.on('error', (err) => {
  console.error('Error connecting via SSH:', err);
});

// Connect to the SSH server
console.log('Starting SSH Connection');
sshClient.connect(connectionParams);
console.log(' . After SSH Connection');

console.log('Executing command');
sshClient.exec('uptime', (err, stream) => {
  if (err) throw err;

  stream
    .on('close', (code, signal) => {
      console.log('Command execution closed');
      sshClient.end();
      rl.close();
    })
    .on('data', (data) => {
      console.log('Command output:', data.toString());
    })
    .stderr.on('data', (data) => {
      console.error('Command error:', data.toString());
    });
});

