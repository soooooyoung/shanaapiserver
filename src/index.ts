"use strict";
import "reflect-metadata";
import { ShanaServer } from "./server";
import * as MSSQLConnector from "./utils/database/DBConnector";

async function start(): Promise<void> {
  // DB Connection
  MSSQLConnector.initPool();
  // Server Start
  const server = new ShanaServer();
  await server.startServer();
}

start().catch((err) => {
  console.log(err);
  process.exit(-1);
});
