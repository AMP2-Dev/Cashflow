import paramiko
import sys
sys.stdout.reconfigure(encoding='utf-8')

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('185.245.182.23', username='root', password='p5p3ALM1!007', timeout=25)

stdin, stdout, stderr = ssh.exec_command('ls -lh /tmp/test_vps.mp3')
print("Result:", stdout.read().decode())
print("Err:", stderr.read().decode())

ssh.close()
