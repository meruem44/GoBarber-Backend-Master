import express, { json, Application } from "express";
import "express-async-errors";
import cors from "cors";

import { routes } from "./routes";
import "./database";
import { uploadConfig } from "./config/upload";

class App {
  public server: Application;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.server.use(json());
    this.server.use(cors());
    this.server.use("/files", express.static(uploadConfig.directory));
  }
  private routes(): void {
    this.server.use(routes);
  }
}

export default new App().server;
