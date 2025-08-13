"use client";

import React from "react";
import { useAppContext } from "@/app/AppContext";
import LeftSection from "./LeftSection/LeftSection";
import RightSection from "./RightSection/RightSection";
import { Toaster } from "react-hot-toast";

export default function ContentGeneratorForm() {
  const {
    openContentGeneratorFormObject: { openContentGeneratorForm },
    isDarkModeObject: { isDarkMode },
    windowWidthObject: { windowWidth },
  } = useAppContext();

  return (
    <div
      className={`
        ${openContentGeneratorForm ? "fixed" : "hidden"}
        z-[9999]
        top-10
        bottom-5
        left-1/2
        -translate-x-1/2
        w-[95%]
        rounded-lg
        shadow-xl
        border
        ${isDarkMode ? "bg-slate-800 border-slate-600 text-white" : "bg-white border-gray-300 text-black"}
        flex
        ${windowWidth <= 836 ? "flex-col overflow-y-auto" : "flex-row h-[90vh]"}
      `}
    >
        <LeftSection />
        <RightSection />
    </div>
  );
}
