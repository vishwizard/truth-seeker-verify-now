
// Define shared types for the application

export type NewsSource = {
  name: string;
  url: string;
  reliability: number; // 0-100 score
};

export type FactCheckResult = {
  claim: string;
  verdict: 'true' | 'false' | 'partially true' | 'unverified';
  confidence: number; // 0-1
  explanation: string;
  sources: NewsSource[];
  timestamp: string;
};

// Future types to be added as the application grows
