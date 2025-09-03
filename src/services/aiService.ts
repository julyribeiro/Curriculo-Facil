import { GoogleGenerativeAI } from '@google/generative-ai';
import { AIEnhancementRequest, AIEnhancementResponse } from '@/types/api.types';

const getAPIKey = (): string | null => {
  return localStorage.getItem('gemini_api_key');
};

export const enhanceText = async (request: AIEnhancementRequest): Promise<AIEnhancementResponse> => {
  const apiKey = getAPIKey();
  
  if (!apiKey) {
    throw new Error('API key do Gemini não configurada. Configure nas configurações.');
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    let prompt = '';
    
    if (request.type === 'summary') {
      prompt = `Como especialista em currículos profissionais, melhore este resumo profissional tornando-o mais atrativo e impactante para recrutadores. Mantenha em português brasileiro e foque em competências e experiências relevantes:

Texto original: "${request.text}"

Retorne apenas o texto melhorado, sem explicações adicionais.`;
    } else if (request.type === 'experience') {
      const context = request.context ? ` na posição de ${request.context.position} na empresa ${request.context.company}` : '';
      prompt = `Como especialista em currículos profissionais, melhore esta descrição de experiência profissional${context}. Torne-a mais específica, quantificável e impactante usando verbos de ação. Mantenha em português brasileiro:

Texto original: "${request.text}"

Retorne apenas o texto melhorado, sem explicações adicionais.`;
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const enhancedText = response.text().trim();

    return {
      enhancedText,
      suggestions: [
        'Texto melhorado com IA Gemini',
        'Focado em impacto e resultados',
        'Linguagem profissional otimizada'
      ]
    };
  } catch (error) {
    console.error('Erro ao conectar com Gemini:', error);
    throw new Error('Erro ao processar com IA. Verifique sua API key e tente novamente.');
  }
};

// Future OpenAI integration would look like this:
/*
const OPENAI_API_KEY = process.env.VITE_OPENAI_API_KEY;

export const enhanceText = async (request: AIEnhancementRequest): Promise<AIEnhancementResponse> => {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: request.type === 'summary' 
            ? 'You are a professional CV writer. Enhance the given summary to be more compelling and professional.'
            : 'You are a professional CV writer. Enhance the given job experience description with specific achievements and action verbs.'
        },
        {
          role: 'user',
          content: request.text
        }
      ],
      max_tokens: 200,
      temperature: 0.7,
    }),
  });

  const data = await response.json();
  return {
    enhancedText: data.choices[0].message.content,
  };
};
*/