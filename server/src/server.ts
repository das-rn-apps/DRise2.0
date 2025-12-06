import http from "http";
import createApp from "./app.js";
import { initSockets } from "./sockets/index.js";
import { logger } from "./config/logger.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) throw new Error("MONGO_URI is missing in .env");

// Wrap in async IIFE to await DB connection before starting server
(async () => {
    try {
        // Connect to MongoDB
        await connectDB(MONGO_URI);

        // Create Express app
        const app = createApp();

        // Create HTTP server
        const server = http.createServer(app);

        // Initialize Socket.io
        const io = initSockets(server);

        // Start server
        server.listen(PORT, () => {
            logger.info(`🚀 Server running on port ${PORT}`);
        });

        // Graceful shutdown
        const shutdown = () => {
            logger.warn("⚠️ Graceful shutdown started...");

            server.close(() => {
                logger.info("🛑 HTTP server closed");
                process.exit(0);
            });

            io.close(() => {
                logger.info("🔌 Socket.io closed");
            });

            setTimeout(() => {
                logger.error("❌ Forced shutdown");
                process.exit(1);
            }, 10000);
        };

        process.on("SIGINT", shutdown);
        process.on("SIGTERM", shutdown);
    } catch (error) {
        logger.error("❌ Server startup failed", error as Error);
        process.exit(1);
    }
})();
