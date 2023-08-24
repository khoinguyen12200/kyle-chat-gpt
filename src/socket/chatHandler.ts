import {Server, Socket} from "socket.io";

export default function registerChatHandler (io: Server, socket: Socket) {
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('chat', (msg: string) => {
        io.emit('chat', msg);
    });

}
