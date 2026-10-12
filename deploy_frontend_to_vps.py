import os
import paramiko

VPS_HOST = "185.245.182.23"
VPS_USER = "root"
VPS_PASS = r"p5p3ALM1!007"
DIST_DIR = r"C:\Users\Administrador\.gemini\antigravity\scratch\amp-flow\dist"
REMOTE_ROOT = "/var/www/amplificadora"

def main():
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(VPS_HOST, username=VPS_USER, password=VPS_PASS)
    sftp = ssh.open_sftp()

    # Upload index.html and audios-aprovacao.html
    sftp.put(os.path.join(DIST_DIR, "index.html"), f"{REMOTE_ROOT}/index.html")
    sftp.put(
        r"C:\Users\Administrador\.gemini\antigravity\scratch\amp-flow\public\audios-aprovacao.html",
        f"{REMOTE_ROOT}/audios-aprovacao.html"
    )

    # Upload assets/*
    assets_dir = os.path.join(DIST_DIR, "assets")
    for fname in os.listdir(assets_dir):
        local_p = os.path.join(assets_dir, fname)
        if os.path.isfile(local_p):
            print(f"Uploading assets/{fname}...")
            sftp.put(local_p, f"{REMOTE_ROOT}/assets/{fname}")

    sftp.close()
    ssh.close()
    print("FRONTEND_DEPLOYED_OK")

if __name__ == "__main__":
    main()
