import {Socket} from "socket.io";
import express from 'express'
import next from 'next'
import { createServer } from 'http'
import { Server } from 'socket.io'
import registerChatHandler from "./socket/chatHandler";

const port = parseInt(process.env.PORT ?? '0', 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()


app.prepare().then(() => {

    const server = express();
    const httpServer = createServer(server);
    const io = new Server(httpServer, {
    });

    const onConnection = (socket: Socket) => {
        registerChatHandler(io, socket);
    }

    io.on("connection", onConnection);


    httpServer.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`)
    })

    server.all('*', (req: any,res: any) => {
        return handle(req, res)
    })

})

