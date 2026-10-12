import paramiko
import sys

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

VPS_HOST = "185.245.182.23"
VPS_USER = "root"
VPS_PASS = r"p5p3ALM1!007"

SQL_SCRIPT = r"""#!/bin/bash
set -e

docker exec -i azuracast mariadb -u azuracast -pmxNcCfgFEChJ azuracast << 'EOF'
-- 1. Atualizar duracoes exatas das midias de CARIMBOS_OFICIAIS e SPOTS_AMP
UPDATE station_media SET length = 3.45 WHERE storage_location_id = 3 AND path = 'CARIMBOS_OFICIAIS/carimbo_1_ampliando.mp3';
UPDATE station_media SET length = 3.12 WHERE storage_location_id = 3 AND path = 'CARIMBOS_OFICIAIS/carimbo_2_acompanha.mp3';
UPDATE station_media SET length = 3.09 WHERE storage_location_id = 3 AND path = 'CARIMBOS_OFICIAIS/carimbo_3_amplificadora.mp3';
UPDATE station_media SET length = 4.75 WHERE storage_location_id = 3 AND path = 'CARIMBOS_OFICIAIS/carimbo_4_muito_alem.mp3';

UPDATE station_media SET length = 26.37 WHERE storage_location_id = 3 AND path = 'SPOTS_AMP/spot_amp_1_ti247.mp3';
UPDATE station_media SET length = 23.99 WHERE storage_location_id = 3 AND path = 'SPOTS_AMP/spot_amp_2_cyber.mp3';
UPDATE station_media SET length = 22.24 WHERE storage_location_id = 3 AND path = 'SPOTS_AMP/spot_amp_3_flow_dre.mp3';
UPDATE station_media SET length = 22.79 WHERE storage_location_id = 3 AND path = 'SPOTS_AMP/spot_amp_4_diagnostico.mp3';
UPDATE station_media SET length = 23.75 WHERE storage_location_id = 3 AND path = 'SPOTS_AMP/spot_amp_5_indoor.mp3';
UPDATE station_media SET length = 20.92 WHERE storage_location_id = 3 AND path = 'SPOTS_AMP/spot_amp_6_ink.mp3';

UPDATE station_media SET length = 53.81 WHERE storage_location_id = 3 AND path = 'SPOTS_AMP/bloco_comercial_1_ti_cyber.mp3';
UPDATE station_media SET length = 48.15 WHERE storage_location_id = 3 AND path = 'SPOTS_AMP/bloco_comercial_2_flow_diag.mp3';
UPDATE station_media SET length = 49.42 WHERE storage_location_id = 3 AND path = 'SPOTS_AMP/bloco_comercial_3_indoor_ink.mp3';

-- 2. Configurar Playlist 8 (Acervo Musical Amplificadora)
UPDATE station_playlists
SET name = 'Acervo Musical Amplificadora',
    type = 'default',
    is_enabled = 1,
    weight = 15,
    playback_order = 'shuffle',
    is_jingle = 0,
    avoid_duplicates = 1
WHERE id = 8 AND station_id = 1;

DELETE FROM station_playlist_media WHERE playlist_id = 8;

INSERT INTO station_playlist_media (playlist_id, media_id, weight, last_played, is_queued)
SELECT 8, id, 1, 0, 0
FROM station_media
WHERE storage_location_id = 3
  AND path NOT LIKE 'CARIMBOS_OFICIAIS/%'
  AND path NOT LIKE 'SPOTS_AMP/%'
  AND path NOT LIKE 'vhts/%'
  AND path NOT LIKE 'AMBIENTE/%';

-- 3. Limpar playlists extras antigas da Estacao 1 e clonar a partir da playlist 9 (template once_per_x_songs)
DELETE FROM station_playlists WHERE station_id = 1 AND id != 8;

INSERT INTO station_playlists
(station_id, name, description, type, is_enabled, play_per_songs, play_per_minutes, weight, source, include_in_requests, playback_order, remote_url, remote_type, is_jingle, play_per_hour_minute, remote_timeout, backend_options, played_at, include_in_on_demand, avoid_duplicates, queue_reset_at)
SELECT 1, 'Carimbos Oficiais', '4 Carimbos curtos entre cada musica', 'once_per_x_songs', 1, 1, 0, 20, 'songs', 0, 'random', NULL, NULL, 1, 0, 0, backend_options, NOW(), 0, 0, NOW()
FROM station_playlists WHERE id = 9;

INSERT INTO station_playlists
(station_id, name, description, type, is_enabled, play_per_songs, play_per_minutes, weight, source, include_in_requests, playback_order, remote_url, remote_type, is_jingle, play_per_hour_minute, remote_timeout, backend_options, played_at, include_in_on_demand, avoid_duplicates, queue_reset_at)
SELECT 1, 'Intervalo Comercial AMP (Bloco 4)', '2 Spots AMP 30s + 1 Carimbo a cada 4 musicas', 'once_per_x_songs', 1, 4, 0, 10, 'songs', 0, 'sequential', NULL, NULL, 1, 0, 0, backend_options, NOW(), 0, 0, NOW()
FROM station_playlists WHERE id = 9;

INSERT INTO station_playlists
(station_id, name, description, type, is_enabled, play_per_songs, play_per_minutes, weight, source, include_in_requests, playback_order, remote_url, remote_type, is_jingle, play_per_hour_minute, remote_timeout, backend_options, played_at, include_in_on_demand, avoid_duplicates, queue_reset_at)
SELECT 1, 'Intervalo Comercial AMP (Bloco 5)', '2 Spots AMP 30s + 1 Carimbo a cada 5 musicas', 'once_per_x_songs', 1, 5, 0, 10, 'songs', 0, 'sequential', NULL, NULL, 1, 0, 0, backend_options, NOW(), 0, 0, NOW()
FROM station_playlists WHERE id = 9;

SET @carimbo_pl_id = (SELECT id FROM station_playlists WHERE station_id = 1 AND name = 'Carimbos Oficiais' LIMIT 1);
SET @bloco4_pl_id  = (SELECT id FROM station_playlists WHERE station_id = 1 AND name = 'Intervalo Comercial AMP (Bloco 4)' LIMIT 1);
SET @bloco5_pl_id  = (SELECT id FROM station_playlists WHERE station_id = 1 AND name = 'Intervalo Comercial AMP (Bloco 5)' LIMIT 1);

INSERT INTO station_playlist_media (playlist_id, media_id, weight, last_played, is_queued)
SELECT @carimbo_pl_id, id, 1, 0, 0
FROM station_media
WHERE storage_location_id = 3 AND path LIKE 'CARIMBOS_OFICIAIS/carimbo_%'
ORDER BY path;

INSERT INTO station_playlist_media (playlist_id, media_id, weight, last_played, is_queued)
SELECT @bloco4_pl_id, id, 1, 0, 0
FROM station_media
WHERE storage_location_id = 3 AND path IN ('SPOTS_AMP/bloco_comercial_1_ti_cyber.mp3', 'SPOTS_AMP/bloco_comercial_2_flow_diag.mp3')
ORDER BY path;

INSERT INTO station_playlist_media (playlist_id, media_id, weight, last_played, is_queued)
SELECT @bloco5_pl_id, id, 1, 0, 0
FROM station_media
WHERE storage_location_id = 3 AND path IN ('SPOTS_AMP/bloco_comercial_3_indoor_ink.mp3', 'SPOTS_AMP/bloco_comercial_1_ti_cyber.mp3')
ORDER BY path;

-- 4. Ativar Smart Crossfade (2.5s) no backend_config da Estacao 1
UPDATE station
SET backend_config = JSON_SET(backend_config, '$.crossfade_type', 'smart', '$.crossfade', 2.5)
WHERE id = 1;
EOF

echo "=== Playlists da Estacao 1 Configuradas ==="
docker exec azuracast mariadb -u azuracast -pmxNcCfgFEChJ azuracast -e "
SELECT p.id, p.name, p.type, p.play_per_songs, p.playback_order, p.is_jingle, COUNT(pm.id) AS total_tracks
FROM station_playlists p
LEFT JOIN station_playlist_media pm ON pm.playlist_id = p.id
WHERE p.station_id = 1
GROUP BY p.id;
"

echo "=== Reiniciando Estacao 1 ==="
docker exec --user azuracast azuracast /usr/local/bin/azuracast_cli azuracast:radio:restart 1 || true
"""

def main():
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(VPS_HOST, username=VPS_USER, password=VPS_PASS)
    sftp = ssh.open_sftp()
    with sftp.file("/tmp/amp_pack/setup_db.sh", "w") as rf:
        rf.write(SQL_SCRIPT)
    sftp.close()
    _, out, err = ssh.exec_command("chmod +x /tmp/amp_pack/setup_db.sh && /tmp/amp_pack/setup_db.sh")
    print(out.read().decode("utf-8", errors="replace"))
    err_t = err.read().decode("utf-8", errors="replace")
    if err_t:
        print("STDERR:", err_t[-1200:])
    ssh.close()

if __name__ == "__main__":
    main()
