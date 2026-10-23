import React, { useState, useEffect } from 'react';
import { ApaeProvider, useApae } from '../context/ApaeContext';
import { AccessibilityProvider } from '../context/AccessibilityContext';

// Components
import { AccessibilityBar } from '../components/AccessibilityBar';
import { ApaeNavbar } from '../components/ApaeNavbar';
import { HeroBanner } from '../components/HeroBanner';
import { InstitutionalSection } from '../components/InstitutionalSection';
import { ProjectsSection } from '../components/ProjectsSection';
import { TransparencyPortal } from '../components/TransparencyPortal';
import { NewsAndEventsSection } from '../components/NewsAndEventsSection';
import { VolunteerAndPartnershipSection } from '../components/VolunteerAndPartnershipSection';
import { ContactAndLocationSection } from '../components/ContactAndLocationSection';
import { ApaeFooter } from '../components/ApaeFooter';
import { ReadingGuide } from '../components/ReadingGuide';
import { Toast } from '../components/Toast';
import { VLibrasWidget } from '../components/VLibrasWidget';
import { ApaeComingSoon } from '../components/ApaeComingSoon';

// Admin
import { ApaeAdminPanel } from '../admin/ApaeAdminPanel';

// Modals
import { ComplianceModal } from '../modals/ComplianceModal';
import { EsicModal } from '../modals/EsicModal';
import { LgpdModal } from '../modals/LgpdModal';
import { DataDictionaryModal } from '../modals/DataDictionaryModal';
import { DonationModal } from '../modals/DonationModal';
import { TransparencyDocModal } from '../modals/TransparencyDocModal';
import { NewsDetailModal } from '../modals/NewsDetailModal';
import { EventDetailModal } from '../modals/EventDetailModal';
import { ProjectDetailModal } from '../modals/ProjectDetailModal';
import { ScheduleVisitModal } from '../modals/ScheduleVisitModal';

// Cookie Banner
import { ShieldCheck, Cookie, Check } from 'lucide-react';

function LgpdCookieBanner() {
  const [cookieConsent, setCookieConsent] = useState(() => {
    try {
      return localStorage.getItem('apae_cookie_consent') === 'accepted';
    } catch {
      return false;
    }
  });

  const { setLgpdModalOpen } = useApae();

  if (cookieConsent) return null;

  const handleAccept = () => {
    try {
      localStorage.setItem('apae_cookie_consent', 'accepted');
    } catch {}
    setCookieConsent(true);
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-6 sm:max-w-md z-50 animate-slide-up">
      <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700 p-4 sm:p-5 rounded-3xl shadow-2xl text-white space-y-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            <Cookie className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-black">Privacidade & Cookies (LGPD)</h4>
            <span className="text-[10px] text-slate-400">APAE Santa Cruz das Palmeiras</span>
          </div>
        </div>

        <p className="text-[11px] text-slate-300 leading-relaxed">
          Utilizamos cookies essenciais para garantir o funcionamento correto de formulários, acessibilidade e navegação anônima no portal de transparência.
        </p>

        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={handleAccept}
            className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1 shadow-sm"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Aceitar e Continuar</span>
          </button>

          <button
            onClick={() => setLgpdModalOpen(true)}
            className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
          >
            Política
          </button>
        </div>
      </div>
    </div>
  );
}

function ApaeMainContent() {
  const { isAdminOpen, setIsAdminOpen, comingSoonMode } = useApae();

  const [isPreviewMode, setIsPreviewMode] = useState(() => {
    try {
      if (typeof window === 'undefined') return false;
      const params = new URLSearchParams(window.location.search);
      const hostname = window.location.hostname.toLowerCase();
      const isOfficialDomain = hostname.includes('apaesantacruzdaspalmeiras.org.br');
      // No link temporário da Vercel (amp-flow.vercel.app) ou em desenvolvimento, abre o site completo direto!
      if (!isOfficialDomain) return true;
      return (
        params.get('preview') === 'true' || 
        params.get('preview') === '1' || 
        sessionStorage.getItem('apae_preview_bypass') === 'true'
      );
    } catch {
      return false;
    }
  });

  // Permite abrir o admin com #admin ou ?admin na URL
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        if (window.location.hash === '#admin' || window.location.search.includes('admin')) {
          setIsAdminOpen(true);
        }
      }
    } catch {}
  }, [setIsAdminOpen]);

  if (isAdminOpen) {
    return <ApaeAdminPanel />;
  }

  // Se o Modo "Em Breve" estiver ativado e o usuário não estiver em modo de prévia, exibe a página institucional de espera
  if (comingSoonMode && !isPreviewMode) {
    return (
      <ApaeComingSoon 
        onEnterPreview={() => {
          setIsPreviewMode(true);
          try { sessionStorage.setItem('apae_preview_bypass', 'true'); } catch {}
        }}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-[#0072C6]">
      
      {/* Faixa Superior Discreta de Homologação (Apenas se a página 'Em Breve' estiver ativa e o usuário for da equipe) */}
      {comingSoonMode && isPreviewMode && (
        <div className="bg-amber-400 text-slate-950 px-4 py-2 text-xs font-bold flex flex-wrap items-center justify-between gap-2 shadow-sm sticky top-0 z-50">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-slate-950 animate-pulse" />
            <span>Modo de Homologação Ativo • Visualizando a nova versão completa da APAE (Página "Em Breve" visível para o público comum)</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsPreviewMode(false);
                try { sessionStorage.removeItem('apae_preview_bypass'); } catch {}
              }}
              className="px-3 py-1 rounded-lg bg-slate-950 text-white hover:bg-black transition-colors text-[11px]"
            >
              Ver Tela "Em Breve"
            </button>
            <button
              onClick={() => setIsAdminOpen(true)}
              className="px-3 py-1 rounded-lg bg-white text-slate-950 hover:bg-slate-100 transition-colors text-[11px]"
            >
              Painel Gestor
            </button>
          </div>
        </div>
      )}

      {/* 1. Barra de Acessibilidade Superior (Leitor de voz, alto contraste, modo dislexia) */}
      <AccessibilityBar />

      {/* 2. Header & Navegação com Menus Oficiais */}
      <ApaeNavbar />

      <main id="inicio">
        {/* 3. Hero Banner com 50 Anos de História & Chave PIX Oficial */}
        <HeroBanner />

        {/* 4. Institucional (Quem Somos, História do Dudízio, Diretoria, Escola Luiz Affonso Mendes, Corpo Técnico) */}
        <InstitutionalSection />

        {/* 5. Atendimento & Projetos (Educação Especial, Saúde SUS, Assistência Social) */}
        <ProjectsSection />

        {/* 6. Super Portal da Transparência (Contas Públicas, Busca, Downloads XLSX/CSV/JSON, Checklist LAI) */}
        <TransparencyPortal />

        {/* 7. Notícias e Eventos Gerenciáveis */}
        <NewsAndEventsSection />

        {/* 8. Voluntariado & Parcerias ESG */}
        <VolunteerAndPartnershipSection />

        {/* 9. Informações de Contato, Endereço e Horários em Santa Cruz das Palmeiras */}
        <ContactAndLocationSection />
      </main>

      {/* 10. Rodapé Completo */}
      <ApaeFooter />

      {/* Modais Globais */}
      <ComplianceModal />
      <EsicModal />
      <LgpdModal />
      <DataDictionaryModal />
      <DonationModal />
      <TransparencyDocModal />
      <NewsDetailModal />
      <EventDetailModal />
      <ProjectDetailModal />
      <ScheduleVisitModal />

      {/* Utilitários Visuais */}
      <ReadingGuide />
      <Toast />
      <LgpdCookieBanner />
      <VLibrasWidget />
    </div>
  );
}

export default function ApaeApp() {
  return (
    <AccessibilityProvider>
      <ApaeProvider>
        <ApaeMainContent />
      </ApaeProvider>
    </AccessibilityProvider>
  );
}
