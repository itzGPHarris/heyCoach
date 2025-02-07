import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Card, CardContent, Dialog } from "@mui/material";

import { uploadVideo, fetchAIAnalysis, getFeedItems } from "../../api/feedService";
import PitchAIAnalysis from "../shared/PitchAIAnalysis";
import PitchAnalysis from "../shared/PitchAnalysis";
import ChatContainer from "../shared/ChatContainer";

interface FeedItem {
  id: string;
  url: string;
  aiResponse?: {
    summary: string;
    feedback: string;
    question: string;
  };
  showTranscript?: boolean;
}

const FeedView: React.FC = () => {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

  useEffect(() => {
    const loadFeed = async () => {
      try {
        const items = await getFeedItems();
        setFeedItems(items);
        console.log("✅ Loaded Mock Data:", items); // Debug log
      } catch (error) {
        console.error("Failed to load feed items:", error);
        setFeedItems([]);
      }
    };
    loadFeed();
  }, []);

  const [messages, setMessages] = useState<{ id: number; sender: "user" | "coach"; text: string }[]>([]);

// Function to render messages in the feed
const renderMessages = () => (
  messages.map((msg) => (
    <Typography key={msg.id} sx={{ mt: 1, backgroundColor: msg.sender === 'user' ? '#dcf8c6' : '#f1f0f0', padding: '8px', borderRadius: '8px', maxWidth: '80%', alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
      <strong>{msg.sender === 'user' ? 'You' : 'AI Coach'}:</strong> {msg.text}
    </Typography>
  ))
);
const handleFileUpload = async (files: FileList) => {
    for (const file of files) {
      //setIsUploading(true);
      try {
        const uploadedData = await uploadVideo(file);
        setFeedItems((prevItems) => [...prevItems, uploadedData]);
        setMessages((prevMessages) => [
          ...prevMessages,
          { id: prevMessages.length + 1, sender: "coach", text: "Thanks! I'm analyzing your upload..." }
        ]);
      } catch (error) {
        console.error("Upload failed:", error);
      }
     // setIsUploading(false);
    }
  };

  const handleSendMessage = (message: string) => {
    setMessages((prevMessages) => [...prevMessages, { id: prevMessages.length + 1, sender: "user", text: message }]);
    setTimeout(() => {
      setMessages((prevMessages) => [...prevMessages, { id: prevMessages.length + 1, sender: "coach", text: "Let me analyze that for you..." }]);
    }, 1000);
  };

  return (
    
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100vw", minHeight: "100vh" }}>
       {renderMessages()}
      <Typography variant="h5" sx={{ mb: 2, mt: 2 }}>🚀 AI Coach Feed</Typography>

      {/* Upload Modal */}
      <Dialog open={uploadDialogOpen} onClose={() => setUploadDialogOpen(false)}>
        <Box sx={{ p: 3 }}>
          <Typography variant="h6">Upload Files</Typography>
          <input type="file" multiple hidden id="file-upload" onChange={(e) => handleFileUpload(e.target.files!)} />
          <label htmlFor="file-upload">
            <Button variant="contained" component="span" sx={{ mt: 2 }}>
              Select Files
            </Button>
          </label>
        </Box>
      </Dialog>

      {/* Display Video Feed */}
      {feedItems.map((item) => (
        <Card key={item.id} sx={{ mt: 2, width: "100%", maxWidth: "600px" }}>
          <CardContent>
            <video width="100%" controls>
              <source src={item.url} type="video/mp4" />
            </video>
            {item.aiResponse ? <PitchAIAnalysis /> : (
              <Button variant="contained" sx={{ mt: 2 }} onClick={() => fetchAIAnalysis(item.url)}>
                Get AI Feedback
              </Button>
            )}
            {item.showTranscript && <PitchAnalysis />}
          </CardContent>
        </Card>
      ))}

      {/* 🔥 Restored Chat Input Fixed at Bottom */}
      <Box sx={{ width: "100vw", position: "fixed", bottom: 0 }}>
        <ChatContainer onSendMessage={handleSendMessage} onFileUpload={handleFileUpload} />
      </Box>
    </Box>
  );
};

export default FeedView;
