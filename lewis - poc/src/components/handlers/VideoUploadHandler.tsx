import { Message } from "../../types/types";
import VideoMessage from "../shared/VideoMessage";
import { VideoUploadHandlerProps } from "../../store/types";
import { processVideoUpload } from "./VideoProcessor"; // ✅ New component for AI messaging

const VideoUploadHandler = async ({ fileUrl, isPortrait, setMessages, isVersionUpload }: VideoUploadHandlerProps) => {
  const timestamp = new Date().toLocaleTimeString();

  // ✅ Step 1: User Uploads Video Message
  const videoMessage: Message = {
    id: Date.now(),
    sender: "user",
    component: <VideoMessage fileUrl={fileUrl} timestamp={timestamp} isPortrait={isPortrait} />,
    timestamp,
  };
  setMessages((prev) => [...prev, videoMessage]);

  // ✅ Step 2: Call `processVideoUpload` to handle AI responses & comparisons
  processVideoUpload(fileUrl, isPortrait, setMessages, isVersionUpload);
};

export default VideoUploadHandler;
