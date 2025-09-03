export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  linkedin: string;
  summary: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'Básico' | 'Intermediário' | 'Avançado';
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  isCurrentJob: boolean;
  description: string;
}

export interface CVData {
  personalInfo: PersonalInfo;
  skills: Skill[];
  experiences: Experience[];
}

export const initialCVData: CVData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    linkedin: '',
    summary: ''
  },
  skills: [],
  experiences: []
};