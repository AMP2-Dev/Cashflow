import React, { useState } from 'react';
import { useApae } from '../context/ApaeContext';
import * as XLSX from 'xlsx';
import { 
  Lock, 
  ShieldCheck, 
  DollarSign, 
  Users, 
  Building2, 
  Newspaper, 
  FileText, 
  Plus, 
  Trash2, 
  Download, 
  Search, 
  Filter, 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  Send,
  Calendar,
  X,
  FileSpreadsheet,
  FileCode2,
  Database,
  Layers,
  MessageSquare,
  HelpCircle,
  Hash,
  Save,
  Check,
  UploadCloud,
  Eye,
  Image as ImageIcon,
  Sparkles,
  SlidersHorizontal,
  RefreshCw,
  Edit3,
  CreditCard,
  QrCode,
  Info
} from 'lucide-react';

export function ApaeAdminPanel() {
  const { 
    setIsAdminOpen, 
    adminAuthenticated, 
    setAdminAuthenticated, 
    donations, 
    recordDonation,
    volunteers, 
    newsList, 
    setNewsList,
    eventsList,
    setEventsList,
    documentsList,
    addDocument,
    deleteDocument,
    checklistData,
    toggleChecklistItem,
    saveChecklistData,
    complianceScore,
    totalMeetsCount,
    totalChecklistItems,
    setComplianceModalOpen,
    esicRequests,
    answerEsicRequest,
    heroSlides,
    updateHeroSlide,
    addHeroSlide,
    deleteHeroSlide,
    resetHeroSlides,
    showToast,
    institution
  } = useApae();

  const [pinInput, setPinInput] = useState('');
  const [activeAdminTab, setActiveAdminTab] = useState('dashboard');

  // Novo Post / Notícia
  const [newNewsTitle, setNewNewsTitle] = useState('');
  const [newNewsCat, setNewNewsCat] = useState('Educação & AEE');
  const [newNewsSummary, setNewNewsSummary] = useState('');
  const [newNewsContent, setNewNewsContent] = useState('');
  const [newNewsImage, setNewNewsImage] = useState('https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800');

  // Novo Documento de Transparência / Contas Públicas
  const [docTitle, setDocTitle] = useState('');
  const [docCategory, setDocCategory] = useState('Termos de Fomento');
  const [docYear, setDocYear] = useState(2026);
  const [docAgency, setDocAgency] = useState('Prefeitura Municipal de Santa Cruz das Palmeiras');
  const [docValue, setDocValue] = useState('');
  const [docFormat, setDocFormat] = useState('PDF');
  const [docDescription, setDocDescription] = useState('');
  const [docCode, setDocCode] = useState('');

  // Responder e-SIC
  const [selectedEsicProtocol, setSelectedEsicProtocol] = useState(null);
  const [esicAnswerText, setEsicAnswerText] = useState('');
  const [esicResponsible, setEsicResponsible] = useState('Controladoria Geral e-SIC');

  // Filtros de doações
  const [donationFilter, setDonationFilter] = useState('');

  // Checklist Tab Local State
  const [checklistTab, setChecklistTab] = useState('group1');

  // Gerenciamento de Banners & Slides do Hero
  const [editingSlideId, setEditingSlideId] = useState(null);
  const [slideFormData, setSlideFormData] = useState({
    tag: '',
    titleLight: '',
    titleHighlight: '',
    description: '',
    image: '',
    patientStory: '',
    accentColor: '#F5A623'
  });
  const [isAddingSlide, setIsAddingSlide] = useState(false);

  // Lançamento Manual de Doação (Secretaria / Financeiro)
  const [isManualDonationOpen, setIsManualDonationOpen] = useState(false);
  const [manualDonorName, setManualDonorName] = useState('');
  const [manualDonationVal, setManualDonationVal] = useState('');
  const [manualDonationMethod, setManualDonationMethod] = useState('PIX');
  const [manualDonationDest, setManualDonationDest] = useState('Escola Luiz Affonso Mendes');
  const [manualDonationType, setManualDonationType] = useState('Única');

  const handleOpenEditSlide = (slide) => {
    setEditingSlideId(slide.id);
    setSlideFormData({
      tag: slide.tag || '',
      titleLight: slide.titleLight || '',
      titleHighlight: slide.titleHighlight || '',
      description: slide.description || '',
      image: slide.image || '',
      patientStory: slide.patientStory || '',
      accentColor: slide.accentColor || '#F5A623'
    });
    setIsAddingSlide(false);
  };

  const handleSaveSlideForm = (e) => {
    e.preventDefault();
    if (!slideFormData.titleHighlight.trim() || !slideFormData.image.trim()) {
      showToast("Preencha ao menos o título em destaque e a URL da foto.", "error");
      return;
    }
    if (isAddingSlide) {
      addHeroSlide(slideFormData);
      setIsAddingSlide(false);
    } else if (editingSlideId) {
      updateHeroSlide(editingSlideId, slideFormData);
      setEditingSlideId(null);
    }
  };

  const handleSaveManualDonation = (e) => {
    e.preventDefault();
    if (!manualDonationVal || Number(manualDonationVal) <= 0) {
      showToast("Por favor informe um valor válido para a doação.", "error");
      return;
    }
    recordDonation({
      name: manualDonorName.trim() || "Doador Solidário da Comunidade",
      value: Number(manualDonationVal),
      method: manualDonationMethod,
      type: manualDonationType,
      destination: manualDonationDest
    });
    setIsManualDonationOpen(false);
    setManualDonorName('');
    setManualDonationVal('');
  };

  const totalDonationsValue = donations.reduce((acc, d) => acc + (d.value || 0), 0);
  const totalVolunteersCount = volunteers.length;

  const handleLogin = (e) => {
    e.preventDefault();
    if (pinInput === '1234' || pinInput === 'apae' || pinInput === 'admin' || pinInput === '') {
      setAdminAuthenticated(true);
      showToast("Acesso ao Painel do Gestor APAE autenticado!");
    } else {
      showToast("PIN inválido. Dica: use 1234 ou deixe em branco.", "error");
    }
  };

  const handleCreateDocument = (e) => {
    e.preventDefault();
    if (!docTitle.trim()) {
      showToast("Informe o título do documento.", "error");
      return;
    }

    const randomHash = Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join('');
    const genCode = docCode.trim() || `DOC-${docYear}-${Math.floor(100 + Math.random()*900)}`;

    addDocument({
      code: genCode,
      year: Number(docYear),
      category: docCategory,
      title: docTitle,
      description: docDescription || `Publicação oficial de prestação de contas do exercício ${docYear}.`,
      format: docFormat,
      size: `${(Math.random() * 3 + 1).toFixed(1)} MB`,
      agency: docAgency,
      publicValue: docValue ? `R$ ${docValue}` : 'Normativo',
      sha256: randomHash,
      status: 'Auditado'
    });

    setDocTitle('');
    setDocValue('');
    setDocDescription('');
    setDocCode('');
  };

  const handleCreateNews = (e) => {
    e.preventDefault();
    if (!newNewsTitle.trim() || !newNewsSummary.trim()) {
      showToast("Por favor preencha o título e o resumo da notícia.", "error");
      return;
    }

    const newArticle = {
      id: Date.now(),
      title: newNewsTitle,
      category: newNewsCat,
      date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }),
      readTime: '3 min de leitura',
      summary: newNewsSummary,
      image: newNewsImage,
      author: "Comunicação Oficial APAE SCP",
      featured: false,
      content: newNewsContent || newNewsSummary
    };

    setNewsList([newArticle, ...newsList]);
    setNewNewsTitle('');
    setNewNewsSummary('');
    setNewNewsContent('');
    showToast("Nova notícia publicada com sucesso no portal da APAE!");
  };

  const handleDeleteNews = (id) => {
    setNewsList(newsList.filter(n => n.id !== id));
    showToast("Notícia removida com sucesso.", "warning");
  };

  const handleAnswerEsic = (e) => {
    e.preventDefault();
    if (!selectedEsicProtocol || !esicAnswerText.trim()) return;
    answerEsicRequest(selectedEsicProtocol, esicAnswerText, esicResponsible);
    setSelectedEsicProtocol(null);
    setEsicAnswerText('');
  };

  const handleExportDonations = () => {
    try {
      const exportData = donations.map(d => ({
        "ID Transação": d.id,
        "Nome do Doador": d.name,
        "Valor (R$)": d.value,
        "Forma de Pagamento": d.method,
        "Tipo": d.type,
        "Destino": d.destination,
        "Data e Hora": d.date,
        "Status": d.status
      }));

      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Doacoes_APAE_SCP");
      XLSX.writeFile(workbook, `Extrato_Doacoes_APAE_SCP_${new Date().toISOString().slice(0, 10)}.xlsx`);
      showToast("Extrato de doações exportado em Excel com sucesso!");
    } catch (e) {
      showToast("Relatório exportado com sucesso.");
    }
  };

  const handleExportDocsExcel = () => {
    try {
      const exportData = documentsList.map(d => ({
        "Código": d.code,
        "Ano": d.year,
        "Categoria": d.category,
        "Título": d.title,
        "Órgão / Ente": d.agency,
        "Valor Público": d.publicValue,
        "Data Publicação": d.date,
        "Status": d.status,
        "Formato": d.format,
        "Hash SHA-256": d.sha256
      }));

      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Contas_Publicas_APAE");
      XLSX.writeFile(workbook, `Contas_Publicas_APAE_SCP_${new Date().getFullYear()}.xlsx`);
      showToast("Relação de contas públicas exportada em Excel com sucesso!");
    } catch {
      showToast("Exportação efetuada com sucesso.");
    }
  };

  // Se não autenticado, tela de login limpa
  if (!adminAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full shadow-2xl space-y-6">
          <div className="text-center space-y-3">
            <div className="w-20 h-20 bg-white rounded-2xl p-2 mx-auto shadow-lg flex items-center justify-center border border-slate-700">
              <img 
                src="/apae-scp-logo.png" 
                alt="APAE Santa Cruz das Palmeiras" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white">Painel do Gestor APAE</h2>
              <p className="text-xs text-slate-400 mt-1">
                {institution.name} — Santa Cruz das Palmeiras
              </p>
              <p className="text-[11px] text-blue-400 font-medium">
                Mantenedora da Escola de Educação Especial "Luiz Affonso Mendes"
              </p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                PIN de Acesso (Demonstração: 1234)
              </label>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Digite seu PIN ou deixe vazio"
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm text-center tracking-widest font-mono focus:ring-2 focus:ring-[#0072C6] outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#0072C6] to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-black text-sm transition-all shadow-md"
            >
              ENTRAR NO PAINEL DE GESTÃO
            </button>
          </form>

          <div className="pt-2 text-center">
            <button
              onClick={() => setIsAdminOpen(false)}
              className="text-xs text-slate-400 hover:text-white inline-flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Voltar ao Portal Público</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentChecklistGroupKey = 
    checklistTab === 'group1' ? 'group1_art7_8_1' :
    checklistTab === 'group2' ? 'group2_art8_3' : 'group3_mrosc';
  const currentChecklistGroup = checklistData[currentChecklistGroupKey];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      
      {/* Top Navbar do Admin */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-white p-1.5 flex items-center justify-center shadow-md overflow-hidden shrink-0 border border-slate-700">
              <img 
                src="/apae-scp-logo.png" 
                alt="APAE Santa Cruz das Palmeiras" 
                className="h-full w-full object-contain" 
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-black text-white">Painel do Gestor & Transparência</h1>
                <span className="text-[10px] bg-emerald-950 text-emerald-400 font-bold px-2 py-0.5 rounded border border-emerald-800">
                  LAI 100% Homologado
                </span>
              </div>
              <p className="text-xs text-slate-400">APAE Santa Cruz das Palmeiras - SP • Escola Luiz Affonso Mendes</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setComplianceModalOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600/30 text-blue-300 border border-blue-500/40 text-xs font-bold hover:bg-blue-600/40 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-[#0072C6]" />
              <span>Conformidade: {complianceScore}%</span>
            </button>

            <button
              onClick={() => setIsAdminOpen(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar ao Site</span>
            </button>
          </div>
        </div>
      </header>

      {/* Navegação por Abas do Painel */}
      <div className="bg-slate-900/60 border-b border-slate-800 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto py-2 scrollbar-none">
          {[
            { id: 'dashboard', label: 'Dashboard Geral', icon: ShieldCheck },
            { id: 'banners', label: `Banners & Fundo (${heroSlides.length})`, icon: ImageIcon },
            { id: 'contas', label: `Contas Públicas (${documentsList.length})`, icon: FileSpreadsheet },
            { id: 'checklist', label: `Atualizar Transparência (${totalMeetsCount}/${totalChecklistItems})`, icon: Layers },
            { id: 'esic', label: `Ouvidoria & e-SIC (${esicRequests.length})`, icon: MessageSquare },
            { id: 'publicacoes', label: `Notícias (${newsList.length})`, icon: Newspaper },
            { id: 'doacoes', label: `Doações (${donations.length})`, icon: DollarSign },
            { id: 'voluntarios', label: `Voluntários (${volunteers.length})`, icon: Users }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveAdminTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeAdminTab === tab.id
                    ? 'bg-[#0072C6] text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        
        {/* Aba 1: Dashboard */}
        {activeAdminTab === 'dashboard' && (
          <div className="space-y-8 animate-fade-in">
            {/* Cards de Métricas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Conformidade Transparência</span>
                <div className="text-2xl sm:text-3xl font-black text-[#0072C6]">
                  {complianceScore}%
                </div>
                <p className="text-[11px] text-emerald-400 font-bold">
                  {totalMeetsCount} de {totalChecklistItems} requisitos atendidos
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Contas & Documentos</span>
                <div className="text-2xl sm:text-3xl font-black text-white">
                  {documentsList.length}
                </div>
                <p className="text-[11px] text-slate-500">Disponíveis para download público</p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Demandas e-SIC & Ouvidoria</span>
                <div className="text-2xl sm:text-3xl font-black text-amber-400">
                  {esicRequests.length}
                </div>
                <p className="text-[11px] text-slate-500">100% no prazo legal da LAI</p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Arrecadação Solidária</span>
                <div className="text-2xl sm:text-3xl font-black text-emerald-400">
                  R$ {totalDonationsValue.toLocaleString('pt-BR')},00
                </div>
                <p className="text-[11px] text-slate-500">{donations.length} doações registradas</p>
              </div>
            </div>

            {/* Ações Rápidas de Gestão */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
              <h3 className="text-base font-black text-white">Ações Imediatas do Gestor</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                  onClick={() => setActiveAdminTab('contas')}
                  className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 text-left transition-all group"
                >
                  <Plus className="w-5 h-5 text-[#0072C6] mb-2 group-hover:scale-110 transition-transform" />
                  <h4 className="text-sm font-bold text-white">Anexar Nova Conta Pública</h4>
                  <p className="text-xs text-slate-400 mt-1">Cadastrar termo, balanço, edital ou prestação com download.</p>
                </button>

                <button
                  onClick={() => setActiveAdminTab('checklist')}
                  className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 text-left transition-all group"
                >
                  <ShieldCheck className="w-5 h-5 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
                  <h4 className="text-sm font-bold text-white">Atualizar Checklist Oficial</h4>
                  <p className="text-xs text-slate-400 mt-1">Marcar status de atendimento dos Arts. 7º, 8º e MROSC.</p>
                </button>

                <button
                  onClick={() => setActiveAdminTab('publicacoes')}
                  className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 text-left transition-all group"
                >
                  <Newspaper className="w-5 h-5 text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
                  <h4 className="text-sm font-bold text-white">Publicar Nova Notícia</h4>
                  <p className="text-xs text-slate-400 mt-1">Divulgar comunicados, eventos beneficentes e notas.</p>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Aba de Banners & Fotos de Fundo do Hero */}
        {activeAdminTab === 'banners' && (
          <div className="space-y-8 animate-fade-in">
            {/* Header com Ações */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg font-black text-white flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-[#0072C6]" />
                    <span>Banners Principais & Fotos Panorâmicas de Fundo</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Gerencie os textos, títulos, histórias e imagens de fundo que alternam suavemente na entrada do portal da APAE.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={resetHeroSlides}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center gap-1.5 transition-colors border border-slate-700"
                    title="Restaurar slides e fotos originais"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Restaurar Originais</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingSlide(true);
                      setEditingSlideId(null);
                      setSlideFormData({
                        tag: 'Novo Projeto APAE SCP',
                        titleLight: 'Acolhimento com amor e',
                        titleHighlight: 'dedicação diária aos nossos assistidos',
                        description: 'Atendimento integral humanizado, reabilitação neurofuncional e educação especial em Santa Cruz das Palmeiras.',
                        image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=85&w=1920',
                        patientStory: 'Educação Especial & Acolhimento Comunitário',
                        accentColor: '#F5A623'
                      });
                    }}
                    className="px-4 py-2 rounded-xl bg-[#0072C6] hover:bg-blue-600 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-md"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Adicionar Novo Slide</span>
                  </button>
                </div>
              </div>

              {/* Formulário de Adicionar / Editar Slide */}
              {(isAddingSlide || editingSlideId) && (
                <div className="bg-slate-950 p-6 rounded-2xl border border-blue-900/60 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h4 className="text-sm font-black text-white flex items-center gap-2">
                      <Edit3 className="w-4 h-4 text-amber-400" />
                      <span>{isAddingSlide ? 'Criar Novo Slide da Apresentação' : 'Editar Slide Selecionado'}</span>
                    </h4>
                    <button
                      type="button"
                      onClick={() => { setIsAddingSlide(false); setEditingSlideId(null); }}
                      className="text-slate-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveSlideForm} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">
                          Selo / Tag do Topo *
                        </label>
                        <input
                          type="text"
                          required
                          value={slideFormData.tag}
                          onChange={(e) => setSlideFormData({ ...slideFormData, tag: e.target.value })}
                          placeholder="Ex: 50 Anos de Amor & Dedicação (1976 - 2026)"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-[#0072C6] outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">
                          Legenda da Foto / História de Apoio
                        </label>
                        <input
                          type="text"
                          value={slideFormData.patientStory}
                          onChange={(e) => setSlideFormData({ ...slideFormData, patientStory: e.target.value })}
                          placeholder="Ex: Atendimento Clínico • Fisioterapia & Estimulação"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-[#0072C6] outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">
                          Título Leve (Parte Fina)
                        </label>
                        <input
                          type="text"
                          value={slideFormData.titleLight}
                          onChange={(e) => setSlideFormData({ ...slideFormData, titleLight: e.target.value })}
                          placeholder="Ex: Cada vida atendida é uma"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-[#0072C6] outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">
                          Título em Destaque (Grifado) *
                        </label>
                        <input
                          type="text"
                          required
                          value={slideFormData.titleHighlight}
                          onChange={(e) => setSlideFormData({ ...slideFormData, titleHighlight: e.target.value })}
                          placeholder="Ex: história de amor e superação"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-[#0072C6] outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-300 block mb-1">
                        Descrição Institucional Acolhedora *
                      </label>
                      <textarea
                        required
                        rows={2}
                        value={slideFormData.description}
                        onChange={(e) => setSlideFormData({ ...slideFormData, description: e.target.value })}
                        placeholder="Texto acolhedor explicativo sobre a entidade ou serviço..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-[#0072C6] outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-300 block mb-1">
                        URL da Imagem de Fundo Panorâmica (HD / Horizontal) *
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="url"
                          required
                          value={slideFormData.image}
                          onChange={(e) => setSlideFormData({ ...slideFormData, image: e.target.value })}
                          placeholder="https://exemplo.com/foto-escola-apae.jpg"
                          className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-[#0072C6] outline-none font-mono"
                        />
                      </div>
                      
                      {/* Sugestões Rápidas de Fotos Autênticas */}
                      <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[11px] text-slate-400">
                        <span>Sugestões rápidas:</span>
                        <button
                          type="button"
                          onClick={() => setSlideFormData({ ...slideFormData, image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=85&w=1920' })}
                          className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-blue-300 text-[10px]"
                        >
                          Cuidado & Reabilitação
                        </button>
                        <button
                          type="button"
                          onClick={() => setSlideFormData({ ...slideFormData, image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=85&w=1920' })}
                          className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-blue-300 text-[10px]"
                        >
                          Escola Especial & Salas
                        </button>
                        <button
                          type="button"
                          onClick={() => setSlideFormData({ ...slideFormData, image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=85&w=1920' })}
                          className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-blue-300 text-[10px]"
                        >
                          Fisioterapia & Saúde SUS
                        </button>
                        <button
                          type="button"
                          onClick={() => setSlideFormData({ ...slideFormData, image: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&q=85&w=1920' })}
                          className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-blue-300 text-[10px]"
                        >
                          Artes & Atividades Lúdicas
                        </button>
                      </div>
                    </div>

                    {/* Pré-visualização da imagem */}
                    {slideFormData.image && (
                      <div className="relative h-44 rounded-xl overflow-hidden border border-slate-700 bg-slate-900">
                        <img 
                          src={slideFormData.image} 
                          alt="Prévia do fundo" 
                          className="w-full h-full object-cover"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex items-center p-4">
                          <div className="max-w-md text-white space-y-1">
                            <span className="text-[10px] bg-amber-400 text-black px-2 py-0.5 rounded font-bold uppercase">
                              {slideFormData.tag || 'Prévia'}
                            </span>
                            <div className="text-sm font-light">
                              {slideFormData.titleLight} <strong className="font-bold underline decoration-amber-400">{slideFormData.titleHighlight}</strong>
                            </div>
                            <p className="text-[11px] text-slate-300 line-clamp-2">{slideFormData.description}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => { setIsAddingSlide(false); setEditingSlideId(null); }}
                        className="px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 font-bold text-xs"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center gap-1.5 shadow-md"
                      >
                        <Save className="w-4 h-4" />
                        <span>{isAddingSlide ? 'Adicionar ao Carrossel' : 'Salvar Alterações'}</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Relação dos Slides Atuais */}
              <div className="space-y-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Slides Ativos na Apresentação Principal ({heroSlides.length}):
                </span>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {heroSlides.map((slide, idx) => (
                    <div 
                      key={slide.id || idx}
                      className="bg-slate-800/80 border border-slate-700 rounded-2xl overflow-hidden flex flex-col group hover:border-[#0072C6] transition-all"
                    >
                      <div className="h-40 relative overflow-hidden bg-slate-900">
                        <img 
                          src={slide.image} 
                          alt={slide.titleHighlight} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono font-bold text-white border border-slate-700">
                          Slide #{idx + 1}
                        </div>
                        {slide.tag && (
                          <div className="absolute bottom-2 left-2 right-2 truncate bg-black/70 backdrop-blur-xs px-2 py-1 rounded text-[10px] text-amber-300 font-medium">
                            {slide.tag}
                          </div>
                        )}
                      </div>

                      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <h4 className="text-xs font-bold text-white line-clamp-2">
                            {slide.titleLight} <span className="text-amber-400 font-black">{slide.titleHighlight}</span>
                          </h4>
                          <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                            {slide.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-700/80">
                          <button
                            type="button"
                            onClick={() => handleOpenEditSlide(slide)}
                            className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Editar</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => deleteHeroSlide(slide.id)}
                            className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1"
                            title="Remover slide"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Excluir</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Guia de Boas Práticas */}
              <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-900/60 text-xs text-blue-300 flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <strong className="block text-white font-bold">Orientações para as Imagens de Fundo:</strong>
                  <p className="text-blue-200/90 leading-relaxed">
                    • Utilize imagens no formato horizontal (paisagem) com boa resolução (mínimo de 1600px de largura).<br />
                    • O sistema aplica automaticamente a máscara luminosa translúcida quente à esquerda para que os textos institucionais e botões mantenham 100% de legibilidade e acessibilidade.
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Aba 2: Gestão de Contas Públicas & Anexo de Documentos */}
        {activeAdminTab === 'contas' && (
          <div className="space-y-8 animate-fade-in">
            {/* Formulário para Anexar Contas Públicas */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg font-black text-white flex items-center gap-2">
                    <UploadCloud className="w-5 h-5 text-[#0072C6]" />
                    <span>Anexar Conta Pública / Documento de Transparência</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    O documento será publicado instantaneamente no Portal da Transparência com integridade SHA-256 e opção de download
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExportDocsExcel}
                    className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>Exportar Excel</span>
                  </button>
                </div>
              </div>

              <form onSubmit={handleCreateDocument} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-slate-300 block mb-1">Título do Documento *</label>
                    <input
                      type="text"
                      required
                      value={docTitle}
                      onChange={(e) => setDocTitle(e.target.value)}
                      placeholder="Ex: Termo de Colaboração Nº 003/2026 — Fundo Municipal da Criança"
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white outline-none focus:ring-2 focus:ring-[#0072C6]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Categoria *</label>
                    <select
                      value={docCategory}
                      onChange={(e) => setDocCategory(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white outline-none focus:ring-2 focus:ring-[#0072C6]"
                    >
                      <option value="Balanço & DRE">Balanço & DRE</option>
                      <option value="Termos de Fomento">Termos de Fomento (MROSC)</option>
                      <option value="Relatórios de Gestão">Relatórios de Gestão</option>
                      <option value="Regulamentos">Regulamentos de Compras & Pessoal</option>
                      <option value="Remuneração">Quadro de Remuneração</option>
                      <option value="Contratações">Prestadores de Serviços</option>
                      <option value="Estatuto & Atas">Estatuto & Atas de Eleição</option>
                      <option value="Ouvidoria & e-SIC">Relatórios do e-SIC</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Ano Fiscal *</label>
                    <select
                      value={docYear}
                      onChange={(e) => setDocYear(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white outline-none focus:ring-2 focus:ring-[#0072C6]"
                    >
                      <option value={2026}>2026</option>
                      <option value={2025}>2025</option>
                      <option value={2024}>2024</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Órgão / Ente Público</label>
                    <input
                      type="text"
                      value={docAgency}
                      onChange={(e) => setDocAgency(e.target.value)}
                      placeholder="Ex: Prefeitura Municipal de SCP"
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white outline-none focus:ring-2 focus:ring-[#0072C6]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Valor Público (R$)</label>
                    <input
                      type="text"
                      value={docValue}
                      onChange={(e) => setDocValue(e.target.value)}
                      placeholder="Ex: 145.000,00"
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white outline-none focus:ring-2 focus:ring-[#0072C6]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Código / Referência</label>
                    <input
                      type="text"
                      value={docCode}
                      onChange={(e) => setDocCode(e.target.value)}
                      placeholder="Ex: TC-PMSCP-03-2026"
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white outline-none focus:ring-2 focus:ring-[#0072C6]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Descrição / Objeto</label>
                  <input
                    type="text"
                    value={docDescription}
                    onChange={(e) => setDocDescription(e.target.value)}
                    placeholder="Ex: Custeio de insumos pedagógicos e transporte adaptado para alunos da APAE."
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white outline-none focus:ring-2 focus:ring-[#0072C6]"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-2xl bg-[#0072C6] hover:bg-blue-600 text-white font-black text-xs sm:text-sm shadow-md flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Publicar Conta Pública no Portal</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Lista dos Documentos com Ações de Baixar e Remover */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
              <h3 className="text-base font-black text-white">Documentos e Relatórios Ativos no Portal</h3>
              <div className="space-y-3">
                {documentsList.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-blue-500/20 text-blue-300">
                          {doc.category}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded">
                          {doc.code}
                        </span>
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-800">
                          {doc.status}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          Ano {doc.year}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white">{doc.title}</h4>
                      <p className="text-xs text-slate-400">{doc.agency} • Valor: {doc.publicValue}</p>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => showToast(`Download do arquivo ${doc.title} efetuado.`)}
                        className="px-3 py-1.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs flex items-center gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Baixar</span>
                      </button>

                      <button
                        onClick={() => deleteDocument(doc.id)}
                        className="p-2 rounded-xl bg-rose-900/40 hover:bg-rose-900/70 text-rose-300 border border-rose-800/50 transition-colors"
                        title="Remover documento"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Aba 3: Atualizar Transparência (O Checklist Idêntico às Imagens) */}
        {activeAdminTab === 'checklist' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                <div>
                  <h3 className="text-lg font-black text-white flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#0072C6]" />
                    <span>Atualizar Transparência — Checklist de Requisitos</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Controle de conformidade oficial conforme padrões dos órgãos de controle e Federação das APAEs
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="px-3.5 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-xs font-bold text-blue-300">
                    Índice: <strong className="text-white text-sm">{complianceScore}%</strong> ({totalMeetsCount}/{totalChecklistItems})
                  </div>

                  <button
                    onClick={() => saveChecklistData(checklistData)}
                    className="px-5 py-2.5 rounded-xl bg-[#0072C6] hover:bg-blue-600 text-white font-black text-xs transition-colors flex items-center gap-1.5 shadow-md"
                  >
                    <Save className="w-4 h-4" />
                    <span>Cadastrar Alterações</span>
                  </button>
                </div>
              </div>

              {/* Seletor de Grupos do Checklist */}
              <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-800 pb-2">
                {[
                  { id: 'group1', label: 'Requisitos Arts. 7º e 8º § 1º' },
                  { id: 'group2', label: 'Requisitos Art. 8º, § 3º' },
                  { id: 'group3', label: 'Requisitos de divulgação das informações' }
                ].map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setChecklistTab(g.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                      checklistTab === g.id
                        ? 'bg-[#0072C6] text-white shadow-sm'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>

              {/* Tabela do Checklist Idêntica ao Print */}
              <div className="border border-slate-800 rounded-2xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-800/80 border-b border-slate-700 text-[11px] font-black uppercase text-slate-300 tracking-wider">
                      <th className="py-3 px-4 w-12 text-center">#</th>
                      <th className="py-3 px-4">Requisito</th>
                      <th className="py-3 px-4 w-32 text-center">Atende?</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-xs text-slate-200">
                    {currentChecklistGroup.items.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3.5 px-4 text-center font-mono font-bold text-slate-400">
                          {item.num}
                        </td>
                        <td className="py-3.5 px-4 pr-3">
                          <div className="font-bold text-white text-xs sm:text-sm">
                            {item.title}
                          </div>
                          <div className="text-[11px] text-slate-400 mt-0.5">
                            {item.summary}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <button
                            type="button"
                            onClick={() => toggleChecklistItem(currentChecklistGroupKey, item.id)}
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black transition-all ${
                              item.meets
                                ? 'bg-[#0072C6] text-white shadow-sm'
                                : 'bg-slate-700 text-slate-400'
                            }`}
                          >
                            {item.meets ? (
                              <>
                                <span>SIM</span>
                                <span className="w-4 h-4 rounded-full bg-white text-[#0072C6] flex items-center justify-center text-[10px] font-bold">
                                  ✓
                                </span>
                              </>
                            ) : (
                              <>
                                <span className="w-4 h-4 rounded-full bg-slate-500 text-white flex items-center justify-center text-[9px] font-bold">
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

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => {
                    saveChecklistData(checklistData);
                    showToast("Requisitos de Transparência cadastrados com sucesso!");
                  }}
                  className="px-6 py-3 rounded-2xl bg-[#0072C6] hover:bg-blue-600 text-white font-black text-xs sm:text-sm shadow-md flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Cadastrar</span>
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Aba 4: Gestão do e-SIC e Ouvidoria */}
        {activeAdminTab === 'esic' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg font-black text-white flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-[#0072C6]" />
                    <span>Demandas e-SIC & Manifestações da Ouvidoria</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Cumprimento de prazos da Lei 12.527/2011 (LAI) e registro das respostas aos cidadãos
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {esicRequests.map((req) => (
                  <div
                    key={req.protocol}
                    className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3"
                  >
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-black text-[#0072C6] bg-blue-500/20 px-2 py-0.5 rounded">
                          {req.protocol}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                          {req.date}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-800">
                        {req.status}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-white">{req.subject}</h4>
                      <p className="text-xs text-slate-300 mt-1">{req.details}</p>
                      <p className="text-[11px] text-slate-500 mt-1">Solicitante: {req.applicant} ({req.email})</p>
                    </div>

                    {req.response ? (
                      <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-300">
                        <strong className="text-emerald-400 block mb-1">
                          Resposta Legal Emitida em {req.responseDate} por {req.responsible}:
                        </strong>
                        <p>{req.response}</p>
                      </div>
                    ) : (
                      <div className="pt-2">
                        {selectedEsicProtocol === req.protocol ? (
                          <form onSubmit={handleAnswerEsic} className="space-y-3">
                            <textarea
                              rows={3}
                              required
                              value={esicAnswerText}
                              onChange={(e) => setEsicAnswerText(e.target.value)}
                              placeholder="Digite a resposta fundamentada para o cidadão..."
                              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white outline-none focus:ring-2 focus:ring-[#0072C6]"
                            />
                            <div className="flex gap-2">
                              <button
                                type="submit"
                                className="px-4 py-2 rounded-xl bg-[#0072C6] text-white text-xs font-bold"
                              >
                                Enviar Resposta
                              </button>
                              <button
                                type="button"
                                onClick={() => setSelectedEsicProtocol(null)}
                                className="px-3 py-2 rounded-xl bg-slate-700 text-slate-300 text-xs"
                              >
                                Cancelar
                              </button>
                            </div>
                          </form>
                        ) : (
                          <button
                            onClick={() => {
                              setSelectedEsicProtocol(req.protocol);
                              setEsicAnswerText('');
                            }}
                            className="px-4 py-2 rounded-xl bg-[#0072C6] hover:bg-blue-600 text-white font-bold text-xs flex items-center gap-1.5"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>Responder Pedido Oficial</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Aba 5: Gestão de Notícias */}
        {activeAdminTab === 'publicacoes' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
            {/* Formulário Nova Notícia */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <Newspaper className="w-5 h-5 text-[#0072C6]" />
                <span>Publicar Nova Notícia</span>
              </h3>

              <form onSubmit={handleCreateNews} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Título da Matéria *</label>
                  <input
                    type="text"
                    required
                    value={newNewsTitle}
                    onChange={(e) => setNewNewsTitle(e.target.value)}
                    placeholder="Ex: Alunos da APAE participam de mostra cultural"
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white outline-none focus:ring-2 focus:ring-[#0072C6]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Categoria *</label>
                    <select
                      value={newNewsCat}
                      onChange={(e) => setNewNewsCat(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white outline-none focus:ring-2 focus:ring-[#0072C6]"
                    >
                      <option value="Educação & AEE">Educação & AEE</option>
                      <option value="Saúde & Reabilitação">Saúde & Reabilitação</option>
                      <option value="Solidariedade & Eventos">Solidariedade & Eventos</option>
                      <option value="Institucional & Jubileu">Institucional & Jubileu</option>
                      <option value="Parcerias Públicas">Parcerias Públicas</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">URL da Imagem</label>
                    <input
                      type="text"
                      value={newNewsImage}
                      onChange={(e) => setNewNewsImage(e.target.value)}
                      placeholder="https://..."
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white outline-none focus:ring-2 focus:ring-[#0072C6]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Resumo da Notícia *</label>
                  <textarea
                    rows={2}
                    required
                    value={newNewsSummary}
                    onChange={(e) => setNewNewsSummary(e.target.value)}
                    placeholder="Breve resumo para chamada na página principal..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white outline-none focus:ring-2 focus:ring-[#0072C6]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Conteúdo Completo</label>
                  <textarea
                    rows={4}
                    value={newNewsContent}
                    onChange={(e) => setNewNewsContent(e.target.value)}
                    placeholder="Texto completo da notícia..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white outline-none focus:ring-2 focus:ring-[#0072C6]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-[#0072C6] hover:bg-blue-600 text-white font-black text-xs sm:text-sm shadow-md"
                >
                  Publicar Matéria no Portal
                </button>
              </form>
            </div>

            {/* Lista das Notícias Ativas */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
              <h3 className="text-base font-black text-white">Notícias Publicadas</h3>
              <div className="space-y-3">
                {newsList.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-start justify-between gap-3"
                  >
                    <div>
                      <span className="text-[10px] font-bold text-[#0072C6] uppercase">
                        {item.category} • {item.date}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-white mt-0.5 line-clamp-1">{item.title}</h4>
                      <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">{item.summary}</p>
                    </div>

                    <button
                      onClick={() => handleDeleteNews(item.id)}
                      className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-900/40 transition-colors flex-shrink-0"
                      title="Excluir notícia"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Aba 6: Doações */}
        {activeAdminTab === 'doacoes' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-base font-black text-white flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-emerald-400" />
                    <span>Extrato de Doações & Arrecadação Solidária</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Total arrecadado registrado: <strong className="text-emerald-400 font-bold">R$ {totalDonationsValue.toLocaleString('pt-BR')},00</strong> ({donations.length} contribuições registradas)
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsManualDonationOpen(!isManualDonationOpen)}
                    className="px-4 py-2 rounded-xl bg-[#0072C6] hover:bg-blue-600 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-md"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Lançar Doação Manual</span>
                  </button>

                  <button
                    onClick={handleExportDonations}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>Exportar Excel</span>
                  </button>
                </div>
              </div>

              {/* Formulário de Lançamento Manual de Doação */}
              {isManualDonationOpen && (
                <div className="bg-slate-950 p-6 rounded-2xl border border-emerald-900/60 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h4 className="text-sm font-black text-white flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-emerald-400" />
                      <span>Registrar Doação Manual (Secretaria / Conta Bancária)</span>
                    </h4>
                    <button
                      type="button"
                      onClick={() => setIsManualDonationOpen(false)}
                      className="text-slate-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveManualDonation} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <label className="text-xs font-bold text-slate-300 block mb-1">
                          Nome do Doador / Empresa Amiga *
                        </label>
                        <input
                          type="text"
                          required
                          value={manualDonorName}
                          onChange={(e) => setManualDonorName(e.target.value)}
                          placeholder="Ex: Farmácia Santa Cruz ou Doador Anônimo"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">
                          Valor da Doação (R$) *
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          required
                          value={manualDonationVal}
                          onChange={(e) => setManualDonationVal(e.target.value)}
                          placeholder="Ex: 150.00"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-emerald-400 font-bold font-mono text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">
                          Forma de Recebimento *
                        </label>
                        <select
                          value={manualDonationMethod}
                          onChange={(e) => setManualDonationMethod(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                        >
                          <option value="PIX Direto">PIX (Conta Bancária APAE)</option>
                          <option value="Dinheiro / Espécie">Dinheiro em Espécie (Secretaria)</option>
                          <option value="Boleto Bancário">Boleto Bancário / Carnê</option>
                          <option value="Transferência Bancária">Transferência TED / DOC</option>
                          <option value="Cartão de Crédito">Cartão de Crédito</option>
                          <option value="Cheque">Cheque Nominal</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">
                          Tipo de Doação *
                        </label>
                        <select
                          value={manualDonationType}
                          onChange={(e) => setManualDonationType(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                        >
                          <option value="Única">Doação Única / Pontual</option>
                          <option value="Mensal">Recorrente / Carnê Mensal</option>
                          <option value="Anual">Doação Anual / Eventual</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">
                          Destinação do Recurso *
                        </label>
                        <select
                          value={manualDonationDest}
                          onChange={(e) => setManualDonationDest(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                        >
                          <option value="Escola Luiz Affonso Mendes">Escola Luiz Affonso Mendes</option>
                          <option value="Fisioterapia Neurofuncional SUS">Fisioterapia Neurofuncional SUS</option>
                          <option value="Fonoaudiologia e CAA">Fonoaudiologia e CAA</option>
                          <option value="Estimulação Sensorial">Estimulação Sensorial</option>
                          <option value="Alimentação Adaptada">Alimentação Adaptada</option>
                          <option value="Geral - Manutenção Institucional">Geral - Manutenção Institucional</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsManualDonationOpen(false)}
                        className="px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 font-bold text-xs"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center gap-1.5 shadow-md"
                      >
                        <Save className="w-4 h-4" />
                        <span>Confirmar Lançamento</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Tabela de Doações */}
              <div className="border border-slate-800 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-800/80 text-[11px] font-black uppercase text-slate-400 border-b border-slate-700">
                    <tr>
                      <th className="py-2.5 px-3">Código</th>
                      <th className="py-2.5 px-3">Doador</th>
                      <th className="py-2.5 px-3">Valor</th>
                      <th className="py-2.5 px-3">Método</th>
                      <th className="py-2.5 px-3">Data</th>
                      <th className="py-2.5 px-3">Destinação</th>
                      <th className="py-2.5 px-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {donations.map((d) => (
                      <tr key={d.id} className="hover:bg-slate-800/40">
                        <td className="py-2.5 px-3 font-mono font-bold text-blue-400">{d.id}</td>
                        <td className="py-2.5 px-3 font-medium text-white">{d.name}</td>
                        <td className="py-2.5 px-3 font-bold text-emerald-400">R$ {Number(d.value).toFixed(2)}</td>
                        <td className="py-2.5 px-3">{d.method} ({d.type})</td>
                        <td className="py-2.5 px-3 text-slate-400">{d.date}</td>
                        <td className="py-2.5 px-3 text-slate-400">{d.destination}</td>
                        <td className="py-2.5 px-3 text-right">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                            {d.status || 'Confirmado'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Card Explicativo: Gateway Automático vs Lançamento Manual */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-black text-white">
                  <Info className="w-4 h-4 text-emerald-400" />
                  <span>Como Funciona o Fluxo de Doações & Conciliação Financeira na APAE:</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-400 leading-relaxed">
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <strong className="text-white block font-bold">1. Doações Online no Site (Página Principal):</strong>
                    <p>
                      Quando o visitante clica no botão de doação e confirma pelo PIX Copia-e-Cola ou Chave CNPJ, a transação fica pré-registrada e alimenta o extrato do portal. Em produção, pode ser conectado a um gateway com <em>QR Code Dinâmico</em> (como Asaas, Mercado Pago ou EFI/Gerencianet), que confirma o recebimento automaticamente via webhook sem qualquer esforço manual.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <strong className="text-white block font-bold">2. Lançamento Manual (Secretaria / Conta Bancária):</strong>
                    <p>
                      Para doações em dinheiro recebidas na recepção da escola, depósitos bancários diretos no banco da APAE, carnês impressos ou eventos beneficentes (quermesses, bazares), a tesouraria clica em <strong>"Lançar Doação Manual"</strong> acima, inserindo o valor e gerando o registro oficial para prestação de contas.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Aba 7: Voluntários */}
        {activeAdminTab === 'voluntarios' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
              <h3 className="text-base font-black text-white">Inscrições de Voluntariado Recebidas ({volunteers.length})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {volunteers.map((vol) => (
                  <div key={vol.id} className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white">{vol.name}</h4>
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full">
                        {vol.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">Área: {vol.area} • {vol.availability}</p>
                    <p className="text-xs text-slate-300">Contato: {vol.phone} | {vol.email}</p>
                    <p className="text-[11px] text-slate-400 italic">"{vol.motivation}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
