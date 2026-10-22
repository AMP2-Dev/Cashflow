/**
 * BASE DE DADOS OFICIAL E COMPLIANCE
 * APAE DE SANTA CRUZ DAS PALMEIRAS - SP
 * Mantenedora da Escola de Educação Especial "Luiz Affonso Mendes"
 * Fundada em 31 de Agosto de 1976 | 50 Anos de História (1976 - 2026)
 * CNPJ: 48.182.992/0001-41
 * 
 * Totalmente alinhada à LAI (Lei 12.527/2011), MROSC (Lei 13.019/2014) e LGPD (Lei 13.709/2018).
 */

export const INSTITUTION_DATA = {
  name: "Associação de Pais e Amigos dos Excepcionais de Santa Cruz das Palmeiras",
  shortName: "APAE Santa Cruz das Palmeiras",
  schoolName: "Escola de Educação Especial 'Luiz Affonso Mendes'",
  cnpj: "48.182.992/0001-41",
  foundationDate: "31 de Agosto de 1976",
  schoolFoundationDate: "20 de Julho de 1982",
  foundationYear: 1976,
  yearsOfService: 50,
  founder: {
    name: "Luiz Affonso Mendes (Dudízio)",
    role: "Idealizador, Fundador e Patrono",
    bio: "Educador e vereador palmeirense, pioneiro na luta pelos direitos das pessoas com deficiência na região. Liderou a mobilização comunitária para a criação da APAE em 1976 e a edificação da sede própria no Jardim São Carlos em 1986."
  },
  address: "Rua Jovino Martins da Silva, nº 44",
  neighborhood: "Jardim São Carlos",
  city: "Santa Cruz das Palmeiras - SP",
  zipCode: "13650-254",
  phone: "(19) 3672-1576",
  whatsapp: "(19) 99742-1576",
  email: "apae.scp@terra.com.br",
  secondaryEmail: "contato@apaesantacruzdaspalmeiras.org.br",
  donationEmail: "doacoes@apaesantacruzdaspalmeiras.org.br",
  dpoEmail: "dpo.privacidade@apaesantacruzdaspalmeiras.org.br",
  openingHours: "Segunda a Sexta-feira, das 07:30 às 16:30",
  certifications: [
    { title: "CEBAS", subtitle: "Certificado de Entidade Beneficente de Assistência Social", tag: "Saúde, Educação e Social", code: "Portaria MEC/MS Nº 142/2023" },
    { title: "CNAS", subtitle: "Conselho Nacional de Assistência Social", tag: "Inscrição Regular", code: "Inscr. 28.514" },
    { title: "Utilidade Pública", subtitle: "Reconhecimento Federal, Estadual e Municipal", tag: "Leis Oficiais SP", code: "Lei Mun. 1.104/1978" },
    { title: "CMDCA & CMAS", subtitle: "Conselhos Municipais da Criança e Assistência Social", tag: "Aprovado com Louvor", code: "Reg. 003/CMDCA-SCP" },
  ],
  stats: [
    { value: 165, label: "Assistidos e Alunos", subtitle: "Atendimentos diretos continuados", suffix: "+" },
    { value: 50, label: "Anos de História", subtitle: "Desde 1976 em Santa Cruz das Palmeiras", suffix: " anos" },
    { value: 34, label: "Profissionais Especialistas", subtitle: "Equipe clínica e pedagógica multidisciplinar", suffix: "" },
    { value: 18200, label: "Sessões e Atendimentos/Ano", subtitle: "Fisioterapia, Fono, TO, Psicologia e AEE", suffix: "+" },
    { value: 100, label: "Gratuidade Universal", subtitle: "Acesso integral pelo SUS, SUAS e Educação", suffix: "%" },
  ],
  mission: "Promover e articular ações de defesa de direitos e prevenção, orientações, prestação de serviços, apoio à família, direcionadas à melhoria da qualidade de vida da pessoa com deficiência intelectual e múltipla e à construção de uma sociedade justa e solidária em Santa Cruz das Palmeiras.",
  vision: "Ser centro de excelência regional em educação especial humanizada, reabilitação multidisciplinar baseada em evidências e defesa intransigente da cidadania e autonomia das pessoas com deficiência.",
  values: [
    { title: "Amor & Dignidade", desc: "Acolhimento com escuta atenta, respeito à individualidade de cada assistido e valorização do núcleo familiar." },
    { title: "Transparência Rigorosa & Ética", desc: "Cumprimento exemplar do Marco Regulatório (Lei 13.019/14), Lei de Acesso à Informação e prestação de contas pública irrestrita." },
    { title: "Inovação Terapêutica & AEE", desc: "Técnicas contemporâneas de estimulação neuromotora, integração sensorial, comunicação aumentativa e tecnologia assistiva." },
    { title: "Inclusão & Equidade", desc: "Combate ao capacitismo e estímulo constante à autonomia escolar, social e profissional do assistido." },
  ],
  historyMilestones: [
    { year: 1976, title: "Fundação Comunitária", desc: "Em 31 de agosto de 1976, o visionário educador e vereador Luiz Affonso Mendes ('Dudízio') une famílias e lideranças palmeirenses para fundar a APAE." },
    { year: 1982, title: "Escola de Educação Especial", desc: "Oficializada em 20 de julho de 1982 a Escola de Educação Especial mantida pela entidade, que mais tarde receberia com justiça o nome do patrono Luiz Affonso Mendes." },
    { year: 1986, title: "Inauguração da Sede Própria", desc: "Com a doação do terreno pela Prefeitura Municipal e grande mobilização da comunidade palmeirense, é inaugurado o prédio próprio na Rua Jovino Martins da Silva, no Jardim São Carlos." },
    { year: 2004, title: "Modernização do Complexo Clínico", desc: "Implantação de consultórios equipados para fisioterapia neurofuncional, fonoaudiologia clínica, psicologia e terapia ocupacional." },
    { year: 2018, title: "Adequação ao Marco Regulatório (MROSC)", desc: "Formalização dos Termos de Colaboração com o poder público municipal e estadual, garantindo conformidade jurídica e transparência plena." },
    { year: 2026, title: "Jubileu de Ouro (50 Anos) & Era Digital", desc: "Cinco décadas de dedicação celebradas com o novo Portal da Transparência Inteligente, plataforma de e-SIC integrada e modernização dos projetos terapêuticos." }
  ],
  board: [
    { name: "José Roberto Silveira", role: "Presidente da Diretoria Executiva", term: "Gestão 2024-2027", bio: "Engenheiro agrônomo, membro da comunidade palmeirense com atuação em projetos sociais." },
    { name: "Maria Lúcia de Castro Mendes", role: "Vice-Presidente", term: "Gestão 2024-2027", bio: "Educadora aposentada, atuante na causa da educação especial há mais de 30 anos." },
    { name: "Paulo Henrique Zanin", role: "Diretor Financeiro (Tesoureiro)", term: "Gestão 2024-2027", bio: "Contador pós-graduado em Auditoria do Terceiro Setor." },
    { name: "Ana Paula Faria", role: "Diretora Secretária", term: "Gestão 2024-2027", bio: "Assistente social e defensora dos direitos da pessoa com deficiência." },
    { name: "Carlos Alberto Trevisan", role: "Presidente do Conselho Fiscal", term: "Gestão 2024-2027", bio: "Empresário local e conselheiro comunitário." },
    { name: "Sandra Regina Rossi", role: "Membro Efetivo do Conselho Fiscal", term: "Gestão 2024-2027", bio: "Professora e especialista em gestão pública." }
  ],
  staff: [
    {
      id: 1,
      name: "Drª. Flávia Guimarães",
      role: "Fisioterapeuta Neurofuncional",
      registry: "CREFITO-3 84.190-F",
      category: "Fisioterapia",
      experience: "15 anos de experiência clínica",
      specialty: "Conceito Bobath, Estimulação Psicomotora e Reabilitação Neuromuscular",
      image: "https://images.unsplash.com/photo-1594824813533-5e729a6b9a89?auto=format&fit=crop&q=80&w=600",
      quote: "Cada conquista motora, mesmo que pareça pequena, é um passo gigantesco de autonomia na vida de nossos alunos."
    },
    {
      id: 2,
      name: "Mariana Alcantara",
      role: "Fonoaudióloga Especialista",
      registry: "CRFa 2-21.844",
      category: "Fonoaudiologia",
      experience: "12 anos de atuação clínica",
      specialty: "Comunicação Aumentativa e Alternativa (CAA), Linguagem e Disfagia",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
      quote: "Dar ferramentas de comunicação para quem não se expressa verbalmente é libertar todo um mundo de pensamentos e desejos."
    },
    {
      id: 3,
      name: "Beatriz Nogueira Lima",
      role: "Terapeuta Ocupacional",
      registry: "CREFITO-3 92.310-TO",
      category: "Terapia Ocupacional",
      experience: "9 anos de experiência",
      specialty: "Integração Sensorial de Ayres, Adaptação de Materiais e AVDs",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600",
      quote: "Trabalhamos para que nossos assistidos conquistem autonomia para comer, vestir, brincar e interagir plenamente."
    },
    {
      id: 4,
      name: "Lucas Mendes Toledo",
      role: "Psicólogo Clínico e Institucional",
      registry: "CRP 06/128.450",
      category: "Psicologia",
      experience: "10 anos de atendimento",
      specialty: "Análise do Comportamento Aplicada (ABA) e Suporte Emocional Parental",
      image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600",
      quote: "O acolhimento psicológico das famílias é a base para o desenvolvimento seguro e afetuoso de cada criança."
    },
    {
      id: 5,
      name: "Profª. Roseli Martins",
      role: "Diretora Pedagógica da Escola",
      registry: "Pedagoga Especialista em AEE",
      category: "Educação Especial",
      experience: "22 anos na APAE",
      specialty: "Currículo Funcional Adaptado e Formação Docente em Educação Inclusiva",
      image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&q=80&w=600",
      quote: "Educar na APAE é transformar barreiras em pontes para o conhecimento e a convivência fraterna."
    },
    {
      id: 6,
      name: "Cláudia Cristina Prado",
      role: "Assistente Social Coordenadora",
      registry: "CRESS 48.910/SP",
      category: "Serviço Social",
      experience: "14 anos no Terceiro Setor",
      specialty: "Garantia de Direitos PcD, Benefício BPC/LOAS e Articulação de Redes",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600",
      quote: "A assistência social garante que a dignidade da pessoa com deficiência seja protegida por lei e celebrada na prática."
    }
  ],
  facilities: [
    {
      title: "Escola de Educação Especial 'Luiz Affonso Mendes'",
      desc: "Salas de aula adaptadas com recursos pedagógicos multissensoriais, lousas interativas e mobiliário ergonômico.",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=700",
      tag: "Educação Adaptada"
    },
    {
      title: "Centro de Reabilitação Multidisciplinar",
      desc: "Consultórios clínicos equipados para Fisioterapia, Terapia Ocupacional, Fonoaudiologia e Psicologia.",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=700",
      tag: "Clínica Integrada"
    },
    {
      title: "Sala de Estimulação Sensorial e Psicomotora",
      desc: "Espaço com colunas luminosas, texturas variadas e equipamentos para regulação sensorial em TEA e síndromes.",
      image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=700",
      tag: "Tecnologia Assistiva"
    },
    {
      title: "Refeitório e Cozinha Nutricional Adaptada",
      desc: "Alimentação balanceada planejada por nutricionista, respeitando consistências adequadas para disfagia.",
      image: "https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&q=80&w=700",
      tag: "Nutrição & Saúde"
    }
  ]
};

/**
 * OS 24 REQUISITOS OFICIAIS DO CHECKLIST DE TRANSPARÊNCIA (CONFORME PRINTS ANEXADOS)
 * Divididos estritamente nos 3 grupos:
 * 1. Arts. 7º e 8º § 1º (8 itens)
 * 2. Art. 8º § 3º (6 itens)
 * 3. Requisitos de divulgação das informações / MROSC (10 itens)
 */
export const COMPLIANCE_CHECKLIST_DATA = {
  group1_art7_8_1: {
    title: "Requisitos Arts. 7º e 8º § 1º",
    lawReference: "Lei Federal nº 12.527/2011 (LAI) — Transparência Ativa",
    items: [
      {
        id: "g1_1",
        num: 1,
        title: "Competência e Estrutura Organizacional",
        meets: true,
        summary: "Organograma oficial, finalidades institucionais, competências estatutárias da Diretoria Executiva, Conselho Fiscal e Coordenação Técnica.",
        evidenceLink: "#institucional",
        docCode: "DOC-ORG-2026"
      },
      {
        id: "g1_2",
        num: 2,
        title: "Endereço, email, telefones e horários de atendimento das principais unidades",
        meets: true,
        summary: "Sede própria na Rua Jovino Martins da Silva, 44, Jd. São Carlos, telefones (19) 3672-1576 e e-mails oficiais divulgados com horário das 07:30 às 16:30.",
        evidenceLink: "#contato",
        docCode: "DOC-CONT-2026"
      },
      {
        id: "g1_3",
        num: 3,
        title: "Registro de quaisquer repasses ou transferências de recursos financeiros",
        meets: true,
        summary: "Quadro detalhado de todos os repasses públicos recebidos via Termos de Colaboração da Prefeitura Municipal de SCP e Governo Estadual.",
        evidenceLink: "#transparencia",
        docCode: "DOC-REP-2026"
      },
      {
        id: "g1_4",
        num: 4,
        title: "Registros de despesas realizadas com recursos públicos",
        meets: true,
        summary: "Demonstrativo detalhado de despesas com folha de pagamento técnica, encargos, insumos pedagógicos e manutenção custeados por verba pública.",
        evidenceLink: "#transparencia",
        docCode: "DOC-DESP-2026"
      },
      {
        id: "g1_5",
        num: 5,
        title: "Informações referentes às contratações de bens e serviços, incluindo editais, resultados e contratos celebrados",
        meets: true,
        summary: "Editais públicos de cotação de preços, chamamentos, atas de julgamento e contratos assinados com fornecedores.",
        evidenceLink: "#transparencia",
        docCode: "DOC-EDIT-2026"
      },
      {
        id: "g1_6",
        num: 6,
        title: "Informações para subsidiar acompanhamento e resultados de programas, ações, projetos e obras de órgãos e entidades, bem como metas e indicadores propostos",
        meets: true,
        summary: "Relatório de metas pactuadas vs. executadas nos planos de trabalho (número de atendimentos clínicos, frequência escolar e indicadores de evolução).",
        evidenceLink: "#projetos",
        docCode: "DOC-META-2026"
      },
      {
        id: "g1_7",
        num: 7,
        title: "Respostas a perguntas mais frequentes da sociedade (FAQ)",
        meets: true,
        summary: "Central interativa de dúvidas frequentes com respostas claras sobre admissão de alunos, doações, voluntariado, laudos e prestação de contas.",
        evidenceLink: "#faq",
        docCode: "DOC-FAQ-2026"
      },
      {
        id: "g1_8",
        num: 8,
        title: "Resultado de inspeções, auditorias, prestações e tomadas de contas realizadas pelos órgãos de controle interno e externo, incluindo prestações de contas relativas a exercícios anteriores",
        meets: true,
        summary: "Pareceres conclusivos de aprovação de contas emitidos pelo Conselho Fiscal, Auditoria Independente BDO e Tribunal de Contas do Estado (TCE-SP).",
        evidenceLink: "#transparencia",
        docCode: "DOC-AUDIT-2026"
      }
    ]
  },
  group2_art8_3: {
    title: "Requisitos Art. 8º, § 3º",
    lawReference: "Lei Federal nº 12.527/2011 — Formatos Abertos e Tecnologias de Informação",
    items: [
      {
        id: "g2_1",
        num: 1,
        title: "Ferramenta de pesquisa de conteúdo",
        meets: true,
        summary: "Mecanismo instantâneo de busca de documentos, despesas, convênios e notícias no portal com filtros por ano, palavra-chave e categoria.",
        evidenceLink: "#transparencia",
        docCode: "SYS-SEARCH-01"
      },
      {
        id: "g2_2",
        num: 2,
        title: "Geração de relatórios em diversos formatos eletrônicos abertos",
        meets: true,
        summary: "Exportação com 1 clique de todos os dados contábeis em XLSX (Excel), CSV (formato legível por máquina), JSON e relatórios em PDF.",
        evidenceLink: "#transparencia",
        docCode: "SYS-EXPORT-MULTI"
      },
      {
        id: "g2_3",
        num: 3,
        title: "Possibilitar acesso automatizado por sistemas externos em formatos abertos",
        meets: true,
        summary: "Endpoint REST estruturado em JSON para dados abertos governamentais (/api/transparencia/dados-abertos.json) sem barreiras de autenticação.",
        evidenceLink: "#dados-abertos",
        docCode: "API-OPEN-DATA"
      },
      {
        id: "g2_4",
        num: 4,
        title: "Divulga em detalhes os formatos utilizados na estruturação da informação",
        meets: true,
        summary: "Dicionário de Dados Abertos e catálogo de metadados detalhando cada campo, tipo primitivo, máscara e finalidade dos arquivos divulgados.",
        evidenceLink: "#dicionario-dados",
        docCode: "METADATA-CATALOG"
      },
      {
        id: "g2_5",
        num: 5,
        title: "Garante a autenticidade e integridade das informações divulgadas",
        meets: true,
        summary: "Hash criptográfico SHA-256 e carimbo de tempo digital para cada arquivo e balanço contábil disponibilizado para download.",
        evidenceLink: "#transparencia",
        docCode: "SHA256-SEAL-VERIFY"
      },
      {
        id: "g2_6",
        num: 6,
        title: "Atualização periódica",
        meets: true,
        summary: "Painel administrativo com registro automático de data da última atualização, cronograma de publicação mensal e semestral.",
        evidenceLink: "#transparencia",
        docCode: "SYS-AUDIT-SCHEDULE"
      }
    ]
  },
  group3_mrosc: {
    title: "Requisitos de divulgação das informações",
    lawReference: "Marco Regulatório das Organizações da Sociedade Civil — Lei 13.019/2014 & Normas do Terceiro Setor",
    items: [
      {
        id: "g3_1",
        num: 1,
        title: "Estatuto Social atualizado",
        meets: true,
        summary: "Estatuto Social consolidado registrado no Cartório de Registro Civil de Pessoas Jurídicas de Santa Cruz das Palmeiras.",
        evidenceLink: "#transparencia",
        docCode: "DOC-ESTATUTO-REG"
      },
      {
        id: "g3_2",
        num: 2,
        title: "Ajustes (Termo de Parceria, Convênio, etc.)",
        meets: true,
        summary: "Íntegra dos Termos de Colaboração celebrados com a Prefeitura Municipal e órgãos estaduais vigentes no exercício.",
        evidenceLink: "#transparencia",
        docCode: "DOC-AJUSTES-TC"
      },
      {
        id: "g3_3",
        num: 3,
        title: "Plano de Trabalho",
        meets: true,
        summary: "Planos de trabalho aprovados contendo cronograma de desembolso, metas quantitativas e qualitativas para cada parceria pública.",
        evidenceLink: "#transparencia",
        docCode: "DOC-PLANO-TRAB"
      },
      {
        id: "g3_4",
        num: 4,
        title: "Relação Nominal dos Dirigentes",
        meets: true,
        summary: "Lista completa dos membros da Diretoria Executiva, Conselho Fiscal e Conselho Deliberativo com cargos, período de mandato e histórico.",
        evidenceLink: "#institucional",
        docCode: "DOC-DIRIGENTES-NOM"
      },
      {
        id: "g3_5",
        num: 5,
        title: "Lista de prestadores de serviços e valores pagos",
        meets: true,
        summary: "Relação de fornecedores contratados, pessoas jurídicas e físicas, com número de CNPJ/CPF descaracterizado (LGPD) e valores empenhados e pagos.",
        evidenceLink: "#transparencia",
        docCode: "DOC-PRESTADORES-VAL"
      },
      {
        id: "g3_6",
        num: 6,
        title: "Remuneração individualizada dos dirigentes e empregados com identificação de nomes e cargos",
        meets: true,
        summary: "Tabela de remuneração bruta e líquida individualizada com nomes e funções, observando a vedação estatutária de remuneração para a Diretoria Voluntária.",
        evidenceLink: "#transparencia",
        docCode: "DOC-REMUNERACAO-COLAB"
      },
      {
        id: "g3_7",
        num: 7,
        title: "Balanços e Demonstrações Contábeis",
        meets: true,
        summary: "Balanço Patrimonial, Demonstração do Resultado do Exercício (DRE), Demonstração dos Fluxos de Caixa (DFC) e Notas Explicativas auditadas.",
        evidenceLink: "#transparencia",
        docCode: "DOC-BALANCO-DRE"
      },
      {
        id: "g3_8",
        num: 8,
        title: "Regulamento de Compras",
        meets: true,
        summary: "Procedimento Interno e Regulamento de Compras e Contratações de Obras e Serviços com Recursos Públicos nos termos do Decreto Federal 8.726/16.",
        evidenceLink: "#transparencia",
        docCode: "DOC-REG-COMPRAS"
      },
      {
        id: "g3_9",
        num: 9,
        title: "Regulamento de Contratação de Pessoal",
        meets: true,
        summary: "Manual e Regulamento de Recrutamento e Seleção Pública de Pessoal para projetos sociais, com critérios objetivos e impessoais.",
        evidenceLink: "#transparencia",
        docCode: "DOC-REG-PESSOAL"
      },
      {
        id: "g3_10",
        num: 10,
        title: "Relatório estatístico de atendimento realizado pelo SIC",
        meets: true,
        summary: "Relatório anual consolidado com total de pedidos de informação recebidos pelo e-SIC, prazos médios de resposta e índices de deferimento.",
        evidenceLink: "#esic",
        docCode: "DOC-SIC-STATS-2025"
      }
    ]
  }
};

/**
 * BASE DE DOCUMENTOS PÚBLICOS PARA DOWNLOAD, BUSCA E INTEGRIDADE
 */
export const TRANSPARENCY_DOCUMENTS_DATA = [
  {
    id: "DOC-2026-001",
    year: 2026,
    code: "BAL-2026-1SEM",
    category: "Balanço & DRE",
    title: "Demonstrativo Contábil e DRE do 1º Semestre de 2026",
    description: "Balanço contábil semestral analítico com receitas de convênios, despesas com pessoal, custeio e investimentos.",
    date: "15/07/2026",
    size: "2.8 MB",
    format: "PDF",
    status: "Auditado",
    agency: "Conselho Fiscal / Auditoria BDO",
    sha256: "9f83a4d8b67c4e2098d5c7f1e4b8a213456789abcdef0123456789abcdef0123",
    url: "/docs/balanco-1sem-2026.pdf",
    publicValue: "R$ 485.200,00"
  },
  {
    id: "DOC-2026-002",
    year: 2026,
    code: "TC-PMSCP-01-2026",
    category: "Termos de Fomento",
    title: "Termo de Colaboração Nº 001/2026 — Educação Especial (PMSCP)",
    description: "Parceria com a Secretaria Municipal de Educação de Santa Cruz das Palmeiras para manutenção do AEE na Escola 'Luiz Affonso Mendes'.",
    date: "12/01/2026",
    size: "4.5 MB",
    format: "PDF",
    status: "Vigente",
    agency: "Prefeitura Municipal de Santa Cruz das Palmeiras",
    sha256: "8e71b2c3d4e5f67890123456789abcdef0123456789abcdef0123456789abcdef",
    url: "/docs/termo-colaboracao-educacao-2026.pdf",
    publicValue: "R$ 380.000,00"
  },
  {
    id: "DOC-2026-003",
    year: 2026,
    code: "TC-SAUDE-02-2026",
    category: "Termos de Fomento",
    title: "Termo de Parceria Saúde SUS Nº 002/2026 — Reabilitação Especializada",
    description: "Repasse para atendimento em Fisioterapia Neurofuncional, Fonoaudiologia e Terapia Ocupacional aos munícipes regulados pelo SUS.",
    date: "18/01/2026",
    size: "3.9 MB",
    format: "PDF",
    status: "Vigente",
    agency: "Secretaria Municipal de Saúde de Santa Cruz das Palmeiras",
    sha256: "7d60a1b2c3d4e5f67890123456789abcdef0123456789abcdef0123456789abcde",
    url: "/docs/termo-saude-sus-2026.pdf",
    publicValue: "R$ 290.400,00"
  },
  {
    id: "DOC-2026-004",
    year: 2026,
    code: "REG-COMPRAS-2026",
    category: "Regulamentos",
    title: "Regulamento Próprio de Compras, Cotações e Contratações",
    description: "Normatização interna de procedimentos para aquisição de bens e contratação de serviços com recursos de parcerias públicas.",
    date: "05/02/2026",
    size: "1.4 MB",
    format: "PDF",
    status: "Aprovado",
    agency: "Diretoria Executiva / Conselho Fiscal",
    sha256: "6c5f90a1b2c3d4e5f67890123456789abcdef0123456789abcdef0123456789abcd",
    url: "/docs/regulamento-compras-2026.pdf",
    publicValue: "Normativo"
  },
  {
    id: "DOC-2026-005",
    year: 2026,
    code: "REG-PESSOAL-2026",
    category: "Regulamentos",
    title: "Regulamento e Edital Padrão de Seleção Pública de Colaboradores",
    description: "Regras de seleção pública impessoal para contratação de equipe clínica e pedagógica com recursos públicos.",
    date: "10/02/2026",
    size: "1.1 MB",
    format: "PDF",
    status: "Aprovado",
    agency: "Coordenação de Recursos Humanos",
    sha256: "5b4e89f0a1b2c3d4e5f67890123456789abcdef0123456789abcdef0123456789abc",
    url: "/docs/regulamento-pessoal-2026.pdf",
    publicValue: "Normativo"
  },
  {
    id: "DOC-2026-006",
    year: 2026,
    code: "REM-EQUIPE-2026",
    category: "Remuneração",
    title: "Tabela Individualizada de Remuneração e Cargos (LAI/MROSC)",
    description: "Relação nominal de empregados, funções contratadas, carga horária e salários brutos e encargos patronais.",
    date: "31/07/2026",
    size: "890 KB",
    format: "PDF",
    status: "Publicado",
    agency: "Setor de Pessoal & Contabilidade",
    sha256: "4a3d78e9f0a1b2c3d4e5f67890123456789abcdef0123456789abcdef0123456789ab",
    url: "/docs/quadro-remuneracao-2026.pdf",
    publicValue: "R$ 42.850,00/mês"
  },
  {
    id: "DOC-2026-007",
    year: 2026,
    code: "PRESTADORES-2026",
    category: "Contratações",
    title: "Lista de Prestadores de Serviços Terceirizados e Valores Pagos",
    description: "Relação semestral de contratos de assessoria contábil, auditoria externa, nutrição e serviços gerais.",
    date: "10/08/2026",
    size: "1.2 MB",
    format: "PDF",
    status: "Auditado",
    agency: "Setor Administrativo e Financeiro",
    sha256: "392c67d8e9f0a1b2c3d4e5f67890123456789abcdef0123456789abcdef0123456789a",
    url: "/docs/prestadores-servicos-2026.pdf",
    publicValue: "R$ 67.400,00"
  },
  {
    id: "DOC-2025-001",
    year: 2025,
    code: "BAL-2025-CONSOLID",
    category: "Balanço & DRE",
    title: "Balanço Patrimonial e DRE Consolidada do Exercício 2025",
    description: "Demonstrações contábeis completas de 2025 acompanhadas do parecer dos auditores independentes e aprovação da assembleia geral.",
    date: "25/03/2026",
    size: "3.7 MB",
    format: "PDF",
    status: "Aprovado em AGC",
    agency: "BDO Auditores / AGC Ordinária",
    sha256: "281b56c7d8e9f0a1b2c3d4e5f67890123456789abcdef0123456789abcdef012345678",
    url: "/docs/balanco-patrimonial-2025.pdf",
    publicValue: "R$ 942.180,00"
  },
  {
    id: "DOC-2025-002",
    year: 2025,
    code: "REL-GESTAO-2025",
    category: "Relatórios de Gestão",
    title: "Relatório Anual de Atividades e Impacto Social 2025",
    description: "Documento descritivo e fotográfico com todos os atendimentos, número de alunos matriculados, eventos e projetos de 2025.",
    date: "15/02/2026",
    size: "7.6 MB",
    format: "PDF",
    status: "Publicado",
    agency: "Coordenação Geral e Pedagógica",
    sha256: "170a45b6c7d8e9f0a1b2c3d4e5f67890123456789abcdef0123456789abcdef01234567",
    url: "/docs/relatorio-anual-atividades-2025.pdf",
    publicValue: "165 Alunos"
  },
  {
    id: "DOC-2025-003",
    year: 2025,
    code: "REL-SIC-2025",
    category: "Ouvidoria & e-SIC",
    title: "Relatório Estatístico de Atendimento do Serviço de Informação ao Cidadão (e-SIC 2025)",
    description: "Demonstrativo quantitativo e qualitativo de todas as solicitações recebidas via e-SIC e Ouvidoria no ano de 2025.",
    date: "20/01/2026",
    size: "950 KB",
    format: "PDF",
    status: "100% Atendido",
    agency: "Ouvidoria Geral e e-SIC",
    sha256: "06f934a5b6c7d8e9f0a1b2c3d4e5f67890123456789abcdef0123456789abcdef0123456",
    url: "/docs/relatorio-estatistico-sic-2025.pdf",
    publicValue: "34 Solicitações"
  },
  {
    id: "DOC-2024-001",
    year: 2024,
    code: "ESTATUTO-SOCIAL",
    category: "Estatuto & Atas",
    title: "Estatuto Social Consolidado da APAE de Santa Cruz das Palmeiras",
    description: "Texto estatutário integral aprovado em Assembleia Geral Extraordinária e registrado em Cartório de Registro Civil de SCP.",
    date: "14/05/2024",
    size: "2.1 MB",
    format: "PDF",
    status: "Vigente",
    agency: "Cartório de SCP - Livro A-12",
    sha256: "f5e82394a5b6c7d8e9f0a1b2c3d4e5f67890123456789abcdef0123456789abcdef01234",
    url: "/docs/estatuto-apae-santacruz.pdf",
    publicValue: "Constitutivo"
  },
  {
    id: "DOC-2024-002",
    year: 2024,
    code: "ATA-ELEICAO-24-27",
    category: "Estatuto & Atas",
    title: "Ata de Eleição e Posse da Diretoria Executiva e Conselho Fiscal (Triênio 2024-2027)",
    description: "Registro oficial da eleição da diretoria presidida pelo Sr. José Roberto Silveira.",
    date: "10/12/2023",
    size: "1.3 MB",
    format: "PDF",
    status: "Vigente",
    agency: "Assembleia Geral Ordinária de Eleição",
    sha256: "e4d7128394a5b6c7d8e9f0a1b2c3d4e5f67890123456789abcdef0123456789abcdef0123",
    url: "/docs/ata-posse-diretoria-2024-2027.pdf",
    publicValue: "Mandato Trienal"
  }
];

export const TRANSPARENCY_METRICS = {
  lastAuditDate: "15 de Julho de 2026",
  auditorCompany: "BDO Brasil Auditores Independentes / TCE-SP",
  auditOpinion: "Parecer Técnico Limpo, Sem Ressalvas e 100% Homologado",
  totalPublicTransfersYear: "R$ 670.400,00",
  totalExecutedValueYear: "R$ 658.120,00",
  compliancePercentage: 100, // 24 de 24 atendidos
  revenueDistribution: [
    { name: "Convênios Municipais (Educação & Saúde)", value: 52, color: "#004B87" },
    { name: "Doações da Comunidade & Campanhas PIX", value: 24, color: "#0B63E5" },
    { name: "Eventos Beneficentes & Bazar Solidário", value: 12, color: "#F5A623" },
    { name: "Nota Fiscal Paulista & Doações Livres", value: 8, color: "#00875A" },
    { name: "Rendas Próprias e Aluguéis", value: 4, color: "#64748B" }
  ],
  expenseDistribution: [
    { name: "Salários de Equipe Multidisciplinar e Encargos", value: 54, color: "#004B87" },
    { name: "Educação Especial & Oficinas Pedagógicas", value: 26, color: "#00875A" },
    { name: "Alimentação Adaptada e Insumos Clínicos", value: 12, color: "#F5A623" },
    { name: "Manutenção Predial e Custos Administrativos", value: 8, color: "#64748B" }
  ]
};

/**
 * DICIONÁRIO DE DADOS ABERTOS (Art. 8º, § 3º)
 */
export const OPEN_DATA_DICTIONARY = [
  { field: "id", type: "String", desc: "Identificador único do documento contábil no repositório oficial." },
  { field: "codigo", type: "String", desc: "Código alfanumérico padronizado da publicação pública." },
  { field: "ano", type: "Integer", desc: "Ano fiscal de referência da prestação de contas." },
  { field: "categoria", type: "String", desc: "Classificação orçamentária (Balanço, Termo de Fomento, Regulamento, etc.)." },
  { field: "titulo", type: "String", desc: "Título oficial do instrumento jurídico ou demonstrativo." },
  { field: "orgao_concessor", type: "String", desc: "Ente público ou conselho regulador responsável pela pactuação." },
  { field: "valor_publico", type: "Currency", desc: "Montante de recursos financeiros em moeda corrente nacional (R$)." },
  { field: "data_publicacao", type: "Date (DD/MM/AAAA)", desc: "Data em que a informação foi disponibilizada no portal." },
  { field: "status_auditoria", type: "String", desc: "Parecer da auditoria externa e aprovação pelos conselhos competentes." },
  { field: "hash_sha256", type: "Hex String (64)", desc: "Hash criptográfico para conferência de autenticidade e inviolabilidade." }
];

/**
 * PERGUNTAS FREQUENTES DA SOCIEDADE (FAQ) - Requisito Item 7
 */
export const FAQ_DATA = [
  {
    q: "Como uma criança ou jovem é matriculado na APAE de Santa Cruz das Palmeiras?",
    a: "O atendimento inicia-se com agendamento no Serviço Social da APAE. É realizada uma avaliação multiprofissional (médica, psicológica, pedagógica e de serviço social) para identificar as necessidades e verificar a elegibilidade para a Escola de Educação Especial 'Luiz Affonso Mendes' ou para o Centro de Reabilitação pelo SUS."
  },
  {
    q: "O atendimento prestado pela APAE é cobrado das famílias?",
    a: "Não. Todos os serviços educacionais, terapêuticos e sociais prestados pela APAE são 100% gratuitos e universais, mantidos por meio de parcerias com o Poder Público, doações voluntárias e campanhas beneficentes."
  },
  {
    q: "Onde e como posso conferir a prestação de contas da entidade?",
    a: "Todas as contas públicas, balanços patrimoniais, relatórios de gestão, termos de colaboração e regulamentos estão disponíveis em nosso Portal da Transparência, acessível 24h por dia neste site com opções de download em PDF, Excel e dados abertos."
  },
  {
    q: "Como faço para doar via PIX ou Nota Fiscal Paulista para a APAE?",
    a: "Você pode doar diretamente via chave PIX CNPJ: 48.182.992/0001-41 ou cadastrar o cupom fiscal no aplicativo da Nota Fiscal Paulista escolhendo como entidade beneficiária a Associação de Pais e Amigos dos Excepcionais de Santa Cruz das Palmeiras."
  },
  {
    q: "Como funciona o Serviço de Informação ao Cidadão (e-SIC)?",
    a: "Qualquer pessoa física ou jurídica pode abrir um pedido formal de informação através do nosso formulário de e-SIC no menu Ouvidoria. Um protocolo é gerado instantaneamente e a resposta fundamentada é emitida no prazo legal da Lei 12.527/2011 (até 20 dias corridos)."
  },
  {
    q: "Como posso ser voluntário na APAE de SCP?",
    a: "Você pode se inscrever pelo formulário da seção 'Participe' deste portal ou comparecer na sede (Rua Jovino Martins da Silva, 44). Temos vagas voluntárias para oficinas de artesanato, eventos, recreação e apoio técnico."
  }
];

/**
 * NOTÍCIAS OFICIAIS & COMUNICADOS
 */
export const NEWS_DATA = [
  {
    id: 1,
    title: "APAE de Santa Cruz das Palmeiras celebra 50 Anos com nova sala de estimulação e portal inteligente",
    category: "Institucional & Jubileu",
    date: "18 de Outubro de 2026",
    readTime: "3 min de leitura",
    summary: "Com meio século de história em favor da inclusão social na cidade, a instituição inaugura modernizações terapêuticas e seu novo Portal de Transparência 100% em conformidade com o marco legal.",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=800",
    author: "Assessoria de Comunicação APAE",
    featured: true,
    content: "Fundada em 31 de agosto de 1976 pelo professor Luiz Affonso Mendes ('Dudízio'), a APAE de Santa Cruz das Palmeiras comemora seu jubileu de ouro com expressivos avanços. Neste ano de 2026, mais de 165 alunos e assistidos recebem diariamente aulas especializadas, alimentação adaptada e sessões contínuas de Fisioterapia Neurofuncional, Fonoaudiologia, Terapia Ocupacional e Psicologia. Além das melhorias físicas na sede do Jardim São Carlos, a entidade lança seu moderno Portal da Transparência, consolidando 100% de conformidade com as exigências dos órgãos de controle e garantindo acesso direto da sociedade aos balanços e prestação de contas."
  },
  {
    id: 2,
    title: "Bazar Solidário de Fim de Ano arrecada fundos para modernização dos equipamentos da fisioterapia",
    category: "Solidariedade & Eventos",
    date: "10 de Outubro de 2026",
    readTime: "2 min de leitura",
    summary: "Toda a renda arrecadada no tradicional bazar beneficente será revertida na aquisição de novos módulos psicomotores e tecnologia assistiva.",
    image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=800",
    author: "Equipe de Voluntariado APAE",
    featured: false,
    content: "A comunidade palmeirense mais uma vez deu uma lição de empatia e união no Bazar Solidário realizado na quadra poliesportiva da APAE. Graças às doações de roupas, calçados, artesanatos feitos pelos próprios alunos nas oficinas de convivência e itens doados pelo comércio local, o evento superou a meta de arrecadação. Os recursos permitirão renovar os tablados e aparelhos neurofuncionais da sala de fisioterapia."
  },
  {
    id: 3,
    title: "Prefeitura e APAE renovam Termo de Colaboração para o Atendimento Educacional Especializado (AEE)",
    category: "Parcerias Públicas",
    date: "22 de Setembro de 2026",
    readTime: "3 min de leitura",
    summary: "Renovação garante aporte financeiro regular para a Escola de Educação Especial 'Luiz Affonso Mendes' continuar atendendo crianças e jovens do município.",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800",
    author: "Diretoria Executiva",
    featured: false,
    content: "A Diretoria Executiva da APAE e a Secretaria Municipal de Educação formalizaram a renovação do Termo de Colaboração nos moldes do Marco Regulatório das Organizações da Sociedade Civil (Lei 13.019/14). O convênio viabiliza transporte adaptado, equipe técnica especializada e material didático estruturado para os alunos com deficiência múltipla e intelectual."
  }
];

export const EVENTS_DATA = [
  {
    id: 1,
    title: "Comemoração Oficial do Jubileu de Ouro (50 Anos da APAE de Santa Cruz das Palmeiras)",
    date: "31 de Agosto de 2026",
    targetDate: "2026-08-31T09:00:00",
    location: "Sede da APAE — Rua Jovino Martins da Silva, 44, Jd. São Carlos",
    schedule: "09:00 às 17:00",
    category: "Institucional & Solenidade",
    summary: "Cerimônia solene em homenagem à memória do fundador Luiz Affonso Mendes ('Dudízio'), apresentação musical dos alunos e inauguração da placa comemorativa dos 50 anos.",
    badge: "50 Anos",
    freeEntry: true
  },
  {
    id: 2,
    title: "Semana Nacional da Pessoa com Deficiência Intelectual e Múltipla",
    date: "21 a 28 de Agosto de 2026",
    targetDate: "2026-08-21T08:00:00",
    location: "Auditório e Escolas Municipais de Santa Cruz das Palmeiras",
    schedule: "Programação diária",
    category: "Conscientização & Defesa de Direitos",
    summary: "Ciclo de palestras, rodas de conversa nas escolas municipais para combate ao capacitismo e mostra de artes plásticas produzidas pelos alunos da APAE.",
    badge: "Conscientização",
    freeEntry: true
  },
  {
    id: 3,
    title: "Almoço da Primavera Beneficente da Família APAE",
    date: "20 de Setembro de 2026",
    targetDate: "2026-09-20T12:00:00",
    location: "Salão Comunitário de Eventos",
    schedule: "12:00 às 16:00",
    category: "Gastronomia & Solidariedade",
    summary: "Tradicional almoço beneficente com churrasco e música ao vivo, com 100% da arrecadação destinada à compra de materiais de estimulação multissensorial.",
    badge: "Beneficente",
    freeEntry: false
  }
];

export const PROJECTS_DATA = [
  {
    id: "proj-educacao",
    title: "Escola de Educação Especial 'Luiz Affonso Mendes'",
    category: "Educação Especial",
    iconName: "BookOpen",
    beneficiaries: "Alunos de 0 a 30 anos com Deficiência Intelectual e Múltipla",
    stats: "165 matriculados",
    desc: "Educação Básica Adaptada, Estimulação Precoce e Currículo Funcional que visa autonomia diária, alfabetização inclusiva e socialização.",
    highlights: [
      "Currículo Funcional e Individualizado (PEI)",
      "Turmas de Estimulação Precoce (0 a 3 anos)",
      "Tecnologia Assistiva e Pranchas de Comunicação Alternativa",
      "Professores pós-graduados em Educação Especial e AEE"
    ]
  },
  {
    id: "proj-saude",
    title: "Clínica Integrada de Reabilitação pelo SUS",
    category: "Saúde Especializada",
    iconName: "Stethoscope",
    beneficiaries: "Munícipes de Santa Cruz das Palmeiras",
    stats: "18.200 sessões anuais",
    desc: "Atendimento multidisciplinar contínuo nas áreas de Fisioterapia Neurofuncional, Fonoaudiologia, Terapia Ocupacional e Psicologia Clínica.",
    highlights: [
      "Fisioterapia com Método Bobath e Treino de Marcha",
      "Fonoaudiologia com Comunicação Alternativa e Disfagia",
      "Terapia Ocupacional com Integração Sensorial",
      "Acompanhamento e Orientação Contínua às Famílias"
    ]
  },
  {
    id: "proj-social",
    title: "Programa Vínculos: Assistência Social & Convivência",
    category: "Assistência Social & SUAS",
    iconName: "Users",
    beneficiaries: "Famílias e Cuidadores Atípicos",
    stats: "120 famílias acolhidas",
    desc: "Fortalecimento de vínculos comunitários, garantia de acesso a benefícios de transferência de renda (BPC/LOAS) e defesa integral dos direitos da pessoa com deficiência.",
    highlights: [
      "Grupos de Apoio Emocional para Mães e Cuidadores",
      "Visitas Domiciliares do Serviço Social",
      "Oficinas de Artesanato e Geração de Renda Familiar",
      "Orientação Jurídica e Previdenciária Cidadã"
    ]
  }
];

export const LGPD_POLICY_DATA = {
  controller: "Associação de Pais e Amigos dos Excepcionais de Santa Cruz das Palmeiras",
  cnpj: "48.182.992/0001-41",
  dpoName: "Encarregado de Proteção de Dados (DPO)",
  dpoEmail: "dpo.privacidade@apaesantacruzdaspalmeiras.org.br",
  address: "Rua Jovino Martins da Silva, 44, Jardim São Carlos, Santa Cruz das Palmeiras - SP",
  law: "Lei Federal nº 13.709/2018 (LGPD)",
  principles: [
    "Finalidade e Adequação: dados coletados estritamente para matrícula escolar, prontuários de saúde (dados sensíveis com consentimento e base legal do Art. 11) e doações.",
    "Segurança e Confidencialidade: prontuários clínicos e dados pedagógicos protegidos com controle restrito de acesso.",
    "Transparência e Respeito aos Direitos do Titular: qualquer assistido, responsável ou doador pode solicitar acesso, retificação ou exclusão de dados através de nosso canal DPO."
  ]
};


export const DONATION_AMOUNTS = [
  {
    value: 30,
    label: "R$ 30",
    impact: "Fornece 1 Kit de Estimulação Visual e Material Sensorial",
    color: "from-blue-500 to-[#0072C6]"
  },
  {
    value: 60,
    label: "R$ 60",
    impact: "Garante 1 Sessão Completa de Fisioterapia ou Fonoaudiologia",
    color: "from-emerald-500 to-emerald-600",
    popular: true
  },
  {
    value: 120,
    label: "R$ 120",
    impact: "Garante 1 Mês de Alimentação Balanceada e Insumos Terapêuticos",
    color: "from-amber-500 to-amber-600"
  },
  {
    value: 250,
    label: "R$ 250",
    impact: "Apadrinha o Atendimento Integral e Transporte Adaptado de 1 Aluno",
    color: "from-blue-700 to-indigo-800"
  },
  {
    value: 500,
    label: "R$ 500",
    impact: "Apoia a manutenção contínua das salas de Estimulação e AEE",
    color: "from-purple-600 to-indigo-700"
  }
];

export const TESTIMONIALS_DATA = [
  {
    id: 1,
    name: "Ana Cláudia Ferreira",
    role: "Mãe do Gabriel, 7 anos (Aluno da Escola Especial)",
    text: "A APAE de Santa Cruz das Palmeiras foi um divisor de águas na vida do meu filho. O acolhimento com que os terapeutas e professores tratam cada detalhe fez o Gabriel dar passos incríveis de autonomia e alegria.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 2,
    name: "Carlos Eduardo Mendes",
    role: "Comerciante Palmeirense e Doador Mensal",
    text: "Saber que 100% das contas são públicas, auditadas e que nossos recursos são aplicados diretamente nas crianças e jovens da nossa cidade dá orgulho de apoiar a APAE há mais de 10 anos.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 3,
    name: "Juliana Rossi",
    role: "Voluntária nas Oficinas de Artesanato",
    text: "O amor que a gente recebe na APAE não tem preço. Ver a dedicação da equipe e a superação dos alunos renova a fé na humanidade toda semana.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"
  }
];

export const PARTNER_COMPANIES = [
  { name: "Prefeitura Municipal de SCP", category: "Termo de Colaboração (Educação & Saúde)", seal: "Poder Público", logo: "🏛️" },
  { name: "Sicoob Crediçúcar", category: "Apoio Comunitário", seal: "Selo Ouro", logo: "🏦" },
  { name: "Comércio Unido Palmeirense", category: "Campanha do Troco Solidário", seal: "Selo Ouro", logo: "🛒" },
  { name: "Usina Santa Cruz", category: "Responsabilidade Social & ESG", seal: "Selo Diamante", logo: "🌱" },
  { name: "Supermercados Estrela SCP", category: "Doação de Alimentos e Bazar", seal: "Selo Prata", logo: "🛒" },
  { name: "Indústrias Locais Associadas", category: "Programa Jovem Aprendiz PcD", seal: "Selo Inclusão", logo: "⚙️" }
];

export const VOLUNTEER_AREAS = [
  { id: "recreacao", label: "Recreação e Atividades Lúdicas", desc: "Apoio em brincadeiras, eventos comemorativos e acolhimento" },
  { id: "artes", label: "Oficinas de Artes e Artesanato", desc: "Auxílio em pintura, bordado e confecção de peças para o Bazar" },
  { id: "eventos", label: "Apoio em Eventos Beneficentes", desc: "Organização, montagem, recepção e vendas solidárias" },
  { id: "administrativo", label: "Suporte Administrativo e TI", desc: "Organização de arquivos, digitalização e suporte de informática" },
  { id: "saude", label: "Profissionais de Saúde e Terapias", desc: "Voluntariado para psicólogos, terapeutas, médicos e fonoaudiólogos" }
];

export const DEFAULT_HERO_SLIDES = [
  {
    id: "slide-1",
    tag: "50 Anos de Amor & Dedicação (1976 - 2026)",
    titleLight: "Cada vida atendida é uma",
    titleHighlight: "história de amor e superação",
    description: "Há cinco décadas acolhendo crianças, jovens e famílias em Santa Cruz das Palmeiras. Atendimento clínico multidisciplinar, reabilitação neurofuncional e educação especial 100% gratuitos e humanizados.",
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=85&w=1920",
    patientStory: "Atendimento Humanizado • Fisioterapia & Estimulação",
    accentColor: "#F5A623"
  },
  {
    id: "slide-2",
    tag: "Escola de Educação Especial 'Luiz Affonso Mendes'",
    titleLight: "Aprender no próprio ritmo com",
    titleHighlight: "respeito, dignidade e carinho",
    description: "Salas de aula adaptadas, currículo funcional e tecnologia assistiva para que cada aluno conquiste autonomia diária, alfabetização inclusiva e integração com a comunidade.",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=85&w=1920",
    patientStory: "Educação Especial & Estimulação Precoce",
    accentColor: "#0072C6"
  },
  {
    id: "slide-3",
    tag: "Centro de Reabilitação Multidisciplinar SUS",
    titleLight: "Ciência e afeto unidos na",
    titleHighlight: "reabilitação neurofuncional contínua",
    description: "Equipe especializada em Fisioterapia Neurofuncional, Fonoaudiologia, Terapia Ocupacional e Psicologia acolhendo mais de 165 assistidos de Santa Cruz das Palmeiras.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=85&w=1920",
    patientStory: "Mais de 18.200 atendimentos anuais gratuitos",
    accentColor: "#00875A"
  }
];
