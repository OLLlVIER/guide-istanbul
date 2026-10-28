import re, sys
R = 0.61  # cours moyen 2026 (1 AUD = 0,6074 EUR, valutafx)
def num(s): return float(s.replace(" ", "").replace(" ","").replace(",", "."))
def fr(x, dec=0):
    s = f"{x:,.{dec}f}".replace(",", " ").replace(".", ",")
    return s
def eur(v, unit=""):
    e = v * R
    if unit:  # millions / milliards : 3 chiffres significatifs
        d = 0 if e >= 100 else 1 if e >= 10 else 2
        u = unit if not unit.endswith("s") or e >= 2 else unit[:-1]
        return f"{fr(round(e, d), d)} {('milliards' if unit.startswith('milliard') else 'millions') if e >= 2 else u}"
    if e < 100: return fr(round(e * 20) / 20, 2)
    if e < 10000: return fr(round(e, -1))
    return fr(round(e, -3))
N = r"(\d{1,3}(?:[  ]\d{3})*(?:,\d+)?)"
def conv(t):
    # plage « 750 à 780 AUD »
    t = re.sub(N + r" à " + N + r" AUD(?! \(≈| ≈)", lambda m: f"{m.group(1)} à {m.group(2)} AUD (≈ {eur(num(m.group(1)))} à {eur(num(m.group(2)))} €)", t)
    t = re.sub(N + r" (millions?|milliards?)( de dollars australiens \(AUD\)| AUD)(?! \(≈| ≈)", lambda m: f"{m.group(1)} {m.group(2)}{m.group(3)} (≈ {eur(num(m.group(1)), m.group(2))} d’euros)", t)
    t = re.sub(N + r" AUD(?! \(≈| ≈)", lambda m: f"{m.group(1)} AUD (≈ {eur(num(m.group(1)))} €)", t)
    return t
if __name__ == "__main__":
    for p in sys.argv[1:]:
        s = open(p).read(); n = conv(s); open(p, "w").write(n)
