// src/sockets/live.socket.ts
import { Server } from "socket.io";

export const attachLiveSocket = (io: Server) => {
    const nsp = io.of("/live");

    nsp.on("connection", (socket) => {
        console.log("Live connected:", socket.id);

        socket.on("joinLive", (room: string) => {
            socket.join(room);
        });

        socket.on("signal", (payload) => {
            nsp.to(payload.to).emit("signal", payload);
        });

        socket.on("disconnect", () => {
            console.log("Live disconnected:", socket.id);
        });
    });
};
