import urllib.request
import re

url = 'https://bafarfoods.com/'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req, timeout=10) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
        # find all links
        urls = re.findall(r'href=["\'](/[^"\']*)["\']', html)
        print('INTERNAL PATHS:', set(urls))
        # find visible text snippets or JSON
        scripts_content = re.findall(r'<script[^>]*>(.*?)</script>', html, re.DOTALL)
        for sc in scripts_content:
            if 'self.__next_f.push' in sc:
                # clean next data
                matches = re.findall(r'([A-Za-z0-9 ,.!\'\"-]{15,})', sc)
                print('NEXT DATA SNIPPETS:', matches[:15])
except Exception as e:
    print('ERROR:', e)
