
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

  export const COACH_COMMANDS = {
    NEW_PITCH: {
      triggers: ['new pitch', 'upload new pitch', 'record pitch'],
      action: 'openMediaDialog',
      responses: [
        "I'd be happy to help you record a new pitch! Would you like to upload a video or record one now?"
      ],
      //quickReplies: ["Record now", "Upload video"]
    },
    HISTORY: {
      triggers: ['history', 'show history', 'past pitches'],
      action: 'openDashboard',
      responses: [
        "Here's what I can show you about your pitch history. Would you like to see your past pitches or your improvement analytics?"
      ],
      quickReplies: ["See past pitches", "Show analytics"]
    },
    ANALYSIS: {
      triggers: ['analysis', 'see analysis', 'detailed breakdown'],
      action: 'openDashboard',
      responses: [
        "I'll pull up a detailed analysis of your pitch performance. What aspects would you like to focus on?"
      ],
      quickReplies: ["Overall metrics", "Specific improvements"]
    },
    TEAM_FEEDBACK: {
      triggers: ['team feedback', 'get feedback', 'show feedback', 'feedback'],
      action: 'openTeamFeedback',
      responses: [
        "Let's check what feedback your team has provided. Would you like to see recent comments or request new feedback?"
      ],
      quickReplies: ["Recent feedback", "Request feedback"]
    },
    IMPROVEMENTS: {
      triggers: ['improvements', 'show improvements', 'specific improvements'],
      action: 'openImprovements',
      responses: [
        "I'll show you the key areas for improvement in your pitch. Would you like to focus on content or delivery?"
      ],
      quickReplies: ["Content focus", "Delivery focus"]
    },
    COMPETITIONS: {
      triggers: ['competition', 'enter competition', 'find competitions'],
      action: 'openCompetitions',
      responses: [
        "I can help you find pitch competitions. Would you like to see upcoming events or practice for a specific competition?"
      ],
      quickReplies: ["Show events", "Competition prep"]
    }
  } as const;
  
  // Helper type for actions
  export type CommandAction = 
    | 'openMediaDialog'
    | 'openDashboard'
    | 'openTeamFeedback'
    | 'openImprovements'
    | 'openCompetitions';
  
  // Helper type for command keys
  export type CommandKey = keyof typeof COACH_COMMANDS;
  
  // Helper function to get command from trigger phrase
  export const getCommandFromTrigger = (input: string): { command: CommandKey; action: CommandAction } | null => {
    const normalizedInput = input.toLowerCase().trim();
    
    for (const [key, value] of Object.entries(COACH_COMMANDS)) {
      if (value.triggers.some(trigger => normalizedInput.includes(trigger))) {
        return { 
          command: key as CommandKey, 
          action: value.action 
        };
      }
    }
    return null;
  };
  