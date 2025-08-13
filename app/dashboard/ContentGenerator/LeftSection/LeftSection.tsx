import { IoSparklesSharp } from "react-icons/io5";
import MainTopic from "./MainTopic";
import ToneOrStyle from "./ToneOrStyle";
import Audience from "./Audience";
import TemplatesHeader from "./TemplateHeader";
import { useAppContext } from "@/app/AppContext";
import { IoClose } from "react-icons/io5";
import Keywords from "./OtherComponents/Keywords";
import LanguageSelector from "./OtherComponents/LanguageSelector";
import { ContentGeneratorProvider, useContentGeneratorForm } from "./LeftSectionContext";
import { FormEvent, useState } from "react";
import renderFormFields, { generateContent } from "./leftSectionFunctions";
import { HistoryData } from "@/app/types/AppTypes";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";


type SingleError = {
  label: string;
  show: boolean;
  message: string;
};

export function countWords(text: string) : number {
  return text.trim().split(/\s+/).filter((word) => word.length > 0).length;
}

export default function LeftSection() {
  const {
    selectedTemplatesObject: { selectedTemplate, setSelectedTemplate },
    isDarkModeObject: { isDarkMode },
    windowWidthObject: { windowWidth },
    allTemplatesObject: { allTemplates },
    contentGeneratedObject: {contentGenerated , setContentGenerated},
    allHistoryDataObject: {allHistoryData , setAllHistoryData},
  } = useAppContext();

  const [isLoading, setIsLoading] = useState(false);

  function TemplateForm() {
    const {
      mainTopicInputObject: { mainTopicInput, setMainTopicInput },
      errorsObject: { setErrors , errors},
      selectLanguageObject: { selectLanguage },
      keywordsObject: { keywords },
      toneOrStyleInputObject: { toneOrStyleInput },
      audienceInputObject: { audienceInput },
    } = useContentGeneratorForm();


    async function submitForm(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();

      const filedsToCheck = [
        {
          label: "mainTopic",
          value: mainTopicInput.trim(),
          message: "This field is required",
        },
        {
          label: "selectedLanguage",
          value: selectLanguage.trim(),
          message: "please select a language",
        },
        {
          label: "keywords",
          value: keywords,
          message: "please add at least a keyword",
          condition: (val: string[]) => val.length === 0,
        },
      ];

      const updateErrors : SingleError[] = errors.map((singleError) => {
        const field = filedsToCheck.find((f) => f.label === singleError.label);
        let hasError = false;

        if(field){
          if(field.condition){
            hasError = field.condition(field.value);
          } else{
            hasError = field.value === "";
          }
        }

        return {...singleError , show : hasError};
      });

      setErrors(updateErrors);

      const isMainTopicValid = !updateErrors.find(
        (error) => error.label === "mainTopic"
      )?.show;
      const isSelectedLanguagevalid = !updateErrors.find(
        (error) => error.label === "selectedLanguage"
      )?.show;
      const isKeywordsValid = !updateErrors.find(
        (error) => error.label === "keywords"
      )?.show;

      console.log(isSelectedLanguagevalid);

      if(isMainTopicValid || isSelectedLanguagevalid || isKeywordsValid){
        try{
          setIsLoading(true);

          const result = await generateContent(
            selectedTemplate,
            mainTopicInput,
            toneOrStyleInput,
            selectLanguage,
            audienceInput,
            keywords
          ); 
          let words = countWords(result.content);
          if(result && selectedTemplate){
            const newHistory: HistoryData = {
              id: uuidv4(),
              clerkUserId: "123",
              template: selectedTemplate.title,
              title: result.theTitle,
              content: result.content || "",
              createdAt: new Date().toISOString(),
              totalWords: words,
            };

            setContentGenerated(result.content);
            setAllHistoryData([...allHistoryData , newHistory]);
            toast.success("The Content has been generated sucessfully");
          }
        } catch(error){
          console.log(error);
          toast.error("Something went wrong...");
        } finally {
          setIsLoading(false);
        }
      }
    }

    return (
      <form
        onSubmit={submitForm}
        className="flex flex-col h-[100%] justify-between">
        <div className="flex flex-col gap-8">{renderFormFields()}</div>

        <div className={`flex justify-end ${windowWidth < 836 && "mt-10"}`}>
          <button
            type="submit"
            className="bg-purple-600 flex text-[13px] mb-1 text-white py-2 px-10 rounded-md hover:bg-purple-700 cursor-pointer"
          >
            <IoSparklesSharp className="mr-2" />
            {isLoading ? "Generating" : "generate"}
          </button>
        </div>
      </form>
    );
  }

  return (
    <div
      className={`${windowWidth <= 836 ? "w-full" : "w-1/2"
        } rounded-lg p-6 flex flex-col gap-12`}
    >
      <ContentGeneratorProvider >
        <TemplatesHeader />
        <TemplateForm />
      </ContentGeneratorProvider>
    </div>
  )

}