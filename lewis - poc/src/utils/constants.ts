
  export const APP_CONFIG = {
    MAX_PITCH_DURATION: 180, // seconds
    MIN_PITCH_DURATION: 30,  // seconds
    MAX_FILE_SIZE: 100 * 1024 * 1024, // 100MB
    SUPPORTED_VIDEO_FORMATS: ['mp4', 'webm'],
    API_ENDPOINTS: {
      PITCH_UPLOAD: '/api/pitch/upload',
      ANALYSIS: '/api/pitch/analyze'
    }
  } as const;