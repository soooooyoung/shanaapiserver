import { RoutingControllersOptions } from "routing-controllers";

export const routingControllerOptions: RoutingControllersOptions = {
  cors: {
    origin: [
      "https://shanabunny.com",
      "http://localhost:3000",
      process.env.BUILD_HOST,
      process.env.SERVER_HOST,
    ],
    // credentials: true,
    // exposedHeaders: ["set-cookie"],
  },
  controllers: [`${__dirname}/../controllers/*{.ts,.js}`],
};
