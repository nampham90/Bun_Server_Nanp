import express, {Application} from "express";

import Server from "./src";
const app: Application = express();

const server: Server = new Server(app);

const PORT: number  = Bun.env.PORT ? parseInt(Bun.env.PORT, 10): 3000;

server.start(PORT);