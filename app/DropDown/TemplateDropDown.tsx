import React, { SetStateAction, useEffect, useRef, useState } from 'react';
import { useAppContext } from '@/app/AppContext';
import { SingleTemplate } from '../types/AppTypes';
import useClickOutside from '@/app/Hooks/useClickOutside';
import { BiSearch } from 'react-icons/bi';
import { GiRoundStar } from 'react-icons/gi';

type ExtendedSingleTemplate = SingleTemplate & {
    isSelected: boolean;
};

export default function TemplateDropDown({
    openDropDown,
    setOpenDropDown,
}: {
    openDropDown: boolean;
    setOpenDropDown: React.Dispatch<SetStateAction<boolean>>;
}) {
    const {
        allTemplatesObject: { allTemplates },
        selectedTemplatesObject: { selectedTemplate, setSelectedTemplate },
        isDarkModeObject: { isDarkMode },
        contentGeneratedObject: { setContentGenerated },
    } = useAppContext();

    const [inputSearch, setInputSearch] = useState("")
    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const [extendedAllTemplatesArray, setExtendedAllTemplatesArray] = useState(
        allTemplates.map((singleTemplate) => ({
            ...singleTemplate,
            isSelected: false,
        }))
    );

    // 🔘 Close dropdown on outside click
    useClickOutside(dropdownRef, () => setOpenDropDown(false), openDropDown);


    useEffect(() => {
        if (inputRef.current) inputRef.current.focus();


        if (selectedTemplate !== null) {
            const getTheSelectedTemplateIndex = allTemplates.findIndex(
                (template) => template.id === selectedTemplate.id
            );

            const copyExtendedTemplatesArray = extendedAllTemplatesArray.map((template, index) => {
                if (getTheSelectedTemplateIndex === index) {
                    return { ...template, isSelected: true };
                }

                return { ...template, isSelected: false };
            });

            setExtendedAllTemplatesArray(copyExtendedTemplatesArray);
        }
    }, [openDropDown]);

    const filterBySearch = extendedAllTemplatesArray.filter((item) =>
        item.title.toLowerCase().includes(inputSearch.toLowerCase())
    );


    return (
        <div
            ref={dropdownRef}
            className={`${isDarkMode ? "bg-slate-800" : "bg-white"
                } absolute p-3 top-20 z-[90] border w-[310px] border-slate-50 select-none shadow-md rounded-lg flex flex-col gap-2`}
        >
            {/* Search bar */}
            <div className={`flex items-center ${isDarkMode ? "bg-slate-600" : "bg-slate-50"
                } rounded-md px-3 py-[9px] w-full`}>
                <BiSearch className='text-slate-400 text-[18px]' />
                <input type="text"
                    ref={inputRef}
                    value={inputSearch}
                    onChange={(e) => setInputSearch(e.target.value)}
                    placeholder='Search here...'
                    className={`${isDarkMode ? "bg-slate-800" : "bg-slate-50"
                        }font-light text-slate-400 placeholder:text-slate-400 focus:outline-none px-1 text-[12px] w-full`}
                />
            </div>

            <div className='flex flex-col gap-1 mt-3 h-[240px] pr-2 overflow-y-auto'>
                {filterBySearch.map((item, index) => (
                    <SingleItem key={index} dropDownItem={item} />
                ))}
            </div>
        </div>
    );

    function SingleItem({
        dropDownItem
    }: {
        dropDownItem: ExtendedSingleTemplate
    }) {
        const {
            selectedTemplatesObject: { selectedTemplate, setSelectedTemplate },
            fakeUserObject: { fakeUser },
            mainMenuItemsObject: { mainMenuItmes, setMainMenuItems },
            openContentGeneratorFormObject: { setOpenContentGeneratorForm },
        } = useAppContext();

        function gotoTheProPlanPage() {
            setMainMenuItems((prevItem) =>
                prevItem.map((singleItem) => ({
                    ...singleItem,
                    isSelected: singleItem.label === "Subscription" ? true : false,
                }))
            );
        }

        function updateTheSelection() {
            const copyExtendedTemplatesArray = extendedAllTemplatesArray.map(
                (template, _) => {
                    if (dropDownItem.id === template.id) {
                        return { ...template, isSelected: true };
                    }
                    return { ...template, isSelected: false };
                }
            );

            setExtendedAllTemplatesArray(copyExtendedTemplatesArray);
            setSelectedTemplate(dropDownItem);
            setContentGenerated("");
            setOpenDropDown(false);
        }

        function decreaseOpacityDropDownItem() {
            if (dropDownItem.isForPro && !fakeUser.isPro) {
                return "opacity-55";
            }
            return "";
        }
        return (
            <div
                onClick={() => {
                    if (!fakeUser.isPro) {
                        if (!dropDownItem.isForPro) {
                            updateTheSelection();
                        } else {
                            setOpenContentGeneratorForm(false);
                            gotoTheProPlanPage();
                        }
                    } else {
                        updateTheSelection();
                    }
                }}
                className={`flex items-center justify-between gap-7 p-[6px] px-2 rounded-lg text-slate-600 cursor-pointer
  ${dropDownItem.isSelected
                        ? isDarkMode
                            ? 'border border-purple-600 bg-slate-600'
                            : 'border border-purple-600 bg-purple-50'
                        : ''
                    } ${decreaseOpacityDropDownItem()}`}

            >
                <div className='flex gap-2 items-center'>

                    <div
                        className={`${dropDownItem.isSelected ? "bg-purple-200" : "bg-purple-100"
                            } p-[6px] rounded-md`}>
                        {dropDownItem.icon}
                    </div>

                    <div className="relative">
                        <span className='text-[12px] text-slate-500 mt-1 hover:text-purple-600 cursor-pointer'>
                            {dropDownItem.title}
                        </span>

                        {!fakeUser.isPro && (
                            <>
                                {dropDownItem.isForPro && (
                                    <GiRoundStar className='text-purple-600 text-[9px] absolute right-[-17px] top-[8px]' />
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
