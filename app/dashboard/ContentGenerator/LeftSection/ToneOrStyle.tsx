import React, { useState } from "react";
import { useAppContext } from "@/app/AppContext";
import { useContentGeneratorForm } from "./LeftSectionContext";

export default function ToneOrStyle() {
  const {
    toneOrStyleInputObject: { toneOrStyleInput, setToneOrStyleInput }
  } = useContentGeneratorForm();

  // const toneOptions = ["Catchy", "Professional", "Friendly", "Serious", "Humorous"];
  const {
    isDarkModeObject: { isDarkMode }
  } = useAppContext();

  return (
    <div>
      <label className="block text-sm font-medium text-slate-400 mb-1">Tone/Style:</label>
      <select
        id="toneStyle"
        value={toneOrStyleInput}
        onChange={(e) => setToneOrStyleInput(e.target.value)}
        className={`w-full px-3 py-2  rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 ${isDarkMode ? "bg-slate-700 text-white" : "bg-white"
          }`}
      >
        <option value="Catchy">Catchy</option>
        <option value="Professional">Professional</option>
        <option value="Casual">Casual</option>
        <option value="Informative">Informative</option>
      </select>
    </div>
  );
};

