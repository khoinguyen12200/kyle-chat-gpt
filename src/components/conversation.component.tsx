import React, {useEffect, useMemo, useState} from "react";
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
        <div
            className="Conversation flex flex-col-reverse w-full h-full max-h-full flex-1 rounded-3xl py-3 gap-2 overflow-y-scroll">
            {
                isClient && conversations.map((conversation, index) => {
                    const sameUserAfter = index < conversations.length - 1 && conversations[index + 1].isUser === conversation.isUser;
                    const sameUserBefore = index > 0 && conversations[index - 1].isUser === conversation.isUser;
                    return (
                        <div key={index}
                             className={`flex ${conversation.isUser ? 'flex-row-reverse' : 'flex-row'} ${sameUserAfter ? 'mt-0' : 'mt-3'} items-end justify-start px-5 gap-3`}>
                            <span
                                className={`${conversation.isUser ? 'text-right text-slate-700' : 'text-slate-800'} text-3xl mb-1`}>
                                {
                                    !sameUserBefore ? (
                                        conversation.isUser ? <BiSolidUser/> : <PiRobotFill/>
                                    ) : <span className={"opacity-0"}><BiSolidUser/></span>
                                }

                            </span>
                            <span
                                className={`rounded-2xl max-w-[60%] text-slate-100 p-3 ${conversation.isUser ? 'text-right bg-slate-700' : 'bg-slate-800'}`}>
                                {conversation.message}
                            </span>
                        </div>
                    )
                })
            }
        </div>
    )
}
