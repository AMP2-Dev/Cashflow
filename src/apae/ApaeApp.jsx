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
  const { isAdminOpen, setIsAdminOpen } = useApae();

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

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-[#0072C6]">
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
