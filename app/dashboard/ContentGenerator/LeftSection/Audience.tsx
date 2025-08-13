import React, { useState } from "react";
import { useAppContext } from "@/app/AppContext";
import { useContentGeneratorForm } from "./LeftSectionContext";

export default function Audience() {
  const {
audienceInputObject : { audienceInput , setAudienceInput}
  } = useContentGeneratorForm();

  const {
    isDarkModeObject: { isDarkMode },
  } = useAppContext();

  return (
    <div>
      <label className="block text-sm font-medium text-slate-400 mb-1">Audience (Optional):</label>
      <input
        type="text"
        value={audienceInput}
        id="audience"
        onChange={(e) => setAudienceInput(e.target.value)}
        placeholder="Enter your audience"
        className={`w-full px-3 py-2  rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 ${isDarkMode ? "bg-slate-700 text-white" : "bg-white"
          }`} />
    </div>
  );
};
