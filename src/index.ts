"use strict";
import "reflect-metadata";
import { ShanaServer } from "./server";
import * as dotenv from "dotenv";
dotenv.config();

async function start(): Promise<void> {
  const server = new ShanaServer();
  await server.startServer();
}

start().catch((err) => {
  console.log(err);
  process.exit(-1);
});
