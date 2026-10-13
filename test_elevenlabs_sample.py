import urllib.request
import json
import os

API_KEY = "sk_c4261ffac579ee35ae844ce357eb5980960df44ec2233717"
OUT_DIR = r"c:\Users\Administrador\.gemini\antigravity\scratch\amp-flow\eleven_demos"
os.makedirs(OUT_DIR, exist_ok=True)

# Test items with ElevenLabs Multilingual v2
SAMPLES = [
    (
        "eleven_disco_intro_masc.mp3",
        "nPczCjzI2devNBz1zQrb", # Brian (Deep Radio Broadcaster)
        "Agora... você vai voltar à era disco... Disco Club, Amplificadora!"
    ),
    (
        "eleven_disco_intro_fem.mp3",
        "pFZP5JQG7iQjIQuC4Bku", # Lily (Velvety, Warm Female Voice)
        "Agora... você vai voltar à era disco... Disco Club, Amplificadora!"
    ),
    (
        "eleven_carimbo_1_fem.mp3",
        "pFZP5JQG7iQjIQuC4Bku", # Lily
        "Amplificadora... ampliando sua onda musical."
    )
]

for fname, voice_id, text in SAMPLES:
    print(f"Generating {fname} ({len(text)} chars)...")
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}"
    payload = {
        "text": text,
        "model_id": "eleven_multilingual_v2",
        "voice_settings": {
            "stability": 0.45,
            "similarity_boost": 0.85,
            "style": 0.20,
            "use_speaker_boost": True
        }
    }
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=data,
        headers={
            "xi-api-key": API_KEY,
            "Content-Type": "application/json",
            "Accept": "audio/mpeg"
        }
    )
    with urllib.request.urlopen(req) as resp:
        audio_bytes = resp.read()
        out_path = os.path.join(OUT_DIR, fname)
        with open(out_path, "wb") as f:
            f.write(audio_bytes)
        print(f"Saved {fname} ({len(audio_bytes)} bytes)")

print("ALL_ELEVEN_SAMPLES_SAVED_OK")
