"use strict";
import "reflect-metadata";
import * as MYSQLConnector from "./utils/database/MYSQLConnector";
import { ShanaServer } from "./server";
import { logError } from "./utils/Logger";

async function start(): Promise<void> {
  // Server Start
  const server = new ShanaServer();
  await server.startServer();
  // DB Connection
  MYSQLConnector.initPool();
}

start().catch((err) => {
  logError(err);
  process.exit(-1);
});
