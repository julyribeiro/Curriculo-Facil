import { Button } from '@/components/ui/button';
import { Sparkles, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AIEnhanceButtonProps {
  onClick: () => void;
  isLoading: boolean;
  disabled?: boolean;
  size?: 'sm' | 'default' | 'lg';
  className?: string;
}

export const AIEnhanceButton = ({ 
  onClick, 
  isLoading, 
  disabled = false, 
  size = 'default',
  className 
}: AIEnhanceButtonProps) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled || isLoading}
      size={size}
      variant="outline"
      className={cn(
        "bg-gradient-primary border-0 text-white font-medium shadow-lg",
        "hover:shadow-xl hover:shadow-primary/40 transition-all duration-200",
        "text-shadow-sm",
        className
      )}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Melhorando...
        </>
      ) : (
        <>
          <Sparkles className="h-4 w-4 mr-2" />
          Melhorar com IA
        </>
      )}
    </Button>
  );
};