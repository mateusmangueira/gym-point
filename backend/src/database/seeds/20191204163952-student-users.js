module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'students',
      [
        {
          name: 'Mateus Aluno Teste',
          email: 'alunoteste@gmail.com',
          age: 23,
          weight: 78,
          height: 1.7,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
