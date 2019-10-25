module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'students',
      [
        {
          name: 'Aluno Teste',
          email: 'alunoteste@gmail.com',
          date_of_birth: new Date('1996-10-25 10:00:00'),
          weight: 78,
          height: 1.70,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};