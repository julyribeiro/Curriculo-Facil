import { PersonalInfo, Skill, Experience } from '@/types/cv.types';

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\(\)\d\s\-\+]{10,}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const validateLinkedIn = (linkedin: string): boolean => {
  if (!linkedin) return true; // Optional field
  const linkedinRegex = /^https?:\/\/(www\.)?linkedin\.com\/in\/[\w\-]+\/?$/;
  return linkedinRegex.test(linkedin);
};

export const validatePersonalInfo = (personalInfo: PersonalInfo): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!personalInfo.fullName.trim()) {
    errors.push('Nome completo é obrigatório');
  }

  if (!personalInfo.email.trim()) {
    errors.push('E-mail é obrigatório');
  } else if (!validateEmail(personalInfo.email)) {
    errors.push('E-mail inválido');
  }

  if (!personalInfo.phone.trim()) {
    errors.push('Telefone é obrigatório');
  } else if (!validatePhone(personalInfo.phone)) {
    errors.push('Telefone inválido');
  }

  if (personalInfo.linkedin && !validateLinkedIn(personalInfo.linkedin)) {
    errors.push('URL do LinkedIn inválida');
  }

  if (personalInfo.summary.length > 300) {
    errors.push('Resumo deve ter no máximo 300 caracteres');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateSkill = (skill: Skill): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!skill.name.trim()) {
    errors.push('Nome da habilidade é obrigatório');
  }

  if (!['Básico', 'Intermediário', 'Avançado'].includes(skill.level)) {
    errors.push('Nível da habilidade deve ser Básico, Intermediário ou Avançado');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateExperience = (experience: Experience): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!experience.company.trim()) {
    errors.push('Nome da empresa é obrigatório');
  }

  if (!experience.position.trim()) {
    errors.push('Cargo é obrigatório');
  }

  if (!experience.startDate) {
    errors.push('Data de início é obrigatória');
  }

  if (!experience.isCurrentJob && !experience.endDate) {
    errors.push('Data de fim é obrigatória quando não é trabalho atual');
  }

  if (experience.startDate && experience.endDate && !experience.isCurrentJob) {
    const startDate = new Date(experience.startDate);
    const endDate = new Date(experience.endDate);
    
    if (endDate <= startDate) {
      errors.push('Data de fim deve ser posterior à data de início');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};