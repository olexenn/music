import "reflect-metadata";
import { createExpressServer, useContainer, Action } from "routing-controllers";
import { Container } from "typedi";
import { createConnection } from "typeorm";
import * as express from "express";
import * as path from "path";
import { UserService } from "./services/UserService";

useContainer(Container);
createConnection().then(() => {
  const expressApp = createExpressServer({
    cors: true,
    controllers: [path.join(__dirname, "./controllers/**/*.js")],
    authorizationChecker: async (action: Action, roles: string[]) => {
      const userService = Container.get<UserService>(UserService);

      const token = action.request.headers["authorization"];
      if (!token) return false;

      const user = await userService.findUserByToken(token);
      if (user) return true;

      return false;
    },
    currentUserChecker: async (action: Action) => {
      const userService = Container.get<UserService>(UserService);

      const token = action.request.headers["authorization"];
      if (!token) return null;

      const user = await userService.findUserByToken(token);

      return user;
    },
  });

  expressApp.use(express.static(__dirname + "/static"));
  expressApp.listen(3001);

  console.log(`Server is running on http://localhost:${3001}/`);
});
