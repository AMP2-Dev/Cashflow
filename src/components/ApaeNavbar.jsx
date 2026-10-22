import React, { useState } from 'react';
import { useApae } from '../context/ApaeContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { 
  Heart, 
  Menu, 
  X, 
  ShieldCheck, 
  ChevronDown, 
  Lock,
  MessageSquare,
  FileText
} from 'lucide-react';

export function ApaeNavbar() {
  const { 
    currentSection, 
    scrollToSection, 
    openDonationModal, 
    setIsAdminOpen, 
    isAdminOpen,
    setScheduleVisitModalOpen,
    setComplianceModalOpen,
    setEsicModalOpen,
    setLgpdModalOpen,
    setDataDictionaryModalOpen,
    institution
  } = useApae();

  const { speakText } = useAccessibility();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const navLinks = [
    { id: 'inicio', label: 'Início', section: 'inicio' },
    { 
      id: 'institucional', 
      label: 'Institucional',
      children: [
        { id: 'historia', label: 'Nossa História & Dudízio (50 Anos)', section: 'institucional' },
        { id: 'escola', label: "Escola de Ed. Especial 'Luiz Affonso Mendes'", section: 'institucional' },
        { id: 'diretoria', label: 'Diretoria Executiva & Conselhos', section: 'institucional' },
        { id: 'corpo-tecnico', label: 'Corpo Clínico & Pedagógico', section: 'institucional' },
        { id: 'instalacoes', label: 'Instalações & Sede Própria', section: 'institucional' }
      ]
    },
    { 
      id: 'atendimento', 
      label: 'Atendimento & Projetos',
      children: [
        { id: 'proj-educacao', label: 'Educação Especial & AEE', section: 'projetos' },
        { id: 'proj-saude', label: 'Saúde & Reabilitação (SUS)', section: 'projetos' },
        { id: 'proj-social', label: 'Assistência Social & Famílias', section: 'projetos' }
      ]
    },
    { 
      id: 'transparencia-menu', 
      label: 'Transparência',
      children: [
        { id: 'portal-transp', label: 'Portal das Contas Públicas', section: 'transparencia' },
        { id: 'checklist-lai', label: 'Checklist Oficial de Transparência (LAI)', action: () => setComplianceModalOpen(true) },
        { id: 'dicionario-dados', label: 'Dados Abertos & Dicionário', action: () => setDataDictionaryModalOpen(true) },
        { id: 'faq-sociedade', label: 'Perguntas Frequentes (FAQ)', section: 'faq' }
      ]
    },
    { id: 'noticias-eventos', label: 'Notícias & Eventos', section: 'noticias-eventos' },
    { 
      id: 'ouvidoria-menu', 
      label: 'Ouvidoria & e-SIC',
      children: [
        { id: 'esic-solicitar', label: 'e-SIC — Pedido de Informação', action: () => setEsicModalOpen(true) },
        { id: 'denuncia-sigilosa', label: 'Canal de Denúncias Sigiloso', action: () => setEsicModalOpen(true) },
        { id: 'faq-transp', label: 'Dúvidas Frequentes', section: 'faq' }
      ]
    },
    { 
      id: 'lgpd-menu', 
      label: 'LGPD',
      children: [
        { id: 'politica-privacidade', label: 'Política de Privacidade & Termos', action: () => setLgpdModalOpen(true) },
        { id: 'direitos-titular', label: 'Direitos do Titular (Art. 18)', action: () => setLgpdModalOpen(true) },
        { id: 'canal-dpo', label: 'Canal do Encarregado (DPO)', action: () => setLgpdModalOpen(true) }
      ]
    },
    { 
      id: 'participe', 
      label: 'Participe',
      children: [
        { id: 'doar', label: 'Doar Online (PIX / Cartão)', action: () => openDonationModal(60, 'recorrente') },
        { id: 'voluntariado', label: 'Seja um Voluntário', section: 'participe' },
        { id: 'visita', label: 'Agendar Visita Institucional', action: () => setScheduleVisitModalOpen(true) },
        { id: 'contato-apae', label: 'Fale Conosco', section: 'contato' }
      ]
    }
  ];

  const handleNavClick = (sectionId) => {
    scrollToSection(sectionId);
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-150 transition-colors">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-20 sm:h-24">
          
          {/* Logo Oficial APAE Santa Cruz das Palmeiras com Respiro e Equilíbrio */}
          <button
            onClick={() => handleNavClick('inicio')}
            className="flex items-center gap-3.5 sm:gap-4 group text-left focus:outline-none rounded-2xl py-1 pr-3"
            aria-label="APAE Santa Cruz das Palmeiras - Página Inicial"
          >
            {/* Imagem do Logo Oficial sem aperto */}
            <div className="h-12 sm:h-14 w-auto flex items-center justify-center transition-transform group-hover:scale-[1.02]">
              <img
                src="/apae-scp-logo.png"
                alt="Logo APAE Santa Cruz das Palmeiras"
                className="h-full w-auto object-contain drop-shadow-xs"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://apaesantacruzdaspalmeiras.org.br/ws/media-library/40d609f41a99cf7ade980c57f164633b/apae-scp.png";
                }}
              />
            </div>

            <div className="hidden sm:block border-l border-slate-200 pl-3.5">
              <span className="block text-[13px] font-medium tracking-tight text-slate-800 leading-snug">
                APAE Santa Cruz das Palmeiras
              </span>
              <span className="block text-[11px] font-normal text-slate-500 tracking-normal">
                Escola de Ed. Especial "Luiz Affonso Mendes" • 50 Anos
              </span>
            </div>
          </button>

          {/* Desktop Navigation com Fontes Finas, Menores e Espaçamento Aéreo */}
          <nav className="hidden xl:flex items-center gap-0.5 2xl:gap-1.5">
            {navLinks.map((item) => (
              <div 
                key={item.id}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.id)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  onClick={() => {
                    if (!item.children) handleNavClick(item.section);
                  }}
                  className={`flex items-center gap-1 px-2.5 2xl:px-3 py-1.5 rounded-full text-[13px] font-normal tracking-wide transition-all ${
                    currentSection === item.id || currentSection === item.section
                      ? 'text-[#0072C6] bg-blue-50/70 font-medium' 
                      : 'text-slate-600 hover:text-[#0072C6] hover:bg-slate-50/80'
                  }`}
                  aria-haspopup={item.children ? 'true' : 'false'}
                  aria-expanded={activeDropdown === item.id}
                >
                  <span>{item.label}</span>
                  {item.children && <ChevronDown className="w-3 h-3 opacity-40 transition-transform group-hover:rotate-180" />}
                </button>

                {/* Dropdown Menu com visual leve e translúcido */}
                {item.children && activeDropdown === item.id && (
                  <div className="absolute left-0 top-full pt-1.5 w-64 animate-fade-in z-50">
                    <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200/70 p-2 overflow-hidden">
                      {item.children.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => {
                            if (sub.action) sub.action();
                            else if (sub.section) handleNavClick(sub.section);
                            setActiveDropdown(null);
                          }}
                          className="w-full text-left px-3.5 py-2 rounded-xl text-xs font-normal text-slate-600 hover:bg-blue-50/60 hover:text-[#0072C6] transition-colors flex items-center justify-between"
                        >
                          <span>{sub.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Action CTAs: Botões leves e equilibrados */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Checklist Transparência (Botão contorno translúcido) */}
            <button
              onClick={() => setComplianceModalOpen(true)}
              className="px-3 py-2 rounded-full border border-blue-200/80 text-[#0072C6] bg-blue-50/40 hover:bg-blue-50 text-xs font-medium transition-all flex items-center gap-1.5"
              title="Abrir Checklist Oficial de Transparência LAI"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#0072C6]" />
              <span className="hidden lg:inline">Transparência</span>
            </button>

            {/* Painel do Gestor (Contorno sutil) */}
            <button
              onClick={() => setIsAdminOpen(!isAdminOpen)}
              className={`p-2 rounded-full border text-xs font-medium transition-all flex items-center gap-1.5 ${
                isAdminOpen
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'border-slate-200/80 text-slate-500 hover:text-[#0072C6] hover:border-blue-200 hover:bg-slate-50/60'
              }`}
              title="Acessar Painel Administrativo / CMS"
            >
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden lg:inline">{isAdminOpen ? 'Sair' : 'Gestor'}</span>
            </button>

            {/* Doar Agora Principal em estilo refinado */}
            <button
              onClick={() => openDonationModal(60, 'recorrente', 'Escola Luiz Affonso Mendes')}
              className="group relative inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-medium text-xs text-slate-900 bg-[#F5A623] hover:bg-[#E59715] shadow-xs hover:shadow-md transition-all active:scale-95"
            >
              <Heart className="w-3.5 h-3.5 fill-slate-900 text-slate-900" />
              <span>DOAR AGORA</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={() => openDonationModal(60, 'recorrente')}
              className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#F5A623] text-slate-900 flex items-center gap-1"
            >
              <Heart className="w-3 h-3 fill-current" />
              <span>Doar</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100"
              aria-label="Abrir Menu de Navegação"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white/98 backdrop-blur-xl border-t border-slate-100 px-5 pt-3 pb-6 space-y-2 shadow-2xl animate-slide-up max-h-[85vh] overflow-y-auto">
          {navLinks.map((item) => (
            <div key={item.id} className="border-b border-slate-100/70 pb-2">
              <button
                onClick={() => {
                  if (item.section) handleNavClick(item.section);
                  else if (item.children) handleNavClick(item.children[0].section || 'inicio');
                }}
                className="w-full text-left py-2 px-2 text-sm font-medium text-slate-700 hover:text-[#0072C6] rounded-xl"
              >
                {item.label}
              </button>
              {item.children && (
                <div className="pl-3 space-y-1 mt-0.5">
                  {item.children.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => {
                        if (sub.action) sub.action();
                        else if (sub.section) handleNavClick(sub.section);
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left py-1.5 px-3 text-xs font-normal text-slate-500 hover:text-[#0072C6] rounded-lg flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0072C6]" />
                      <span>{sub.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="pt-3 space-y-2">
            <button
              onClick={() => {
                setComplianceModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-4 rounded-full bg-blue-50/70 text-[#0072C6] font-medium text-xs flex items-center justify-center gap-2 border border-blue-200/80"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Checklist de Transparência</span>
            </button>

            <button
              onClick={() => {
                setIsAdminOpen(!isAdminOpen);
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-4 rounded-full border border-slate-200 text-slate-600 font-medium text-xs flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4 text-slate-400" />
              <span>{isAdminOpen ? 'Sair do Painel Gestor' : 'Área do Gestor (CMS)'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
