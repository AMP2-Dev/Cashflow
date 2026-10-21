import React, { useState } from 'react';
import { useApae } from '../context/ApaeContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { 
  Heart, 
  Menu, 
  X, 
  ShieldCheck, 
  ChevronDown, 
  Users, 
  Building2, 
  FileText, 
  HandHeart, 
  Calendar, 
  BookOpen, 
  Stethoscope, 
  Phone,
  Lock,
  Layers,
  HelpCircle,
  Database,
  ShieldAlert
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
        { id: 'checklist-lai', label: 'Checklist Oficial de Transparência', action: () => setComplianceModalOpen(true) },
        { id: 'dicionario-dados', label: 'Dados Abertos & Dicionário (LAI)', action: () => setDataDictionaryModalOpen(true) },
        { id: 'faq-sociedade', label: 'Perguntas Frequentes (FAQ)', section: 'faq' }
      ]
    },
    { id: 'noticias-eventos', label: 'Notícias & Eventos', section: 'noticias-eventos' },
    { 
      id: 'ouvidoria-menu', 
      label: 'Ouvidoria & e-SIC',
      children: [
        { id: 'esic-solicitar', label: 'e-SIC — Pedido de Informação (LAI)', action: () => setEsicModalOpen(true) },
        { id: 'denuncia-sigilosa', label: 'Canal de Denúncias com Sigilo', action: () => setEsicModalOpen(true) },
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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Oficial APAE com Brasão */}
          <button
            onClick={() => handleNavClick('inicio')}
            className="flex items-center gap-3 group text-left focus:outline-none focus:ring-2 focus:ring-[#0072C6] rounded-lg p-1"
            aria-label="APAE Santa Cruz das Palmeiras - Página Inicial"
          >
            {/* SVG da Flor da APAE */}
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0072C6] to-blue-800 flex items-center justify-center shadow-md p-1.5 transition-transform group-hover:scale-105 flex-shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path d="M 20 80 C 15 50 40 40 46 25 C 48 38 35 60 40 80 Z" fill="#00875A" />
                <path d="M 80 80 C 85 50 60 40 54 25 C 52 38 65 60 60 80 Z" fill="#00875A" />
                <ellipse cx="50" cy="22" rx="6" ry="12" fill="#F5A623" />
                <ellipse cx="50" cy="48" rx="6" ry="12" fill="#F5A623" />
                <ellipse cx="37" cy="35" rx="12" ry="6" fill="#F5A623" />
                <ellipse cx="63" cy="35" rx="12" ry="6" fill="#F5A623" />
                <ellipse cx="41" cy="26" rx="10" ry="6" transform="rotate(-45 41 26)" fill="#F5A623" />
                <ellipse cx="59" cy="26" rx="10" ry="6" transform="rotate(45 59 26)" fill="#F5A623" />
                <ellipse cx="41" cy="44" rx="10" ry="6" transform="rotate(45 41 44)" fill="#F5A623" />
                <ellipse cx="59" cy="44" rx="10" ry="6" transform="rotate(-45 59 44)" fill="#F5A623" />
                <circle cx="50" cy="35" r="7" fill="#FFFFFF" />
                <circle cx="50" cy="35" r="4" fill="#004B87" />
                <path d="M 32 82 C 50 90 50 90 68 82 C 60 86 40 86 32 82 Z" fill="#F5A623" />
              </svg>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-xl tracking-tight text-[#0072C6]">APAE</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                  Santa Cruz das Palmeiras
                </span>
              </div>
              <p className="text-[11px] font-semibold text-slate-500 tracking-tight line-clamp-1">
                Escola de Ed. Especial "Luiz Affonso Mendes" • 50 Anos
              </p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
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
                  className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                    currentSection === item.id || currentSection === item.section
                      ? 'text-[#0072C6] bg-blue-50 font-black' 
                      : 'text-slate-700 hover:text-[#0072C6] hover:bg-slate-50'
                  }`}
                  aria-haspopup={item.children ? 'true' : 'false'}
                  aria-expanded={activeDropdown === item.id}
                >
                  <span>{item.label}</span>
                  {item.children && <ChevronDown className="w-3.5 h-3.5 opacity-60" />}
                </button>

                {/* Dropdown Menu */}
                {item.children && activeDropdown === item.id && (
                  <div className="absolute left-0 top-full pt-1 w-64 animate-fade-in z-50">
                    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-2 overflow-hidden">
                      {item.children.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => {
                            if (sub.action) sub.action();
                            else if (sub.section) handleNavClick(sub.section);
                            setActiveDropdown(null);
                          }}
                          className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-[#0072C6] transition-colors flex items-center justify-between"
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

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2">
            {/* Checklist Direto */}
            <button
              onClick={() => setComplianceModalOpen(true)}
              className="p-2 rounded-xl border border-blue-200 text-[#0072C6] bg-blue-50 hover:bg-blue-100 text-xs font-bold transition-all flex items-center gap-1.5"
              title="Abrir Checklist Oficial de Transparência"
            >
              <ShieldCheck className="w-4 h-4 text-[#0072C6]" />
              <span className="hidden lg:inline">Transparência</span>
            </button>

            {/* Painel do Gestor */}
            <button
              onClick={() => setIsAdminOpen(!isAdminOpen)}
              className={`p-2 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-bold ${
                isAdminOpen
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'border-slate-200 text-slate-600 hover:text-[#0072C6] hover:border-blue-200 hover:bg-slate-50'
              }`}
              title="Acessar Painel Administrativo / CMS"
            >
              <Lock className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden lg:inline">{isAdminOpen ? 'Sair Gestor' : 'Gestor'}</span>
            </button>

            {/* Doar Agora Principal */}
            <button
              onClick={() => openDonationModal(60, 'recorrente', 'Escola Luiz Affonso Mendes')}
              className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-xl font-black text-xs text-slate-900 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 shadow-md hover:shadow-lg transition-all"
            >
              <Heart className="w-3.5 h-3.5 fill-slate-900 text-slate-900" />
              <span>DOAR AGORA</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={() => openDonationModal(60, 'recorrente')}
              className="px-3 py-1.5 rounded-lg text-xs font-black bg-amber-400 text-slate-900 flex items-center gap-1"
            >
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>Doar</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100"
              aria-label="Abrir Menu de Navegação"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-slate-100 px-4 pt-3 pb-6 space-y-2 shadow-2xl animate-slide-up max-h-[85vh] overflow-y-auto">
          {navLinks.map((item) => (
            <div key={item.id} className="border-b border-slate-50 pb-2">
              <button
                onClick={() => {
                  if (item.section) handleNavClick(item.section);
                  else if (item.children) handleNavClick(item.children[0].section || 'inicio');
                }}
                className="w-full text-left py-2 px-3 text-sm font-bold text-slate-800 hover:text-[#0072C6] hover:bg-blue-50 rounded-xl"
              >
                {item.label}
              </button>
              {item.children && (
                <div className="pl-4 space-y-1 mt-1">
                  {item.children.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => {
                        if (sub.action) sub.action();
                        else if (sub.section) handleNavClick(sub.section);
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left py-1.5 px-3 text-xs font-medium text-slate-600 hover:text-[#0072C6] rounded-lg flex items-center gap-2"
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
              className="w-full py-2.5 px-4 rounded-xl bg-blue-50 text-[#0072C6] font-bold text-xs flex items-center justify-center gap-2 border border-blue-200"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Checklist de Transparência</span>
            </button>

            <button
              onClick={() => {
                setIsAdminOpen(!isAdminOpen);
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4 text-slate-500" />
              <span>{isAdminOpen ? 'Sair do Painel Gestor' : 'Área do Gestor (CMS)'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
