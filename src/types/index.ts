export interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
  withCount?: boolean;
}

export interface MultilingualLabel {
  english: string;
  hindi: string;
  regional: string;
}

export type SymbolCategory = 'food' | 'transport' | 'festival' | 'routine' | 'emotion' | 'action' | 'object' | 'place' | 'body' | 'family' | 'animal' | 'color' | 'number' | 'weather';

export interface Symbol {
  id: string;
  imageUrl: string;
  labels: MultilingualLabel;
  category: SymbolCategory;
  tags: string[];
}

export interface ActivityElement {
  id: string;
  type: 'symbol' | 'text' | 'audio' | 'button';
  symbolId?: string;
  content?: string;
  position: { x: number; y: number };
  size?: { width: number; height: number };
  audioUrl?: string;
}

export interface Activity {
  id: string;
  name: string;
  type: 'matching' | 'sorting' | 'choice' | 'schedule' | 'aac';
  elements: ActivityElement[];
  createdAt: string;
  updatedAt: string;
}

export interface AACCell {
  id: string;
  symbolId?: string;
  label: string;
  audioText?: string;
  customAudioUrl?: string;
}

export interface AACBoard {
  id: string;
  name: string;
  gridSize: '2x2' | '3x3' | '4x4' | 'custom';
  customRows?: number;
  customCols?: number;
  cells: AACCell[];
  createdAt: string;
  updatedAt: string;
}

export interface ScheduleStep {
  id: string;
  symbolId: string;
  order: number;
  completed?: boolean;
}

export interface VisualSchedule {
  id: string;
  name: string;
  steps: ScheduleStep[];
  createdAt: string;
  updatedAt: string;
}

export interface LanguageSettings {
  english: boolean;
  hindi: boolean;
  regional: boolean;
  regionalLanguage: 'tamil' | 'telugu' | 'marathi' | 'bengali' | 'gujarati' | 'kannada';
}

// Database types
export type UserRole = 'therapist' | 'child' | 'parent' | 'admin';
export type ActivityType = 'matching' | 'memory_match' | 'match_halves' | 'match_picture_name' | 'sorting' | 'choice' | 'aac_board' | 'visual_schedule';
export type AssignmentStatus = 'assigned' | 'in_progress' | 'completed';

export interface Profile {
  id: string;
  username: string;
  email: string | null;
  full_name: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface DBActivity {
  id: string;
  therapist_id: string;
  name: string;
  type: ActivityType;
  content: any;
  created_at: string;
  updated_at: string;
}

export interface Assignment {
  id: string;
  activity_id: string;
  child_id: string;
  therapist_id: string;
  assigned_at: string;
  due_date: string | null;
  status: AssignmentStatus;
}

export interface ActivityResponse {
  id: string;
  assignment_id: string;
  child_id: string;
  activity_id: string;
  answers: Record<string, any>;
  score: number;
  total_questions: number;
  completed_at: string;
  time_spent_seconds: number;
}

// Progress tracking types
export interface ChildProgress {
  child: Profile;
  totalAssignments: number;
  completedAssignments: number;
  averageScore: number;
  lastActivity: string | null;
}

export interface ActivityProgress {
  activity: DBActivity;
  totalAssignments: number;
  completedCount: number;
  averageScore: number;
  responses: ActivityResponse[];
}

// Matching activity types
export interface MatchingQuestion {
  id: string;
  leftSymbolId: string;
  rightOptions: MatchingOption[];
  correctOptionId: string;
}

export interface MatchingOption {
  id: string;
  symbolId: string;
}

// Parent-child relationship
export interface ParentChildLink {
  id: string;
  parent_id: string;
  child_id: string;
  created_by_therapist_id: string;
  created_at: string;
}

// Memory match game types
export interface MemoryCard {
  id: string;
  symbolId: string;
  pairId: string;
  isFlipped: boolean;
  isMatched: boolean;
}

// Match halves game types
export interface HalfMatchQuestion {
  id: string;
  leftHalfSymbolId: string;
  rightHalfOptions: { id: string; symbolId: string }[];
  correctOptionId: string;
}

// Match picture to name game types
export interface PictureNameQuestion {
  id: string;
  symbolId: string;
  nameOptions: { id: string; name: string }[];
  correctOptionId: string;
}

