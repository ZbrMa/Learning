const concurrently = require('concurrently');

concurrently([
    { command: 'npm start --prefix frontend', name: 'frontend', prefixColor: 'green' },
    { command: 'nodemon --exec "ts-node" ./backend/src/server.ts', name: 'backend', prefixColor: 'yellow' }
]);