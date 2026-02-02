
export interface DorkResult {
  dork: string;
  description: string;
}

export interface GroundingSource {
  title: string;
  url: string;
}

export interface AIResponse {
  type: 'chat' | 'dorks';
  message: string;
  dorks?: DorkResult[];
  sources?: GroundingSource[];
}

export enum AppStatus {
  IDLE = 'IDLE',
  SEARCHING = 'SEARCHING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR'
}
