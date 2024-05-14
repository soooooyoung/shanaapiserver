"use strict";
import { ShanaServer } from "./server";

async function start(): Promise<void> {
  const server = new ShanaServer();
  await server.startServer();
}

start().catch((err) => {
  console.log(err);
  process.exit(-1);
});
