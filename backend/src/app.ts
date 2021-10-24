import "reflect-metadata";
import { createExpressServer, useContainer } from "routing-controllers";
import { Container } from "typedi";
import { createConnection } from "typeorm";
import { UserController } from "./controllers/UserController";

useContainer(Container);
createConnection().then(() => {
  const expressApp = createExpressServer({
    controllers: [UserController],
  });

  expressApp.listen(3001);

  console.log("Server is running on http://localhost:3001/")
})

