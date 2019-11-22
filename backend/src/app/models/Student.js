import Sequelize, { Model } from 'sequelize';

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
            return this.ageCalculate();
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

  ageCalculate() {
    const age = Math.floor(
      differenceInCalendarDays(new Date(), this.dateOfBirth) / 365.25
    );
    return `${age} anos`;
  }
}

export default Student;
