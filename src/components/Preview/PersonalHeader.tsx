import { PersonalInfo } from '@/types/cv.types';
import { Mail, Phone, Linkedin } from 'lucide-react';

interface PersonalHeaderProps {
  personalInfo: PersonalInfo;
}

export const PersonalHeader = ({ personalInfo }: PersonalHeaderProps) => {
  const { fullName, email, phone, linkedin } = personalInfo;

  if (!fullName && !email && !phone && !linkedin) {
    return null;
  }

  return (
    <div className="mb-8 pb-6 border-b-2 border-blue-500">
      {fullName && (
        <h1 className="text-3xl lg:text-4xl font-bold text-black mb-3 tracking-tight">
          {fullName}
        </h1>
      )}
      
      <div className="flex flex-wrap gap-4 text-sm text-black">
        {email && (
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg border border-gray-200">
            <Mail className="h-4 w-4 text-blue-600" />
            <span className="font-medium">{email}</span>
          </div>
        )}
        
        {phone && (
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg border border-gray-200">
            <Phone className="h-4 w-4 text-blue-600" />
            <span className="font-medium">{phone}</span>
          </div>
        )}
        
        {linkedin && (
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg border border-gray-200">
            <Linkedin className="h-4 w-4 text-blue-600" />
            <span className="truncate max-w-64 font-medium">{linkedin}</span>
          </div>
        )}
      </div>
    </div>
  );
};