// src/sockets/index.ts
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import { attachChatSocket } from "./chat.socket.js";
import { attachLiveSocket } from "./live.socket.js";

let io: IOServer | null = null;

export const initSockets = (server: HttpServer) => {
    io = new IOServer(server, {
        cors: { origin: "*" }
    });

    // Load namespaces
    attachChatSocket(io);
    attachLiveSocket(io);

    return io;
};

export const getIO = () => {
    if (!io) throw new Error("⚠ Socket.io not initialized");
    return io;
};
