import React, { useState } from 'react';
import { INSTITUTION_DATA } from '../data/apaeData';
import { useApae } from '../context/ApaeContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { 
  Building2, 
  History, 
  Heart, 
  Target, 
  Eye, 
  Users, 
  Award, 
  Sparkles, 
  Stethoscope, 
  CheckCircle2, 
  Calendar,
  Volume2,
  ArrowRight
} from 'lucide-react';

export function InstitutionalSection() {
  const { setScheduleVisitModalOpen } = useApae();
  const { speakText } = useAccessibility();
  const [activeTab, setActiveTab] = useState('historia');
  const [staffFilter, setStaffFilter] = useState('todos');

  const staffCategories = [
    { id: 'todos', label: 'Todos os Especialistas' },
    { id: 'Fisioterapia', label: 'Fisioterapia' },
    { id: 'Terapia Ocupacional', label: 'Terapia Ocupacional' },
    { id: 'Fonoaudiologia', label: 'Fonoaudiologia' },
    { id: 'Psicologia', label: 'Psicologia' },
    { id: 'Educação Especial', label: 'Educação Especial' },
    { id: 'Serviço Social', label: 'Serviço Social' },
  ];

  const filteredStaff = staffFilter === 'todos'
    ? INSTITUTION_DATA.staff
    : INSTITUTION_DATA.staff.filter(s => s.category === staffFilter);

  return (
    <section id="institucional" aria-label="Seção Institucional da APAE" className="py-20 bg-white border-b border-slate-150">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Cabeçalho da Seção com Tipografia Leve e Elegante */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-normal uppercase tracking-wider bg-blue-50/70 text-[#0072C6] border border-blue-200/60 mb-3">
            <Building2 className="w-3.5 h-3.5" />
            <span>Quem Somos & Nossa Trajetória</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-light text-slate-800 tracking-tight leading-snug">
            Cinco décadas dedicadas à{' '}
            <span className="font-normal text-slate-900 border-b-2 border-[#F5A623]/50 pb-0.5">
              inclusão, educação e dignidade
            </span>
          </h2>

          <p className="text-slate-500 font-normal text-sm sm:text-base mt-3 leading-relaxed max-w-2xl mx-auto">
            Fundada em 1976 pelo patrono <strong>Luiz Affonso Mendes ("Dudízio")</strong>, a APAE de Santa Cruz das Palmeiras une afeto, ciência e compromisso ético na formação de vidas independentes.
          </p>

          <button
            onClick={() => speakText("Seção institucional da APAE de Santa Cruz das Palmeiras. Fundada em 1976 por Luiz Affonso Mendes, Dudízio, mantenedora da Escola de Educação Especial Luiz Affonso Mendes com atendimento clínico 100% gratuito.")}
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-normal text-slate-500 hover:text-[#0072C6] transition-colors"
            title="Ouvir resumo institucional"
          >
            <Volume2 className="w-3.5 h-3.5 text-[#0072C6]" />
            <span>Ouvir resumo em voz alta</span>
          </button>
        </div>

        {/* Abas de Navegação Interna: Estilo Leve com Pílulas Suaves */}
        <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
          {[
            { id: 'historia', label: 'História & Missão', icon: History },
            { id: 'corpo-tecnico', label: 'Corpo Clínico & Pedagógico', icon: Stethoscope },
            { id: 'estrutura', label: 'Estrutura & Unidades', icon: Building2 },
            { id: 'diretoria', label: 'Diretoria & Governança', icon: Users },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#0072C6] text-white font-medium shadow-xs'
                    : 'bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200/80 font-normal'
                }`}
              >
                <Icon className="w-4 h-4 opacity-80" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Conteúdo Aba 1: História & Missão com Alternância de Cards Translúcidos e Contorno */}
        {activeTab === 'historia' && (
          <div className="space-y-14 animate-fade-in">
            
            {/* Bloco Fundador Dudízio com Corte Assimétrico */}
            <div className="rounded-[36px] bg-[#FAF8F5] border border-amber-200/50 p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-3">
                <span className="text-[11px] font-medium tracking-wider uppercase text-amber-800 bg-amber-100/70 px-2.5 py-0.5 rounded-full">
                  Memória & Gratidão
                </span>
                <h3 className="text-2xl sm:text-3xl font-light text-slate-800">
                  O Legado de <strong className="font-medium text-slate-900">{INSTITUTION_DATA.founder.name}</strong>
                </h3>
                <p className="text-slate-600 font-normal text-xs sm:text-sm leading-relaxed">
                  {INSTITUTION_DATA.founder.bio}
                </p>
                <div className="pt-2 flex items-center gap-4 text-xs font-normal text-slate-500">
                  <span>• Fundação: 31/08/1976</span>
                  <span>• Escola: 20/07/1982</span>
                  <span>• Sede Própria: 1986</span>
                </div>
              </div>

              <div className="lg:col-span-4">
                <div className="rounded-[32px] rounded-bl-[80px] overflow-hidden border-2 border-white shadow-md bg-white p-2">
                  <img
                    src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=600"
                    alt="Homenagem aos fundadores da APAE"
                    className="w-full h-56 object-cover rounded-[26px] rounded-bl-[74px]"
                  />
                  <div className="p-3 text-center">
                    <span className="text-xs font-medium text-slate-700">Patrono Luiz Affonso Mendes</span>
                    <p className="text-[10px] text-slate-400">Escola de Educação Especial</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Missão, Visão e Valores: Cards Translúcidos Leves */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Missão (Contorno sutil com fundo muito leve) */}
              <div className="bg-blue-50/20 border border-blue-200/60 rounded-3xl p-6 sm:p-7 relative overflow-hidden transition-all hover:bg-white hover:shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-blue-100/60 text-[#0072C6] flex items-center justify-center mb-4">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-medium text-slate-900 mb-2">Nossa Missão</h3>
                <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                  {INSTITUTION_DATA.mission}
                </p>
              </div>

              {/* Visão (Contorno sutil com fundo muito leve) */}
              <div className="bg-amber-50/20 border border-amber-200/60 rounded-3xl p-6 sm:p-7 relative overflow-hidden transition-all hover:bg-white hover:shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-amber-100/60 text-amber-700 flex items-center justify-center mb-4">
                  <Eye className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-medium text-slate-900 mb-2">Nossa Visão</h3>
                <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                  {INSTITUTION_DATA.vision}
                </p>
              </div>

              {/* Valores (Transparência com contorno) */}
              <div className="bg-emerald-50/20 border border-emerald-200/60 rounded-3xl p-6 sm:p-7 relative overflow-hidden transition-all hover:bg-white hover:shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-emerald-100/60 text-emerald-700 flex items-center justify-center mb-4">
                  <Heart className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-medium text-slate-900 mb-3">Nossos Princípios</h3>
                <ul className="space-y-2 text-xs text-slate-600 font-normal">
                  {INSTITUTION_DATA.values.map((val, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span><strong>{val.title}:</strong> {val.desc}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Linha do Tempo Cronológica com Design Aéreo */}
            <div className="bg-transparent border border-slate-200/80 rounded-3xl p-6 sm:p-10">
              <div className="text-center max-w-xl mx-auto mb-8">
                <h3 className="text-xl sm:text-2xl font-light text-slate-800">Linha do Tempo de Conquistas</h3>
                <p className="text-xs text-slate-500 font-normal mt-1">
                  Marcos dos 50 anos de dedicação em Santa Cruz das Palmeiras
                </p>
              </div>

              <div className="relative border-l border-blue-200 ml-4 sm:ml-28 space-y-8">
                {INSTITUTION_DATA.historyMilestones.map((item, idx) => (
                  <div key={idx} className="relative pl-6 sm:pl-8 group">
                    <div className="sm:absolute sm:-left-28 sm:top-0 text-left sm:text-right w-20 mb-1 sm:mb-0">
                      <span className="inline-block px-2 py-0.5 rounded-lg bg-blue-50 text-[#0072C6] border border-blue-200/60 text-[11px] font-medium">
                        {item.year}
                      </span>
                    </div>

                    <div className="absolute -left-1.5 top-2 w-3 h-3 rounded-full bg-white border-2 border-[#F5A623]" />

                    <div className="p-4 rounded-2xl bg-slate-50/50 hover:bg-white border border-slate-200/60 hover:border-blue-200 transition-all shadow-2xs">
                      <h4 className="text-sm font-medium text-slate-900">{item.title}</h4>
                      <p className="text-xs text-slate-500 font-normal mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Conteúdo Aba 2: Corpo Clínico com Cards Finos e Leves */}
        {activeTab === 'corpo-tecnico' && (
          <div className="space-y-8 animate-fade-in">
            {/* Filtros em Pílulas Finas */}
            <div className="flex items-center justify-center gap-1.5 flex-wrap">
              {staffCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setStaffFilter(cat.id)}
                  className={`px-3 py-1.5 rounded-full text-xs transition-all ${
                    staffFilter === cat.id
                      ? 'bg-slate-800 text-white font-medium'
                      : 'bg-transparent text-slate-600 hover:bg-slate-100 border border-slate-200/80 font-normal'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Grid com Cards Leves e Cortes Asimétricos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStaff.map((member) => (
                <div 
                  key={member.id}
                  className="bg-transparent hover:bg-white border border-slate-200/80 hover:border-slate-300 rounded-[30px] rounded-tr-[50px] overflow-hidden transition-all duration-300 flex flex-col justify-between group shadow-2xs hover:shadow-md"
                >
                  <div>
                    <div className="h-56 overflow-hidden relative bg-slate-100">
                      <img
                        src={member.image}
                        alt={`Profissional ${member.name}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-normal tracking-wide bg-white/90 backdrop-blur-md text-slate-700 shadow-xs border border-white/80">
                          {member.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 space-y-1.5">
                      <h4 className="text-base font-medium text-slate-900 group-hover:text-[#0072C6] transition-colors">
                        {member.name}
                      </h4>
                      <p className="text-xs font-normal text-[#0072C6]">{member.role}</p>
                      <p className="text-[11px] font-mono text-slate-400">{member.registry}</p>
                      <p className="text-xs text-slate-500 font-normal leading-relaxed pt-1">
                        <strong>Atuação:</strong> {member.specialty}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 mt-auto">
                    <div className="p-3 rounded-2xl bg-slate-50/80 border border-slate-150 text-[11px] italic text-slate-500">
                      "{member.quote}"
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Conteúdo Aba 3: Estrutura & Instalações com Imagens Asimétricas */}
        {activeTab === 'estrutura' && (
          <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {INSTITUTION_DATA.facilities.map((fac, idx) => (
                <div 
                  key={idx} 
                  className="bg-transparent hover:bg-white border border-slate-200/80 rounded-[32px] overflow-hidden transition-all group flex flex-col sm:flex-row items-center gap-4 p-3 shadow-2xs hover:shadow-sm"
                >
                  <div className="w-full sm:w-48 h-44 overflow-hidden rounded-[24px] rounded-tl-[40px] flex-shrink-0 relative">
                    <img
                      src={fac.image}
                      alt={fac.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-normal uppercase bg-white/90 text-slate-800 backdrop-blur-xs">
                        {fac.tag}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 space-y-1.5">
                    <h4 className="text-base font-medium text-slate-900">{fac.title}</h4>
                    <p className="text-xs text-slate-500 font-normal leading-relaxed">{fac.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Leve para Agendamento */}
            <div className="bg-[#FAF8F5] border border-amber-200/60 rounded-[32px] p-8 text-center max-w-2xl mx-auto space-y-3">
              <h3 className="text-xl font-light text-slate-800">
                Gostaria de Conhecer Nossas Instalações?
              </h3>
              <p className="text-xs text-slate-500 font-normal max-w-md mx-auto">
                Recebemos visitas monitoradas de escolas, parceiros e famílias na sede do Jardim São Carlos.
              </p>
              <button
                onClick={() => setScheduleVisitModalOpen(true)}
                className="px-5 py-2.5 rounded-full bg-[#F5A623] hover:bg-[#E59715] text-slate-900 font-medium text-xs transition-all shadow-xs inline-flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>SOLICITAR AGENDAMENTO DE VISITA</span>
              </button>
            </div>
          </div>
        )}

        {/* Conteúdo Aba 4: Diretoria com Cards em Contorno */}
        {activeTab === 'diretoria' && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {INSTITUTION_DATA.board.map((member, idx) => (
                <div 
                  key={idx} 
                  className="bg-transparent hover:bg-white border border-slate-200/80 rounded-3xl p-6 transition-all space-y-2 shadow-2xs hover:shadow-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0072C6] border border-blue-200/60 flex items-center justify-center font-medium text-xs">
                      {member.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-slate-900">{member.name}</h4>
                      <p className="text-[11px] font-normal text-[#0072C6]">{member.role}</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 font-normal leading-relaxed pt-2 border-t border-slate-100">
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center text-[11px] text-slate-400 pt-2 font-normal">
              Diretoria Executiva e Conselho Fiscal com atuação 100% voluntária, sem qualquer remuneração nos termos da Lei 9.608/98.
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
