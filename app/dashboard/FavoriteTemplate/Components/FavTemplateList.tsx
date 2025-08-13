import React from 'react';
import { useAppContext } from '@/app/AppContext';
import TemplateSingleCard from '../../Templates/Components/TemplateSingleCard';
import { SingleTemplate } from '@/app/types/AppTypes';

export default function FavTemplatesList() {
  const {
    allTemplatesObject: { allTemplates },
    isDarkModeObject: { isDarkMode },
    windowWidthObject: { windowWidth },
  } = useAppContext();

  function updateGrid(): string {
    if (windowWidth < 505) return 'grid-cols-1';
    else if (windowWidth < 834) return 'grid-cols-2';
    else if (windowWidth < 1350) return 'grid-cols-3';
    return 'grid-cols-4';
  }

  return (
    <div
      className={`mx-4 p-7 gap-3 grid ${updateGrid()}`}
    >
      {allTemplates
        .filter((template: SingleTemplate) => template.isFavorite) // ✅ Only show favorite templates
        .map((singleTemplate: SingleTemplate, index: number) => (
          <TemplateSingleCard key={index} singleTemplate={singleTemplate} />
        ))}
    </div>
  );
}
