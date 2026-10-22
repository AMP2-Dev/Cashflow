import React, { useState, useEffect } from 'react';
import { useApae } from '../context/ApaeContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { INSTITUTION_DATA } from '../data/apaeData';
import { 
  Heart, 
  Sparkles, 
  ShieldCheck, 
  ChevronRight, 
  ArrowRight, 
  Copy, 
  Check, 
  Calendar, 
  Award,
  Users,
  Activity,
  GraduationCap
} from 'lucide-react';

export function HeroBanner() {
  const { openDonationModal, scrollToSection, setScheduleVisitModalOpen, showToast } = useApae();
  const { speakText } = useAccessibility();
  const [copiedPix, setCopiedPix] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  // Slides claros, luminosos e humanos com histórias e atendimento real
  const heroSlides = [
    {
      tag: "50 Anos de História & Acolhimento",
      titleLight: "Cuidando de cada vida com",
      titleHighlight: "ciência, amor e inclusão",
      description: "Há cinco décadas transformando a realidade de crianças, jovens e famílias em Santa Cruz das Palmeiras. Atendimento clínico multidisciplinar, reabilitação neurofuncional e educação especial 100% gratuitos.",
      image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=1200",
      patientStory: "Atendimento Humanizado • Fisioterapia & AEE",
      accentColor: "#F5A623"
    },
    {
      tag: "Educação Especial & AEE",
      titleLight: "Cada pequeno passo é uma",
      titleHighlight: "grande conquista de autonomia",
      description: "Na Escola de Educação Especial 'Luiz Affonso Mendes', nossos alunos aprendem, desenvolvem potenciais e conquistam independência em salas adaptadas e estimulação sensorial contínua.",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1200",
      patientStory: "Estimulação Precoce & Comunicação Alternativa",
      accentColor: "#0072C6"
    },
    {
      tag: "Saúde & Reabilitação pelo SUS",
      titleLight: "Dedicação que une técnica,",
      titleHighlight: "carinho e desenvolvimento",
      description: "Equipe especializada em Fisioterapia Neurofuncional, Fonoaudiologia, Terapia Ocupacional e Psicologia acolhendo mais de 165 assistidos e suas famílias todos os dias.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200",
      patientStory: "Mais de 18.200 sessões gratuitas por ano",
      accentColor: "#00875A"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const handleCopyPix = () => {
    navigator.clipboard.writeText(INSTITUTION_DATA.cnpj);
    setCopiedPix(true);
    showToast(`Chave PIX da APAE de Santa Cruz das Palmeiras (CNPJ: ${INSTITUTION_DATA.cnpj}) copiada com sucesso!`);
    setTimeout(() => setCopiedPix(false), 3000);
  };

  const current = heroSlides[activeSlide];

  return (
    <section 
      aria-label="Apresentação Principal da APAE" 
      className="relative w-full overflow-hidden bg-[#FDFBF7] text-slate-800 pt-8 pb-16 lg:pt-12 lg:pb-20 border-b border-slate-150"
    >
      {/* FORMAS ORGÂNICAS DE FORA A FORA (ESTILO AACD) — Curvas fluidas em amarelo e azul claro */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Curva Orgânica Amarela / Dourada AACD (Loop assimétrico fluido na lateral direita) */}
        <svg 
          className="absolute -right-20 sm:-right-10 top-0 w-[500px] sm:w-[700px] lg:w-[860px] h-full opacity-35 sm:opacity-40 transition-all duration-1000"
          viewBox="0 0 800 800" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M 650 100 C 400 120 280 280 340 480 C 400 680 620 720 750 620 C 880 520 850 300 750 200 Z" 
            stroke="#F5A623" 
            strokeWidth="90" 
            strokeLinecap="round" 
            fill="none" 
          />
          <circle cx="280" cy="220" r="140" fill="#E0F2FE" opacity="0.45" />
          <circle cx="700" cy="650" r="180" fill="#FEF3C7" opacity="0.6" />
        </svg>

        {/* Arco sutil superior esquerdo para quebrar a linearidade da página */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-br from-blue-100/40 via-amber-100/20 to-transparent blur-3xl pointer-events-none" />
      </div>

      {/* Conteúdo de Fora a Fora com Margens e Equilíbrio Visual */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* COLUNA ESQUERDA: Tipografia Leve, Aérea e Refinada */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Badges Delicados e Transparentes */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-wide bg-amber-100/70 text-amber-900 border border-amber-300/60">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>{current.tag}</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-normal text-slate-600 bg-white/70 backdrop-blur-xs border border-slate-200/80">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>CEBAS Saúde & Educação Homologado</span>
              </span>
            </div>

            {/* Título Principal com Peso Suave (font-light / font-normal) */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight leading-[1.18] text-slate-800">
              {current.titleLight}{' '}
              <span className="font-normal text-slate-900 border-b-2 border-[#F5A623]/60 pb-0.5">
                {current.titleHighlight}
              </span>
            </h1>

            {/* Descrição Leve e Fluida */}
            <p className="text-sm sm:text-base text-slate-600 font-normal max-w-xl leading-relaxed">
              {current.description}
            </p>

            {/* Ações: Botões elegantes sem peso excessivo */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => openDonationModal(60, 'recorrente', 'Apoio Geral APAE')}
                className="px-6 py-3 rounded-full font-medium text-xs sm:text-sm text-slate-950 bg-[#F5A623] hover:bg-[#E59715] shadow-xs hover:shadow-md transition-all flex items-center gap-2 active:scale-95"
              >
                <Heart className="w-4 h-4 fill-slate-950 text-slate-950" />
                <span>FAZER UMA DOAÇÃO ONLINE</span>
              </button>

              <button
                onClick={() => scrollToSection('projetos')}
                className="px-5 py-3 rounded-full font-normal text-xs sm:text-sm text-slate-700 bg-white/80 hover:bg-white border border-slate-200/80 transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <span>Conhecer Atendimentos</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                onClick={() => setScheduleVisitModalOpen(true)}
                className="px-4 py-3 rounded-full font-normal text-xs text-slate-500 hover:text-slate-800 hover:bg-slate-100/60 transition-colors flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5 text-[#F5A623]" />
                <span>Agendar Visita</span>
              </button>
            </div>

            {/* Navegador Discreto de Slides */}
            <div className="flex items-center gap-2 pt-2">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-1.5 rounded-full transition-all ${
                    activeSlide === idx ? 'w-8 bg-[#0072C6]' : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Ir para destaque ${idx + 1}`}
                />
              ))}
            </div>

          </div>

          {/* COLUNA DIREITA: Cortes da Imagem Asimétricos + Card Translúcido Sobreposto (Estilo AACD) */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            
            {/* Foto com Corte Orgânico Desequilibrado / Equilibrado (Canto superior curvado acentuado) */}
            <div className="relative z-10 w-full">
              <div className="relative overflow-hidden rounded-[36px] sm:rounded-[44px] rounded-tr-[90px] sm:rounded-tr-[130px] border-4 border-white shadow-xl aspect-[4/3] sm:aspect-[16/11] bg-slate-100 group">
                <img
                  src={current.image}
                  alt="Atendimento acolhedor e humanizado na APAE de Santa Cruz das Palmeiras"
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />

                {/* Tag de identificação sobre a foto */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] font-medium text-slate-700 shadow-xs border border-white/80">
                  {current.patientStory}
                </div>
              </div>

              {/* CARD FLUTUANTE TRANSLÚCIDO SOBREPOSTO (Overlap trazendo desequilíbrio e leveza) */}
              <div className="relative sm:-mt-12 sm:-ml-6 z-20 mt-4 max-w-sm ml-auto sm:ml-0 bg-white/85 backdrop-blur-md border border-slate-200/70 rounded-3xl p-4 sm:p-5 shadow-lg space-y-3">
                <div className="flex items-center justify-between border-b border-slate-150 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-medium text-slate-800">Doação Rápida via PIX</span>
                  </div>
                  <span className="text-[10px] font-normal text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    Oficial & Direto
                  </span>
                </div>

                {/* Box da Chave CNPJ com Copiar em Design Claro */}
                <div className="flex items-center justify-between gap-2 bg-slate-50/90 px-3 py-2 rounded-xl border border-slate-200">
                  <div>
                    <span className="block text-[10px] font-normal text-slate-400">Chave CNPJ Oficial:</span>
                    <code className="text-xs font-mono font-medium text-slate-800 tracking-wide">
                      {INSTITUTION_DATA.cnpj}
                    </code>
                  </div>

                  <button
                    onClick={handleCopyPix}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-normal transition-all flex items-center gap-1 shadow-xs ${
                      copiedPix
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                    title="Copiar Chave CNPJ da APAE"
                  >
                    {copiedPix ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedPix ? 'Copiado!' : 'Copiar'}</span>
                  </button>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
                  <span>Associação de Pais e Amigos dos Excepcionais</span>
                  <button
                    onClick={() => openDonationModal(60, 'recorrente')}
                    className="text-[#0072C6] font-medium hover:underline text-[11px]"
                  >
                    Outras formas →
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* BARRA DE ESTATÍSTICAS COM CARDS EM CONTORNO / TRANSLÚCIDOS (Alternância de Peso) */}
        <div className="mt-14 pt-8 border-t border-slate-200/70 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {INSTITUTION_DATA.stats.map((st, i) => (
            <div 
              key={i} 
              className="bg-transparent hover:bg-white/70 border border-slate-200/80 hover:border-amber-300/70 rounded-2xl p-4 transition-all duration-300 group"
            >
              <div className="text-2xl sm:text-3xl font-light text-slate-900 group-hover:text-[#F5A623] transition-colors">
                {st.value.toLocaleString('pt-BR')}<span className="text-base text-slate-400 font-normal">{st.suffix}</span>
              </div>
              <div className="text-xs font-medium text-slate-700 mt-0.5">{st.label}</div>
              <div className="text-[11px] font-normal text-slate-500 leading-tight">{st.subtitle}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
