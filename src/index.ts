"use strict";
import "reflect-metadata";
import { ShanaServer } from "./server";
import * as MYSQLConnector from "./utils/database/MYSQLConnector";

async function start(): Promise<void> {
  // Server Start
  const server = new ShanaServer();
  await server.startServer();

  // DB Connection
  MYSQLConnector.initPool();
}

start().catch((err) => {
  console.log(err);
  process.exit(-1);
});
