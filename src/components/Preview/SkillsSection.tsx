import { Skill } from '@/types/cv.types';

interface SkillsSectionProps {
  skills: Skill[];
}

export const SkillsSection = ({ skills }: SkillsSectionProps) => {
  if (skills.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-black mb-4 pb-2 border-b-2 border-blue-500">
        Competências Técnicas
      </h2>
      
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <div key={skill.id} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200 animate-fade-in">
            <span className="font-medium">{skill.name}</span>
            <span className="ml-2 text-xs opacity-75">
              {skill.level === 'Básico' ? '⭐' : skill.level === 'Intermediário' ? '⭐⭐' : '⭐⭐⭐'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};