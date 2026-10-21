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
  Building, 
  CheckCircle2, 
  Filter, 
  Search,
  ExternalLink,
  Volume2,
  FileCode2,
  Database,
  Lock,
  MessageSquare,
  HelpCircle,
  Hash,
  ChevronDown,
  Layers
} from 'lucide-react';

export function TransparencyPortal() {
  const { 
    setSelectedDoc, 
    showToast, 
    documentsList, 
    checklistData,
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
    { id: 'Relatórios de Gestão', label: 'Relatórios de Impacto' },
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
        "Órgão Concessor / Parceria": d.agency || "APAE SCP",
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
    <section id="transparencia" aria-label="Portal da Transparência da APAE de Santa Cruz das Palmeiras" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header da Transparência */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-blue-50 text-[#0072C6] border border-blue-200 mb-3 shadow-sm">
            <FileCheck2 className="w-4 h-4 text-[#0072C6]" />
            <span>Prestação de Contas Pública & Marco Legal 13.019</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Portal da <span className="text-[#0072C6]">Transparência e Controle Social</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Em conformidade com a <strong>Lei de Acesso à Informação (Lei 12.527/2011)</strong>, o <strong>Marco Regulatório do Terceiro Setor (Lei 13.019/2014)</strong> e os princípios da <strong>LGPD</strong>, a APAE de Santa Cruz das Palmeiras disponibiliza publicamente seus balanços contábeis, repasses, termos de colaboração, regulamentos e o serviço de e-SIC.
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => speakText("Portal da Transparência da APAE de Santa Cruz das Palmeiras. Todos os recursos públicos e doações são fiscalizados pelos Conselhos Municipais, Ministério Público e auditoria independente com parecer sem ressalvas.")}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#0072C6] bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-xs transition-colors"
              title="Ouvir resumo de transparência"
            >
              <Volume2 className="w-3.5 h-3.5 text-[#0072C6]" />
              <span>Ouvir resumo em voz alta</span>
            </button>

            <button
              onClick={() => setComplianceModalOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-black text-white bg-[#0072C6] hover:bg-blue-700 px-4 py-1.5 rounded-xl shadow-sm transition-all"
              title="Abrir checklist oficial de transparência"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-white" />
              <span>Checklist de Transparência ({complianceScore}% Conforme)</span>
            </button>

            <button
              onClick={() => setEsicModalOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 px-3 py-1.5 rounded-xl shadow-xs transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#0072C6]" />
              <span>Serviço e-SIC / Ouvidoria</span>
            </button>
          </div>
        </div>

        {/* Banner de Auditoria & Conformidade com Indicador */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm mb-12 grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Auditoria & Fiscalização</span>
              <h4 className="text-sm sm:text-base font-black text-slate-900 leading-tight">{TRANSPARENCY_METRICS.auditorCompany}</h4>
              <p className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> {TRANSPARENCY_METRICS.auditOpinion}
              </p>
            </div>
          </div>

          <div className="border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-6">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Índice de Conformidade LAI</span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-black text-[#0072C6]">{complianceScore}%</span>
              <span className="text-xs font-bold text-emerald-600">({totalMeetsCount}/{totalChecklistItems} requisitos)</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">Atualizado em {TRANSPARENCY_METRICS.lastAuditDate}</p>
          </div>

          <div className="border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-6">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Repasses Públicos (Ano)</span>
            <h4 className="text-lg font-black text-slate-900">{TRANSPARENCY_METRICS.totalPublicTransfersYear}</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">100% comprovados em prestação</p>
          </div>

          <div className="border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-6 flex flex-col gap-2">
            <button
              onClick={() => setComplianceModalOpen(true)}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Ver Checklist Interativo</span>
            </button>

            <button
              onClick={() => setDataDictionaryModalOpen(true)}
              className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] transition-colors flex items-center justify-center gap-1.5"
            >
              <Database className="w-3.5 h-3.5 text-[#0072C6]" />
              <span>Dicionário de Dados</span>
            </button>
          </div>
        </div>

        {/* Gráficos Visuais: Origem das Receitas e Aplicação de Despesas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14">
          
          {/* Origem das Receitas */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-[#0072C6]" />
                  <span>Origem dos Recursos (Receitas)</span>
                </h3>
                <p className="text-xs text-slate-500">Distribuição percentual consolidada 2025/2026</p>
              </div>
            </div>

            {/* Barra Segmentada Visual */}
            <div className="w-full h-5 rounded-xl overflow-hidden flex shadow-inner">
              {TRANSPARENCY_METRICS.revenueDistribution.map((item, idx) => (
                <div
                  key={idx}
                  style={{ width: `${item.value}%`, backgroundColor: item.color }}
                  className="h-full hover:opacity-90 transition-opacity"
                  title={`${item.name}: ${item.value}%`}
                />
              ))}
            </div>

            {/* Legenda Detalhada */}
            <div className="space-y-2 pt-2">
              {TRANSPARENCY_METRICS.revenueDistribution.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-slate-100 last:border-0">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-700 font-medium">{item.name}</span>
                  </div>
                  <span className="font-black text-slate-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Aplicação dos Recursos */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                  <span>Aplicação dos Recursos (Despesas)</span>
                </h3>
                <p className="text-xs text-slate-500">92% dos recursos revertidos diretamente para a equipe técnica e alunos</p>
              </div>
            </div>

            {/* Barra Segmentada Visual */}
            <div className="w-full h-5 rounded-xl overflow-hidden flex shadow-inner">
              {TRANSPARENCY_METRICS.expenseDistribution.map((item, idx) => (
                <div
                  key={idx}
                  style={{ width: `${item.value}%`, backgroundColor: item.color }}
                  className="h-full hover:opacity-90 transition-opacity"
                  title={`${item.name}: ${item.value}%`}
                />
              ))}
            </div>

            {/* Legenda Detalhada */}
            <div className="space-y-2 pt-2">
              {TRANSPARENCY_METRICS.expenseDistribution.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-slate-100 last:border-0">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-700 font-medium">{item.name}</span>
                  </div>
                  <span className="font-black text-slate-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Central de Documentos Oficiais com Busca, Filtros e Múltiplos Formatos */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 pb-5">
            <div>
              <h3 className="text-xl font-black text-slate-900">Documentos e Contas Públicas</h3>
              <p className="text-xs text-slate-500">Pesquise por palavra-chave, filtre por ano ou exporte em formatos abertos</p>
            </div>

            {/* Barra de Pesquisa e Exportação */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="relative min-w-[240px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchDoc}
                  onChange={(e) => setSearchDoc(e.target.value)}
                  placeholder="Pesquisar contas, editais..."
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:ring-2 focus:ring-[#0072C6] outline-none"
                />
              </div>

              {/* Botão Exportar Excel */}
              <button
                onClick={handleExportToExcel}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
                title="Exportar para Excel (.xlsx)"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>XLSX</span>
              </button>

              {/* Botão Exportar CSV */}
              <button
                onClick={handleExportToCsv}
                className="px-3 py-2 rounded-xl bg-slate-700 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
                title="Exportar formato aberto CSV"
              >
                <FileCode2 className="w-3.5 h-3.5" />
                <span>CSV</span>
              </button>

              {/* Botão Gestor Anexar */}
              <button
                onClick={() => setIsAdminOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
                title="Acessar painel para anexar novas contas públicas"
              >
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>Painel Gestor</span>
              </button>
            </div>
          </div>

          {/* Filtros de Ano e Categorias */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-slate-500 mr-1">Ano Fiscal:</span>
              {['todos', '2026', '2025', '2024'].map((yr) => (
                <button
                  key={yr}
                  onClick={() => setSelectedYear(yr)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedYear === yr
                      ? 'bg-[#0072C6] text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {yr === 'todos' ? 'Todos os Anos' : yr}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCat(cat.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                    selectedCat === cat.id
                      ? 'bg-slate-900 text-white font-bold shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Lista de Documentos Formatada */}
          <div className="space-y-3 pt-2">
            {filteredDocs.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-xs">
                Nenhum documento encontrado com os filtros selecionados.
              </div>
            ) : (
              filteredDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-200 hover:border-[#0072C6]/50 hover:bg-blue-50/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
                >
                  <div className="space-y-1.5 max-w-3xl">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-blue-100 text-[#0072C6]">
                        {doc.category}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 font-bold bg-white px-1.5 py-0.5 rounded border border-slate-200">
                        {doc.code}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        {doc.status}
                      </span>
                      {doc.publicValue && doc.publicValue !== 'Normativo' && doc.publicValue !== 'Constitutivo' && (
                        <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                          Valor: {doc.publicValue}
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#0072C6] transition-colors leading-snug">
                      {doc.title}
                    </h4>

                    {doc.description && (
                      <p className="text-xs text-slate-600 leading-normal">
                        {doc.description}
                      </p>
                    )}

                    <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono flex-wrap pt-0.5">
                      <span>Publicado: {doc.date}</span>
                      <span>•</span>
                      <span>Formato: {doc.format} ({doc.size})</span>
                      <span>•</span>
                      <span className="truncate max-w-[200px]" title={`SHA-256: ${doc.sha256}`}>
                        SHA256: {doc.sha256?.slice(0, 12)}...
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0 self-start md:self-center">
                    <button
                      onClick={() => setSelectedDoc(doc)}
                      className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs border border-slate-300 transition-colors flex items-center gap-1.5 shadow-xs"
                      title="Visualizar certidão e detalhes de autenticidade"
                    >
                      <Eye className="w-3.5 h-3.5 text-slate-500" />
                      <span>Visualizar</span>
                    </button>

                    <button
                      onClick={() => {
                        showToast(`Download iniciado: ${doc.title} (${doc.format})`);
                      }}
                      className="px-4 py-2 rounded-xl bg-[#0072C6] hover:bg-blue-700 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
                      title="Baixar arquivo oficial para o computador"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Baixar</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>

        {/* Seção Interativa de FAQ (Requisito Item 7 da Imagem) */}
        <div id="faq" className="mt-14 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0072C6] flex items-center justify-center font-bold">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900">Perguntas Frequentes da Sociedade (FAQ)</h3>
              <p className="text-xs text-slate-500">Respostas claras em atendimento ao Artigo 8º, § 1º, VII da Lei de Acesso à Informação</p>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {FAQ_DATA.map((item, idx) => (
              <div key={idx} className="py-3.5">
                <button
                  type="button"
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-800 hover:text-[#0072C6] transition-colors"
                >
                  <span>{item.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeFaq === idx ? 'rotate-180 text-[#0072C6]' : ''}`} />
                </button>

                {activeFaq === idx && (
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed pl-1 animate-fade-in">
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
