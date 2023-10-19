import { env } from 'src/internal/application/configs/env';

const conn = {
  dialect: 'postgres',
  host: env.dbHost,
  database: env.dbName,
  username: env.dbUser,
  password: env.dbPassword,
  port: env.dbPort,
  logging: false,
  sync: { force: true },
  autoLoadModels: true,
  // models: [`${__dirname}/models`],
};

const connTest = {
  dialect: 'sqlite',
  storage: ':memory:',
  logging: false,
  sync: { force: true },
};

export const connection = env.isTest ? connTest : conn;
