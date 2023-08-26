'use client'
import React, {useEffect} from "react";
import {BiSend} from "react-icons/bi";
import useSocket from "@/hooks/useSocket";
import {useAppDispatch, useAppSelector} from "@/redux/store";
import {addMessage} from "@/redux/conversationSlice";

export default function ChatInput() {
    const dispatch = useAppDispatch();
    const conversation = useAppSelector(state => state.conversation.conversation);
    const {emit, isReady} = useSocket('chat', (data) => {
        dispatch(addMessage({message: data, isUser: false}));
    })


    const [message, setMessage] = React.useState<string>("");

    function onMessageChange(event: React.ChangeEvent<HTMLInputElement>) {
        setMessage(event.target.value);
    }

    function handleSendMessage() {
        if (message.trim().length > 0) {

            let fiveFirst = conversation.concat([]).slice(0 , 5);
            const limitedHistory = fiveFirst.map(
                (message) => {
                    return {
                        message: message.message,
                        role: message.isUser ? "user" : "system",
                        createdAt: message.createdAt
                    }
                }
            )
            const data = {
                history: limitedHistory,
                message: message
            }
            const dataSend = JSON.stringify(data);
            emit(dataSend)
            setMessage("")
            dispatch(addMessage({message: message, isUser: true}));
        }
    }

    return (
        <div className="ChatInput flex flex-row items-center justify-start px-5">
            <input className={"flex-1 p-3 px-4 rounded-full outline-0 border-o bg-slate-800"}
                   type="text"
                   value={message}
                   onChange={onMessageChange}
                     onKeyUp={(event) => {
                            if (event.key === 'Enter') {
                                handleSendMessage()
                            }
                     }}
                   placeholder={"Type a message..."}/>
            <button onClick={handleSendMessage} className={"ml-2 text-2xl text-slate-900"}>
                <BiSend/>
            </button>
        </div>
    )
}
