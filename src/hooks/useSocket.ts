import {useCallback, useState, useEffect, useMemo} from "react";
import {io} from "socket.io-client";
import {read} from "fs";
import {Socket} from "socket.io";


const URL = 'http://localhost:3000';

class SocketService {
    private static instance: SocketService;
    private socket: any;

    private constructor() {
        this.socket = io(URL);
    }

    public static getInstance(): SocketService {
        if (!SocketService.instance) {
            SocketService.instance = new SocketService();
        }

        return SocketService.instance;
    }

    public static getSocket() {
        return SocketService.getInstance().socket;
    }
}

export default function useSocket(eventName: string, onMessage: (message: any) => void) {
    const [readyState, setReadyState] = useState(false);


    function emit(message: string) {
        SocketService.getSocket().emit(eventName, message);
    }

    useEffect(() => {
        setTimeout(() => {
            reConnect();
        }, 5000);
    }, [readyState]);

    const reConnect = useMemo(() => {
        return () => {
            if(!readyState) {
                SocketService.getSocket().connect();
            }
        }
    }, [readyState]);


    useEffect(() => {
        SocketService.getSocket().on('connect', () => {
            setReadyState(true);
        });

        SocketService.getSocket().on('disconnect', () => {
            setReadyState(false);
        });

        SocketService.getSocket().on(eventName, onMessage);

        return () => {
            SocketService.getSocket().off(eventName, onMessage);
        }
    }, [eventName, onMessage]);

    return {emit, isReady:readyState};
}
