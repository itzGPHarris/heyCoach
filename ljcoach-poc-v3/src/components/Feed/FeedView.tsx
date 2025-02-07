import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Card, CardContent } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { uploadVideo, fetchAIAnalysis, getFeedItems, updateFeedItem } from "../../api/feedService";

interface FeedItem {
  id: string;
  url: string;
  aiResponse?: {
    summary: string;
    feedback: string;
    question: string;
  };
}

const FeedView: React.FC = () => {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  // Load feed items on component mount
  useEffect(() => {
    const loadFeed = async () => {
      try {
        const items = await getFeedItems();
        setFeedItems(items);
      } catch (error) {
        console.error("Failed to load feed items:", error);
        setFeedItems([]); // Prevent crashing
      }
    };
    loadFeed();
  }, []);

  // Handle video upload
  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        const uploadedData = await uploadVideo(file);
        setFeedItems((prevItems) => [uploadedData, ...prevItems]); // Add to feed
      } catch (error) {
        console.error("Upload failed:", error);
      }
      setIsUploading(false);
    }
  };

  // Handle AI Analysis Request
  const handleFetchAIAnalysis = async (id: string, url: string) => {
    try {
      const aiData = await fetchAIAnalysis(url);
      await updateFeedItem(id, aiData);
      setFeedItems((prevItems) =>
        prevItems.map((item) => (item.id === id ? { ...item, aiResponse: aiData } : item))
      );
    } catch (error) {
      console.error("AI analysis failed:", error);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: "800px", padding: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>🚀 AI Coach Feed</Typography>

      {/* Video Upload Input */}
      <input type="file" accept="video/*" style={{ display: "none" }} id="video-upload" onChange={handleUpload} />
      <label htmlFor="video-upload">
        <Button variant="contained" component="span" startIcon={<CloudUploadIcon />} disabled={isUploading}>
          {isUploading ? "Uploading..." : "Upload Video"}
        </Button>
      </label>

      {/* Display Video Feed */}
      {feedItems.map((item) => (
        <Card key={item.id} sx={{ mt: 2, width: "100%" }}>
          <CardContent>
            <video width="100%" controls>
              <source src={item.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {item.aiResponse ? (
              <>
                <Typography variant="body2" sx={{ mt: 1 }}><strong>Coach:</strong> {item.aiResponse.summary}</Typography>
                <Typography variant="body2">{item.aiResponse.feedback}</Typography>
                <Typography variant="body2" sx={{ fontStyle: "italic", mt: 1 }}>{item.aiResponse.question}</Typography>
              </>
            ) : (
              <Button variant="contained" sx={{ mt: 2 }} onClick={() => handleFetchAIAnalysis(item.id, item.url)}>
                Get AI Feedback
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default FeedView;
