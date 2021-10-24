import * as dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const envFound = dotenv.config();
if (envFound.error)
  throw new Error("No .env file")

export const config = {
  port: parseInt(process.env.PORT, 10),

  db: {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DB: process.env.DB_NAME,
  },

  jwtLifeTime: process.env.JWT_LIFETIME,

  jwtSecret: process.env.JWT_SECRET,

  jwtAlgo: process.env.JWT_ALGORITHM
}
