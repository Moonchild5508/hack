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

export interface Symbol {
  id: string;
  imageUrl: string;
  labels: MultilingualLabel;
  category: 'food' | 'transport' | 'festival' | 'routine' | 'emotion' | 'action' | 'object' | 'place';
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
  gridSize: '2x2' | '3x3' | '4x4';
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
