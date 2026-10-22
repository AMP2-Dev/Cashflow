import React, { useState } from 'react';
import { VOLUNTEER_AREAS, PARTNER_COMPANIES } from '../data/apaeData';
import { useApae } from '../context/ApaeContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { 
  Users, 
  Building2, 
  Heart, 
  CheckCircle2, 
  Send, 
  Handshake,
  Volume2
} from 'lucide-react';

export function VolunteerAndPartnershipSection() {
  const { registerVolunteer, registerPartner, showToast } = useApae();
  const { speakText } = useAccessibility();

  const [activeTab, setActiveTab] = useState('voluntariado');

  // Form Voluntário
  const [volName, setVolName] = useState('');
  const [volEmail, setVolEmail] = useState('');
  const [volPhone, setVolPhone] = useState('');
  const [volArea, setVolArea] = useState('recreacao');
  const [volAvailability, setVolAvailability] = useState('');
  const [volMotivation, setVolMotivation] = useState('');
  const [volTerms, setVolTerms] = useState(false);

  // Form Empresa
  const [empCompany, setEmpCompany] = useState('');
  const [empCnpj, setEmpCnpj] = useState('');
  const [empContact, setEmpContact] = useState('');
  const [empEmail, setEmpEmail] = useState('');
  const [empPhone, setEmpPhone] = useState('');
  const [empModality, setEmpModality] = useState('lei_cotas');
  const [empMessage, setEmpMessage] = useState('');

  const handleVolunteerSubmit = (e) => {
    e.preventDefault();
    if (!volTerms) {
      showToast("Por favor aceite o termo de adesão ao voluntariado (Lei 9.608/98).", "error");
      return;
    }

    registerVolunteer({
      name: volName,
      email: volEmail,
      phone: volPhone,
      area: volArea,
      availability: volAvailability,
      motivation: volMotivation
    });

    setVolName('');
    setVolEmail('');
    setVolPhone('');
    setVolAvailability('');
    setVolMotivation('');
    setVolTerms(false);
  };

  const handlePartnerSubmit = (e) => {
    e.preventDefault();
    registerPartner({
      company: empCompany,
      cnpj: empCnpj,
      contactName: empContact,
      email: empEmail,
      phone: empPhone,
      modality: empModality,
      message: empMessage
    });

    setEmpCompany('');
    setEmpCnpj('');
    setEmpContact('');
    setEmpEmail('');
    setEmpPhone('');
    setEmpMessage('');
  };

  return (
    <section id="participe" aria-label="Voluntariado e Parcerias da APAE" className="py-20 bg-[#FDFBF7] border-b border-slate-150">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Header com Tipografia Leve */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-normal uppercase tracking-wider bg-purple-50 text-purple-900 border border-purple-200/60 mb-3">
            <Handshake className="w-3.5 h-3.5 text-purple-600" />
            <span>Faça Parte Desta Causa</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-light text-slate-800 tracking-tight leading-snug">
            Voluntariado e{' '}
            <span className="font-normal text-slate-900 border-b-2 border-purple-300/60 pb-0.5">
              parcerias empresariais (ESG)
            </span>
          </h2>

          <p className="text-slate-500 font-normal text-sm sm:text-base mt-3 leading-relaxed max-w-2xl mx-auto">
            Doe seu carinho e habilidades como voluntário ou junte sua empresa à nossa missão através de programas corporativos, incentivos fiscais e cotas PcD.
          </p>
        </div>

        {/* Pílulas de Alternância */}
        <div className="flex items-center justify-center gap-2 mb-12">
          <button
            onClick={() => setActiveTab('voluntariado')}
            className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full font-medium text-xs sm:text-sm transition-all ${
              activeTab === 'voluntariado'
                ? 'bg-[#0072C6] text-white shadow-xs'
                : 'bg-transparent text-slate-600 hover:bg-white border border-slate-200/80 font-normal'
            }`}
          >
            <Users className="w-4 h-4 opacity-80" />
            <span>Quero Ser Voluntário</span>
          </button>

          <button
            onClick={() => setActiveTab('empresas')}
            className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full font-medium text-xs sm:text-sm transition-all ${
              activeTab === 'empresas'
                ? 'bg-slate-800 text-white shadow-xs'
                : 'bg-transparent text-slate-600 hover:bg-white border border-slate-200/80 font-normal'
            }`}
          >
            <Building2 className="w-4 h-4 opacity-80" />
            <span>Empresas Parceiras (ESG)</span>
          </button>
        </div>

        {/* Aba Voluntariado */}
        {activeTab === 'voluntariado' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
            
            {/* Benefícios e Áreas com Contorno Leve */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white/80 border border-slate-200/80 rounded-[32px] p-6 sm:p-7 space-y-3.5 shadow-2xs">
                <h3 className="text-lg font-medium text-slate-900">
                  Por que ser voluntário na APAE?
                </h3>
                <p className="text-xs text-slate-500 font-normal leading-relaxed">
                  Regido pela Lei Federal nº 9.608/98. Oferecemos acolhimento, orientação pedagógica e certificado oficial de horas sociais.
                </p>

                <div className="space-y-2.5 pt-1 text-xs text-slate-600 font-normal">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Ambiente familiar, seguro e com impacto humano direto.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Flexibilidade de horário: oficinas, eventos beneficentes ou rotina.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Certificado de horas complementares e responsabilidade cidadã.</span>
                  </div>
                </div>
              </div>

              {/* Áreas Disponíveis */}
              <div className="bg-transparent border border-slate-200/80 rounded-[32px] p-6 sm:p-7 space-y-3">
                <h4 className="text-xs font-medium text-slate-700 uppercase tracking-wider">
                  Áreas de Atuação Voluntária
                </h4>
                <div className="space-y-2">
                  {VOLUNTEER_AREAS.map((a) => (
                    <div key={a.id} className="p-2.5 rounded-xl bg-white/70 border border-slate-200/60 text-xs">
                      <strong className="text-slate-800 font-medium block">{a.label}</strong>
                      <span className="text-slate-500 font-normal text-[11px]">{a.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Formulário Leve */}
            <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-[36px] p-6 sm:p-8 shadow-xs space-y-4">
              <h3 className="text-lg font-medium text-slate-900">Formulário de Inscrição Solidária</h3>
              <p className="text-xs text-slate-500 font-normal">
                Preencha seus dados para agendarmos uma conversa e visita na sede de Santa Cruz das Palmeiras.
              </p>

              <form onSubmit={handleVolunteerSubmit} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-normal text-slate-600 block mb-1">Seu Nome Completo *</label>
                    <input
                      type="text"
                      required
                      value={volName}
                      onChange={(e) => setVolName(e.target.value)}
                      placeholder="Ex: Carlos Silva"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:ring-1 focus:ring-[#0072C6] outline-none font-normal"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-normal text-slate-600 block mb-1">E-mail *</label>
                    <input
                      type="email"
                      required
                      value={volEmail}
                      onChange={(e) => setVolEmail(e.target.value)}
                      placeholder="seuemail@exemplo.com"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:ring-1 focus:ring-[#0072C6] outline-none font-normal"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-normal text-slate-600 block mb-1">Telefone / WhatsApp *</label>
                    <input
                      type="text"
                      required
                      value={volPhone}
                      onChange={(e) => setVolPhone(e.target.value)}
                      placeholder="(19) 99999-9999"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:ring-1 focus:ring-[#0072C6] outline-none font-normal"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-normal text-slate-600 block mb-1">Área de Interesse *</label>
                    <select
                      value={volArea}
                      onChange={(e) => setVolArea(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:ring-1 focus:ring-[#0072C6] outline-none font-normal"
                    >
                      {VOLUNTEER_AREAS.map((a) => (
                        <option key={a.id} value={a.id}>{a.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-normal text-slate-600 block mb-1">Disponibilidade de Dias e Horários</label>
                  <input
                    type="text"
                    value={volAvailability}
                    onChange={(e) => setVolAvailability(e.target.value)}
                    placeholder="Ex: Sábados de manhã, ou terças à tarde..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:ring-1 focus:ring-[#0072C6] outline-none font-normal"
                  />
                </div>

                <div>
                  <label className="text-xs font-normal text-slate-600 block mb-1">O que te motiva a ser voluntário na APAE?</label>
                  <textarea
                    rows={3}
                    value={volMotivation}
                    onChange={(e) => setVolMotivation(e.target.value)}
                    placeholder="Conte um pouco sobre você e sua motivação..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:ring-1 focus:ring-[#0072C6] outline-none font-normal"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="chk-vol"
                    checked={volTerms}
                    onChange={(e) => setVolTerms(e.target.checked)}
                    className="rounded text-[#0072C6] focus:ring-[#0072C6]"
                  />
                  <label htmlFor="chk-vol" className="text-xs text-slate-500 font-normal cursor-pointer">
                    Concordo com os termos do voluntariado espontâneo e não remunerado (Lei nº 9.608/98).
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-full bg-[#0072C6] hover:bg-blue-700 text-white font-medium text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Enviar Inscrição de Voluntariado</span>
                </button>
              </form>
            </div>

          </div>
        )}

        {/* Aba Empresas Parceiras */}
        {activeTab === 'empresas' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white/80 border border-slate-200/80 rounded-[32px] p-6 space-y-3">
                <h3 className="text-lg font-medium text-slate-900">Parcerias Corporativas & ESG</h3>
                <p className="text-xs text-slate-500 font-normal leading-relaxed">
                  Associar sua empresa à APAE fortalece o pilar Social do seu relatório ESG, gera impacto real na comunidade e apoia o cumprimento da Lei de Cotas PcD (Lei 8.213/91).
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider block">
                  Empresas e Entidades que Já Apoiam
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {PARTNER_COMPANIES.map((c, i) => (
                    <div key={i} className="p-3 rounded-2xl bg-white border border-slate-200/60 text-xs">
                      <span className="text-base block mb-0.5">{c.logo}</span>
                      <strong className="text-slate-800 font-medium block truncate">{c.name}</strong>
                      <span className="text-[10px] text-slate-400 font-normal">{c.category}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-[36px] p-6 sm:p-8 space-y-4 shadow-xs">
              <h3 className="text-lg font-medium text-slate-900">Proposta de Parceria Empresarial</h3>
              <form onSubmit={handlePartnerSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-normal text-slate-600 block mb-1">Razão Social / Nome Fantasia *</label>
                    <input
                      type="text"
                      required
                      value={empCompany}
                      onChange={(e) => setEmpCompany(e.target.value)}
                      placeholder="Empresa Ltda"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-normal outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-normal text-slate-600 block mb-1">CNPJ da Empresa</label>
                    <input
                      type="text"
                      value={empCnpj}
                      onChange={(e) => setEmpCnpj(e.target.value)}
                      placeholder="00.000.000/0001-00"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-normal outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-normal text-slate-600 block mb-1">Pessoa de Contato *</label>
                    <input
                      type="text"
                      required
                      value={empContact}
                      onChange={(e) => setEmpContact(e.target.value)}
                      placeholder="Nome do representante de RH/ESG"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-normal outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-normal text-slate-600 block mb-1">E-mail Corporativo *</label>
                    <input
                      type="email"
                      required
                      value={empEmail}
                      onChange={(e) => setEmpEmail(e.target.value)}
                      placeholder="contato@empresa.com.br"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-normal outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-normal text-slate-600 block mb-1">Mensagem ou Modalidade de Parceria</label>
                  <textarea
                    rows={3}
                    value={empMessage}
                    onChange={(e) => setEmpMessage(e.target.value)}
                    placeholder="Conte-nos o interesse da sua empresa (Troco solidário, doação de insumos, cotas PcD)..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-normal outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-1.5"
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Cadastrar Proposta de Parceria ESG</span>
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
