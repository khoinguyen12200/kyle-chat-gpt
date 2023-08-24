'use client'
import ChatBox from "@/components/chatbox.component";
import './home.scss'
import {Provider} from "react-redux";
import store from "../redux/store";

export default function Home() {
    return (
        <Provider store={store}>
            <main className="Home min-h-screen text-slate-100">
                <div className={"background"}>
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 700 700" width="700" height="700"
                         opacity="1">
                        <defs>
                            <radialGradient id="ffflux-gradient">
                                <stop offset="0%" stopColor="hsl(259, 87%, 7%)"></stop>
                                <stop offset="100%" stopColor="hsl(261, 71%, 26%)"></stop>
                            </radialGradient>
                            <filter id="ffflux-filter" x="-20%" y="-20%" width="140%" height="140%"
                                    filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse"
                                    colorInterpolationFilters="sRGB">
                                <feTurbulence type="fractalNoise" baseFrequency="0.003 0.003" numOctaves="1" seed="227"
                                              stitchTiles="stitch" x="0%" y="0%" width="100%" height="100%"
                                              result="turbulence"></feTurbulence>
                                <feGaussianBlur stdDeviation="20 27" x="0%" y="0%" width="100%" height="100%"
                                                in="turbulence" edgeMode="duplicate" result="blur"></feGaussianBlur>
                                <feBlend mode="color-dodge" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic"
                                         in2="blur" result="blend"></feBlend>

                            </filter>
                        </defs>
                        <rect width="700" height="700" fill="url(#ffflux-gradient)" filter="url(#ffflux-filter)"></rect>
                    </svg>
                </div>
                <ChatBox/>
            </main>
        </Provider>
    )
}
