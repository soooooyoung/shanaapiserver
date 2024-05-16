import { RoutingControllersOptions } from "routing-controllers";

export const routingControllerOptions: RoutingControllersOptions = {
  cors: {
    origin: [
      "https://shanabunny.com",
      "http://localhost:3000",
      process.env.BUILD_HOST,
      process.env.SERVER_HOST,
    ],
  },
  controllers: [`${__dirname}/../controllers/*{.ts,.js}`],
  defaultErrorHandler: false,
};
