import Sequelize from 'sequelize';

import Student from '../app/models/Student';
import User from '../app/models/User';
import Plan from '../app/models/Plan';
import Checkin from '../app/models/Checkin';

import databaseConfig from '../config/database';

const models = [Student, User, Plan, Checkin];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map(model => model.init(this.connection));
  }
}

export default new Database();
