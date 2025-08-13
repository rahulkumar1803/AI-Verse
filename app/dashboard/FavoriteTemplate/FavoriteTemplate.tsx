import React from 'react'
import { useAppContext } from '@/app/AppContext'
import MainHeader from '../MainHeader'
import FavTemplatesList from './Components/FavTemplateList';

function FavoriteTemplate (){
    const {
        isDarkModeObject: {isDarkMode}
    }= useAppContext();
  return (
    <div
     className={`w-full min-h-screen ${
        !isDarkMode ? "bg-slate-50" : "bg-slate-700"
     }`}
    >
        <MainHeader />
        <FavTemplatesList />
    </div>
  )
}

export default FavoriteTemplate;