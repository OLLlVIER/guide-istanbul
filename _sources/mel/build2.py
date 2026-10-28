import json, math, os, html
exec(open('zones.py').read())
exec(open('chapters.py').read())
exec(open('themes.py').read())
e = html.escape

def dist(a, b):
    R = 6371000; r = math.radians
    h = math.sin(r(b[0]-a[0])/2)**2 + math.cos(r(a[0]))*math.cos(r(b[0]))*math.sin(r(b[1]-a[1])/2)**2
    return 2*R*math.asin(math.sqrt(h))

def walk(a, b):
    m = dist(a, b) * 1.3
    mins = max(1, round(m / 80))
    if mins > 35:
        return "en tram, en train ou en voiture"
    return f"{mins} min à pied"

zcol = {z[0]: z[2] for z in ZONES}
data = []
n = 0
for qi, q in enumerate(Q, 1):
    places = []
    for i, p in enumerate(q['places']):
        n += 1
        nxt = q['places'][i+1] if i + 1 < len(q['places']) else None
        tg = TAGS[p[1]].split() + (["gratuit"] if p[4].startswith(("gratuit", "entrée gratuite", "place gratuite", "jardins gratuits")) else [])
        places.append(dict(n=n, rank=p[0], name=p[1], desc=p[2], dur=p[3], acc=p[4], lat=p[5], lon=p[6], wiki=p[7], tags=tg,
                           next=(walk((p[5], p[6]), (nxt[5], nxt[6])) + " jusqu’à " + nxt[1]) if nxt else ""))
    ins = []
    for s in q['insolite']:
        n += 1
        ins.append(dict(n=n, name=s[0], desc=s[1], lat=s[2], lon=s[3], tags=TAGS[s[0]].split() + ["insolite"] + (["gratuit"] if s[0] in FREE_INSOLITE else [])))
    lat = sum(p['lat'] for p in places) / len(places); lon = sum(p['lon'] for p in places) / len(places)
    data.append(dict(num=qi, id=q['id'], zone=q['zone'], color=zcol[q['zone']], name=q['name'], sub=q['sub'],
                     history=q['history'], identity=q['identity'], economy=q['economy'], change=q['change'], why=q['why'],
                     go=q['go'], time=q['time'], budget=q['budget'], places=places, insolite=ins, lat=lat, lon=lon))

def cards(rows, cls="info"):
    return "".join(f'<div class="{cls}"><h3>{e(a)}</h3><p>{e(b)}</p></div>' for a, b in rows)

chapters = f'''
<section class="block alt" id="comprendre"><div class="wrap">
  <div class="kicker">Comprendre Melbourne</div>
  <h2 class="title">Une ville bâtie par l’or et par l’immigration</h2>
  <p class="lead">Fondée il y a moins de deux siècles sur les terres des peuples kulin, Melbourne a été la ville la plus riche du monde, la capitale de l’Australie, puis l’une des métropoles les plus multiculturelles de la planète.</p>
  <div class="timeline">{"".join(f'<div><b>{e(a)}</b>{e(b)}</div>' for a, b in TIMELINE)}</div>
  <h3 class="sub2">Qui sont les Melburniens ?</h3>
  <div class="grid3">{cards(SOCIO)}</div>
  <h3 class="sub2">Melbourne et le reste de l’Australie</h3>
  <div class="grid2">{cards(COMPARE)}</div>
</div></section>
<section class="block" id="manger"><div class="wrap">
  <div class="kicker">Manger</div>
  <h2 class="title">La capitale gourmande de l’Australie</h2>
  <p class="lead">Chaque vague d’immigration a apporté sa cuisine. Résultat : on mange grec, italien, vietnamien, chinois ou éthiopien dans la même rue, et le café y est une religion.</p>
  <div class="grid3">{cards(FOOD, "info food")}</div>
</div></section>
<section class="block alt" id="sport"><div class="wrap">
  <div class="kicker">Le sport</div>
  <h2 class="title">La capitale sportive du pays</h2>
  <p class="lead">Melbourne accueille plus de grands événements sportifs que n’importe quelle ville australienne. Ici, le sport est une culture, un sujet de conversation et un rendez-vous familial.</p>
  <h3 class="sub2">À voir</h3>
  <div class="grid3">{cards(SPORT_WATCH)}</div>
  <h3 class="sub2">À pratiquer</h3>
  <div class="grid3">{cards(SPORT_DO)}</div>
</div></section>
<section class="block" id="pratique"><div class="wrap">
  <div class="kicker">Pratique</div>
  <h2 class="title">Bon à savoir</h2>
  <div class="grid3">{cards(PRATIQUE)}</div>
  <p class="links-row"><a class="pl" href="https://www.ptv.vic.gov.au/" target="_blank" rel="noreferrer">Transports (PTV)</a><a class="pl" href="https://www.fairwork.gov.au/" target="_blank" rel="noreferrer">Fair Work (salaires)</a><a class="pl" href="https://www.visitmelbourne.com/" target="_blank" rel="noreferrer">Visit Melbourne</a><a class="pl" href="https://whatson.melbourne.vic.gov.au/" target="_blank" rel="noreferrer">What’s On Melbourne</a></p>
</div></section>
<section class="end"><div class="wrap">
  <div class="kicker">Le mot de la fin</div>
  <h2 class="title">Melbourne se vit, elle ne se visite pas</h2>
  <p>Ce n’est pas une ville de monuments, c’est une ville de quartiers. Prends un café dans une ruelle, monte dans un tram sans savoir où il va, regarde un match au MCG, mange vietnamien à Richmond, grec sur Lonsdale Street et italien à Carlton, et termine la journée sur la jetée de St Kilda en attendant les manchots.</p>
</div></section>
<footer><div class="wrap">
  Sources : Australian Bureau of Statistics (population au 30 juin 2025 et au 31 mars 2026 ; recensement 2021, Victoria), Economist Intelligence Unit (2025), Fair Work (salaire minimum 2026), Public Transport Victoria (tarifs 2026), Business Victoria (jours fériés 2026), Port of Melbourne (2025-2026), Wikipédia. Photos : Wikipédia et Wikimedia Commons, sous licences libres. Positions sur la carte indicatives : utiliser Maps ou Waze pour l’adresse exacte. Horaires et prix à vérifier avant de partir.
</div></footer>'''

tpl = open('template2.html').read()
out = tpl.replace('/*DATA*/', 'const ZONES=' + json.dumps([dict(id=z[0], name=z[1], color=z[2], intro=z[3]) for z in ZONES], ensure_ascii=False) + ';\nconst QUARTIERS=' + json.dumps(data, ensure_ascii=False) + ';\nconst THEMES=' + json.dumps([dict(id=a, name=b, ico=c) for a, b, c in THEMES], ensure_ascii=False) + ';')
out = out.replace('<!--STATS-->', "".join(f'<div class="stat"><div class="v">{e(a)}</div><div class="l">{e(b)}</div></div>' for a, b in STATS))
out = out.replace('<!--CHAPTERS-->', chapters)
os.makedirs('/home/claude/olllvier/guide-istanbul/melbourne', exist_ok=True)
open('/home/claude/olllvier/guide-istanbul/melbourne/index.html', 'w').write(out)
print('quartiers', len(data), 'lieux', n)
