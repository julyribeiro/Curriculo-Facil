import { Button } from '@/components/ui/button';
import { Download, Printer, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface CVActionsProps {
  cvRef: React.RefObject<HTMLDivElement>;
  personalName?: string;
}

export const CVActions = ({ cvRef, personalName = 'curriculo' }: CVActionsProps) => {
  const { toast } = useToast();

  const handlePrint = () => {
    if (cvRef.current) {
      const printContent = cvRef.current.innerHTML;
      const originalContent = document.body.innerHTML;

      document.body.innerHTML = `
        <div style="background: white; color: black; padding: 20px;">
          ${printContent}
        </div>
      `;

      window.print();
      document.body.innerHTML = originalContent;
      window.location.reload();
    }
  };

  const handleDownloadPDF = async () => {
    if (!cvRef.current) return;

    try {
      const canvas = await html2canvas(cvRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        allowTaint: false
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${personalName.replace(/\s+/g, '_')}_curriculo.pdf`);
      
      toast({
        title: "PDF gerado com sucesso!",
        description: "Seu currículo foi baixado em formato PDF.",
      });
    } catch (error) {
      toast({
        title: "Erro ao gerar PDF",
        description: "Ocorreu um erro ao gerar o arquivo PDF.",
        variant: "destructive",
      });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Currículo - ${personalName}`,
          text: `Confira meu currículo profissional criado com CV Builder AI`,
          url: window.location.href,
        });
      } catch (error) {
        // User cancelled or error occurred
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copiado!",
      description: "Link do currículo copiado para área de transferência.",
    });
  };

  return (
    <div className="flex flex-wrap gap-3 mb-6 p-4 bg-secondary/50 rounded-lg border border-card-border">
      <Button
        onClick={handleDownloadPDF}
        variant="outline"
        size="sm"
        className="bg-white text-gray-700 border-gray-300 hover:bg-gray-50 shadow-sm"
      >
        <Download className="h-4 w-4 mr-2" />
        Baixar PDF
      </Button>
      
      <Button
        onClick={handlePrint}
        variant="outline"
        size="sm"
        className="bg-white text-gray-700 border-gray-300 hover:bg-gray-50 shadow-sm"
      >
        <Printer className="h-4 w-4 mr-2" />
        Imprimir
      </Button>
      
      <Button
        onClick={handleShare}
        variant="outline"
        size="sm"
        className="bg-white text-gray-700 border-gray-300 hover:bg-gray-50 shadow-sm"
      >
        <Share2 className="h-4 w-4 mr-2" />
        Compartilhar
      </Button>
    </div>
  );
};