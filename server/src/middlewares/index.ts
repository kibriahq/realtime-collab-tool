import cors from "cors";
import { json, type RequestHandler } from "express";
import morgan from "morgan";

const middlewares: RequestHandler[] = [
    cors(),
    json(),
    morgan('dev')
]

export default middlewares;