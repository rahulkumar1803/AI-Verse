import React, { useState } from 'react'
import { LuHistory } from 'react-icons/lu'
import { MdDelete } from 'react-icons/md'
import { FaRegCopy, FaCopy } from 'react-icons/fa'
import { useAppContext } from '@/app/AppContext'
import toast from 'react-hot-toast'
import { HistoryData } from '@/app/types/AppTypes'

export function SingleHistoryItem({
  SingleHistory,
}: {
  SingleHistory: HistoryData;
}) {
  const {
    windowWidthObject: { windowWidth },
    allTemplatesObject: { allTemplates },
    openConfirmationWindowObject: { setOpenConfirmationWindow },
    selectedHistoryEntryObject: { setSelectedHistoryEntry },
  } = useAppContext();
  const [copyitem, setcopyitem] = useState(false);
  const isMobileView = windowWidth <= 694;

  function ActionsButtons() {
    return (
      <div className='flex gap-14 font-bold items-center justify-center'>
        <div className='flex gap-2 items-center justify-center'>
          <div
            onClick={() => {
              navigator.clipboard.writeText(SingleHistory.content).then(() => {
                toast.success("Content copied successfully");
                setcopyitem(true);
                setTimeout(() => setcopyitem(false), 2000);
              }).catch(() => {
                toast.error("Faild to copy this history content");
              });
            }}
            className='rounded-[4px] p-1 flex items-center justify-center cursor-pointer bg-slate-200 hover:bg-slate-300 transition-all'>
            {copyitem ? <FaCopy className='text-purple-600 text-[15px]' /> : <FaRegCopy className='text-purple-600 text-[15px]' />}


          </div>

          <div
            onClick={() => {
              setOpenConfirmationWindow(true);
              setSelectedHistoryEntry(SingleHistory)
            }}
            className='rounded-[4px] p-1 flex items-center justify-center cursor-pointer bg-slate-200 hover:bg-slate-300 transition-all'>
            <MdDelete className='text-purple-600 text-[15px]' />
          </div>
        </div>
      </div>
    );
  }

  function TemplateNameIcon() {
    const matchedTemplate = allTemplates.find(
      (template) => template.title === SingleHistory?.template
    );
    return (
      <div className='flex gap-2 items-center'>
        {!isMobileView && (
          <div className='bg-purple-200 rounded-md p-[7px] flex items-center justify-center'>
            {matchedTemplate?.icon || (
              <LuHistory className='text-[15px] text-purple-600' />
            )}
          </div>
        )}
        <div className='flex flex-col'>
          <span className='text-[13px] cursor-pointer max-sm:text-sm'>
            {SingleHistory.template || 'Untemplate'}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className='py-[18px] px-4 border-b border-x border-slate-200 '>
      <div className={`w-full grid text-slate-500 ${isMobileView ? 'grid-cols-4' : 'grid-cols-5'}`}>
        <TemplateNameIcon />

        <div>
          <span className='text-[13px]'>
            {SingleHistory.title || 'untitled'}
          </span>
        </div>

        {!isMobileView && (
          <div>
            <span className='text-[13px]'>
              {new Date(SingleHistory?.createdAt).toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
              })}
            </span>
          </div>
        )}

        <div>
          <span className={`text-[13px] ${isMobileView && 'ml-3'}`}>
            {SingleHistory?.totalWords || 0}
          </span>
        </div>

        <ActionsButtons />
      </div>
    </div>
  );
};

export default SingleHistoryItem;
