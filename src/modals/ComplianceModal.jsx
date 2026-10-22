import React, { useState } from 'react';
import { useApae } from '../context/ApaeContext';
import { X, Check, ShieldCheck, CheckCircle2, AlertTriangle, FileText, ExternalLink, Save } from 'lucide-react';

export function ComplianceModal() {
  const { 
    complianceModalOpen, 
    setComplianceModalOpen, 
    checklistData, 
    toggleChecklistItem, 
    saveChecklistData, 
    showToast,
    complianceScore,
    totalMeetsCount,
    totalChecklistItems
  } = useApae();

  const [activeTab, setActiveTab] = useState('group1'); // 'group1' | 'group2' | 'group3'
  const [localChecklist, setLocalChecklist] = useState(checklistData);

  // Sync with context when opened
  React.useEffect(() => {
    setLocalChecklist(checklistData);
  }, [checklistData, complianceModalOpen]);

  // Fechar com tecla ESC
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setComplianceModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setComplianceModalOpen]);

  if (!complianceModalOpen) return null;

  const currentGroupKey = 
    activeTab === 'group1' ? 'group1_art7_8_1' :
    activeTab === 'group2' ? 'group2_art8_3' : 'group3_mrosc';

  const currentGroup = localChecklist[currentGroupKey];

  const handleToggle = (itemId) => {
    setLocalChecklist(prev => {
      const group = { ...prev[currentGroupKey] };
      group.items = group.items.map(item => {
        if (item.id === itemId) {
          return { ...item, meets: !item.meets };
        }
        return item;
      });
      return {
        ...prev,
        [currentGroupKey]: group
      };
    });
  };

  const handleSave = () => {
    saveChecklistData(localChecklist);
    showToast("Requisitos de Transparência cadastrados e homologados com sucesso!");
    setComplianceModalOpen(false);
  };

  // Calcular contagens locais
  const localMeetsCount = 
    localChecklist.group1_art7_8_1.items.filter(i => i.meets).length +
    localChecklist.group2_art8_3.items.filter(i => i.meets).length +
    localChecklist.group3_mrosc.items.filter(i => i.meets).length;

  const localScore = Math.round((localMeetsCount / totalChecklistItems) * 100);

  return (
    <div 
      onClick={() => setComplianceModalOpen(false)}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in"
    >
      {/* Modal Dialog com o mesmo layout e cabeçalho azul do print oficial */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden border border-slate-200 animate-slide-up"
        role="dialog"
        aria-modal="true"
        aria-labelledby="compliance-title"
      >
        {/* Top Header Barra Azul Oficial (Idêntico ao print 'Atualizar transparência') */}
        <div className="bg-[#0072C6] text-white px-5 sm:px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-white/90" />
            <h3 id="compliance-title" className="text-base sm:text-lg font-bold tracking-tight">
              Atualizar transparência
            </h3>
            <span className="hidden sm:inline-block ml-3 px-2 py-0.5 rounded-full text-[11px] font-black bg-white/20 text-white">
              Conformidade: {localScore}% ({localMeetsCount}/{totalChecklistItems})
            </span>
          </div>

          <button
            onClick={() => setComplianceModalOpen(false)}
            className="text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-colors"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Abas Superiores de Navegação entre os 3 Grupos Oficiais da Imagem */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 sm:px-6 pt-2 flex items-center gap-2 overflow-x-auto flex-shrink-0 scrollbar-none">
          <button
            onClick={() => setActiveTab('group1')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'group1'
                ? 'border-[#0072C6] text-[#0072C6] bg-white rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Requisitos Arts. 7º e 8º § 1º
            <span className="ml-1.5 px-1.5 py-0.5 text-[10px] rounded-full bg-slate-200 text-slate-700">
              {localChecklist.group1_art7_8_1.items.filter(i => i.meets).length}/{localChecklist.group1_art7_8_1.items.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('group2')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'group2'
                ? 'border-[#0072C6] text-[#0072C6] bg-white rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Requisitos Art. 8º, § 3º
            <span className="ml-1.5 px-1.5 py-0.5 text-[10px] rounded-full bg-slate-200 text-slate-700">
              {localChecklist.group2_art8_3.items.filter(i => i.meets).length}/{localChecklist.group2_art8_3.items.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('group3')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'group3'
                ? 'border-[#0072C6] text-[#0072C6] bg-white rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Requisitos de divulgação das informações
            <span className="ml-1.5 px-1.5 py-0.5 text-[10px] rounded-full bg-slate-200 text-slate-700">
              {localChecklist.group3_mrosc.items.filter(i => i.meets).length}/{localChecklist.group3_mrosc.items.length}
            </span>
          </button>
        </div>

        {/* Tabela de Requisitos (Estilo Exato dos Prints) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h4 className="text-sm sm:text-base font-bold text-slate-800">
              {currentGroup.title}
            </h4>
            <span className="text-xs text-slate-500 hidden sm:inline">
              {currentGroup.lawReference}
            </span>
          </div>

          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100/80 border-b border-slate-200 text-[11px] font-black uppercase text-slate-600 tracking-wider">
                  <th className="py-3 px-3 sm:px-4 w-12 text-center">#</th>
                  <th className="py-3 px-3 sm:px-4">Requisito</th>
                  <th className="py-3 px-3 sm:px-4 w-28 sm:w-36 text-center">Atende?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm text-slate-800">
                {currentGroup.items.map((item) => (
                  <tr 
                    key={item.id}
                    className="hover:bg-blue-50/40 transition-colors"
                  >
                    {/* Número do Requisito */}
                    <td className="py-3 px-3 sm:px-4 text-center font-bold text-slate-500">
                      {item.num}
                    </td>

                    {/* Descrição do Requisito */}
                    <td className="py-3 px-3 sm:px-4 pr-2">
                      <div className="font-semibold text-slate-900 leading-snug">
                        {item.title}
                      </div>
                      {item.summary && (
                        <div className="text-[11px] text-slate-500 mt-1 leading-normal">
                          {item.summary}
                        </div>
                      )}
                      {item.docCode && (
                        <span className="inline-block mt-1 font-mono text-[10px] text-[#0072C6] bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                          Evidência: {item.docCode}
                        </span>
                      )}
                    </td>

                    {/* Toggle Switch 'SIM / NÃO' Fiel aos Prints */}
                    <td className="py-3 px-3 sm:px-4 text-center">
                      <button
                        type="button"
                        onClick={() => handleToggle(item.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0072C6] ${
                          item.meets
                            ? 'bg-[#0072C6] text-white hover:bg-blue-700'
                            : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                        }`}
                        title={item.meets ? 'Clique para desmarcar (NÃO)' : 'Clique para marcar (SIM)'}
                      >
                        {item.meets ? (
                          <>
                            <span>SIM</span>
                            <span className="w-4 h-4 rounded-full bg-white text-[#0072C6] flex items-center justify-center text-[10px] font-black">
                              ✓
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="w-4 h-4 rounded-full bg-slate-400 text-white flex items-center justify-center text-[9px] font-black">
                              ✕
                            </span>
                            <span>NÃO</span>
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Rodapé com Botões 'Fechar' e 'Cadastrar' Idêntico ao Print */}
        <div className="bg-slate-50 border-t border-slate-200 px-5 sm:px-6 py-4 flex items-center justify-end gap-3 flex-shrink-0">
          <button
            type="button"
            onClick={() => setComplianceModalOpen(false)}
            className="px-5 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs sm:text-sm transition-colors shadow-sm"
          >
            Fechar
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-[#0072C6] hover:bg-blue-700 text-white font-black text-xs sm:text-sm transition-all shadow-md flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Cadastrar</span>
          </button>
        </div>
      </div>
    </div>
  );
}
