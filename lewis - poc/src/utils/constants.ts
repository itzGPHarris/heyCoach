
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
  export const SAMPLE_PITCH_DATA = {
    RADIANT_HUE: {
      versions: [
        {
          id: 'harper-v1',
          title: 'RadiantHue Initial Pitch',
          videoUrl: 'v3Y602TiLPaUfsZN9VfumowhaC3IWCA200tCMWvg2AkPo',
          timestamp: '2025-01-15T10:00:00Z',
          analysis: {
            score: 70,
            metrics: {
              clarity: 65,
              pace: 75,
              engagement: 70
            }
          },
          feedback: [
            {
              id: 'f1',
              author: 'Coach',
              content: 'Good initial pitch. Focus on slower delivery in the introduction.',
              timestamp: '2025-01-15T10:30:00Z'
            }
          ],
          isFavorite: false
        },
        {
          id: 'harper-v2',
          title: 'RadiantHue Refined Pitch',
          videoUrl: 'YYtQ34SRyksieH026qohfbOhBNd02LQAK3Fgt8wk5J8tM',
          timestamp: '2025-01-16T14:00:00Z',
          analysis: {
            score: 82,
            metrics: {
              clarity: 80,
              pace: 85,
              engagement: 81
            }
          },
          feedback: [
            {
              id: 'f2',
              author: 'Coach',
              content: 'Much improved! Your pacing is better and the value proposition is clearer.',
              timestamp: '2025-01-16T14:30:00Z'
            }
          ],
          isFavorite: true
        },
        {
          id: 'harper-v3',
          title: 'RadiantHue Final Pitch',
          videoUrl: '00YR82qyS8utVtQuisE48P5BGqeeaUVxxJfR8LhiRsFk',
          timestamp: '2025-01-17T16:00:00Z',
          analysis: {
            score: 90,
            metrics: {
              clarity: 88,
              pace: 92,
              engagement: 90
            }
          },
          feedback: [
            {
              id: 'f3',
              author: 'Coach',
              content: 'Excellent final version! Your confidence shows and the message is compelling.',
              timestamp: '2025-01-17T16:30:00Z'
            }
          ],
          isFavorite: false
        }
      ]
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
    },
    VERSIONS: {
      triggers: ['history', 'version', 'find version'],
      action: 'openPitchVersions',
      responses: [
        "I can help you find pitch versions. Would you like to see upcoming events or practice for a specific competition?"
      ],
      quickReplies: ["Compare pitches", "View history"]
    }
  } as const;
  
  // Helper type for actions
  export type CommandAction = 
    | 'openMediaDialog'
    | 'openDashboard'
    | 'openTeamFeedback'
    | 'openImprovements'
    | 'openCompetitions'
    | 'openPitchVersions';
  
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
  