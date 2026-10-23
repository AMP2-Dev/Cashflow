import React, { useState } from 'react';
import { INSTITUTION_DATA } from '../data/apaeData';
import { 
  Heart, 
  Sparkles, 
  ShieldCheck, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Copy, 
  Check, 
  Lock, 
  ArrowRight,
  ExternalLink,
  MessageCircle,
  Building2
} from 'lucide-react';

export function ApaeComingSoon({ onEnterPreview, onOpenAdmin }) {
  const [copiedPix, setCopiedPix] = useState(false);

  const handleCopyPix = () => {
    navigator.clipboard.writeText(INSTITUTION_DATA.cnpj);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 3000);
  };

  return (
    <div className="min-h-screen relative flex flex-col justify-between overflow-hidden bg-slate-950 text-white font-sans selection:bg-[#F5A623] selection:text-slate-950">
      
      {/* 1. Imagem de Fundo Emocional Panorâmica com Efeito de Luz Suave */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=85&w=1920" 
          alt="APAE Santa Cruz das Palmeiras" 
          className="w-full h-full object-cover object-center filter scale-105 transform transition-transform duration-[15000ms] ease-out"
        />
        {/* Máscara de Transparência Escura e Quente */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/80 to-slate-950/95 backdrop-blur-[2px]" />
        
        {/* Marca d'água sutil do logotipo da APAE no canto */}
        <div className="absolute -right-20 -bottom-20 w-[480px] h-[480px] opacity-10 pointer-events-none select-none">
          <img src="/apae-scp-logo.png" alt="Emblema APAE" className="w-full h-full object-contain filter invert" />
        </div>
      </div>

      {/* 2. Top Header da Página de Espera */}
      <header className="relative z-10 px-6 sm:px-12 py-6 border-b border-white/10 backdrop-blur-md bg-slate-950/40">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="h-12 w-12 rounded-2xl bg-white p-1.5 shadow-xl flex items-center justify-center shrink-0 border border-white/20">
              <img src="/apae-scp-logo.png" alt="APAE Santa Cruz das Palmeiras" className="h-full w-full object-contain" />
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-black text-white tracking-tight">
                APAE Santa Cruz das Palmeiras
              </h1>
              <p className="text-[11px] text-slate-300 font-medium">
                Mantenedora da Escola de Educação Especial "Luiz Affonso Mendes"
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenAdmin}
              className="text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-xl border border-white/15 hover:bg-white/10 transition-colors flex items-center gap-1.5 backdrop-blur-sm"
              title="Acesso restrito ao Painel de Gestão"
            >
              <Lock className="w-3.5 h-3.5 text-[#F5A623]" />
              <span className="hidden sm:inline">Acesso Gestor</span>
            </button>
          </div>
        </div>
      </header>

      {/* 3. Conteúdo Central de Expectativa & Acolhimento */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 py-12 sm:py-16 text-center space-y-8 flex-1 flex flex-col justify-center items-center">
        
        {/* Selo Comemorativo 50 Anos */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 backdrop-blur-md shadow-lg animate-pulse">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Jubileu de Ouro • 50 Anos de Amor & Dedicação (1976 - 2026)</span>
        </div>

        {/* Título Principal */}
        <div className="space-y-4 max-w-3xl">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-[1.15] text-white">
            Estamos preparando um <br />
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-[#F5A623] to-amber-500 underline decoration-amber-400/50">
              novo portal digital
            </span>{' '}
            para você.
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-slate-200 font-normal leading-relaxed max-w-2xl mx-auto">
            Em breve estará no ar o novo site oficial da APAE de Santa Cruz das Palmeiras: mais leve, acessível, transparente e acolhedor para toda a nossa comunidade.
          </p>
        </div>

        {/* Card de Aviso: Atendimentos Continuam Normalmente */}
        <div className="p-4 sm:p-5 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 max-w-2xl text-left shadow-2xl flex items-start gap-4">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 font-black">
            <Building2 className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <span>Nossas Atividades e Terapias Seguem Normalmente</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              As aulas na Escola de Educação Especial "Luiz Affonso Mendes" e os atendimentos clínicos multidisciplinares (Fisioterapia, Fonoaudiologia, Terapia Ocupacional e Psicologia) estão funcionando a todo vapor em nossa sede.
            </p>
          </div>
        </div>

        {/* Box de Apoio com Chave PIX Oficial */}
        <div className="p-5 sm:p-6 rounded-3xl bg-slate-900/90 border border-slate-700/80 shadow-2xl max-w-lg w-full space-y-3.5 backdrop-blur-md text-left">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span className="text-xs font-bold text-white">Apoie Nossa Causa com Qualquer Valor</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
              Chave Oficial da APAE
            </span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Sua doação solidária transforma vidas e garante atendimento gratuito diário para nossos alunos e assistidos.
          </p>

          <div className="flex items-center justify-between gap-2 bg-slate-950 px-3.5 py-2.5 rounded-2xl border border-slate-800">
            <div>
              <span className="block text-[10px] text-slate-500 font-bold uppercase">Chave PIX (CNPJ):</span>
              <code className="text-xs font-mono font-bold text-amber-300">{INSTITUTION_DATA.cnpj}</code>
            </div>

            <button
              onClick={handleCopyPix}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md ${
                copiedPix 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-amber-400 hover:bg-amber-300 text-slate-950'
              }`}
            >
              {copiedPix ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedPix ? 'Copiado!' : 'Copiar PIX'}</span>
            </button>
          </div>
        </div>

        {/* Botão para Acessar Prévia de Homologação (Diretoria / Equipe) */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          {onEnterPreview && (
            <button
              onClick={onEnterPreview}
              className="px-6 py-3 rounded-full bg-blue-600/30 hover:bg-blue-600/50 border border-blue-400/40 text-blue-200 hover:text-white text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shadow-lg backdrop-blur-sm group"
            >
              <span>Ver Prévia em Homologação (Equipe APAE)</span>
              <ArrowRight className="w-4 h-4 text-blue-300 group-hover:translate-x-1 transition-transform" />
            </button>
          )}

          <a
            href={`https://wa.me/55${INSTITUTION_DATA.whatsapp.replace(/\D/g, '')}?text=Olá,%20gostaria%20de%20falar%20com%20a%20secretaria%20da%20APAE`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold transition-colors flex items-center gap-2 shadow-lg"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Falar no WhatsApp</span>
          </a>
        </div>

      </main>

      {/* 4. Rodapé Institucional com Contatos Reais */}
      <footer className="relative z-10 px-6 sm:px-12 py-6 border-t border-white/10 bg-slate-950/70 backdrop-blur-md">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-400 text-center sm:text-left">
          
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{INSTITUTION_DATA.address}, {INSTITUTION_DATA.neighborhood} • Santa Cruz das Palmeiras - SP</span>
          </div>

          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Telefone: {INSTITUTION_DATA.phone} | WhatsApp: {INSTITUTION_DATA.whatsapp}</span>
          </div>

          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <Mail className="w-4 h-4 text-blue-400 shrink-0" />
            <span>{INSTITUTION_DATA.email}</span>
          </div>

        </div>
      </footer>

    </div>
  );
}
