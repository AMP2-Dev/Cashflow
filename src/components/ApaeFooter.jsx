import React from 'react';
import { useApae } from '../context/ApaeContext';
import { 
  Heart, 
  ShieldCheck, 
  Award, 
  Phone, 
  Mail, 
  MapPin, 
  Lock, 
  ArrowUp,
  ExternalLink,
  Layers,
  Database,
  ShieldAlert
} from 'lucide-react';

export function ApaeFooter() {
  const { 
    scrollToSection, 
    openDonationModal, 
    setIsAdminOpen, 
    isAdminOpen,
    setComplianceModalOpen,
    setEsicModalOpen,
    setLgpdModalOpen,
    setDataDictionaryModalOpen,
    institution
  } = useApae();

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer aria-label="Rodapé Oficial APAE Santa Cruz das Palmeiras" className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Grade Superior de Certificações e Selos Oficiais */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-12 border-b border-slate-800">
          {institution.certifications.map((cert, idx) => (
            <div key={idx} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0072C6]/20 text-amber-400 flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-black text-white">{cert.title}</h4>
                <p className="text-[10px] text-slate-400 leading-tight line-clamp-1">{cert.subtitle}</p>
                <span className="inline-block text-[9px] font-bold text-emerald-400 mt-0.5">{cert.tag}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Links Principais do Rodapé */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12 border-b border-slate-800">
          
          {/* Coluna 1: Marca e Missão */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0072C6] flex items-center justify-center font-black text-white">
                <svg viewBox="0 0 100 100" className="w-6 h-6">
                  <ellipse cx="50" cy="35" rx="6" ry="12" fill="#F5A623" />
                  <ellipse cx="50" cy="65" rx="6" ry="12" fill="#F5A623" />
                  <ellipse cx="35" cy="50" rx="12" ry="6" fill="#F5A623" />
                  <ellipse cx="65" cy="50" rx="12" ry="6" fill="#F5A623" />
                  <circle cx="50" cy="50" r="5" fill="#FFFFFF" />
                </svg>
              </div>
              <div>
                <span className="text-base font-black text-white tracking-tight">{institution.shortName}</span>
                <p className="text-[11px] text-slate-400">{institution.schoolName}</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Entidade filantrópica sem fins lucrativos fundada em 31/08/1976 por Luiz Affonso Mendes ("Dudízio"). Reconhecida de Utilidade Pública Federal, Estadual e Municipal. 50 anos de dedicação ininterrupta à pessoa com deficiência em Santa Cruz das Palmeiras.
            </p>

            <div className="pt-2 text-xs text-slate-400 font-mono space-y-1">
              <div><strong>CNPJ:</strong> {institution.cnpj}</div>
              <div><strong>Endereço:</strong> {institution.address}, {institution.neighborhood}, {institution.city} — CEP {institution.zipCode}</div>
              <div><strong>Horário:</strong> {institution.openingHours}</div>
            </div>
          </div>

          {/* Coluna 2: Navegação Institucional */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">Institucional</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => scrollToSection('institucional')} className="hover:text-white transition-colors">
                  História & Patrono Dudízio
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('institucional')} className="hover:text-white transition-colors">
                  Escola "Luiz Affonso Mendes"
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('institucional')} className="hover:text-white transition-colors">
                  Diretoria & Conselhos
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('institucional')} className="hover:text-white transition-colors">
                  Corpo Clínico & AEE
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('noticias-eventos')} className="hover:text-white transition-colors">
                  Notícias e Eventos 2026
                </button>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Transparência & Compliance LAI */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">Transparência & LAI</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => scrollToSection('transparencia')} className="hover:text-white transition-colors">
                  Contas Públicas e Balanços
                </button>
              </li>
              <li>
                <button onClick={() => setComplianceModalOpen(true)} className="text-blue-400 hover:text-white font-bold transition-colors">
                  Checklist de Transparência
                </button>
              </li>
              <li>
                <button onClick={() => setDataDictionaryModalOpen(true)} className="hover:text-white transition-colors">
                  Dicionário de Dados Abertos
                </button>
              </li>
              <li>
                <button onClick={() => setEsicModalOpen(true)} className="hover:text-white transition-colors">
                  Serviço e-SIC (LAI 12.527)
                </button>
              </li>
              <li>
                <button onClick={() => setEsicModalOpen(true)} className="hover:text-rose-400 transition-colors">
                  Canal de Denúncias Sigiloso
                </button>
              </li>
              <li>
                <button onClick={() => setLgpdModalOpen(true)} className="hover:text-emerald-400 transition-colors">
                  LGPD & Privacidade
                </button>
              </li>
            </ul>
          </div>

          {/* Coluna 4: Contato & Gestor */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">Atendimento & Gestão</h4>
            <div className="space-y-1.5 text-xs text-slate-400">
              <p className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#0072C6]" />
                <span>{institution.phone}</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#0072C6]" />
                <span className="truncate">{institution.email}</span>
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => openDonationModal(60, 'recorrente')}
                className="w-full py-2 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span>Doar Agora (PIX)</span>
              </button>
            </div>

            <div className="pt-1">
              <button
                onClick={() => setIsAdminOpen(!isAdminOpen)}
                className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>{isAdminOpen ? 'Fechar Painel' : 'Painel do Gestor (CMS)'}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Rodapé Inferior */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 {institution.name}. 50 Anos de História e Inclusão (1976 - 2026).</p>

          <button
            onClick={handleScrollTop}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 transition-colors flex items-center gap-1 text-xs font-bold"
            title="Voltar ao topo da página"
          >
            <ArrowUp className="w-4 h-4" />
            <span>Voltar ao Topo</span>
          </button>
        </div>

      </div>
    </footer>
  );
}
