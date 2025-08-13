"use client";
// Import Icons

import { AiFillRobot } from "react-icons/ai";
import { FiSidebar } from "react-icons/fi";
import { useAppContext } from "@/app/AppContext";


function Logo() {
    const {
        isSideBarHiddenObject: { isSideBarHidden, setIsSideBarHidden },
    } = useAppContext();

    function updateTheState(){
        setIsSideBarHidden(!isSideBarHidden);

        localStorage.setItem("isSideBarHidden", JSON.stringify(!isSideBarHidden));
    }
    return (
        //Main Container with flex
        <div className="flex items-center justify-between space-x-2 mt-1 mb-16">
            {/* Container of logo and title */}
            <div className="flex gap-2 items-center">
                {/* robort icon  */}
                <div className="w-9 h-9 bg-purple-600 rounded-md flex items-center justify-center">
                    <AiFillRobot className="text-white text-[19px]" />
                </div>
                {/* Title */}
                <h1
                    className={`text-[20px] flex gap-1 ${isSideBarHidden ? "hidden" : "block"
                        }`}
                >
                    <span className="font-bold text-purple-600">AI</span>
                    <span className="font-light text-slate-400">Verse</span>
                </h1>
            </div>

            {/* SideBAr Icon */}
            <FiSidebar
                onClick={updateTheState}
                className="text-slate-500 text-sm cursor-pointer"
            />
        </div>
    );
}

export default Logo;