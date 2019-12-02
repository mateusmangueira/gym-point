import express from 'express';
import cors from 'cors';
import route from './routes';
import './database';

import 'dotenv/config';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(cors());
    this.server.use(route);
  }
}

export default new App().server;
