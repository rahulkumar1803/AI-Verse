import { prompts } from "./prompts";
import MainTopic from "./MainTopic";
import ToneOrStyle from "./ToneOrStyle";
import Audience from "./Audience";
import Keywords from "./OtherComponents/Keywords";
import LanguageSelector from "./OtherComponents/LanguageSelector";
import { SingleTemplate } from "@/app/types/AppTypes";
import { useAppContext } from "@/app/AppContext";

export async function generateContent(
  selectedTemplate: SingleTemplate | null,
  mainTopicInput: string,
  toneOrStyleInput: string,
  selectLanguage: string,
  audienceInput: string,
  keywords: string[],
) {
  let prompt = "";
  let theTitle = "";

  switch (selectedTemplate?.title) {
    case "Post Title":
    case "Blog Tags":
    case "Youtube Hashtags":
      prompt = prompts[selectedTemplate.title].content(mainTopicInput, toneOrStyleInput);
      theTitle = prompts[selectedTemplate.title].title(mainTopicInput);
      break;

    case "Code Generator":
      prompt = prompts["Code Generator"].content(mainTopicInput, selectLanguage);
      theTitle = prompts["Code Generator"].title(mainTopicInput);
      break;

    case "Email Newsletter":
    case "Question & Answer":
    case "Facebook Snippet":
      prompt = prompts[selectedTemplate.title].content(mainTopicInput, toneOrStyleInput, audienceInput);
      theTitle = prompts[selectedTemplate.title].title(mainTopicInput);
      break;

    case "Text Summarizer":
    case "Content Rewriter":
    case "Product Description":
    case "Paragraph Text":
      prompt = prompts[selectedTemplate.title].content(mainTopicInput, toneOrStyleInput);
      theTitle = prompts[selectedTemplate.title].title(mainTopicInput);
      break;

    default:
      console.log("`Unknown template`");
      break;
  }

  const content: string = await new Promise((resolve) => {
    setTimeout(() => {
      const exampleCode = `
      // This is a simple function to calculate the sum of two numbers
      function sum(a, b) {
          return a + b;
      }

      // Calling the function with values 5 and 3
      const result = sum(5, 3);

      // Outputting the result to the console
      console.log("The sum is:", result); // Output: The sum is: 8

      /*
        Multi-line Comment:
        This example demonstrates how to define and use a basic function in JavaScript.
        The sum function adds two numbers and returns the result and fun.
      */
    `;
      resolve(exampleCode);
    }, 1200);
  });


  return { theTitle, prompt, content };
}

export default function renderFormFields() {
  const {
    selectedTemplatesObject: { selectedTemplate },
  } = useAppContext();

  switch (selectedTemplate?.title) {
    case "Post Title":
    case "Paragraph Text":
      return (
        <>
          <MainTopic label="Blog Post Topic" placeholder="Enter your Blog Post" />
          <ToneOrStyle />
        </>
      );
    case "Product Name":
      return (
        <>
          <MainTopic label="Product Name" placeholder="Enter your product" />
          <ToneOrStyle />
        </>
      );
    case "Blog Tags":
      return (
        <>
          <MainTopic label="Blog Post Topic" placeholder="Enter your blog topic" />
          <ToneOrStyle />
        </>
      );
    case "Youtube Hashtags":
      return (
        <>
          <MainTopic label="Video Topic" placeholder="Enter your video title or topic" />
          <Audience />
        </>
      );
    case "Text Summarizer":
      return <MainTopic label="Text to Summarize" placeholder="Paste text here" />;
    case "Content Rewriter":
      return (
        <>
          <MainTopic label="Content to Rewrite" placeholder="Paste your content here" />
          <ToneOrStyle />
        </>
      );
    case "Email Newsletter":
    case "Question & Answer":
      return (
        <>
          <MainTopic label="Page Content" placeholder="Enter your topic" />
          <ToneOrStyle />
        </>
      );
    case "Facebook Snippet":
      return (
        <>
          <MainTopic label="Post Topic" placeholder="Enter your post topic" />
          <ToneOrStyle />
          <Audience />
        </>
      );
    case "Code Generator":
      return (
        <>
          <MainTopic label="Programming Task" placeholder="Describe the task" />
          <LanguageSelector />
        </>
      );
    default:
      return (
        <>
          <MainTopic label="Blog Post Topic" placeholder="Enter your Blog Post" />
          <ToneOrStyle />
          <Audience />
        </>
      );
  }
}
