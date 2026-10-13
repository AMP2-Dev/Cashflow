import os
import sys
import paramiko

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

VPS_HOST = "185.245.182.23"
VPS_USER = "root"
VPS_PASS = r"p5p3ALM1!007"
LOCAL_RAW_DIR = r"c:\Users\Administrador\.gemini\antigravity\scratch\amp-flow\audio_pack_v3_raw"

REMOTE_SH = r"""#!/bin/bash
set -e

MEDIA_ROOT="/var/lib/docker/volumes/azuracast_station_data/_data/httpsamplificadora.com.br/media"
DEMO_DIR="/var/www/amplificadora/audio_demos"
WORK_DIR="/tmp/amp_pack_v3"

mkdir -p "$MEDIA_ROOT/DISCO_CLUB_AMP" "$MEDIA_ROOT/SPOTS_AMP" "$MEDIA_ROOT/CARIMBOS_OFICIAIS" "$DEMO_DIR" "$WORK_DIR"
cd "$WORK_DIR"

# Prepare instrumental beds from the station's library
GOOD_TIMES="$MEDIA_ROOT/DSCO/01-good-times.mp3"
LE_FREAK="$MEDIA_ROOT/DSCO/14-le-freak.mp3"
CELEBRATION="$MEDIA_ROOT/DSCO/06-celebration.mp3"

ffmpeg -y -v warning -ss 4 -t 45 -i "$GOOD_TIMES" -vn -ar 44100 -ac 2 bed_disco_1.wav
ffmpeg -y -v warning -ss 8 -t 45 -i "$LE_FREAK" -vn -ar 44100 -ac 2 bed_disco_2.wav
ffmpeg -y -v warning -ss 2 -t 45 -i "$CELEBRATION" -vn -ar 44100 -ac 2 bed_disco_3.wav

# Helper function to master a voice track over a groove bed with tight intro/outro (no dead air, no inherited metadata)
master_track() {
  local raw_mp3="$1"
  local bed_wav="$2"
  local out_mp3="$3"
  local bed_vol="$4"
  local title_tag="$5"
  local artist_tag="$6"

  ffmpeg -y -v warning -i "$raw_mp3" -af "silenceremove=start_periods=1:start_duration=0.02:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_duration=0.02:start_threshold=-45dB,areverse" -ar 44100 -ac 2 voice_trim.wav
  local dur=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 voice_trim.wav)
  local total=$(python3 -c "print(round(float('$dur') + 1.1, 2))")
  local fadeout=$(python3 -c "print(round(float('$dur') + 0.35, 2))")

  ffmpeg -y -v warning -ss 0 -t "$total" -i "$bed_wav" -i voice_trim.wav -filter_complex \
    "[0:a]volume=${bed_vol},afade=t=in:st=0:d=0.25,afade=t=out:st=${fadeout}:d=0.75[bed]; \
     [1:a]adelay=350|350,volume=1.75[v]; \
     [bed][v]amix=inputs=2:duration=first:dropout_transition=0:normalize=0,alimiter=limit=0.96" \
    -map_metadata -1 -metadata title="$title_tag" -metadata artist="$artist_tag" \
    -c:a libmp3lame -b:a 320k -ar 44100 "$out_mp3"
}

echo "=== 1. Masterizando os 5 Drops Amplificadora (Tecnologia, Politica, Saude, Moda, Musica) ==="
master_track "raw_drops_1_tecnologia.mp3" "bed_disco_1.wav" "$DEMO_DIR/drops_1_tecnologia.mp3" "0.16" "Drops Amplificadora • Tecnologia" "Rádio Amplificadora"
master_track "raw_drops_2_politica.mp3"   "bed_disco_2.wav" "$DEMO_DIR/drops_2_politica.mp3"   "0.16" "Drops Amplificadora • Política & Economia" "Rádio Amplificadora"
master_track "raw_drops_3_saude.mp3"      "bed_disco_3.wav" "$DEMO_DIR/drops_3_saude.mp3"      "0.16" "Drops Amplificadora • Saúde & Bem-Estar" "Rádio Amplificadora"
master_track "raw_drops_4_moda.mp3"       "bed_disco_1.wav" "$DEMO_DIR/drops_4_moda.mp3"       "0.16" "Drops Amplificadora • Moda & Estilo" "Rádio Amplificadora"
master_track "raw_drops_5_musica.mp3"     "bed_disco_2.wav" "$DEMO_DIR/drops_5_musica.mp3"     "0.16" "Drops Amplificadora • Música & Cultura" "Rádio Amplificadora"

echo "=== 2. Masterizando Aberturas e Carimbos Tematicos do Disco Club Amplificadora ==="
master_track "raw_disco_intro_fem.mp3"      "bed_disco_1.wav" "$DEMO_DIR/disco_intro_fem.mp3"      "0.22" "Abertura Disco Club (Fem)" "Disco Club Amplificadora"
master_track "raw_disco_intro_masc.mp3"     "bed_disco_2.wav" "$DEMO_DIR/disco_intro_masc.mp3"     "0.22" "Abertura Disco Club (Masc)" "Disco Club Amplificadora"
master_track "raw_carimbo_disco_1_fem.mp3"  "bed_disco_1.wav" "$DEMO_DIR/carimbo_disco_1_fem.mp3"  "0.22" "Carimbo Disco 1 (Fem)" "Disco Club Amplificadora"
master_track "raw_carimbo_disco_2_masc.mp3" "bed_disco_2.wav" "$DEMO_DIR/carimbo_disco_2_masc.mp3" "0.22" "Carimbo Disco 2 (Masc)" "Disco Club Amplificadora"
master_track "raw_carimbo_disco_3_fem.mp3"  "bed_disco_3.wav" "$DEMO_DIR/carimbo_disco_3_fem.mp3"  "0.22" "Carimbo Disco 3 (Fem)" "Disco Club Amplificadora"
master_track "raw_carimbo_disco_4_masc.mp3" "bed_disco_1.wav" "$DEMO_DIR/carimbo_disco_4_masc.mp3" "0.22" "Carimbo Disco 4 (Masc)" "Disco Club Amplificadora"

echo "=== 3. Ajustando os 4 Carimbos Oficiais (1 e 3) para entrada imediata sem silencio sobrando ==="
for cfile in carimbo_1_fem.mp3 carimbo_1_masc.mp3 carimbo_3_fem.mp3 carimbo_3_masc.mp3; do
  if [ -f "$MEDIA_ROOT/CARIMBOS_OFICIAIS/$cfile" ]; then
    ffmpeg -y -v warning -i "$MEDIA_ROOT/CARIMBOS_OFICIAIS/$cfile" \
      -af "silenceremove=start_periods=1:start_duration=0.01:start_threshold=-48dB,areverse,silenceremove=start_periods=1:start_duration=0.05:start_threshold=-48dB,areverse" \
      -map_metadata -1 -metadata title="Identidade Sonora Amplificadora" -metadata artist="Rádio Amplificadora" \
      -c:a libmp3lame -b:a 320k -ar 44100 "/tmp/trim_$cfile"
    mv "/tmp/trim_$cfile" "$MEDIA_ROOT/CARIMBOS_OFICIAIS/$cfile"
    cp "$MEDIA_ROOT/CARIMBOS_OFICIAIS/$cfile" "$DEMO_DIR/$cfile"
  fi
done

echo "=== 4. Remontando os 3 Pacotes Comerciais (Spots + Drops Amplificadora + Carimbo no Fechamento) ==="
# Pacote Comercial 1: Spot 1 (TI 24/7) + Spot 2 (Saiber Seguranca) + Drops Tecnologia + Drops Politica + Carimbo 1 Masc
ffmpeg -y -v warning \
  -i "$DEMO_DIR/spot_amp_1_ti247_lounge.mp3" \
  -i "$DEMO_DIR/spot_amp_2_cyber_lounge.mp3" \
  -i "$DEMO_DIR/drops_1_tecnologia.mp3" \
  -i "$DEMO_DIR/drops_2_politica.mp3" \
  -i "$MEDIA_ROOT/CARIMBOS_OFICIAIS/carimbo_1_masc.mp3" \
  -filter_complex "[0:a][1:a][2:a][3:a][4:a]concat=n=5:v=0:a=1" \
  -map_metadata -1 -metadata title="Bloco Comercial 1 + Drops Tecnologia & Política" -metadata artist="Ecossistema AMP" \
  -c:a libmp3lame -b:a 320k -ar 44100 "$MEDIA_ROOT/SPOTS_AMP/bloco_comercial_1_ti_cyber.mp3"

# Pacote Comercial 2: Spot 3 (AMP Flow) + Spot 4 (Diagnostico 360) + Drops Saude + Drops Musica + Carimbo 3 Fem
ffmpeg -y -v warning \
  -i "$DEMO_DIR/spot_amp_3_flow_dre_lounge.mp3" \
  -i "$DEMO_DIR/spot_amp_4_diagnostico_lounge.mp3" \
  -i "$DEMO_DIR/drops_3_saude.mp3" \
  -i "$DEMO_DIR/drops_5_musica.mp3" \
  -i "$MEDIA_ROOT/CARIMBOS_OFICIAIS/carimbo_3_fem.mp3" \
  -filter_complex "[0:a][1:a][2:a][3:a][4:a]concat=n=5:v=0:a=1" \
  -map_metadata -1 -metadata title="Bloco Comercial 2 + Drops Saúde & Música" -metadata artist="Ecossistema AMP" \
  -c:a libmp3lame -b:a 320k -ar 44100 "$MEDIA_ROOT/SPOTS_AMP/bloco_comercial_2_flow_diag.mp3"

# Pacote Comercial 3: Spot 5 (Radio Indoor) + Spot 6 (AMP Ink) + Drops Moda + Drops Tecnologia + Carimbo 1 Fem
ffmpeg -y -v warning \
  -i "$DEMO_DIR/spot_amp_5_indoor_lounge.mp3" \
  -i "$DEMO_DIR/spot_amp_6_ink_lounge.mp3" \
  -i "$DEMO_DIR/drops_4_moda.mp3" \
  -i "$DEMO_DIR/drops_1_tecnologia.mp3" \
  -i "$MEDIA_ROOT/CARIMBOS_OFICIAIS/carimbo_1_fem.mp3" \
  -filter_complex "[0:a][1:a][2:a][3:a][4:a]concat=n=5:v=0:a=1" \
  -map_metadata -1 -metadata title="Bloco Comercial 3 + Drops Moda & Tecnologia" -metadata artist="Ecossistema AMP" \
  -c:a libmp3lame -b:a 320k -ar 44100 "$MEDIA_ROOT/SPOTS_AMP/bloco_comercial_3_indoor_ink.mp3"

cp "$MEDIA_ROOT/SPOTS_AMP/bloco_comercial_1_ti_cyber.mp3" "$DEMO_DIR/bloco_comercial_1_ti_cyber.mp3"
cp "$MEDIA_ROOT/SPOTS_AMP/bloco_comercial_2_flow_diag.mp3" "$DEMO_DIR/bloco_comercial_2_flow_diag.mp3"
cp "$MEDIA_ROOT/SPOTS_AMP/bloco_comercial_3_indoor_ink.mp3" "$DEMO_DIR/bloco_comercial_3_indoor_ink.mp3"

echo "=== 5. Montando os 3 Pacotes Especiais DISCO CLUB AMPLIFICADORA (Manha, Tarde e Noite antes das 22h) ==="
# Helper to normalize and trim silence from a song so transitions into Disco Carimbos are punchy
prep_song() {
  local in_song="$1"
  local out_wav="$2"
  ffmpeg -y -v warning -i "$in_song" \
    -af "silenceremove=start_periods=1:start_duration=0.05:start_threshold=-42dB,areverse,silenceremove=start_periods=1:start_duration=0.1:start_threshold=-40dB,areverse,afade=t=out:st=0:d=0.1" \
    -ar 44100 -ac 2 "$out_wav"
}

# Actually let's keep full song without cutting early, only trim dead silence at tail and add a 0.8s tail fade
prep_disco_song() {
  local in_song="$1"
  local out_wav="$2"
  ffmpeg -y -v warning -i "$in_song" \
    -af "silenceremove=start_periods=1:start_duration=0.05:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_duration=0.05:start_threshold=-45dB,afade=t=in:st=0:d=0.8,areverse" \
    -ar 44100 -ac 2 "$out_wav"
}

# PACOTE 1 (MANHA): Chic (Good Times) + Gloria Gaynor (I Will Survive) + Kool & The Gang (Celebration)
prep_disco_song "$MEDIA_ROOT/DSCO/01-good-times.mp3" m_song1.wav
prep_disco_song "$MEDIA_ROOT/DSCO/03-i-will-survive.mp3" m_song2.wav
prep_disco_song "$MEDIA_ROOT/DSCO/06-celebration.mp3" m_song3.wav

ffmpeg -y -v warning \
  -i "$DEMO_DIR/disco_intro_fem.mp3" \
  -i m_song1.wav \
  -i "$DEMO_DIR/carimbo_disco_1_fem.mp3" \
  -i m_song2.wav \
  -i "$DEMO_DIR/carimbo_disco_2_masc.mp3" \
  -i m_song3.wav \
  -i "$DEMO_DIR/carimbo_disco_4_masc.mp3" \
  -filter_complex "[0:a][1:a][2:a][3:a][4:a][5:a][6:a]concat=n=7:v=0:a=1" \
  -map_metadata -1 -metadata title="Disco Club Amplificadora • Edição Manhã (Chic, Gloria Gaynor, Kool & The Gang)" -metadata artist="Disco Club Amplificadora" \
  -c:a libmp3lame -b:a 320k -ar 44100 "$MEDIA_ROOT/DISCO_CLUB_AMP/disco_club_1_manha.mp3"

# PACOTE 2 (TARDE): Chic (Le Freak) + Donna Summer (Hot Stuff) + KC & The Sunshine Band (That's the Way I Like It)
prep_disco_song "$MEDIA_ROOT/DSCO/14-le-freak.mp3" t_song1.wav
prep_disco_song "$MEDIA_ROOT/DSCO/16-hot-stuff.mp3" t_song2.wav
prep_disco_song "$MEDIA_ROOT/DSCO/04-thats-the-way-i-like-it.mp3" t_song3.wav

ffmpeg -y -v warning \
  -i "$DEMO_DIR/disco_intro_masc.mp3" \
  -i t_song1.wav \
  -i "$DEMO_DIR/carimbo_disco_2_masc.mp3" \
  -i t_song2.wav \
  -i "$DEMO_DIR/carimbo_disco_3_fem.mp3" \
  -i t_song3.wav \
  -i "$DEMO_DIR/carimbo_disco_1_fem.mp3" \
  -filter_complex "[0:a][1:a][2:a][3:a][4:a][5:a][6:a]concat=n=7:v=0:a=1" \
  -map_metadata -1 -metadata title="Disco Club Amplificadora • Edição Tarde (Chic, Donna Summer, KC & The Sunshine Band)" -metadata artist="Disco Club Amplificadora" \
  -c:a libmp3lame -b:a 320k -ar 44100 "$MEDIA_ROOT/DISCO_CLUB_AMP/disco_club_2_tarde.mp3"

# PACOTE 3 (NOITE ANTES DAS 22H): The Trammps (Disco Inferno) + Village People (Y.M.C.A.) + Donna Summer (Bad Girls)
prep_disco_song "$MEDIA_ROOT/DSCO/07-disco-inferno.mp3" n_song1.wav
prep_disco_song "$MEDIA_ROOT/DSCO/08-y-m-c-a.mp3" n_song2.wav
prep_disco_song "$MEDIA_ROOT/DSCO/18-bad-girls.mp3" n_song3.wav

ffmpeg -y -v warning \
  -i "$DEMO_DIR/disco_intro_fem.mp3" \
  -i n_song1.wav \
  -i "$DEMO_DIR/carimbo_disco_3_fem.mp3" \
  -i n_song2.wav \
  -i "$DEMO_DIR/carimbo_disco_4_masc.mp3" \
  -i n_song3.wav \
  -i "$DEMO_DIR/carimbo_disco_2_masc.mp3" \
  -filter_complex "[0:a][1:a][2:a][3:a][4:a][5:a][6:a]concat=n=7:v=0:a=1" \
  -map_metadata -1 -metadata title="Disco Club Amplificadora • Edição Noite (The Trammps, Village People, Donna Summer)" -metadata artist="Disco Club Amplificadora" \
  -c:a libmp3lame -b:a 320k -ar 44100 "$MEDIA_ROOT/DISCO_CLUB_AMP/disco_club_3_noite.mp3"

cp "$MEDIA_ROOT/DISCO_CLUB_AMP/disco_club_1_manha.mp3" "$DEMO_DIR/disco_club_1_manha.mp3"
cp "$MEDIA_ROOT/DISCO_CLUB_AMP/disco_club_2_tarde.mp3" "$DEMO_DIR/disco_club_2_tarde.mp3"
cp "$MEDIA_ROOT/DISCO_CLUB_AMP/disco_club_3_noite.mp3" "$DEMO_DIR/disco_club_3_noite.mp3"

chown -R 1000:1000 "$MEDIA_ROOT/DISCO_CLUB_AMP" "$MEDIA_ROOT/SPOTS_AMP" "$MEDIA_ROOT/CARIMBOS_OFICIAIS"
rm -f "$WORK_DIR"/*.wav

echo "=== 6. Ajustando Crossfade no AzuraCast (fim da queda prematura de volume) e Agendando Disco Club ==="
python3 - << 'PYEOF'
import subprocess, json

def run_sql(sql):
    p = subprocess.run(
        ["docker", "exec", "-i", "azuracast", "mariadb", "-u", "azuracast", "-pmxNcCfgFEChJ", "--default-character-set=utf8mb4", "-N", "-B", "azuracast"],
        input=sql, text=True, capture_output=True
    )
    if p.returncode != 0:
        print("SQL ERR:", p.stderr)
    return p.stdout

# 1. Update station backend_config crossfade so songs don't fade down early before carimbos
cfg_raw = run_sql("SELECT backend_config FROM station WHERE id = 1;").strip()
if cfg_raw:
    cfg = json.loads(cfg_raw)
    cfg["crossfade_type"] = "normal"
    cfg["crossfade"] = 0.7
    cfg["crossfade_smart_margin"] = 1.2
    new_cfg_str = json.dumps(cfg).replace("\\", "\\\\").replace("'", "\\'")
    run_sql(f"UPDATE station SET backend_config = '{new_cfg_str}' WHERE id = 1;")
    print("Updated station crossfade to normal (0.7s tight radio transition)!")

PYEOF

# Scan media in AzuraCast so DISCO_CLUB_AMP files are indexed in station_media
docker exec --user azuracast azuracast /usr/local/bin/azuracast_cli azuracast:media:reprocess 1 || true

python3 - << 'PYEOF'
import subprocess

def run_sql(sql):
    p = subprocess.run(
        ["docker", "exec", "-i", "azuracast", "mariadb", "-u", "azuracast", "-pmxNcCfgFEChJ", "--default-character-set=utf8mb4", "-N", "-B", "azuracast"],
        input=sql, text=True, capture_output=True
    )
    if p.returncode != 0:
        print("SQL ERR:", p.stderr)
    return p.stdout

# Ensure the 3 Disco Club MP3s exist in station_media
disco_files = [
    ("DISCO_CLUB_AMP/disco_club_1_manha.mp3", "Disco Club Amplificadora • Edição Manhã", "Disco Club Amplificadora", 660, "Disco Club Manhã (10:30)", 1030, 1045),
    ("DISCO_CLUB_AMP/disco_club_2_tarde.mp3", "Disco Club Amplificadora • Edição Tarde", "Disco Club Amplificadora", 700, "Disco Club Tarde (15:30)", 1530, 1545),
    ("DISCO_CLUB_AMP/disco_club_3_noite.mp3", "Disco Club Amplificadora • Edição Noite", "Disco Club Amplificadora", 680, "Disco Club Noite (20:30)", 2030, 2045),
]

for path, title, artist, length, pl_name, start_time, end_time in disco_files:
    mid = run_sql(f"SELECT id FROM station_media WHERE storage_location_id=3 AND path='{path}' LIMIT 1;").strip()
    if not mid:
        import hashlib, time
        uid = hashlib.md5(path.encode()).hexdigest()[:24]
        run_sql(f"INSERT INTO station_media (storage_location_id, unique_id, song_id, text, artist, title, album, length, length_text, path, mtime, uploaded_at) VALUES (3, '{uid}', '{uid}', '{artist} - {title}', '{artist}', '{title}', 'Disco Club Amplificadora', {length}, '11:00', '{path}', UNIX_TIMESTAMP(), UNIX_TIMESTAMP());")
        mid = run_sql(f"SELECT id FROM station_media WHERE storage_location_id=3 AND path='{path}' LIMIT 1;").strip()
    else:
        run_sql(f"UPDATE station_media SET title='{title}', artist='{artist}', text='{artist} - {title}' WHERE id={mid};")

    # Create or update scheduled playlist for this Disco Club edition
    pl_id = run_sql(f"SELECT id FROM station_playlists WHERE station_id=1 AND name='{pl_name}' LIMIT 1;").strip()
    if not pl_id:
        run_sql(f"INSERT INTO station_playlists (station_id, name, type, source, playback_order, is_enabled, is_jingle, weight, include_in_requests, include_in_on_demand, play_per_songs, play_per_minutes, play_per_hour_minute, backend_options) VALUES (1, '{pl_name}', 'default', 'songs', 'sequential', 1, 0, 25, 0, 0, 0, 0, 0, 'interrupt,single_track');")
        pl_id = run_sql(f"SELECT id FROM station_playlists WHERE station_id=1 AND name='{pl_name}' LIMIT 1;").strip()
    else:
        run_sql(f"UPDATE station_playlists SET is_enabled=1, type='default', playback_order='sequential', backend_options='interrupt,single_track' WHERE id={pl_id};")

    # Link media to playlist
    run_sql(f"DELETE FROM station_playlist_media WHERE playlist_id={pl_id};")
    run_sql(f"INSERT INTO station_playlist_media (playlist_id, media_id, weight, last_played, is_queued) VALUES ({pl_id}, {mid}, 1, 0, 0);")

    # Create schedule entry in station_playlist_schedules
    run_sql(f"DELETE FROM station_playlist_schedules WHERE playlist_id={pl_id};")
    run_sql(f"INSERT INTO station_playlist_schedules (playlist_id, start_time, end_time, start_date, end_date, days, loop_once) VALUES ({pl_id}, {start_time}, {end_time}, NULL, NULL, NULL, 1);")
    print(f"Configured {pl_name} (playlist_id={pl_id}, media_id={mid}) at {start_time}-{end_time}!")

# Also update the titles of the 3 commercial blocks with Drops in station_media
run_sql("UPDATE station_media SET title='Bloco Comercial 1 + Drops Tecnologia & Política', artist='Ecossistema AMP', text='Ecossistema AMP - Bloco Comercial 1 + Drops' WHERE path LIKE '%bloco_comercial_1%'; UPDATE station_media SET title='Bloco Comercial 2 + Drops Saúde & Música', artist='Ecossistema AMP', text='Ecossistema AMP - Bloco Comercial 2 + Drops' WHERE path LIKE '%bloco_comercial_2%'; UPDATE station_media SET title='Bloco Comercial 3 + Drops Moda & Tecnologia', artist='Ecossistema AMP', text='Ecossistema AMP - Bloco Comercial 3 + Drops' WHERE path LIKE '%bloco_comercial_3%'; DELETE FROM station_queue WHERE station_id=1 AND is_played=0;")
PYEOF

docker exec --user azuracast azuracast /usr/local/bin/azuracast_cli azuracast:radio:restart 1 || true
echo "ALL_DROPS_AND_DISCO_CLUB_DEPLOYED_OK"
"""

def main():
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(VPS_HOST, username=VPS_USER, password=VPS_PASS)
    sftp = ssh.open_sftp()

    ssh.exec_command("mkdir -p /tmp/amp_pack_v3")
    import time
    time.sleep(1)

    for fname in os.listdir(LOCAL_RAW_DIR):
        if fname.endswith(".mp3"):
            print(f"Uploading {fname}...")
            sftp.put(os.path.join(LOCAL_RAW_DIR, fname), f"/tmp/amp_pack_v3/{fname}")

    with sftp.file("/tmp/amp_pack_v3/run_v3.sh", "w") as rf:
        rf.write(REMOTE_SH)
    sftp.close()

    print("Executing remote mastering & AzuraCast configuration...")
    _, out, err = ssh.exec_command("chmod +x /tmp/amp_pack_v3/run_v3.sh && /tmp/amp_pack_v3/run_v3.sh")
    print(out.read().decode("utf-8", errors="replace"))
    err_t = err.read().decode("utf-8", errors="replace")
    if err_t:
        print("STDERR:", err_t[-1200:])
    ssh.close()

if __name__ == "__main__":
    main()
