import cookieParser from "cookie-parser";
import config from "config";
import express from "express";
import "reflect-metadata";
import { container } from "./src/Container/containerbind";
import { InversifyExpressServer } from "inversify-express-utils";
import { Start } from "./src/Connection/Connection";
import { errorHandler } from "./src/Middlewares/ErrorHandler.Middleware";
import "./src/Controlleres"

const server = new InversifyExpressServer(container);
server.setConfig((app) => {
  app.use(express.json());
  app.use(cookieParser());
});

server.setErrorConfig((app) => {
  app.use(errorHandler);
});
Start();
server.build().listen(config.get("SERVER_PORT"), () => {
  console.log(`Server listening on port ${config.get("SERVER_PORT")}`);
});
