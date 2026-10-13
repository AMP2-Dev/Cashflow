import os
import paramiko

VPS_HOST = "185.245.182.23"
VPS_USER = "root"
VPS_PASS = r"p5p3ALM1!007"
LOCAL_DIR = r"c:\Users\Administrador\.gemini\antigravity\scratch\amp-flow\eleven_demos"

REMOTE_SCRIPT = r"""#!/bin/bash
set -e

DEMO_DIR="/var/www/amplificadora/audio_demos"
cd /tmp/eleven_pack

# Mix ElevenLabs voice samples with Disco groove beds
ffmpeg -y -v warning -ss 4 -t 20 -i /var/lib/docker/volumes/azuracast_station_data/_data/httpsamplificadora.com.br/media/DSCO/01-good-times.mp3 -vn -ar 44100 -ac 2 bed1.wav
ffmpeg -y -v warning -ss 8 -t 20 -i /var/lib/docker/volumes/azuracast_station_data/_data/httpsamplificadora.com.br/media/DSCO/14-le-freak.mp3 -vn -ar 44100 -ac 2 bed2.wav

master_sample() {
  local in_voice="$1"
  local in_bed="$2"
  local out_mp3="$3"
  local vol_bed="$4"
  local title="$5"

  local dur=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$in_voice")
  local total=$(python3 -c "print(round(float('$dur') + 1.2, 2))")
  local fadeout=$(python3 -c "print(round(float('$dur') + 0.3, 2))")

  ffmpeg -y -v warning -ss 0 -t "$total" -i "$in_bed" -i "$in_voice" -filter_complex \
    "[0:a]volume=${vol_bed},afade=t=in:st=0:d=0.2,afade=t=out:st=${fadeout}:d=0.8[b]; \
     [1:a]adelay=300|300,volume=1.55[v]; \
     [b][v]amix=inputs=2:duration=first:dropout_transition=0:normalize=0,alimiter=limit=0.96" \
    -map_metadata -1 -metadata title="$title" -metadata artist="ElevenLabs • Rádio Amplificadora" \
    -c:a libmp3lame -b:a 320k -ar 44100 "$out_mp3"
}

master_sample "eleven_disco_intro_masc.mp3" "bed1.wav" "$DEMO_DIR/eleven_disco_intro_masc_groove.mp3" "0.22" "Abertura Disco Club Masc (ElevenLabs)"
master_sample "eleven_disco_intro_fem.mp3"  "bed2.wav" "$DEMO_DIR/eleven_disco_intro_fem_groove.mp3"  "0.22" "Abertura Disco Club Fem (ElevenLabs)"
master_sample "eleven_carimbo_1_fem.mp3"    "bed1.wav" "$DEMO_DIR/eleven_carimbo_1_fem_groove.mp3"    "0.22" "Carimbo 1 Fem (ElevenLabs)"

# Also copy raw natural voices (acapella sem trilha) for reference
cp eleven_disco_intro_masc.mp3 "$DEMO_DIR/eleven_disco_intro_masc_acapella.mp3"
cp eleven_disco_intro_fem.mp3  "$DEMO_DIR/eleven_disco_intro_fem_acapella.mp3"
cp eleven_carimbo_1_fem.mp3    "$DEMO_DIR/eleven_carimbo_1_fem_acapella.mp3"

rm -f /tmp/eleven_pack/*.wav
echo "ELEVEN_DEMOS_MIXED_OK"
"""

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect(VPS_HOST, username=VPS_USER, password=VPS_PASS)
sftp = ssh.open_sftp()

ssh.exec_command("mkdir -p /tmp/eleven_pack")
for fname in os.listdir(LOCAL_DIR):
    if fname.endswith(".mp3"):
        sftp.put(os.path.join(LOCAL_DIR, fname), f"/tmp/eleven_pack/{fname}")

with sftp.file("/tmp/eleven_pack/run.sh", "w") as rf:
    rf.write(REMOTE_SCRIPT)
sftp.close()

_, out, err = ssh.exec_command("chmod +x /tmp/eleven_pack/run.sh && /tmp/eleven_pack/run.sh")
print(out.read().decode("utf-8", errors="replace"))
err_t = err.read().decode("utf-8", errors="replace")
if err_t:
    print("STDERR:", err_t)
ssh.close()
