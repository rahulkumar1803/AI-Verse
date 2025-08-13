import { useContentGeneratorForm } from "../LeftSectionContext";
import { useAppContext } from "@/app/AppContext";
const LanguageSelector = () => {
  const {
    selectLanguageObject: { selectLanguage, setSelectLanguage },
    errorsObject: { errors, setErrors },
  } = useContentGeneratorForm();
  const {
    isDarkModeObject : {isDarkMode}
  } = useAppContext();
  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectLanguage(event.target.value);
    setErrors((prevErrors) =>
      prevErrors.map((error) => ({
        ...error,
        show: error.label === "selectedLanguage" ? false : error.show,
      }))
    );
  };

  const getIndexSelectedLanguageError = errors.findIndex(
    (error) => error.label === "selectedLanguage"
  );

  return (
    <div className="mb-4">
      <label
        htmlFor="language"
        className="text-[14px] font-medium text-slate-400 mb-[7px]"
      >
        Select Programming Language
      </label>
      <select
        id="language"
        value={selectLanguage}
        onChange={handleLanguageChange}
        className={`mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm text-slate-400 ${
          isDarkMode ? "bg-slate-700" : "bg-slate-50"
        }`}
      >
        <option value="">-- Select Language --</option>
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
        <option value="csharp">C#</option>
        <option value="ruby">Ruby</option>
        <option value="php">PHP</option>
        <option value="typescript">TypeScript</option>
        <option value="go">Go</option>
      </select>
        {errors[getIndexSelectedLanguageError].show && (
          <span className="text-sm text-red-600 mt-1">
            {errors[getIndexSelectedLanguageError].message}
          </span>
        )}
    </div>
  );
};

export default LanguageSelector;
