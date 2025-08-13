import React, { use, useEffect } from "react";
import { useAppContext } from "@/app/AppContext";
import { countWords } from "../../ContentGenerator/LeftSection/LeftSection";

function RemainingWords() {
    const {
        allHistoryDataObject: { allHistoryData },
        mainMenuItemsObject: { setMainMenuItems },
        contentGeneratedObject: { contentGenerated },
        fakeUserObject: { fakeUser, setFakeUser },
    } = useAppContext();
    const totalWords = allHistoryData.reduce(
        (sum, singleHistory) => sum + singleHistory.totalWords,
        0
    );
    const challengeText = "AI-Generated Content";
    const progressText = `${fakeUser.cumulativeWords} / ${!fakeUser.isPro ? "1000" : "100,000"} Words generated`
    const upgradeButtonText = "Upgrade to pro";
    function progressBarCalculation() {
        const divider = !fakeUser.isPro ? 1000 : 100000;
        const results = (fakeUser.cumulativeWords / divider) * 100;

        if (results >= 100) {
            return 100;
        }
        return results;
    }

    useEffect(() => {
        const wordCountContentGenerated = countWords(contentGenerated)

        setFakeUser((prevUser) => {
            return {
                ...prevUser,
                cumulativeWords: prevUser.cumulativeWords + wordCountContentGenerated,
            };
        });
    }, [contentGenerated]);
    return (
        <div
            className={`p-[18px] rounded-lg shadow-md mt-24 mx-2 bg-gradient-to-r from-purple-600 to-purple-400`}
        >
            <h3 className="text-[15px] font-semibold mb-2 text-white" >
                {challengeText}
            </h3>
            <div className="w-full  bg-gray-300 rounded-full h-1.5 mt-5 mb-2">
                <div
                    className="bg-white h-1.5 rounded-full"
                    style={{ width: `${progressBarCalculation()}%` }}
                ></div>
            </div>
            <p className="text-[10px] text-white mb-5">{progressText}</p>
            {!fakeUser.isPro && (
                <button
                    onClick={() => {
                        setMainMenuItems((prevItems) =>
                            prevItems.map((item) =>
                                item.label === "Subscription"
                                    ? { ...item, isSelected: true }
                                    : { ...item, isSelected: false }
                            )
                        );
                    }}
                    className="w-full text-[10px] bg-white text-purple-600 py-2 px-4 rounded-md hover:bg-slate-400">
                    {upgradeButtonText}
                </button>
            )}
        </div>
    );
}

export default RemainingWords;