const { exec } = require('child_process');

exec('node bin/src/server.js > logs.txt', e => {
  console.log(e);
});
