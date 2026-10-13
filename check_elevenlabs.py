import urllib.request
import json
import os

API_KEY = "sk_c4261ffac579ee35ae844ce357eb5980960df44ec2233717"

headers = {
    "xi-api-key": API_KEY,
    "Accept": "application/json"
}

print("=== 1. SUBSCRIPTION & BALANCE ===")
try:
    req = urllib.request.Request("https://api.elevenlabs.io/v1/user/subscription", headers=headers)
    with urllib.request.urlopen(req) as resp:
        sub = json.loads(resp.read().decode("utf-8"))
        print(f"Tier: {sub.get('tier')}")
        print(f"Status: {sub.get('status')}")
        character_count = sub.get('character_count', 0)
        character_limit = sub.get('character_limit', 0)
        can_extend = sub.get('can_extend_character_limit')
        print(f"Caracteres Usados: {character_count:,} / Limite: {character_limit:,}")
        print(f"Saldo Disponível: {max(0, character_limit - character_count):,} caracteres")
except Exception as e:
    print(f"Subscription Error: {e}")

print("\n=== 2. VOICES IN ACCOUNT ===")
try:
    req = urllib.request.Request("https://api.elevenlabs.io/v1/voices", headers=headers)
    with urllib.request.urlopen(req) as resp:
        v_data = json.loads(resp.read().decode("utf-8"))
        voices = v_data.get("voices", [])
        print(f"Total de Vozes Disponíveis: {len(voices)}")
        pt_voices = []
        for v in voices:
            labels = v.get("labels", {})
            lang = labels.get("language", "") or labels.get("accent", "")
            name = v.get("name", "")
            category = v.get("category", "")
            vid = v.get("voice_id", "")
            # list interesting voices or custom cloned voices
            pt_voices.append((vid, name, category, labels))

        for vid, name, cat, lab in pt_voices[:25]:
            print(f"ID: {vid} | Nome: {name} | Categoria: {cat} | Labels: {lab}")
except Exception as e:
    print(f"Voices Error: {e}")
