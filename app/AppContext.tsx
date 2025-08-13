"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { LuLayoutDashboard, LuWholeWord } from "react-icons/lu";
import { MdHistory, MdSubscriptions, MdDarkMode, MdLogout } from "react-icons/md";
import { TbTemplate } from "react-icons/tb";
import { IoDocumentAttachOutline } from 'react-icons/io5'
import { IoMdTime } from 'react-icons/io'
import { BiChart } from 'react-icons/bi'
import { RiReplay15Line, RiReplay5Line, RiReplay30Line } from "react-icons/ri";
import { CiHeart } from "react-icons/ci";

import {
    AppType, MenuItem, SecondMenuItem, StatsDropDownItem, DaysDropDownItem, SingleFilteringItem, HistoryData, FakeUser
} from "./types/AppTypes";
import { templatesArray } from "./LocalData/templates";
import { SingleTemplateExtended } from "./dashboard/History/AllHistory";
import { resolve } from "path";
import { newHistoryData } from "./LocalData/mainData";
import { templateFilteringItemsArray } from "./LocalData/templateFilteringItems";

// Default fallback
const defaultState: AppType = {
    mainMenuItemsObject: {
        mainMenuItmes: [],
        setMainMenuItems: () => { },
    },
    secondMenuItemsObject: {
        secondMenuItems: [],
        setSecondMenuItems: () => { },
    },
    isDarkModeObject: {
        isDarkMode: false,
        setIsDarkMode: () => { },
    },
    isSideBarHiddenObject: {
        isSideBarHidden: false,
        setIsSideBarHidden: () => { },
    },
    stretchSideBarObject: {
        stretchSideBar: false,
        setStretchSideBar: () => { },
    },
    windowWidthObject: {
        windowWidth: 0,
        setWindowWidth: () => { },
    },
    statsDropDownItemObject: {
        statsData: [],
        setStatsData: () => { },
    },
    daysDropDownObject: {
        daysDropDown: [],
        setDaysDropDown: () => { },
    },
    allTemplatesObject: {
        allTemplates: [],
        setAllTemplates: () => { },
    },
    templatesForDropDownObject: {
        templatesForDropDown: [],
        setTemplatesForDropDown: () => { },
    },
    allHistoryDataObject: {
        allHistoryData: [],
        setAllHistoryData: () => { },
    },
    templateFilteringItemObject: {
        templatesFilteringItems: [],
        setTemplatesFilteringItems: () => { },
    },
    openContentGeneratorFormObject: {
        openContentGeneratorForm: false,
        setOpenContentGeneratorForm: () => { },
    },
    selectedTemplatesObject: {
        selectedTemplate: null,
        setSelectedTemplate: () => { },
    },
    contentGeneratedObject: {
        contentGenerated: "",
        setContentGenerated: () => { },
    },
    openConfirmationWindowObject: {
        openConfirmationWindow: false,
        setOpenConfirmationWindow: () => { },
    },

    selectedHistoryEntryObject: {
        selectedHistoryEntry: null,
        setSelectedHistoryEntry: () => { },
    },
    fakeUserObject: {
        fakeUser: { isPro: false, cumulativeWords: 0 },
        setFakeUser: () => { },
    }
};


// Create context
const AppContext = createContext<AppType>(defaultState);

export default function AppContextProvider({ children }: { children: React.ReactNode }) {
    // Menu states
    const [mainMenuItmes, setMainMenuItems] = useState<MenuItem[]>([
        { icon: LuLayoutDashboard, label: "DashBoard", isSelected: true },
        { icon: MdHistory, label: "History", isSelected: false },
        { icon: MdSubscriptions, label: "Subscription", isSelected: false },
        { icon: TbTemplate, label: "Templates", isSelected: false },
        { icon: CiHeart, label: "Favorite Template", isSelected: false }
    ]);

    const [secondMenuItems, setSecondMenuItems] = useState<SecondMenuItem[]>([
        { icon: MdDarkMode, label: "Dark Mode" },
        { icon: MdLogout, label: "Log Out" },
    ]);

    // UI control states
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isSideBarHidden, setIsSideBarHidden] = useState(false);
    const [stretchSideBar, setStretchSideBar] = useState<boolean>(false);
    const [windowWidth, setWindowWidth] = useState<number>(0);

    const [statsData, setStatsData] = useState<StatsDropDownItem[]>([
        {
            id: 1,
            icon: <LuWholeWord className="text-[18px] text-purple-600" />,
            title: "Total words generated",
            value: "1234",
            isSelected: true,
        },
        {
            id: 2,
            icon: <IoDocumentAttachOutline className="text-[18px] text-purple-600" />,
            title: "Total Doc. generated",
            value: "123",
            isSelected: false,
        },
        {
            id: 3,
            icon: <IoMdTime className="text-[18px] text-purple-600" />,
            title: "Total Time saved",
            value: "500",
            isSelected: false,
        },
        {
            id: 4,
            icon: <BiChart className="text-[18px] text-purple-600" />,
            title: "Average Word per Doc.",
            value: "500",
            isSelected: false,
        },
    ]);

    const [daysDropDown, setDaysDropDown] = useState<DaysDropDownItem[]>([
        {
            id: 1,
            title: "Last 5 Days",
            icon: <RiReplay5Line className="text-[18px] text-purple-600" />,
            isSelected: true,
        },
        {
            id: 2,
            title: "Last 15 Days",
            icon: <RiReplay15Line className="text-[18px] text-purple-600" />,
            isSelected: false,
        },
        {
            id: 3,
            title: "Last 30 Days",
            icon: <RiReplay30Line className="text-[18px] text-purple-600" />,
            isSelected: false,
        },
    ])

    const [allTemplates, setAllTemplates] = useState(templatesArray);

    const [templatesForDropDown, setTemplatesForDropDown] = useState<
        SingleTemplateExtended[]
    >(() => {
        return allTemplates.map((SingleTemplate) => {
            return { ...SingleTemplate, isSelected: false };
        });
    })

    const [allHistoryData, setAllHistoryData] = useState<HistoryData[]>([]);
    const [templatesFilteringItems, setTemplatesFilteringItems] = useState<SingleFilteringItem[]>(templateFilteringItemsArray)
    // console.log(newHistoryData);

    // Handle window resize
    useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth);         // ✅ updated
            setStretchSideBar(false);                  // cancel stretch when resized
        }

        handleResize(); // initial check
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);


    // Restore dark mode & sidebar state
    useEffect(() => {
        const savedSideBarHiddenValue = localStorage.getItem("isSideBarHidden");
        const savedDarkModeValue = localStorage.getItem("isDarkMode");

        if (savedSideBarHiddenValue !== null) {
            setIsSideBarHidden(savedSideBarHiddenValue === "true");
        }

        if (savedDarkModeValue !== null) {
            setIsDarkMode(savedDarkModeValue === "true");
        }
    }, []);

    useEffect(() => {
        async function fetchDataHistory() {
            await new Promise((resolve) => {
                setTimeout(resolve, 1780);
            });

            setAllHistoryData(newHistoryData);
        }

        fetchDataHistory();
    }, [])
    // console.log(allHistoryData);

    const [fakeUser, setFakeUser] = useState<FakeUser>({ isPro: false, cumulativeWords: 0 });

    const [openContentGeneratorForm, setOpenContentGeneratorForm] = useState<boolean>(false);

    const [selectedTemplate, setSelectedTemplate] = useState<SingleTemplateExtended | null>(null);

    const [contentGenerated, setContentGenerated] = useState<string>("");

    const [openConfirmationWindow, setOpenConfirmationWindow] = useState<boolean>(false);
    const [selectedHistoryEntry, setSelectedHistoryEntry] = useState<HistoryData | null>(null);


    return (
        <AppContext.Provider
            value={{
                mainMenuItemsObject: { mainMenuItmes, setMainMenuItems },
                secondMenuItemsObject: { secondMenuItems, setSecondMenuItems },
                isDarkModeObject: { isDarkMode, setIsDarkMode },
                isSideBarHiddenObject: { isSideBarHidden, setIsSideBarHidden },
                stretchSideBarObject: { stretchSideBar, setStretchSideBar },
                windowWidthObject: { windowWidth, setWindowWidth },
                statsDropDownItemObject: { statsData, setStatsData },
                daysDropDownObject: { daysDropDown, setDaysDropDown },
                allTemplatesObject: { allTemplates, setAllTemplates },
                templatesForDropDownObject: { templatesForDropDown, setTemplatesForDropDown },
                allHistoryDataObject: { allHistoryData, setAllHistoryData },
                templateFilteringItemObject: { templatesFilteringItems, setTemplatesFilteringItems },
                openContentGeneratorFormObject: { openContentGeneratorForm, setOpenContentGeneratorForm },
                selectedTemplatesObject: { selectedTemplate, setSelectedTemplate },
                contentGeneratedObject: { contentGenerated, setContentGenerated },
                openConfirmationWindowObject: { openConfirmationWindow, setOpenConfirmationWindow },
                selectedHistoryEntryObject: { selectedHistoryEntry, setSelectedHistoryEntry },
                fakeUserObject: { fakeUser, setFakeUser },
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

// Hook
export function useAppContext() {
    return useContext(AppContext);
}
