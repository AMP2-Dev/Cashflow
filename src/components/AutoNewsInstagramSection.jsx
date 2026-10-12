import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import {
  Sparkles,
  Music,
  Cpu,
  Shirt,
  Share2,
  Download,
  Instagram,
  ExternalLink,
  RefreshCw,
  X,
  Check,
  Clock,
  Radio
} from 'lucide-react';
import { useRadio } from '../context/RadioContext';

const DEFAULT_FALLBACK_NEWS = {
  updatedLabel: 'Atualizado automaticamente',
  featuredSix: [
    {
      id: 'fb-mus-1',
      category: 'Música',
      title: 'Vinil e Áudio Lossless impulsionam nova era de ouro dos clássicos dos anos 80 e 90',
      summary: 'A busca por timbres analógicos e remasterizações em alta definição coloca ícones do Pop, Rock e MPB no topo das transmissões digitais.',
      source: 'Radar Musical AMP',
      link: 'https://amplificadora.com.br',
      cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1080&q=85',
      date: 'Hoje • Ao Vivo',
      instagramTag: '#MUSICA #Amplificadora'
    },
    {
      id: 'fb-tec-1',
      category: 'Tecnologia',
      title: 'IA Generativa e Cibersegurança: como proteger operações críticas 24/7 na era da automação',
      summary: 'Empresas aceleram a adoção de monitoramento inteligente e defesa proativa para blindar dados corporativos e infraestrutura em nuvem.',
      source: 'AMP Tech & IA',
      link: 'https://amp.ia.br',
      cover: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1080&q=85',
      date: 'Hoje • Ao Vivo',
      instagramTag: '#TECNOLOGIA #Amplificadora'
    },
    {
      id: 'fb-mod-1',
      category: 'Moda',
      title: 'Cultura T-Shirt & Streetwear Minimalista: quando a música vira identidade no visual urbano',
      summary: 'Estampas autorais inspiradas na estética sonora e tecidos sustentáveis de algodão premium dominam as coleções contemporâneas.',
      source: 'AMP Ink Style',
      link: 'https://reserva.ink/amp',
      cover: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1080&q=85',
      date: 'Hoje • Ao Vivo',
      instagramTag: '#MODA #Amplificadora'
    },
    {
      id: 'fb-mus-2',
      category: 'Música',
      title: 'Grandes turnês mundiais e festivais apostam em experiências imersivas de som e luz',
      summary: 'Produções de palco combinam engenharia acústica de ponta e curadoria que une lendas consagradas à nova cena eletrônica.',
      source: 'Editorial Música',
      link: 'https://amplificadora.com.br',
      cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1080&q=85',
      date: 'Hoje • Ao Vivo',
      instagramTag: '#MUSICA #Amplificadora'
    },
    {
      id: 'fb-tec-2',
      category: 'Tecnologia',
      title: 'Gestão orientada por dados em tempo real transforma a tomada de decisão financeira',
      summary: 'Dashboards preditivos e integração contínua de indicadores permitem controle absoluto de fluxo de caixa e performance empresarial.',
      source: 'Inovação Digital',
      link: 'https://amp.ia.br',
      cover: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1080&q=85',
      date: 'Hoje • Ao Vivo',
      instagramTag: '#TECNOLOGIA #Amplificadora'
    },
    {
      id: 'fb-mod-2',
      category: 'Moda',
      title: 'Do estúdio para as ruas: o retorno do visual retrô-futurista nas capitais da moda',
      summary: 'Cortes versáteis, paleta escura com toques neon e referências aos clubes de música definem o lifestyle da temporada.',
      source: 'Lifestyle & Design',
      link: 'https://reserva.ink/amp',
      cover: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1080&q=85',
      date: 'Hoje • Ao Vivo',
      instagramTag: '#MODA #Amplificadora'
    }
  ]
};

const CATEGORY_META = {
  'Música': {
    icon: Music,
    badgeBg: 'bg-pink-600/90 border-pink-400/50 text-white',
    pillText: 'text-pink-400',
    borderGlow: 'hover:border-pink-500/60',
    gradient: 'from-pink-600 to-purple-700',
    accentHex: '#EC4899',
    label: 'MÚSICA & CULTURA'
  },
  'Tecnologia': {
    icon: Cpu,
    badgeBg: 'bg-cyan-600/90 border-cyan-400/50 text-white',
    pillText: 'text-cyan-400',
    borderGlow: 'hover:border-cyan-500/60',
    gradient: 'from-cyan-600 to-blue-700',
    accentHex: '#06B6D4',
    label: 'TECNOLOGIA & IA'
  },
  'Moda': {
    icon: Shirt,
    badgeBg: 'bg-purple-600/90 border-purple-400/50 text-white',
    pillText: 'text-purple-400',
    borderGlow: 'hover:border-purple-500/60',
    gradient: 'from-purple-600 to-fuchsia-700',
    accentHex: '#A855F7',
    label: 'MODA & LIFESTYLE'
  }
};

export function AutoNewsInstagramSection() {
  const { showToast } = useRadio();
  const [newsData, setNewsData] = useState(DEFAULT_FALLBACK_NEWS);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Selected card for Instagram Share / Export Studio Modal
  const [studioItem, setStudioItem] = useState(null);
  const [instaFormat, setInstaFormat] = useState('feed'); // 'feed' (4:5) | 'story' (9:16)
  const [isExporting, setIsExporting] = useState(false);
  const [copiedCaption, setCopiedCaption] = useState(false);
  const exportCardRef = useRef(null);

  const fetchAutoNews = async (manual = false) => {
    if (manual) setIsRefreshing(true);
    try {
      const res = await fetch(`/api/news-feed.json?t=${Date.now()}`, { cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        if (json && Array.isArray(json.featuredSix) && json.featuredSix.length > 0) {
          setNewsData(json);
          if (manual && showToast) {
            showToast('Feed de Música, Tecnologia e Moda atualizado!', 'info');
          }
        }
      }
    } catch {
      // Keep fallback or previous state seamlessly
    } finally {
      if (manual) setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAutoNews(false);
    const interval = setInterval(() => fetchAutoNews(false), 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Compute the 6 cards to display in the 3x2 grid
  const displayedCards = (() => {
    if (activeCategory === 'Todos') {
      return (newsData.featuredSix || DEFAULT_FALLBACK_NEWS.featuredSix).slice(0, 6);
    }
    const catList = newsData.categories?.[activeCategory] || [];
    if (catList.length >= 6) return catList.slice(0, 6);
    const fallbackFiltered = DEFAULT_FALLBACK_NEWS.featuredSix.filter(i => i.category === activeCategory);
    return [...catList, ...fallbackFiltered].slice(0, 6);
  })();

  const generateCaption = (item) => {
    if (!item) return '';
    return `⚡ ${item.title}\n\n${item.summary}\n\n🎧 Ouça ao vivo: amplificadora.com.br\n"Ampliando sua onda musical"\n\n${item.instagramTag || '#Amplificadora'} #RadioAmplificadora #Musica #Tecnologia #Moda`;
  };

  const handleCopyCaption = async (item) => {
    try {
      await navigator.clipboard.writeText(generateCaption(item));
      setCopiedCaption(true);
      if (showToast) showToast('Legenda Instagram copiada para a área de transferência!');
      setTimeout(() => setCopiedCaption(false), 2500);
    } catch {}
  };

  const handleExportImage = async (mode = 'download') => {
    if (!exportCardRef.current || !studioItem) return;
    setIsExporting(true);
    try {
      const canvas = await html2canvas(exportCardRef.current, {
        scale: 2.5,
        useCORS: true,
        allowTaint: false,
        backgroundColor: '#07060B'
      });

      const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png', 1.0));
      if (!blob) throw new Error('Falha ao gerar imagem');

      const fileName = `amplificadora-${studioItem.category.toLowerCase()}-${instaFormat}.png`;
      const file = new File([blob], fileName, { type: 'image/png' });

      if (mode === 'share' && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: studioItem.title,
          text: generateCaption(studioItem),
          files: [file]
        });
        if (showToast) showToast('Card enviado para compartilhamento!');
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        if (showToast) showToast('Arte Instagram baixada em Alta Definição (PNG)!');
      }
    } catch (e) {
      console.error(e);
      if (showToast) showToast('Arte gerada! Se estiver no computador, use o botão Baixar PNG.', 'info');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <section id="radar-amp" className="py-16 sm:py-20 bg-[#08070E] text-white relative border-t border-white/10 overflow-hidden">
      {/* Subtle Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header & Category Filter Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-500/15 text-pink-400 text-xs font-bold uppercase tracking-widest mb-3 border border-pink-500/30">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>Radar Automático • Cards Instagramáveis</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Música, Tecnologia & Moda em Tempo Real
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1.5 max-w-2xl">
              Curadoria automática 24h sintonizada com o universo Amplificadora. Clique em <strong className="text-pink-300">Card Instagram</strong> em qualquer notícia para baixar ou compartilhar no Feed e Stories.
            </p>
          </div>

          {/* Category Filter Pills + Refresh */}
          <div className="flex items-center flex-wrap gap-2">
            {['Todos', 'Música', 'Tecnologia', 'Moda'].map((cat) => {
              const isActive = activeCategory === cat;
              const meta = CATEGORY_META[cat];
              const IconComp = meta ? meta.icon : Sparkles;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer border ${
                    isActive
                      ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white border-pink-400/50 shadow-lg shadow-pink-600/30 scale-105'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5" />
                  <span>{cat}</span>
                </button>
              );
            })}

            <button
              onClick={() => fetchAutoNews(true)}
              className="p-2 rounded-full bg-white/5 hover:bg-pink-600/30 text-slate-300 hover:text-white border border-white/10 transition-all cursor-pointer"
              title="Atualizar notícias agora"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-pink-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* 3 Columns x 2 Rows = 6 Instagrammable Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {displayedCards.map((item) => {
            const meta = CATEGORY_META[item.category] || CATEGORY_META['Música'];
            const CatIcon = meta.icon;

            return (
              <article
                key={item.id}
                className={`group relative rounded-[28px] overflow-hidden bg-[#110F1D] border border-white/10 ${meta.borderGlow} shadow-[0_12px_35px_rgba(0,0,0,0.6)] transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between`}
              >
                {/* Instagram Visual Frame (4:5 Portrait Poster Ratio) */}
                <div
                  onClick={() => setStudioItem(item)}
                  className="relative aspect-[4/4.3] w-full overflow-hidden bg-[#07060B] cursor-pointer select-none"
                >
                  {/* Cover Image */}
                  <img
                    src={item.cover}
                    alt={item.title}
                    crossOrigin="anonymous"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1080&q=85';
                    }}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-90 contrast-110"
                  />

                  {/* Multi-layer Editorial Dark Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07060B] via-[#07060B]/65 to-black/30"></div>

                  {/* Top Branding & Category Header inside the Visual Card */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 z-10">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest border backdrop-blur-md shadow-lg ${meta.badgeBg}`}>
                      <CatIcon className="w-3 h-3" />
                      <span>{meta.label}</span>
                    </span>

                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 border border-white/15 backdrop-blur-md text-[10px] font-bold tracking-widest text-white uppercase">
                      <img src="/logo-amplificadora.png" alt="AMP" className="w-3.5 h-3.5 object-contain" />
                      <span>AMP</span>
                    </div>
                  </div>

                  {/* Bottom Overlay Content Inside the Poster */}
                  <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 flex flex-col justify-end z-10">
                    <div className="flex items-center gap-2 text-[11px] font-semibold text-pink-300/90 mb-2">
                      <span>{item.source || 'Radar Amplificadora'}</span>
                      <span>•</span>
                      <span className="text-slate-300 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.date || 'Hoje'}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-extrabold text-white leading-snug tracking-tight group-hover:text-pink-200 transition-colors line-clamp-3 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-300/90 mt-2 line-clamp-2 leading-relaxed font-normal">
                      {item.summary}
                    </p>

                    {/* Subtle Instagram Watermark Bar inside poster */}
                    <div className="mt-3.5 pt-2.5 border-t border-white/15 flex items-center justify-between text-[10px] text-slate-300 font-mono">
                      <span>@amplificadoraradio</span>
                      <span className="text-pink-400 font-bold">amplificadora.com.br</span>
                    </div>
                  </div>
                </div>

                {/* Action Bar Below Poster */}
                <div className="p-3.5 sm:px-5 bg-[#120F1D] border-t border-white/10 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setStudioItem(item)}
                    className="flex-1 py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-pink-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                    <span>Card Instagram</span>
                  </button>

                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="py-2.5 px-3.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-slate-200 hover:text-white text-xs font-semibold transition-all flex items-center gap-1.5"
                      title="Abrir fonte da notícia"
                    >
                      <span>Fonte</span>
                      <ExternalLink className="w-3.5 h-3.5 text-pink-400" />
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>

      </div>

      {/* Modal: Estúdio Instagramável (Feed 4:5 & Story 9:16 Generator) */}
      {studioItem && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="relative w-full max-w-4xl rounded-3xl bg-[#110E1C] border border-pink-500/40 shadow-[0_0_60px_rgba(236,72,153,0.3)] p-5 sm:p-8 my-8">
            
            {/* Close button */}
            <button
              onClick={() => setStudioItem(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-pink-600 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left: Live Renderable Instagram Canvas */}
              <div className="lg:col-span-7 flex flex-col items-center">
                <div
                  ref={exportCardRef}
                  style={{
                    width: instaFormat === 'story' ? '320px' : '360px',
                    height: instaFormat === 'story' ? '568px' : '450px'
                  }}
                  className="relative rounded-2xl overflow-hidden bg-[#07060B] border border-white/20 shadow-2xl flex flex-col justify-between select-none"
                >
                  {/* Full-bleed Photo */}
                  <img
                    src={studioItem.cover}
                    alt={studioItem.title}
                    crossOrigin="anonymous"
                    className="absolute inset-0 w-full h-full object-cover object-center filter brightness-90 contrast-110"
                  />

                  {/* Deep Editorial Gradient Overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(180deg, rgba(7,6,11,0.55) 0%, rgba(7,6,11,0.35) 35%, rgba(7,6,11,0.92) 78%, rgba(7,6,11,0.99) 100%)'
                    }}
                  ></div>

                  {/* Top Brand Header inside Exportable Image */}
                  <div className="relative z-10 p-5 flex items-center justify-between">
                    <span
                      className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-white shadow"
                      style={{
                        backgroundColor: CATEGORY_META[studioItem.category]?.accentHex || '#EC4899'
                      }}
                    >
                      {CATEGORY_META[studioItem.category]?.label || 'RADAR AMP'}
                    </span>

                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 border border-white/20">
                      <img src="/logo-amplificadora.png" alt="Amplificadora" className="w-4 h-4 object-contain" />
                      <span className="text-[10px] font-black tracking-[0.16em] text-white uppercase">
                        AMPLIFICADORA
                      </span>
                    </div>
                  </div>

                  {/* Bottom News Headline & Signature inside Exportable Image */}
                  <div className="relative z-10 p-6 space-y-3">
                    <div className="inline-block px-2.5 py-0.5 rounded bg-white/10 text-pink-300 text-[10px] font-bold uppercase tracking-wider">
                      {studioItem.source || 'Curadoria Oficial'}
                    </div>

                    <h3 className={`${instaFormat === 'story' ? 'text-xl' : 'text-lg'} font-extrabold text-white leading-snug tracking-tight`}>
                      {studioItem.title}
                    </h3>

                    <p className="text-xs text-slate-200 leading-relaxed line-clamp-3">
                      {studioItem.summary}
                    </p>

                    <div className="pt-3 border-t border-white/20 flex items-center justify-between text-[10px]">
                      <div>
                        <p className="font-black text-white tracking-wider uppercase">RÁDIO AMPLIFICADORA</p>
                        <p className="text-pink-400 font-medium">"Ampliando sua onda musical"</p>
                      </div>
                      <span className="px-2.5 py-1 rounded-lg bg-pink-600 text-white font-bold tracking-wider">
                        amplificadora.com.br
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Controls, Format Switcher & Caption Copy */}
              <div className="lg:col-span-5 space-y-5">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-pink-400">
                    Estúdio Social Media AMP
                  </span>
                  <h4 className="text-2xl font-extrabold text-white mt-1">
                    Pronto para o Instagram
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Escolha o formato desejado, baixe a arte em alta definição ou compartilhe direto com a legenda pronta.
                  </p>
                </div>

                {/* Format Selector: Feed vs Story */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setInstaFormat('feed')}
                    className={`py-3 px-4 rounded-2xl border text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      instaFormat === 'feed'
                        ? 'bg-pink-600/25 border-pink-500 text-white shadow-lg shadow-pink-600/20'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    🖼️ Feed (4:5)
                  </button>
                  <button
                    type="button"
                    onClick={() => setInstaFormat('story')}
                    className={`py-3 px-4 rounded-2xl border text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      instaFormat === 'story'
                        ? 'bg-pink-600/25 border-pink-500 text-white shadow-lg shadow-pink-600/20'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    📱 Stories / Reels (9:16)
                  </button>
                </div>

                {/* Ready-to-use Instagram Caption */}
                <div className="p-3.5 rounded-2xl bg-black/60 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                      Legenda Sugerida para o Post:
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyCaption(studioItem)}
                      className="text-xs font-bold text-pink-400 hover:text-pink-300 flex items-center gap-1 cursor-pointer"
                    >
                      {copiedCaption ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : null}
                      <span>{copiedCaption ? 'Copiada!' : 'Copiar Legenda'}</span>
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-400 whitespace-pre-line line-clamp-4 font-mono">
                    {generateCaption(studioItem)}
                  </p>
                </div>

                {/* Export / Share Buttons */}
                <div className="space-y-2.5 pt-1">
                  <button
                    type="button"
                    disabled={isExporting}
                    onClick={() => handleExportImage('download')}
                    className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-xs uppercase tracking-widest shadow-xl shadow-pink-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>{isExporting ? 'Gerando Arte HD...' : 'Baixar Card em PNG (Alta Definição)'}</span>
                  </button>

                  <button
                    type="button"
                    disabled={isExporting}
                    onClick={() => handleExportImage('share')}
                    className="w-full py-3 px-5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Share2 className="w-4 h-4 text-pink-400" />
                    <span>Compartilhar Direto (Celular / Apps)</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
}
