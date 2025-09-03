import { ReactNode } from 'react';

interface PreviewSectionProps {
  children: ReactNode;
}

export const PreviewSection = ({ children }: PreviewSectionProps) => {
  return (
    <div className="w-1/2 h-screen overflow-y-auto bg-card p-6 border-l border-card-border">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 animate-fade-in bg-gradient-subtle p-4 rounded-xl border border-card-border shadow-sm">
          <h2 className="text-xl font-semibold text-foreground mb-2">Preview do Currículo</h2>
          <p className="text-muted-foreground text-sm">
            Visualização em tempo real do seu currículo profissional
          </p>
        </div>
        
        <div className="animate-slide-up">
          {children}
        </div>
      </div>
    </div>
  );
};