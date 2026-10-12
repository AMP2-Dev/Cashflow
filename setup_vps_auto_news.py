import paramiko

VPS_HOST = "185.245.182.23"
VPS_USER = "root"
VPS_PASS = "p5p3ALM1!007"

REMOTE_NEWS_SCRIPT = r'''#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import os
import re
import json
import time
import hashlib
import urllib.request
import urllib.parse
import xml.etree.ElementTree as ET
from datetime import datetime
from html import unescape

OUT_DIR = "/var/www/amplificadora/api"
IMG_DIR = "/var/www/amplificadora/news_images"
os.makedirs(OUT_DIR, exist_ok=True)
os.makedirs(IMG_DIR, exist_ok=True)

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Accept": "application/rss+xml, application/xml, text/xml, text/html, */*"
}

FALLBACK_IMAGES = {
    "Música": [
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1080&q=85",
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1080&q=85",
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1080&q=85",
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1080&q=85",
        "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1080&q=85",
        "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1080&q=85",
    ],
    "Tecnologia": [
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1080&q=85",
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1080&q=85",
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1080&q=85",
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1080&q=85",
        "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1080&q=85",
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1080&q=85",
    ],
    "Moda": [
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1080&q=85",
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1080&q=85",
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1080&q=85",
        "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1080&q=85",
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1080&q=85",
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1080&q=85",
    ]
}

FEEDS = [
    {
        "category": "Música",
        "urls": [
            "https://www.tenhomaisdiscosqueamigos.com/feed/",
            "https://rollingstone.com.br/feed/",
            "https://news.google.com/rss/search?q=musica+shows+albuns+artistas&hl=pt-BR&gl=BR&ceid=BR:pt-419"
        ]
    },
    {
        "category": "Tecnologia",
        "urls": [
            "https://tecnoblog.net/feed/",
            "https://rss.canaltech.com.br/rss/",
            "https://news.google.com/rss/search?q=tecnologia+inteligencia+artificial+ciberseguranca&hl=pt-BR&gl=BR&ceid=BR:pt-419"
        ]
    },
    {
        "category": "Moda",
        "urls": [
            "https://ffw.com.br/feed/",
            "https://news.google.com/rss/search?q=moda+estilo+tendencias+streetwear+camisetas&hl=pt-BR&gl=BR&ceid=BR:pt-419"
        ]
    }
]

def clean_html(raw_html):
    if not raw_html:
        return ""
    text = unescape(raw_html)
    text = re.sub(r'<[^>]+>', ' ', text)
    text = re.sub(r'\s+', ' ', text).strip()
    # Remove trailing "The post ... appeared first on ..."
    text = re.sub(r'(The post|O post).*?(appeared first on|apareceu primeiro em).*$', '', text, flags=re.I).strip()
    return text

def extract_img_from_html(raw_html):
    if not raw_html:
        return None
    m = re.search(r'<img[^>]+src=["\'](https?://[^"\']+)["\']', raw_html, flags=re.I)
    if m:
        url = m.group(1)
        if not any(x in url.lower() for x in ['pixel', 'tracker', '1x1', 'avatar', 'emoji', 'logo']):
            return url
    return None

def cache_image_locally(img_url, item_id):
    if not img_url:
        return None
    try:
        ext = ".jpg"
        if ".png" in img_url.lower():
            ext = ".png"
        elif ".webp" in img_url.lower():
            ext = ".webp"
        fname = f"{item_id}{ext}"
        fpath = os.path.join(IMG_DIR, fname)
        if os.path.exists(fpath) and os.path.getsize(fpath) > 5000:
            return f"/news_images/{fname}"
        req = urllib.request.Request(img_url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=8) as resp:
            data = resp.read()
            if len(data) > 5000:
                with open(fpath, "wb") as f:
                    f.write(data)
                return f"/news_images/{fname}"
    except Exception:
        pass
    return img_url

def parse_feed(url, category, idx_offset=0):
    items = []
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=10) as resp:
            xml_bytes = resp.read()
        root = ET.fromstring(xml_bytes)
        channel = root.find("channel")
        if channel is None:
            return items
        source_Title = clean_html(channel.findtext("title") or category)
        for item in channel.findall("item")[:8]:
            raw_title = clean_html(item.findtext("title") or "")
            if not raw_title or len(raw_title) < 15:
                continue
            source_name = source_Title
            if " - " in raw_title and "news.google.com" in url:
                parts = raw_title.rsplit(" - ", 1)
                raw_title = parts[0].strip()
                source_name = parts[1].strip()

            link = (item.findtext("link") or "").strip()
            desc_raw = item.findtext("description") or ""
            content_encoded = ""
            for child in item:
                if child.tag.endswith("encoded") and child.text:
                    content_encoded = child.text
                elif child.tag.endswith("content") and child.attrib.get("url"):
                    pass

            img_url = None
            # Check media:content or enclosure
            for child in item:
                tag_l = child.tag.lower()
                if ("content" in tag_l or "thumbnail" in tag_l or "enclosure" in tag_l) and child.attrib.get("url"):
                    u = child.attrib.get("url")
                    if u and u.startswith("http") and not u.endswith(".mp3"):
                        img_url = u
                        break
            if not img_url:
                img_url = extract_img_from_html(content_encoded) or extract_img_from_html(desc_raw)

            summary = clean_html(desc_raw)
            if not summary or summary.lower().startswith(raw_title[:20].lower()) or len(summary) < 40:
                summary = f"Confira os detalhes e os impactos dessa novidade em {category.lower()} selecionada pela curadoria da Rádio Amplificadora."
            if len(summary) > 220:
                summary = summary[:217].rsplit(" ", 1)[0] + "..."

            item_hash = hashlib.md5(raw_title.encode("utf-8")).hexdigest()[:10]
            fallback_list = FALLBACK_IMAGES.get(category, FALLBACK_IMAGES["Música"])
            fallback_img = fallback_list[(len(items) + idx_offset) % len(fallback_list)]

            final_img = cache_image_locally(img_url, f"{category.lower()}_{item_hash}")
            if not final_img or not final_img.startswith("/news_images/"):
                final_img = cache_image_locally(fallback_img, f"fb_{category.lower()}_{(len(items)+idx_offset)%len(fallback_list)}") or fallback_img

            items.append({
                "id": f"news-{category.lower()}-{item_hash}",
                "category": category,
                "title": raw_title,
                "summary": summary,
                "source": source_name[:32],
                "link": link,
                "cover": final_img,
                "date": datetime.now().strftime("%d/%m/%Y • %H:%M"),
                "instagramTag": f"#{category.upper().replace('Ú','U')} #Amplificadora"
            })
    except Exception as e:
        print(f"Feed error ({url}): {e}")
    return items

def main():
    by_cat = {"Música": [], "Tecnologia": [], "Moda": []}
    seen_titles = set()

    for group in FEEDS:
        cat = group["category"]
        for u in group["urls"]:
            fetched = parse_feed(u, cat, len(by_cat[cat]))
            for it in fetched:
                norm = it["title"].lower()[:40]
                if norm not in seen_titles:
                    seen_titles.add(norm)
                    by_cat[cat].append(it)
            if len(by_cat[cat]) >= 6:
                break

    # Interleave 2 of each for the top 6 default view (Música, Tecnologia, Moda x 2)
    featured_six = []
    for i in range(2):
        for cat in ["Música", "Tecnologia", "Moda"]:
            if i < len(by_cat[cat]):
                featured_six.append(by_cat[cat][i])

    payload = {
        "updatedAt": datetime.now().isoformat(),
        "updatedLabel": datetime.now().strftime("%d/%m/%Y às %H:%M"),
        "featuredSix": featured_six,
        "categories": by_cat
    }

    out_file = os.path.join(OUT_DIR, "news-feed.json")
    with open(out_file, "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False, indent=2)
    print(f"Saved {len(featured_six)} featured cards (Total: M={len(by_cat['Música'])}, T={len(by_cat['Tecnologia'])}, Mo={len(by_cat['Moda'])}) to {out_file}")

if __name__ == "__main__":
    main()
'''

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect(VPS_HOST, 22, VPS_USER, VPS_PASS)

sftp = client.open_sftp()
with sftp.file("/usr/local/bin/update_amp_news.py", "w") as f:
    f.write(REMOTE_NEWS_SCRIPT)
sftp.close()

cmd = """
chmod +x /usr/local/bin/update_amp_news.py
python3 /usr/local/bin/update_amp_news.py
(crontab -l 2>/dev/null | grep -v 'update_amp_news.py'; echo '*/30 * * * * /usr/bin/python3 /usr/local/bin/update_amp_news.py >/dev/null 2>&1') | crontab -
ls -lh /var/www/amplificadora/api/news-feed.json
"""
_, stdout, stderr = client.exec_command(cmd)
print(stdout.read().decode("utf-8", errors="replace"))
err = stderr.read().decode("utf-8", errors="replace")
if err:
    print("STDERR:", err)
client.close()
