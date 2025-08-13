"use client";
import SideBar from "./SideBar/SideBar";
import MainArea from "./MainArea/page";
import AllHistory from "./History/AllHistory";
import AllTemplates from "./Templates/AllTemplatesPage.tsx";
import Subscription from "./Subscription/SubscriptionPage";
import { useAppContext } from "../AppContext";
import React from "react";
import ContentGeneratorForm from "./ContentGenerator/ContentGenerator";
import { Toaster } from "react-hot-toast";
import ConfirmationWindow from '@/app/Windows/DeleteConfirmationWindow';
import FavoriteTemplate from "./FavoriteTemplate/FavoriteTemplate";

export default function Page() {
    const {
        isDarkModeObject: { isDarkMode },
        mainMenuItemsObject: { mainMenuItmes },
    } = useAppContext();

    const componentMap: Record<number, React.ReactNode> = {
        0: <MainArea />,
        1: <AllHistory />,
        2: <Subscription />,
        3: <AllTemplates />,
        4: <FavoriteTemplate />
    }

    const findComponentKey = mainMenuItmes.findIndex(
        (menuItem) => menuItem.isSelected
    );

    const selectedComponent = componentMap[findComponentKey];

    return (
        <div className={`poppins flex flex-row h-screen ${!isDarkMode ? "bg-slate-100" : "bg-slate-700"}`}>
            {/* ✅ Always render SideBar */}
            <ConfirmationWindow />
            <SoftLayer />
            <SideBar />
            {/* ✅ Main Content */}
            <div className="flex-1 overflow-auto">
                <ContentGeneratorForm />
                {selectedComponent}
            </div>
            <Toaster />
        </div>
    );
}

function SoftLayer() {
    const {
        openConfirmationWindowObject: { openConfirmationWindow },
    } = useAppContext();
    return (
        openConfirmationWindow && (
            <div className="w-full fixed h-full z-50 bg-black opacity-60"></div>
        )
    )
}