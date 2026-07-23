import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";

const app = express();

app.use(cors());

app.use(helmet());

app.use(compression());

app.use(express.json());

export default app;