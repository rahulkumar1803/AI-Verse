"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useAppContext } from "@/app/AppContext";

// -------------------- TYPES --------------------
type SingleError = {
  label: string;
  show: boolean;
  message: string;
};

type ContentGeneratorFormType = {
  mainTopicInputObject: {
    mainTopicInput: string;
    setMainTopicInput: React.Dispatch<React.SetStateAction<string>>;
  };
  toneOrStyleInputObject: {
    toneOrStyleInput: string;
    setToneOrStyleInput: React.Dispatch<React.SetStateAction<string>>;
  };
  audienceInputObject: {
    audienceInput: string;
    setAudienceInput: React.Dispatch<React.SetStateAction<string>>;
  };
  selectLanguageObject: {
    selectLanguage: string;
    setSelectLanguage: React.Dispatch<React.SetStateAction<string>>;
  };
  keywordsObject: {
    keywords: string[];
    setKeywords: React.Dispatch<React.SetStateAction<string[]>>;
  };
  errorsObject: {
    errors: SingleError[];
    setErrors: React.Dispatch<React.SetStateAction<SingleError[]>>;
  };
};

// -------------------- DEFAULT STATE --------------------
const defaultGeneratorFormState: ContentGeneratorFormType = {
  mainTopicInputObject: { mainTopicInput: "", setMainTopicInput: () => { } },
  toneOrStyleInputObject: { toneOrStyleInput: "", setToneOrStyleInput: () => { } },
  audienceInputObject: { audienceInput: "", setAudienceInput: () => { } },
  selectLanguageObject: { selectLanguage: "", setSelectLanguage: () => { } },
  keywordsObject: { keywords: [], setKeywords: () => { } },
  errorsObject: { errors: [], setErrors: () => { } },
};

// -------------------- CONTEXT --------------------
const ContentGeneratorFormContext = createContext<ContentGeneratorFormType>(
  defaultGeneratorFormState
);

// -------------------- PROVIDER --------------------
export function ContentGeneratorProvider({ children }: { children: React.ReactNode }) {
  const [mainTopicInput, setMainTopicInput] = useState("");
  const [toneOrStyleInput, setToneOrStyleInput] = useState("");
  const [audienceInput, setAudienceInput] = useState("");
  const [selectLanguage, setSelectLanguage] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [errors, setErrors] = useState<SingleError[]>([
    { label: "mainTopic", show: false, message: "This field is required" },
    { label: "selectedLanguage", show: false, message: "Please select a language" },
    { label: "keywords", show: false, message: "Add at least one keyword" }
  ]);

  const {
    openContentGeneratorFormObject: { openContentGeneratorForm },
    selectedTemplatesObject: { selectedTemplate },
  } = useAppContext();

  useEffect(() => {
    setMainTopicInput("");
    setToneOrStyleInput("");
    setAudienceInput("");
    setSelectLanguage("");
    setKeywords([]);
  }, [openContentGeneratorForm, selectedTemplate]);

  return (
    <ContentGeneratorFormContext.Provider
      value={{
        mainTopicInputObject: { mainTopicInput, setMainTopicInput },
        toneOrStyleInputObject: { toneOrStyleInput, setToneOrStyleInput },
        audienceInputObject: { audienceInput, setAudienceInput },
        selectLanguageObject: { selectLanguage, setSelectLanguage },
        keywordsObject: { keywords, setKeywords },
        errorsObject: { errors, setErrors },
      }}
    >
      {children}
    </ContentGeneratorFormContext.Provider>
  );
}

// -------------------- HOOK --------------------
export function useContentGeneratorForm() {
  return useContext(ContentGeneratorFormContext);
}
