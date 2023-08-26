'use client'
import React from 'react';
import {BsRocketTakeoff} from "react-icons/bs";
import ChatInput from "@/components/chatinput.component";
import useSocket from "@/hooks/useSocket";
import Conversation from "@/components/conversation.component";
import {Button, Modal} from "flowbite-react";
import {FiMoreHorizontal} from "react-icons/fi";
import {useAppDispatch} from "@/redux/store";
import {clearConversation} from "@/redux/conversationSlice";

export default function ChatBox() {

    const dispatch = useAppDispatch();
    const [showModal, setShowModal] = React.useState(false);

    function toggleModal() {
        setShowModal(!showModal);
    }

    function clearTheConversation() {
        if(confirm("Are you sure you want to clear the conversation?")) {
            dispatch(clearConversation());
            setShowModal(false);
        }
    }

    return (
        <div className={"h-screen w-screen p-10"}>
            <div className="ChatBox flex flex-col w-full h-full rounded-3xl py-3 gap-3">
                <div className="flex flex-row items-center justify-between px-5">
                    <span className="flex flex-row items-center">
                        <BsRocketTakeoff/>
                        <span className="ml-2">
                            KyleChatGPT
                        </span>
                    </span>
                    <span className="text-2xl" onClick={toggleModal}>
                        <FiMoreHorizontal/>
                    </span>
                    <Modal show={showModal} onClose={toggleModal}>
                        <Modal.Header>
                            Setting
                        </Modal.Header>
                        <Modal.Body>
                            <Button className={"w-full"} color={"failure"} onClick={clearTheConversation}>
                                Clear conversation
                            </Button>
                        </Modal.Body>
                    </Modal>
                </div>
                <div className="flex-1 ChatSpace rounded-3xl overflow-hidden d-flex flex-row">
                    <Conversation/>
                </div>
                <div>
                    <ChatInput/>
                </div>
            </div>
        </div>
    )
}
