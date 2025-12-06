// src/sockets/chat.socket.ts
import { Server } from "socket.io";

export const attachChatSocket = (io: Server) => {
    const nsp = io.of("/chat");

    nsp.on("connection", (socket) => {
        console.log("Chat connected:", socket.id);

        socket.on("joinRoom", (room: string) => {
            socket.join(room);
        });

        socket.on("message", (payload) => {
            nsp.to(payload.room).emit("message", payload);
        });

        socket.on("disconnect", () => {
            console.log("Chat disconnected:", socket.id);
        });
    });
};
