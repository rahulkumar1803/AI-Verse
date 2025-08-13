import React from 'react'
import { useAppContext } from '@/app/AppContext'
import { useContentGeneratorForm } from './LeftSectionContext'
import { useEffect, useRef } from 'react'

export default function MainTopic({
  label,
  placeholder,
}: {
  label: string,
  placeholder: string,
}) {
  function dynamicTextAreaHeight(): string {
    if (
      label === "product Name" ||
      label === "Blog Post Topic" ||
      label === "Blog Post Content" ||
      label === "Video Topic" ||
      label === "Programing Task" ||
      label === "Text to Summarize" ||
      label === "Section Topic" ||
      label === "Page Content" ||
      label === "Your Profession" ||
      label === "Post Topic" ||
      label === "Content to Rewrite"
    ) {
      return "h-[30vh]"
    }

    return "h-[20vh]"
  }

  const {
    mainTopicInputObject: { mainTopicInput, setMainTopicInput },
    errorsObject : {errors , setErrors},
  } = useContentGeneratorForm();

  const {
    openContentGeneratorFormObject: { openContentGeneratorForm },
    isDarkModeObject: { isDarkMode },
  } = useAppContext();

  const textArearef = useRef<HTMLTextAreaElement>(null);
  const getIndexMainTopicError = errors.findIndex(
    (error) => error.label === "mainTopic"
  );

  useEffect(() => {
    textArearef.current?.focus();
  }, [openContentGeneratorForm])

  return (
    <div className='flex flex-col'>
      <label htmlFor="contentType"
        className='text-[14px] font-medium text-slate-400 mb-[7px]'
      >
        {label}
      </label>
      <textarea
        ref={textArearef}
        id="contentType"
        className={`${dynamicTextAreaHeight()} w-full resize-none p-2 text-[13px] mt-[3px] ${isDarkMode ? "bg-slate-700 text-white" : "bg-white"
          } border border-gray-300 rounded-md`}
        placeholder={placeholder}
        value={mainTopicInput}
        onChange={(e) => {
          setMainTopicInput(e.target.value);

          setErrors((prevErrors) => 
            prevErrors.map((error) => ({
              ...error,
              show: error.label === "mainTopic" ? false : error.show,
            }))
          );
        }}
      />
      {errors[getIndexMainTopicError].show && (
        <span className='text-red-500 text-[10px] mt-1'>
          {errors[getIndexMainTopicError].message}
        </span>
      )}
    </div>
  )
}
