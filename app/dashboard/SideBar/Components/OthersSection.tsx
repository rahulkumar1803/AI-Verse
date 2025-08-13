"use client";
import { useAppContext } from "@/app/AppContext";
import React from "react";
import { MdDarkMode, MdSettings, MdLogout, MdLightMode } from "react-icons/md"


function OthersSection() {
  const {
    secondMenuItemsObject: { secondMenuItems, setSecondMenuItems },
    isDarkModeObject: { isDarkMode, setIsDarkMode },
    isSideBarHiddenObject: { isSideBarHidden, setIsSideBarHidden },
  } = useAppContext();

  function updateDarkModeIcon(
    isDarkMode: boolean
  ): React.ComponentType<React.SVGProps<SVGSVGElement>> {
    if (isDarkMode) {
      return MdDarkMode;
    }

    return MdLightMode;
  }
  return (
    <div className="mt-10 pr-3">
      <hr></hr>
      <ul className="mt-6 flex flex-col gap-[4px]">
        {secondMenuItems.map((item, index) => (
          <li
            key={index}
            className="flex items-center justify-between gap-2 text-slate-400"
          >
            <div className="flex gap-2 items-center py-[6px] px-2">
              {item.label === "Dark Mode"
                ? React.createElement(updateDarkModeIcon(isDarkMode))
                : React.createElement(item.icon)}
              <span 
              style={{display: isSideBarHidden ? "none" : "block"}}
              className="text-[14px]">{item.label}</span>
            </div>

            {item.label === "Dark Mode" && <DarkModeToggle />}
          </li>
        ))}
      </ul>
    </div>
  );

  function DarkModeToggle() {
    function updateDarkModeState(option: "left" | "right") {
      if (option === "right") {
        setIsDarkMode(true);
        localStorage.setItem("isDarkMode", JSON.stringify(true));
      }
      else {
        setIsDarkMode(false);
        localStorage.setItem("isDarkMode", JSON.stringify(false));
      }
    }

    return (
      <div
        className={`w-[30px] h-[17px] relative rounded-xl flex ${!isDarkMode ? "bg-slate-200" : "bg-purple-100"
          } cursor-pointer`}
      >
        <div className="h-full w-[45px] z-40 flex justify-center items-center">
          {/* left */}
          <div
            onClick={() => updateDarkModeState("left")}
            className="w-1/2 h-full"
          ></div>
          {/* right */}
          <div
            onClick={() => updateDarkModeState("right")}
            className="w-1/2 h-full"
          ></div>
        </div>
        {/* RoundCircle */}
        <div
          className={`w-[10px] absolute h-[10px] top-[3px] ${!isDarkMode ? "bg-white" : "bg-purple-600"
            } transform
        rounded-full transition-all ${isDarkMode ? "right-[3px]" : "left-[3px]"
            }`}
        ></div>
      </div>
    )
  }
}

export default OthersSection