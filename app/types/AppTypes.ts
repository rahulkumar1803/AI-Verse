import { Dispatch, ReactNode } from "react";
import { SingleTemplateExtended } from "../dashboard/History/AllHistory";
import { v4 as uuidv4 } from "uuid"; // for reference, not in the type



export type SingleFilteringItem = {
    id: number;
    name: string;
    icon: React.ReactNode;
    isSelected: Boolean;
    templates: string[];
};

export type HistoryData = {
    id: string;                 // Should be set using uuidv4()
    clerkUserId: string;
    template: string,
    title: string;
    createdAt: string;
    totalWords: number;
    content: string;
};


export type BaseMenuItem = {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    label: string;
};

export type MenuItem = BaseMenuItem & {
    isSelected: boolean;
};

export type SecondMenuItem = Omit<MenuItem, "isSelected">;

export type StatsDropDownItem = {
    id: number;
    icon: React.ReactNode; // React element directly
    title: string;
    value: string;
    isSelected: boolean;
};

export type DaysDropDownItem = {
    id: number,
    title: string,
    icon: ReactNode,
    isSelected: boolean,
}

export type SingleTemplate = {
    id: number,
    title: string,
    icon: React.ReactNode,
    totalWordsCount: number,
    description: string,
    isFavorite: boolean,
    shortSubTitle: string,
    isForPro: boolean;
}

// ✅ Define the type for the new fake user state
export type User = {
    isPro: boolean;
    cumulativeWords: number;
    firstName: string,
    lastName: string,
    userId: string,
    imageUrl: string,
};


export type AppType = {
    selectedTemplatesObject: {
        selectedTemplate: SingleTemplateExtended | null;
        setSelectedTemplate: React.Dispatch<React.SetStateAction<SingleTemplateExtended | null>>;
    };


    openContentGeneratorFormObject: {
        openContentGeneratorForm: boolean;
        setOpenContentGeneratorForm: Dispatch<React.SetStateAction<boolean>>;
    };

    templateFilteringItemObject: {
        templatesFilteringItems: SingleFilteringItem[],
        setTemplatesFilteringItems: React.Dispatch<React.SetStateAction<SingleFilteringItem[]>>;
    }
    allHistoryDataObject: {
        allHistoryData: HistoryData[];
        setAllHistoryData: React.Dispatch<React.SetStateAction<HistoryData[]>>;
    };
    allTemplatesObject: {
        allTemplates: SingleTemplate[];
        setAllTemplates: Dispatch<React.SetStateAction<SingleTemplate[]>>;
    };
    templatesForDropDownObject: {
        templatesForDropDown: SingleTemplateExtended[];
        setTemplatesForDropDown: React.Dispatch<React.SetStateAction<SingleTemplateExtended[]>>;
    };

    mainMenuItemsObject: {
        mainMenuItmes: MenuItem[];
        setMainMenuItems: Dispatch<React.SetStateAction<MenuItem[]>>;
    };

    secondMenuItemsObject: {
        secondMenuItems: SecondMenuItem[];
        setSecondMenuItems: Dispatch<React.SetStateAction<SecondMenuItem[]>>;
    };

    isDarkModeObject: {
        isDarkMode: boolean;
        setIsDarkMode: Dispatch<React.SetStateAction<boolean>>;
    };

    isSideBarHiddenObject: {
        isSideBarHidden: boolean;
        setIsSideBarHidden: Dispatch<React.SetStateAction<boolean>>;
    };

    stretchSideBarObject: {
        stretchSideBar: boolean;
        setStretchSideBar: Dispatch<React.SetStateAction<boolean>>;
    };

    windowWidthObject: {
        windowWidth: number;
        setWindowWidth: Dispatch<React.SetStateAction<number>>;
    };

    statsDropDownItemObject: {
        statsData: StatsDropDownItem[];
        setStatsData: Dispatch<React.SetStateAction<StatsDropDownItem[]>>;
    };

    daysDropDownObject: {
        daysDropDown: DaysDropDownItem[];
        setDaysDropDown: Dispatch<React.SetStateAction<DaysDropDownItem[]>>;
    };
    contentGeneratedObject: {
        contentGenerated: string;
        setContentGenerated: React.Dispatch<React.SetStateAction<string>>;
    };

    openConfirmationWindowObject: {
        openConfirmationWindow: boolean;
        setOpenConfirmationWindow: Dispatch<React.SetStateAction<boolean>>;
    };

    selectedHistoryEntryObject: {
        selectedHistoryEntry: HistoryData | null;
        setSelectedHistoryEntry: Dispatch<React.SetStateAction<HistoryData | null>>;
    };

    // ✅ Add the new fakeUserObject to your main context type
    fakeUserObject: {
        fakeUser: User;
        setFakeUser: React.Dispatch<React.SetStateAction<User>>;
    };
};