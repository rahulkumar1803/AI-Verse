import { AiOutlineFileText, AiFillProduct } from "react-icons/ai";
import { MdOutlineTitle } from "react-icons/md";
import { BiHeading, BiMessageAltEdit } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import { RiQuestionAnswerLine } from "react-icons/ri";
import { FaFacebook, FaCode } from "react-icons/fa";
import { FaHashtag } from "react-icons/fa6";
import { BsTextParagraph } from "react-icons/bs";
import { SingleTemplate } from "../types/AppTypes";

const iconStyle = "text-[17px] text-purple-600";

export const templatesArray: SingleTemplate[] = [
  {
    id: 1,
    title: "Post Title",
    icon: <MdOutlineTitle className={iconStyle} />,
    totalWordsCount: 345,
    description: "Generate engaging post titles for blogs, articles, and social posts.",
    isFavorite: false,
    shortSubTitle: "Create catchy post titles easily.",
    isForPro: false,
  },
  {
    id: 2,
    title: "Blog Tags",
    icon: <AiOutlineFileText className={iconStyle} />,
    totalWordsCount: 217,
    description: "Get SEO-optimized tags for your blog content.",
    isFavorite: true,
    shortSubTitle: "Generate relevant blog tags.",
    isForPro: false,
  },
  {
    id: 3,
    title: "Youtube Hashtags",
    icon: <FaHashtag className={iconStyle} />,
    totalWordsCount: 189,
    description: "Get trending and relevant hashtags for YouTube videos.",
    isFavorite: false,
    shortSubTitle: "Boost visibility with the right hashtags.",
    isForPro: false,
  },
  {
    id: 10,
    title: "Code Generator",
    icon: <FaCode className={iconStyle} />,
    totalWordsCount: 612,
    description: "Generate code snippets based on functionality.",
    isFavorite: false,
    shortSubTitle: "Let AI handle repetitive coding.",
    isForPro: false,
  },
  {
    id: 6,
    title: "Email Newsletter",
    icon: <HiOutlineMail className={iconStyle} />,
    totalWordsCount: 764,
    description: "Write effective newsletters for your audience.",
    isFavorite: true,
    shortSubTitle: "Keep your subscribers engaged.",
    isForPro: false,
  },
  {
    id: 4,
    title: "Text Summarizer",
    icon: <BiHeading className={iconStyle} />,
    totalWordsCount: 402,
    description: "Create clean, keyword-rich headings for any section.",
    isFavorite: false,
    shortSubTitle: "Highlight content sections clearly.",
    isForPro: true,
  },
  {
    id: 5,
    title: "Content Rewriter",
    icon: <BiMessageAltEdit className={iconStyle} />,
    totalWordsCount: 583,
    description: "Edit and refine your content before publishing.",
    isFavorite: false,
    shortSubTitle: "Polish your writing.",
    isForPro: true,
  },
  {
    id: 7,
    title: "Question & Answer",
    icon: <RiQuestionAnswerLine className={iconStyle} />,
    totalWordsCount: 501,
    description: "Generate questions and answers for interviews or FAQs.",
    isFavorite: false,
    shortSubTitle: "Create useful Q&A formats.",
    isForPro: true,
  },
  {
    id: 8,
    title: "Facebook Snippet",
    icon: <FaFacebook className={iconStyle} />,
    totalWordsCount: 276,
    description: "Write engaging snippets for Facebook posts.",
    isFavorite: false,
    shortSubTitle: "Connect with your audience on Facebook.",
    isForPro: true,
  },
  {
    id: 9,
    title: "Product Name",
    icon: <AiFillProduct className={iconStyle} />,
    totalWordsCount: 134,
    description: "Generate brandable and creative product names.",
    isFavorite: false,
    shortSubTitle: "Name your product with impact.",
    isForPro: true,
  },
  {
    id: 11,
    title: "Paragraph Text",
    icon: <BsTextParagraph className={iconStyle} />,
    totalWordsCount: 859,
    description: "Generate well-written paragraphs for your content.",
    isFavorite: false,
    shortSubTitle: "Auto-generate readable content.",
    isForPro: true,
  },
];