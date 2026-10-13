/**
 * Utilitário de Segmentação e Terminologia Contábil/Financeira
 * Adapta dinamicamente os rótulos de Custos Diretos (CMV / CSP / CPV)
 * conforme o modelo de negócio da empresa (Serviços, Comércio, Indústria ou Misto/Geral).
 */

export function obterTermosSegmento(empresa = null, lancamentos = []) {
  // 1. Detectar segmento da empresa (se definido expressamente)
  let segmento = empresa?.segmento || empresa?.tipo_atividade;

  // 2. Se não definido no cadastro, inferir inteligentemente
  if (!segmento) {
    const temNfse = !!(
      empresa?.modulo_nfse ||
      localStorage.getItem(`amp_modulo_nfse_${empresa?.id}`) === 'true' ||
      (lancamentos || []).some(l => (l?.descricao || '').toLowerCase().includes('nfs-e') || (l?.descricao || '').toLowerCase().includes('nota fiscal de serviço'))
    );
    const temServicos = (lancamentos || []).some(l => {
      const sub = (l?.subcategoria || '').toLowerCase();
      const desc = (l?.descricao || '').toLowerCase();
      return sub.includes('serviço') || sub.includes('subcontrat') || sub.includes('diarista') || desc.includes('honorário') || desc.includes('consultoria');
    });
    const temComercio = (lancamentos || []).some(l => {
      const sub = (l?.subcategoria || '').toLowerCase();
      return sub.includes('mercadoria') || sub.includes('revenda');
    });

    if (temNfse || (temServicos && !temComercio)) {
      segmento = 'servicos';
    } else if (temComercio && !temServicos) {
      segmento = 'comercio';
    } else {
      segmento = 'misto'; // Padrão universal e abrangente
    }
  }

  switch (segmento) {
    case 'servicos':
      return {
        segmento: 'servicos',
        segmentoNome: 'Prestação de Serviços',
        siglaCusto: 'CSP',
        rotuloDRE: '(–) Custos dos Serviços Prestados (CSP)',
        rotuloDRECurto: 'CSP (Serviços)',
        rotuloModalPct: '% de Custo de Serviços (CSP) Estimado',
        descricaoCusto: 'Custo direto de entrega dos serviços (terceirizados, materiais e diárias aplicadas)',
        rotuloInsumosCard: 'Terceiros & Materiais Aplicados (CSP)',
        explicacaoModal: 'Informe o percentual médio que subcontratação técnica, diaristas ou peças/materiais aplicados no cliente representam sobre o faturamento de serviços.',
        faixasReferencia: 'Referências: Serviços Puros (intelectuais) 0–15% · Serviços com Terceiros 15–30% · Serviços com Materiais 25–40%',
        rotuloBotaoPct: '% Custo (CSP)',
        rotuloInventario: 'Projetos em Andamento',
        alertaZero: 'Custos Diretos de serviços não calculados. Se o seu serviço não tem custos diretos de terceiros ou materiais, sua margem bruta é 100%. Caso subcontrate especialistas ou aplique peças, lance como Custos Diretos (CSP) ou defina um % estimado.',
        alertaDashboard: 'os custos diretos de serviços lançados (CSP)',
      };

    case 'comercio':
      return {
        segmento: 'comercio',
        segmentoNome: 'Comércio / Varejo',
        siglaCusto: 'CMV',
        rotuloDRE: '(–) Custos de Mercadorias Vendidas (CMV)',
        rotuloDRECurto: 'CMV (Mercadorias)',
        rotuloModalPct: '% de CMV Estimado (Mercadorias)',
        descricaoCusto: 'Custo de aquisição das mercadorias vendidas e fretes de compra',
        rotuloInsumosCard: 'Insumos & Mercadorias (CMV)',
        explicacaoModal: 'Informe o percentual médio que o custo de reposição de mercadoria representa no seu faturamento.',
        faixasReferencia: 'Referências: Varejo Geral 45–65% · Alimentação/Restaurante 28–40% · Distribuição 60–75%',
        rotuloBotaoPct: '% CMV',
        rotuloInventario: 'Inventário / Estoque',
        alertaZero: 'CMV não calculado. Lance compras como Custos Diretos (CMV), use o botão "Inventário / Estoque", ou configure um % estimado do seu custo de mercadoria.',
        alertaDashboard: 'as compras de mercadorias lançadas como CMV',
      };

    case 'industria':
      return {
        segmento: 'industria',
        segmentoNome: 'Indústria / Fabricação',
        siglaCusto: 'CPV',
        rotuloDRE: '(–) Custo dos Produtos Vendidos (CPV)',
        rotuloDRECurto: 'CPV (Produção)',
        rotuloModalPct: '% de CPV Estimado (Produção)',
        descricaoCusto: 'Custo de matéria-prima, insumos de fabricação e embalagens',
        rotuloInsumosCard: 'Matéria-Prima & Insumos (CPV)',
        explicacaoModal: 'Informe o percentual médio que matérias-primas e insumos de fabricação representam sobre o faturamento.',
        faixasReferencia: 'Referências: Fabricação Leve 35–50% · Montagem 40–60% · Alimentos/Bebidas 30–45%',
        rotuloBotaoPct: '% CPV',
        rotuloInventario: 'Estoque / Matéria-Prima',
        alertaZero: 'CPV não calculado. Lance compras de insumos como Custos Diretos (CPV), use o botão "Inventário", ou configure um % estimado.',
        alertaDashboard: 'os custos de matéria-prima lançados como CPV',
      };

    case 'misto':
    default:
      return {
        segmento: 'misto',
        segmentoNome: 'Geral / Misto (Produtos & Serviços)',
        siglaCusto: 'CMV / CSP',
        rotuloDRE: '(–) Custos Diretos (CMV / CSP)',
        rotuloDRECurto: 'Custos Diretos (CMV / CSP)',
        rotuloModalPct: '% de Custo Direto Estimado (CMV / CSP)',
        descricaoCusto: 'Gastos diretos essenciais para entregar vendas ou serviços (mercadorias, insumos, peças e terceiros)',
        rotuloInsumosCard: 'Insumos, Peças & Terceiros (CMV / CSP)',
        explicacaoModal: 'Informe o percentual médio que mercadorias revendidas, insumos ou terceiros/materiais aplicados no serviço representam sobre o faturamento.',
        faixasReferencia: 'Referências: Serviços 10–25% · Alimentação 28–40% · Fabricação 35–50% · Varejo 45–65%',
        rotuloBotaoPct: '% Custo Direto',
        rotuloInventario: 'Inventário / Estoque',
        alertaZero: 'Custos Diretos não calculados. Se você é prestador de serviço e não tem insumos diretos, sua margem direta é 100%. Caso compre mercadorias, insumos ou pague terceiros no serviço, lance como Custos Diretos (CMV/CSP) ou configure um % estimado.',
        alertaDashboard: 'os custos diretos lançados (CMV / CSP)',
      };
  }
}
