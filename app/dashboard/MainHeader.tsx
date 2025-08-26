"use client";
import React, { useState, useEffect } from 'react'
import { BiSearch } from 'react-icons/bi';
import { FiMenu } from 'react-icons/fi';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { RiStickyNoteAddLine } from 'react-icons/ri';
import { useAppContext } from '../AppContext';
import { SingleTemplate } from '../types/AppTypes';
import { GiRoundStar } from 'react-icons/gi';
import { SingleTemplateExtended } from './History/AllHistory';

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

    const [disabledGenerateBtn, setDisabledGenerateBtn] = useState(false);

    useEffect(() => {
        if (!fakeUser.isPro) {
            if (fakeUser.cumulativeWords >= 1000) {
                setDisabledGenerateBtn(true);
            }
        } else {
            setDisabledGenerateBtn(false);
        }
    }, [fakeUser.cumulativeWords, fakeUser.isPro]);

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

            <SearchComponent />
            {/* Centre Icon */}
            <div className="flex gap-3 items-center">
                <button
                    disabled={disabledGenerateBtn}
                    onClick={() => setOpenContentGeneratorForm(true)}
                    className={`text-white text-[12px] flex rounded-md gap-1 py-[6px] px-3 mr-2 bg-gradient-to-tr from-purple-600 to-purple-400 cursor-pointer ${disabledGenerateBtn && "opacity-40"
                        }`}>
                    {windowWidth >= 732 && <span>Generate</span>}
                    <RiStickyNoteAddLine className='text-[18px]' />
                </button>

                {/* usser profile */}
                <div className="flex items-center gap-3 px-3">
                    {fakeUser?.imageUrl ? (
                        // If imageUrl exists, render the Image component
                        <img
                            src={fakeUser.imageUrl}
                            alt="User profile picture"
                            className="w-6 h-6 rounded-full ml-2"
                        />
                    ) : (
                        // Otherwise, render the gray fallback div
                        <div className="w-6 h-6 rounded-full bg-slate-300 ml-2"></div>
                    )}
                    {windowWidth >= 732 && (
                        <div>
                            <p className="text-sm font-semibold">{fakeUser.firstName}</p>
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

function SearchComponent() {
    const {
        isDarkModeObject: { isDarkMode },
        allTemplatesObject: { allTemplates },
        allHistoryDataObject: { allHistoryData },
    } = useAppContext();

    const [search, setSearch] = useState("");
    const [showLiveResults, setShowLiveResults] = useState(false);

    const filteredResults = allTemplates.filter((SingleTemplate) =>
        SingleTemplate.title.toLowerCase().includes(search.toLowerCase())
    );

    function updateTheSearchInput(e: React.ChangeEvent<HTMLInputElement>) {
        const currentValue = e.target.value;
        if (currentValue.trim().length === 0) {
            setShowLiveResults(false);
        }
        else {
            setShowLiveResults(true);
        }
        setSearch(e.target.value);
    }

    return (
        <div className={` flex flex-col w-1/3 relative `}>
            <div
                className={`flex items-center ${isDarkMode ? "bg-slate-600" : "bg-slate-50"
                    } rounded-md px-3 py-[9px]`}
            >
                {/* icon */}
                <BiSearch className="text-slate-400 text-[18px]" />
                <input
                    value={search}
                    onChange={updateTheSearchInput}
                    type="text"
                    placeholder="Search a template..."
                    className={`${isDarkMode ? "bg-slate-600" : "bg-slate-50"
                        } font-light text-slate-400 placeholder:text-slate-400 focus:outline-none px-1 text-[12px] w-full`}
                />
            </div>
            {showLiveResults && <LiveResults />}
        </div>
    );

    function LiveResults() {
        const dynamicHeight = filteredResults.length === 14 ? "h-[250px]" : "";

        if (filteredResults.length === 0) {
            return (
                <div
                    className="bg-white w-[340px] z-[60] p-3 absolute top-14 rounded-md shadow-md flex flex-col gap-5 text-slate-400 text-[12px]"
                >
                    no template found...
                </div>
            );
        }

        return (
            <div
                className={`bg-white w-[340px] ${dynamicHeight} z-[60] p-3 absolute top-14 rounded-md shadow-md flex flex-col gap-3`}
            >
                <div className="h-[97%] overflow-y-auto">
                    {filteredResults.map((singleTemplate, index) => (
                        <SingleTemplateItem
                            key={index}
                            singleTemplate={singleTemplate}
                        />
                    ))}
                </div>
            </div>
        );
    }

    function SingleTemplateItem({
        singleTemplate,
    }: {
        singleTemplate: SingleTemplate;
    }) {
        const {
            fakeUserObject: { fakeUser },
            mainMenuItemsObject: { setMainMenuItems },
            selectedTemplatesObject: { setSelectedTemplate },
            openContentGeneratorFormObject: { setOpenContentGeneratorForm },
        } = useAppContext();

        const sumTotalWords = allHistoryData.reduce((sum, item) => {
            if (item.template.toLowerCase() === singleTemplate.title.toLowerCase()) {
                return sum + item.totalWords;
            }
            return sum;
        }, 0);

        function adjustOpacity() {
            if (!fakeUser.isPro) {
                if (singleTemplate.isForPro) {
                    return "opacity-45";
                }
            }
            return "";
        }

        function showStar() {
            if (!fakeUser.isPro) {
                if (singleTemplate.isForPro) {
                    return (
                        <GiRoundStar
                            className="text-purple-600 p-[2px] flex items-center justify-center rounded-full absolute right-[-25px] top-[5px] text-[13px]"
                        />
                    );
                }
            }
            return <></>;
        }

        function goToTheProPlanPage() {
            setMainMenuItems((prevItems) =>
                prevItems.map((item) =>
                    item.label === "Subscription"
                        ? { ...item, isSelected: true }
                        : { ...item, isSelected: false }
                )
            );
        }

        return (
            <div
                onClick={() => {

                    const newSelectedTemplate: SingleTemplateExtended = {
                        ...singleTemplate,
                        isSelected: true,
                    };
                    // If the user is not pro, only select the templates
                    // that the isForPro property is false, otherwise, select all the templates
                    if (!fakeUser.isPro) {
                        // If the cumulative words exceeds 1000, take the user to the Pro Plan Page
                        if (fakeUser.cumulativeWords >= 1000) {
                            goToTheProPlanPage();
                            setShowLiveResults(false);
                            setSearch("");
                            return;
                        }
                        if (!singleTemplate.isForPro) {
                            setSelectedTemplate(newSelectedTemplate);
                            setOpenContentGeneratorForm(true);
                        } else {
                            // If the user clicks on the template is not free to use,
                            // direct him to the upgrade plan page
                            goToTheProPlanPage();
                        }
                    } else {
                        setSelectedTemplate(newSelectedTemplate);
                        setOpenContentGeneratorForm(true);
                    }
                    setShowLiveResults(false);
                    setSearch("");
                }}
                className={`p-2 flex items-center justify-between gap-4 hover:border rounded-md
                 hover:bg-purple-50 border-purple-500 ${adjustOpacity()
                    } select-auto cursor-pointer`}
            >
                <div className='flex items-center w-full relative'>
                    <div className='bg-purple-200 p-[6px] rounded-lg text-[13px] text-slate-700'>
                        {singleTemplate.icon}
                    </div>
                    <div className='relative'>
                        {showStar()}
                        <span className='text-[14px] ml-2'>{singleTemplate.title}</span>
                    </div>
                </div>

                <span className='text-[10px] text-right text-slate-400'>
                    {sumTotalWords} Word Generated
                </span>
            </div>
        );
    }
}