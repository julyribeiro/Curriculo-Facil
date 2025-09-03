import { FormSection } from '@/components/Layout/FormSection';
import { PreviewSection } from '@/components/Layout/PreviewSection';
import { PersonalInfo } from '@/components/Form/PersonalInfo';
import { Skills } from '@/components/Form/Skills';
import { Experience } from '@/components/Form/Experience';
import { CVPreview } from '@/components/Preview/CVPreview';
import { useCVData } from '@/hooks/useCVData';

const Index = () => {
  const {
    cvData,
    updatePersonalInfo,
    addSkill,
    updateSkill,
    removeSkill,
    addExperience,
    updateExperience,
    removeExperience
  } = useCVData();

  return (
    <div className="flex h-screen bg-background">
      <FormSection>
        <PersonalInfo 
          data={cvData.personalInfo}
          onChange={updatePersonalInfo}
        />
        
        <Skills
          skills={cvData.skills}
          onAddSkill={addSkill}
          onUpdateSkill={updateSkill}
          onRemoveSkill={removeSkill}
        />
        
        <Experience
          experiences={cvData.experiences}
          onAddExperience={addExperience}
          onUpdateExperience={updateExperience}
          onRemoveExperience={removeExperience}
        />
      </FormSection>

      <PreviewSection>
        <CVPreview data={cvData} />
      </PreviewSection>
    </div>
  );
};

export default Index;
