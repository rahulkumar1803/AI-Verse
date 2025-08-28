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
  keywords: string[] // This parameter is kept for potential future use
) {
  // 1. Initial check to ensure a template is selected
  if (!selectedTemplate?.title || !prompts[selectedTemplate.title]) {
    console.error("Unknown or null template:", selectedTemplate);
    return {
      theTitle: "Error",
      prompt: "",
      content: "Please select a valid template to begin.",
    };
  }

  let prompt = "";
  let theTitle = "";
  const templateConfig = prompts[selectedTemplate.title];

  // 2. Build the prompt and title using the selected template's functions
  // This switch statement correctly passes the required arguments for each case.
  switch (selectedTemplate.title) {
    case "Post Title":
    case "Text Summarizer":
    case "Content Rewriter":
    case "Product Description":
    case "Paragraph Text":
      prompt = templateConfig.content(mainTopicInput, toneOrStyleInput);
      theTitle = templateConfig.title(mainTopicInput);
      break;

    case "Blog Tags":
    case "Youtube Hashtags":
      prompt = templateConfig.content(mainTopicInput);
      theTitle = templateConfig.title(mainTopicInput);
      break;

    case "Code Generator":
      prompt = templateConfig.content(mainTopicInput, selectLanguage);
      theTitle = templateConfig.title(mainTopicInput, selectLanguage);
      break;

    case "Email Newsletter":
    case "Question & Answer":
    case "Facebook Snippet":
      prompt = templateConfig.content(mainTopicInput, toneOrStyleInput, audienceInput);
      theTitle = templateConfig.title(mainTopicInput);
      break;

    default:
      // This case should ideally not be reached if the template is valid
      return {
        theTitle: "Template Not Handled",
        prompt: "",
        content: `The selected template "${selectedTemplate.title}" is not configured in generateContent function.`,
      };
  }

  // 3. Call the backend API route with the generated prompt
  try {
    const response = await fetch('/api/generate', { // Assumes your API route is at '/api/gemini'
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      // Handle HTTP errors like 404 or 500
      const errorText = await response.text();
      throw new Error(`API call failed with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const content: string = data.text; // Extract the generated text from the response

    // 4. Return the complete result object
    return { theTitle, prompt, content };

  } catch (error) {
    console.error("Failed to generate content via API:", error);
    return {
      theTitle,
      prompt,
      content: "Sorry, an error occurred while communicating with the AI. Please check the console for details.",
    };
  }
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
