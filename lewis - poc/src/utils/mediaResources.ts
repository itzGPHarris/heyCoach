// src/utils/mediaResources.ts
import harperThumb1 from './../assets/harperthumb1.png';
import harperThumb2 from './../assets/harperthumb2.png';
import harperThumb3 from './../assets/harperthumb3.png';
import weeklyChallengeIcon from './../assets/earth.svg';
import CoachAvatar from '../../assets/coachAvatar-simple.svg'


// MUX Video playback IDs
export const MUX_VIDEOS = {
    COMPETITION_HERO: "ulXSeoy4rgSxgL02hqIlr58BZ66aiXqflANbiakPKLiM",
    // Add more MUX video IDs as needed
  } as const;
  
  // Placeholder paths - using standard API placeholder for development
  export const PLACEHOLDER_PATHS = {
    AVATAR_SM: "/api/placeholder/32/32",
    AVATAR_MD: "/api/placeholder/48/48",
    AVATAR_LG: "/api/placeholder/64/64",
    VIDEO_THUMB_SM: "/api/placeholder/120/68",
    VIDEO_THUMB_MD: "/api/placeholder/240/135",
    VIDEO_THUMB_LG: "/api/placeholder/480/270",
  } as const;
  
  // Mock video thumbnails for prototype
  export const VIDEO_THUMBNAILS = {
    HARPER_PITCH_1: harperThumb1,
    HARPER_PITCH_2: harperThumb2,
    HARPER_PITCH_3: harperThumb3,
  } as const;
  
  // Mock video thumbnails for prototype
  export const COACH_AVATARS = {
    COACH_SIMPLE: CoachAvatar,
  } as const;
  

  // Mock user avatars for prototype
  export const USER_AVATARS = {
    HARPER: PLACEHOLDER_PATHS.AVATAR_MD,
    ALEX: PLACEHOLDER_PATHS.AVATAR_SM,
    SARAH: PLACEHOLDER_PATHS.AVATAR_SM,
    JAMES: PLACEHOLDER_PATHS.AVATAR_SM,
  } as const;


  // Mock competition icons for prototype
  export const COMPETITION_ICONS = {
    IMPACT_CHALLENGE: weeklyChallengeIcon,
  } as const;
  
  // Types for type safety
  export type PlaceholderPath = typeof PLACEHOLDER_PATHS[keyof typeof PLACEHOLDER_PATHS];
  export type VideoThumbnail = typeof VIDEO_THUMBNAILS[keyof typeof VIDEO_THUMBNAILS];
  export type UserAvatar = typeof USER_AVATARS[keyof typeof USER_AVATARS];
  export type MuxVideoId = typeof MUX_VIDEOS[keyof typeof MUX_VIDEOS];
  
  // Helper function to get MUX video playback ID
  export const getMuxVideo = (id: keyof typeof MUX_VIDEOS): string => {
    return MUX_VIDEOS[id];
  };
  
  // Helper function to get video thumbnail
  export const getVideoThumbnail = (id: keyof typeof VIDEO_THUMBNAILS): string => {
    return VIDEO_THUMBNAILS[id];
  };
  
  // Helper function to get user avatar
  export const getUserAvatar = (id: keyof typeof USER_AVATARS): string => {
    return USER_AVATARS[id];
  };
  
  // Mock data generator for comments
  export const generateMockComment = (
    user: keyof typeof USER_AVATARS,
    comment: string,
    timestamp: string,
    videoId: keyof typeof VIDEO_THUMBNAILS
  ) => {
    return {
      user,
      comment,
      avatarUrl: getUserAvatar(user),
      timestamp,
      videoThumbnail: getVideoThumbnail(videoId),
    };
  };