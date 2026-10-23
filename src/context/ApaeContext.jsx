import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  NEWS_DATA, 
  EVENTS_DATA, 
  PROJECTS_DATA, 
  TRANSPARENCY_DOCUMENTS_DATA,
  COMPLIANCE_CHECKLIST_DATA,
  INSTITUTION_DATA,
  DEFAULT_HERO_SLIDES
} from '../data/apaeData';
import { triggerConfetti } from '../utils/confetti';

const ApaeContext = createContext();

const INITIAL_DONATIONS = [
  { id: "DON-9821", name: "Dra. Carolina Mendes", value: 120, method: "PIX", type: "Mensal", date: "31/08/2026 20:45", status: "Confirmado", destination: "Fisioterapia Neurofuncional" },
  { id: "DON-9820", name: "Empresa Amiga da APAE - SCP", value: 2500, method: "Boleto", type: "Única", date: "31/08/2026 18:20", status: "Confirmado", destination: "Escola Luiz Affonso Mendes" },
  { id: "DON-9819", name: "Anônimo (Munícipe SCP)", value: 60, method: "PIX", type: "Única", date: "31/08/2026 17:05", status: "Confirmado", destination: "Fonoaudiologia e CAA" },
  { id: "DON-9818", name: "Fernando Peixoto", value: 250, method: "Cartão", type: "Mensal", date: "31/08/2026 14:12", status: "Confirmado", destination: "Estimulação Sensorial" },
  { id: "DON-9817", name: "Mariana Siqueira", value: 50, method: "PIX", type: "Única", date: "31/08/2026 11:30", status: "Confirmado", destination: "Alimentação Adaptada" }
];

const INITIAL_VOLUNTEERS = [
  { id: "VOL-101", name: "Larissa Fernandes", email: "larissa.fernandes@email.com", phone: "(19) 99712-4567", area: "recreacao", availability: "Sábados de manhã", motivation: "Quero apoiar as crianças nas atividades recreativas e oficinas de arte.", status: "Aprovado", date: "29/08/2026" },
  { id: "VOL-102", name: "Marcos Vinicius Silva", email: "marcos.v@email.com", phone: "(19) 99823-5678", area: "artes", availability: "Terças e Quintas à tarde", motivation: "Artesão voluntário para ensinar artesanato aos alunos.", status: "Em Análise", date: "30/08/2026" },
  { id: "VOL-103", name: "Fernanda Toledo", email: "ftoledo.fono@email.com", phone: "(19) 99934-5678", area: "saude", availability: "Sextas o dia todo", motivation: "Fonoaudióloga palmeirense querendo doar horas clínicas de acolhimento.", status: "Aprovado", date: "31/08/2026" }
];

const INITIAL_ESIC_REQUESTS = [
  {
    protocol: "SIC-2026-0042",
    date: "14/09/2026",
    applicant: "Conselho Comunitário de SCP",
    email: "conselho.cidadao@scp.org.br",
    subject: "Execução Físico-Financeira do Termo de Colaboração Nº 001/2026",
    details: "Solicito demonstrativo analítico de aquisição de materiais didáticos adaptados do 1º semestre.",
    status: "Respondido",
    responseDate: "18/09/2026",
    response: "Informações disponibilizadas na íntegra acompanhadas do demonstrativo contábil e notas fiscais no Portal da Transparência (Código DOC-2026-002).",
    responsible: "Controladoria & Secretaria Geral"
  },
  {
    protocol: "SIC-2026-0041",
    date: "02/09/2026",
    applicant: "Mariana Prado",
    email: "mariana.prado@exemplo.com",
    subject: "Quadro e Regulamento de Recrutamento Técnico",
    details: "Gostaria de consultar o regulamento interno e critérios de pontuação para o próximo processo seletivo da área pedagógica.",
    status: "Respondido",
    responseDate: "05/09/2026",
    response: "O Regulamento de Contratação de Pessoal da entidade está disponível para download público no Portal de Transparência sob o código REG-PESSOAL-2026.",
    responsible: "Setor de Recursos Humanos"
  }
];

export function ApaeProvider({ children }) {
  const [currentSection, setCurrentSection] = useState('inicio');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);

  // Modals
  const [donationModalOpen, setDonationModalOpen] = useState(false);
  const [donationModalConfig, setDonationModalConfig] = useState({ amount: 60, type: 'recorrente', projectName: '' });
  
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedNews, setSelectedNews] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDoc, setSelectedDoc] = useState(null);
  
  const [volunteerModalOpen, setVolunteerModalOpen] = useState(false);
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const [scheduleVisitModalOpen, setScheduleVisitModalOpen] = useState(false);
  
  // Compliance and Special Modals
  const [complianceModalOpen, setComplianceModalOpen] = useState(false);
  const [esicModalOpen, setEsicModalOpen] = useState(false);
  const [lgpdModalOpen, setLgpdModalOpen] = useState(false);
  const [dataDictionaryModalOpen, setDataDictionaryModalOpen] = useState(false);

  // Lists with LocalStorage persistence
  const [documentsList, setDocumentsList] = useState(() => {
    try {
      const saved = localStorage.getItem('apae_scp_documents');
      return saved ? JSON.parse(saved) : TRANSPARENCY_DOCUMENTS_DATA;
    } catch {
      return TRANSPARENCY_DOCUMENTS_DATA;
    }
  });

  const [checklistData, setChecklistData] = useState(() => {
    try {
      const saved = localStorage.getItem('apae_scp_checklist');
      return saved ? JSON.parse(saved) : COMPLIANCE_CHECKLIST_DATA;
    } catch {
      return COMPLIANCE_CHECKLIST_DATA;
    }
  });

  const [newsList, setNewsList] = useState(() => {
    try {
      const saved = localStorage.getItem('apae_scp_news');
      return saved ? JSON.parse(saved) : NEWS_DATA;
    } catch {
      return NEWS_DATA;
    }
  });

  const [eventsList, setEventsList] = useState(() => {
    try {
      const saved = localStorage.getItem('apae_scp_events');
      return saved ? JSON.parse(saved) : EVENTS_DATA;
    } catch {
      return EVENTS_DATA;
    }
  });

  const [donations, setDonations] = useState(() => {
    try {
      const saved = localStorage.getItem('apae_scp_donations');
      return saved ? JSON.parse(saved) : INITIAL_DONATIONS;
    } catch {
      return INITIAL_DONATIONS;
    }
  });

  const [volunteers, setVolunteers] = useState(() => {
    try {
      const saved = localStorage.getItem('apae_scp_volunteers');
      return saved ? JSON.parse(saved) : INITIAL_VOLUNTEERS;
    } catch {
      return INITIAL_VOLUNTEERS;
    }
  });

  const [esicRequests, setEsicRequests] = useState(() => {
    try {
      const saved = localStorage.getItem('apae_scp_esic');
      return saved ? JSON.parse(saved) : INITIAL_ESIC_REQUESTS;
    } catch {
      return INITIAL_ESIC_REQUESTS;
    }
  });

  // Hero Banners & Imagens de Fundo
  const [heroSlides, setHeroSlides] = useState(() => {
    try {
      const saved = localStorage.getItem('apae_scp_hero_slides');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.map((slide) => 
            slide.image && slide.image.includes('photo-1576765608535-5f04d1e3f289')
              ? { ...slide, image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=85&w=1920' }
              : slide
          );
        }
      }
      return DEFAULT_HERO_SLIDES;
    } catch {
      return DEFAULT_HERO_SLIDES;
    }
  });

  // Segurança do Gestor (PIN customizável)
  const [adminPin, setAdminPin] = useState(() => {
    try {
      return localStorage.getItem('apae_admin_pin') || '1234';
    } catch {
      return '1234';
    }
  });

  // Modo 'Em Breve' (Página de Espera no Domínio Oficial)
  const [comingSoonMode, setComingSoonModeState] = useState(() => {
    try {
      const saved = localStorage.getItem('apae_coming_soon');
      return saved !== null ? saved === 'true' : true; // Padrão: ativado para lançamento
    } catch {
      return true;
    }
  });

  // Toast
  const [toast, setToast] = useState(null);

  const updateAdminPin = (newPin) => {
    setAdminPin(newPin);
    try {
      localStorage.setItem('apae_admin_pin', newPin);
    } catch {}
    showToast("Novo PIN de acesso ao painel do gestor atualizado com sucesso!");
  };

  const setComingSoonMode = (val) => {
    setComingSoonModeState(val);
    try {
      localStorage.setItem('apae_coming_soon', String(val));
    } catch {}
    showToast(val ? "Modo 'Em Breve' ATIVADO no domínio oficial." : "Modo 'Em Breve' DESATIVADO. Site aberto ao público!");
  };

  // Save to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('apae_scp_hero_slides', JSON.stringify(heroSlides));
    } catch (e) {}
  }, [heroSlides]);

  // Save to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('apae_scp_documents', JSON.stringify(documentsList));
    } catch (e) {}
  }, [documentsList]);

  useEffect(() => {
    try {
      localStorage.setItem('apae_scp_checklist', JSON.stringify(checklistData));
    } catch (e) {}
  }, [checklistData]);

  useEffect(() => {
    try {
      localStorage.setItem('apae_scp_news', JSON.stringify(newsList));
    } catch (e) {}
  }, [newsList]);

  useEffect(() => {
    try {
      localStorage.setItem('apae_scp_events', JSON.stringify(eventsList));
    } catch (e) {}
  }, [eventsList]);

  useEffect(() => {
    try {
      localStorage.setItem('apae_scp_donations', JSON.stringify(donations));
    } catch (e) {}
  }, [donations]);

  useEffect(() => {
    try {
      localStorage.setItem('apae_scp_volunteers', JSON.stringify(volunteers));
    } catch (e) {}
  }, [volunteers]);

  useEffect(() => {
    try {
      localStorage.setItem('apae_scp_esic', JSON.stringify(esicRequests));
    } catch (e) {}
  }, [esicRequests]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  const scrollToSection = (sectionId) => {
    setCurrentSection(sectionId);
    if (typeof document !== 'undefined') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const openDonationModal = (amount = 60, type = 'recorrente', projectName = '') => {
    setDonationModalConfig({ amount, type, projectName });
    setDonationModalOpen(true);
  };

  const closeDonationModal = () => {
    setDonationModalOpen(false);
  };

  const recordDonation = (donationData) => {
    const newDonation = {
      id: `DON-${Math.floor(1000 + Math.random() * 9000)}`,
      name: donationData.name || "Doador Solidário de SCP",
      value: Number(donationData.value),
      method: donationData.method || "PIX",
      type: donationData.type || "Única",
      date: new Date().toLocaleString('pt-BR'),
      status: "Confirmado",
      destination: donationData.destination || "Geral - Escola Luiz Affonso Mendes"
    };

    setDonations([newDonation, ...donations]);
    triggerConfetti();
    showToast(`Obrigado pelo carinho! Sua doação de R$ ${Number(donationData.value).toFixed(2)} foi confirmada com sucesso!`);
    closeDonationModal();
  };

  const registerVolunteer = (volData) => {
    const newVol = {
      id: `VOL-${Math.floor(100 + Math.random() * 900)}`,
      ...volData,
      status: "Em Análise",
      date: new Date().toLocaleDateString('pt-BR')
    };
    setVolunteers([newVol, ...volunteers]);
    showToast("Inscrição de voluntariado recebida com sucesso! Nossa coordenação entrará em contato.");
    setVolunteerModalOpen(false);
  };

  const addDocument = (newDoc) => {
    const docWithId = {
      id: `DOC-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toLocaleDateString('pt-BR'),
      sha256: newDoc.sha256 || Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join(''),
      status: newDoc.status || 'Publicado',
      format: newDoc.format || 'PDF',
      ...newDoc
    };
    setDocumentsList([docWithId, ...documentsList]);
    showToast(`Documento ${docWithId.title} anexado e publicado com sucesso!`);
    return docWithId;
  };

  const deleteDocument = (docId) => {
    setDocumentsList(documentsList.filter(d => d.id !== docId));
    showToast("Documento removido do portal da transparência com sucesso.", "warning");
  };

  const toggleChecklistItem = (groupKey, itemId) => {
    setChecklistData(prev => {
      const updatedGroup = { ...prev[groupKey] };
      updatedGroup.items = updatedGroup.items.map(item => {
        if (item.id === itemId) {
          return { ...item, meets: !item.meets };
        }
        return item;
      });
      return {
        ...prev,
        [groupKey]: updatedGroup
      };
    });
  };

  const saveChecklistData = (updatedData) => {
    setChecklistData(updatedData);
    showToast("Checklist de Transparência e Conformidade atualizado com sucesso!");
  };

  const createEsicRequest = (requestData) => {
    const protocol = `SIC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newReq = {
      protocol,
      date: new Date().toLocaleDateString('pt-BR'),
      applicant: requestData.applicant || "Cidadão",
      email: requestData.email,
      phone: requestData.phone || "",
      subject: requestData.subject,
      details: requestData.details,
      status: "Em Análise (Prazo LAI: 20 dias)",
      response: "",
      responsible: "Ouvidoria Geral e-SIC"
    };
    setEsicRequests([newReq, ...esicRequests]);
    showToast(`Solicitação registrada! Protocolo oficial gerado: ${protocol}`);
    setEsicModalOpen(false);
    return protocol;
  };

  const answerEsicRequest = (protocol, answerText, responsibleName) => {
    setEsicRequests(prev => prev.map(req => {
      if (req.protocol === protocol) {
        return {
          ...req,
          status: "Respondido",
          response: answerText,
          responseDate: new Date().toLocaleDateString('pt-BR'),
          responsible: responsibleName || "Controladoria e-SIC"
        };
      }
      return req;
    }));
    showToast(`Resposta ao protocolo ${protocol} enviada e registrada no histórico da LAI!`);
  };

  // Gerenciamento de Slides / Banners do Hero
  const updateHeroSlide = (id, updatedFields) => {
    setHeroSlides(prev => prev.map(slide => slide.id === id ? { ...slide, ...updatedFields } : slide));
    showToast("Slide do Hero atualizado com sucesso!");
  };

  const addHeroSlide = (newSlideData) => {
    const newSlide = {
      id: `slide-${Date.now()}`,
      tag: newSlideData?.tag || "Novo Projeto APAE SCP",
      titleLight: newSlideData?.titleLight || "Acolhimento com amor e",
      titleHighlight: newSlideData?.titleHighlight || "dedicação a cada passo",
      description: newSlideData?.description || "Atendimento integral humanizado e educação especial em Santa Cruz das Palmeiras.",
      image: newSlideData?.image || "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&q=85&w=1920",
      patientStory: newSlideData?.patientStory || "Educação Especial & Cuidado",
      accentColor: newSlideData?.accentColor || "#F5A623"
    };
    setHeroSlides(prev => [...prev, newSlide]);
    showToast("Novo slide adicionado à apresentação principal!");
  };

  const deleteHeroSlide = (id) => {
    if (heroSlides.length <= 1) {
      showToast("Mantenha ao menos 1 slide na apresentação principal.", "error");
      return;
    }
    setHeroSlides(prev => prev.filter(slide => slide.id !== id));
    showToast("Slide removido com sucesso.");
  };

  const resetHeroSlides = () => {
    setHeroSlides(DEFAULT_HERO_SLIDES);
    showToast("Slides restaurados para o padrão institucional.");
  };

  // Calcular índice geral de conformidade (total de itens atendidos nos 3 grupos)
  const totalChecklistItems = 
    checklistData.group1_art7_8_1.items.length +
    checklistData.group2_art8_3.items.length +
    checklistData.group3_mrosc.items.length;

  const totalMeetsCount = 
    checklistData.group1_art7_8_1.items.filter(i => i.meets).length +
    checklistData.group2_art8_3.items.filter(i => i.meets).length +
    checklistData.group3_mrosc.items.filter(i => i.meets).length;

  const complianceScore = Math.round((totalMeetsCount / totalChecklistItems) * 100);

  return (
    <ApaeContext.Provider
      value={{
        institution: INSTITUTION_DATA,
        currentSection,
        setCurrentSection,
        scrollToSection,
        isAdminOpen,
        setIsAdminOpen,
        adminAuthenticated,
        setAdminAuthenticated,

        // Modais
        donationModalOpen,
        donationModalConfig,
        openDonationModal,
        closeDonationModal,
        selectedProject,
        setSelectedProject,
        selectedNews,
        setSelectedNews,
        selectedEvent,
        setSelectedEvent,
        selectedDoc,
        setSelectedDoc,
        volunteerModalOpen,
        setVolunteerModalOpen,
        partnerModalOpen,
        setPartnerModalOpen,
        scheduleVisitModalOpen,
        setScheduleVisitModalOpen,
        complianceModalOpen,
        setComplianceModalOpen,
        esicModalOpen,
        setEsicModalOpen,
        lgpdModalOpen,
        setLgpdModalOpen,
        dataDictionaryModalOpen,
        setDataDictionaryModalOpen,

        // Dados e Ações
        donations,
        recordDonation,
        volunteers,
        registerVolunteer,
        documentsList,
        addDocument,
        deleteDocument,
        checklistData,
        toggleChecklistItem,
        saveChecklistData,
        totalChecklistItems,
        totalMeetsCount,
        complianceScore,
        esicRequests,
        createEsicRequest,
        answerEsicRequest,
        newsList,
        setNewsList,
        eventsList,
        setEventsList,

        // Slides do Hero & Fotos de Fundo
        heroSlides,
        setHeroSlides,
        updateHeroSlide,
        addHeroSlide,
        deleteHeroSlide,
        resetHeroSlides,

        // Segurança & Lançamento (PIN e Modo Em Breve)
        adminPin,
        updateAdminPin,
        comingSoonMode,
        setComingSoonMode,

        toast,
        showToast
      }}
    >
      {children}
    </ApaeContext.Provider>
  );
}

export function useApae() {
  const context = useContext(ApaeContext);
  if (!context) {
    throw new Error('useApae must be used within an ApaeProvider');
  }
  return context;
}
