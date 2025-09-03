import { CVData } from '@/types/cv.types';
import { PersonalHeader } from './PersonalHeader';
import { SkillsSection } from './SkillsSection';
import { ExperienceSection } from './ExperienceSection';
import { CVActions } from './CVActions';
import { useRef } from 'react';

interface CVPreviewProps {
  data: CVData;
}

export const CVPreview = ({ data }: CVPreviewProps) => {
  const cvRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <CVActions cvRef={cvRef} personalName={data.personalInfo.fullName} />
      
      <div 
        ref={cvRef}
        className="bg-white text-black p-8 rounded-lg border border-gray-300 shadow-lg min-h-[800px] print:shadow-none print:border-none"
      >
      <PersonalHeader personalInfo={data.personalInfo} />
      
      {data.personalInfo.summary && (
        <div className="mb-8 bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-lg font-semibold text-black mb-3 pb-2 border-b-2 border-blue-500">
            Resumo Profissional
          </h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-justify">
            {data.personalInfo.summary}
          </p>
        </div>
      )}

      {data.skills.length > 0 && (
        <SkillsSection skills={data.skills} />
      )}

      {data.experiences.length > 0 && (
        <ExperienceSection experiences={data.experiences} />
      )}

        {data.personalInfo.fullName === '' && data.skills.length === 0 && data.experiences.length === 0 && (
          <div className="text-center py-16 text-gray-500 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
            <div className="w-20 h-20 mx-auto mb-6 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-3xl">📄</span>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-black">Seu currículo aparecerá aqui</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Preencha os campos no formulário à esquerda para ver o preview em tempo real do seu currículo profissional
            </p>
          </div>
        )}
      </div>
    </div>
  );
};