import React, { useState } from 'react';
import { useApae } from '../context/ApaeContext';
import { X, Send, ShieldAlert, FileText, CheckCircle2, Clock, Search, Lock, UserCheck } from 'lucide-react';

export function EsicModal() {
  const { 
    esicModalOpen, 
    setEsicModalOpen, 
    createEsicRequest, 
    esicRequests,
    showToast 
  } = useApae();

  const [activeTab, setActiveTab] = useState('novo'); // 'novo' | 'consultar' | 'denuncia'
  const [applicant, setApplicant] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [details, setDetails] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  // Consulta de protocolo
  const [searchProtocol, setSearchProtocol] = useState('');
  const [consultResult, setConsultResult] = useState(null);

  if (!esicModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject.trim() || !details.trim()) {
      showToast("Por favor preencha o assunto e o detalhamento da solicitação.", "error");
      return;
    }
    if (!isAnonymous && !email.trim()) {
      showToast("Por favor informe seu e-mail para envio da resposta legal.", "error");
      return;
    }

    const proto = createEsicRequest({
      applicant: isAnonymous ? "Cidadão Anônimo (Sigilo Protegido)" : applicant,
      email: isAnonymous ? "sigiloso@apae-esic.org.br" : email,
      phone,
      subject: activeTab === 'denuncia' ? `[CANAL DE DENÚNCIAS] ${subject}` : subject,
      details
    });

    setApplicant('');
    setEmail('');
    setPhone('');
    setSubject('');
    setDetails('');
    setIsAnonymous(false);
  };

  const handleSearchProtocol = (e) => {
    e.preventDefault();
    const found = esicRequests.find(r => r.protocol.toLowerCase().trim() === searchProtocol.toLowerCase().trim());
    if (found) {
      setConsultResult(found);
    } else {
      setConsultResult('not_found');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden border border-slate-200 animate-slide-up"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-apae-blue-600 to-blue-700 text-white p-5 sm:p-6 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center font-black">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight">
                Serviço de Informação ao Cidadão (e-SIC) & Ouvidoria
              </h3>
              <p className="text-xs text-blue-100">
                Lei de Acesso à Informação (Lei 12.527/2011) — APAE de Santa Cruz das Palmeiras
              </p>
            </div>
          </div>

          <button
            onClick={() => setEsicModalOpen(false)}
            className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Abas */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 pt-3 flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => { setActiveTab('novo'); setConsultResult(null); }}
            className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all ${
              activeTab === 'novo'
                ? 'border-apae-blue-600 text-apae-blue-600 font-black'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Novo Pedido de Informação (e-SIC)
          </button>

          <button
            onClick={() => { setActiveTab('denuncia'); setConsultResult(null); }}
            className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all ${
              activeTab === 'denuncia'
                ? 'border-rose-600 text-rose-600 font-black'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Canal de Denúncias Sigiloso
          </button>

          <button
            onClick={() => { setActiveTab('consultar'); setConsultResult(null); }}
            className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all ${
              activeTab === 'consultar'
                ? 'border-apae-blue-600 text-apae-blue-600 font-black'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Consultar Protocolo
          </button>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {activeTab === 'novo' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-start gap-3">
                <Clock className="w-4 h-4 text-apae-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Prazo Legal da LAI:</strong> Sua solicitação será protocolada e respondida em até <strong>20 dias corridos</strong> (prorrogáveis por mais 10 dias mediante justificativa legal expressa).
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Seu Nome Completo *</label>
                  <input
                    type="text"
                    required
                    value={applicant}
                    onChange={(e) => setApplicant(e.target.value)}
                    placeholder="Ex: João da Silva"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-apae-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">E-mail para Resposta *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seuemail@exemplo.com"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-apae-blue-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Assunto da Informação Solicitada *</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Ex: Prestação de contas do termo de colaboração da saúde"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-apae-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Detalhamento da Solicitação *</label>
                <textarea
                  required
                  rows={4}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Descreva de forma clara e objetiva qual documento, relatório ou dado público você deseja acessar..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-apae-blue-500 outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-apae-blue-600 hover:bg-apae-blue-700 text-white font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Protocolar Pedido no e-SIC Oficial</span>
              </button>
            </form>
          )}

          {activeTab === 'denuncia' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-900 flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Canal de Ética & Denúncias com Sigilo Absoluto:</strong> Este canal é gerido de forma independente para apuração de eventuais irregularidades, desvios éticos ou descumprimento de normas na APAE. O anonimato é garantido por lei.
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <input
                  type="checkbox"
                  id="chk-anon"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="rounded text-rose-600 focus:ring-rose-500"
                />
                <label htmlFor="chk-anon" className="text-xs font-bold text-slate-700 cursor-pointer">
                  Desejo manter meu relato 100% anônimo (nenhum dado pessoal será registrado)
                </label>
              </div>

              {!isAnonymous && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Seu Nome (Opcional)</label>
                    <input
                      type="text"
                      value={applicant}
                      onChange={(e) => setApplicant(e.target.value)}
                      placeholder="Identificação facultativa"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-rose-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">E-mail para Contato (Opcional)</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Para receber atualizações sigilosas"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-rose-500 outline-none"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tema da Manifestação / Denúncia *</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Ex: Relato sobre conduta ética ou fornecimento"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-rose-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Descrição Detalhada do Fato *</label>
                <textarea
                  required
                  rows={4}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Inclua o máximo de evidências, datas, locais e descrições para possibilitar a apuração rigorosa pela Comissão de Ética..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-rose-500 outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>Registrar Relato Seguro na Ouvidoria</span>
              </button>
            </form>
          )}

          {activeTab === 'consultar' && (
            <div className="space-y-4">
              <form onSubmit={handleSearchProtocol} className="flex gap-2">
                <input
                  type="text"
                  required
                  value={searchProtocol}
                  onChange={(e) => setSearchProtocol(e.target.value)}
                  placeholder="Ex: SIC-2026-0042"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm font-mono uppercase focus:ring-2 focus:ring-apae-blue-500 outline-none"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-apae-blue-600 hover:bg-apae-blue-700 text-white font-black text-xs transition-colors flex items-center gap-1.5"
                >
                  <Search className="w-4 h-4" />
                  <span>Consultar</span>
                </button>
              </form>

              {consultResult === 'not_found' && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                  Nenhum protocolo encontrado com o código digitado. Verifique os números e tente novamente.
                </div>
              )}

              {consultResult && consultResult !== 'not_found' && (
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-black text-apae-blue-600 bg-blue-100 px-2 py-0.5 rounded">
                      {consultResult.protocol}
                    </span>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      {consultResult.status}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{consultResult.subject}</h4>
                    <p className="text-xs text-slate-600 mt-1">{consultResult.details}</p>
                  </div>

                  {consultResult.response && (
                    <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 mt-3">
                      <div className="font-black flex items-center gap-1 mb-1 text-emerald-800">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Resposta Oficial da APAE ({consultResult.responseDate}):</span>
                      </div>
                      <p className="leading-relaxed">{consultResult.response}</p>
                      <div className="mt-2 text-[10px] text-emerald-700 font-bold">
                        Setor Responsável: {consultResult.responsible}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="pt-4 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  Exemplos de Protocolos Públicos Respondidos:
                </span>
                <div className="space-y-2">
                  {esicRequests.map((req) => (
                    <button
                      key={req.protocol}
                      type="button"
                      onClick={() => {
                        setSearchProtocol(req.protocol);
                        setConsultResult(req);
                      }}
                      className="w-full text-left p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 flex items-center justify-between text-xs text-slate-700"
                    >
                      <span className="font-mono font-bold text-apae-blue-600">{req.protocol}</span>
                      <span className="truncate max-w-[260px]">{req.subject}</span>
                      <span className="text-[10px] text-emerald-600 font-bold">{req.status}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
