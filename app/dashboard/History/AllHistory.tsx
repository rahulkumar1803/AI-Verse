import React, { useContext, useState } from 'react'
import { useAppContext } from '@/app/AppContext'
import MainHeader from '../MainHeader'
import HistorySubHeader from './Components/HistorySubHeader';
import AllHistoryList from './Components/AllHistoryList';
import { SingleTemplate } from '@/app/types/AppTypes'
import { createContext } from 'react'
import { Toaster } from 'react-hot-toast';

export type SingleTemplateExtended = SingleTemplate & {
  isSelected: boolean;
}

interface AllHistoryPageInterface {
  selectedItemsObject: {
    selectedItems: SingleTemplateExtended[];
    setSelectedItems: React.Dispatch<React.SetStateAction<SingleTemplateExtended[]>>;
  };
}

const AllHistoryState = {
  selectedItemsObject: {
    selectedItems: [],
    setSelectedItems: () => { },
  },
};

const AllHistoryPageContext =
  createContext<AllHistoryPageInterface>(AllHistoryState);

export const useAllHistoryContext = () => {
  return useContext(AllHistoryPageContext);
};


function History() {
  const {
    isDarkModeObject: { isDarkMode },
    allTemplatesObject: { allTemplates },
  } = useAppContext();

  const [copyAllTemplates, setCopyAllTemplates] = useState<
    SingleTemplateExtended[]
  >(() => {
    return allTemplates.map((SingleTemplate) => {
      return { ...SingleTemplate, isSelected: false };
    });
  })

  const [selectedItems, setSelectedItems] = useState<SingleTemplateExtended[]>(
    []
  );
  return (
    <div
      className={`w-full min-h-screen ${!isDarkMode ? "bg-slate-50" : "bg-slate-700"
        }`}
    > 
      <AllHistoryPageContext.Provider
        value={{
          selectedItemsObject: { selectedItems, setSelectedItems },
        }}
      >
        <MainHeader />
        <HistorySubHeader />
        <AllHistoryList />
      </AllHistoryPageContext.Provider>
    </div>
  )
}

export default History;