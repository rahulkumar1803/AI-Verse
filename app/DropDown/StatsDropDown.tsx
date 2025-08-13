"use client";

import React, { useRef, useEffect } from "react";
import { StatsDropDownItem } from "../types/AppTypes";
import { useAppContext } from "../AppContext";
import useClickOutside from "../Hooks/useClickOutside";

function StatsDropDown({
    statsData,
    setStatsData,
    openDropDown,
    setOpenDropDown,
}: {
    statsData: StatsDropDownItem[];
    setStatsData: React.Dispatch<React.SetStateAction<StatsDropDownItem[]>>;
    openDropDown: boolean;
    setOpenDropDown: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const dropDownRef = useRef<HTMLDivElement>(null);
    const {
        isDarkModeObject: { isDarkMode },
    } = useAppContext();

    function handleItemClicked(dropDownItemClicked: StatsDropDownItem) {
        const updatedStatsDropDown = statsData.map((singleDropDown) => ({
            ...singleDropDown,
            isSelected: singleDropDown.id === dropDownItemClicked.id ? true : false,
        }));
        setStatsData(updatedStatsDropDown);
        setOpenDropDown(false);
    }

    // Close dropdown on outside click
    useClickOutside(dropDownRef , () => setOpenDropDown(false) , openDropDown);

    return (
        <div
            ref={dropDownRef}
            className={`${isDarkMode ? "bg-slate-700 text-white" : "bg-white text-black"
                } absolute p-2 top-6 z-[90] w-[260px] select-none shadow-lg rounded-xl flex flex-col gap-1`}
        >
            {statsData.map((item, index) => (
                <SingleItem
                    key={index}
                    dropDownItem={item}
                    onItemClick={handleItemClicked}
                />
            ))}
        </div>
    );
}

export default StatsDropDown;

function SingleItem({
    dropDownItem,
    onItemClick,
}: {
    dropDownItem: StatsDropDownItem;
    onItemClick: (dropDownItemClicked: StatsDropDownItem) => void;
}) {
    function handleClickedItem(dropDownItemClicked: StatsDropDownItem) {
        onItemClick(dropDownItemClicked);
    }

    const {
        isDarkModeObject: { isDarkMode },
    } = useAppContext();

    const isSelected = dropDownItem.isSelected;

    return (
        <div
            onClick={() => handleClickedItem(dropDownItem)}
            className={`
                flex items-center gap-4 px-3 py-2 rounded-lg cursor-pointer transition
                ${isSelected
                    ? "bg-purple-100 border border-purple-600"
                    : isDarkMode
                    ? "hover:bg-slate-600"
                    : "hover:bg-slate-100"
                }
            `}
        >
            <div
                className={`
                    text-[18px] p-2 rounded-md 
                    ${isSelected ? "bg-purple-200" : "bg-purple-100"}
                `}
            >
                {dropDownItem.icon}
            </div>
            <span
                className={`
                    text-sm font-medium 
                    ${isSelected ? "text-purple-700" : isDarkMode ? "text-white" : "text-slate-700"}
                `}
            >
                {dropDownItem.title}
            </span>
        </div>
    );
}


