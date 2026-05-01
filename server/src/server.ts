import http from "http";
import app from "./app/app.js";
import startServer from "./utils/startServer.js";
import hocuspocus from "./hocuspocus/index.js";

const PORT = Number(process.env.PORT) || 4000;
const server = http.createServer(app);


hocuspocus.listen();


startServer(server, PORT);