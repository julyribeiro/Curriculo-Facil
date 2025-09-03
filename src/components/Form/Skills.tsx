import { Skill } from '@/types/cv.types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface SkillsProps {
  skills: Skill[];
  onAddSkill: (skill: Omit<Skill, 'id'>) => void;
  onUpdateSkill: (id: string, skill: Partial<Skill>) => void;
  onRemoveSkill: (id: string) => void;
}

export const Skills = ({ skills, onAddSkill, onUpdateSkill, onRemoveSkill }: SkillsProps) => {
  const [newSkill, setNewSkill] = useState<Omit<Skill, 'id'>>({
    name: '',
    level: 'Intermediário'
  });

  const handleAddSkill = () => {
    if (newSkill.name.trim()) {
      onAddSkill(newSkill);
      setNewSkill({ name: '', level: 'Intermediário' });
    }
  };

  const skillLevels = ['Básico', 'Intermediário', 'Avançado'] as const;

  return (
    <div className="cv-form-section">
      <div className="cv-section-header">
        <h3 className="text-xl font-semibold">Habilidades</h3>
        <span className="text-sm text-muted-foreground">{skills.length} habilidades</span>
      </div>

      {/* Add new skill */}
      <div className="space-y-3 p-4 bg-cv-accent/5 rounded-lg border border-cv-accent/20">
        <Label className="text-sm font-medium text-cv-accent">Adicionar Nova Habilidade</Label>
        <div className="flex gap-2">
          <Input
            value={newSkill.name}
            onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
            placeholder="Nome da habilidade"
            className="flex-1"
            onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
          />
          <Select
            value={newSkill.level}
            onValueChange={(value: 'Básico' | 'Intermediário' | 'Avançado') => 
              setNewSkill({ ...newSkill, level: value })
            }
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {skillLevels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            onClick={handleAddSkill}
            disabled={!newSkill.name.trim()}
            size="sm"
            className="bg-cv-accent hover:bg-cv-accent/90 text-cv-accent-foreground"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Existing skills */}
      <div className="space-y-3">
        {skills.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>Nenhuma habilidade adicionada ainda.</p>
            <p className="text-sm">Adicione suas competências técnicas e interpessoais.</p>
          </div>
        ) : (
          skills.map((skill) => (
            <div key={skill.id} className="flex items-center gap-3 p-3 bg-card border border-card-border rounded-lg">
              <Input
                value={skill.name}
                onChange={(e) => onUpdateSkill(skill.id, { name: e.target.value })}
                className="flex-1"
              />
              <Select
                value={skill.level}
                onValueChange={(value: 'Básico' | 'Intermediário' | 'Avançado') => 
                  onUpdateSkill(skill.id, { level: value })
                }
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {skillLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                onClick={() => onRemoveSkill(skill.id)}
                variant="outline"
                size="sm"
                className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
