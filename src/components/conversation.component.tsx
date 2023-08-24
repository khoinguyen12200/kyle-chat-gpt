import React, {useEffect, useState} from "react";
import useSocket from "@/hooks/useSocket";
import {useAppSelector} from "@/redux/store";
import {BsRobot} from "react-icons/bs";
import {BiSolidUser} from "react-icons/bi";
import {PiRobotFill} from "react-icons/pi";
import useIsClient from "@/hooks/useIsClient";

export default function Conversation() {
    const conversations = useAppSelector(state => state.conversation.conversation);
    const isClient = useIsClient();

    return (
        <div className="Conversation flex flex-col-reverse w-full h-full max-h-full flex-1 rounded-3xl py-3 gap-3 overflow-y-scroll">
            {
                isClient  && conversations.map((conversation, index) => {
                    return (
                        <div key={index} className={`flex ${conversation.isUser ? 'flex-row-reverse': 'flex-row'} items-end justify-start px-5 gap-3 mt-3`}>
                            <span className="text-slate-900 text-3xl mb-1">
                                {conversation.isUser ? <BiSolidUser/> : <PiRobotFill/>}
                            </span>
                            <span className={`rounded-2xl min-w-[7%] max-w-[60%] bg-slate-800 text-slate-100 p-3 ${conversation.isUser && 'text-right'}`}>
                                {conversation.message}
                            </span>
                        </div>
                    )
                })
            }
        </div>
    )
}
