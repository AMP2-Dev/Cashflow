import { MESES } from './constants';
import { formatBRL } from './formatters';
import { obterTermosSegmento } from './segmentoLabels';

/**
 * Apura os indicadores analíticos de um determinado mês a partir do histórico de lançamentos
 */
export function apurarMetricasMes(lancamentos, mes, ano, pctCmvPadrao = 0) {
  const lista = (lancamentos || []).filter(l => {
    const mesRef = l.mesCompetencia !== undefined ? l.mesCompetencia : l.mes;
    const anoRef = l.anoCompetencia !== undefined ? l.anoCompetencia : l.ano;
    return mesRef === mes && (anoRef === undefined || anoRef === ano);
  });

  const receitas = lista.filter(l => l.tipo === 'receita');
  const despesasCmv = lista.filter(l => l.tipo === 'despesa' && l.categoria === 'cmv');
  const despesasVar = lista.filter(l => l.tipo === 'despesa' && l.categoria === 'variavel');
  const despesasFix = lista.filter(l => l.tipo === 'despesa' && l.categoria === 'fixa');
  const despesasFin = lista.filter(l => l.tipo === 'despesa' && l.categoria === 'financeira');
  const despesasInvest = lista.filter(l => l.tipo === 'despesa' && (l.categoria === 'investimento' || l.categoria === 'capex'));

  const faturamento = receitas.reduce((s, l) => s + (l.valor || 0), 0);
  const cmvCompras = despesasCmv.reduce((s, l) => s + (l.valor || 0), 0);
  const variaveis = despesasVar.reduce((s, l) => s + (l.valor || 0), 0);
  const fixas = despesasFix.reduce((s, l) => s + (l.valor || 0), 0);
  const financeiras = despesasFin.reduce((s, l) => s + (l.valor || 0), 0);
  const investimentos = despesasInvest.reduce((s, l) => s + (l.valor || 0), 0);

  // CMV / CSP DRE (Estimado por % ou Compras)
  let cmv = 0;
  if (pctCmvPadrao > 0) {
    cmv = faturamento * (pctCmvPadrao / 100);
  } else if (cmvCompras > 0) {
    cmv = cmvCompras;
  }

  const margemContribuicao = faturamento - cmv - variaveis;
  const pctMC = faturamento > 0 ? (margemContribuicao / faturamento) * 100 : 0;
  const pontoEquilibrio = pctMC > 0 ? fixas / (pctMC / 100) : 0;
  
  // Lucratividade Pré e Pós Investimento
  const resultadoOperacional = margemContribuicao - fixas; // EBITDA / LAJIDA
  const margemOperacionalPct = faturamento > 0 ? (resultadoOperacional / faturamento) * 100 : 0;
  const lucroDRE = resultadoOperacional - financeiras - investimentos;
  const totalDespesasPagas = fixas + variaveis + cmvCompras + financeiras + investimentos;
  const saldoCaixa = faturamento - totalDespesasPagas;
  const diferencaEstoque = cmvCompras - cmv; // positivo se desembolsou mais do que alocou/consumiu
  const taxaReinvestimentoPct = faturamento > 0 ? (investimentos / faturamento) * 100 : 0;

  const pctAtingidoPE = pontoEquilibrio > 0 ? (faturamento / pontoEquilibrio) * 100 : 0;
  const folgaPE = faturamento - pontoEquilibrio;

  return {
    mes,
    ano,
    nomeMes: MESES[mes] || `Mês ${mes + 1}`,
    temDados: lista.length > 0,
    faturamento,
    cmv,
    cmvCompras,
    diferencaEstoque,
    variaveis,
    fixas,
    financeiras,
    investimentos,
    resultadoOperacional,
    margemOperacionalPct,
    taxaReinvestimentoPct,
    margemContribuicao,
    pctMC,
    pontoEquilibrio,
    pctAtingidoPE,
    folgaPE,
    lucroDRE,
    margemLiquidaPct: faturamento > 0 ? (lucroDRE / faturamento) * 100 : 0,
    totalDespesasPagas,
    saldoCaixa,
  };
}

/**
 * Gera a tradução executiva do mês em linguagem humana
 */
export function gerarDiagnosticoMensal(m, empresaNome = 'Empresa', empresa = null, lancamentos = []) {
  if (!m || !m.temDados) {
    return {
      titulo: `Sem lançamentos em ${m.nomeMes}`,
      resumo: `Não foram encontrados lançamentos de receitas ou despesas em ${m.nomeMes}.`,
      textoWhatsApp: `Olá! Não constam lançamentos registrados para ${m.nomeMes}.`,
    };
  }

  const termos = obterTermosSegmento(empresa, lancamentos);
  const atingiuPE = m.pctAtingidoPE >= 100;
  const deuLucroDRE = m.lucroDRE > 0;
  const caixaPositivo = m.saldoCaixa >= 0;

  // Análise da discrepância Caixa vs DRE contextualizada por segmento
  let explicacaoEstoque = '';
  if (termos.segmento === 'servicos') {
    if (m.diferencaEstoque > 100) {
      explicacaoEstoque = `Você desembolsou ${formatBRL(m.cmvCompras)} em custos diretos (subcontratações, terceiros ou insumos operacionais), mas alocou ${formatBRL(m.cmv)} nos serviços executados do mês. Essa diferença de ${formatBRL(m.diferencaEstoque)} saiu do caixa e antecipou insumos/adiantamentos de projetos futuros.`;
    } else if (m.diferencaEstoque < -100) {
      explicacaoEstoque = `Você alocou ${formatBRL(m.cmv)} em custos diretos dos projetos/serviços, mas desembolsou apenas ${formatBRL(m.cmvCompras)} no caixa no mês. Isso indica que aproveitou serviços/materiais já contratados anteriormente, aliviando o caixa!`;
    } else if (m.cmvCompras === 0 && m.cmv === 0) {
      explicacaoEstoque = `Operação de serviços puros sem custos diretos de terceiros ou insumos aplicados no mês. Toda a receita contribui diretamente para a cobertura dos custos fixos.`;
    } else {
      explicacaoEstoque = `Os desembolsos com custos diretos (${formatBRL(m.cmvCompras)}) foram equilibrados com a alocação dos serviços prestados no mês.`;
    }
  } else {
    // Comércio, Indústria ou Misto
    if (m.diferencaEstoque > 100) {
      explicacaoEstoque = `Você pagou ${formatBRL(m.cmvCompras)} em compras/fornecedores diretos, mas consumiu ${formatBRL(m.cmv)} nas vendas. Essa diferença de ${formatBRL(m.diferencaEstoque)} saiu do caixa e ficou em ${termos.rotuloInventario.toLowerCase()} ou quitou compras a prazo passadas.`;
    } else if (m.diferencaEstoque < -100) {
      explicacaoEstoque = `Você consumiu ${formatBRL(m.cmv)} em mercadorias/insumos, mas desembolsou apenas ${formatBRL(m.cmvCompras)} em compras no mês. Isso significa que girou o ${termos.rotuloInventario.toLowerCase()} que já tinha em casa, aliviando o caixa!`;
    } else {
      explicacaoEstoque = `As aquisições diretas no mês (${formatBRL(m.cmvCompras)}) foram equilibradas com o consumo real das operações.`;
    }
  }

  // Recomendação contextualizada
  let recomendacao = '';
  if (atingiuPE) {
    if (termos.segmento === 'servicos') {
      recomendacao = '• A operação é rentável e gera margem consistente. Foco agora em manter a produtividade da equipe, eficiência dos prestadores e prazos de recebimento.';
    } else {
      recomendacao = '• A operação é rentável e gera margem consistente. Foco agora em manter o giro do estoque e prazos com fornecedores.';
    }
  } else {
    recomendacao = '• Prioridade para o próximo mês: alavancar o volume de vendas ou renegociar despesas fixas para alcançar o Ponto de Equilíbrio com folga.';
  }

  // Montagem do texto estruturado para WhatsApp
  const textoWhatsApp = 
`📊 *DIAGNÓSTICO FINANCEIRO EXECUTIVO — ${m.nomeMes.toUpperCase()}/${m.ano}*
🏢 *${empresaNome}*

Olá! Segue a tradução analítica dos resultados de *${m.nomeMes}*:

🎯 *1. PONTO DE EQUILÍBRIO (${m.pctAtingidoPE.toFixed(1)}% ALCANÇADO)*
• Meta mínima de faturamento (PE): *${formatBRL(m.pontoEquilibrio)}*
• Faturamento Realizado: *${formatBRL(m.faturamento)}*
• Status: *${atingiuPE ? `✅ Meta superada com folga de +${formatBRL(m.folgaPE)}` : `⚠️ Faltaram ${formatBRL(Math.abs(m.folgaPE))} para cobrir custos fixos`}*
• Margem de Contribuição: *${m.pctMC.toFixed(1)}%* (${formatBRL(m.margemContribuicao)})

📈 *2. RESULTADO OPERACIONAL & LUCRATIVIDADE (DRE)*
• Faturamento Bruto: *${formatBRL(m.faturamento)}*
• (-) ${termos.rotuloDRE}: *-${formatBRL(m.cmv)}*
• (-) Despesas Variáveis: *-${formatBRL(m.variaveis)}*
• (-) Despesas Fixas: *-${formatBRL(m.fixas)}*
• *(=) Lucro Operacional (EBITDA - Antes de Investir):* *${m.resultadoOperacional >= 0 ? '+' : ''}${formatBRL(m.resultadoOperacional)}* (${m.margemOperacionalPct.toFixed(1)}% de margem)
${m.financeiras > 0 ? `• (-) Despesas Financeiras: *-${formatBRL(m.financeiras)}*\n` : ''}${m.investimentos > 0 ? `• (-) Investimentos / CAPEX: *-${formatBRL(m.investimentos)}* (${m.taxaReinvestimentoPct.toFixed(1)}% reinvestido)\n` : ''}• *LUCRO LÍQUIDO FINAL (Depois de Investir):* *${deuLucroDRE ? '+' : ''}${formatBRL(m.lucroDRE)}* (${m.margemLiquidaPct.toFixed(1)}% de margem líquida)

🔍 *3. VISÃO DO CAIXA: ONDE FOI PARAR O DINHEIRO?*
• Entradas no Banco: *${formatBRL(m.faturamento)}*
• Total Desembolsado: *-${formatBRL(m.totalDespesasPagas)}*
• *SALDO FINAL DO CAIXA:* *${caixaPositivo ? '+' : ''}${formatBRL(m.saldoCaixa)}*

💡 *Reconciliação Exata:*
${m.investimentos > 0 ? `🚀 *Reinvestimento Estratégico:* A empresa investiu ${formatBRL(m.investimentos)} (${m.taxaReinvestimentoPct.toFixed(1)}% da receita) na modernização / implantação.\n` : ''}${deuLucroDRE && !caixaPositivo 
  ? `(+) Lucro Líquido DRE: *+${formatBRL(m.lucroDRE)}*\n(-) Desembolsos extras com ${termos.rotuloInsumosCard.toLowerCase()}: *-${formatBRL(m.diferencaEstoque)}*\n(=) Saldo Bancário do mês: *${formatBRL(m.saldoCaixa)}*\n\n📌 *Conclusão:* O dinheiro *não sumiu*! ${explicacaoEstoque}`
  : `Resultado operacional saudável. ${explicacaoEstoque}`}

🚀 *RECOMENDAÇÃO ESTRATÉGICA:*
${recomendacao}

Conte com nosso apoio estratégico! Estamos à inteira disposição.`;

  return {
    m,
    atingiuPE,
    deuLucroDRE,
    caixaPositivo,
    explicacaoEstoque,
    textoWhatsApp,
    termos,
  };
}

/**
 * Gera a tradução comparativa entre dois meses (Mês Atual vs Mês Anterior)
 */
export function gerarComparativoBimestral(mAtual, mAnterior, empresaNome = 'Empresa', empresa = null, lancamentos = []) {
  if (!mAtual || !mAnterior || !mAtual.temDados || !mAnterior.temDados) {
    return {
      temDadosSuficientes: false,
      mensagem: 'Necessário ter lançamentos em ambos os meses para gerar a comparação analítica.',
    };
  }

  const termos = obterTermosSegmento(empresa, lancamentos);
  const varFatPct = mAnterior.faturamento > 0 
    ? ((mAtual.faturamento - mAnterior.faturamento) / mAnterior.faturamento) * 100 
    : 0;
  const varLucroDRE = mAtual.lucroDRE - mAnterior.lucroDRE;
  const varSaldoCaixa = mAtual.saldoCaixa - mAnterior.saldoCaixa;
  const varFixas = mAtual.fixas - mAnterior.fixas;
  const varComprasCmv = mAtual.cmvCompras - mAnterior.cmvCompras;

  let insightComparativo = '';
  if (varFatPct >= 0 && varSaldoCaixa < 0) {
    if (termos.segmento === 'servicos') {
      insightComparativo = `Mesmo faturando ${varFatPct.toFixed(1)}% a mais em ${mAtual.nomeMes}, o saldo bancário reduziu porque os desembolsos diretos com ${termos.rotuloInsumosCard.toLowerCase()} subiram ${formatBRL(varComprasCmv)}. O capital antecipou demandas para viabilizar as próximas entregas.`;
    } else {
      insightComparativo = `Mesmo faturando ${varFatPct.toFixed(1)}% a mais em ${mAtual.nomeMes}, o saldo bancário reduziu porque as compras de mercadorias/fornecedores subiram ${formatBRL(varComprasCmv)}. O capital foi aplicado em estoque para viabilizar as próximas vendas.`;
    }
  } else if (varFatPct >= 0 && varSaldoCaixa >= 0) {
    insightComparativo = `Excelente evolução! As receitas cresceram e a geração de caixa acompanhou o ritmo com aumento do saldo financeiro.`;
  } else {
    insightComparativo = `Atenção à queda de faturamento em ${mAtual.nomeMes}. Recomendamos ajustar as contratações/compras e focar na redução de custos fixos.`;
  }

  const textoWhatsApp = 
`📊 *COMPARATIVO FINANCEIRO EXECUTIVO — ${mAnterior.nomeMes.toUpperCase()} vs ${mAtual.nomeMes.toUpperCase()}/${mAtual.ano}*
🏢 *${empresaNome}*

Olá! Segue a análise comparativa de desempenho entre os dois últimos meses:

💰 *1. FATURAMENTO E VENDAS*
• ${mAnterior.nomeMes}: *${formatBRL(mAnterior.faturamento)}*
• ${mAtual.nomeMes}: *${formatBRL(mAtual.faturamento)}*
• Variação: *${varFatPct >= 0 ? '+' : ''}${varFatPct.toFixed(1)}%* (${varFatPct >= 0 ? 'Crescimento' : 'Recuo'} de ${formatBRL(Math.abs(mAtual.faturamento - mAnterior.faturamento))})

🎯 *2. PONTO DE EQUILÍBRIO*
• Meta ${mAnterior.nomeMes}: *${formatBRL(mAnterior.pontoEquilibrio)}* (${mAnterior.pctAtingidoPE.toFixed(0)}% atingido)
• Meta ${mAtual.nomeMes}: *${formatBRL(mAtual.pontoEquilibrio)}* (${mAtual.pctAtingidoPE.toFixed(0)}% atingido)

📉 *3. ESTRUTURA DE CUSTOS E DESEMBOLSOS*
• Despesas Fixas: ${varFixas >= 0 ? '+' : ''}${formatBRL(varFixas)} (de ${formatBRL(mAnterior.fixas)} para ${formatBRL(mAtual.fixas)})
• ${termos.rotuloInsumosCard}: ${varComprasCmv >= 0 ? '+' : ''}${formatBRL(varComprasCmv)} (de ${formatBRL(mAnterior.cmvCompras)} para ${formatBRL(mAtual.cmvCompras)})

📈 *4. RESULTADO LÍQUIDO (DRE) vs CAIXA*
• Lucro Líquido DRE: de *${formatBRL(mAnterior.lucroDRE)}* para *${formatBRL(mAtual.lucroDRE)}* (${varLucroDRE >= 0 ? '+' : ''}${formatBRL(varLucroDRE)})
• Saldo em Conta Bancária: de *${formatBRL(mAnterior.saldoCaixa)}* para *${formatBRL(mAtual.saldoCaixa)}* (${varSaldoCaixa >= 0 ? '+' : ''}${formatBRL(varSaldoCaixa)})

💡 *INSIGHT EXECUTIVO:*
${insightComparativo}

Qualquer dúvida, estamos à disposição para apoiar nas decisões!`;

  return {
    temDadosSuficientes: true,
    mAtual,
    mAnterior,
    varFatPct,
    varLucroDRE,
    varSaldoCaixa,
    varFixas,
    varComprasCmv,
    textoWhatsApp,
  };
}
