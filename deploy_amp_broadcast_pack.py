import os
import paramiko

VPS_HOST = "185.245.182.23"
VPS_USER = "root"
VPS_PASS = r"p5p3ALM1!007"
LOCAL_DIR = r"C:\Users\Administrador\.gemini\antigravity\scratch\amp-flow\public\audio_demos"

FILES = [
    "carimbo_1_ampliando.mp3",
    "carimbo_2_acompanha.mp3",
    "carimbo_3_amplificadora.mp3",
    "carimbo_4_muito_alem.mp3",
    "spot_amp_1_ti247.mp3",
    "spot_amp_2_cyber.mp3",
    "spot_amp_3_flow_dre.mp3",
    "spot_amp_4_diagnostico.mp3",
    "spot_amp_5_indoor.mp3",
    "spot_amp_6_ink.mp3",
]

REMOTE_MIX_SCRIPT = r"""#!/bin/bash
set -e

MEDIA_ROOT="/var/lib/docker/volumes/azuracast_station_data/_data/httpsamplificadora.com.br/media"
BED1=$(ls "$MEDIA_ROOT/Karen Souza/"*.mp3 | head -n 1)
echo "Using Lounge Bed: $BED1"

DEMO_DIR="/var/www/amplificadora/audio_demos"
mkdir -p "$DEMO_DIR"
mkdir -p "$MEDIA_ROOT/CARIMBOS_OFICIAIS"
mkdir -p "$MEDIA_ROOT/SPOTS_AMP"

cd /tmp/amp_pack

# 1. Masterizar os 4 Carimbos (curtos de 3 a 5s com trilha suave e voz pura)
for f in carimbo_1_ampliando carimbo_2_acompanha carimbo_3_amplificadora carimbo_4_muito_alem; do
    cp "${f}.mp3" "$DEMO_DIR/${f}_natural.mp3"
    DUR=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${f}.mp3")
    TOTAL=$(python3 -c "print(round(float('$DUR') + 1.1, 2))")
    FADEOUT=$(python3 -c "print(round(float('$DUR') + 0.35, 2))")

    ffmpeg -y -ss 14 -t "$TOTAL" -i "$BED1" -i "${f}.mp3" -filter_complex \
      "[0:a]aresample=44100,aformat=sample_fmts=fltp:channel_layouts=stereo,volume=0.16,afade=t=in:st=0:d=0.25,afade=t=out:st=${FADEOUT}:d=0.75[bed]; \
       [1:a]aresample=44100,aformat=sample_fmts=fltp:channel_layouts=stereo,adelay=300|300,volume=1.55[v]; \
       [bed][v]amix=inputs=2:duration=first:dropout_transition=0:normalize=0,alimiter=limit=0.95" \
      -c:a libmp3lame -b:a 320k -ar 44100 "$DEMO_DIR/${f}_lounge.mp3"

    cp "$DEMO_DIR/${f}_lounge.mp3" "$MEDIA_ROOT/CARIMBOS_OFICIAIS/${f}.mp3"
done

# 2. Masterizar os 6 Spots de 30s da AMP
idx=1
for f in spot_amp_1_ti247 spot_amp_2_cyber spot_amp_3_flow_dre spot_amp_4_diagnostico spot_amp_5_indoor spot_amp_6_ink; do
    cp "${f}.mp3" "$DEMO_DIR/${f}_natural.mp3"
    DUR=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${f}.mp3")
    TOTAL=$(python3 -c "print(round(float('$DUR') + 2.2, 2))")
    FADEOUT=$(python3 -c "print(round(float('$DUR') + 0.9, 2))")
    START_OFFSET=$((10 + idx * 8))

    ffmpeg -y -ss "$START_OFFSET" -t "$TOTAL" -i "$BED1" -i "${f}.mp3" -filter_complex \
      "[0:a]aresample=44100,aformat=sample_fmts=fltp:channel_layouts=stereo,volume=0.14,afade=t=in:st=0:d=0.5,afade=t=out:st=${FADEOUT}:d=1.3[bed]; \
       [1:a]aresample=44100,aformat=sample_fmts=fltp:channel_layouts=stereo,adelay=700|700,volume=1.50[v]; \
       [bed][v]amix=inputs=2:duration=first:dropout_transition=0:normalize=0,alimiter=limit=0.95" \
      -c:a libmp3lame -b:a 320k -ar 44100 "$DEMO_DIR/${f}_lounge.mp3"

    cp "$DEMO_DIR/${f}_lounge.mp3" "$MEDIA_ROOT/SPOTS_AMP/${f}.mp3"
    idx=$((idx + 1))
done

# 3. Criar também os blocos combinados (2 spots + 1 carimbo) para o intervalo comercial no AzuraCast
# Bloco Comercial A: Spot 1 + Spot 2 + Carimbo 1
ffmpeg -y \
  -i "$DEMO_DIR/spot_amp_1_ti247_lounge.mp3" \
  -i "$DEMO_DIR/spot_amp_2_cyber_lounge.mp3" \
  -i "$DEMO_DIR/carimbo_1_ampliando_lounge.mp3" \
  -filter_complex "[0:a][1:a][2:a]concat=n=3:v=0:a=1" \
  -c:a libmp3lame -b:a 320k -ar 44100 "$MEDIA_ROOT/SPOTS_AMP/bloco_comercial_1_ti_cyber.mp3"

# Bloco Comercial B: Spot 3 + Spot 4 + Carimbo 2
ffmpeg -y \
  -i "$DEMO_DIR/spot_amp_3_flow_dre_lounge.mp3" \
  -i "$DEMO_DIR/spot_amp_4_diagnostico_lounge.mp3" \
  -i "$DEMO_DIR/carimbo_2_acompanha_lounge.mp3" \
  -filter_complex "[0:a][1:a][2:a]concat=n=3:v=0:a=1" \
  -c:a libmp3lame -b:a 320k -ar 44100 "$MEDIA_ROOT/SPOTS_AMP/bloco_comercial_2_flow_diag.mp3"

# Bloco Comercial C: Spot 5 + Spot 6 + Carimbo 4
ffmpeg -y \
  -i "$DEMO_DIR/spot_amp_5_indoor_lounge.mp3" \
  -i "$DEMO_DIR/spot_amp_6_ink_lounge.mp3" \
  -i "$DEMO_DIR/carimbo_4_muito_alem_lounge.mp3" \
  -filter_complex "[0:a][1:a][2:a]concat=n=3:v=0:a=1" \
  -c:a libmp3lame -b:a 320k -ar 44100 "$MEDIA_ROOT/SPOTS_AMP/bloco_comercial_3_indoor_ink.mp3"

cp "$MEDIA_ROOT/SPOTS_AMP/bloco_comercial_1_ti_cyber.mp3" "$DEMO_DIR/bloco_comercial_1_ti_cyber.mp3"
cp "$MEDIA_ROOT/SPOTS_AMP/bloco_comercial_2_flow_diag.mp3" "$DEMO_DIR/bloco_comercial_2_flow_diag.mp3"
cp "$MEDIA_ROOT/SPOTS_AMP/bloco_comercial_3_indoor_ink.mp3" "$DEMO_DIR/bloco_comercial_3_indoor_ink.mp3"

chown -R 1000:1000 "$MEDIA_ROOT/CARIMBOS_OFICIAIS" "$MEDIA_ROOT/SPOTS_AMP"
echo "ALL_MIXED_OK"
"""

def main():
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(VPS_HOST, username=VPS_USER, password=VPS_PASS)

    ssh.exec_command("mkdir -p /tmp/amp_pack")
    sftp = ssh.open_sftp()
    for f in FILES:
        local_p = os.path.join(LOCAL_DIR, f)
        remote_p = f"/tmp/amp_pack/{f}"
        print(f"Uploading {f}...")
        sftp.put(local_p, remote_p)

    sftp.put(
        r"C:\Users\Administrador\.gemini\antigravity\scratch\amp-flow\public\audios-aprovacao.html",
        "/var/www/amplificadora/audios-aprovacao.html"
    )
    with sftp.file("/tmp/amp_pack/mix.sh", "w") as rf:
        rf.write(REMOTE_MIX_SCRIPT)
    sftp.close()

    print("Running ffmpeg mastering on VPS...")
    _, out, err = ssh.exec_command("chmod +x /tmp/amp_pack/mix.sh && /tmp/amp_pack/mix.sh")
    out_txt = out.read().decode()
    err_txt = err.read().decode()
    print(out_txt)
    if "ALL_MIXED_OK" not in out_txt and err_txt:
        print("STDERR tail:", err_txt[-1200:])
    ssh.close()

if __name__ == "__main__":
    main()
