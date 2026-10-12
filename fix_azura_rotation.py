import paramiko
import sys

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

VPS_HOST = "185.245.182.23"
VPS_USER = "root"
VPS_PASS = r"p5p3ALM1!007"

SCRIPT = r"""#!/bin/bash
set -e

echo "=== 1. Inserindo os 8 Carimbos Oficiais (4 Fem + 4 Masc) em station_media e vinculando na Playlist ==="
docker exec -i azuracast mariadb -u azuracast -pmxNcCfgFEChJ azuracast << 'EOF'
DELETE FROM station_media WHERE storage_location_id = 3 AND path LIKE 'CARIMBOS_OFICIAIS/%';

INSERT INTO station_media (storage_location_id, unique_id, song_id, text, artist, title, album, genre, length, path, mtime, uploaded_at, art_updated_at)
VALUES
(3, SUBSTRING(MD5('c1f'), 1, 24), MD5('carimbo_1_fem'),  'Amplificadora - Carimbo 1 Fem',  'Amplificadora', 'Carimbo 1 Fem',  'Carimbos', 'Jingle', 4.78, 'CARIMBOS_OFICIAIS/carimbo_1_fem.mp3',  UNIX_TIMESTAMP(), UNIX_TIMESTAMP(), 0),
(3, SUBSTRING(MD5('c2f'), 1, 24), MD5('carimbo_2_fem'),  'Amplificadora - Carimbo 2 Fem',  'Amplificadora', 'Carimbo 2 Fem',  'Carimbos', 'Jingle', 4.46, 'CARIMBOS_OFICIAIS/carimbo_2_fem.mp3',  UNIX_TIMESTAMP(), UNIX_TIMESTAMP(), 0),
(3, SUBSTRING(MD5('c3f'), 1, 24), MD5('carimbo_3_fem'),  'Amplificadora - Carimbo 3 Fem',  'Amplificadora', 'Carimbo 3 Fem',  'Carimbos', 'Jingle', 3.10, 'CARIMBOS_OFICIAIS/carimbo_3_fem.mp3',  UNIX_TIMESTAMP(), UNIX_TIMESTAMP(), 0),
(3, SUBSTRING(MD5('c4f'), 1, 24), MD5('carimbo_4_fem'),  'Amplificadora - Carimbo 4 Fem',  'Amplificadora', 'Carimbo 4 Fem',  'Carimbos', 'Jingle', 4.78, 'CARIMBOS_OFICIAIS/carimbo_4_fem.mp3',  UNIX_TIMESTAMP(), UNIX_TIMESTAMP(), 0),
(3, SUBSTRING(MD5('c1m'), 1, 24), MD5('carimbo_1_masc'), 'Amplificadora - Carimbo 1 Masc', 'Amplificadora', 'Carimbo 1 Masc', 'Carimbos', 'Jingle', 4.80, 'CARIMBOS_OFICIAIS/carimbo_1_masc.mp3', UNIX_TIMESTAMP(), UNIX_TIMESTAMP(), 0),
(3, SUBSTRING(MD5('c2m'), 1, 24), MD5('carimbo_2_masc'), 'Amplificadora - Carimbo 2 Masc', 'Amplificadora', 'Carimbo 2 Masc', 'Carimbos', 'Jingle', 4.51, 'CARIMBOS_OFICIAIS/carimbo_2_masc.mp3', UNIX_TIMESTAMP(), UNIX_TIMESTAMP(), 0),
(3, SUBSTRING(MD5('c3m'), 1, 24), MD5('carimbo_3_masc'), 'Amplificadora - Carimbo 3 Masc', 'Amplificadora', 'Carimbo 3 Masc', 'Carimbos', 'Jingle', 3.10, 'CARIMBOS_OFICIAIS/carimbo_3_masc.mp3', UNIX_TIMESTAMP(), UNIX_TIMESTAMP(), 0),
(3, SUBSTRING(MD5('c4m'), 1, 24), MD5('carimbo_4_masc'), 'Amplificadora - Carimbo 4 Masc', 'Amplificadora', 'Carimbo 4 Masc', 'Carimbos', 'Jingle', 4.78, 'CARIMBOS_OFICIAIS/carimbo_4_masc.mp3', UNIX_TIMESTAMP(), UNIX_TIMESTAMP(), 0);

SET @carimbo_pl_id = (SELECT id FROM station_playlists WHERE station_id = 1 AND name LIKE 'Carimbos Oficiais%' LIMIT 1);
DELETE FROM station_playlist_media WHERE playlist_id = @carimbo_pl_id;

INSERT INTO station_playlist_media (playlist_id, media_id, weight, last_played, is_queued)
SELECT @carimbo_pl_id, id, 1, UNIX_TIMESTAMP(), 0
FROM station_media
WHERE storage_location_id = 3 AND path LIKE 'CARIMBOS_OFICIAIS/carimbo_%'
ORDER BY path;
EOF

echo "=== 2. Limpando a fila de reproducao e reiniciando a Estacao 1 ==="
docker exec --user azuracast azuracast /usr/local/bin/azuracast_cli azuracast:station-queues:clear || true
docker exec --user azuracast azuracast /usr/local/bin/azuracast_cli azuracast:radio:restart 1 || true
sleep 3

echo "=== 3. Resumo das Playlists da Estacao 1 ==="
docker exec azuracast mariadb -u azuracast -pmxNcCfgFEChJ azuracast -e "
SELECT p.id, p.name, p.type, p.play_per_songs, p.playback_order, p.is_jingle, COUNT(pm.id) AS total_tracks
FROM station_playlists p
LEFT JOIN station_playlist_media pm ON pm.playlist_id = p.id
WHERE p.station_id = 1
GROUP BY p.id;
"

echo "=== 4. Nova Fila (station_queue) da Estacao 1 ==="
docker exec azuracast mariadb -u azuracast -pmxNcCfgFEChJ azuracast -e "
SELECT sq.id, sq.is_played, sm.path, sp.name AS playlist_name
FROM station_queue sq
LEFT JOIN station_media sm ON sm.id = sq.media_id
LEFT JOIN station_playlists sp ON sp.id = sq.playlist_id
WHERE sq.station_id = 1 AND sq.is_played = 0
ORDER BY sq.id ASC;
"
"""

def main():
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(VPS_HOST, username=VPS_USER, password=VPS_PASS)
    sftp = ssh.open_sftp()
    with sftp.file("/tmp/amp_pack/insert_carimbos.sh", "w") as rf:
        rf.write(SCRIPT)
    sftp.close()
    _, out, err = ssh.exec_command("chmod +x /tmp/amp_pack/insert_carimbos.sh && /tmp/amp_pack/insert_carimbos.sh")
    print(out.read().decode("utf-8", errors="replace"))
    err_t = err.read().decode("utf-8", errors="replace")
    if err_t:
        print("STDERR:", err_t[-1000:])
    ssh.close()

if __name__ == "__main__":
    main()
