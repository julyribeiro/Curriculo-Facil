import { PersonalInfo as PersonalInfoType } from '@/types/cv.types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AIEnhanceButton } from './AIEnhanceButton';
import { useAIEnhancement } from '@/hooks/useAIEnhancement';
import { useState } from 'react';

interface PersonalInfoProps {
  data: PersonalInfoType;
  onChange: (data: PersonalInfoType) => void;
}

export const PersonalInfo = ({ data, onChange }: PersonalInfoProps) => {
  const { enhanceSummary, loadingState } = useAIEnhancement();
  const [summaryCount, setSummaryCount] = useState(data.summary.length);

  const handleChange = (field: keyof PersonalInfoType, value: string) => {
    onChange({ ...data, [field]: value });
    if (field === 'summary') {
      setSummaryCount(value.length);
    }
  };

  const handleEnhanceSummary = async () => {
    if (!data.summary.trim()) return;
    
    const enhanced = await enhanceSummary(data.summary);
    if (enhanced) {
      handleChange('summary', enhanced);
    }
  };

  return (
    <div className="cv-form-section">
      <div className="cv-section-header">
        <h3 className="text-xl font-semibold">Dados Pessoais</h3>
      </div>

      <div className="space-y-4">
        <div className="cv-input-group">
          <Label htmlFor="fullName">Nome Completo *</Label>
          <Input
            id="fullName"
            value={data.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            placeholder="Seu nome completo"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="cv-input-group">
            <Label htmlFor="email">E-mail *</Label>
            <Input
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="seu@email.com"
              required
            />
          </div>

          <div className="cv-input-group">
            <Label htmlFor="phone">Telefone *</Label>
            <Input
              id="phone"
              value={data.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="(11) 99999-9999"
              required
            />
          </div>
        </div>

        <div className="cv-input-group">
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input
            id="linkedin"
            value={data.linkedin}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            placeholder="https://linkedin.com/in/seu-perfil"
          />
        </div>

        <div className="cv-input-group">
          <div className="flex items-center justify-between mb-2">
            <Label htmlFor="summary">Resumo Profissional</Label>
            <div className="flex items-center gap-2">
              <span className={`text-xs ${summaryCount > 300 ? 'text-destructive' : 'text-muted-foreground'}`}>
                {summaryCount}/300
              </span>
              <AIEnhanceButton
                onClick={handleEnhanceSummary}
                isLoading={loadingState.isLoading}
                disabled={!data.summary.trim()}
                size="sm"
              />
            </div>
          </div>
          <Textarea
            id="summary"
            value={data.summary}
            onChange={(e) => handleChange('summary', e.target.value)}
            placeholder="Descreva brevemente sua experiência e objetivos profissionais..."
            rows={4}
            maxLength={300}
          />
        </div>
      </div>
    </div>
  );
};