import os
import sys
import paramiko

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

VPS_HOST = "185.245.182.23"
VPS_USER = "root"
VPS_PASS = r"p5p3ALM1!007"
LOCAL_DIR = r"C:\Users\Administrador\.gemini\antigravity\scratch\amp-flow\public\audio_demos"

REMOTE_SCRIPT = r"""#!/bin/bash
set -e

MEDIA_ROOT="/var/lib/docker/volumes/azuracast_station_data/_data/httpsamplificadora.com.br/media"
DEMO_DIR="/var/www/amplificadora/audio_demos"

cd /tmp/amp_pack

echo "=== 1. Remasterizando Spot 02 (Saiber Seguranca) ==="
cp "spot_amp_2_cyber.mp3" "$DEMO_DIR/spot_amp_2_cyber_natural.mp3"
ffmpeg -y -v warning -i "spot_amp_2_cyber.mp3" -vn -ar 44100 -ac 2 "spot_amp_2_cyber.wav"
dur=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "spot_amp_2_cyber.wav")
total=$(python3 -c "print(round(float('$dur') + 2.2, 2))")
fadeout=$(python3 -c "print(round(float('$dur') + 0.9, 2))")

ffmpeg -y -v warning -ss 18 -t "$total" -i /tmp/amp_pack/bed_habits.wav -i "spot_amp_2_cyber.wav" -filter_complex \
  "[0:a]volume=0.17,afade=t=in:st=0:d=0.5,afade=t=out:st=${fadeout}:d=1.3[bed]; \
   [1:a]adelay=700|700,volume=1.65[v]; \
   [bed][v]amix=inputs=2:duration=first:dropout_transition=0:normalize=0,alimiter=limit=0.95" \
  -c:a libmp3lame -b:a 320k -ar 44100 "$DEMO_DIR/spot_amp_2_cyber_lounge.mp3"

cp "$DEMO_DIR/spot_amp_2_cyber_lounge.mp3" "$MEDIA_ROOT/SPOTS_AMP/spot_amp_2_cyber.mp3"

echo "=== 2. Remontando os 3 Pacotes Comerciais (usando apenas Carimbos 1 e 3 aprovados + Saiber Seguranca) ==="
# Pacote 1: Spot 1 (Masc) + Spot 2 Saiber Seguranca (Fem) + Carimbo 1 (Masc)
ffmpeg -y -v warning \
  -i "$DEMO_DIR/spot_amp_1_ti247_lounge.mp3" \
  -i "$DEMO_DIR/spot_amp_2_cyber_lounge.mp3" \
  -i "$DEMO_DIR/carimbo_1_masc_lounge.mp3" \
  -filter_complex "[0:a][1:a][2:a]concat=n=3:v=0:a=1" \
  -c:a libmp3lame -b:a 320k -ar 44100 "$MEDIA_ROOT/SPOTS_AMP/bloco_comercial_1_ti_cyber.mp3"

# Pacote 2: Spot 3 (Masc) + Spot 4 (Fem) + Carimbo 3 (Fem)
ffmpeg -y -v warning \
  -i "$DEMO_DIR/spot_amp_3_flow_dre_lounge.mp3" \
  -i "$DEMO_DIR/spot_amp_4_diagnostico_lounge.mp3" \
  -i "$DEMO_DIR/carimbo_3_amplificadora_lounge.mp3" \
  -filter_complex "[0:a][1:a][2:a]concat=n=3:v=0:a=1" \
  -c:a libmp3lame -b:a 320k -ar 44100 "$MEDIA_ROOT/SPOTS_AMP/bloco_comercial_2_flow_diag.mp3"

# Pacote 3: Spot 5 (Masc) + Spot 6 (Fem) + Carimbo 3 (Masc)
ffmpeg -y -v warning \
  -i "$DEMO_DIR/spot_amp_5_indoor_lounge.mp3" \
  -i "$DEMO_DIR/spot_amp_6_ink_lounge.mp3" \
  -i "$DEMO_DIR/carimbo_3_masc_lounge.mp3" \
  -filter_complex "[0:a][1:a][2:a]concat=n=3:v=0:a=1" \
  -c:a libmp3lame -b:a 320k -ar 44100 "$MEDIA_ROOT/SPOTS_AMP/bloco_comercial_3_indoor_ink.mp3"

cp "$MEDIA_ROOT/SPOTS_AMP/bloco_comercial_1_ti_cyber.mp3" "$DEMO_DIR/bloco_comercial_1_ti_cyber.mp3"
cp "$MEDIA_ROOT/SPOTS_AMP/bloco_comercial_2_flow_diag.mp3" "$DEMO_DIR/bloco_comercial_2_flow_diag.mp3"
cp "$MEDIA_ROOT/SPOTS_AMP/bloco_comercial_3_indoor_ink.mp3" "$DEMO_DIR/bloco_comercial_3_indoor_ink.mp3"

chown -R 1000:1000 "$MEDIA_ROOT/CARIMBOS_OFICIAIS" "$MEDIA_ROOT/SPOTS_AMP"

echo "=== 3. Deixando APENAS Carimbo 1 e Carimbo 3 ativos no AzuraCast ==="
docker exec -i azuracast mariadb -u azuracast -pmxNcCfgFEChJ azuracast << 'EOF'
SET @carimbo_pl_id = (SELECT id FROM station_playlists WHERE station_id = 1 AND name LIKE 'Carimbos Oficiais%' LIMIT 1);

DELETE FROM station_playlist_media WHERE playlist_id = @carimbo_pl_id;

INSERT INTO station_playlist_media (playlist_id, media_id, weight, last_played, is_queued)
SELECT @carimbo_pl_id, id, 1, UNIX_TIMESTAMP(), 0
FROM station_media
WHERE storage_location_id = 3
  AND path IN (
    'CARIMBOS_OFICIAIS/carimbo_1_fem.mp3',
    'CARIMBOS_OFICIAIS/carimbo_1_masc.mp3',
    'CARIMBOS_OFICIAIS/carimbo_3_fem.mp3',
    'CARIMBOS_OFICIAIS/carimbo_3_masc.mp3'
  )
ORDER BY path;
EOF

docker exec --user azuracast azuracast /usr/local/bin/azuracast_cli azuracast:station-queues:clear || true
docker exec --user azuracast azuracast /usr/local/bin/azuracast_cli azuracast:radio:restart 1 || true
sleep 2

echo "=== 4. Resumo das Playlists Ativas na Estacao 1 ==="
docker exec azuracast mariadb -u azuracast -pmxNcCfgFEChJ azuracast -e "
SELECT p.id, p.name, p.type, p.play_per_songs, p.playback_order, COUNT(pm.id) AS total_tracks
FROM station_playlists p
LEFT JOIN station_playlist_media pm ON pm.playlist_id = p.id
WHERE p.station_id = 1
GROUP BY p.id;
"
echo "APPROVED_PACK_LIVE"
"""

def main():
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(VPS_HOST, username=VPS_USER, password=VPS_PASS)
    sftp = ssh.open_sftp()

    sftp.put(os.path.join(LOCAL_DIR, "spot_amp_2_cyber.mp3"), "/tmp/amp_pack/spot_amp_2_cyber.mp3")
    sftp.put(
        r"C:\Users\Administrador\.gemini\antigravity\scratch\amp-flow\public\audios-aprovacao.html",
        "/var/www/amplificadora/audios-aprovacao.html"
    )
    with sftp.file("/tmp/amp_pack/apply_approved.sh", "w") as rf:
        rf.write(REMOTE_SCRIPT)
    sftp.close()

    _, out, err = ssh.exec_command("chmod +x /tmp/amp_pack/apply_approved.sh && /tmp/amp_pack/apply_approved.sh")
    print(out.read().decode("utf-8", errors="replace"))
    err_t = err.read().decode("utf-8", errors="replace")
    if err_t:
        print("STDERR:", err_t[-800:])
    ssh.close()

if __name__ == "__main__":
    main()
