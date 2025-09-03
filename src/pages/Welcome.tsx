import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

const Welcome = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (name.trim()) {
      // Salvar o nome no localStorage para usar depois
      localStorage.setItem('userName', name.trim());
      navigate('/builder');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Card className="p-8 shadow-elegant border border-card-border">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
              Gerador de Currículo Fácil
            </h1>
            <p className="text-lg text-muted-foreground mb-2">
              Olá, seja bem-vindo ao Gerador de Currículo Fácil!
            </p>
            <p className="text-muted-foreground">
              Crie seu currículo profissional com a ajuda da inteligência artificial
            </p>
          </div>

          <form onSubmit={handleStart} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Para começar, qual é o seu nome?
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Digite seu nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full"
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 text-base font-medium"
              disabled={!name.trim()}
            >
              Começar a criar meu currículo
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Welcome;