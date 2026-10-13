import paramiko

VPS_HOST = "185.245.182.23"
VPS_USER = "root"
VPS_PASS = "p5p3ALM1!007"

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect(VPS_HOST, 22, VPS_USER, VPS_PASS)

sql = """
-- Set Pacotes Comerciais AMP to play_per_songs = 4 (since AzuraCast ignores is_jingle=1 tracks when counting songs!)
UPDATE station_playlists SET play_per_songs = 4 WHERE id = 15;

-- Fix titles & artists of the 3 commercial blocks in station_media so they don't show the background beat's ID3 tag
UPDATE station_media
SET title = 'Bloco Comercial 1 • AMP TI 24/7 & Cibersegurança',
    artist = 'Ecossistema AMP',
    album = 'Institucional AMP'
WHERE path LIKE '%bloco_comercial_1%';

UPDATE station_media
SET title = 'Bloco Comercial 2 • AMP Flow & Diagnóstico 360',
    artist = 'Ecossistema AMP',
    album = 'Institucional AMP'
WHERE path LIKE '%bloco_comercial_2%';

UPDATE station_media
SET title = 'Bloco Comercial 3 • Rádio Indoor & AMP Ink',
    artist = 'Ecossistema AMP',
    album = 'Institucional AMP'
WHERE path LIKE '%bloco_comercial_3%';

-- Clear unplayed queue items so AzuraCast immediately rebuilds the queue with play_per_songs = 4
DELETE FROM station_queue WHERE station_id = 1 AND is_played = 0;

SELECT id, name, type, play_per_songs, is_jingle FROM station_playlists WHERE station_id = 1 AND is_enabled = 1;
SELECT id, path, title, artist FROM station_media WHERE path LIKE '%bloco_comercial%' OR path LIKE '%carimbos_amp%';
"""

stdin, stdout, stderr = client.exec_command('docker exec -i azuracast mariadb -u azuracast -pmxNcCfgFEChJ --default-character-set=utf8mb4 azuracast')
stdin.write(sql)
stdin.channel.shutdown_write()
print(stdout.read().decode("utf-8", errors="replace"))
err = stderr.read().decode("utf-8", errors="replace")
if err:
    print("ERR:", err)
client.close()
