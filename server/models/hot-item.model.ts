export interface HotItem {
  id: string;
  title: string;
  url: string;
  source: string;
  rank: number;
  score: number;
  comments?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface HotSource {
  id: string;
  name: string;
  url: string;
  enabled: boolean;
}
