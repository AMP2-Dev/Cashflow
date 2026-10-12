import paramiko
import sys

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

VPS_HOST = "185.245.182.23"
VPS_USER = "root"
VPS_PASS = r"p5p3ALM1!007"

SCRIPT = r"""#!/bin/bash
set -e

MEDIA_ROOT="/var/lib/docker/volumes/azuracast_station_data/_data/httpsamplificadora.com.br/media"
BED1=$(ls "$MEDIA_ROOT/Karen Souza/"*.mp3 | head -n 1)
DEMO_DIR="/var/www/amplificadora/audio_demos"

cd /tmp/amp_pack

echo "=== 1. Extraindo trilha Lounge limpa em WAV 44.1kHz Stereo ==="
ffmpeg -y -v warning -i "$BED1" -vn -ar 44100 -ac 2 /tmp/amp_pack/clean_bed.wav
echo "Duracao clean_bed.wav: $(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 /tmp/amp_pack/clean_bed.wav)s"

echo "=== 2. Masterizando os 4 Carimbos Oficiais ==="
for f in carimbo_1_ampliando carimbo_2_acompanha carimbo_3_amplificadora carimbo_4_muito_alem; do
    cp "${f}.mp3" "$DEMO_DIR/${f}_natural.mp3"
    ffmpeg -y -v warning -i "${f}.mp3" -vn -ar 44100 -ac 2 "${f}.wav"
    DUR=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${f}.wav")
    TOTAL=$(python3 -c "print(round(float('$DUR') + 1.2, 2))")
    FADEOUT=$(python3 -c "print(round(float('$DUR') + 0.4, 2))")

    ffmpeg -y -v warning -ss 14 -t "$TOTAL" -i /tmp/amp_pack/clean_bed.wav -i "${f}.wav" -filter_complex \
      "[0:a]volume=0.16,afade=t=in:st=0:d=0.25,afade=t=out:st=${FADEOUT}:d=0.8[bed]; \
       [1:a]adelay=300|300,volume=1.65[v]; \
       [bed][v]amix=inputs=2:duration=first:dropout_transition=0:normalize=0,alimiter=limit=0.95" \
      -c:a libmp3lame -b:a 320k -ar 44100 "$DEMO_DIR/${f}_lounge.mp3"

    cp "$DEMO_DIR/${f}_lounge.mp3" "$MEDIA_ROOT/CARIMBOS_OFICIAIS/${f}.mp3"
    OUT_DUR=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$DEMO_DIR/${f}_lounge.mp3")
    echo "  -> ${f}_lounge.mp3: ${OUT_DUR}s"
done

echo "=== 3. Masterizando os 6 Spots de 30s da AMP ==="
idx=1
for f in spot_amp_1_ti247 spot_amp_2_cyber spot_amp_3_flow_dre spot_amp_4_diagnostico spot_amp_5_indoor spot_amp_6_ink; do
    cp "${f}.mp3" "$DEMO_DIR/${f}_natural.mp3"
    ffmpeg -y -v warning -i "${f}.mp3" -vn -ar 44100 -ac 2 "${f}.wav"
    DUR=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${f}.wav")
    TOTAL=$(python3 -c "print(round(float('$DUR') + 2.2, 2))")
    FADEOUT=$(python3 -c "print(round(float('$DUR') + 0.9, 2))")
    START_OFFSET=$((12 + idx * 9))

    ffmpeg -y -v warning -ss "$START_OFFSET" -t "$TOTAL" -i /tmp/amp_pack/clean_bed.wav -i "${f}.wav" -filter_complex \
      "[0:a]volume=0.14,afade=t=in:st=0:d=0.5,afade=t=out:st=${FADEOUT}:d=1.3[bed]; \
       [1:a]adelay=700|700,volume=1.60[v]; \
       [bed][v]amix=inputs=2:duration=first:dropout_transition=0:normalize=0,alimiter=limit=0.95" \
      -c:a libmp3lame -b:a 320k -ar 44100 "$DEMO_DIR/${f}_lounge.mp3"

    cp "$DEMO_DIR/${f}_lounge.mp3" "$MEDIA_ROOT/SPOTS_AMP/${f}.mp3"
    OUT_DUR=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$DEMO_DIR/${f}_lounge.mp3")
    echo "  -> ${f}_lounge.mp3: ${OUT_DUR}s"
    idx=$((idx + 1))
done

echo "=== 4. Montando os 3 Blocos Comerciais (2 Spots + 1 Carimbo) e o Intervalo Completo ==="
ffmpeg -y -v warning \
  -i "$DEMO_DIR/spot_amp_1_ti247_lounge.mp3" \
  -i "$DEMO_DIR/spot_amp_2_cyber_lounge.mp3" \
  -i "$DEMO_DIR/carimbo_1_ampliando_lounge.mp3" \
  -filter_complex "[0:a][1:a][2:a]concat=n=3:v=0:a=1" \
  -c:a libmp3lame -b:a 320k -ar 44100 "$MEDIA_ROOT/SPOTS_AMP/bloco_comercial_1_ti_cyber.mp3"

ffmpeg -y -v warning \
  -i "$DEMO_DIR/spot_amp_3_flow_dre_lounge.mp3" \
  -i "$DEMO_DIR/spot_amp_4_diagnostico_lounge.mp3" \
  -i "$DEMO_DIR/carimbo_2_acompanha_lounge.mp3" \
  -filter_complex "[0:a][1:a][2:a]concat=n=3:v=0:a=1" \
  -c:a libmp3lame -b:a 320k -ar 44100 "$MEDIA_ROOT/SPOTS_AMP/bloco_comercial_2_flow_diag.mp3"

ffmpeg -y -v warning \
  -i "$DEMO_DIR/spot_amp_5_indoor_lounge.mp3" \
  -i "$DEMO_DIR/spot_amp_6_ink_lounge.mp3" \
  -i "$DEMO_DIR/carimbo_4_muito_alem_lounge.mp3" \
  -filter_complex "[0:a][1:a][2:a]concat=n=3:v=0:a=1" \
  -c:a libmp3lame -b:a 320k -ar 44100 "$MEDIA_ROOT/SPOTS_AMP/bloco_comercial_3_indoor_ink.mp3"

cp "$MEDIA_ROOT/SPOTS_AMP/bloco_comercial_1_ti_cyber.mp3" "$DEMO_DIR/bloco_comercial_1_ti_cyber.mp3"
cp "$MEDIA_ROOT/SPOTS_AMP/bloco_comercial_2_flow_diag.mp3" "$DEMO_DIR/bloco_comercial_2_flow_diag.mp3"
cp "$MEDIA_ROOT/SPOTS_AMP/bloco_comercial_3_indoor_ink.mp3" "$DEMO_DIR/bloco_comercial_3_indoor_ink.mp3"

ffmpeg -y -v warning \
  -i "$DEMO_DIR/bloco_comercial_1_ti_cyber.mp3" \
  -i "$DEMO_DIR/bloco_comercial_2_flow_diag.mp3" \
  -i "$DEMO_DIR/bloco_comercial_3_indoor_ink.mp3" \
  -filter_complex "[0:a][1:a][2:a]concat=n=3:v=0:a=1" \
  -c:a libmp3lame -b:a 320k -ar 44100 "$DEMO_DIR/intervalo_completo_6_spots_amp.mp3"

for b in bloco_comercial_1_ti_cyber bloco_comercial_2_flow_diag bloco_comercial_3_indoor_ink intervalo_completo_6_spots_amp; do
    d=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$DEMO_DIR/${b}.mp3")
    echo "  -> ${b}.mp3: ${d}s"
done

chown -R 1000:1000 "$MEDIA_ROOT/CARIMBOS_OFICIAIS" "$MEDIA_ROOT/SPOTS_AMP"
"""

def main():
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(VPS_HOST, username=VPS_USER, password=VPS_PASS)
    sftp = ssh.open_sftp()
    sftp.put(
        r"C:\Users\Administrador\.gemini\antigravity\scratch\amp-flow\public\audios-aprovacao.html",
        "/var/www/amplificadora/audios-aprovacao.html"
    )
    with sftp.file("/tmp/amp_pack/remaster_wav.sh", "w") as rf:
        rf.write(SCRIPT)
    sftp.close()
    _, out, err = ssh.exec_command("chmod +x /tmp/amp_pack/remaster_wav.sh && /tmp/amp_pack/remaster_wav.sh")
    print(out.read().decode("utf-8", errors="replace"))
    err_t = err.read().decode("utf-8", errors="replace")
    if err_t:
        print("STDERR:", err_t[-1200:])
    ssh.close()

if __name__ == "__main__":
    main()
