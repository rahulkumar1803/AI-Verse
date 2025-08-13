"use client";

import React, { useRef, useEffect, useState } from "react";
import Logo from "./Components/Logo";
import MainSection from "./Components/MainSection";
import OthersSection from "./Components/OthersSection";
import RemainingWords from "./Components/RemainingWords";
import { useAppContext } from "@/app/AppContext";

function SideBar() {
    const {
        isDarkModeObject: { isDarkMode },
        isSideBarHiddenObject: { isSideBarHidden, setIsSideBarHidden },
        windowWidthObject: { windowWidth },
        stretchSideBarObject: { stretchSideBar, setStretchSideBar },
    } = useAppContext();

    const menuRef = useRef<HTMLDivElement>(null);
    const [hideSideBarClass, setHideSideBarClass] = useState("");

    // ✅ Reactively control sidebar visibility
    useEffect(() => {
        if (windowWidth <= 995) {
            if (stretchSideBar) {
                setHideSideBarClass("block fixed z-[90] shadow-md");
                setIsSideBarHidden(false); // Unhide sidebar
            } else {
                setHideSideBarClass("hidden");
            }
        } else {
            setHideSideBarClass(""); // Always visible on desktop
            const getIsSideBarHidden = localStorage.getItem("isSideBarHidden");
            if (getIsSideBarHidden !== null) {
                setIsSideBarHidden(JSON.parse(getIsSideBarHidden));
            }
        }
    }, [windowWidth, stretchSideBar]);

    // ✅ Hide sidebar on outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setStretchSideBar(false);
            }
        }

        if (stretchSideBar) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [stretchSideBar]);

    return (
        <div>
            <div
                ref={menuRef}
                className={`
                    ${isSideBarHidden ? "w-[120px]" : "w-[274px]"}
                    ${isDarkMode ? "bg-slate-800" : "bg-white"}
                    ${hideSideBarClass}
                    h-screen px-5 py-7 border-slate-200 transition-all
                `}
            >
                <Logo />
                <MainSection />
                <OthersSection />
                {!isSideBarHidden && <RemainingWords />}
            </div>
        </div>
    );
}

export default SideBar;
