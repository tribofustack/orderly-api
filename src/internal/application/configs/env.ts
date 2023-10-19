export const env = {
  isTest: process.env.NODE_ENV === 'test',

  dbHost: String(process.env.DB_HOST),
  dbPort: Number(process.env.DB_PORT),
  dbName: String(process.env.DB_NAME),
  dbUser: String(process.env.DB_USERNAME),
  dbPassword: String(process.env.DB_PASSWORD),
  dbDialect: String(process.env.DB_DIALECT),
};
