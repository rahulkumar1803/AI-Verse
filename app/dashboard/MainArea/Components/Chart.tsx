// ChartContainer.tsx

"use client";
import React, { useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
import StatsDropDown from "@/app/DropDown/StatsDropDown";
import DaysDropDown from "@/app/DropDown/DaysDropDown";

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { useAppContext } from "@/app/AppContext";

import {
    formatAndAggregateAverageWords,
    formatAndAggregateTimeSaved,
    formatAndAggregateTotalCount,
    formatAndCountDocuments,
    sortAndShortenMonth,
    newHistoryData,
} from "@/app/LocalData/mainData";


const ChartContainer = () => {
    const {
        isDarkModeObject: { isDarkMode }
    } = useAppContext();

    return (
        <div
            className={`p-5 flex gap-3 flex-col rounded-md ${isDarkMode
                ? "bg-slate-800 text-white"
                : "bg-white border border-slate-50"
                } mx-4 mt-6`}
        >
            <ChartHeader />
            <TheChart />
        </div>
    );

    function ChartHeader() {
        const [openDropDown, setOpenDropDown] = useState(false);
        const [openDaysDropDown, setOpenDaysDropDown] = useState(false);
        const {
            statsDropDownItemObject: { statsData, setStatsData },
            daysDropDownObject: { daysDropDown, setDaysDropDown },
        } = useAppContext();

        const getSelectedItem = [...statsData].find(
            (singleItem) => singleItem.isSelected === true
        );

        const getSelectedDaysItem = [...daysDropDown].find(
            (singleItem) => singleItem.isSelected === true
        );

        return (
            <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    <div
                        className="bg-purple-100 rounded-md p-[8px] flex items-center justify-center"
                    >
                        {getSelectedItem?.icon}
                    </div>

                    <div className="flex flex-col relative">
                        <div
                            onClick={() => setOpenDropDown(!openDropDown)}
                            className="flex gap-1 items-center cursor-pointer "
                        >
                            <span className=" text-[13px] text-slate-500 max-sm:text-sm hover:text-purple-600">
                                {getSelectedItem?.title}
                            </span>
                            <MdArrowDropDown className="text-[17px] text-slate-500" />
                        </div>

                        <span
                            className={`text-[16px] ${isDarkMode ? "text-white" : "text-slate-700"
                                } font-semibold cursor-pointer max-sm:text-sm`}
                        >
                            {getSelectedItem?.value}
                        </span>
                        {openDropDown && (
                            <StatsDropDown
                                statsData={statsData}
                                setStatsData={setStatsData}
                                openDropDown={openDropDown}
                                setOpenDropDown={setOpenDropDown}
                            />
                        )}
                    </div>
                </div>

                <div className="flex gap-1 items-center relative">
                    <span
                        onClick={() => setOpenDaysDropDown(!openDaysDropDown)}
                        className="text-[13px] text-slate-500 hover:text-purple-600 cursor-pointer">
                        {getSelectedDaysItem?.title}
                    </span>
                    <MdArrowDropDown className="text-[17px] text-slate-500" />
                    {openDaysDropDown && (
                        <DaysDropDown
                            openDaysDropDown={openDaysDropDown}
                            setOpenDaysDropDown={setOpenDaysDropDown}
                        />
                    )}
                </div>
            </div>
        );
    }

    function TheChart() {
        const {
            allHistoryDataObject: { allHistoryData },
            statsDropDownItemObject: { statsData },
            daysDropDownObject: { daysDropDown },
        } = useAppContext();

        const currentDate = new Date();

        function daysSelected() {
            const findSelectedDays = daysDropDown.find((day) => day.isSelected);

            if (findSelectedDays?.id === 1) {
                return 5;
            }
            if (findSelectedDays?.id === 2) {
                return 15;
            }
            if (findSelectedDays?.id === 3) {
                return 30;
            }
            return 5;
        }

        const filterDataByDays = (days: number) => {
            const cutoffDate = new Date();
            cutoffDate.setDate(currentDate.getDate() - days);

            return allHistoryData.filter((item) => {
                const itemDate = new Date(item.createdAt);
                return itemDate >= cutoffDate;
            });
        };

        function returnedValues() {

            const findSelectedItem = statsData.find((data) => data.isSelected);

            const daysToShow = daysSelected();

            const filterDate = filterDataByDays(daysToShow);

            const totalWordsCount = sortAndShortenMonth(

                formatAndAggregateTotalCount(filterDate)

            );

            const totalDocCount = sortAndShortenMonth(

                formatAndCountDocuments(filterDate)

            );

            const totlTimeSaved = formatAndAggregateTimeSaved(filterDate);

            const totalWordPerDoc = formatAndAggregateAverageWords(filterDate);

            console.log(totalDocCount);

            if (findSelectedItem?.id === 1) {
                return totalWordsCount;
            }

            if (findSelectedItem?.id === 2) {
                return totalDocCount;
            }

            if (findSelectedItem?.id === 3) {
                return totlTimeSaved;
            }

            if (findSelectedItem?.id === 4) {
                return totalWordPerDoc;
            }
            return totalWordsCount;
            
        }

        return (
            <div className="">
                <ResponsiveContainer
                    className={"text-[12px"}
                    width="100%"
                    height={176}
                >
                    <AreaChart
                        data={returnedValues()}
                        margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorWords" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" stroke="#64748b" />
                        <YAxis />
                        <CartesianGrid strokeOpacity={0} strokeDasharray="3 3" />
                        <Tooltip />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#8884d8"
                            fillOpacity={1}
                            fill="url(#colorWords)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        );
    }
}

export default ChartContainer;