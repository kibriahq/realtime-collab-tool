import http from "http";
import app from "./app/app.js";
import startServer from "./utils/startServer.js";
import { Server } from "@hocuspocus/server";

const PORT = Number(process.env.PORT) || 4000;
const server = http.createServer(app);

const hocuspocus = new Server({
    port: 1234,
});

hocuspocus.listen();

app.get('/health', (req, res) => res.json({ status: 'ok' }));

startServer(server, PORT);