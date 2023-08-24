import {Server, Socket} from "socket.io";
import {OpenAiService} from "../services/OpenAi.service";

export default function registerChatHandler (io: Server, socket: Socket) {
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('chat', async (msg: string) => {
        const respopnse = await OpenAiService.getInstance().getCompletion(msg);
        io.emit('chat', respopnse);
    });

}
