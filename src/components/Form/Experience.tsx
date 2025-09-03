import { Experience as ExperienceType } from '@/types/cv.types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2, Briefcase } from 'lucide-react';
import { AIEnhanceButton } from './AIEnhanceButton';
import { useAIEnhancement } from '@/hooks/useAIEnhancement';
import { useState } from 'react';

interface ExperienceProps {
  experiences: ExperienceType[];
  onAddExperience: (experience: Omit<ExperienceType, 'id'>) => void;
  onUpdateExperience: (id: string, experience: Partial<ExperienceType>) => void;
  onRemoveExperience: (id: string) => void;
}

export const Experience = ({ experiences, onAddExperience, onUpdateExperience, onRemoveExperience }: ExperienceProps) => {
  const { enhanceExperience, loadingState } = useAIEnhancement();
  const [expandedExperience, setExpandedExperience] = useState<string | null>(null);

  const [newExperience, setNewExperience] = useState<Omit<ExperienceType, 'id'>>({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    isCurrentJob: false,
    description: ''
  });

  const handleAddExperience = () => {
    if (newExperience.company.trim() && newExperience.position.trim()) {
      onAddExperience(newExperience);
      setNewExperience({
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        isCurrentJob: false,
        description: ''
      });
    }
  };

  const handleEnhanceDescription = async (experience: ExperienceType) => {
    if (!experience.description.trim()) return;
    
    const enhanced = await enhanceExperience(experience.description, {
      position: experience.position,
      company: experience.company
    });
    
    if (enhanced) {
      onUpdateExperience(experience.id, { description: enhanced });
    }
  };

  return (
    <div className="cv-form-section">
      <div className="cv-section-header">
        <h3 className="text-xl font-semibold">Experiência Profissional</h3>
        <span className="text-sm text-muted-foreground">{experiences.length} experiências</span>
      </div>

      {/* Add new experience */}
      <div className="space-y-4 p-4 bg-cv-experience/5 rounded-lg border border-cv-experience/20">
        <Label className="text-sm font-medium flex items-center gap-2">
          <Briefcase className="h-4 w-4 text-cv-experience" />
          Adicionar Nova Experiência
        </Label>
        
        <div className="grid grid-cols-2 gap-3">
          <Input
            value={newExperience.company}
            onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
            placeholder="Nome da empresa"
          />
          <Input
            value={newExperience.position}
            onChange={(e) => setNewExperience({ ...newExperience, position: e.target.value })}
            placeholder="Cargo"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-xs text-muted-foreground">Data de início</Label>
            <Input
              type="month"
              value={newExperience.startDate}
              onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
            />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Data de fim</Label>
            <Input
              type="month"
              value={newExperience.endDate}
              onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
              disabled={newExperience.isCurrentJob}
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="current-job"
            checked={newExperience.isCurrentJob}
            onCheckedChange={(checked) =>
              setNewExperience({ 
                ...newExperience, 
                isCurrentJob: checked as boolean,
                endDate: checked ? '' : newExperience.endDate
              })
            }
          />
          <Label htmlFor="current-job" className="text-sm">
            Trabalho atual
          </Label>
        </div>

        <Textarea
          value={newExperience.description}
          onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
          placeholder="Descreva suas principais responsabilidades e conquistas..."
          rows={3}
        />

        <Button
          onClick={handleAddExperience}
          disabled={!newExperience.company.trim() || !newExperience.position.trim()}
          className="w-full bg-cv-experience hover:bg-cv-experience/90 text-cv-experience-foreground"
        >
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Experiência
        </Button>
      </div>

      {/* Existing experiences */}
      <div className="space-y-4">
        {experiences.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Briefcase className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>Nenhuma experiência adicionada ainda.</p>
            <p className="text-sm">Adicione suas experiências profissionais mais relevantes.</p>
          </div>
        ) : (
          experiences.map((experience) => (
            <div key={experience.id} className="p-4 bg-card border border-card-border rounded-lg space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      value={experience.company}
                      onChange={(e) => onUpdateExperience(experience.id, { company: e.target.value })}
                      placeholder="Empresa"
                    />
                    <Input
                      value={experience.position}
                      onChange={(e) => onUpdateExperience(experience.id, { position: e.target.value })}
                      placeholder="Cargo"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      type="month"
                      value={experience.startDate}
                      onChange={(e) => onUpdateExperience(experience.id, { startDate: e.target.value })}
                    />
                    <Input
                      type="month"
                      value={experience.endDate}
                      onChange={(e) => onUpdateExperience(experience.id, { endDate: e.target.value })}
                      disabled={experience.isCurrentJob}
                      placeholder={experience.isCurrentJob ? "Atual" : ""}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={experience.isCurrentJob}
                      onCheckedChange={(checked) =>
                        onUpdateExperience(experience.id, { 
                          isCurrentJob: checked as boolean,
                          endDate: checked ? '' : experience.endDate
                        })
                      }
                    />
                    <Label className="text-sm">Trabalho atual</Label>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Descrição</Label>
                      <AIEnhanceButton
                        onClick={() => handleEnhanceDescription(experience)}
                        isLoading={loadingState.isLoading}
                        disabled={!experience.description.trim()}
                        size="sm"
                      />
                    </div>
                    <Textarea
                      value={experience.description}
                      onChange={(e) => onUpdateExperience(experience.id, { description: e.target.value })}
                      placeholder="Descreva suas principais responsabilidades e conquistas..."
                      rows={3}
                    />
                  </div>
                </div>

                <Button
                  onClick={() => onRemoveExperience(experience.id)}
                  variant="outline"
                  size="sm"
                  className="ml-3 text-destructive hover:text-destructive-foreground hover:bg-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
