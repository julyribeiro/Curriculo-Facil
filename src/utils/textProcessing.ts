export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format as (XX) XXXXX-XXXX for Brazilian phones
  if (cleaned.length === 11) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
  }
  
  // Format as (XX) XXXX-XXXX for landlines
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
  }
  
  return phone;
};

export const formatLinkedInUrl = (url: string): string => {
  if (!url) return '';
  
  // Add https:// if missing
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url;
  }
  
  // Ensure it's a LinkedIn URL
  if (!url.includes('linkedin.com')) {
    return url; // Return as-is if not LinkedIn
  }
  
  return url;
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};

export const capitalizeFirstLetter = (text: string): string => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const formatDateForDisplay = (dateString: string): string => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString + '-01'); // Add day for month input
    return date.toLocaleDateString('pt-BR', { 
      month: 'long', 
      year: 'numeric' 
    });
  } catch {
    return dateString;
  }
};

export const calculateWorkDuration = (startDate: string, endDate: string, isCurrentJob: boolean): string => {
  if (!startDate) return '';
  
  const start = new Date(startDate + '-01');
  const end = isCurrentJob ? new Date() : new Date(endDate + '-01');
  
  const diffInMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  
  if (diffInMonths < 1) return 'Menos de 1 mês';
  if (diffInMonths === 1) return '1 mês';
  if (diffInMonths < 12) return `${diffInMonths} meses`;
  
  const years = Math.floor(diffInMonths / 12);
  const months = diffInMonths % 12;
  
  let duration = `${years} ${years === 1 ? 'ano' : 'anos'}`;
  if (months > 0) {
    duration += ` e ${months} ${months === 1 ? 'mês' : 'meses'}`;
  }
  
  return duration;
};

export const extractKeywords = (text: string): string[] => {
  if (!text) return [];
  
  // Remove common stop words in Portuguese
  const stopWords = new Set([
    'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'com', 'da', 'das', 'de', 'do', 'dos',
    'e', 'em', 'for', 'from', 'has', 'he', 'in', 'is', 'it', 'its', 'na', 'nas', 'no', 'nos',
    'of', 'on', 'que', 'se', 'that', 'the', 'to', 'um', 'uma', 'was', 'were', 'will', 'with'
  ]);
  
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2 && !stopWords.has(word))
    .slice(0, 10); // Return top 10 keywords
};