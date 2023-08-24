import {useCallback, useState, useEffect, useMemo} from "react";
import {io} from "socket.io-client";
import {read} from "fs";


const URL = 'http://localhost:3000';

export default function useSocket(eventName: string, onMessage: (message: any) => void) {
    const [socket] = useState(() => io(URL));
    const [readyState, setReadyState] = useState(false);


    function emit(message: string) {
        socket.emit(eventName, message);
    }

    useEffect(() => {
        setTimeout(() => {
            reConnect();
        }, 5000);
    }, [readyState]);

    const reConnect = useMemo(() => {
        return () => {
            if(!readyState) {
                socket.connect();
            }
        }
    }, [readyState]);


    useEffect(() => {
        socket.on('connect', () => {
            setReadyState(true);
        });

        socket.on('disconnect', () => {
            setReadyState(false);
        });

        socket.on(eventName, onMessage);

        return () => {
            socket.off(eventName, onMessage);
        }
    }, [eventName, onMessage]);

    return {emit, isReady:readyState};
}
