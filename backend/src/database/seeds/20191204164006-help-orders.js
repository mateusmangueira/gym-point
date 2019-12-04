module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'help_orders',
      [
        {
          student_id: '1',
          question: 'Oi, essa acad deixa giga biga?',
          answer: null,
          answer_at: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
