import { Experience } from '@/types/cv.types';
import { Calendar, Building } from 'lucide-react';

interface ExperienceSectionProps {
  experiences: Experience[];
}

export const ExperienceSection = ({ experiences }: ExperienceSectionProps) => {
  if (experiences.length === 0) return null;

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' });
  };

  const formatDateRange = (startDate: string, endDate: string, isCurrentJob: boolean) => {
    const start = formatDate(startDate);
    const end = isCurrentJob ? 'Atual' : formatDate(endDate);
    
    if (!start && !end) return '';
    if (!start) return end;
    if (!end || isCurrentJob) return `${start} - Atual`;
    
    return `${start} - ${end}`;
  };

  // Sort experiences by start date (most recent first)
  const sortedExperiences = [...experiences].sort((a, b) => {
    if (a.isCurrentJob && !b.isCurrentJob) return -1;
    if (!a.isCurrentJob && b.isCurrentJob) return 1;
    
    return new Date(b.startDate || '').getTime() - new Date(a.startDate || '').getTime();
  });

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-black mb-4 pb-2 border-b-2 border-blue-500">
        Experiência Profissional
      </h2>
      
      <div className="space-y-6">
        {sortedExperiences.map((experience, index) => (
          <div key={experience.id} className="relative">
            {/* Timeline connector */}
            {index < sortedExperiences.length - 1 && (
              <div className="absolute left-4 top-12 w-0.5 h-16 bg-blue-300" />
            )}
            
            <div className="flex gap-4">
              {/* Timeline dot */}
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mt-1 shadow-sm">
                <Building className="h-4 w-4 text-white" />
              </div>
              
              {/* Content */}
              <div className="flex-1 space-y-3 bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-lg text-black">
                      {experience.position}
                    </h3>
                    <p className="text-blue-600 font-medium">
                      {experience.company}
                    </p>
                  </div>
                  
                  {(experience.startDate || experience.endDate || experience.isCurrentJob) && (
                    <div className="flex items-center gap-1 text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
                      <Calendar className="h-3 w-3" />
                      {formatDateRange(experience.startDate, experience.endDate, experience.isCurrentJob)}
                    </div>
                  )}
                </div>
                
                {experience.description && (
                  <div className="text-gray-700 leading-relaxed whitespace-pre-wrap border-t border-gray-200 pt-3">
                    {experience.description}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};