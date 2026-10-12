import urllib.request
from datetime import datetime, timezone

req = urllib.request.Request("https://www.microsoft.com", method="HEAD")
with urllib.request.urlopen(req) as resp:
    print("Microsoft Server Date:", resp.headers.get("Date"))
print("Local UTC Date:", datetime.now(timezone.utc))
