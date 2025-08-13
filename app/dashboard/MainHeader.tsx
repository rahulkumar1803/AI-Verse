"use client";
import React, { useState , useEffect } from 'react'
import { BiSearch } from 'react-icons/bi';
import { FiMenu } from 'react-icons/fi';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { RiStickyNoteAddLine } from 'react-icons/ri';
import { useAppContext } from '../AppContext';

const MainHeader = () => {
    const {
        isDarkModeObject: { isDarkMode },
        windowWidthObject: { windowWidth },
        stretchSideBarObject: { stretchSideBar, setStretchSideBar },
        mainMenuItemsObject: { mainMenuItmes },
        openContentGeneratorFormObject: { openContentGeneratorForm, setOpenContentGeneratorForm },
        fakeUserObject: { fakeUser },
    } = useAppContext();

    const findSelectedMenuItems = mainMenuItmes.find((item) => item.isSelected);

    function RenderMenuItemIcon() {
        if (findSelectedMenuItems !== undefined) {
            return (
                <>
                    {React.createElement(findSelectedMenuItems?.icon, {
                        className: `text-[20px] text-purple-700`,
                    })}
                </>
            );
        }
    }

    const [disabledGenerateBtn , setDisabledGenerateBtn] = useState(false);

    useEffect(() => {
      if(!fakeUser.isPro){
        if(fakeUser.cumulativeWords >= 1000){
            setDisabledGenerateBtn(true);
        }
      } else{
        setDisabledGenerateBtn(false);
      }
    }, [fakeUser.cumulativeWords , fakeUser.isPro]);
    
    return (
        <div
            className={`flex justify-between rounded-md items-center p-3 m-4 ${isDarkMode ? "bg-slate-800 text-white" : "bg-white"
                } border-slate-200 transition-all`}
        >
            {/* The Name of Page */}
            <div className='flex gap-2 items-center'>
                <RenderMenuItemIcon />
                {windowWidth >= 732 && (
                    <h1 className='text-[17px] font-semibold'>
                        {findSelectedMenuItems?.label}
                    </h1>
                )}
            </div>

            {/* Search Bar */}
            <div
                className={`flex items-center ${isDarkMode ? "bg-slate-600" : "bg-slate-50"
                    } rounded-md px-3 py-[9px] w-1/3`}
            >
                {/* Icon */}
                <BiSearch className='text-slate-400 text-[18px]' />
                <input
                    type="text"
                    placeholder='Search here...'
                    className={`${isDarkMode ? "bg-slate-600" : "bg-slate-50"
                        } font-light text-slate-400 placeholder:text-slate-400 focus:outline-none px-1 text-[12px] w-full`}
                />
            </div>

            {/* Centre Icon */}
            <div className="flex gap-3 items-center">
                <button
                disabled={disabledGenerateBtn}
                    onClick={() => setOpenContentGeneratorForm(true)}
                    className={`text-white text-[12px] flex rounded-md gap-1 py-[6px] px-3 mr-2 bg-gradient-to-tr from-purple-600 to-purple-400 cursor-pointer ${
                        disabledGenerateBtn && "opacity-40"
                    }`}>
                    {windowWidth >= 732 && <span>Generate</span>}
                    <RiStickyNoteAddLine className='text-[18px]' />
                </button>

                {/* usser profile */}
                <div className="flex items-center gap-3 px-3">
                    <div className="w-6 h-6 rounded-full bg-slate-300 ml-2"></div>
                    {windowWidth >= 732 && (
                        <div>
                            <p className="text-sm font-semibold">Rahul</p>
                            <p className="text-xs text-slate-400">{fakeUser.isPro ? "Pro Plan" : "Free Plan"}</p>
                        </div>
                    )}
                    <MdKeyboardArrowDown className='text-slate-400 text-[18px]' />
                </div>
                {windowWidth <= 995 && (
                    <FiMenu
                        onClick={() => setStretchSideBar(prev => !prev)}
                        className='text-[19px] text-slate-500 cursor-pointer'
                    />
                )}
            </div>
        </div>
    )
}

export default MainHeader;