import React, { useContext } from 'react'
import { IoIosClose } from 'react-icons/io'
import SingleHistoryItem from './SingleHistoryItem'
import { useAppContext } from '@/app/AppContext'
import { SingleTemplateExtended, useAllHistoryContext } from '../AllHistory';

function AllHistoryList() {
    const {
        windowWidthObject: { windowWidth },
        isDarkModeObject: { isDarkMode },
        templatesForDropDownObject: { templatesForDropDown, setTemplatesForDropDown },
    } = useAppContext();

    const {
        selectedItemsObject: { selectedItems, setSelectedItems },
    } = useAllHistoryContext();

    const isMobileView = windowWidth <= 694;

    function FilterOptions() {
        return (
            <div className='flex flex-wrap gap-2 mb-4'>
                {selectedItems.map((singleItem, index) => (
                    <React.Fragment key={index}>
                        <OptionSelected singleItem={singleItem} />
                    </React.Fragment>
                ))}
            </div>
        );

        function OptionSelected({
            singleItem,
        }: {
            singleItem: SingleTemplateExtended;
        }) {
            return (
                <div className='bg-purple-100 p-1 flex gap-1 items-center text-purple-600 rounded-md'>
                    <span className='text-[12px]'>{singleItem.title}</span>
                    <IoIosClose
                        onClick={() => {
                            const updateTemplateArray = templatesForDropDown.map(
                                (singleItemDrop) => {
                                    if (singleItem.id === singleItemDrop.id) {
                                        return { ...singleItemDrop, isSelected: false };
                                    }

                                    return singleItemDrop;
                                }
                            );
                            setSelectedItems(updateTemplateArray.filter((item) => item.isSelected));

                            setTemplatesForDropDown(updateTemplateArray);
                        }}
                        className='text-[16px] cursor-pointer' />
                </div>
            )
        }
    }

    function AllColumns() {
        return (
            <div className={`w-full border rounded-t-lg bg-slate-100 border-slate-200 
            py-2 overflow-hidden px-[13px] grid ${isMobileView ? "grid-cols-4" : "grid-cols-5"
                }`}>
                <span className='text-[14px] text-slate-400 font-semibold'>
                    Template
                </span>
                <span className='text-[14px] text-slate-400 font-semibold'>
                    Title
                </span>
                {!isMobileView && (
                    <span className='text-[14px] text-slate-400 font-semibold'>
                        Created At
                    </span>
                )}
                <span className='text-[14px] text-slate-400 font-semibold'>
                    Total Words
                </span>
                <span className='text-[14px] text-center text-slate-400 font-semibold'>
                    Actions
                </span>
            </div>
        );
    }


    const singleItemsContainer = `flex overflow-hidden flex-col ${isDarkMode ? "bg-slate-800" : "bg-white"
        } `;

    const {
        allHistoryDataObject: { allHistoryData },
    } = useAppContext();

    allHistoryData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    const extractSelectedTemplates = selectedItems.map((item) => item.title);

    const filteredTemplates = selectedItems.length > 0
     ? allHistoryData.filter((SingleHistory) => 
        extractSelectedTemplates.includes(SingleHistory.template)
     ) : allHistoryData;
    return (
        <div className='flex flex-col mt-7 mx-5 rounded-md'>
            <FilterOptions />

            <AllColumns />

            <div className={singleItemsContainer}>
                {filteredTemplates.map((SingleHistory , index) => (
                    <React.Fragment key={index}>
                        <SingleHistoryItem SingleHistory = {SingleHistory} />
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}

export default AllHistoryList