import React, { useState, useEffect } from 'react';
import { useApae } from '../context/ApaeContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { 
  Newspaper, 
  Calendar, 
  Clock, 
  MapPin, 
  ArrowRight, 
  Search, 
  Sparkles, 
  Ticket, 
  Volume2
} from 'lucide-react';

export function NewsAndEventsSection() {
  const { newsList, eventsList, setSelectedNews, setSelectedEvent } = useApae();
  const { speakText } = useAccessibility();
  const [searchTerm, setSearchTerm] = useState('');
  const [newsCategory, setNewsCategory] = useState('todas');
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Contagem regressiva
  useEffect(() => {
    const targetDate = new Date('2026-09-21T08:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const filteredNews = newsList.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          n.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = newsCategory === 'todas' || n.category.toLowerCase().includes(newsCategory.toLowerCase());
    return matchesSearch && matchesCat;
  });

  return (
    <section id="noticias-eventos" aria-label="Mural de Notícias e Eventos da APAE" className="py-20 bg-white border-b border-slate-150">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Header com Tipografia Leve */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-normal uppercase tracking-wider bg-amber-50 text-amber-900 border border-amber-200/60 mb-3">
            <Newspaper className="w-3.5 h-3.5 text-amber-600" />
            <span>Comunicação & Vida Institucional</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-light text-slate-800 tracking-tight leading-snug">
            Mural de{' '}
            <span className="font-normal text-slate-900 border-b-2 border-[#F5A623]/50 pb-0.5">
              notícias e acontecimentos
            </span>
          </h2>

          <p className="text-slate-500 font-normal text-sm sm:text-base mt-3 leading-relaxed max-w-2xl mx-auto">
            Acompanhe comunicados oficiais, eventos beneficentes, atividades pedagógicas e o dia a dia da comunidade palmeirense.
          </p>
        </div>

        {/* Destaque do Evento em Card Claro, Luminoso e Aéreo (Estilo AACD) */}
        <div className="mb-14 bg-[#FAF8F5] border border-amber-200/60 rounded-[36px] p-6 sm:p-10 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-3.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-[#F5A623] text-slate-950">
                  Destaque do Calendário 2026
                </span>
                <span className="text-xs text-slate-500 font-normal flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-600" />
                  21 a 28 de Setembro de 2026
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-light leading-snug text-slate-800">
                Semana Nacional da Pessoa com{' '}
                <strong className="font-medium text-slate-900">Deficiência Intelectual e Múltipla</strong>
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                Ciclo de palestras, mostras artísticas produzidas pelos alunos, rodas de conversa comunitárias e caminhada de conscientização. Participação 100% gratuita.
              </p>

              <div className="flex items-center gap-4 text-xs text-slate-500 font-normal pt-1">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  Sede APAE — Rua Jovino Martins da Silva, 44
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  08:00 às 16:30
                </span>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setSelectedEvent(eventsList[0])}
                  className="px-5 py-2.5 rounded-full bg-[#0072C6] hover:bg-blue-700 text-white font-medium text-xs transition-all shadow-xs flex items-center gap-2"
                >
                  <Ticket className="w-4 h-4" />
                  <span>Ver Programação Completa</span>
                </button>
              </div>
            </div>

            {/* Caixa de Contagem Regressiva em Card Translúcido */}
            <div className="lg:col-span-5 bg-white/80 backdrop-blur-xs rounded-3xl p-6 border border-slate-200/80 text-center space-y-3">
              <div className="text-xs font-normal uppercase tracking-wider text-slate-500">
                Contagem regressiva para a abertura:
              </div>

              <div className="grid grid-cols-4 gap-2">
                {[
                  { val: timeLeft.days, label: "Dias" },
                  { val: timeLeft.hours, label: "Horas" },
                  { val: timeLeft.minutes, label: "Min" },
                  { val: timeLeft.seconds, label: "Seg" }
                ].map((t, idx) => (
                  <div key={idx} className="bg-slate-50 rounded-2xl p-2.5 border border-slate-200/60">
                    <div className="text-2xl font-light text-slate-800 font-mono">
                      {String(t.val).padStart(2, '0')}
                    </div>
                    <div className="text-[10px] font-normal text-slate-400 uppercase">{t.label}</div>
                  </div>
                ))}
              </div>

              <p className="text-[11px] text-slate-400 font-normal">
                Comemoração integrada ao Jubileu de Ouro de 50 anos da instituição.
              </p>
            </div>

          </div>
        </div>

        {/* Notícias e Eventos com Cards Finos e Alternados */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-150 pb-4">
            <h3 className="text-lg font-light text-slate-800 flex items-center gap-2">
              <Newspaper className="w-4 h-4 text-[#0072C6]" />
              <span>Notícias & Comunicados Oficiais</span>
            </h3>

            {/* Barra de Busca Redonda e Fina */}
            <div className="relative max-w-xs w-full">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar notícias..."
                className="w-full pl-9 pr-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0072C6] font-normal"
              />
            </div>
          </div>

          {/* Grid de Notícias */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredNews.map((news, idx) => (
              <article
                key={news.id}
                onClick={() => setSelectedNews(news)}
                className={`rounded-[30px] rounded-tr-[54px] overflow-hidden transition-all duration-300 flex flex-col justify-between group cursor-pointer shadow-2xs hover:shadow-md ${
                  idx % 2 === 0
                    ? 'bg-transparent hover:bg-white border border-slate-200/80'
                    : 'bg-white/80 hover:bg-white border border-slate-200/60'
                }`}
              >
                <div>
                  <div className="h-48 overflow-hidden relative bg-slate-100">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-normal tracking-wide bg-white/90 backdrop-blur-md text-slate-700 shadow-xs border border-white/80">
                        {news.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <span className="text-[11px] text-slate-400 font-normal">
                      {news.date} • {news.readTime}
                    </span>

                    <h4 className="text-sm font-medium text-slate-900 group-hover:text-[#0072C6] transition-colors leading-snug line-clamp-2">
                      {news.title}
                    </h4>

                    <p className="text-xs text-slate-500 font-normal leading-relaxed line-clamp-2">
                      {news.summary}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <span className="text-xs font-normal text-[#0072C6] group-hover:underline inline-flex items-center gap-1">
                    Ler matéria completa <ArrowRight className="w-3 h-3 text-[#0072C6]" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
