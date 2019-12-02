import Sequelize, { Model } from 'sequelize';
import { differenceInCalendarDays } from 'date-fns';

class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        date_of_birth: Sequelize.DATE,
        age: {
          type: Sequelize.VIRTUAL,
          get() {
            return this.calculateAge();
          },
        },
        weight: Sequelize.FLOAT,
        height: Sequelize.FLOAT,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  calculateAge() {
    const age = Math.floor(
      differenceInCalendarDays(new Date(), this.date_of_birth) / 365.25
    );
    return `${age} anos`;
  }
}

export default Student;
