import React, { useState } from 'react';
import { useApae } from '../context/ApaeContext';
import { LGPD_POLICY_DATA } from '../data/apaeData';
import { X, ShieldCheck, Lock, Mail, CheckCircle2, UserCheck, FileCheck2, Send } from 'lucide-react';

export function LgpdModal() {
  const { lgpdModalOpen, setLgpdModalOpen, showToast } = useApae();
  const [activeTab, setActiveTab] = useState('politica'); // 'politica' | 'direitos' | 'cookies'
  const [titularNome, setTitularNome] = useState('');
  const [titularEmail, setTitularEmail] = useState('');
  const [direitoTipo, setDireitoTipo] = useState('confirmacao');
  const [detalhes, setDetalhes] = useState('');

  if (!lgpdModalOpen) return null;

  const handleSubmitDireito = (e) => {
    e.preventDefault();
    showToast(`Solicitação de Titular LGPD registrada! Protocolo de privacidade enviado para ${titularEmail}. O DPO responderá em até 15 dias.`);
    setTitularNome('');
    setTitularEmail('');
    setDetalhes('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden border border-slate-200 animate-slide-up"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight">
                Portal de Privacidade & Proteção de Dados (LGPD)
              </h3>
              <p className="text-xs text-slate-400">
                Lei nº 13.709/2018 — APAE de Santa Cruz das Palmeiras - SP
              </p>
            </div>
          </div>

          <button
            onClick={() => setLgpdModalOpen(false)}
            className="text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Abas */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 pt-3 flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => setActiveTab('politica')}
            className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all ${
              activeTab === 'politica'
                ? 'border-emerald-600 text-emerald-700 font-black'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Política de Privacidade
          </button>

          <button
            onClick={() => setActiveTab('direitos')}
            className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all ${
              activeTab === 'direitos'
                ? 'border-emerald-600 text-emerald-700 font-black'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Exercer Direitos do Titular (Art. 18)
          </button>

          <button
            onClick={() => setActiveTab('dpo')}
            className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all ${
              activeTab === 'dpo'
                ? 'border-emerald-600 text-emerald-700 font-black'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Canal do Encarregado (DPO)
          </button>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 text-xs sm:text-sm text-slate-700">
          {activeTab === 'politica' && (
            <div className="space-y-4 leading-relaxed">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950">
                <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-800 mb-1">
                  Compromisso com a Privacidade dos Nossos Assistidos e Doadores
                </h4>
                <p className="text-xs">
                  A Associação de Pais e Amigos dos Excepcionais de Santa Cruz das Palmeiras coleta exclusivamente os dados indispensáveis para o atendimento escolar, laudos clínicos e emissão de recibos fiscais de doações.
                </p>
              </div>

              <div>
                <h5 className="font-bold text-slate-900 mb-1">1. Controlador dos Dados Pessoais</h5>
                <p className="text-xs text-slate-600">
                  {LGPD_POLICY_DATA.controller}, inscrito no CNPJ {LGPD_POLICY_DATA.cnpj}, com sede na {LGPD_POLICY_DATA.address}.
                </p>
              </div>

              <div>
                <h5 className="font-bold text-slate-900 mb-1">2. Dados Sensíveis de Saúde e Educação</h5>
                <p className="text-xs text-slate-600">
                  Prontuários médicos, relatórios multidisciplinares (fisioterapia, fonoaudiologia, psicologia) e registros pedagógicos de alunos com deficiência intelectual ou múltipla são tratados com base legal no Art. 11, II da LGPD (tutela da saúde e cumprimento de obrigação legal), com controle estrito e sigilo profissional.
                </p>
              </div>

              <div>
                <h5 className="font-bold text-slate-900 mb-1">3. Princípios Adotados</h5>
                <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
                  {LGPD_POLICY_DATA.principles.map((pr, idx) => (
                    <li key={idx}>{pr}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="font-bold text-slate-900 mb-1">4. Não Compartilhamento Comercial</h5>
                <p className="text-xs text-slate-600">
                  A APAE de Santa Cruz das Palmeiras <strong>jamais vende, aluga ou cede dados pessoais</strong> a terceiros ou empresas de publicidade.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'direitos' && (
            <form onSubmit={handleSubmitDireito} className="space-y-4">
              <p className="text-xs text-slate-600">
                Nos termos do Artigo 18 da LGPD, você como titular de dados ou responsável legal pode solicitar a qualquer momento:
              </p>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tipo de Solicitação *</label>
                <select
                  value={direitoTipo}
                  onChange={(e) => setDireitoTipo(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  <option value="confirmacao">Confirmação da existência de tratamento de dados</option>
                  <option value="acesso">Acesso aos dados pessoais tratados</option>
                  <option value="correcao">Correção de dados incompletos, inexatos ou desatualizados</option>
                  <option value="anonimizacao">Anonimização, bloqueio ou eliminação de dados desnecessários</option>
                  <option value="revogacao">Revogação do consentimento</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Seu Nome Completo *</label>
                  <input
                    type="text"
                    required
                    value={titularNome}
                    onChange={(e) => setTitularNome(e.target.value)}
                    placeholder="Nome do titular ou responsável"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">E-mail Cadastrado *</label>
                  <input
                    type="email"
                    required
                    value={titularEmail}
                    onChange={(e) => setTitularEmail(e.target.value)}
                    placeholder="seuemail@exemplo.com"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mensagem / Esclarecimento *</label>
                <textarea
                  required
                  rows={3}
                  value={detalhes}
                  onChange={(e) => setDetalhes(e.target.value)}
                  placeholder="Especifique detalhadamente a sua solicitação..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Enviar Solicitação ao DPO da APAE</span>
              </button>
            </form>
          )}

          {activeTab === 'dpo' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 text-emerald-400 flex items-center justify-center flex-shrink-0">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-sm">
                      {LGPD_POLICY_DATA.dpoName}
                    </h4>
                    <p className="text-xs text-slate-500">
                      Canal de Comunicação Oficial com a Autoridade Nacional (ANPD) e Titulares
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 text-xs space-y-1.5 text-slate-700">
                  <div><strong>E-mail Direto:</strong> {LGPD_POLICY_DATA.dpoEmail}</div>
                  <div><strong>Telefone:</strong> (19) 3672-1576</div>
                  <div><strong>Endereço Postal:</strong> Rua Jovino Martins da Silva, 44, Jd. São Carlos, Santa Cruz das Palmeiras - SP</div>
                  <div><strong>Horário de Atendimento DPO:</strong> Segunda a Sexta, das 08h às 16h</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
