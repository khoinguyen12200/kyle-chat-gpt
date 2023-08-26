import React, {useEffect, useMemo, useState} from "react";
import useSocket from "@/hooks/useSocket";
import {useAppDispatch, useAppSelector} from "@/redux/store";
import {BsRobot} from "react-icons/bs";
import {BiSolidUser} from "react-icons/bi";
import {PiRobotFill} from "react-icons/pi";
import useIsClient from "@/hooks/useIsClient";
import {setIsLoading} from "@/redux/conversationSlice";
import {motion} from "framer-motion";

export default function Conversation() {
    const conversations = useAppSelector(state => state.conversation.conversation);
    const isClient = useIsClient();
    const dispatch = useAppDispatch();
    useSocket('loading', (message) => {
        if (message === 'loading') {
            dispatch(setIsLoading(true))
        } else {
            dispatch(setIsLoading(false))
        }
    })

    const isLoading = useAppSelector(state => state.conversation.isLoading);

    return (
        <div
            className="Conversation flex flex-col-reverse w-full h-full max-h-full flex-1 rounded-3xl py-3 gap-2 overflow-y-scroll">
            <motion.div
                initial={{opacity: 0, y: 20, height: 0}}
                animate={
                isLoading
                    ? {opacity: 1, y: 0, height: 'auto'}
                    : {opacity: 0, y: 20, height: 0}
            }
                className={`userAndMessage flex flex-row mt-3 items-end justify-start px-5 gap-3`}>
                            <span
                                className={`text-slate-800 text-3xl mb-1`}>
                                <PiRobotFill/>
                            </span>
                <div className={`rounded-2xl max-w-[60%] text-slate-100 p-3 bg-slate-800 dotsReplying`}>
                    <div className={"dot"}/>
                    <div className={"dot"}/>
                    <div className={"dot"}/>
                </div>
            </motion.div>

            {
                isClient && conversations.map((conversation, index) => {
                    const sameUserAfter = index < conversations.length - 1 && conversations[index + 1].isUser === conversation.isUser;
                    const sameUserBefore = index > 0 && conversations[index - 1].isUser === conversation.isUser;
                    return (
                        <motion.div
                            initial={{opacity: 0, y: 20, height: 0}}
                            animate={{opacity: 1, y: 0, height: 'auto'}}
                            key={conversation.id}
                            className={`userAndMessage flex ${conversation.isUser ? 'flex-row-reverse' : 'flex-row'} ${sameUserAfter ? 'mt-0' : 'mt-3'} items-end justify-start px-5 gap-3`}>
                            <motion.span
                                initial={{scale:0}}
                                animate={{scale:1}}
                                className={`${conversation.isUser ? 'text-right text-slate-700' : 'text-slate-800'} text-3xl`}>
                                {
                                    !sameUserBefore ? (
                                        conversation.isUser ? <BiSolidUser/> : <PiRobotFill/>
                                    ) : <span className={"opacity-0"}><BiSolidUser/></span>
                                }

                            </motion.span>
                            <motion.span
                                initial={
                                    conversation.isUser
                                        ? {rotate: -20, transformOrigin: 'bottom right', scale: 0.6}
                                        : {rotate: 20, transformOrigin: 'bottom left', scale: 0.6}
                                }
                                animate={{rotate: 0, scale: 1}}
                                transition={{type: 'spring', stiffness: 260, damping: 20}}
                                className={`messageBox rounded-2xl max-w-[60%] text-slate-100 p-3 ${conversation.isUser ? 'text-right bg-slate-700 rounded-br-none userBox' : 'bg-slate-800 rounded-bl-none'}`}>
                                {conversation.message}
                            </motion.span>
                        </motion.div>
                    )
                })
            }
        </div>
    )
}
