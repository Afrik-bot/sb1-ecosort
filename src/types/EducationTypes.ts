export interface Article {
  id: string;
  title: string;
  description: string;
  isPremium: boolean;
  sections: GuideSection[];
}

export interface GuideSection {
  title: string;
  content: string;
  images?: string[];
  isPremium?: boolean;
}

export interface RecyclingTip {
  id: number;
  title: string;
  description: string;
  category: 'General' | 'Advanced';
  isPremium?: boolean;
}