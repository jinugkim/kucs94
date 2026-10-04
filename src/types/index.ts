export type TabType = 
  | 'funeral' 
  | 'wedding' 
  | 'other' 
  | 'envelope' 
  | 'calculator' 
  | 'messages' 
  | 'kucs-rules' 
  | 'github';

export interface TimelineStep {
  period: string;
  title: string;
  subtitle: string;
  description: string;
  actions: string[];
  keyNotes?: string[];
  documents?: string[];
}

export interface EtiquetteRule {
  category: string;
  title: string;
  dos: string[];
  donts: string[];
  summary: string;
}

export interface EnvelopePattern {
  id: string;
  category: 'condolence' | 'congratulation';
  hanja: string;
  hangul: string;
  meaning: string;
  suitableFor: string;
}

export interface SupportRule {
  target: string;
  supportAmount: string;
  items: string;
  leaveDays: string;
  notes: string;
}

export interface EventNotice {
  id: string;
  category: '조사' | '결혼' | '수연' | '출산' | '기타';
  title: string;
  memberName: string;
  graduationYear: string; // e.g. "94학번"
  date: string;
  location: string;
  room?: string;
  account?: string;
  contact?: string;
  createdAt: string;
  wreathDispatched?: boolean;
}
