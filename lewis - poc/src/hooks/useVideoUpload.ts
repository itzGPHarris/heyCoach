// useVideoUpload.ts

// useVideoUpload.ts - Custom Hook for Video Upload Handling
import { useState } from "react";

export const useVideoUpload = () => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isPortrait, setIsPortrait] = useState<boolean>(false);

  const handleVideoUpload = (file: File, onUploadComplete: (fileUrl: string, isPortrait: boolean) => void) => {
    const fileUrl = URL.createObjectURL(file);
    localStorage.setItem("uploadedVideo", fileUrl);

    console.log("📥 useVideoUpload - File Uploaded:", file);
    console.log("🔗 Generated Video URL:", fileUrl);

    const video = document.createElement("video");
    video.src = fileUrl;
    video.onloadedmetadata = () => {
      const detectedOrientation = video.videoHeight > video.videoWidth;
      setVideoUrl(fileUrl);
      setIsPortrait(detectedOrientation);
      onUploadComplete(fileUrl, detectedOrientation);
    };
  };

  return {
    videoUrl,
    isPortrait,
    handleVideoUpload,
  };
};
// Compare this snippet from lewis%20-%20poc/src/hooks/useVideoUpload.ts: