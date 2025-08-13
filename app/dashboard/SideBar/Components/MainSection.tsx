"use client";
// indicatesthat this component is intended to be rendered ont the client-side
import React, { useState } from "react";


import { useAppContext } from "@/app/AppContext";


function MainSection() {

  const {
    mainMenuItemsObject: { mainMenuItmes, setMainMenuItems },
    isSideBarHiddenObject: { isSideBarHidden, setIsSideBarHidden },
  } = useAppContext();


  const handleSelectionChange = (index: number) => {

    setMainMenuItems(
      mainMenuItmes.map((item, i) => ({
        ...item,
        isSelected: i === index,
      }))
    );
  };


  return (
    <div className="space-y-3 pr-3">
      {/* Empty div to replace the space gone from hiding the main menu div */}
      {isSideBarHidden && <div className="h-4"></div>}

      <h2 className={`${isSideBarHidden ? "hidden" : "block"
        } text-[13px] px-2 font-semibold text-gray-400 uppercase`}
      >
        Main Menu
      </h2>
      <ul className={`flex flex-col gap-[4px] ${
        !isSideBarHidden ? "pr-12" : "pr-[25px]"
      }`}
      >
        {/* OverView */}
        {mainMenuItmes.map((item, index) => (
          <li
            key={index}
            onClick={() => handleSelectionChange(index)}
            className={`flex items-center space-x-2 select-none cursor-pointer ${item.isSelected
                ? "bg-purple-50 py-[6px] px-2 rounded-md text-purple-600"
                : "text-gray-400 py-[6px] px-2"
              } ${item.label==="Subscription" && "hidden"}`}
          >
            {React.createElement(item.icon, {
              className: `${item.isSelected ? "text-purple-600" : "text-slate-400"
                }`,
            })}
            <span 
            style={{display: isSideBarHidden ? "none" : "block"}}
            className="text-[14px]"
            >
              {item.label}
              </span>
          </li>
        ))}
      </ul>
    </div>
  );
}


export default MainSection;