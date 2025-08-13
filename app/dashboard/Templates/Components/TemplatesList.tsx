import React from 'react'
import { useAppContext } from '@/app/AppContext'
import TemplateSingleCard from './TemplateSingleCard'
import { useState } from 'react'
import { SingleFilteringItem, SingleTemplate } from '@/app/types/AppTypes'

export default function TemplatesList() {
    const {
        allTemplatesObject: { allTemplates, setAllTemplates },
        templateFilteringItemObject: { templatesFilteringItems },
        isDarkModeObject: { isDarkMode, setIsDarkMode },
        windowWidthObject: { windowWidth },
    } = useAppContext();
    function filteringTemplates(): SingleTemplate[] {
        const getTemplatesnamesSelected: SingleFilteringItem | undefined =
            templatesFilteringItems.find((singleItem) => singleItem.isSelected);

        if (getTemplatesnamesSelected?.name === "All Templates") {
            return allTemplates;
        } else {
            return allTemplates.filter((singleTemplate) =>
                getTemplatesnamesSelected?.templates.includes(
                    singleTemplate.title.toLowerCase()
                )
            );
        }
    }

    function updateGrid(): string {
        if (windowWidth < 505) {
            return "grid-cols-1";
        }
        else if (windowWidth < 834) {
            return "grid-cols-2";
        }
        else if (windowWidth < 1350) {
            return "grid-cols-3";
        }
        else if (windowWidth < 834) {
            return "grid-cols-2";
        }
        return "grid-cols-4";
    }

    return (
        <div
            className={`mx-4 p-7 ${!isDarkMode && "border-slate-200 border"} gap-3 grid ${updateGrid()}`}
        >
            {filteringTemplates().map(
                (singleTemplate: SingleTemplate, index: number) => (
                    <TemplateSingleCard key={index} singleTemplate={singleTemplate} />
                )
            )}
        </div>
    )
}
