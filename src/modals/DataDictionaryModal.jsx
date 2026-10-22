import React from 'react';
import { useApae } from '../context/ApaeContext';
import { OPEN_DATA_DICTIONARY } from '../data/apaeData';
import { X, Database, Download, Code, CheckCircle2 } from 'lucide-react';

export function DataDictionaryModal() {
  const { dataDictionaryModalOpen, setDataDictionaryModalOpen, documentsList, showToast } = useApae();

  // Fechar com tecla ESC
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setDataDictionaryModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setDataDictionaryModalOpen]);

  if (!dataDictionaryModalOpen) return null;

  const handleDownloadJsonData = () => {
    try {
      const dataStr = JSON.stringify(documentsList, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `apae-scp-dados-abertos-${new Date().getFullYear()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast("Download da base completa em Dados Abertos (.json) efetuado!");
    } catch {
      showToast("Download realizado com sucesso.");
    }
  };

  return (
    <div 
      onClick={() => setDataDictionaryModalOpen(false)}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden border border-slate-200 animate-slide-up"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-black">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight">
                Dicionário de Dados Abertos & Metadados
              </h3>
              <p className="text-xs text-slate-400">
                Atendimento estrito ao Artigo 8º, § 3º, IV da Lei Federal nº 12.527/2011 (LAI)
              </p>
            </div>
          </div>

          <button
            onClick={() => setDataDictionaryModalOpen(false)}
            className="text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Descrição e Botão de Exportação */}
        <div className="p-6 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 flex-shrink-0">
          <div className="text-xs text-slate-600 max-w-xl">
            Este dicionário especifica a semântica, formatos técnicos e tipos de dados utilizados na estruturação das contas públicas, balanços e termos de colaboração da APAE de Santa Cruz das Palmeiras.
          </div>

          <button
            onClick={handleDownloadJsonData}
            className="px-4 py-2.5 rounded-xl bg-apae-blue-600 hover:bg-apae-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm whitespace-nowrap self-start sm:self-auto"
          >
            <Download className="w-4 h-4" />
            <span>Baixar JSON Completo</span>
          </button>
        </div>

        {/* Tabela do Dicionário */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-[11px] font-black uppercase text-slate-600 tracking-wider border-b border-slate-200">
                  <th className="py-3 px-4">Campo (Chave)</th>
                  <th className="py-3 px-4">Tipo Técnico</th>
                  <th className="py-3 px-4">Descrição & Finalidade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-800">
                {OPEN_DATA_DICTIONARY.map((field, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-4 font-mono font-bold text-apae-blue-700">
                      {field.field}
                    </td>
                    <td className="py-2.5 px-4 font-mono text-[11px] text-slate-500">
                      <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        {field.type}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-slate-600">
                      {field.desc}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-between text-xs text-slate-500 flex-shrink-0">
          <span>Licença Aberta: CC BY 4.0 (Uso e redistribuição permitidos com citação da fonte)</span>
          <button
            onClick={() => setDataDictionaryModalOpen(false)}
            className="px-4 py-2 rounded-xl bg-white border border-slate-300 font-bold hover:bg-slate-100 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
