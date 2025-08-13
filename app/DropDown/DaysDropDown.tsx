"use client";

import React, { ReactNode, useEffect, useRef } from "react";
import { useAppContext } from "@/app/AppContext";
import { DaysDropDownItem } from "../types/AppTypes";
import useClickOutside from "../Hooks/useClickOutside";

type StatsDropDownItem = {
    id: number;
    title: string;
    icon: ReactNode;
    isSelected: boolean;
};

function DaysDropDown({
    openDaysDropDown,
    setOpenDaysDropDown,
}: {
    openDaysDropDown: boolean;
    setOpenDaysDropDown: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const {
        daysDropDownObject: { daysDropDown, setDaysDropDown },
        isDarkModeObject: { isDarkMode },
    } = useAppContext();

    const dropDownRef = useRef<HTMLDivElement>(null);

    // Handle item selection
    function handleClickedItem(itemClicked: DaysDropDownItem) {
        const updatedDaysDropDown = daysDropDown.map((singleItem) => ({
            ...singleItem,
            isSelected: itemClicked.id === singleItem.id ? true : false,
        }));

        setDaysDropDown(updatedDaysDropDown);
    }

    // Close on outside click or scroll
    useClickOutside(dropDownRef , () => setOpenDaysDropDown(false), openDaysDropDown)

    return (
        <div
            ref={dropDownRef}
            className={`${isDarkMode ? "bg-slate-700" : "bg-white border border-slate-50"
                } absolute p-3 top-7 right-1 z-[90] w-[180px] select-none shadow-md rounded-lg flex flex-col gap-2`}
        >
            {daysDropDown.map((item, index) => (
                <SingleItem
                    key={index}
                    dropDownItem={item}
                    onItemClick={handleClickedItem}
                />
            ))}
        </div>
    );
}


export default DaysDropDown;

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


    return (
        <div
            onClick={() => onItemClick(dropDownItem)}
            className={`
                flex items-center justify-between gap-7 p-[4px] rounded-lg text-slate-600 cursor-pointer
                ${dropDownItem.isSelected
                    ? "bg-purple-100 border border-purple-600"
                    : isDarkMode
                        ? "hover:bg-slate-600"
                        : "hover:bg-slate-100"
                }
            `}
        >
            <div className="flex gap-2 items-center">
                <div
                    className={`
                    text-[18px] p-2 rounded-md 
                    ${dropDownItem.isSelected ? "bg-purple-200" : "bg-purple-100"}
                `}
                >
                    {dropDownItem.icon}
                </div>
                <span
                    className={`
                    text-sm font-medium 
                    ${dropDownItem.isSelected ? "text-purple-700" : isDarkMode ? "text-white" : "text-slate-700"}
                `}
                >
                    {dropDownItem.title}
                </span>
            </div>
        </div>
    );
}
