// prompts.ts

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PromptFunction = (...args: any[]) => string;

interface Prompts {
    [key: string]: {
        content: PromptFunction;
        title: PromptFunction;
    };
}

export const prompts: Prompts = {
    'Post Title': {
        content: (mainTopic: string, toneOrStyle: string) =>
            `Generate a catchy post title about "${mainTopic}" with a ${toneOrStyle} tone.`,
        title: () => 'Generated Post Title',
    },

    'Blog Tags': {
        content: (mainTopic: string) =>
            `Suggest relevant blog tags for a post about "${mainTopic}".`,
        title: (mainTopic: string) => `Tags for "${mainTopic}" Blog Post`,
    },

    'Youtube Hashtags': {
        content: (mainTopic: string) =>
            `Create popular and relevant YouTube hashtags for a video about "${mainTopic}".`,
        title: (mainTopic: string) => `Hashtags for "${mainTopic}" YouTube Video`,
    },

    'Code Generator': {
        content: (mainTopic: string, language: string) =>
            `Generate ${language} code for the following task: ${mainTopic}.Give me code only do not give the unnecessary comments
        or explanations just provide with the code.`,
        title: (mainTopic: string, language: string) =>
            `${language} Code for ${mainTopic}`,
    },


    'Email Newsletter': {
        content: (mainTopic: string, toneOrStyle: string, audience?: string) =>
            `Write an email newsletter about "${mainTopic}" with a ${toneOrStyle} tone${audience ? ` targeted at ${audience}` : ''
            }.`,
        title: (mainTopic: string) => `Email Newsletter: ${mainTopic}`,
    },

    'Question & Answer': {
        content: (mainTopic: string, toneOrStyle: string, audience?: string) =>
            `Create a Q&A session about "${mainTopic}" with a ${toneOrStyle} tone${audience ? ` for ${audience}` : ''
            }.`,
        title: (mainTopic: string) => `Q&A: ${mainTopic}`,
    },

    'Text Summarizer': {
        content: (mainTopic: string, toneOrStyle: string) =>
            `Summarize the following text about "${mainTopic}" in a ${toneOrStyle} tone: [Insert text to summarize]`,
        title: (mainTopic: string) => `Summary of ${mainTopic}`,
    },

    'Content Rewriter': {
        content: (mainTopic: string, toneOrStyle: string) =>
            `Rewrite the following content about "${mainTopic}" in a ${toneOrStyle} tone: [Insert content to rewrite]`,
        title: (mainTopic: string) => `Rewritten Content: ${mainTopic}`,
    },

    'Product Description': {
        content: (mainTopic: string, toneOrStyle: string) =>
            `Write a product description for "${mainTopic}" using a ${toneOrStyle} tone.`,
        title: (mainTopic: string) => `Product Description: ${mainTopic}`,
    },

    'Facebook Snippet': {
        content: (mainTopic: string, toneOrStyle: string, audience?: string) =>
            `Write a Facebook post about "${mainTopic}" in a ${toneOrStyle} tone${audience ? ` for ${audience}` : ''
            }.`,
        title: (mainTopic: string) => `Facebook Post: ${mainTopic}`,
    },

    'Paragraph Text': {
        content: (mainTopic: string, toneOrStyle: string) =>
            `Write a paragraph about "${mainTopic}" in a ${toneOrStyle} tone.`,
        title: (mainTopic: string) => `Paragraph about ${mainTopic}`,
    },
};
