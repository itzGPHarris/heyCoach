// src/utils/constants.ts
export const COACH_COMMANDS = {
  PITCH_HISTORY: {
    triggers: ['history', 'version', 'find version', 'past pitches', 'compare pitches', 'view history'],
    action: 'openPitchVersions',
    responses: [
      "I can help you find pitch versions. Would you like to compare previous pitches or view your history?"
    ],
    quickReplies: ["Compare pitches"]
  },
  PITCH_ANALYSIS: {
    triggers: ['analysis', 'see analysis', 'detailed breakdown'],
    action: 'openAnalysis',
    responses: [
      "I'll pull up a detailed analysis of your pitch performance. What aspects would you like to focus on?"
    ],
    quickReplies: ["Overall metrics", "Specific improvements"]
  },
  PITCH_IMPROVEMENTS: {
    triggers: ['improvements', 'show improvements', 'specific improvements'],
    action: 'openImprovements',
    responses: [
      "I'll show you the key areas for improvement in your pitch. Would you like to focus on content or delivery?"
    ],
    quickReplies: ["Content focus", "Delivery focus"]
  },
  TEAM_FEEDBACK: {
    triggers: ['team feedback', 'get feedback', 'show feedback', 'feedback'],
    action: 'openTeamFeedback',
    responses: [
      "Let's check what feedback your team has provided. Would you like to see recent comments or request new feedback?"
    ],
    quickReplies: ["Recent feedback"]
  },
  COMPETITIONS: {
    triggers: ['competition', 'enter competition', 'find competitions'],
    action: 'openCompetitionHub',
    responses: [
      "I can help you find pitch competitions. Would you like to see upcoming events or practice for a specific competition?"
    ],
    quickReplies: ["View competitions"]
  },
  DASHBOARD: {
    triggers: ['dashboard', 'my pitches'],
    // Use 'openSubmissionDashboard' to ensure consistency
    action: 'openSubmissionDashboard',
    responses: [
      "I'll show you your submissions dashboard. Would you like to see your existing submissions or create a new one?"
    ],
    quickReplies: ["View submissions", "Create new submission"]
  },
  SUBMISSIONS: {
    triggers: ['submissions', 'my submissions', 'view submissions', 'competition submissions'],
    action: 'openSubmissionDashboard',
    responses: [
      "I'll open your submissions dashboard. You can view your existing submissions or create a new one."
    ],
    quickReplies: ["Create new submission", "View past submissions"]
  },
  // Make sure this command exists and is properly configured
  NEW_SUBMISSION: {
    triggers: ['new submission', 'create submission', 'submit pitch', 'enter competition'],
    // This should immediately take them to the submission form
    action: 'openSubmissionForm',
    responses: [
      "Let's create a new submission for a competition. Would you like to use an existing pitch or record a new one?"
    ],
    quickReplies: ["Use existing pitch", "Record new pitch"]
  },
    PROFILE: {
    triggers: ['my profile', 'view profile', 'profile'],
    action: 'openProfile',
    responses: [
      "I'll open your profile settings. Would you like to update your information or manage your preferences?"
    ],
    quickReplies: ["Update info"]
  },
  NEW_PITCH: {
    triggers: ['new pitch', 'upload new pitch', 'record pitch', 'upload video', 'record now'],
    action: 'openMediaDialog',
    responses: [
      "I'd be happy to help you record a new pitch! Would you like to upload a video or record one now?"
    ],
    quickReplies: ["Record now", "Upload video"]
  }
} as const;

// Updated Action type to include all possible actions
export type CommandAction = 
  | 'openMediaDialog'
  | 'openDashboard'
  | 'openTeamFeedback'
  | 'openImprovements'
  | 'openCompetitionHub'
  | 'openPitchVersions'
  | 'openAnalysis'
  | 'openSubmissionDashboard'
  | 'openSubmissionForm'
  | 'openSubmissionDetail'
  | 'openProfile';
  

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

// Types for pitch data
interface PitchMetrics {
  clarity: number;
  pace: number;
  engagement: number;
}

interface PitchAnalysis {
  score: number;
  metrics: PitchMetrics;
}

interface PitchFeedback {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

interface PitchVersion {
  id: string;
  title: string;
  videoUrl: string;
  timestamp: string;
  analysis: PitchAnalysis;
  feedback: PitchFeedback[];
  isFavorite: boolean;
}

interface PitchData {
  versions: PitchVersion[];
}

// Sample pitch data
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

// Export types for pitch data
export type { PitchMetrics, PitchAnalysis, PitchFeedback, PitchVersion, PitchData };

// Competition types
export interface Competition {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'active' | 'ended';
  organizerName: string;
  organizerId: string;
  requirements?: CompetitionRequirement[];
  prizes?: Prize[];
  headerImage?: string;
}

export interface CompetitionRequirement {
  id: string;
  name: string;
  description: string;
  required: boolean;
}

export interface Prize {
  id: string;
  rank: number;
  name: string;
  description?: string;
  value?: number;
}

// Submission types
export interface Submission {
  id: string;
  name: string;
  competitionId: string;
  competitionName: string;
  description: string;
  date: string;
  status: 'draft' | 'submitted' | 'accepted' | 'rejected';
  teamSize: number;
  createdAt: string;
  updatedAt: string;
  video: {
    url: string;
    thumbnailUrl?: string;
    duration?: number;
  };
  documents: Document[];
  team: TeamMember[];
}

export interface Document {
  id?: string;
  name: string;
  url: string;
  type: 'pdf' | 'doc' | 'ppt' | 'other';
  size?: number;
  uploadedAt?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email?: string;
  role?: string;
  avatarUrl?: string;
}

// Submission form data
export interface SubmissionData {
  title: string;
  description: string;
  video: File | null;
  videoPreview?: string;
  website?: string;
  team: TeamMember[];
  categories?: string[];
  links?: {
    [key: string]: string;
  };
}