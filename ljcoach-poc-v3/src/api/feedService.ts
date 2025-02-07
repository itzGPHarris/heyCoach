import axios from "axios";

const API_BASE_URL = "http://localhost:3001"; // Mock API running with json-server

interface FeedItem {
  id: string;
  url: string;
  aiResponse?: {
    summary: string;
    feedback: string;
    question: string;
  };
}

// ✅ Simulated Video Upload (Mocked)
export const uploadVideo = async (file: File): Promise<FeedItem> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: new Date().toISOString(),
        url: URL.createObjectURL(file), // Local preview before actual upload
      });
    }, 1000); // Simulate upload delay
  });
};

// ✅ Fetch Mock Feed Data
export const getFeedItems = async (): Promise<FeedItem[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/feed`);
    return response.data;
  } catch (error) {
    console.error("Error fetching feed items:", error);
    return [];
  }
};

// ✅ Fetch AI Analysis (Mock) (Removed Unused videoUrl Parameter)
export const fetchAIAnalysis = async (videoUrl: string): Promise<{ summary: string; feedback: string; question: string; }> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/analyze`, { videoUrl });
    return response.data;
  } catch (error) {
    console.error("Error fetching AI analysis:", error);
    return {
      summary: "AI Analysis failed.",
      feedback: "Please try again later.",
      question: "Would you like to retry?",
    };
  }
};
  
// ✅ Update AI Analysis in Mock Feed
export const updateFeedItem = async (id: string, aiResponse: { summary: string; feedback: string; question: string; }): Promise<FeedItem> => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/feed/${id}`, { aiResponse });
    return response.data;
  } catch (error) {
    console.error("Error updating feed item:", error);
    throw error;
  }
};

// Optional: Default export
const feedService = {
  uploadVideo,
  fetchAIAnalysis,
  getFeedItems,
  updateFeedItem,
};

export default feedService;
