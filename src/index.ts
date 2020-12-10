require('dotenv').config({
  path: require('path').resolve(process.cwd(), '.env.dev'),
  debug: !!process.env.DEBUG,
});

require('module-alias').addAlias('app', __dirname);

import 'reflect-metadata';
import express from 'express';

const app = express();
const port = process.env.PORT || 4000;

app.get('/', (_, res) => {
  res.send('Hello World!');
});

const server = app.listen(port, () => {
  console.log(`App server listening at http://localhost:${port}`);
});

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);

function shutDown() {
  console.log('Received kill signal, shutting down gracefully');
  server.close(() => {
    console.log('Closed out remaining connections');
    process.exit(0);
  });

  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
}
