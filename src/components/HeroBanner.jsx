import React, { useState, useEffect } from 'react';
import { useApae } from '../context/ApaeContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { INSTITUTION_DATA } from '../data/apaeData';
import { 
  Heart, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  Copy, 
  Check, 
  Calendar, 
  ChevronRight,
  SlidersHorizontal,
  Maximize2,
  Minimize2
} from 'lucide-react';

export function HeroBanner() {
  const { openDonationModal, scrollToSection, setScheduleVisitModalOpen, showToast } = useApae();
  const { speakText } = useAccessibility();
  const [copiedPix, setCopiedPix] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  // Modo Fundo Total Cinemático (com deslocamento suave) vs Modo Editorial
  const [heroLayoutMode, setHeroLayoutMode] = useState('fullbleed'); // 'fullbleed' | 'split'

  const heroSlides = [
    {
      tag: "50 Anos de Amor & Dedicação (1976 - 2026)",
      titleLight: "Cada vida atendida é uma",
      titleHighlight: "história de amor e superação",
      description: "Há cinco décadas acolhendo crianças, jovens e famílias em Santa Cruz das Palmeiras. Atendimento clínico multidisciplinar, reabilitação neurofuncional e educação especial 100% gratuitos e humanizados.",
      image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=85&w=1920",
      patientStory: "Atendimento Humanizado • Fisioterapia & Estimulação",
      accentColor: "#F5A623"
    },
    {
      tag: "Escola de Educação Especial 'Luiz Affonso Mendes'",
      titleLight: "Aprender no próprio ritmo com",
      titleHighlight: "respeito, dignidade e carinho",
      description: "Salas de aula adaptadas, currículo funcional e tecnologia assistiva para que cada aluno conquiste autonomia diária, alfabetização inclusiva e integração com a comunidade.",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=85&w=1920",
      patientStory: "Educação Especial & Estimulação Precoce",
      accentColor: "#0072C6"
    },
    {
      tag: "Centro de Reabilitação Multidisciplinar SUS",
      titleLight: "Ciência e afeto unidos na",
      titleHighlight: "reabilitação neurofuncional contínua",
      description: "Equipe especializada em Fisioterapia Neurofuncional, Fonoaudiologia, Terapia Ocupacional e Psicologia acolhendo mais de 165 assistidos de Santa Cruz das Palmeiras.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=85&w=1920",
      patientStory: "Mais de 18.200 atendimentos anuais gratuitos",
      accentColor: "#00875A"
    }
  ];

  // Alternância automática dos slides com tempo suave
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 9000);
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
      className={`relative w-full overflow-hidden transition-all duration-700 ${
        heroLayoutMode === 'fullbleed'
          ? 'min-h-[640px] lg:min-h-[720px] flex items-center bg-slate-900'
          : 'bg-[#FDFBF7] pt-8 pb-16 lg:pt-12 lg:pb-20 border-b border-slate-150'
      }`}
    >
      {/* =========================================================================
          MODO 1: HERO FUNDO TOTAL COM EFEITO DE DESLOCAMENTO SUAVE (KEN BURNS)
          Sem caixinha, sem quadrado americano, foto viva e humana de fora a fora
          ========================================================================= */}
      {heroLayoutMode === 'fullbleed' && (
        <>
          {/* FOTO DE FUNDO TOTAL COM EFEITO SUAVE DE DESLOCAMENTO / ZOOM LENTO */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            {heroSlides.map((slide, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  activeSlide === idx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.titleHighlight}
                  className={`w-full h-full object-cover object-center transition-transform duration-[10000ms] ease-out ${
                    activeSlide === idx ? 'scale-110 translate-x-3 -translate-y-2' : 'scale-100 translate-x-0 translate-y-0'
                  }`}
                />
              </div>
            ))}

            {/* MÁSCARA LUMINOSA QUENTE BRASILEIRA (NÃO ESCURA): 
                Clara e translúcida à esquerda para dar leitura perfeita ao texto, 
                e 100% transparente à direita para a foto humana brilhar com nitidez total */}
            <div className="absolute inset-0 z-20 bg-gradient-to-r from-white/95 via-white/85 to-white/10 sm:via-white/75 sm:to-transparent pointer-events-none" />
            <div className="absolute inset-0 z-20 bg-gradient-to-t from-white/90 via-transparent to-white/40 pointer-events-none" />

            {/* Curva Orgânica Sutil de Apoio (Estilo AACD em filigrana amarela dourada) */}
            <svg 
              className="absolute right-0 top-0 w-[550px] lg:w-[750px] h-full opacity-25 pointer-events-none z-20 hidden md:block"
              viewBox="0 0 800 800" 
              fill="none"
            >
              <path 
                d="M 600 80 C 380 140 260 320 320 520 C 380 720 620 740 740 640 Z" 
                stroke="#F5A623" 
                strokeWidth="70" 
                strokeLinecap="round" 
              />
            </svg>
          </div>

          {/* CONTEÚDO SOBREPOSTO DE FORA A FORA */}
          <div className="relative z-30 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-12 lg:py-16 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Bloco de Texto Fluido e Aéreo */}
              <div className="lg:col-span-8 space-y-6 max-w-2xl">
                
                {/* Badges Flutuantes Delicados */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-wide bg-amber-100/90 text-amber-900 border border-amber-300/70 shadow-xs backdrop-blur-xs">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>{current.tag}</span>
                  </span>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-normal text-slate-700 bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-xs">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>CEBAS Saúde & Educação Homologado</span>
                  </span>
                </div>

                {/* Título Principal com Tipografia Leve e Fluida */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light tracking-tight leading-[1.14] text-slate-900">
                  {current.titleLight}{' '}
                  <span className="font-normal text-slate-900 border-b-2 border-[#F5A623] pb-0.5">
                    {current.titleHighlight}
                  </span>
                </h1>

                {/* Descrição Leve e Acolhedora */}
                <p className="text-sm sm:text-base text-slate-700 font-normal leading-relaxed max-w-xl">
                  {current.description}
                </p>

                {/* Botões de Ação com Estilo Arredondado Orgânico */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => openDonationModal(60, 'recorrente', 'Apoio Geral APAE')}
                    className="px-6 py-3 rounded-full font-medium text-xs sm:text-sm text-slate-950 bg-[#F5A623] hover:bg-[#E59715] shadow-md hover:shadow-lg transition-all flex items-center gap-2 active:scale-95"
                  >
                    <Heart className="w-4 h-4 fill-slate-950 text-slate-950" />
                    <span>FAZER UMA DOAÇÃO ONLINE</span>
                  </button>

                  <button
                    onClick={() => scrollToSection('projetos')}
                    className="px-5 py-3 rounded-full font-normal text-xs sm:text-sm text-slate-800 bg-white/90 hover:bg-white border border-slate-200/80 transition-colors flex items-center gap-1.5 shadow-xs backdrop-blur-xs"
                  >
                    <span>Conhecer Atendimentos</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  <button
                    onClick={() => setScheduleVisitModalOpen(true)}
                    className="px-4 py-3 rounded-full font-normal text-xs text-slate-600 hover:text-slate-900 hover:bg-white/60 transition-colors flex items-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#F5A623]" />
                    <span>Agendar Visita</span>
                  </button>
                </div>

                {/* Seletor Discreto de Slides */}
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
                  <span className="text-[11px] font-normal text-slate-400 ml-2">
                    {activeSlide + 1} de {heroSlides.length}
                  </span>
                </div>

              </div>

              {/* Box Flutuante Translúcido de Doação PIX Direto */}
              <div className="lg:col-span-4 mt-4 lg:mt-0">
                <div className="bg-white/90 backdrop-blur-md border border-white/80 rounded-3xl p-5 sm:p-6 shadow-xl space-y-3.5 max-w-sm ml-auto">
                  <div className="flex items-center justify-between border-b border-slate-150 pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs font-medium text-slate-800">Doação Rápida via PIX</span>
                    </div>
                    <span className="text-[10px] font-normal text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      100% Direto
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 font-normal leading-relaxed">
                    Sua contribuição apoia a compra de materiais pedagógicos adaptados e manutenção da clínica SUS.
                  </p>

                  <div className="flex items-center justify-between gap-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200/80">
                    <div>
                      <span className="block text-[10px] text-slate-400">Chave PIX (CNPJ Oficial):</span>
                      <code className="text-xs font-mono font-medium text-slate-800">
                        {INSTITUTION_DATA.cnpj}
                      </code>
                    </div>

                    <button
                      onClick={handleCopyPix}
                      className={`px-3 py-1.5 rounded-lg text-[11px] font-normal transition-all flex items-center gap-1 shadow-2xs ${
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

                  <button
                    onClick={() => openDonationModal(60, 'recorrente')}
                    className="w-full py-2 rounded-xl bg-blue-50/80 hover:bg-blue-100 text-[#0072C6] text-xs font-medium transition-colors flex items-center justify-center gap-1 border border-blue-200/60"
                  >
                    <span>Outras formas (Boleto / Cartão)</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>

            {/* Barra de Estatísticas em Faixa Translúcida com Alternância de Cards */}
            <div className="mt-12 pt-6 border-t border-slate-200/60 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
              {INSTITUTION_DATA.stats.map((st, i) => (
                <div 
                  key={i} 
                  className="bg-white/70 hover:bg-white/95 backdrop-blur-xs border border-white/90 rounded-2xl p-4 transition-all duration-300 shadow-2xs group"
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
        </>
      )}

      {/* =========================================================================
          MODO 2: HERO EDITORIAL EM CORTES ORGÂNICOS (ESTILO AACD)
          ========================================================================= */}
      {heroLayoutMode === 'split' && (
        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-100/70 text-amber-900 border border-amber-300/60">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>{current.tag}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-normal text-slate-600 bg-white/70 border border-slate-200/80">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>CEBAS Saúde & Educação</span>
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight leading-[1.18] text-slate-800">
                {current.titleLight}{' '}
                <span className="font-normal text-slate-900 border-b-2 border-[#F5A623]/60 pb-0.5">
                  {current.titleHighlight}
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-600 font-normal max-w-xl leading-relaxed">
                {current.description}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => openDonationModal(60, 'recorrente')}
                  className="px-6 py-3 rounded-full font-medium text-xs sm:text-sm text-slate-950 bg-[#F5A623] hover:bg-[#E59715] shadow-xs hover:shadow-md transition-all flex items-center gap-2"
                >
                  <Heart className="w-4 h-4 fill-slate-950 text-slate-950" />
                  <span>DOAÇÃO ONLINE</span>
                </button>

                <button
                  onClick={() => scrollToSection('projetos')}
                  className="px-5 py-3 rounded-full font-normal text-xs sm:text-sm text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/80 transition-colors flex items-center gap-1.5"
                >
                  <span>Conhecer Projetos</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 relative mt-4 lg:mt-0">
              <div className="relative overflow-hidden rounded-[36px] rounded-tr-[120px] border-4 border-white shadow-xl aspect-[4/3] bg-slate-100">
                <img
                  src={current.image}
                  alt={current.titleHighlight}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      )}

      {/* BOTÃO DISCRETO DE CONTROLE DE VISUALIZAÇÃO:
          Permite alternar entre "Fundo Total Cinemático" e "Editorial em Cortes"
          para que o cliente e o conselho possam ver os dois modelos na hora! */}
      <div className="absolute top-4 right-4 z-40">
        <button
          onClick={() => {
            const nextMode = heroLayoutMode === 'fullbleed' ? 'split' : 'fullbleed';
            setHeroLayoutMode(nextMode);
            showToast(nextMode === 'fullbleed' ? "Modo Fundo Total Cinemático ativado!" : "Modo Editorial em Cortes ativado!", "info");
          }}
          className="px-3 py-1.5 rounded-full text-[11px] font-normal transition-all bg-white/80 hover:bg-white text-slate-700 border border-slate-200/80 shadow-xs backdrop-blur-md flex items-center gap-1.5"
          title="Alternar entre Fundo Total Cinemático e Editorial em Cortes"
        >
          {heroLayoutMode === 'fullbleed' ? <Minimize2 className="w-3 h-3 text-[#0072C6]" /> : <Maximize2 className="w-3 h-3 text-[#0072C6]" />}
          <span className="hidden sm:inline">
            {heroLayoutMode === 'fullbleed' ? 'Visualização: Fundo Total Cinemático' : 'Visualização: Editorial'}
          </span>
        </button>
      </div>

    </section>
  );
}
