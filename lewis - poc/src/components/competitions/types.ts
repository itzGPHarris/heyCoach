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
  status: 'upcoming' | 'ongoing' | 'past'  | 'active' | 'ended';
  rules: string | string[]; // ✅ Now allows both single strings and arrays
  eligibility?: string[];
  maxTeamSize?: number;
  featuredImage?: string;
  categories?: string[];
  startDate: string;
  endDate: string;
  organizerName: string;
  organizerId: string;
  requirements?: CompetitionRequirement[];
  headerImage?: string;


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
    onClick: () => void;

    
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
  email?: string;
  avatar?: string;
  role?: string;
}

export interface TeamSectionProps {
  members: TeamMember[];
  onAddMember: (member: TeamMember) => void;
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
  documents: Document[];
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
  submissionDashboardOpen: boolean; // Added property

  setSubmissionDashboardOpen: (open: boolean) => void; // Added property

}

export interface SubmissionFormProps {
  open: boolean;
  onClose: () => void;
  competition: Competition;
  initialData?: Partial<Submission>;
  onSubmit: (submission: Submission) => Promise<void>;
  onSaveDraft: (submission: Submission) => Promise<void>;
  existingSubmission?: Submission | null;
  onBack: () => void;
  onViewSubmissions: () => void;
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

// Competition and submission related types

// Competition


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

// Submission
export interface Submission {
  id: string;
  name: string;
  competitionId: string;
  competitionName: string;
  description: string;
  date: string; // formatted date string
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

// Component Props
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
  onCreateNew: () => void;
  onBack: () => void;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void; 
  onDelete?: (id: string) => void;
  submissions?: Submission[];
  competition?: Competition;
  submissionDashboardOpen: boolean;
  setSubmissionDashboardOpen: (open: boolean) => void;
}

// Form Data
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

// Video Upload Component Props
export interface VideoUploadProps {
  videoFile: File | null;
  videoPreview?: string;
  onVideoUpload: (file: File) => void;
  onVideoRemove: () => void;
  error?: string;
}

// Basic Info Component Props
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

// Team Section Component Props
export interface TeamSectionProps {
  members: TeamMember[];
  onAddMember: (member: TeamMember) => void;
  onRemoveMember: (id: string) => void;
}

// Results and Feedback
export interface SubmissionResults {
  rank: number;
  points: number;
  feedback?: string;
  criteria?: {
    name: string;
    score: number;
    outOf: number;
  }[];
}

// Form Components
export interface FormComponentProps<T> {
  value: T;
  onChange: (value: T) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

export interface SubmissionDetailViewProps {
  submission: Submission;
  onBack: () => void;
  onClose: () => void;
  onEdit: () => void;
}


export interface SubmissionSuccessDialogProps {
  open: boolean;
  onClose: () => void;
  competitionName: string;
}

export interface EnhancedSubmissionCardProps {
  submission: Submission;
  variant?: 'horizontal' | 'vertical';
  onPlay: (id: string) => void;
  onEdit: (id: string) => void;
  onUnpublish?: (id: string) => void;
  onSelect?: (id: string) => void;
}
export interface CompetitionSubmissionFlowProps {
  competition: Competition;
  existingSubmissions?: Submission[];
  onClose: () => void;
}
