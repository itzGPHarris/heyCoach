// types.ts

// Competition Types
export interface Competition {
  id: string;
  title: string;
  description: string;
  dates: {
    start: string;
    end: string;
    submissionDeadline: string;
  };
  prizes: {
    grandPrize: string;
    firstPlace: string;
    runnerUp: string;
    otherPrizes?: string[];
  };
  status: 'upcoming' | 'ongoing' | 'past';
  rules: string[];
  eligibility?: string[];
  maxTeamSize?: number;
  featuredImage?: string;
  categories?: string[];
}

export interface CompetitionHubProps {
    open: boolean;
    isOpen: boolean;
    onClose: () => void;
    onCreateSubmission: (competition: Competition) => void;
    onViewSubmissions: () => void;


  }


  export interface CompetitionCardProps {
    competition: Competition;
    hasSubmitted?: boolean;
    onPreview: (competition: Competition) => void;
    onEnter: (id: string) => void;
    onViewLeaderboard: (id: string) => void;
    onViewSubmission?: (id: string) => void;
    
    
  }
  
// Submission Types
export interface VideoUploadProps {
  videoFile: File | null;
  videoPreview?: string;
  onVideoUpload: (file: File) => void;
  onVideoRemove: () => void;
  error?: string;
}

export interface BasicInfoProps {
  title: string;
  description: string;
  website?: string;
  onTitleChange: (title: string) => void;
  onDescriptionChange: (description: string) => void;
  onWebsiteChange: (website: string) => void;
  errors?: {
    title?: string;
    description?: string;
  };
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}

export interface TeamSectionProps {
  members: TeamMember[];
  onAddMember: () => void;
  onRemoveMember: (id: string) => void;
}

export interface ActionButtonsProps {
  onSaveDraft: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  disabled?: boolean;
}

export interface Submission {
  id: string;
  competitionId: string;  // Added to link submission to competition
  name: string;
  competitionName: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  placement?: string;
  date: string;
  video: {
    url: string;
    thumbnailUrl?: string;
    duration?: number;
  };
  website?: string;
  documents: Array<{
    id: string;
    name: string;
    url: string;
    type: string;
    size: number;
  }>;
  status: 'draft' | 'submitted' | 'accepted' | 'rejected';
  teamSize: number;
  team: TeamMember[];
  categories?: string[];
}

export interface SubmissionCardProps {
  submission: Submission;
  onPreview: (id: string) => void;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export interface SubmissionDashboardProps {
  open: boolean;
  onClose: () => void;
  onBack: () => void;
  onCreateNew: () => void;
}

export interface SubmissionFormProps {
  
  open: boolean;
  onClose: () => void;
  competition: Competition;
  initialData?: Partial<Submission>;
  onSubmit: (submission: Submission) => Promise<void>;
  onSaveDraft: (submission: Submission) => Promise<void>;
}

// Additional Utility Types
export interface APIError {
  message: string;
  code?: string;
  field?: string;
}

export interface CompetitionFilters {
  status?: 'upcoming' | 'ongoing' | 'past';
  category?: string;
  search?: string;
}

export interface SubmissionFilters {
  status?: 'draft' | 'submitted' | 'accepted' | 'rejected';
  competitionId?: string;
  search?: string;
}