import asyncio
import os
import edge_tts

# Patch edge_tts WSS_URL if needed
import edge_tts.constants
import edge_tts.communicate
edge_tts.constants.WSS_URL = (
    "wss://api.msedgeservices.com/tts/cognitiveservices/websocket/v1"
    f"?Ocp-Apim-Subscription-Key={edge_tts.constants.TRUSTED_CLIENT_TOKEN}"
)
edge_tts.communicate.WSS_URL = edge_tts.constants.WSS_URL

OUT_DIR = r"c:\Users\Administrador\.gemini\antigravity\scratch\amp-flow\audio_pack_v3_raw"
os.makedirs(OUT_DIR, exist_ok=True)

VOICE_FEM = "fr-FR-VivienneMultilingualNeural"
VOICE_MASC = "fr-FR-RemyMultilingualNeural"

TTS_ITEMS = [
    # --- DROPS AMPLIFICADORA (5 Temas: Tecnologia, Política, Saúde, Moda, Música) ---
    (
        "raw_drops_1_tecnologia.mp3",
        VOICE_MASC,
        "-3%",
        "+0Hz",
        "Dróps Amplificadora! Giro de Tecnologia: Empresas brasileiras aceleram a adoção de inteligência artificial e sáiber segurança em tempo real para proteger operações críticas vinte e quatro horas por dia. Amplificadora, informação na sua onda."
    ),
    (
        "raw_drops_2_politica.mp3",
        VOICE_FEM,
        "-3%",
        "+0Hz",
        "Dróps Amplificadora! Giro de Política e Economia: Pautas de modernização digital, novos marcos regulatórios de inovação e incentivos ao setor produtivo movimentam a agenda econômica em Brasília. Amplificadora, informação na sua onda."
    ),
    (
        "raw_drops_3_saude.mp3",
        VOICE_MASC,
        "-3%",
        "+0Hz",
        "Dróps Amplificadora! Giro de Saúde e Bem-Estar: Especialistas destacam que pausas ativas, hidratação constante e a música certa durante a rotina reduzem o estresse e aumentam o foco no trabalho. Amplificadora, cuidando da sua sintonia."
    ),
    (
        "raw_drops_4_moda.mp3",
        VOICE_FEM,
        "-3%",
        "+0Hz",
        "Dróps Amplificadora! Giro de Moda e Estilo: A cultura tê-shirt com algodão sustentável e estampas inspiradas na música consolida o visual urbano versátil nas principais capitais. Amplificadora, estilo na sua onda."
    ),
    (
        "raw_drops_5_musica.mp3",
        VOICE_MASC,
        "-3%",
        "+0Hz",
        "Dróps Amplificadora! Giro da Música: Clássicos remasterizados dos anos setenta, oitenta e noventa batem recordes de audiência digital, conectando novas gerações aos grandes ícones mundiais. Amplificadora, a música nos acompanha."
    ),

    # --- DISCO CLUB AMPLIFICADORA: ABERTURAS & CARIMBOS TEMÁTICOS ---
    (
        "raw_disco_intro_fem.mp3",
        VOICE_FEM,
        "-5%",
        "+0Hz",
        "Agora... você vai voltar à era dísco... Díscou Clãb, Amplificadora!"
    ),
    (
        "raw_disco_intro_masc.mp3",
        VOICE_MASC,
        "-4%",
        "+0Hz",
        "Agora... você vai voltar à era dísco... Díscou Clãb, Amplificadora!"
    ),
    (
        "raw_carimbo_disco_1_fem.mp3",
        VOICE_FEM,
        "-4%",
        "+0Hz",
        "Díscou Clãb Amplificadora... a era de ouro na sua onda musical!"
    ),
    (
        "raw_carimbo_disco_2_masc.mp3",
        VOICE_MASC,
        "-4%",
        "+0Hz",
        "Você está no Díscou Clãb... Amplificadora!"
    ),
    (
        "raw_carimbo_disco_3_fem.mp3",
        VOICE_FEM,
        "-4%",
        "+0Hz",
        "Díscou Clãb Amplificadora... a música nos acompanha!"
    ),
    (
        "raw_carimbo_disco_4_masc.mp3",
        VOICE_MASC,
        "-4%",
        "+0Hz",
        "Díscou Clãb Amplificadora... ampliando sua onda musical!"
    ),
]

async def main():
    for fname, voice, rate, pitch, text in TTS_ITEMS:
        out_path = os.path.join(OUT_DIR, fname)
        print(f"Generating {fname} ({voice})...")
        comm = edge_tts.Communicate(text, voice, rate=rate, pitch=pitch)
        await comm.save(out_path)
    print("ALL_RAW_TTS_GENERATED_OK")

if __name__ == "__main__":
    asyncio.run(main())
