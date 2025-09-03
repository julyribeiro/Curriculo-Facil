import { useState, useCallback } from 'react';
import { AIEnhancementRequest, AIEnhancementResponse, LoadingState } from '@/types/api.types';
import { enhanceText } from '@/services/aiService';
import { useToast } from '@/hooks/use-toast';

export const useAIEnhancement = () => {
  const [loadingState, setLoadingState] = useState<LoadingState>({ isLoading: false });
  const { toast } = useToast();

  const enhanceTextWithAI = useCallback(async (request: AIEnhancementRequest): Promise<string | null> => {
    try {
      setLoadingState({ isLoading: true, operation: 'enhancing' });
      
      const response = await enhanceText(request);
      
      toast({
        title: "Texto melhorado com IA Gemini!",
        description: "O texto foi aprimorado com sucesso usando o Google Gemini.",
        variant: "default"
      });
      
      return response.enhancedText;
    } catch (error) {
      console.error('Error enhancing text:', error);
      
      toast({
        title: "Erro ao melhorar texto",
        description: error instanceof Error ? error.message : "Não foi possível conectar com a IA. Tente novamente mais tarde.",
        variant: "destructive"
      });
      
      return null;
    } finally {
      setLoadingState({ isLoading: false });
    }
  }, [toast]);

  const enhanceSummary = useCallback(async (summary: string): Promise<string | null> => {
    return enhanceTextWithAI({
      text: summary,
      type: 'summary'
    });
  }, [enhanceTextWithAI]);

  const enhanceExperience = useCallback(async (
    description: string, 
    context: { position: string; company: string }
  ): Promise<string | null> => {
    return enhanceTextWithAI({
      text: description,
      type: 'experience',
      context
    });
  }, [enhanceTextWithAI]);

  return {
    loadingState,
    enhanceSummary,
    enhanceExperience
  };
};