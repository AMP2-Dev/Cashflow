import os
import sys
import paramiko

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

VPS_HOST = "185.245.182.23"
VPS_USER = "root"
VPS_PASS = r"p5p3ALM1!007"
LOCAL_DIR = r"C:\Users\Administrador\.gemini\antigravity\scratch\amp-flow\public\audio_demos"

FILES = [
    "carimbo_1_fem.mp3",
    "carimbo_2_fem.mp3",
    "carimbo_3_fem.mp3",
    "carimbo_4_fem.mp3",
    "carimbo_1_masc_remy.mp3",
    "carimbo_2_masc_remy.mp3",
    "carimbo_3_masc_remy.mp3",
    "carimbo_4_masc_remy.mp3",
    "demo_masc_brian.mp3",
    "demo_masc_andrew.mp3",
    "spot_amp_1_ti247.mp3",
    "spot_amp_2_cyber.mp3",
    "spot_amp_3_flow_dre.mp3",
    "spot_amp_4_diagnostico.mp3",
    "spot_amp_5_indoor.mp3",
    "spot_amp_6_ink.mp3",
]

REMOTE_SCRIPT = r"""#!/bin/bash
set -e

MEDIA_ROOT="/var/lib/docker/volumes/azuracast_station_data/_data/httpsamplificadora.com.br/media"
DEMO_DIR="/var/www/amplificadora/audio_demos"
mkdir -p "$DEMO_DIR" "$MEDIA_ROOT/CARIMBOS_OFICIAIS" "$MEDIA_ROOT/SPOTS_AMP"

cd /tmp/amp_pack

echo "=== 1. Preparando 4 Trilhas com Batidas Variadas (Groove, Disco, Pop Beat e Deep Stereo Dub) ==="
# Bed Groove 1: Stereo Dub - Heroes (Deep Groove batida moderna)
BED_GROOVE1="$MEDIA_ROOT/Stereo Dub/01 - Stereo Dub - Heroes.mp3"
# Bed Groove 2: Stereo Dub - I Follow Rivers (Upbeat Pop Groove)
BED_GROOVE2="$MEDIA_ROOT/Stereo Dub/02 - Stereo Dub - I Follow Rivers.mp3"
# Bed Disco: DSCO - Good Times (Nu-Disco / Funk Beat)
BED_DISCO="$MEDIA_ROOT/DSCO/01-good-times.mp3"
# Bed Lounge Pop: Stereo Dub - Habits
BED_HABITS="$MEDIA_ROOT/Stereo Dub/03 - Stereo Dub - Habits (Stay High).mp3"

ffmpeg -y -v warning -i "$BED_GROOVE1" -vn -ar 44100 -ac 2 /tmp/amp_pack/bed_groove1.wav
ffmpeg -y -v warning -i "$BED_GROOVE2" -vn -ar 44100 -ac 2 /tmp/amp_pack/bed_groove2.wav
ffmpeg -y -v warning -i "$BED_DISCO"   -vn -ar 44100 -ac 2 /tmp/amp_pack/bed_disco.wav
ffmpeg -y -v warning -i "$BED_HABITS"  -vn -ar 44100 -ac 2 /tmp/amp_pack/bed_habits.wav

# Funcao para masterizar carimbo curto com batida dinamica
mix_carimbo() {
    local infile="$1"
    local outbase="$2"
    local bedwav="$3"
    local seek="$4"

    cp "${infile}.mp3" "$DEMO_DIR/${outbase}_natural.mp3"
    ffmpeg -y -v warning -i "${infile}.mp3" -vn -ar 44100 -ac 2 "${infile}.wav"
    local dur=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${infile}.wav")
    local total=$(python3 -c "print(round(float('$dur') + 1.2, 2))")
    local fadeout=$(python3 -c "print(round(float('$dur') + 0.4, 2))")

    ffmpeg -y -v warning -ss "$seek" -t "$total" -i "$bedwav" -i "${infile}.wav" -filter_complex \
      "[0:a]volume=0.20,afade=t=in:st=0:d=0.20,afade=t=out:st=${fadeout}:d=0.80[bed]; \
       [1:a]adelay=300|300,volume=1.70[v]; \
       [bed][v]amix=inputs=2:duration=first:dropout_transition=0:normalize=0,alimiter=limit=0.95" \
      -c:a libmp3lame -b:a 320k -ar 44100 "$DEMO_DIR/${outbase}_lounge.mp3"

    local out_dur=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$DEMO_DIR/${outbase}_lounge.mp3")
    echo "  -> ${outbase}_lounge.mp3 (${out_dur}s)"
}

echo "=== 2. Masterizando os 4 Carimbos Feminino (Vivienne) + 4 Carimbos Masculino (Remy) ==="
# Carimbos Femininos
mix_carimbo "carimbo_1_fem" "carimbo_1_ampliando"     "/tmp/amp_pack/bed_groove2.wav" 18
mix_carimbo "carimbo_2_fem" "carimbo_2_acompanha"     "/tmp/amp_pack/bed_groove1.wav" 22
mix_carimbo "carimbo_3_fem" "carimbo_3_amplificadora" "/tmp/amp_pack/bed_disco.wav"   15
mix_carimbo "carimbo_4_fem" "carimbo_4_muito_alem"    "/tmp/amp_pack/bed_habits.wav"  20

# Carimbos Masculinos (Remy)
mix_carimbo "carimbo_1_masc_remy" "carimbo_1_masc" "/tmp/amp_pack/bed_groove2.wav" 26
mix_carimbo "carimbo_2_masc_remy" "carimbo_2_masc" "/tmp/amp_pack/bed_groove1.wav" 30
mix_carimbo "carimbo_3_masc_remy" "carimbo_3_masc" "/tmp/amp_pack/bed_disco.wav"   24
mix_carimbo "carimbo_4_masc_remy" "carimbo_4_masc" "/tmp/amp_pack/bed_habits.wav"  28

# Demos extras Brian & Andrew
mix_carimbo "demo_masc_brian"  "demo_masc_brian"  "/tmp/amp_pack/bed_groove2.wav" 18
mix_carimbo "demo_masc_andrew" "demo_masc_andrew" "/tmp/amp_pack/bed_groove1.wav" 22

# Copiar os 8 Carimbos Oficiais (4 Fem + 4 Masc) para a pasta do AzuraCast
rm -f "$MEDIA_ROOT/CARIMBOS_OFICIAIS/"*.mp3
cp "$DEMO_DIR/carimbo_1_ampliando_lounge.mp3"     "$MEDIA_ROOT/CARIMBOS_OFICIAIS/carimbo_1_fem.mp3"
cp "$DEMO_DIR/carimbo_2_acompanha_lounge.mp3"     "$MEDIA_ROOT/CARIMBOS_OFICIAIS/carimbo_2_fem.mp3"
cp "$DEMO_DIR/carimbo_3_amplificadora_lounge.mp3" "$MEDIA_ROOT/CARIMBOS_OFICIAIS/carimbo_3_fem.mp3"
cp "$DEMO_DIR/carimbo_4_muito_alem_lounge.mp3"    "$MEDIA_ROOT/CARIMBOS_OFICIAIS/carimbo_4_fem.mp3"
cp "$DEMO_DIR/carimbo_1_masc_lounge.mp3"          "$MEDIA_ROOT/CARIMBOS_OFICIAIS/carimbo_1_masc.mp3"
cp "$DEMO_DIR/carimbo_2_masc_lounge.mp3"          "$MEDIA_ROOT/CARIMBOS_OFICIAIS/carimbo_2_masc.mp3"
cp "$DEMO_DIR/carimbo_3_masc_lounge.mp3"          "$MEDIA_ROOT/CARIMBOS_OFICIAIS/carimbo_3_masc.mp3"
cp "$DEMO_DIR/carimbo_4_masc_lounge.mp3"          "$MEDIA_ROOT/CARIMBOS_OFICIAIS/carimbo_4_masc.mp3"

echo "=== 3. Masterizando os 6 Spots de 30s da AMP (Intercalando Voz Masculina e Feminina + Batidas Dinamicas) ==="
mix_spot() {
    local infile="$1"
    local bedwav="$2"
    local seek="$3"

    cp "${infile}.mp3" "$DEMO_DIR/${infile}_natural.mp3"
    ffmpeg -y -v warning -i "${infile}.mp3" -vn -ar 44100 -ac 2 "${infile}.wav"
    local dur=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${infile}.wav")
    local total=$(python3 -c "print(round(float('$dur') + 2.2, 2))")
    local fadeout=$(python3 -c "print(round(float('$dur') + 0.9, 2))")

    ffmpeg -y -v warning -ss "$seek" -t "$total" -i "$bedwav" -i "${infile}.wav" -filter_complex \
      "[0:a]volume=0.17,afade=t=in:st=0:d=0.5,afade=t=out:st=${fadeout}:d=1.3[bed]; \
       [1:a]adelay=700|700,volume=1.65[v]; \
       [bed][v]amix=inputs=2:duration=first:dropout_transition=0:normalize=0,alimiter=limit=0.95" \
      -c:a libmp3lame -b:a 320k -ar 44100 "$DEMO_DIR/${infile}_lounge.mp3"

    cp "$DEMO_DIR/${infile}_lounge.mp3" "$MEDIA_ROOT/SPOTS_AMP/${infile}.mp3"
    local out_dur=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$DEMO_DIR/${infile}_lounge.mp3")
    echo "  -> ${infile}_lounge.mp3 (${out_dur}s)"
}

mix_spot "spot_amp_1_ti247"       "/tmp/amp_pack/bed_groove2.wav" 16
mix_spot "spot_amp_2_cyber"       "/tmp/amp_pack/bed_habits.wav"  18
mix_spot "spot_amp_3_flow_dre"    "/tmp/amp_pack/bed_disco.wav"   20
mix_spot "spot_amp_4_diagnostico" "/tmp/amp_pack/bed_groove1.wav" 22
mix_spot "spot_amp_5_indoor"      "/tmp/amp_pack/bed_groove2.wav" 45
mix_spot "spot_amp_6_ink"         "/tmp/amp_pack/bed_disco.wav"   48

echo "=== 4. Montando os 3 Pacotes Comerciais (Spot Masc + Spot Fem + Carimbo) ==="
# Pacote 1: Spot 1 (Masc) + Spot 2 (Fem) + Carimbo 1 (Masc)
ffmpeg -y -v warning \
  -i "$DEMO_DIR/spot_amp_1_ti247_lounge.mp3" \
  -i "$DEMO_DIR/spot_amp_2_cyber_lounge.mp3" \
  -i "$DEMO_DIR/carimbo_1_masc_lounge.mp3" \
  -filter_complex "[0:a][1:a][2:a]concat=n=3:v=0:a=1" \
  -c:a libmp3lame -b:a 320k -ar 44100 "$MEDIA_ROOT/SPOTS_AMP/bloco_comercial_1_ti_cyber.mp3"

# Pacote 2: Spot 3 (Masc) + Spot 4 (Fem) + Carimbo 2 (Fem)
ffmpeg -y -v warning \
  -i "$DEMO_DIR/spot_amp_3_flow_dre_lounge.mp3" \
  -i "$DEMO_DIR/spot_amp_4_diagnostico_lounge.mp3" \
  -i "$DEMO_DIR/carimbo_2_acompanha_lounge.mp3" \
  -filter_complex "[0:a][1:a][2:a]concat=n=3:v=0:a=1" \
  -c:a libmp3lame -b:a 320k -ar 44100 "$MEDIA_ROOT/SPOTS_AMP/bloco_comercial_2_flow_diag.mp3"

# Pacote 3: Spot 5 (Masc) + Spot 6 (Fem) + Carimbo 4 (Masc)
ffmpeg -y -v warning \
  -i "$DEMO_DIR/spot_amp_5_indoor_lounge.mp3" \
  -i "$DEMO_DIR/spot_amp_6_ink_lounge.mp3" \
  -i "$DEMO_DIR/carimbo_4_masc_lounge.mp3" \
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

chown -R 1000:1000 "$MEDIA_ROOT/CARIMBOS_OFICIAIS" "$MEDIA_ROOT/SPOTS_AMP"

echo "=== 5. Sincronizando e Corrigindo Rotacao no AzuraCast (1 Carimbo a cada Musica, 1 Pacote a cada 4 Musicas) ==="
docker exec --user azuracast azuracast /usr/local/bin/azuracast_cli azuracast:media:reprocess 1 || true
docker exec --user azuracast azuracast /usr/local/bin/azuracast_cli sync:nowplaying || true

docker exec -i azuracast mariadb -u azuracast -pmxNcCfgFEChJ azuracast << 'EOF'
-- Limpar playlists de comerciais duplicadas que causavam disparo duplo
DELETE FROM station_playlists WHERE station_id = 1 AND id != 8;

-- Garantir que a Playlist 8 (Acervo Musical) tenha APENAS musicas (sem vinhetas, sem spots, sem RMX de 1h)
DELETE FROM station_playlist_media WHERE playlist_id = 8;
INSERT INTO station_playlist_media (playlist_id, media_id, weight, last_played, is_queued)
SELECT 8, id, 1, 0, 0
FROM station_media
WHERE storage_location_id = 3
  AND path NOT LIKE 'CARIMBOS_OFICIAIS/%'
  AND path NOT LIKE 'SPOTS_AMP/%'
  AND path NOT LIKE 'vhts/%'
  AND path NOT LIKE 'AMBIENTE/%'
  AND path NOT LIKE 'RMX/%';

-- Criar Playlist unica 'Carimbos Oficiais' (toca a cada 2 itens da fila = exatamente 1 carimbo apos cada 1 musica!)
INSERT INTO station_playlists
(station_id, name, description, type, is_enabled, play_per_songs, play_per_minutes, weight, source, include_in_requests, playback_order, remote_url, remote_type, is_jingle, play_per_hour_minute, remote_timeout, backend_options, played_at, include_in_on_demand, avoid_duplicates, queue_reset_at)
SELECT 1, 'Carimbos Oficiais (Fem + Masc)', '1 Carimbo a cada musica', 'once_per_x_songs', 1, 2, 0, 20, 'songs', 0, 'random', NULL, NULL, 1, 0, 0, backend_options, NOW(), 0, 0, NOW()
FROM station_playlists WHERE id = 9;

-- Criar Playlist unica 'Pacotes Comerciais AMP' (toca a cada 8 itens da fila = 4 musicas + 4 carimbos = exatamente a cada 4 musicas!)
INSERT INTO station_playlists
(station_id, name, description, type, is_enabled, play_per_songs, play_per_minutes, weight, source, include_in_requests, playback_order, remote_url, remote_type, is_jingle, play_per_hour_minute, remote_timeout, backend_options, played_at, include_in_on_demand, avoid_duplicates, queue_reset_at)
SELECT 1, 'Pacotes Comerciais AMP (A cada 4 Musicas)', 'Pacote Comercial a cada 4 musicas', 'once_per_x_songs', 1, 8, 0, 10, 'songs', 0, 'sequential', NULL, NULL, 1, 0, 0, backend_options, NOW(), 0, 0, NOW()
FROM station_playlists WHERE id = 9;

SET @carimbo_pl_id = (SELECT id FROM station_playlists WHERE station_id = 1 AND name LIKE 'Carimbos Oficiais%' LIMIT 1);
SET @pacote_pl_id  = (SELECT id FROM station_playlists WHERE station_id = 1 AND name LIKE 'Pacotes Comerciais%' LIMIT 1);

-- Vincular os Carimbos Oficiais (Femininos + Masculinos)
INSERT INTO station_playlist_media (playlist_id, media_id, weight, last_played, is_queued)
SELECT @carimbo_pl_id, id, 1, 0, 0
FROM station_media
WHERE storage_location_id = 3 AND path LIKE 'CARIMBOS_OFICIAIS/carimbo_%'
ORDER BY path;

-- Vincular os 3 Pacotes Comerciais na Playlist de 4 musicas
INSERT INTO station_playlist_media (playlist_id, media_id, weight, last_played, is_queued)
SELECT @pacote_pl_id, id, 1, 0, 0
FROM station_media
WHERE storage_location_id = 3 AND path LIKE 'SPOTS_AMP/bloco_comercial_%'
ORDER BY path;

-- Limpar a fila futura (is_played = 0) para reconstruir limpa sem vinhetas acumuladas
DELETE FROM station_queue WHERE station_id = 1 AND is_played = 0;
EOF

docker exec --user azuracast azuracast /usr/local/bin/azuracast_cli azuracast:radio:restart 1 || true
echo "ALL_V2_DONE"
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
    with sftp.file("/tmp/amp_pack/run_v2.sh", "w") as rf:
        rf.write(REMOTE_SCRIPT)
    sftp.close()

    print("Running mastering & AzuraCast rotation fix on VPS...")
    _, out, err = ssh.exec_command("chmod +x /tmp/amp_pack/run_v2.sh && /tmp/amp_pack/run_v2.sh")
    print(out.read().decode("utf-8", errors="replace"))
    err_t = err.read().decode("utf-8", errors="replace")
    if err_t:
        print("STDERR:", err_t[-1000:])
    ssh.close()

if __name__ == "__main__":
    main()
