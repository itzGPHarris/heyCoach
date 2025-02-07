import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"; // Ensure correct environment variable usage

// Define expected AI analysis response type
interface AIAnalysisResponse {
  insights: string;
}

// Function to analyze a pitch text using AI service
export const analyzePitch = async (pitchText: string): Promise<AIAnalysisResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/analyze`, { pitchText });
    return response.data;
  } catch (error) {
    console.error("Error analyzing pitch:", error);
    throw error;
  }
};

// Default export for easier importing
const aiAnalysisService = {
  analyzePitch,
};

export default aiAnalysisService;
