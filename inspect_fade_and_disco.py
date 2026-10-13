import paramiko
import json

VPS_HOST = "185.245.182.23"
VPS_USER = "root"
VPS_PASS = "p5p3ALM1!007"

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect(VPS_HOST, 22, VPS_USER, VPS_PASS)

sql = """
SELECT backend_config FROM station WHERE id = 1;
SELECT '--- DISCO TRACKS ---';
SELECT id, path, title, artist, length
FROM station_media
WHERE storage_location_id = 3
  AND path NOT LIKE '%Vintage Chic%'
  AND (
    path LIKE '%bee%gees%' OR title LIKE '%bee%gees%' OR artist LIKE '%bee%gees%'
    OR path LIKE '%earth%wind%' OR title LIKE '%earth%wind%' OR artist LIKE '%earth%wind%'
    OR artist LIKE '%chic%' OR title LIKE '%good times%' OR title LIKE '%le freak%'
    OR path LIKE '%kool%gang%' OR artist LIKE '%kool%'
    OR path LIKE '%gloria%gaynor%' OR artist LIKE '%gloria%gaynor%'
    OR path LIKE '%donna%summer%' OR artist LIKE '%donna%summer%'
    OR path LIKE '%abba%' OR artist LIKE '%abba%'
    OR path LIKE '%village%people%' OR artist LIKE '%village%people%'
    OR path LIKE '%boney%' OR artist LIKE '%boney%'
    OR path LIKE '%sunshine%band%' OR artist LIKE '%sunshine%band%'
    OR path LIKE '%michael%jackson%' OR artist LIKE '%michael%jackson%'
    OR path LIKE '%billy%paul%' OR artist LIKE '%billy%paul%'
    OR path LIKE '%barry%white%' OR artist LIKE '%barry%white%'
    OR path LIKE '%david%naughton%' OR path LIKE '%pat%mick%'
    OR path LIKE '%disco%' OR title LIKE '%disco%'
  )
LIMIT 60;
"""

stdin, stdout, stderr = client.exec_command('docker exec -i azuracast mariadb -u azuracast -pmxNcCfgFEChJ -N -B azuracast')
stdin.write(sql)
stdin.channel.shutdown_write()
out = stdout.read().decode("utf-8", errors="replace")
for line in out.splitlines():
    print(line)
client.close()
