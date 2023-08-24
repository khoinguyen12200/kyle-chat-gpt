import {Server, Socket} from "socket.io";
import {OpenAiService} from "../services/OpenAi.service";

export default function registerChatHandler (io: Server, socket: Socket) {
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('chat', async (data: string) => {
        const {message,history} = JSON.parse(data);
        const response = await OpenAiService.getInstance().getCompletionFromConversation(message, history);

        socket.emit('chat',response);
    });

}
