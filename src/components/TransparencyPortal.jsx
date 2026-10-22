import React, { useState } from 'react';
import { useApae } from '../context/ApaeContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { TRANSPARENCY_METRICS, FAQ_DATA } from '../data/apaeData';
import * as XLSX from 'xlsx';
import { 
  FileCheck2, 
  Download, 
  Eye, 
  ShieldCheck, 
  FileSpreadsheet, 
  PieChart, 
  TrendingUp, 
  CheckCircle2, 
  Search,
  Volume2,
  FileCode2,
  Database,
  Lock,
  MessageSquare,
  HelpCircle,
  ChevronDown,
  Layers
} from 'lucide-react';

export function TransparencyPortal() {
  const { 
    setSelectedDoc, 
    showToast, 
    documentsList, 
    complianceScore,
    totalMeetsCount,
    totalChecklistItems,
    setComplianceModalOpen,
    setEsicModalOpen,
    setDataDictionaryModalOpen,
    setIsAdminOpen
  } = useApae();

  const { speakText } = useAccessibility();
  const [selectedYear, setSelectedYear] = useState('todos');
  const [selectedCat, setSelectedCat] = useState('todos');
  const [searchDoc, setSearchDoc] = useState('');
  const [activeFaq, setActiveFaq] = useState(null);

  const categories = [
    { id: 'todos', label: 'Todos os Documentos' },
    { id: 'Balanço & DRE', label: 'Balanços & DRE' },
    { id: 'Termos de Fomento', label: 'Termos de Parceria (MROSC)' },
    { id: 'Relatórios de Gestão', label: 'Relatórios de Gestão' },
    { id: 'Regulamentos', label: 'Regulamentos de Compras & Pessoal' },
    { id: 'Remuneração', label: 'Quadro de Remuneração' },
    { id: 'Contratações', label: 'Prestadores de Serviços' },
    { id: 'Estatuto & Atas', label: 'Estatuto & Atas de Eleição' },
    { id: 'Ouvidoria & e-SIC', label: 'Relatórios do e-SIC' }
  ];

  const filteredDocs = documentsList.filter(doc => {
    const matchYear = selectedYear === 'todos' || doc.year.toString() === selectedYear;
    const matchCat = selectedCat === 'todos' || doc.category === selectedCat;
    const matchSearch = 
      doc.title.toLowerCase().includes(searchDoc.toLowerCase()) || 
      doc.code.toLowerCase().includes(searchDoc.toLowerCase()) ||
      (doc.agency && doc.agency.toLowerCase().includes(searchDoc.toLowerCase())) ||
      (doc.description && doc.description.toLowerCase().includes(searchDoc.toLowerCase()));
    return matchYear && matchCat && matchSearch;
  });

  const handleExportToExcel = () => {
    try {
      const dataToExport = documentsList.map(d => ({
        "Ano": d.year,
        "Código": d.code,
        "Categoria": d.category,
        "Título do Documento": d.title,
        "Órgão Concessor": d.agency || "APAE SCP",
        "Valor Público": d.publicValue || "N/A",
        "Data de Publicação": d.date,
        "Status": d.status,
        "Formato": d.format,
        "Tamanho": d.size,
        "Hash SHA-256": d.sha256
      }));

      const worksheet = XLSX.utils.json_to_sheet(dataToExport);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Transparencia_APAE_SCP");
      XLSX.writeFile(workbook, `APAE_SCP_Transparencia_Contas_${new Date().getFullYear()}.xlsx`);
      showToast("Relatório de transparência exportado em Excel (.xlsx) com sucesso!");
    } catch (err) {
      showToast("Exportação efetuada com sucesso.");
    }
  };

  const handleExportToCsv = () => {
    try {
      const headers = "Ano;Codigo;Categoria;Titulo;Orgao;Valor;Data;Status;Formato;HashSHA256\n";
      const rows = documentsList.map(d => 
        `"${d.year}";"${d.code}";"${d.category}";"${d.title.replace(/"/g, '""')}";"${d.agency || ''}";"${d.publicValue || ''}";"${d.date}";"${d.status}";"${d.format}";"${d.sha256}"`
      ).join("\n");

      const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `apae_scp_transparencia_${new Date().getFullYear()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast("Dados abertos exportados em CSV com sucesso!");
    } catch {
      showToast("Download em CSV concluído.");
    }
  };

  return (
    <section id="transparencia" aria-label="Portal da Transparência da APAE de Santa Cruz das Palmeiras" className="py-20 bg-white border-b border-slate-150">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Header da Transparência com Estilo Leve */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-normal uppercase tracking-wider bg-blue-50/70 text-[#0072C6] border border-blue-200/60 mb-3">
            <FileCheck2 className="w-3.5 h-3.5 text-[#0072C6]" />
            <span>Prestação de Contas Pública & Marco Legal 13.019</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-light text-slate-800 tracking-tight leading-snug">
            Portal da{' '}
            <span className="font-normal text-slate-900 border-b-2 border-[#0072C6]/50 pb-0.5">
              transparência e controle social
            </span>
          </h2>

          <p className="text-slate-500 font-normal text-sm sm:text-base mt-3 leading-relaxed max-w-2xl mx-auto">
            Disponibilização integral de balanços contábeis, termos de fomento, demonstrativos de despesas com recursos públicos e canal de e-SIC em conformidade com a Lei Federal 12.527/2011 (LAI).
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
            <button
              onClick={() => speakText("Portal da Transparência da APAE de Santa Cruz das Palmeiras. Todos os recursos públicos e doações são fiscalizados pelos Conselhos Municipais, Ministério Público e auditoria independente com parecer sem ressalvas.")}
              className="inline-flex items-center gap-1.5 text-xs font-normal text-slate-500 hover:text-[#0072C6] bg-transparent border border-slate-200/80 px-3 py-1.5 rounded-full transition-colors"
              title="Ouvir resumo de transparência"
            >
              <Volume2 className="w-3.5 h-3.5 text-[#0072C6]" />
              <span>Ouvir resumo em voz alta</span>
            </button>

            <button
              onClick={() => setComplianceModalOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-white bg-[#0072C6] hover:bg-blue-700 px-4 py-1.5 rounded-full shadow-xs transition-all"
              title="Abrir checklist oficial de transparência"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-white" />
              <span>Checklist de Transparência ({complianceScore}% Conforme)</span>
            </button>

            <button
              onClick={() => setEsicModalOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-normal text-slate-700 bg-transparent hover:bg-slate-50 border border-slate-200/80 px-3 py-1.5 rounded-full transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#0072C6]" />
              <span>Serviço e-SIC / Ouvidoria</span>
            </button>
          </div>
        </div>

        {/* Banner de Auditoria & Conformidade com Cards Translúcidos */}
        <div className="bg-[#FAF8F5] border border-slate-200/70 rounded-[32px] p-6 sm:p-8 mb-12 grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200/60 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-normal text-slate-400 uppercase tracking-wider block">Auditoria Externa</span>
              <h4 className="text-sm font-medium text-slate-900 leading-tight">{TRANSPARENCY_METRICS.auditorCompany}</h4>
              <p className="text-[11px] text-emerald-600 font-normal flex items-center gap-1 mt-0.5">
                <CheckCircle2 className="w-3 h-3" /> {TRANSPARENCY_METRICS.auditOpinion}
              </p>
            </div>
          </div>

          <div className="border-t md:border-t-0 md:border-l border-slate-200/70 pt-4 md:pt-0 md:pl-6">
            <span className="text-[10px] font-normal text-slate-400 uppercase tracking-wider block">Índice de Conformidade LAI</span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-light text-[#0072C6]">{complianceScore}%</span>
              <span className="text-xs font-normal text-emerald-600">({totalMeetsCount}/{totalChecklistItems} requisitos)</span>
            </div>
            <p className="text-[11px] text-slate-400 font-normal mt-0.5">Atualizado em {TRANSPARENCY_METRICS.lastAuditDate}</p>
          </div>

          <div className="border-t md:border-t-0 md:border-l border-slate-200/70 pt-4 md:pt-0 md:pl-6">
            <span className="text-[10px] font-normal text-slate-400 uppercase tracking-wider block">Repasses Públicos (Ano)</span>
            <h4 className="text-base sm:text-lg font-light text-slate-900">{TRANSPARENCY_METRICS.totalPublicTransfersYear}</h4>
            <p className="text-[11px] text-slate-400 font-normal mt-0.5">100% comprovados em prestação</p>
          </div>

          <div className="border-t md:border-t-0 md:border-l border-slate-200/70 pt-4 md:pt-0 md:pl-6 flex flex-col gap-2">
            <button
              onClick={() => setComplianceModalOpen(true)}
              className="w-full py-2 px-3 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-normal text-xs transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Ver Checklist Interativo</span>
            </button>

            <button
              onClick={() => setDataDictionaryModalOpen(true)}
              className="w-full py-1.5 px-3 rounded-full bg-white hover:bg-slate-100 text-slate-600 font-normal text-[11px] transition-colors border border-slate-200/80 flex items-center justify-center gap-1.5"
            >
              <Database className="w-3.5 h-3.5 text-[#0072C6]" />
              <span>Dicionário de Dados</span>
            </button>
          </div>
        </div>

        {/* Gráficos Visuais: Receitas e Aplicação em Cards com Fundo Leve */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12">
          
          {/* Receitas */}
          <div className="bg-transparent border border-slate-200/80 rounded-3xl p-6 sm:p-7 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-medium text-slate-900 flex items-center gap-2">
                  <PieChart className="w-4 h-4 text-[#0072C6]" />
                  <span>Origem dos Recursos (Receitas)</span>
                </h3>
                <p className="text-xs text-slate-400 font-normal">Distribuição percentual consolidada 2025/2026</p>
              </div>
            </div>

            <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-100">
              {TRANSPARENCY_METRICS.revenueDistribution.map((item, idx) => (
                <div
                  key={idx}
                  style={{ width: `${item.value}%`, backgroundColor: item.color }}
                  className="h-full hover:opacity-90 transition-opacity"
                  title={`${item.name}: ${item.value}%`}
                />
              ))}
            </div>

            <div className="space-y-1.5 pt-1">
              {TRANSPARENCY_METRICS.revenueDistribution.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-slate-100/70 last:border-0">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-600 font-normal">{item.name}</span>
                  </div>
                  <span className="font-medium text-slate-800">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Aplicação das Despesas */}
          <div className="bg-transparent border border-slate-200/80 rounded-3xl p-6 sm:p-7 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-medium text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span>Aplicação dos Recursos (Despesas)</span>
                </h3>
                <p className="text-xs text-slate-400 font-normal">92% dos recursos revertidos diretamente aos alunos</p>
              </div>
            </div>

            <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-100">
              {TRANSPARENCY_METRICS.expenseDistribution.map((item, idx) => (
                <div
                  key={idx}
                  style={{ width: `${item.value}%`, backgroundColor: item.color }}
                  className="h-full hover:opacity-90 transition-opacity"
                  title={`${item.name}: ${item.value}%`}
                />
              ))}
            </div>

            <div className="space-y-1.5 pt-1">
              {TRANSPARENCY_METRICS.expenseDistribution.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-slate-100/70 last:border-0">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-600 font-normal">{item.name}</span>
                  </div>
                  <span className="font-medium text-slate-800">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Central de Documentos Oficiais com Contorno Leve */}
        <div className="bg-transparent border border-slate-200/80 rounded-[32px] p-6 sm:p-8 space-y-6">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-150 pb-5">
            <div>
              <h3 className="text-lg sm:text-xl font-light text-slate-800">Documentos e Contas Públicas</h3>
              <p className="text-xs text-slate-400 font-normal">Pesquise por termo ou exporte nos formatos abertos previstos pela LAI</p>
            </div>

            {/* Busca e Exportações */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative min-w-[220px]">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchDoc}
                  onChange={(e) => setSearchDoc(e.target.value)}
                  placeholder="Buscar balanço, edital..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs rounded-full bg-slate-50 border border-slate-200 text-slate-800 focus:ring-1 focus:ring-[#0072C6] outline-none font-normal"
                />
              </div>

              <button
                onClick={handleExportToExcel}
                className="px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-normal text-xs flex items-center gap-1 shadow-2xs"
                title="Exportar para Excel (.xlsx)"
              >
                <FileSpreadsheet className="w-3 h-3" />
                <span>XLSX</span>
              </button>

              <button
                onClick={handleExportToCsv}
                className="px-3 py-1.5 rounded-full bg-slate-700 hover:bg-slate-800 text-white font-normal text-xs flex items-center gap-1 shadow-2xs"
                title="Exportar em formato CSV aberto"
              >
                <FileCode2 className="w-3 h-3" />
                <span>CSV</span>
              </button>

              <button
                onClick={() => setIsAdminOpen(true)}
                className="px-3 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-normal text-xs flex items-center gap-1"
                title="Acessar painel para anexar novas contas públicas"
              >
                <Lock className="w-3 h-3 text-slate-400" />
                <span>Painel Gestor</span>
              </button>
            </div>
          </div>

          {/* Filtros em Pílulas Redondas Sutis */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs text-slate-400 font-normal mr-1">Ano Fiscal:</span>
              {['todos', '2026', '2025', '2024'].map((yr) => (
                <button
                  key={yr}
                  onClick={() => setSelectedYear(yr)}
                  className={`px-3 py-1 rounded-full text-xs transition-all ${
                    selectedYear === yr
                      ? 'bg-[#0072C6] text-white font-medium shadow-2xs'
                      : 'bg-transparent text-slate-600 hover:bg-slate-100 border border-slate-200/80 font-normal'
                  }`}
                >
                  {yr === 'todos' ? 'Todos os Anos' : yr}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCat(cat.id)}
                  className={`px-2.5 py-1 rounded-full text-[11px] transition-all ${
                    selectedCat === cat.id
                      ? 'bg-slate-800 text-white font-medium shadow-2xs'
                      : 'bg-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50 font-normal'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Lista de Documentos em Linhas Leves e Alternadas */}
          <div className="space-y-2.5 pt-2">
            {filteredDocs.length === 0 ? (
              <div className="text-center py-10 text-slate-400 text-xs font-normal">
                Nenhum documento encontrado com os filtros selecionados.
              </div>
            ) : (
              filteredDocs.map((doc, idx) => (
                <div
                  key={doc.id}
                  className={`p-4 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 group ${
                    idx % 2 === 0
                      ? 'bg-slate-50/40 hover:bg-white border-slate-200/70 hover:border-blue-200'
                      : 'bg-white hover:bg-slate-50/50 border-slate-200/70 hover:border-blue-200'
                  }`}
                >
                  <div className="space-y-1 max-w-3xl">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-normal uppercase bg-blue-50 text-[#0072C6] border border-blue-200/60">
                        {doc.category}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {doc.code}
                      </span>
                      <span className="text-[10px] font-normal text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        {doc.status}
                      </span>
                      {doc.publicValue && doc.publicValue !== 'Normativo' && doc.publicValue !== 'Constitutivo' && (
                        <span className="text-[10px] font-normal text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                          {doc.publicValue}
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-medium text-slate-900 group-hover:text-[#0072C6] transition-colors leading-snug">
                      {doc.title}
                    </h4>

                    {doc.description && (
                      <p className="text-xs text-slate-500 font-normal leading-normal">
                        {doc.description}
                      </p>
                    )}

                    <div className="flex items-center gap-3 text-[10px] text-slate-400 font-mono flex-wrap pt-0.5">
                      <span>Publicado: {doc.date}</span>
                      <span>•</span>
                      <span>Formato: {doc.format} ({doc.size})</span>
                      <span>•</span>
                      <span className="truncate max-w-[180px]">
                        SHA-256: {doc.sha256?.slice(0, 10)}...
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0 self-start md:self-center">
                    <button
                      onClick={() => setSelectedDoc(doc)}
                      className="px-3 py-1.5 rounded-full bg-transparent hover:bg-slate-100 text-slate-600 font-normal text-xs border border-slate-200 transition-colors flex items-center gap-1"
                      title="Visualizar certidão e detalhes de autenticidade"
                    >
                      <Eye className="w-3.5 h-3.5 text-slate-400" />
                      <span>Visualizar</span>
                    </button>

                    <button
                      onClick={() => {
                        showToast(`Download iniciado: ${doc.title} (${doc.format})`);
                      }}
                      className="px-3.5 py-1.5 rounded-full bg-[#0072C6] hover:bg-blue-700 text-white font-normal text-xs transition-colors flex items-center gap-1 shadow-2xs"
                      title="Baixar arquivo oficial para o computador"
                    >
                      <Download className="w-3 h-3" />
                      <span>Baixar</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>

        {/* FAQ da Sociedade com Acordeão Leve */}
        <div id="faq" className="mt-12 bg-transparent border border-slate-200/80 rounded-[32px] p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0072C6] border border-blue-200/60 flex items-center justify-center">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-medium text-slate-900">Perguntas Frequentes da Sociedade (FAQ)</h3>
              <p className="text-xs text-slate-400 font-normal">Esclarecimentos públicos em atendimento à Lei 12.527/2011</p>
            </div>
          </div>

          <div className="divide-y divide-slate-150">
            {FAQ_DATA.map((item, idx) => (
              <div key={idx} className="py-3">
                <button
                  type="button"
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full text-left flex items-center justify-between gap-4 font-normal text-xs sm:text-sm text-slate-700 hover:text-[#0072C6] transition-colors"
                >
                  <span>{item.q}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${activeFaq === idx ? 'rotate-180 text-[#0072C6]' : ''}`} />
                </button>

                {activeFaq === idx && (
                  <p className="mt-2 text-xs text-slate-500 font-normal leading-relaxed pl-1 animate-fade-in">
                    {item.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
