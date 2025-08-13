"use client";
import React from 'react'
import { useState } from 'react';
import { LuHistory } from 'react-icons/lu';
import { MdDelete } from 'react-icons/md';
import { FaCopy, FaRegCopy } from 'react-icons/fa';
import { useAppContext } from '@/app/AppContext';
import { templatesArray } from '@/app/LocalData/templates';
import toast from 'react-hot-toast';

const AllHistoryList = () => {
    const {
        isDarkModeObject: { isDarkMode },
        windowWidthObject: { windowWidth },
        mainMenuItemsObject: { mainMenuItmes, setMainMenuItems },
    } = useAppContext();

    const listHeaderItems = [
        {
            title: "Template",
            className: "text-[13px] text-slate-500 font-semibold",
        },
        {
            title: "Title",
            className: "text-[13px] text-slate-500 font-semibold",
        },
        {
            title: "Created At",
            className: "text-[13px] text-slate-500 font-semibold",
        },
        {
            title: "Total Words",
            className: "text-[13px] text-slate-500 font-semibold",
        },
        {
            title: "Actions",
            className: "text-[13px] text-slate-500 font-semibold text-center",
        },
    ];

    let updateListHeaderItems = [...listHeaderItems];

    if (windowWidth <= 634) {
        updateListHeaderItems = updateListHeaderItems.filter(
            (header) =>
                header.title !== "Total Words" && header.title !== "Created At"
        );
    } else if (windowWidth <= 1215) {
        updateListHeaderItems = updateListHeaderItems.filter(
            (header) => header.title !== "Created At"
        );
    }
    return (
        <div
            className={`p-6 flex gap-3 flex-col rounded-md ${isDarkMode
                ? "bg-slate-800 text-white"
                : "bg-white border border-slate-50"
                } mx-4 mt-6`}
        >
            {/* History Header */}
            <div className='flex gap-2 justify-between items-center'>
                <h1 className='font-bold text-[17px] text-slate-600'>Recent History</h1>
                <a
                    onClick={() => {
                        setMainMenuItems((prevItems) =>
                            prevItems.map((item) =>
                                item.label === "History"
                                    ? { ...item, isSelected: true }
                                    : { ...item, isSelected: false }
                            )
                        );
                    }}
                    className='text-[13px] text-purple-600 cursor-pointer hover:text-purple-800 items-center'>
                    View All
                </a>
            </div>
            {/* List Header */}
            <div
                className={`w-full mt-3 py-[6px] px-4 grid grid-cols-5 ${windowWidth < 1215 && "grid-cols-4"
                    } ${windowWidth < 634 && "grid-cols-3 gap-25"}`}
            >
                {updateListHeaderItems.map((item, index) => (
                    <span key={index} className={item.className}>
                        {item.title}
                    </span>
                ))}
            </div>

            <div className='flex gap-4 px-4 flex-col'>
                <SingleItem />
            </div>
        </div>
    );
}

export default AllHistoryList;

function SingleItem() {
    const {
        allHistoryDataObject: { allHistoryData },
        windowWidthObject: { windowWidth },
        openConfirmationWindowObject: { setOpenConfirmationWindow },
        selectedHistoryEntryObject: { setSelectedHistoryEntry },
    } = useAppContext();
    const [copyitem, setcopyitem] = useState(false);

    const recentFive = [...allHistoryData].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);

    return (
        <>
            {recentFive.map((item) => {
                const matchedTemplate = templatesArray.find(
                    (template) => template.title === item.template
                );

                return (
                    <div key={item.id}>
                        <div
                            className={`w-full grid grid-cols-5 ${windowWidth <= 1215 ? 'grid-cols-4' : ''
                                } ${windowWidth <= 634 ? 'grid-cols-3 gap-25' : ''}`}
                        >
                            {/* Template */}
                            <div className='flex gap-2 items-center'>
                                {windowWidth >= 634 && (
                                    <div className='bg-purple-200 rounded-md p-[5px] flex items-center justify-center'>
                                        {matchedTemplate ? (
                                            matchedTemplate.icon
                                        ) : (
                                            <LuHistory className='text-[14px] text-purple-600' />
                                        )}
                                    </div>
                                )}

                                <div className='flex flex-col'>
                                    <span className='text-[12px] cursor-pointer max-sm:text-sm'>
                                        {item.template}
                                    </span>
                                </div>
                            </div>

                            {/* Title */}
                            <div className='flex flex-col'>
                                <span className='text-[12px] max-sm:text-sm'>{item.title}</span>
                            </div>

                            {windowWidth >= 1215 && (
                                <div>
                                    <span className='text-[13px]'>
                                        {new Date(item?.createdAt).toLocaleDateString('en-IN', {
                                            day: '2-digit',
                                            month: 'long',
                                            year: 'numeric'
                                        })}
                                    </span>
                                </div>
                            )}

                            {/* Total Words */}
                            {windowWidth >= 634 && (
                                <div>
                                    <span className='text-[12px]'>{item.totalWords}</span>
                                </div>
                            )}

                            {/* Actions */}
                            <div className='flex gap-14 font-bold justify-center'>
                                <div className='flex gap-2 items-center'>
                                    {/* View Button */}
                                    <div
                                        onClick={() => {
                                            navigator.clipboard.writeText(item.content).then(() => {
                                                toast.success("Content copied successfully");
                                                setcopyitem(true);
                                                setTimeout(() => setcopyitem(false), 2000);
                                            }).catch(() => {
                                                toast.error("Faild to copy this history content");
                                            });
                                        }}
                                        className='rounded-[4px] p-1 flex items-center justify-center cursor-pointer bg-purple-200 hover:bg-purple-300 transition-all'>
                                        <FaRegCopy className='text-purple-600 text-[15px]' />
                                    </div>

                                    {/* Delete Button */}
                                    <div
                                        onClick={() => {
                                            setOpenConfirmationWindow(true);
                                            setSelectedHistoryEntry(item)
                                        }}
                                        className='rounded-[4px] p-1 flex items-center justify-center cursor-pointer bg-purple-200 hover:bg-purple-300 transition-all'>
                                        <MdDelete className='text-purple-600 text-[15px]' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
}
