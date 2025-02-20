// src/components/handlers/VideoUploadHandler.tsx
import { Message } from "../../store/types";
import { processVideoUpload } from "./VideoProcessor";
import { generateUUID } from '../../utils/uuid';

// Define the interface at the top of the file
interface VideoUploadHandlerProps {
  fileUrl: string;
  isPortrait: boolean;
  setMessages: (message: Message) => void;
  isVersionUpload: boolean;
}

const VideoUploadHandler = ({ 
  fileUrl, 
  isPortrait, 
  setMessages, 
  isVersionUpload 
}: VideoUploadHandlerProps) => {
  console.log("🎬 VideoUploadHandler - Received video:", { fileUrl, isPortrait });

  // Add video message
  const videoMessage: Message = {
    id: generateUUID(),
    sender: "user",
    content: fileUrl,  // This should be the blob URL
    timestamp: new Date(),
    pitchId: Date.now().toString(),
    fromAI: false,
    isVideo: true
  };
  
  setMessages(videoMessage);

  // Process for AI response
  processVideoUpload(fileUrl, isPortrait, setMessages, isVersionUpload);
};

export default VideoUploadHandler;
