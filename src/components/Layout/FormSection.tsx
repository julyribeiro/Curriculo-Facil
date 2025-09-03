import { ReactNode } from 'react';
import { APIKeySetup } from '@/components/AI/APIKeySetup';

interface FormSectionProps {
  children: ReactNode;
}

export const FormSection = ({ children }: FormSectionProps) => {
  return (
    <div className="w-1/2 h-screen overflow-y-auto bg-background p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="animate-fade-in bg-card p-6 rounded-xl shadow-elegant border border-card-border">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                Currículo Fácil
              </h1>
              <p className="text-muted-foreground text-lg">
                Crie seu currículo profissional com a ajuda da inteligência artificial
              </p>
            </div>
            <APIKeySetup />
          </div>
        </div>
        
        <div className="space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
};