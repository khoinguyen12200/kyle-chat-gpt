'use client'
import React from 'react';
import Lottie from "lottie-react";
import animationData from '@/assets/chatbot.json';
import './test.scss';

export default function Test() {

    return (
        <div className={"welcomeScreen"}>
            <div className={"chatbot"}>
                <Lottie animationData={animationData} loop={true} />
            </div>
        </div>
    );
}