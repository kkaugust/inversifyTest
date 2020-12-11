require('dotenv').config({
  path: require('path').resolve(process.cwd(), '.env.dev'),
  debug: !!process.env.DEBUG,
});

require('module-alias').addAlias('app', __dirname);

import 'reflect-metadata';
import { Server } from 'http';
import express from 'express';
import { boot } from './boot';

const app = express();
const port = process.env.PORT || 4000;

function shutDown(server: Server) {
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

boot(app).then((app) => {
  app.get('/', (_, res) => {
    res.send('Hello World!');
  });

  const server = app.listen(port, () => {
    console.log(`App server listening at http://localhost:${port}`);
  });

  process.on('SIGTERM', () => shutDown(server));
  process.on('SIGINT', () => shutDown(server));
});
