module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: 'quiz1'
    },
    migrations: {
      directory: './db/migrations'
    }
  }
};