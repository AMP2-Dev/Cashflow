import paramiko

VPS_HOST = "185.245.182.23"
VPS_USER = "root"
VPS_PASS = "p5p3ALM1!007"

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect(VPS_HOST, 22, VPS_USER, VPS_PASS)

sql = """
SELECT id, name, type, source, weight, is_enabled, is_jingle, play_per_songs, backend_options
FROM station_playlists WHERE station_id=1;
SELECT '--- QUEUE ---';
SELECT sq.id, sp.name, sm.title, sm.artist, sq.is_played, FROM_UNIXTIME(sq.timestamp_cued), FROM_UNIXTIME(sq.timestamp_played)
FROM station_queue sq
LEFT JOIN station_playlists sp ON sq.playlist_id = sp.id
LEFT JOIN station_media sm ON sq.media_id = sm.id
WHERE sq.station_id=1
ORDER BY sq.id DESC LIMIT 20;
"""

stdin, stdout, stderr = client.exec_command('docker exec -i azuracast mariadb -u azuracast -pmxNcCfgFEChJ azuracast')
stdin.write(sql)
stdin.channel.shutdown_write()
print(stdout.read().decode("utf-8", errors="replace"))
err = stderr.read().decode("utf-8", errors="replace")
if err:
    print("ERR:", err)
client.close()
