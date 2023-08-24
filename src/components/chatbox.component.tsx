'use client'
import React from 'react';
import {BsRocketTakeoff} from "react-icons/bs";
import ChatInput from "@/components/chatinput.component";
import useSocket from "@/hooks/useSocket";
import Conversation from "@/components/conversation.component";

export default function ChatBox() {

    return (
        <div className={"h-screen w-screen p-5"}>
            <div className="ChatBox flex flex-col w-full h-full rounded-3xl py-3 gap-3">
                <div className="flex flex-row items-center justify-start px-5">
                    <BsRocketTakeoff/>
                    <span className="ml-2">
                    KyleChatGPT
                </span>
                </div>
                <div className="flex-1 ChatSpace rounded-3xl overflow-hidden d-flex flex-row">
                    <Conversation />
                </div>
                <div>
                    <ChatInput />
                </div>
            </div>
        </div>
    )
}
