import { Message } from "../../types/types";
import { VideoUploadHandlerProps } from "../../store/types";
import { processVideoUpload } from "./VideoProcessor"; // ✅ AI messaging component

const VideoUploadHandler = async ({ fileUrl, isPortrait, setMessages, isVersionUpload }: VideoUploadHandlerProps) => {
  const timestamp = new Date().toLocaleTimeString();
  console.log("✅ ✅ ✅ Upload Handler is Processing video upload:", fileUrl);

  // ✅ Step 1: Store the video URL as text (instead of JSX)
  const videoMessage: Message = {
    id: crypto.randomUUID(),
    sender: "user",
    text: fileUrl, // ✅ Store URL as text so it renders correctly
    timestamp,
  };
  setMessages((prev) => [...prev, videoMessage]);

  // ✅ Step 2: Process AI response
  processVideoUpload(fileUrl, isPortrait, setMessages, isVersionUpload);
};

export default VideoUploadHandler;
