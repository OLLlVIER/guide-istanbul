import json, re, os, markdown
from bs4 import BeautifulSoup, NavigableString

SRC = os.path.join(os.path.dirname(__file__), "Australie-Melbourne-expose.md")
OUT = "/home/claude/olllvier/guide-istanbul/australie/index.html"
md = open(SRC).read()
# Une ligne vide avant chaque liste ou tableau, pour que le Markdown les reconnaisse
_out = []
for ln in md.split("\n"):
    if _out and (ln.lstrip().startswith(("- ", "1. ", "| ")) or re.match(r"^\d+\. ", ln)) and _out[-1].strip() and not _out[-1].lstrip().startswith(("- ", "|")) and not re.match(r"^\s*\d+\. ", _out[-1]):
        _out.append("")
    _out.append(ln)
md = "\n".join(_out)
html = markdown.markdown(md, extensions=["tables"])
soup = BeautifulSoup(html, "html.parser")

COORDS = {
 "Australia 108": (-37.8226,144.9651), "Q1 Tower": (-28.0063,153.4295), "Eureka Tower": (-37.8215,144.9644),
 "Mildura": (-34.2068,142.1367), "Shepparton": (-36.3833,145.4000), "Bundaberg": (-24.8661,152.3489), "Bowen": (-20.0130,148.2470), "Barossa Valley": (-34.5330,138.9500), "Huon Valley": (-43.0300,146.9500), "Carnarvon": (-24.8840,113.6590), "Katherine": (-14.4650,132.2640),
 "Canberra": (-35.2809,149.1300), "Sydney": (-33.8688,151.2093), "Melbourne": (-37.8136,144.9631), "Brisbane": (-27.4698,153.0251),
 "Perth": (-31.9505,115.8605), "Adélaïde": (-34.9285,138.6007), "Hobart": (-42.8821,147.3272), "Darwin": (-12.4634,130.8456),
 "Uluru": (-25.3444,131.0369), "Mont Kosciuszko": (-36.4560,148.2636), "Lac Eyre": (-28.37,137.37), "Grande Barrière": (-18.2871,147.6992),
 "Alice Springs": (-23.6980,133.8807), "Charlotte Pass": (-36.4317,148.3283), "Onslow": (-21.6376,115.1124),
 "Lakemba": (-33.9200,151.0759), "Cabramatta": (-33.8947,150.9369), "Harris Park": (-33.8233,151.0083),
 "Box Hill": (-37.8189,145.1250), "Footscray": (-37.8000,144.8990), "Dandenong": (-37.9875,145.2149),
 "Cairns": (-16.9186,145.7781), "Ningaloo": (-22.5650,113.8100), "Cradle Mountain": (-41.6848,145.9511), "Byron Bay": (-28.6474,153.6020), "Barossa": (-34.5333,138.9500),
 "Melbourne CBD": (-37.8136,144.9631), "Port Phillip Bay": (-38.10,144.85), "Yarra River": (-37.8200,144.9650),
 "Ballarat": (-37.5622,143.8503), "Bendigo": (-36.7570,144.2794),
 "Carlton": (-37.8000,144.9670), "Oakleigh": (-37.8990,145.0880), "Richmond": (-37.8110,144.9980), "Coburg": (-37.7440,144.9640), "Balaclava": (-37.8690,144.9930),
 "University of Melbourne": (-37.7983,144.9610), "Monash Clayton": (-37.9105,145.1362), "RMIT": (-37.8083,144.9631),
 "MCG": (-37.8200,144.9834), "Melbourne Park": (-37.8217,144.9785), "Flemington": (-37.7890,144.9120), "Albert Park": (-37.8497,144.9680),
}
CLIMATE = [("Darwin","32° / 25°","31° / 19°"),("Brisbane","29° / 21°","21° / 9°"),("Perth","31° / 18°","18° / 9°"),("Sydney","26° / 19°","17° / 8°"),
           ("Melbourne","26° / 14°","13° / 5°"),("Alice Springs","36° / 21°","19° / 3°"),("Hobart","20° / 10°","9° / 2°")]
STATES = [("Nouvelle-Galles du Sud","Sydney","8,67 millions"),("Victoria","Melbourne","7,15 millions"),("Queensland","Brisbane","5,74 millions"),
          ("Australie-Occidentale","Perth","3,10 millions"),("Australie-Méridionale","Adélaïde","1,92 million"),("Tasmanie","Hobart","580 700"),
          ("Territoire du Nord","Darwin","268 900"),("Territoire de la capitale","Canberra","489 700")]
STATIONS = [("Flinders Street",-37.8183,144.9671),("Southern Cross",-37.8184,144.9525),("Melbourne Central",-37.8100,144.9628),("Parliament",-37.8114,144.9730),
            ("Flagstaff",-37.8120,144.9560),("State Library (Metro Tunnel)",-37.8098,144.9645),("Town Hall (Metro Tunnel)",-37.8150,144.9665),
            ("Anzac (Metro Tunnel)",-37.8320,144.9720),("Parkville (Metro Tunnel)",-37.7990,144.9580),("Arden (Metro Tunnel)",-37.8010,144.9400)]

# Quartiers du dossier Melbourne
exec(open("/tmp/claude-0/-home-claude/ce2e77ea-7f09-57f1-bbf4-a3be98738246/scratchpad/mel/zones.py").read())
QUART = []
for i, q in enumerate(Q, 1):
    lat = sum(p[5] for p in q["places"]) / len(q["places"]); lon = sum(p[6] for p in q["places"]) / len(q["places"])
    QUART.append((f"{i}. {q['name']}", round(lat, 4), round(lon, 4), q["id"]))

# Photo d'ouverture de chaque chapitre (article Wikipédia en anglais)
PHOTO = {  # mot-clé du titre -> article Wikipédia
 "Bonheur, mentalité":"Bondi Beach",
 "questions pratiques":"Australian dollar",
 "Maisons, voitures":"Queenslander (architecture)",
 "Le pays en un regard":"Uluru","65 000 ans":"Ubirr","devenue un pays":"First Fleet","géographie":"Great Barrier Reef","Climats":"Simpson Desert",
 "États et territoires":"Sydney Harbour Bridge","Qui sont les Australiens":"Bondi Beach","immigration":"Immigration Museum, Melbourne",
 "fonctionne le pays":"Parliament House, Canberra","économie australienne":"Port Hedland, Western Australia","étudier en Australie":"University of Sydney",
 "État par État":"Barossa Valley","La vie quotidienne":"Manly, New South Wales","mode de vie":"Surf Life Saving Australia","Rapports humains":"Bondi Beach",
 "Santé":"Surf Life Saving Australia","Faune":"Koala","animaux dangereux":"Saltwater crocodile","Culture australienne":"Sydney Opera House",
 "Sport et identité":"Sydney Cricket Ground","Australiens célèbres":"Sydney Opera House","Où aller":"Twelve Apostles (Victoria)",
 "Les lieux à visiter":"Flinders Street railway station","Melbourne en un regard":"Melbourne","Premiers Peuples":"Yarra River","création de la ville":"Collins Street, Melbourne",
 "L’histoire":"Sovereign Hill","architecture victorienne":"Royal Exhibition Building","Les habitants":"Lygon Street","sociologie actuelle":"Melbourne Central",
 "communautés":"Footscray, Victoria","Économie, études":"Port of Melbourne","travailler à Melbourne":"University of Melbourne","Vivre à Melbourne":"Trams in Melbourne",
 "météo":"Brighton, Victoria","Manger, sortir":"Queen Victoria Market","Sport et vie collective":"Melbourne Cricket Ground","Concerts":"National Gallery of Victoria",
 "Melbourne et Sydney":"Southbank, Victoria","Combien":"Degraves Street",
}
def photo_for(t):
    for k, v in PHOTO.items():
        if k in t: return v
    return ""

chapters = []  # dict(id, part, num, title, nodes)
part = None
cur = None
sources = []
in_sources = False
for el in list(soup.children):
    if isinstance(el, NavigableString):
        continue
    if el.name == "h1":
        t = el.get_text()
        if t.strip() == "AUSTRALIE": part = "a"
        elif t.strip() == "MELBOURNE": part = "b"
        cur = None; continue
    if el.name == "h3" and "Sources" in el.get_text():
        in_sources = True; cur = None; continue
    if in_sources:
        sources.append(str(el)); continue
    if el.name == "h2" and part:
        m = re.match(r"(\d+)\.\s*(.*)", el.get_text())
        if not m: cur = None; continue
        cur = dict(id=f"{part}{m.group(1)}", part=part, num=int(m.group(1)), title=m.group(2), nodes=[])
        chapters.append(cur); continue
    if el.name == "hr":
        continue
    if cur is not None:
        cur["nodes"].append(el)

def place_markers(p):
    out = []
    for a in p.find_all("a"):
        name = a.get_text().strip()
        if name in COORDS:
            out.append(dict(n=name, lat=COORDS[name][0], lon=COORDS[name][1], url=a["href"]))
    return out

def render_node(el, cid):
    txt = el.get_text().strip()
    if el.name == "p" and txt.startswith("🗺️"):
        cap = re.sub(r"^(🗺️\s*)?Carte à placer\s*:\s*", "", el.find("strong").get_text() if el.find("strong") else txt)
        cap = cap.rstrip(" ·")
        mk = place_markers(el)
        kind = "points"
        if "climatiques" in cap:
            kind = "climate"; mk = [dict(n=c, lat=COORDS[c][0], lon=COORDS[c][1], extra=f"Janvier {j} · Juillet {jl}") for c, j, jl in CLIMATE]
        elif "huit États" in cap:
            kind = "states"; mk = [dict(n=c, lat=COORDS[c][0], lon=COORDS[c][1], extra=f"{s} · {p} habitants") for s, c, p in STATES]
        elif "réseau de trains" in cap:
            kind = "stations"; mk = [dict(n=n, lat=a, lon=b) for n, a, b in STATIONS]
        elif "16 quartiers" in cap:
            kind = "quartiers"; mk = [dict(n=n, lat=a, lon=b, url=f"../melbourne/#q-{i}") for n, a, b, i in QUART]
        elif "huit capitales" in cap:
            pass
        links = [a for a in el.find_all("a") if a.get_text().strip() not in COORDS]
        extra_links = "".join(f'<a class="btn" href="{a["href"]}" target="_blank" rel="noreferrer">{a.get_text()}</a>' for a in links)
        if kind == "quartiers":
            extra_links += '<a class="btn primary" href="../melbourne/">Ouvrir le dossier des 16 quartiers</a>'
        return f'<figure class="map-fig"><div class="map" data-kind="{kind}" data-markers=\'{json.dumps(mk, ensure_ascii=False).replace(chr(39), "&#39;")}\'></div><figcaption>🗺️ {cap}{(" <span class=\"btns\">" + extra_links + "</span>") if extra_links else ""}</figcaption></figure>'
    if el.name == "p" and txt.startswith("🔗"):
        btns = "".join(f'<a class="btn" href="{a["href"]}" target="_blank" rel="noreferrer">{a.get_text()} ↗</a>' for a in el.find_all("a"))
        return f'<div class="links"><span class="links-t">Pour aller plus loin</span>{btns}</div>'
    if el.name == "blockquote":
        st = el.find("strong"); kind = (st.get_text() if st else "").strip(" .").lower()
        cls = "retenir" if "retenir" in kind else "recue" if "reçue" in kind else "attention"
        inner = el.decode_contents()
        return f'<aside class="callout {cls}">{inner}</aside>'
    if el.name == "table":
        heads = [th.get_text().strip() for th in el.find_all("th")]
        for tr in el.find_all("tr"):
            for k, td in enumerate(tr.find_all("td")):
                if k < len(heads) and heads[k]:
                    td["data-label"] = heads[k]
        el["class"] = "tbl" + (" kv" if not any(heads) else "") + (" two" if len(heads) == 2 and any(heads) else "")
        return f'<div class="tbl-wrap">{el}</div>'
    # liens externes dans le texte
    for a in el.find_all("a"):
        a["target"] = "_blank"; a["rel"] = "noreferrer"
    return str(el)

# Graphiques simples
def bars(title, rows, unit="", color="#c4532e", maxv=None):
    mv = maxv or max(v for _, v in rows)
    items = "".join(f'<div class="bar"><span class="bl">{l}</span><span class="bt"><i style="width:{v / mv * 100:.1f}%;background:{color}"></i></span><span class="bv">{str(v).replace(".", ",")}{unit}</span></div>' for l, v in rows)
    return f'<figure class="chart"><figcaption>{title}</figcaption>{items}</figure>'

def temp_chart():
    data = [("Oct",19,9),("Nov",22,10),("Déc",24,12),("Jan",26,14),("Fév",26,14),("Mar",24,13),("Avr",20,10),("Juil",13,5)]
    w, h, pad = 560, 220, 30
    n = len(data); bw = (w - 2 * pad) / n
    sy = lambda v: h - pad - v / 30 * (h - 2 * pad)
    g = []
    for k, (m, mx, mn) in enumerate(data):
        x = pad + k * bw
        g.append(f'<rect x="{x + bw * .18:.1f}" y="{sy(mx):.1f}" width="{bw * .64:.1f}" height="{sy(mn) - sy(mx):.1f}" rx="6" fill="url(#tg)"/>')
        g.append(f'<text x="{x + bw / 2:.1f}" y="{sy(mx) - 6:.1f}" class="tv">{mx}°</text><text x="{x + bw / 2:.1f}" y="{sy(mn) + 14:.1f}" class="tv lo">{mn}°</text>')
        g.append(f'<text x="{x + bw / 2:.1f}" y="{h - 8}" class="tm">{m}</text>')
    return f'''<figure class="chart"><figcaption>Melbourne : températures moyennes, du maximum (en haut) au minimum (en bas)</figcaption>
<svg viewBox="0 0 {w} {h}" role="img" aria-label="Températures moyennes à Melbourne"><defs><linearGradient id="tg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e0703a"/><stop offset="1" stop-color="#3a7bd5"/></linearGradient></defs>{"".join(g)}</svg></figure>'''

def symbols():
    F = lambda f: "https://commons.wikimedia.org/wiki/Special:FilePath/" + f + "?width=360"
    items = [("Flag_of_Australia_(converted).svg","Flag of Australia","Le drapeau national","https://fr.wikipedia.org/wiki/Drapeau_de_l%27Australie"),
             ("Australian_Aboriginal_Flag.svg","Australian Aboriginal flag","Le drapeau aborigène","https://fr.wikipedia.org/wiki/Drapeau_aborig%C3%A8ne_d%27Australie"),
             ("Flag_of_the_Torres_Strait_Islanders.svg","Torres Strait Islander flag","Le drapeau du détroit de Torres","https://en.wikipedia.org/wiki/Torres_Strait_Islander_flag"),
             ("Coat_of_Arms_of_Australia.svg","Coat of arms of Australia","Les armoiries","https://fr.wikipedia.org/wiki/Armoiries_de_l%27Australie"),
             ("Flag_of_Victoria_(Australia).svg","Flag of Victoria (Australia)","Le drapeau du Victoria","https://en.wikipedia.org/wiki/Flag_of_Victoria_(Australia)")]
    cards = "".join(f'<a class="sym" href="{u}" target="_blank" rel="noreferrer"><img src="{F(f)}" data-wiki="{w}" alt="{t}" loading="lazy" onerror="symFallback(this)"><span>{t}</span></a>' for f, w, t, u in items)
    emo = "".join(f'<div class="sym emo"><b>{e}</b><span>{t}</span></div>' for e, t in [("🟢🟡","Vert et or, les couleurs"),("🌼","Le mimosa doré"),("🦘","Kangourou et émeu"),("🎵","« Advance Australia Fair »")])
    return f'<figure class="chart symbols"><figcaption>Les symboles de l’Australie</figcaption><div class="symgrid">{cards}{emo}</div></figure>'

def state_flags():
    F = lambda f: "https://commons.wikimedia.org/wiki/Special:FilePath/" + f + "?width=360"
    items = [("Flag_of_New_South_Wales.svg","Flag of New South Wales","Nouvelle-Galles du Sud"),
             ("Flag_of_Victoria_(Australia).svg","Flag of Victoria (Australia)","Victoria"),
             ("Flag_of_Queensland.svg","Flag of Queensland","Queensland"),
             ("Flag_of_Western_Australia.svg","Flag of Western Australia","Australie-Occidentale"),
             ("Flag_of_South_Australia.svg","Flag of South Australia","Australie-Méridionale"),
             ("Flag_of_Tasmania.svg","Flag of Tasmania","Tasmanie"),
             ("Flag_of_the_Northern_Territory.svg","Flag of the Northern Territory","Territoire du Nord"),
             ("Flag_of_the_Australian_Capital_Territory.svg","Flag of the Australian Capital Territory","Territoire de la capitale")]
    cards = "".join(f'<a class="sym" href="https://en.wikipedia.org/wiki/{w.replace(" ", "_")}" target="_blank" rel="noreferrer"><img src="{F(f)}" data-wiki="{w}" alt="Drapeau : {t}" loading="lazy" onerror="symFallback(this)"><span>{t}</span></a>' for f, w, t in items)
    return f'<figure class="chart symbols"><figcaption>Les drapeaux des huit États et territoires</figcaption><div class="symgrid">{cards}</div></figure>'

exec(open('frise.py').read())
EXTRA_AFTER = {
 ("États et territoires", "État ou territoire"): state_flags(),
 ("Le pays en un regard", "Les symboles du pays"): symbols(),
 ("Climats", "Doux toute l"): heat_villes(),
 ("Qui sont", "Religion (2021)"): bars("Religion en Australie (recensement 2021, en %)", [("Christianisme",43.9),("Sans religion",38.9),("Islam",3.2),("Hindouisme",2.7),("Bouddhisme",2.4),("Sikhisme",0.8)], " %", "#7a4fa0"),
 ("économie australienne", "Clients"): bars("Les cinq premières exportations (2024-2025, milliards AUD ; 1 AUD ≈ 0,61 €)", [("Minerai de fer",116.4),("Charbon",71.3),("Gaz naturel",64.7),("Éducation",53.6),("Or",46.9)], "", "#c08a12"),
 ("Vivre à Melbourne", "mois par mois : ciel"): heat_melbourne(),
 ("immigration", "8,8 millions"): bars("Premiers pays de naissance des immigrés (2025, en milliers)", [("Inde",971),("Angleterre",971),("Chine",732),("Nouvelle-Zélande",638),("Philippines",413),("Vietnam",327)], " k", "#2f7a52"),
}

HERO_STATS = {
 "a": [("27,9 M","habitants"),("7,69 M km²","14 fois la France"),("32 %","nés à l’étranger"),("12e","économie mondiale")],
 "b": [("5,44 M","habitants (Grand Melbourne)"),("194 481","dans le centre"),("7,15 M","dans l’État de Victoria"),("4e","ville la plus agréable à vivre")],
}
PART_NAME = {"a": "L’Australie", "b": "Melbourne"}
_fl = lambda f, w: f'<img class="flag" src="https://commons.wikimedia.org/wiki/Special:FilePath/{f}?width=240" data-wiki="{w}" alt="Drapeau" onerror="symFallback(this)">'
FLAG = {"a": _fl("Flag_of_Australia_(converted).svg", "Flag of Australia"), "b": _fl("Flag_of_Melbourne.svg", "Flag of Melbourne")}

secs = []
for c in chapters:
    body = []
    subs = [el for el in c["nodes"] if el.name == "h3"]
    if subs:
        for k, el in enumerate(subs, 1): el["id"] = f'{c["id"]}-{k}'
        body.append('<nav class="subnav">' + "".join(f'<a href="#{el["id"]}">{el.get_text()}</a>' for el in subs) + '</nav>')
    for el in c["nodes"]:
        body.append(render_node(el, c["id"]))
        for (cid, key), extra in EXTRA_AFTER.items():
            if cid in c["title"] and key in el.get_text() and el.name in ("ul", "p", "table"):
                body.append(extra)
    kicker = f'{PART_NAME[c["part"]]} · chapitre {c["num"]}'
    photo = photo_for(c["title"])
    part_intro = ""
    if c["num"] == 1:
        part_intro = f'<div class="part-open"><h2>{FLAG[c["part"]]}{PART_NAME[c["part"]]}</h2><div class="stats">' + "".join(f'<div><b>{v}</b><span>{l}</span></div>' for v, l in HERO_STATS[c["part"]]) + '</div></div>'
    secs.append(f'''{part_intro}<section class="chap{' people' if 'célèbres' in c['title'] else ''}" id="{c["id"]}" data-title="{c["title"]}" data-part="{c["part"]}">
  <div class="chap-photo" data-wiki="{photo}"><div class="chap-head"><div class="kicker">{kicker}</div><h3>{c["title"]}</h3></div></div>
  <div class="chap-body">{"".join(body)}</div>
</section>''')

toc = ""
for p in ("b", "a"):
    toc += f'<div class="toc-part">{PART_NAME[p]}</div><ol>' + "".join(f'<li><a href="#{c["id"]}" data-id="{c["id"]}"><span>{c["num"]}</span>{c["title"]}</a></li>' for c in chapters if c["part"] == p) + "</ol>"

order = [dict(id=c["id"], t=c["title"], p=PART_NAME[c["part"]], n=c["num"]) for c in chapters]
tpl = open(os.path.join(os.path.dirname(__file__), "site_template.html")).read()
page = (tpl.replace("<!--TOC-->", toc).replace("<!--SECTIONS-->", "\n".join(secs))
           .replace("<!--SOURCES-->", "".join(sources)).replace("/*ORDER*/", "const ORDER=" + json.dumps(order, ensure_ascii=False) + ";"))
os.makedirs(os.path.dirname(OUT), exist_ok=True)
import re as _re
page = page.replace("≈ ", "≈\u00a0").replace(" €", "\u00a0€").replace(" AUD", "\u00a0AUD")
_parts = _re.split(r"(<script.*?</script>|<style.*?</style>|<[^>]+>)", page, flags=_re.S)
page = "".join(x if x.startswith("<") else _re.sub(r"(?<=\d) (?=\d{3}\b)", "\u00a0", x) for x in _parts)
open(OUT, "w").write(page)
print("chapitres", len(chapters), "cartes", page.count('class="map"'), "graphiques", page.count('class="chart"'))
