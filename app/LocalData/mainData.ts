import { v4 as uuidv4 } from "uuid";
import { HistoryData } from "../types/AppTypes";

import { resolveValue } from "react-hot-toast"; // Assuming this import is needed


const countWords = (str: string) => str.trim().split(/\s+/).length;

export const formatAndAggregateTotalCount = (historyData: HistoryData[]) => {
    // Create a map to store word counts by date
    const dateWordMap: { [key: string]: number } = {};

    historyData.forEach((item) => {
        const date = new Date(item.createdAt);
        const formattedDate = date.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });

        const wordCount = countWords(item.content);

        // Add word count to the existing date or create a new entry
        if (dateWordMap[formattedDate]) {
            dateWordMap[formattedDate] += wordCount;
        } else {
            dateWordMap[formattedDate] = wordCount;
        }
    });

    return Object.entries(dateWordMap).map(([name, value]) => ({
        name,
        value,
    }));
};


type DataPoint = {
    name: string; // The formatted date string
    value: number; // The value associated with that date (total words, documents, etc.)
};

// Function to sort and shorten month names
export const sortAndShortenMonth = (data: DataPoint[]): DataPoint[] => {
    const monthShortenings: { [key: string]: string } = {
        "January": "Jan.",
        "February": "Feb.",
        "March": "Mar.",
        "April": "Apr.",
        "May": "May",
        "June": "Jun.",
        "July": "Jul.",
        "August": "Aug.",
        "September": "Sept.",
        "October": "Oct.",
        "November": "Nov.",
        "December": "Dec."
    };

    return data
        .map((item) => {
            let shortenedName = item.name;
            // Iterate through the monthShortenings to replace full month names
            for (const fullMonth in monthShortenings) {
                if (shortenedName.includes(fullMonth)) {
                    shortenedName = shortenedName.replace(fullMonth, monthShortenings[fullMonth]);
                    break; // Assuming only one month name per string
                }
            }
            return { ...item, name: shortenedName };
        })
        .sort((a, b) => {
            const dateA = new Date(a.name);
            const dateB = new Date(b.name);

            return dateA.getTime() - dateB.getTime();
        });
};

// Function to format and count documents generated
export const formatAndCountDocuments = (historyData: HistoryData[]) => {
    // Create a map to store document counts by date
    const dateDocMap: { [key: string]: number } = {};

    historyData.forEach((item) => {
        const date = new Date(item.createdAt);
        const formattedDate = date.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });

        // Increment document count for the existing date or create a new entry
        if (dateDocMap[formattedDate]) {
            dateDocMap[formattedDate] += 1;
        } else {
            dateDocMap[formattedDate] = 1;
        }
    });

    // Convert the map into the desired format, using 'value' instead of 'docGenerated'
    return Object.entries(dateDocMap).map(([name, value]) => ({
        name,
        value, // Use 'value' for consistency
    }));
};

// Function to format and aggregate time saved
export const formatAndAggregateTimeSaved = (historyData: HistoryData[]) => {
    const dateTimeMap: { [key: string]: number } = {};

    historyData.forEach((item) => {
        const date = new Date(item.createdAt);
        const formattedDate = date.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });

        const timeSaved = item.totalWords / 40;

        // Add time saved to the existing date or create a new entry
        if (dateTimeMap[formattedDate]) {
            dateTimeMap[formattedDate] += timeSaved;
        } else {
            dateTimeMap[formattedDate] = timeSaved;
        }
    });

    // Convert the map into the desired format, changing 'value' to 'totalTimeSaved'
    const aggregatedData = Object.entries(dateTimeMap).map(([name, totalTimeSaved]) => ({
        name,
        totalTimeSaved, // Use totalTimeSaved instead of docGenerated
    }));

    // Use the sortAndShortenMonth function to sort and shorten month names
    return sortAndShortenMonth(
        aggregatedData.map((item) => ({
            name: item.name,
            value: item.totalTimeSaved, // Use value as totalTimeSaved
        }))
    );
};

// Function to format and aggregate average words (per document on a given day)
export const formatAndAggregateAverageWords = (historyData: HistoryData[]) => {
    const dateWordMap: { [key: string]: { totalWords: number; docCount: number } } = {};

    historyData.forEach((item) => {
        const date = new Date(item.createdAt);
        const formattedDate = date.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });

        const wordsCount = item.totalWords || 0;

        if (dateWordMap[formattedDate]) {
            dateWordMap[formattedDate].totalWords += wordsCount;
            dateWordMap[formattedDate].docCount += 1;
        } else {
            dateWordMap[formattedDate] = { totalWords: wordsCount, docCount: 1 };
        }
    });


    // Convert the map into the desired format
    const aggregatedData = Object.entries(dateWordMap).map(([name, { totalWords, docCount }]) => {
        const averageWords = docCount > 0 ? totalWords / docCount : 0; // Calculate average
        return {
            name,
            averageWords, // Use averageWords instead of words or docGenerated
        };
    }
    );

    return sortAndShortenMonth(
        aggregatedData.map((item) => ({
            name: item.name,
            value: item.averageWords,
        }))
    )
};

export const newHistoryData: HistoryData[] = [
  {
    id: uuidv4(),
    clerkUserId: "123",
    template: "Post Title",
    title: "5 Creative Titles for Marketing Blogs",
    createdAt: "2025-07-19T09:30:00",
    totalWords: 140,
    content: "Here are some catchy titles for your marketing blog...",
  },
  {
    id: uuidv4(),
    clerkUserId: "123",
    template: "Blog Tags",
    title: "SEO Tags for AI Content",
    createdAt: "2025-07-20T09:45:00",
    totalWords: 80,
    content: "AI, machine learning, GPT, OpenAI, LLM...",
  },
  {
    id: uuidv4(),
    clerkUserId: "123",
    template: "Youtube Hashtags",
    title: "Hashtags for Tech Unboxing Video",
    createdAt: "2025-07-21T10:00:00",
    totalWords: 95,
    content: "#Tech #Unboxing #Gadgets #Review #LatestTech...",
  },
  {
    id: uuidv4(),
    clerkUserId: "123",
    template: "Text Summarizer",
    title: "Summary of Elon Musk's Biography",
    createdAt: "2025-07-22T10:15:00",
    totalWords: 102,
    content: "Elon Musk is a visionary entrepreneur known for...",
  },
  {
    id: uuidv4(),
    clerkUserId: "123",
    template: "Content Rewriter",
    title: "Rewritten Paragraph for Product Page",
    createdAt: "2025-07-23T10:25:00",
    totalWords: 150,
    content: "Experience unmatched clarity and performance with...",
  },
  {
    id: uuidv4(),
    clerkUserId: "123",
    template: "Email Newsletter",
    title: "Weekly Dev Digest - Issue #12",
    createdAt: "2025-07-24T10:35:00",
    totalWords: 300,
    content: "Welcome back, developers! This week we cover...",
  },
  {
    id: uuidv4(),
    clerkUserId: "123",
    template: "Question & Answer",
    title: "Interview Prep - React Basics",
    createdAt: "2025-07-25T10:40:00",
    totalWords: 190,
    content: "Q: What is React?\nA: React is a JavaScript library for UI...",
  },
  {
    id: uuidv4(),
    clerkUserId: "123",
    template: "Facebook Snippet",
    title: "Engaging Line for Product Launch",
    createdAt: "2025-07-26T10:50:00",
    totalWords: 60,
    content: "Get ready for a revolution — our new AI tool is here!",
  },
  {
    id: uuidv4(),
    clerkUserId: "123",
    template: "Product Name",
    title: "Name Ideas for a Fitness App",
    createdAt: "2025-07-27T11:00:00",
    totalWords: 30,
    content: "FitTrack, PulsePro, GymSync...",
  },
  {
    id: uuidv4(),
    clerkUserId: "123",
    template: "Code Generator",
    title: "React Component for Modal",
    createdAt: "2025-07-28T11:10:00",
    totalWords: 110,
    content: "const Modal = () => { return (<div className='modal'>...</div>); };",
  },
  {
    id: uuidv4(),
    clerkUserId: "123",
    template: "Paragraph Text",
    title: "Intro Paragraph for Blog on AI Ethics",
    createdAt: "2025-07-29T11:20:00",
    totalWords: 180,
    content: "Artificial Intelligence is transforming society, but raises ethical concerns...",
  },
  {
    id: uuidv4(),
    clerkUserId: "123",
    template: "Post Title",
    title: "Creative Post Ideas for Winter Season",
    createdAt: "2025-07-30T11:30:00",
    totalWords: 130,
    content: "Winter Wonders: 5 Post Ideas to Warm Up Engagement...",
  },
  {
    id: uuidv4(),
    clerkUserId: "123",
    template: "Blog Tags",
    title: "Blog Tags for Travel Vlog",
    createdAt: "2025-07-31T11:40:00",
    totalWords: 85,
    content: "travel, vacation, adventure, wanderlust, mountains...",
  },
  {
    id: uuidv4(),
    clerkUserId: "123",
    template: "Youtube Hashtags",
    title: "Fitness Channel Hashtags",
    createdAt: "2025-08-01T11:50:00",
    totalWords: 90,
    content: "#Workout #FitnessMotivation #DailyFitness...",
  },
  {
    id: uuidv4(),
    clerkUserId: "123",
    template: "Text Summarizer",
    title: "Summary of Machine Learning Basics",
    createdAt: "2025-08-02T12:00:00",
    totalWords: 105,
    content: "Machine Learning allows computers to learn from data...",
  },
  {
    id: uuidv4(),
    clerkUserId: "123",
    template: "Content Rewriter",
    title: "Rephrased CTA for Email",
    createdAt: "2025-08-03T12:10:00",
    totalWords: 120,
    content: "Join today and unlock premium features instantly...",
  },
  {
    id: uuidv4(),
    clerkUserId: "123",
    template: "Email Newsletter",
    title: "Monthly Roundup - July Edition",
    createdAt: "2025-08-04T12:20:00",
    totalWords: 310,
    content: "This month we’re sharing the latest updates from the world of dev tools...",
  },
  {
    id: uuidv4(),
    clerkUserId: "123",
    template: "Question & Answer",
    title: "Python Interview Questions",
    createdAt: "2025-08-05T12:30:00",
    totalWords: 180,
    content: "Q: What is a lambda function?\nA: It's an anonymous function in Python...",
  },
  {
    id: uuidv4(),
    clerkUserId: "123",
    template: "Facebook Snippet",
    title: "Sneak Peek of New Feature",
    createdAt: "2025-08-06T12:40:00",
    totalWords: 65,
    content: "Something exciting is coming. Stay tuned!",
  },
  {
    id: uuidv4(),
    clerkUserId: "123",
    template: "Product Name",
    title: "App Name Ideas for Study Tool",
    createdAt: "2025-08-07T12:50:00",
    totalWords: 45,
    content: "StudySmart, BrainBoost, Learnio...",
  },
  {
    id: uuidv4(),
    clerkUserId: "123",
    template: "Code Generator",
    title: "Node.js API for User Auth",
    createdAt: "2025-08-08T13:00:00",
    totalWords: 125,
    content: "app.post('/login', (req, res) => {...})",
  },
  {
    id: uuidv4(),
    clerkUserId: "123",
    template: "Paragraph Text",
    title: "Paragraph on Importance of Cybersecurity",
    createdAt: "2025-08-09T13:10:00",
    totalWords: 200,
    content: "In the digital age, securing user data has never been more critical...",
  },
  {
    id: uuidv4(),
    clerkUserId: "123",
    template: "Post Title",
    title: "Titles for Career Blog",
    createdAt: "2025-08-10T13:20:00",
    totalWords: 110,
    content: "Climb the Ladder: 7 Steps to Career Success...",
  },
  {
    id: uuidv4(),
    clerkUserId: "123",
    template: "Blog Tags",
    title: "Tags for Food Recipe Blog",
    createdAt: "2025-08-11T13:30:00",
    totalWords: 88,
    content: "food, recipe, cooking, ingredients, healthy...",
  },
  {
    id: uuidv4(),
    clerkUserId: "123",
    template: "Paragraph Text",
    title: "AI in Education - Paragraph",
    createdAt: "2025-08-12T13:40:00",
    totalWords: 160,
    content: "AI tools are transforming how students learn and teachers teach...",
  },
  {
    id: uuidv4(),
    clerkUserId: "123",
    template: "Code Generator",
    title: "CSS Grid Layout Example",
    createdAt: "2025-08-13T13:50:00",
    totalWords: 115,
    content: ".container { display: grid; grid-template-columns: repeat(3, 1fr); }",
  },
  {
    id: uuidv4(),
    clerkUserId: "123",
    template: "Text Summarizer",
    title: "One-liner Summary of Newsletter",
    createdAt: "2025-08-14T14:00:00",
    totalWords: 45,
    content: "Your weekly update on tech, design, and dev tips.",
  },
  {
    id: uuidv4(),
    clerkUserId: "123",
    template: "Email Newsletter",
    title: "AI Weekly - Issue #21",
    createdAt: "2025-08-15T14:10:00",
    totalWords: 295,
    content: "Welcome to another issue of AI Weekly! This week covers the latest models...",
  },
  {
    id: uuidv4(),
    clerkUserId: "123",
    template: "Youtube Hashtags",
    title: "Top 5 Trending Hashtags for Music",
    createdAt: "2025-08-16T14:20:00",
    totalWords: 90,
    content: "#Music #TopHits #NewReleases #ViralSongs #Trending...",
  },
];
