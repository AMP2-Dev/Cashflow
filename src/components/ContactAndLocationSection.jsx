import React, { useState } from 'react';
import { INSTITUTION_DATA } from '../data/apaeData';
import { useApae } from '../context/ApaeContext';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageSquare, 
  Send
} from 'lucide-react';

export function ContactAndLocationSection() {
  const { showToast } = useApae();
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('acolhimento');
  const [contactMsg, setContactMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast("Mensagem enviada com sucesso! Nossa equipe entrará em contato em até 24 horas úteis.");
    setContactName('');
    setContactEmail('');
    setContactMsg('');
  };

  const handleOpenWhatsApp = () => {
    const text = encodeURIComponent("Olá! Gostaria de obter informações sobre o atendimento e projetos da APAE de Santa Cruz das Palmeiras.");
    window.open(`https://wa.me/551936721576?text=${text}`, '_blank');
  };

  return (
    <section id="contato" aria-label="Informações de Contato e Localização da APAE" className="py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Informações Institucionais & Localização */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-normal uppercase tracking-wider text-[#0072C6] bg-blue-50/70 px-3 py-1 rounded-full border border-blue-200/60">
                Fale Conosco & Venha nos Conhecer
              </span>
              <h2 className="text-3xl font-light text-slate-800 tracking-tight mt-3">
                Canais de atendimento e{' '}
                <span className="font-normal text-slate-900 border-b-2 border-[#0072C6]/50 pb-0.5">
                  localização
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-normal mt-2 leading-relaxed">
                Estamos de portas abertas na sede própria no Jardim São Carlos para receber famílias, acolher novos assistidos e orientar a comunidade.
              </p>
            </div>

            {/* Cards em Contorno Leve (Alternância) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="bg-transparent border border-slate-200/80 p-4 rounded-2xl space-y-1 hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center gap-1.5 text-[#0072C6] font-medium text-xs">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Endereço Principal</span>
                </div>
                <p className="text-xs text-slate-800 font-medium">{INSTITUTION_DATA.address}</p>
                <p className="text-[11px] text-slate-400 font-normal">{INSTITUTION_DATA.neighborhood}, {INSTITUTION_DATA.city} • CEP: {INSTITUTION_DATA.zipCode}</p>
              </div>

              <div className="bg-transparent border border-slate-200/80 p-4 rounded-2xl space-y-1 hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center gap-1.5 text-[#0072C6] font-medium text-xs">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Horário de Funcionamento</span>
                </div>
                <p className="text-xs text-slate-800 font-medium">{INSTITUTION_DATA.openingHours}</p>
                <p className="text-[11px] text-slate-400 font-normal">Escola Especial & Clínica SUS</p>
              </div>

              <div className="bg-transparent border border-slate-200/80 p-4 rounded-2xl space-y-1 hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center gap-1.5 text-[#0072C6] font-medium text-xs">
                  <Phone className="w-3.5 h-3.5" />
                  <span>Telefone Central</span>
                </div>
                <p className="text-xs text-slate-800 font-medium">{INSTITUTION_DATA.phone}</p>
                <p className="text-[11px] text-slate-400 font-normal">Secretaria e triagem</p>
              </div>

              <div className="bg-transparent border border-slate-200/80 p-4 rounded-2xl space-y-1 hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center gap-1.5 text-[#0072C6] font-medium text-xs">
                  <Mail className="w-3.5 h-3.5" />
                  <span>E-mail Institucional</span>
                </div>
                <p className="text-xs text-slate-800 font-medium truncate">{INSTITUTION_DATA.email}</p>
                <p className="text-[11px] text-slate-400 font-normal truncate">{INSTITUTION_DATA.secondaryEmail}</p>
              </div>
            </div>

            {/* Chamada Rápida WhatsApp */}
            <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/40 border border-emerald-200/60 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="space-y-0.5 text-center sm:text-left">
                <h4 className="text-xs sm:text-sm font-medium text-emerald-950">Atendimento Direto no WhatsApp</h4>
                <p className="text-xs text-emerald-800/80 font-normal">Tire dúvidas sobre acolhimento clínico e matrículas com nossa equipe.</p>
              </div>

              <button
                onClick={handleOpenWhatsApp}
                className="px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs transition-all shadow-2xs flex items-center gap-1.5 flex-shrink-0"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Conversar no WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Formulário de Contato com Design Translúcido */}
          <div className="lg:col-span-6 bg-[#FAF8F5] border border-slate-200/80 rounded-[36px] p-6 sm:p-8 space-y-4 shadow-2xs">
            <h3 className="text-lg font-medium text-slate-900">Envie uma Mensagem para a APAE</h3>
            <p className="text-xs text-slate-500 font-normal">
              Informações sobre matrículas, acolhimento clínico, voluntariado ou sugestões.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="text-xs font-normal text-slate-600 block mb-1">Seu Nome Completo *</label>
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="Nome e Sobrenome"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 outline-none focus:ring-1 focus:ring-[#0072C6] font-normal"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-normal text-slate-600 block mb-1">Seu E-mail *</label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="seuemail@exemplo.com"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 outline-none focus:ring-1 focus:ring-[#0072C6] font-normal"
                  />
                </div>

                <div>
                  <label className="text-xs font-normal text-slate-600 block mb-1">Assunto</label>
                  <select
                    value={contactSubject}
                    onChange={(e) => setContactSubject(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 outline-none focus:ring-1 focus:ring-[#0072C6] font-normal"
                  >
                    <option value="acolhimento">Acolhimento & Triagem</option>
                    <option value="educacao">Escola de Educação Especial</option>
                    <option value="doacoes">Recibos de Doação / Nota Fiscal Paulista</option>
                    <option value="ouvidoria">Ouvidoria Geral</option>
                    <option value="outro">Outro Assunto</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-normal text-slate-600 block mb-1">Sua Mensagem *</label>
                <textarea
                  rows={4}
                  required
                  value={contactMsg}
                  onChange={(e) => setContactMsg(e.target.value)}
                  placeholder="Escreva sua dúvida ou mensagem para nossa coordenação..."
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 outline-none focus:ring-1 focus:ring-[#0072C6] font-normal"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-full bg-[#0072C6] hover:bg-blue-700 text-white font-medium text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Enviar Mensagem</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
