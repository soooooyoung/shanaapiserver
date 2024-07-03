import * as dotenv from "dotenv";

dotenv.config();

export const env = {
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
  app: {
    port: Number(process.env.PORT) || 9000,
    serviceID: process.env.SERVICE_ID,
  },
  utils: {
    JWT_TOKEN_SECRET: process.env.JWT_TOKEN_SECRET,
    ENCRYPT_KEY_SECRET: process.env.ENCRYPT_KEY_SECRET,
    API_KEY_SECRET: process.env.API_KEY_SECRET,
  },
  db: {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_PORT: Number(process.env.DB_PORT) || 9000,
    DB_DATABASE: process.env.DB_DATABASE,
  },
  email: {
    EMAIL_HOST: process.env.EMAIL_HOST,
    EMAIL_AUTH_USER: process.env.EMAIL_AUTH_USER,
    EMAIL_AUTH_PASS: process.env.EMAIL_AUTH_PASS,
  },
  client: process.env.CLIENT,
  path: {
    music: process.env.PATH_MUSIC,
  },
};
