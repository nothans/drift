export interface SearchSource {
  title: string;
  url: string;
}

export interface GroundingChunk {
  web?: {
    uri?: string;
    title?: string;
  };
}

export interface DreamResultData {
  narrative: string;
  sources: SearchSource[];
}

export enum SearchState {
  IDLE = 'IDLE',
  DREAMING = 'DREAMING', // Loading
  AWAKE = 'AWAKE', // Results
  NIGHTMARE = 'NIGHTMARE', // Error
}