import paramiko
import re

VPS_HOST = "185.245.182.23"
VPS_USER = "root"
VPS_PASS = "p5p3ALM1!007"

REMOTE_CLEANER = r'''import subprocess
import re

def run_sql(sql):
    cmd = ["docker", "exec", "-i", "azuracast", "mariadb", "-u", "azuracast", "-pmxNcCfgFEChJ", "--default-character-set=utf8mb4", "-N", "-B", "azuracast", "-e", sql]
    res = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", errors="replace")
    if res.returncode != 0:
        print("SQL ERR:", res.stderr)
    return res.stdout

rows = run_sql("SELECT id, path, IFNULL(title,''), IFNULL(artist,''), IFNULL(album,'') FROM station_media WHERE storage_location_id=3;")
lines = [l for l in rows.strip().split("\n") if l.strip()]
print(f"Total tracks in station_media: {len(lines)}")

NOISE_WORDS = [
    r'\bofficial\s+music\s+video\b',
    r'\bofficial\s+hd\s+video\b',
    r'\bofficial\s+video\b',
    r'\bofficial\s+audio\b',
    r'\bofficial\s+lyric\s+video\b',
    r'\blyric\s+video\b',
    r'\blyrics\b',
    r'\blegendado\b',
    r'\btraducao\b',
    r'\btradução\b',
    r'\baudio\s+hq\b',
    r'\baudio\s+oficial\b',
    r'\bclipe\s+oficial\b',
    r'\bvideo\s+oficial\b',
    r'\bhd\s+video\b',
    r'\bfull\s+album\b',
    r'\bremastered\s*\d*\b',
    r'\bremaster\s*\d*\b',
    r'\bhq\b',
    r'\bhd\b',
    r'\b4k\b',
    r'\b1080p\b',
    r'\b720p\b',
    r'\bmp3\b',
    r'\bflac\b',
    r'\bwav\b',
    r'\baudio\b',
    r'\bvideo\b',
    r'\bofficial\b',
    r'\byoutube\b',
    r'\bvevo\b',
    r'\btopic\b',
    r'\bvisualizer\b',
]

LOWER_WORDS = {'de', 'da', 'do', 'das', 'dos', 'e', 'em', 'na', 'no', 'nas', 'nos', 'um', 'uma', 'a', 'o', 'as', 'os', 'por', 'para', 'com', 'sem', 'of', 'the', 'in', 'on', 'at', 'to', 'for', 'and', 'or', 'by', 'with', 'from'}

def smart_title_case(text):
    words = text.split()
    out = []
    for i, w in enumerate(words):
        wl = w.lower()
        if wl in {'dj', 'mc', 'mpb', 'uk', 'usa', 'ac', 'dc', 'ab', 'tv', 'ii', 'iii', 'iv'}:
            out.append(w.upper())
        elif i > 0 and wl in LOWER_WORDS:
            out.append(wl)
        else:
            out.append(w.capitalize())
    return " ".join(out)

def clean_raw_name(raw_str):
    s = raw_str.strip()
    # remove extension
    s = re.sub(r'\.(mp3|flac|wav|m4a|ogg|aac)$', '', s, flags=re.I)
    # remove bracketed or parenthesized youtube tags
    s = re.sub(r'\[[^\]]*\]', ' ', s)
    # strip leading track numbers like "01 - ", "02-", "01. ", "102_"
    s = re.sub(r'^\d{1,3}[\s._-]+', '', s)
    # replace underscores and multiple dashes
    s = s.replace('_', ' ')
    # if it's a hyphenated slug without spaces (e.g. "02-use-it-up-wear-it-out-pat-mick" or "the-outfield-your-love-official-hd-video")
    if '-' in s and ' - ' not in s:
        s = s.replace('-', ' ')
    # remove noise words
    for pat in NOISE_WORDS:
        s = re.sub(pat, ' ', s, flags=re.I)
    # clean empty parens
    s = re.sub(r'\(\s*\)', ' ', s)
    # collapse spaces and stray hyphens
    s = re.sub(r'\s+', ' ', s).strip(' -_.,')
    return smart_title_case(s) if s else raw_str

sql_updates = []
sample_changes = []

for line in lines:
    parts = line.split("\t")
    if len(parts) < 4:
        continue
    mid, path, title, artist = parts[0], parts[1], parts[2], parts[3]
    
    # Skip our commercial blocks and carimbos
    if 'carimbos_amp' in path or 'blocos_comerciais_amp' in path or 'vinhetas_amp' in path:
        continue

    orig_title = title
    orig_artist = artist

    # Check if title looks like a slug or has track number prefix or noise words
    needs_title_clean = False
    if not title or '-' in title and ' ' not in title:
        needs_title_clean = True
    elif re.match(r'^\d{1,3}[\s._-]+', title):
        needs_title_clean = True
    elif re.search(r'(official|legendado|audio\s*hq|hd\s*video|clipe\s*oficial|lyric|youtube|vevo|_)', title, flags=re.I):
        needs_title_clean = True
    elif title == title.lower() or title == title.upper():
        needs_title_clean = True

    new_title = title
    new_artist = artist

    if needs_title_clean:
        # Check if "Artist - Title" exists in filename or title
        base = path.split('/')[-1]
        base_no_ext = re.sub(r'\.(mp3|flac|wav|m4a|ogg|aac)$', '', base, flags=re.I)
        if ' - ' in base_no_ext and not artist:
            sp = base_no_ext.split(' - ', 1)
            cand_artist = clean_raw_name(sp[0])
            cand_title = clean_raw_name(sp[1])
            if cand_artist and cand_title:
                new_artist = cand_artist
                new_title = cand_title
            else:
                new_title = clean_raw_name(title or base_no_ext)
        else:
            new_title = clean_raw_name(title or base_no_ext)

    if new_artist:
        if re.search(r'(official|vevo|topic|_)', new_artist, flags=re.I) or new_artist == new_artist.lower():
            new_artist = clean_raw_name(new_artist)

    if new_title != orig_title or new_artist != orig_artist:
        safe_title = new_title.replace("\\", "\\\\").replace("'", "\\'")
        safe_artist = new_artist.replace("\\", "\\\\").replace("'", "\\'")
        sql_updates.append(f"UPDATE station_media SET title='{safe_title}', artist='{safe_artist}' WHERE id={mid};")
        if len(sample_changes) < 25:
            sample_changes.append((orig_artist, orig_title, new_artist, new_title))

print(f"Tracks to clean: {len(sql_updates)}")
for oa, ot, na, nt in sample_changes:
    print(f"  BEFORE: [{oa}] {ot}  -->  AFTER: [{na}] {nt}")

if sql_updates:
    with open("/tmp/clean_media.sql", "w", encoding="utf-8") as f:
        f.write("SET NAMES utf8mb4;\nSTART TRANSACTION;\n")
        for st in sql_updates:
            f.write(st + "\n")
        f.write("COMMIT;\n")
    subprocess.run("docker exec -i azuracast mariadb -u azuracast -pmxNcCfgFEChJ --default-character-set=utf8mb4 azuracast < /tmp/clean_media.sql", shell=True, check=True)
    print("Database updated successfully!")
'''

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect(VPS_HOST, 22, VPS_USER, VPS_PASS)

sftp = client.open_sftp()
with sftp.file("/tmp/clean_azura_db.py", "w") as f:
    f.write(REMOTE_CLEANER)
sftp.close()

_, stdout, stderr = client.exec_command("python3 /tmp/clean_azura_db.py")
print(stdout.read().decode("utf-8", errors="replace"))
err = stderr.read().decode("utf-8", errors="replace")
if err:
    print("STDERR:", err)
client.close()
