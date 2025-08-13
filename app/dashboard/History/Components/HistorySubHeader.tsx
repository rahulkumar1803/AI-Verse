
import { useAppContext } from "@/app/AppContext"
import FilterByTemplates from "@/app/DropDown/FilterByTemplatesDropDown";
import { useState } from "react";

import { IoFilter } from "react-icons/io5"
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri"

function HistorySubHeader() {
    const {
        isDarkModeObject: { isDarkMode },
        windowWidthObject: { windowWidth },
        allHistoryDataObject: { allHistoryData },
    } = useAppContext();

    const [openDropDown, setOpenDropDown] = useState(false);

    const isMobileView = windowWidth <= 694;

    //Filter button
    function FilterButton() {
        const containerClass = `flex text-[14px] gap-2 rounded-md px-2
        hover:cursor-pointer h-fit p-1 item-center ${isDarkMode ? "bg-slate-800" : "bg-white border border-slate-100"
            }`;

        const buttonClass = 'flex item-center gap-1';

        const filterByTemplatesText = ` ${isDarkMode ? "text-white" : "text-slate-500"
            } ${isMobileView ? "hidden" : "block"} text-sm`;

        function dropDownIconToggle() {
            if (openDropDown) {
                return <RiArrowDropUpLine className="text-purple-600 text-[20px]" />
            } else {
                return <RiArrowDropDownLine className="text-purple-600 text-[20px]" />
            }
        }

        return (
            <button
                onClick={() => {
                    setOpenDropDown(!openDropDown);
                }}
                className={containerClass}
            >

                <IoFilter className="text-purple-600 text-[16px] " />

                <div className={buttonClass}>
                    <span className={filterByTemplatesText}>Filter By Templates</span>
                    {dropDownIconToggle()}
                </div>
            </button>
        );
    }

    //Sub Header
    function SubHeaderTitle() {
        return (
            <div className="flex flex-col">

                <span className="font-semibold text-[18px] ">{allHistoryData.length} Elements Generated</span>

                <span className="text-slate-400 text-[10px]">
                    History of all the content created
                </span>
            </div>
        );
    }

    return (
        <div className="mx-6 flex justify-between mt-12 relative">
            <SubHeaderTitle />
            <FilterButton />
            {openDropDown && (
                <FilterByTemplates
                    openDropDown={openDropDown}
                    setOpenDropDown={setOpenDropDown}
                />
            )}
        </div>
    )
}

export default HistorySubHeader