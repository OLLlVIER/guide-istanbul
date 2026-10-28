# Frise climatique mois par mois (source : weather2travel, moyennes)
MOIS = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"]
# (max, min, pluie mm, soleil h/j)
CLIM = {
 "Melbourne": [(26,14,51,9),(26,14,45,8),(24,13,44,7),(20,10,54,5),(16,8,64,4),(14,6,40,4),(13,5,48,4),(14,6,56,5),(16,7,54,6),(19,9,62,6),(22,10,55,7),(24,12,56,8)],
 "Sydney": [(26,19,124,7),(26,19,142,7),(25,18,153,7),(23,15,118,7),(20,12,108,6),(18,9,151,6),(17,8,77,7),(18,9,96,7),(20,11,62,7),(22,14,91,8),(24,16,102,8),(26,18,86,8)],
 "Brisbane": [(29,21,168,8),(29,21,176,8),(28,19,143,8),(26,17,94,7),(24,14,93,6),(22,11,69,7),(21,9,66,7),(22,10,43,8),(24,12,33,9),(26,15,93,9),(28,18,100,9),(29,20,130,9)],
 "Darwin": [(32,25,428,6),(31,25,333,6),(32,25,311,7),(33,24,97,9),(32,22,20,10),(31,20,1,10),(31,19,1,10),(31,21,3,10),(33,23,15,10),(33,25,74,10),(33,25,135,9),(33,26,240,7)],
 "Perth": [(31,18,8,11),(31,18,18,10),(29,17,15,9),(25,14,45,7),(21,11,112,6),(19,10,177,5),(18,9,169,5),(18,9,118,7),(20,10,71,8),(22,11,52,9),(25,13,25,10),(28,16,12,11)],
 "Alice Springs": [(36,21,39,10),(35,20,36,10),(32,17,39,10),(28,12,17,9),(23,8,23,8),(20,5,17,9),(19,3,17,9),(22,6,11,10),(27,10,10,10),(31,15,22,10),(34,18,25,10),(36,20,38,10)],
 "Hobart": [(20,10,54,8),(20,10,56,7),(18,9,58,6),(16,7,73,5),(12,5,77,4),(10,3,73,4),(9,2,85,4),(11,3,85,5),(13,4,75,5),(15,6,84,7),(17,7,83,7),(18,9,78,7)],
}
MEL_SEA = [19,20,20,18,15,13,12,11,12,14,16,18]
MEL_UV = [11,10,8,5,3,2,2,3,5,7,9,11]
MEL_RAINDAYS = [10,9,10,9,10,10,10,10,10,12,10,9]

def tcol(v):
    # bleu (0°) -> jaune (20°) -> rouge (36°)
    stops = [(0,(58,110,200)),(12,(90,170,210)),(20,(240,200,80)),(28,(235,130,50)),(36,(200,50,40))]
    v = max(0, min(36, v))
    for (a, ca), (b, cb) in zip(stops, stops[1:]):
        if v <= b:
            t = (v - a) / (b - a)
            return "#%02x%02x%02x" % tuple(round(ca[i] + (cb[i] - ca[i]) * t) for i in range(3))
    return "#c83228"

def uvcol(u):
    return "#4caf50" if u <= 2 else "#f2c200" if u <= 5 else "#f08a24" if u <= 7 else "#d8342c" if u <= 10 else "#8e3fa8"

def frise_svg(city, detailed=False):
    d = CLIM[city]
    W, L = 760, 96          # largeur, marge gauche pour libellés
    cw = (W - L - 6) / 12
    y = 0; g = []
    cx = lambda k: L + k * cw + cw / 2
    # saisons (hémisphère sud)
    seasons = [("Été", 11, 2, "#fde3c8"), ("Automne", 2, 5, "#f6e7c1"), ("Hiver", 5, 8, "#d9e6f5"), ("Printemps", 8, 11, "#dcefd9")]
    g.append(f'<text x="4" y="{y+15}" class="fl">Saison</text>')
    for name, a, b, col in seasons:
        if a == 11:  # été : décembre + janvier-février
            g.append(f'<rect x="{L + 11*cw:.1f}" y="{y+2}" width="{cw-2:.1f}" height="18" rx="5" fill="{col}"/>')
            g.append(f'<rect x="{L:.1f}" y="{y+2}" width="{2*cw-2:.1f}" height="18" rx="5" fill="{col}"/>')
            g.append(f'<text x="{L + cw:.1f}" y="{y+15}" class="fs">{name}</text>')
        else:
            g.append(f'<rect x="{L + a*cw:.1f}" y="{y+2}" width="{3*cw-2:.1f}" height="18" rx="5" fill="{col}"/>')
            g.append(f'<text x="{L + (a+1.5)*cw:.1f}" y="{y+15}" class="fs">{name}</text>')
    y += 26
    for k, m in enumerate(MOIS):
        g.append(f'<text x="{cx(k):.1f}" y="{y+13}" class="tm">{m}</text>')
    y += 20
    # températures : échelle fixe 0-40 pour comparer les villes
    H = 150; top = y + 16
    sy = lambda v: top + (40 - v) / 40 * (H - 30)
    g.append(f'<text x="4" y="{top+12}" class="fl">Températures</text><text x="4" y="{top+26}" class="fl2">max / min</text>')
    for t in (0, 10, 20, 30):
        g.append(f'<line x1="{L}" x2="{W-6}" y1="{sy(t):.1f}" y2="{sy(t):.1f}" class="gl"/><text x="{L-4}" y="{sy(t)+4:.1f}" class="ax">{t}°</text>')
    for k, (mx, mn, r, s) in enumerate(d):
        x = cx(k)
        g.append(f'<rect x="{x-cw*.28:.1f}" y="{sy(mx):.1f}" width="{cw*.56:.1f}" height="{sy(mn)-sy(mx):.1f}" rx="7" fill="url(#g{k}{city[:3]}{int(detailed)})"/>')
        g.append(f'<defs><linearGradient id="g{k}{city[:3]}{int(detailed)}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{tcol(mx)}"/><stop offset="1" stop-color="{tcol(mn)}"/></linearGradient></defs>')
        g.append(f'<text x="{x:.1f}" y="{sy(mx)-5:.1f}" class="tv">{mx}°</text><text x="{x:.1f}" y="{sy(mn)+14:.1f}" class="tv lo">{mn}°</text>')
    y = top + H
    # pluie
    RH = 70; rmax = max(180, max(v[2] for v in d))
    g.append(f'<text x="4" y="{y+14}" class="fl">Pluie</text><text x="4" y="{y+28}" class="fl2">mm par mois</text>')
    base = y + RH
    for k, (mx, mn, r, s) in enumerate(d):
        h = max(2, r / rmax * (RH - 18))
        g.append(f'<rect x="{cx(k)-cw*.3:.1f}" y="{base-h:.1f}" width="{cw*.6:.1f}" height="{h:.1f}" rx="3" fill="#3f86c9"/>')
        g.append(f'<text x="{cx(k):.1f}" y="{base-h-4:.1f}" class="rv">{r}</text>')
    y = base + 8
    if detailed:
        g.append(f'<text x="4" y="{y+14}" class="fl2">jours de pluie</text>')
        for k, n in enumerate(MEL_RAINDAYS):
            g.append(f'<text x="{cx(k):.1f}" y="{y+14}" class="rv">{n} j</text>')
        y += 22
    # soleil
    g.append(f'<text x="4" y="{y+20}" class="fl">Soleil</text><text x="4" y="{y+34}" class="fl2">heures par jour</text>')
    for k, (mx, mn, r, s) in enumerate(d):
        rad = 4 + s * 1.25
        g.append(f'<circle cx="{cx(k):.1f}" cy="{y+20}" r="{rad:.1f}" fill="#f5b800" opacity=".9"/><text x="{cx(k):.1f}" y="{y+46}" class="sv">{s} h</text>')
    y += 54
    if detailed:
        g.append(f'<text x="4" y="{y+16}" class="fl">Mer</text>')
        for k, t in enumerate(MEL_SEA):
            g.append(f'<rect x="{cx(k)-cw*.42:.1f}" y="{y+2}" width="{cw*.84:.1f}" height="22" rx="6" fill="{tcol(t)}" opacity=".85"/><text x="{cx(k):.1f}" y="{y+17}" class="cv">{t}°</text>')
        y += 28
        g.append(f'<text x="4" y="{y+16}" class="fl">Indice UV</text>')
        for k, u in enumerate(MEL_UV):
            g.append(f'<rect x="{cx(k)-cw*.42:.1f}" y="{y+2}" width="{cw*.84:.1f}" height="22" rx="6" fill="{uvcol(u)}"/><text x="{cx(k):.1f}" y="{y+17}" class="cv w">{u}</text>')
        y += 30
    return f'<svg viewBox="0 0 {W} {y+4:.0f}" role="img" aria-label="Climat mois par mois à {city}">{"".join(g)}</svg>'

LEGEND = '<p class="fr-note">Moyennes mensuelles. Températures sur la même échelle pour toutes les villes. Source : <a href="https://www.weather2travel.com/australia/" target="_blank" rel="noreferrer">weather2travel</a>, d’après le <a href="https://www.bom.gov.au/climate/averages/" target="_blank" rel="noreferrer">Bureau of Meteorology</a>.</p>'

def frise_villes():
    cities = ["Melbourne", "Sydney", "Brisbane", "Darwin", "Perth", "Alice Springs", "Hobart"]
    tabs = "".join(f'<button type="button" class="fr-tab{" on" if i == 0 else ""}" data-c="{i}">{c}</button>' for i, c in enumerate(cities))
    panes = "".join(f'<div class="fr-pane" data-c="{i}"{"" if i == 0 else " hidden"}>{frise_svg(c)}</div>' for i, c in enumerate(cities))
    return f'<figure class="chart frise"><figcaption>Frise du climat mois par mois : choisis une ville</figcaption><p class="fr-hint">↔ Fais glisser la frise pour voir tous les mois</p><div class="fr-tabs">{tabs}</div>{panes}{LEGEND}</figure>'

def frise_melbourne():
    return f'<figure class="chart frise"><figcaption>Melbourne mois par mois : températures, pluie, soleil, mer et UV</figcaption><p class="fr-hint">↔ Fais glisser la frise pour voir tous les mois</p>{frise_svg("Melbourne", True)}<p class="fr-note">UV : <b style="color:#f08a24">6-7 élevé</b>, <b style="color:#d8342c">8-10 très élevé</b>, <b style="color:#8e3fa8">11 extrême</b>. Source : <a href="https://www.weather2travel.com/australia/melbourne/climate/" target="_blank" rel="noreferrer">weather2travel</a>, <a href="https://www.bom.gov.au/climate/averages/tables/cw_086338.shtml" target="_blank" rel="noreferrer">Bureau of Meteorology</a>.</p></figure>'

# --- Versions synthétiques : cartes de chaleur
INI = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"]
def _txt(bg):
    r, g, b = int(bg[1:3], 16), int(bg[3:5], 16), int(bg[5:7], 16)
    return "#fff" if (0.299*r + 0.587*g + 0.114*b) < 150 else "#1d2a33"
def _cell(v, bg, lab=None):
    return f'<td style="background:{bg};color:{_txt(bg)}">{v if lab is None else lab}</td>'
def rain_col(mm):
    t = min(1, mm / 200) ** 0.6
    c0, c1 = (232, 241, 250), (30, 90, 170)
    return "#%02x%02x%02x" % tuple(round(c0[i] + (c1[i] - c0[i]) * t) for i in range(3))
def sun_col(h):
    t = max(0, min(1, (h - 3) / 8))
    c0, c1 = (245, 240, 225), (245, 180, 0)
    return "#%02x%02x%02x" % tuple(round(c0[i] + (c1[i] - c0[i]) * t) for i in range(3))
def _head(first=""):
    sea = '<tr class="hs"><th></th>' + '<th colspan="2" class="s-ete">été</th><th colspan="3" class="s-aut">automne</th><th colspan="3" class="s-hiv">hiver</th><th colspan="3" class="s-pri">printemps</th><th class="s-ete">été</th>' + '</tr>'
    return sea + f'<tr><th>{first}</th>' + "".join(f"<th>{m}</th>" for m in INI) + "</tr>"

def heat_villes():
    cities = ["Darwin", "Brisbane", "Perth", "Sydney", "Melbourne", "Alice Springs", "Hobart"]
    rows = "".join(f'<tr><th class="{"me" if c == "Melbourne" else ""}">{c}</th>' + "".join(_cell(d[0], tcol(d[0])) for d in CLIM[c]) + "</tr>" for c in cities)
    rr = "".join(f'<tr><th class="{"me" if c == "Melbourne" else ""}">{c}</th>' + "".join(_cell(d[2], rain_col(d[2])) for d in CLIM[c]) + "</tr>" for c in cities)
    return (f'<figure class="chart heat"><figcaption>Le climat en un coup d’œil : température maximale moyenne (°C), mois par mois</figcaption>'
            f'<table>{_head()}{rows}</table>'
            f'<p class="h2">Pluie (mm par mois)</p><table>{_head()}{rr}</table>{LEGEND}</figure>')

def heat_melbourne():
    d = CLIM["Melbourne"]
    r = [("Jour °C", [_cell(f"{x[0]}", tcol(x[0])) for x in d]), ("Nuit °C", [_cell(f"{x[1]}", tcol(x[1])) for x in d]),
         ("Pluie mm", [_cell(x[2], rain_col(x[2])) for x in d]), ("Soleil h", [_cell(x[3], sun_col(x[3])) for x in d]),
         ("Mer °C", [_cell(f"{t}", tcol(t)) for t in MEL_SEA]), ("UV", [_cell(u, uvcol(u)) for u in MEL_UV])]
    body = "".join(f"<tr><th>{a}</th>{''.join(b)}</tr>" for a, b in r)
    return (f'<figure class="chart heat"><figcaption>Melbourne mois par mois</figcaption><table>{_head()}{body}</table>'
            f'<p class="fr-note">UV : jaune modéré, orange élevé, rouge très élevé, violet extrême. Source : <a href="https://www.weather2travel.com/australia/melbourne/climate/" target="_blank" rel="noreferrer">weather2travel</a>, <a href="https://www.bom.gov.au/climate/averages/tables/cw_086338.shtml" target="_blank" rel="noreferrer">Bureau of Meteorology</a>.</p></figure>')

def sky(rain, sun):
    if rain >= 150: return "🌧️"
    if rain >= 80: return "🌦️"
    if sun >= 8: return "☀️"
    if sun >= 6: return "🌤️"
    if sun >= 5: return "⛅"
    return "☁️"
SKY_LEGEND = '<p class="sky-leg">☀️ très ensoleillé (8 h et plus) · 🌤️ ensoleillé (6-7 h) · ⛅ mitigé (5 h) · ☁️ gris (4 h ou moins) · 🌦️ averses (80 à 150 mm) · 🌧️ très pluvieux (plus de 150 mm)</p>'

def heat_villes():
    cities = ["Darwin", "Brisbane", "Perth", "Sydney", "Melbourne", "Alice Springs", "Hobart"]
    th = lambda c: f'<th class="{"me" if c == "Melbourne" else ""}">{c}</th>'
    rows = "".join(f'<tr>{th(c)}' + "".join(_cell(d[0], tcol(d[0])) for d in CLIM[c]) + "</tr>" for c in cities)
    rr = "".join(f'<tr>{th(c)}' + "".join(f'<td class="sky" style="background:{rain_col(d[2])}"><span>{sky(d[2], d[3])}</span><small style="color:{_txt(rain_col(d[2]))}">{d[2]}</small></td>' for d in CLIM[c]) + "</tr>" for c in cities)
    return (f'<figure class="chart heat"><figcaption>Le climat en un coup d’œil : température maximale moyenne (°C), mois par mois</figcaption>'
            f'<table>{_head()}{rows}</table>'
            f'<p class="h2">Le ciel et la pluie (mm par mois)</p><table>{_head()}{rr}</table>{SKY_LEGEND}{LEGEND}</figure>')

def heat_melbourne():
    d = CLIM["Melbourne"]
    r = [("Ciel", [f'<td class="sky big">{sky(x[2], x[3])}</td>' for x in d]),
         ("Jour °C", [_cell(f"{x[0]}", tcol(x[0])) for x in d]), ("Nuit °C", [_cell(f"{x[1]}", tcol(x[1])) for x in d]),
         ("☀️ h/jour", [_cell(x[3], sun_col(x[3])) for x in d]), ("💧 mm", [_cell(x[2], rain_col(x[2])) for x in d]),
         ("Mer °C", [_cell(f"{t}", tcol(t)) for t in MEL_SEA]), ("UV", [_cell(u, uvcol(u)) for u in MEL_UV])]
    body = "".join(f"<tr><th>{a}</th>{''.join(b)}</tr>" for a, b in r)
    return (f'<figure class="chart heat"><figcaption>Melbourne mois par mois</figcaption><table>{_head()}{body}</table>{SKY_LEGEND}'
            f'<p class="fr-note">UV : jaune modéré, orange élevé, rouge très élevé, violet extrême. Source : <a href="https://www.weather2travel.com/australia/melbourne/climate/" target="_blank" rel="noreferrer">weather2travel</a>, <a href="https://www.bom.gov.au/climate/averages/tables/cw_086338.shtml" target="_blank" rel="noreferrer">Bureau of Meteorology</a>.</p></figure>')
