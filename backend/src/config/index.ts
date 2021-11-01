import * as dotenv from "dotenv";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
if (envFound.error) throw new Error("No .env file");

export const config = {
  port: parseInt(process.env.NODE_DOCKER_PORT, 10),

  db: {
    HOST: process.env.MYSQLDB_HOST,
    USER: process.env.MYSQLDB_USER,
    PASSWORD: process.env.MYSQLDB_ROOT_PASSWORD,
    DB: process.env.MYSQLDB_DATABASE,
  },

  jwtLifeTime: process.env.JWT_LIFETIME,

  jwtSecret: process.env.JWT_SECRET,

  jwtAlgo: process.env.JWT_ALGORITHM,
};
