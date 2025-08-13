import React from 'react'
import { useAppContext } from '@/app/AppContext'
import MainHeader from '../MainHeader'
import TemplatesSubHeader from './Components/TemplatesSubHeader';
import TemplatesList from './Components/TemplatesList';

function AllTemplates (){
    const {
        isDarkModeObject: {isDarkMode}
    }= useAppContext();
  return (
    <div
     className={`w-full h-screen flex-1 overflow-y-auto ${
        !isDarkMode ? "bg-slate-50" : "bg-slate-700"
     }`}
    >
        <MainHeader />
        <TemplatesSubHeader />
        <TemplatesList />
    </div>
  )
}

export default AllTemplates;