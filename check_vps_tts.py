import paramiko

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('185.245.182.23', username='root', password='p5p3ALM1!007', timeout=25)

stdin, stdout, stderr = ssh.exec_command('date -u && python3 -c "import edge_tts; print(edge_tts.__file__)"')
print("VPS date and edge_tts:\n", stdout.read().decode())
print("VPS err:\n", stderr.read().decode())

ssh.close()
