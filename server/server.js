import express from "express";
import router from "./src/router/router.js";
import authRouter from "./src/router/authRouter.js";
import cors from "cors";
import * as env from "dotenv";
env.config();

// socket
import { createServer } from "http";
import socketService from "./src/service/socketService.js";
const addr = "127.0.0.1";
const port = 6060;

const app = express();
const httpServer = createServer(app);

app.use(cors());
app.use(express.json());

socketService.attach(httpServer);

app.get("/health", (request, response) => {
  response.send("Server is running!");
});

app.use(authRouter);

app.use("/ducks/api/", router); // all url with :6060/ducks/api...

httpServer.listen(port, addr, () => {
  console.log("Server is listening on port: " + port);
});
