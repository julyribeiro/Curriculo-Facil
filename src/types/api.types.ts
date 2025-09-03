export interface AIEnhancementRequest {
  text: string;
  type: 'summary' | 'experience';
  context?: {
    position?: string;
    company?: string;
  };
}

export interface AIEnhancementResponse {
  enhancedText: string;
  suggestions?: string[];
}

export interface APIError {
  message: string;
  code?: string;
  details?: string;
}

export interface LoadingState {
  isLoading: boolean;
  operation?: string;
}