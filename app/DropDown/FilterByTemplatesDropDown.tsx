"use client";
import { ReactNode, SetStateAction, useEffect, useRef, useState } from 'react'
import { BiSearch } from 'react-icons/bi';
import { Checkbox } from '@mui/material';
import { purple } from '@mui/material/colors';
import { useAppContext } from '../AppContext';
import { SingleTemplate } from '../types/AppTypes';
import useClickOutside from '../Hooks/useClickOutside';
import { SingleTemplateExtended, useAllHistoryContext } from '../dashboard/History/AllHistory';

type StatsDropDownItem = {
    id: number,
    title: string,
    icon: ReactNode,
    isSelected: boolean;
};

function FilterByTemplates({
    openDropDown,
    setOpenDropDown,
}: {
    openDropDown: boolean;
    setOpenDropDown: React.Dispatch<SetStateAction<boolean>>;
}) {
    const {
        templatesForDropDownObject: { templatesForDropDown },
        isDarkModeObject: { isDarkMode },
    } = useAppContext();

    const dropDownRef = useRef<HTMLDivElement>(null);

    const containerClassName = `${isDarkMode ? "bg-slate-800" : "bg-white border border-slate-50"
        } absolute p-3 top-10 right-0 z-[90] w-[290px] select-none shadow-md rounded-lg flex flex-col gap-2`;

    const inputClassName = `font-light text-shadow-slate-400 
        placeholder:text-slate-400 focus:outline-none px-1 text-[12px]
        w-full ${isDarkMode ? "bg-slate-600" : "bg-slate-50"}`;

    useClickOutside(dropDownRef, () => setOpenDropDown(false), openDropDown);

    return (
        <div ref={dropDownRef} className={containerClassName} >
            {/* Seaarch Bar */}
            <div
                className={`flex flex-row items-center gap-x-2 rounded-md px-3 py-[9px] w-full ${isDarkMode ? "bg-slate-600" : "bg-slate-50"
                    }`}
            >
                {/* Icon */}
                <BiSearch className='text-slate-400 text-[18px]' />
                <input
                    type="text"
                    placeholder='Search here...'
                    className={inputClassName}
                />
            </div>
            <div className='flex flex-col gap-1 mt-3 h-[300px] pr-2 overflow-y-auto'>
                {templatesForDropDown.map((item, index) => (
                    <SingleItem
                        key={index}
                        dropDownItem={item}
                    />
                ))}
            </div>
        </div>
    )
}

export default FilterByTemplates;

function SingleItem({
    dropDownItem,
}: {
    dropDownItem: SingleTemplateExtended;
}) {
    const {
        templatesForDropDownObject: {
            templatesForDropDown,
            setTemplatesForDropDown
        },
    } = useAppContext();

    const {
        selectedItemsObject: { setSelectedItems },
    } = useAllHistoryContext();

    function updateTheCopyAllTemplatesArray() {
        const updateTemplatesArray = templatesForDropDown.map((singleTemplate) => {
            if (singleTemplate.id === dropDownItem.id) {
                return { ...singleTemplate, isSelected: !singleTemplate.isSelected };
            }

            return { ...singleTemplate };
        });

        setTemplatesForDropDown(updateTemplatesArray);
    }

    useEffect(() => {
        const filterTheSelectedItems = templatesForDropDown.filter(
            (SingleItem) => SingleItem.isSelected
        );
        setSelectedItems(filterTheSelectedItems);
    }, [templatesForDropDown])

    return (
        <div
            className={`flex items-center justify-between gap-7 p-[6px] px-2 rounded-lg text-slate-600 cursor-pointer`}
        >
            <div className={`flex gap-1 items-center `}>
                {/* Icon */}
                <Checkbox
                    size='small'
                    checked={dropDownItem.isSelected}
                    onClick={updateTheCopyAllTemplatesArray}
                    sx={{
                        color: purple[800],
                        "&.Mui-Checked": {
                            color: purple[600],
                        },
                    }}
                />

                <div className={`bg-purple-100 p-[6px] rounded-md`}>
                    {dropDownItem.icon}
                </div>
                <span className='text-[12px] text-slate-500 mt-1 hover:text-purple-600 cursor-pointer'>
                    {dropDownItem.title}
                </span>
            </div>

        </div>
    )
}