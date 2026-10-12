import asyncio
import edge_tts
import edge_tts.constants
import edge_tts.communicate
import os

edge_tts.constants.WSS_URL = (
    "wss://api.msedgeservices.com/tts/cognitiveservices/websocket/v1"
    f"?Ocp-Apim-Subscription-Key={edge_tts.constants.TRUSTED_CLIENT_TOKEN}"
)
edge_tts.communicate.WSS_URL = edge_tts.constants.WSS_URL

OUTPUT_DIR = r"C:\Users\Administrador\.gemini\antigravity\scratch\amp-flow\public\audio_demos"
os.makedirs(OUTPUT_DIR, exist_ok=True)

ITEMS = [
    # --- 4 CARIMBOS NA VOZ FEMININA (Vivienne) ---
    {
        "file": "carimbo_1_fem.mp3",
        "voice": "fr-FR-VivienneMultilingualNeural",
        "rate": "-6%",
        "pitch": "-1Hz",
        "text": "Amplificadora, ampliando sua onda musical."
    },
    {
        "file": "carimbo_2_fem.mp3",
        "voice": "fr-FR-VivienneMultilingualNeural",
        "rate": "-6%",
        "pitch": "-1Hz",
        "text": "Amplificadora, a música nos acompanha."
    },
    {
        "file": "carimbo_3_fem.mp3",
        "voice": "fr-FR-VivienneMultilingualNeural",
        "rate": "-6%",
        "pitch": "-1Hz",
        "text": "Amplificadora."
    },
    {
        "file": "carimbo_4_fem.mp3",
        "voice": "fr-FR-VivienneMultilingualNeural",
        "rate": "-6%",
        "pitch": "-1Hz",
        "text": "Muito além de uma uébi rádio, Amplificadora."
    },

    # --- 4 CARIMBOS NA VOZ MASCULINA 1 (Rémy - Barítono Suave FM) ---
    {
        "file": "carimbo_1_masc_remy.mp3",
        "voice": "fr-FR-RemyMultilingualNeural",
        "rate": "-5%",
        "pitch": "-2Hz",
        "text": "Amplificadora, ampliando sua onda musical."
    },
    {
        "file": "carimbo_2_masc_remy.mp3",
        "voice": "fr-FR-RemyMultilingualNeural",
        "rate": "-5%",
        "pitch": "-2Hz",
        "text": "Amplificadora, a música nos acompanha."
    },
    {
        "file": "carimbo_3_masc_remy.mp3",
        "voice": "fr-FR-RemyMultilingualNeural",
        "rate": "-5%",
        "pitch": "-2Hz",
        "text": "Amplificadora."
    },
    {
        "file": "carimbo_4_masc_remy.mp3",
        "voice": "fr-FR-RemyMultilingualNeural",
        "rate": "-5%",
        "pitch": "-2Hz",
        "text": "Muito além de uma uébi rádio, Amplificadora."
    },

    # --- COMPARATIVO OUTRAS VOZES MASCULINAS (Brian & Andrew) ---
    {
        "file": "demo_masc_brian.mp3",
        "voice": "en-US-BrianMultilingualNeural",
        "rate": "-4%",
        "pitch": "-2Hz",
        "text": "Amplificadora, ampliando sua onda musical. Muito além de uma uébi rádio, Amplificadora."
    },
    {
        "file": "demo_masc_andrew.mp3",
        "voice": "en-US-AndrewMultilingualNeural",
        "rate": "-4%",
        "pitch": "-2Hz",
        "text": "Amplificadora, ampliando sua onda musical. Muito além de uma uébi rádio, Amplificadora."
    },

    # --- 6 SPOTS DE 30s INTERCALANDO VOZ MASCULINA E FEMININA + URLs CORRIGIDAS ---
    {
        "file": "spot_amp_1_ti247.mp3",
        "voice": "fr-FR-RemyMultilingualNeural",
        "rate": "-4%",
        "pitch": "-2Hz",
        "text": "Sua empresa não pode parar. Com o Grupo A Ême Pê, você conta com mais de 40 anos de excelência em tecnologia corporativa, suporte gerenciado 24 horas por dia e infraestrutura de alta disponibilidade. Deixe a tecnologia com quem entende e foque no crescimento do seu negócio. Acesse: A, Ême, Pê, ponto, I, A, ponto, Bê, Érre. Grupo A Ême Pê: ampliando sua tecnologia."
    },
    {
        "file": "spot_amp_2_cyber.mp3",
        "voice": "fr-FR-VivienneMultilingualNeural",
        "rate": "-5%",
        "pitch": "-1Hz",
        "text": "No mundo digital, segurança é patrimônio. O ecossistema de cibersegurança do Grupo A Ême Pê protege os dados, servidores e operações da sua empresa contra ameaças em tempo real, com monitoramento contínuo e governança avançada. Tranquilidade total para você liderar o mercado. Conheça nossas soluções em: A, Ême, Pê, ponto, I, A, ponto, Bê, Érre."
    },
    {
        "file": "spot_amp_3_flow_dre.mp3",
        "voice": "en-US-BrianMultilingualNeural",
        "rate": "-4%",
        "pitch": "-2Hz",
        "text": "Fluxo de caixa e Dê Érre Ê sem mistério. Conheça o A Ême Pê Flow: a plataforma inteligente que transforma a gestão financeira da sua empresa, com visão clara, indicadores em tempo real e controle absoluto de ponta a ponta. Decisões mais rápidas e seguras na palma da sua mão. Acesse: A, Ême, Pê, ponto, I, A, ponto, Bê, Érre."
    },
    {
        "file": "spot_amp_4_diagnostico.mp3",
        "voice": "fr-FR-VivienneMultilingualNeural",
        "rate": "-5%",
        "pitch": "-1Hz",
        "text": "Você sabe exatamente onde sua operação pode ganhar mais eficiência? Faça o Diagnóstico 360 graus do Grupo A Ême Pê. Uma análise completa de infraestrutura, inteligência fiscal e processos para reduzir custos e acelerar resultados. Fale com nossos especialistas em: A, Ême, Pê, ponto, A, Dê, Ême, ponto, Bê, Érre."
    },
    {
        "file": "spot_amp_5_indoor.mp3",
        "voice": "fr-FR-RemyMultilingualNeural",
        "rate": "-4%",
        "pitch": "-2Hz",
        "text": "Imagine o seu restaurante, cafeteria, clínica ou loja com uma rádio exclusiva, feita sob medida com a identidade da sua marca e anúncios dos seus próprios produtos. Com a Amplificadora Rádio Indoor, você transforma o ambiente do seu negócio e encanta seus clientes. Peça agora a sua estação personalizada em: amplificadora, ponto com, ponto, Bê, Érre."
    },
    {
        "file": "spot_amp_6_ink.mp3",
        "voice": "pt-BR-ThalitaMultilingualNeural",
        "rate": "-4%",
        "pitch": "-1Hz",
        "text": "Vista a sua paixão pela música. Conheça a coleção oficial A Ême Pê Ink, em parceria exclusiva com a Reserva Ink. Camisetas com estampas originais, tecido premium e todo o estilo de quem vive na sintonia da boa música. Acesse: amplificadora, ponto com, ponto, Bê, Érre, e garanta a sua."
    }
]

async def main():
    for item in ITEMS:
        out_path = os.path.join(OUTPUT_DIR, item["file"])
        print(f"Gerando {item['file']} ({item['voice']})...")
        comm = edge_tts.Communicate(item["text"], item["voice"], rate=item["rate"], pitch=item["pitch"])
        await comm.save(out_path)
        print(f"  -> OK ({os.path.getsize(out_path)} bytes)")

if __name__ == "__main__":
    asyncio.run(main())
