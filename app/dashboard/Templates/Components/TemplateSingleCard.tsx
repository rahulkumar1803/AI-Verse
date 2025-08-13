import { useAppContext } from "@/app/AppContext"
import { SingleTemplate } from "@/app/types/AppTypes"
import { FaHeart } from "react-icons/fa"
import { MdArticle } from "react-icons/md"
import { GiRoundStar } from "react-icons/gi"

export default function TemplateSingleCard({
  singleTemplate,
}: {
  singleTemplate: SingleTemplate;
}) {
  const {
    selectedTemplatesObject: { selectedTemplate, setSelectedTemplate },
    isDarkModeObject: { isDarkMode },
    openContentGeneratorFormObject: { openContentGeneratorForm, setOpenContentGeneratorForm },
    allTemplatesObject: { allTemplates, setAllTemplates },
    fakeUserObject: { fakeUser, setFakeUser },
    mainMenuItemsObject: { mainMenuItmes, setMainMenuItems },
  } = useAppContext();

  const toggleFavorite = () => {
    setAllTemplates((prevTemplates) =>
      prevTemplates.map((template) =>
        template.id === singleTemplate.id
          ? { ...template, isFavorite: !template.isFavorite }
          : template
      )
    );
  };

  function gotoTheProPlanPage() {
    setMainMenuItems((prevItem) =>
      prevItem.map((singleItem) => ({
        ...singleItem,
        isSelected: singleItem.label === "Subscription" ? true : false,
      }))
    );
  }
  return (
    <div
      className={`${isDarkMode
        ? "bg-slate-800 text-white"
        : "bg-white border border-slate-100"
        } p-5 flex flex-col justify-between gap-2 rounded-l-lg h-[210px]`}
    >
      {/* Icon and Title */}
      <div className=" flex items-center">
        <div className="bg-purple-100 p-2 rounded-xl">
          {singleTemplate.icon}
        </div>
        <div className="relative">
          {!fakeUser.isPro && (
            <>
              {singleTemplate.isForPro && (
                <GiRoundStar className="text-purple-600 text-[10px] absolute right-[-17px] top-[8px]" />
              )}
            </>
          )}
          <h2
            onClick={() => {
              if (!fakeUser.isPro) {
                if (fakeUser.cumulativeWords >= 1000) {
                  gotoTheProPlanPage();
                  return;
                }

                if (!singleTemplate.isForPro) {
                  setSelectedTemplate({ ...singleTemplate, isSelected: false })
                  setOpenContentGeneratorForm(true)
                } else {
                  gotoTheProPlanPage();
                }
              }
              else {
                setSelectedTemplate({ ...singleTemplate, isSelected: false })
                setOpenContentGeneratorForm(true)
              }
            }}

            className="ml-4 text-[16px] font-semibold hover:text-purple-600 cursor-pointer"
          >
            {singleTemplate.title}
          </h2>
        </div>
      </div>

      {/* Desc */}
      <p className="text-slate-600 mt-2 text-[12px]">
        {singleTemplate.description}
      </p>

      <div className="flex justify-between items-center">
        {/* Words generated */}
        <p className="text-slate-400 text-[12px] mt-4 ">
          {singleTemplate.totalWordsCount} Words Generated
        </p>

        {/* fav Icon */}
        <div className="fl *: justify-end mt-4 cursor-pointer">
          <FaHeart
            onClick={toggleFavorite}
            className={`text-[12px] ${singleTemplate?.isFavorite ? "text-red-500" : "text-gray-300"}`} />
        </div>
      </div>

    </div>
  );
}