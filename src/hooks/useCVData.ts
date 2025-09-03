import { useState, useCallback } from 'react';
import { CVData, PersonalInfo, Skill, Experience, initialCVData } from '@/types/cv.types';

export const useCVData = () => {
  const [cvData, setCVData] = useState<CVData>(() => {
    const saved = localStorage.getItem('cvBuilderData');
    return saved ? JSON.parse(saved) : initialCVData;
  });

  const saveToLocalStorage = useCallback((data: CVData) => {
    localStorage.setItem('cvBuilderData', JSON.stringify(data));
  }, []);

  const updatePersonalInfo = useCallback((personalInfo: PersonalInfo) => {
    setCVData(prev => {
      const newData = { ...prev, personalInfo };
      saveToLocalStorage(newData);
      return newData;
    });
  }, [saveToLocalStorage]);

  const addSkill = useCallback((skill: Omit<Skill, 'id'>) => {
    setCVData(prev => {
      const newSkill = { ...skill, id: Date.now().toString() };
      const newData = { ...prev, skills: [...prev.skills, newSkill] };
      saveToLocalStorage(newData);
      return newData;
    });
  }, [saveToLocalStorage]);

  const updateSkill = useCallback((id: string, skill: Partial<Skill>) => {
    setCVData(prev => {
      const newData = {
        ...prev,
        skills: prev.skills.map(s => s.id === id ? { ...s, ...skill } : s)
      };
      saveToLocalStorage(newData);
      return newData;
    });
  }, [saveToLocalStorage]);

  const removeSkill = useCallback((id: string) => {
    setCVData(prev => {
      const newData = { ...prev, skills: prev.skills.filter(s => s.id !== id) };
      saveToLocalStorage(newData);
      return newData;
    });
  }, [saveToLocalStorage]);

  const addExperience = useCallback((experience: Omit<Experience, 'id'>) => {
    setCVData(prev => {
      const newExperience = { ...experience, id: Date.now().toString() };
      const newData = { ...prev, experiences: [...prev.experiences, newExperience] };
      saveToLocalStorage(newData);
      return newData;
    });
  }, [saveToLocalStorage]);

  const updateExperience = useCallback((id: string, experience: Partial<Experience>) => {
    setCVData(prev => {
      const newData = {
        ...prev,
        experiences: prev.experiences.map(e => e.id === id ? { ...e, ...experience } : e)
      };
      saveToLocalStorage(newData);
      return newData;
    });
  }, [saveToLocalStorage]);

  const removeExperience = useCallback((id: string) => {
    setCVData(prev => {
      const newData = { ...prev, experiences: prev.experiences.filter(e => e.id !== id) };
      saveToLocalStorage(newData);
      return newData;
    });
  }, [saveToLocalStorage]);

  const clearAllData = useCallback(() => {
    setCVData(initialCVData);
    localStorage.removeItem('cvBuilderData');
  }, []);

  return {
    cvData,
    updatePersonalInfo,
    addSkill,
    updateSkill,
    removeSkill,
    addExperience,
    updateExperience,
    removeExperience,
    clearAllData
  };
};