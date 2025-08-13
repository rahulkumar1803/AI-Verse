"use client";
import React from 'react';
import MainHeader from '../MainHeader';
import { useAppContext } from '@/app/AppContext';
import DashStats from './Components/DashStats';
import ChartContainer from './Components/Chart';
import AllHistoryList from './Components/AllHistoryList';

function MainArea() {
    const {
        isDarkModeObject: {isDarkMode},
        stretchSideBarObject : {stretchSideBar , setStretchSideBar},
    } = useAppContext();
  return (
    <div
        className={`w-full p-1 ${!isDarkMode ? "bg-slate-100" : "bg-slate-700"}`}
    >
        {stretchSideBar && (
          <div className='fixed w-full h-full bg-black opacity-25 z-50'></div>
        )}
        <MainHeader />
        <DashStats />
        <ChartContainer />
        <AllHistoryList />
    </div>
  );
}

export default MainArea;