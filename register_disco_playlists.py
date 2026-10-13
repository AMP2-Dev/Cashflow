import paramiko

VPS_HOST = "185.245.182.23"
VPS_USER = "root"
VPS_PASS = r"p5p3ALM1!007"

REMOTE_PY = r"""import subprocess, hashlib

def run_sql(sql):
    p = subprocess.run(
        ["docker", "exec", "-i", "azuracast", "mariadb", "-u", "azuracast", "-pmxNcCfgFEChJ", "--default-character-set=utf8mb4", "-N", "-B", "azuracast"],
        input=sql, text=True, capture_output=True
    )
    if p.returncode != 0:
        print("SQL ERR:", p.stderr)
    return p.stdout

print("TABLES:", run_sql("SHOW TABLES LIKE '%schedule%';"))
print("DESCRIBE station_schedules:", run_sql("DESCRIBE station_schedules;"))

disco_files = [
    ("DISCO_CLUB_AMP/disco_club_1_manha.mp3", "Disco Club Amplificadora • Edição Manhã", "Disco Club Amplificadora", 660, "Disco Club Manhã (10:30)", 1030, 1045),
    ("DISCO_CLUB_AMP/disco_club_2_tarde.mp3", "Disco Club Amplificadora • Edição Tarde", "Disco Club Amplificadora", 700, "Disco Club Tarde (15:30)", 1530, 1545),
    ("DISCO_CLUB_AMP/disco_club_3_noite.mp3", "Disco Club Amplificadora • Edição Noite", "Disco Club Amplificadora", 680, "Disco Club Noite (20:30)", 2030, 2045),
]

for path, title, artist, length, pl_name, start_time, end_time in disco_files:
    mid = run_sql(f"SELECT id FROM station_media WHERE storage_location_id=3 AND path='{path}' LIMIT 1;").strip()
    if not mid:
        uid = hashlib.md5(path.encode()).hexdigest()[:24]
        run_sql(
            f"INSERT INTO station_media (storage_location_id, unique_id, song_id, text, artist, title, album, length, path, mtime, uploaded_at, art_updated_at) "
            f"VALUES (3, '{uid}', '{uid}', '{artist} - {title}', '{artist}', '{title}', 'Disco Club Amplificadora', {length}, '{path}', UNIX_TIMESTAMP(), UNIX_TIMESTAMP(), 0);"
        )
        mid = run_sql(f"SELECT id FROM station_media WHERE storage_location_id=3 AND path='{path}' LIMIT 1;").strip()
    else:
        run_sql(f"UPDATE station_media SET title='{title}', artist='{artist}', text='{artist} - {title}' WHERE id={mid};")

    pl_id = run_sql(f"SELECT id FROM station_playlists WHERE station_id=1 AND name='{pl_name}' LIMIT 1;").strip()
    if not pl_id:
        run_sql(
            f"INSERT INTO station_playlists (station_id, name, type, source, playback_order, remote_type, remote_timeout, is_enabled, is_jingle, weight, include_in_requests, include_in_on_demand, play_per_songs, play_per_minutes, play_per_hour_minute, avoid_duplicates, backend_options) "
            f"VALUES (1, '{pl_name}', 'default', 'songs', 'sequential', 'stream', 0, 1, 0, 25, 0, 0, 0, 0, 0, 1, 'interrupt,single_track');"
        )
        pl_id = run_sql(f"SELECT id FROM station_playlists WHERE station_id=1 AND name='{pl_name}' LIMIT 1;").strip()
    else:
        run_sql(f"UPDATE station_playlists SET is_enabled=1, type='default', playback_order='sequential', backend_options='interrupt,single_track' WHERE id={pl_id};")

    run_sql(f"DELETE FROM station_playlist_media WHERE playlist_id={pl_id};")
    run_sql(f"INSERT INTO station_playlist_media (playlist_id, media_id, weight, last_played, is_queued) VALUES ({pl_id}, {mid}, 1, 0, 0);")

    run_sql(f"DELETE FROM station_schedules WHERE playlist_id={pl_id};")
    run_sql(f"INSERT INTO station_schedules (playlist_id, start_time, end_time, start_date, end_date, days, loop_once, prevent_requests) VALUES ({pl_id}, {start_time}, {end_time}, NULL, NULL, NULL, 1, 0);")
    print(f"SUCCESS: {pl_name} -> playlist_id={pl_id}, media_id={mid}, schedule={start_time}-{end_time}")

print("--- ACTIVE PLAYLISTS ON STATION 1 ---")
print(run_sql("SELECT p.id, p.name, p.type, p.play_per_songs, p.is_jingle, s.start_time, s.end_time FROM station_playlists p LEFT JOIN station_schedules s ON s.playlist_id = p.id WHERE p.station_id=1 AND p.is_enabled=1;"))
"""

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect(VPS_HOST, username=VPS_USER, password=VPS_PASS)
sftp = ssh.open_sftp()
with sftp.file("/tmp/reg_disco.py", "w") as f:
    f.write(REMOTE_PY)
sftp.close()

_, out, err = ssh.exec_command("python3 /tmp/reg_disco.py && docker exec --user azuracast azuracast /usr/local/bin/azuracast_cli azuracast:radio:restart 1")
print(out.read().decode("utf-8", errors="replace"))
err_t = err.read().decode("utf-8", errors="replace")
if err_t:
    print("STDERR:", err_t)
ssh.close()
