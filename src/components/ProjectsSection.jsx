import React, { useState } from 'react';
import { PROJECTS_DATA } from '../data/apaeData';
import { useApae } from '../context/ApaeContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { 
  HeartHandshake, 
  Stethoscope, 
  GraduationCap, 
  Briefcase, 
  ArrowRight, 
  Users, 
  TrendingUp, 
  Sparkles,
  Heart,
  Volume2,
  BookOpen
} from 'lucide-react';

export function ProjectsSection() {
  const { setSelectedProject, openDonationModal } = useApae();
  const { speakText } = useAccessibility();
  const [filterArea, setFilterArea] = useState('todos');

  const filterTabs = [
    { id: 'todos', label: 'Todos os Projetos', icon: Sparkles },
    { id: 'Educação Especial', label: 'Educação Especial (AEE)', icon: GraduationCap },
    { id: 'Saúde Especializada', label: 'Saúde & Reabilitação (SUS)', icon: Stethoscope },
    { id: 'Assistência Social & SUAS', label: 'Assistência & Famílias', icon: Briefcase },
  ];

  const filteredProjects = filterArea === 'todos'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter(p => p.category === filterArea);

  return (
    <section id="projetos" aria-label="Projetos da APAE" className="py-20 bg-[#FDFBF7] border-b border-slate-150">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-normal uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200/60 mb-3">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Nossos Programas & Atuação</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-light text-slate-800 tracking-tight leading-snug">
            Projetos contínuos de{' '}
            <span className="font-normal text-slate-900 border-b-2 border-emerald-400/60 pb-0.5">
              saúde, educação e cidadania
            </span>
          </h2>

          <p className="text-slate-500 font-normal text-sm sm:text-base mt-3 leading-relaxed max-w-2xl mx-auto">
            Atendimento 100% gratuito e humanizado na Escola de Educação Especial "Luiz Affonso Mendes" e no Centro de Reabilitação Multidisciplinar pelo SUS.
          </p>

          <button
            onClick={() => speakText("Seção de projetos da APAE. Conheça nossos projetos de Estimulação Precoce, Educação Especial com tecnologia assistiva, Comunicação Aumentativa, Reabilitação e Apoio Psicossocial às famílias.")}
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-normal text-slate-500 hover:text-[#0072C6] transition-colors"
            title="Ouvir descrição dos projetos"
          >
            <Volume2 className="w-3.5 h-3.5 text-[#0072C6]" />
            <span>Ouvir projetos em voz alta</span>
          </button>
        </div>

        {/* Filtros de Categorias com Pílulas Sutis */}
        <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
          {filterTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setFilterArea(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-normal text-xs transition-all ${
                  filterArea === tab.id
                    ? 'bg-slate-800 text-white font-medium shadow-xs'
                    : 'bg-transparent text-slate-600 hover:bg-white border border-slate-200/80'
                }`}
              >
                <Icon className="w-3.5 h-3.5 opacity-80" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Grid de Projetos com Cards em Contorno e Cortes Assimétricos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              className={`rounded-[32px] rounded-tr-[60px] overflow-hidden transition-all duration-300 flex flex-col justify-between group shadow-2xs hover:shadow-md ${
                idx % 2 === 0
                  ? 'bg-transparent hover:bg-white border border-slate-200/80'
                  : 'bg-white/80 hover:bg-white border border-slate-200/60'
              }`}
            >
              <div className="p-6 sm:p-7 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-normal uppercase tracking-wider bg-blue-50 text-[#0072C6] border border-blue-200/60">
                    {project.category}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {project.stats}
                  </span>
                </div>

                <h3 className="text-lg font-medium text-slate-900 group-hover:text-[#0072C6] transition-colors leading-snug">
                  {project.title}
                </h3>

                <p className="text-xs text-slate-500 font-normal leading-relaxed">
                  {project.desc}
                </p>

                {/* Destaques do Projeto com Ícones Leves */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400 block mb-1">
                    Atividades Integradas
                  </span>
                  {project.highlights?.map((h, i) => (
                    <div key={i} className="text-[11px] text-slate-600 font-normal flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] mt-1.5 flex-shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="p-6 pt-0 space-y-2">
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="w-full py-2 px-3 rounded-full border border-slate-200/80 hover:bg-slate-50 text-slate-600 font-normal text-xs transition-colors flex items-center justify-center gap-1"
                  >
                    <span>Detalhes</span>
                    <ArrowRight className="w-3 h-3 text-slate-400" />
                  </button>

                  <button
                    onClick={() => openDonationModal(60, 'recorrente', project.title)}
                    className="w-full py-2 px-3 rounded-full bg-[#0072C6] hover:bg-blue-700 text-white font-medium text-xs transition-colors flex items-center justify-center gap-1 shadow-xs"
                  >
                    <Heart className="w-3 h-3 fill-current" />
                    <span>Apoiar</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
