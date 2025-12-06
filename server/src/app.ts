// src/app.ts
import express, { Application } from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import "express-async-errors";
import { errorHandler } from "./middleware/errorHandler.js";
import routes from "./routes/index.js";

const createApp = (): Application => {
    const app = express();

    // Middlewares
    app.use(helmet());
    app.use(cors());
    app.use(express.json({ limit: "10mb" }));
    app.use(express.urlencoded({ extended: true }));
    app.use(morgan("dev"));

    // Routes
    app.use("/api", routes);

    // Health check
    app.get("/health", (_, res) => res.json({ status: "ok" }));

    // Error handler (should be last)
    app.use(errorHandler);

    return app;
};

export default createApp;
