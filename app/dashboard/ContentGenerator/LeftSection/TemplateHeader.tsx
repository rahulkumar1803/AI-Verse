import React, { useState, useEffect } from 'react';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import { IoClose } from 'react-icons/io5';
import { useAppContext } from '@/app/AppContext';
import TemplateDropDown from '@/app/DropDown/TemplateDropDown';

export default function TemplatesHeader() {
  const {
    selectedTemplatesObject: { selectedTemplate, setSelectedTemplate },
    allTemplatesObject: { allTemplates },
    openContentGeneratorFormObject: { setOpenContentGeneratorForm },
    contentGeneratedObject: { setContentGenerated }, 
  } = useAppContext();

  const [openDropDown, setOpenDropDown] = useState(false);
  const defaultSelectedTemplate = allTemplates[0];

  // 🟢 Set default template and reset content on mount or template change
  useEffect(() => {
    if (!selectedTemplate && defaultSelectedTemplate) {
      setContentGenerated(""); // Reset on initial load
      setSelectedTemplate({ ...defaultSelectedTemplate, isSelected: true });
    }
  }, [selectedTemplate, defaultSelectedTemplate, setSelectedTemplate, setContentGenerated]);

  // 🟠 Handle close action: Close form and reset generated content
  const handleClose = () => {
    setContentGenerated(""); // Clear right-side content on close
    setOpenContentGeneratorForm(false);
  };

  return (
    <div className='flex items-center justify-between gap-1 relative z-50'>
      {/* Left Side */}
      <div className='relative flex items-center gap-2'>
        <div className='bg-purple-200 p-2 rounded-md'>
          {(selectedTemplate || defaultSelectedTemplate)?.icon}
        </div>

        <div className='flex flex-col'>
          <button
            onClick={() => setOpenDropDown(!openDropDown)}
            className='text-[18px] text-slate-600 items-center flex gap-1 font-semibold'
          >
            <span className='hover:text-purple-600 cursor-pointer'>
              {(selectedTemplate || defaultSelectedTemplate)?.title}
            </span>
            {openDropDown ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
          </button>

          <span className='text-[10px] text-slate-400'>
            {(selectedTemplate || defaultSelectedTemplate)?.shortSubTitle}
          </span>
        </div>
      </div>

      {/* Dropdown Render */}
      {openDropDown && (
        <TemplateDropDown
          openDropDown={openDropDown}
          setOpenDropDown={setOpenDropDown}
        />
      )}

      {/* Close Icon */}
      <IoClose
        onClick={handleClose}
        className='mr-3 text-gray-500 cursor-pointer'
      />
    </div>
  );
}
