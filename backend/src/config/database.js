module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'gymPoint',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
