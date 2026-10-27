// « Mon programme » : on coche ce qu'on veut voir, on choisit ses jours, le programme se construit
// en regroupant les quartiers voisins et en tenant compte des fermetures, des événements et de la météo.

(() => {
const TRIP = [
  { date: "2026-10-28", label: "Mer. 28", dow: 3 },
  { date: "2026-10-29", label: "Jeu. 29", dow: 4 },
  { date: "2026-10-30", label: "Ven. 30", dow: 5 },
  { date: "2026-10-31", label: "Sam. 31", dow: 6 },
  { date: "2026-11-01", label: "Dim. 1er", dow: 0 }
];

// Prévision du 27 octobre, remplacée par la prévision du jour si elle est disponible (Open-Meteo).
let WEATHER = {
  "2026-10-28": { icon: "☁︎", tmax: 17, tmin: 14, rain: 30 },
  "2026-10-29": { icon: "☂︎", tmax: 17, tmin: 15, rain: 75 },
  "2026-10-30": { icon: "☁︎", tmax: 16, tmin: 14, rain: 25 },
  "2026-10-31": { icon: "☀︎", tmax: 17, tmin: 14, rain: 10 },
  "2026-11-01": { icon: "☀︎", tmax: 18, tmin: 14, rain: 15 }
};
let weatherLive = false;

const EVENTS = {
  "2026-10-28": "Veille de fête : demi-journée fériée dès 13 h, ferries souvent gratuits l’après-midi.",
  "2026-10-29": "Fête de la République : drapeaux, défilés, feux d’artifice sur le Bosphore le soir.",
  "2026-10-30": "Vendredi : mosquées fermées aux visiteurs pendant la grande prière (env. 12 h 30–14 h 30). Chora fermée.",
  "2026-10-31": "Fenerbahçe joue à domicile à Kadıköy : ambiance folle côté Asie.",
  "2026-11-01": "Marathon : arrivée à Sultanahmet, routes fermées jusque vers 15 h 30. Grand Bazar fermé."
};

// À l'abri (I), en partie (M), dehors (sinon).
const SHELTER = {
  "Sainte-Sophie": "I", "Citerne-Basilique": "I", "Mosquée Bleue": "I", "Petite Sainte-Sophie (Saints-Serge-et-Bacchus)": "I",
  "Palais de Topkapı": "M", "Musées archéologiques": "I", "Sainte-Irène": "I",
  "Bazar aux épices": "I", "Nouvelle Mosquée": "I", "Mosquée Rüstem Paşa": "I", "Gare de Sirkeci": "I",
  "Grand Bazar": "I", "Mosquée Nuruosmaniye": "I", "Mosquée & place Beyazıt": "M", "Sahaflar Çarşısı": "M",
  "Mosquée Süleymaniye": "M", "Mosquée Kalenderhane": "I", "Mosquée Zeyrek": "I",
  "Église Saint-Étienne-des-Bulgares": "I", "Mosquée Kariye / ancienne Chora": "I", "Sainte-Marie-des-Mongols": "I",
  "Mosquée Eyüp Sultan": "M", "Sainte-Marie-des-Blachernes": "I",
  "Tour de Galata": "M", "Galata Mevlevihanesi": "I", "SALT Galata": "I", "Mosquée Kılıç Ali Paşa": "I", "Église Saint-Pierre-et-Saint-Paul": "I",
  "Église Saint-Antoine-de-Padoue": "I", "Musée de Pera": "I", "Cathédrale du Saint-Esprit": "I", "Église Sainte-Trinité (Aya Triada)": "I",
  "Avenue İstiklal & passages": "M",
  "Palais de Dolmabahçe": "I", "Musée naval": "I", "Palais de Yıldız": "I",
  "Mosquée d’Ortaköy": "I", "Église des Taxiarques (Taksiarhis)": "I",
  "Marché de Kadıköy": "M", "Église arménienne Surp Takavor": "I", "Traversée en ferry": "M",
  "Mosquée Mihrimah Sultan": "I", "Mosquée Şemsi Paşa": "I",
  "Hammam traditionnel": "I"
};

// Fermetures (jour de la semaine, 0 = dimanche) et jours délicats.
const CLOSED = { "Mosquée Kariye / ancienne Chora": [5], "Grand Bazar": [0], "Sahaflar Çarşısı": [0], "Palais de Topkapı": [2], "Sainte-Irène": [2], "Palais de Dolmabahçe": [1] };
const CHURCH = /Église|Cathédrale|Sainte-|Saint-|Chora|Taxiarques|Surp/;
const MOSQUE = /Mosquée/;

// Expériences en plus des lieux des quartiers.
const EXTRA = [
  { district: "suleymaniye", item: ["++", "Hammam traditionnel", "Bain, gommage et massage au savon dans un hammam historique (Süleymaniye, Çemberlitaş ou Kılıç Ali Paşa). Idéal un jour de pluie.", "env. 40–90 €", "1 h 30–2 h", null] },
  { district: "eminonu", item: ["++", "Croisière sur le Bosphore", "Le ferry public Şehir Hatları depuis Eminönü : les palais, les yalı et les deux ponts depuis l’eau. Bien plus agréable par beau temps.", "env. 1–4 €", "1 h 30–2 h", null] },
  { evening: "2026-10-29", district: "ortakoy", item: ["++", "Feux d’artifice de la République", "Le 29 octobre au soir, le Bosphore s’illumine : à voir depuis les quais d’Ortaköy, de Beşiktaş ou d’Üsküdar.", "gratuit", "soirée", null] },
  { evening: "2026-10-31", district: "kadikoy", item: ["++", "Match de Fenerbahçe", "Ambiance unique au stade de Kadıköy. Billets avec la carte Passolig et le passeport.", "selon le match", "soirée", null] }
];

// Quartiers proches (pour mettre deux sorties le même jour).
const NEAR = { 0: [1, 5], 1: [0, 2, 3], 2: [1], 3: [1, 4], 4: [3, 5], 5: [0, 4] };

const ZONE_COLORS = ["#b2452c", "#b2452c", "#b2452c", "#b2452c", "#b2452c", "#2f6f9f", "#2f6f9f", "#7b4fa0", "#7b4fa0", "#1f7a72", "#1f7a72", "#1f7a72", "#c07a12", "#c07a12"];

Object.assign(LOCAL_NAMES, {
  "Hammam traditionnel": "Süleymaniye Hamamı", "Croisière sur le Bosphore": "Şehir Hatları Eminönü Boğaz Turu İskelesi",
  "Feux d’artifice de la République": "Ortaköy Meydanı", "Match de Fenerbahçe": "Ülker Stadyumu Fenerbahçe Şükrü Saracoğlu"
});

// ---------- Données ----------
const ITEMS = [];
districts.forEach((d, di) => d.monuments.forEach(m => ITEMS.push(makeItem(m, d, di))));
EXTRA.forEach(x => { const di = districts.findIndex(d => d.id === x.district); const it = makeItem(x.item, districts[di], di); it.evening = x.evening || null; it.extra = true; ITEMS.push(it); });

function makeItem(m, d, di) {
  return {
    id: d.id + ":" + m[1], level: m[0], name: m[1], desc: m[2], price: m[3], dur: m[4],
    min: parseDur(m[4]), district: d, di, group: GROUPS.findIndex(g => g.ids.includes(d.id)),
    shelter: SHELTER[m[1]] || "O"
  };
}

function parseDur(s) {
  if (!s || /soirée/.test(s)) return 0;
  const parts = s.split("–").map(p => p.trim());
  const unitH = p => /h/.test(p);
  const val = (p, forceH) => {
    if (/h/.test(p)) { const [h, m] = p.split("h"); return parseInt(h) * 60 + (parseInt(m) || 0); }
    const n = parseInt(p); return forceH ? n * 60 : n;
  };
  if (parts.length === 1) return val(parts[0], false);
  const lastIsH = unitH(parts[1]) && !/min/.test(parts[1]);
  const a = val(parts[0], !unitH(parts[0]) && lastIsH), b = val(parts[1], false);
  return Math.round((a + b) / 2 / 5) * 5;
}

// ---------- État ----------
const KEY = "istanbul-programme-v1";
let state = { picked: ITEMS.filter(i => i.level === "+++").map(i => i.id), days: TRIP.map(t => t.date), hours: 3 };
try { const s = JSON.parse(localStorage.getItem(KEY)); if (s && s.picked) state = Object.assign(state, s); } catch (e) {}
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} };

// ---------- Mise en page ----------
const mount = document.getElementById("plannerMount");
if (mount) mount.innerHTML = `<div class="planner"><div class="grid">
  <section>
    <div class="step"><h2 class="ph">1. Vos jours <small>touchez pour enlever</small></h2><div id="days"></div><p id="wxsrc"></p></div>
    <div class="step"><h2 class="ph">2. Temps de visite par jour</h2>
      <div id="hours"><button type="button" data-h="2">2 h</button><button type="button" data-h="3">3 h</button><button type="button" data-h="5">5 h</button><button type="button" data-h="7">Toute la journée</button></div></div>
    <div class="step"><h2 class="ph">3. Ce que vous voulez voir</h2>
      <div class="quick"><button type="button" data-quick="top">Les incontournables +++</button><button type="button" data-quick="churches">+ Églises</button><button type="button" data-quick="rain">+ Plan pluie</button><button type="button" data-quick="none">Tout décocher</button></div>
      <p id="count"></p><div id="picker"></div></div>
  </section>
  <a class="jump" href="#plan">Voir mon programme ↓</a>
  <section class="out" id="out">
    <div class="outhead"><h2 class="ph">Votre programme</h2><button type="button" id="share">Envoyer sur WhatsApp</button></div>
    <div id="plan"></div>
  </section>
</div></div>`;

// Le bouton « Voir mon programme » n'apparaît que pendant qu'on coche.
if (mount && "IntersectionObserver" in window) {
  const jump = mount.querySelector(".jump");
  new IntersectionObserver(es => es.forEach(e => jump.classList.toggle("show", e.isIntersecting))).observe(mount.querySelector("#picker"));
}

// ---------- Construction du programme ----------
function weatherCost(chunk, date) {
  const p = (WEATHER[date] ? WEATHER[date].rain : 30) / 100;
  let out = 0, inn = 0;
  chunk.items.forEach(i => { const w = i.shelter === "O" ? 1 : i.shelter === "M" ? .5 : 0; out += i.min * w; inn += i.min * (1 - w); });
  const tot = out + inn || 1;
  return p * (out / tot) * 10 + (1 - p) * (inn / tot) * 2;
}

function closedItems(chunk, t) { return chunk.items.filter(i => (CLOSED[i.name] || []).includes(t.dow)); }

function eventCost(chunk, t) {
  let c = 0; const g = chunk.group;
  if (t.date === "2026-11-01" && g === 0) c += 6;                      // marathon à Sultanahmet
  if (t.date === "2026-10-29" && chunk.items.some(i => i.name === "Grand Bazar")) c += 3; // jour férié : horaires incertains
  if (t.date === "2026-10-28" && (g === 4 || g === 5)) c -= 1;         // ferries gratuits l'après-midi
  if (t.date === "2026-10-31" && g === 5) c -= 3;                      // Fenerbahçe
  if (t.date === "2026-10-29" && g === 4) c -= 1.5;                    // feux d'artifice sur le Bosphore
  if (t.dow === 5) c += chunk.items.filter(i => MOSQUE.test(i.name)).length * .3;
  return c;
}

// Par secteur : on remplit des demi-journées en commençant par les +++, puis chaque sortie suit l'ordre de marche.
const VALUE = { "+++": 10, "++": 3, "+": 1 };
function buildChunks(cap, picked) {
  const chunks = [];
  GROUPS.forEach((g, gi) => {
    const mine = [];
    picked.filter(i => i.group === gi).sort((a, b) => VALUE[b.level] - VALUE[a.level] || a.di - b.di).forEach(i => {
      const fit = mine.find(c => c.min + i.min + (c.items.some(o => o.di === i.di) ? 0 : 20) <= cap * 1.1);
      const c = fit || (mine.push({ group: gi, items: [], min: 0 }), mine[mine.length - 1]);
      c.min += i.min + (c.items.length && !c.items.some(o => o.di === i.di) ? 20 : 0);
      c.items.push(i);
    });
    mine.forEach(c => { c.items.sort((a, b) => a.di - b.di); c.value = c.items.reduce((s, i) => s + VALUE[i.level], 0); });
    chunks.push(...mine);
  });
  return chunks;
}

function plan() {
  const cap = state.hours * 60;
  const days = TRIP.filter(t => state.days.includes(t.date)).map(t => ({ t, chunks: [], min: 0 }));
  const leftover = [];
  const picked = ITEMS.filter(i => state.picked.includes(i.id) && !i.evening);
  const chunks = buildChunks(cap, picked);
  // Les sorties les plus importantes d'abord : si tout ne tient pas, ce sont les moins essentielles qui restent dehors.
  chunks.sort((a, b) => b.value - a.value);
  const spill = [];
  chunks.forEach(c => {
    let best = null, bestCost = Infinity;
    days.forEach(d => {
      const travel = d.chunks.length ? 30 : 0;
      if (d.chunks.length && d.min + travel + c.min > cap * 1.15) return;
      let cost = weatherCost(c, d.t.date) + eventCost(c, d.t) + closedItems(c, d.t).length * 50;
      if (d.chunks.length) cost += 4 + (d.chunks.every(o => o.group === c.group || NEAR[o.group].includes(c.group)) ? 0 : 6);
      if (cost < bestCost) { bestCost = cost; best = d; }
    });
    if (best) { best.min += (best.chunks.length ? 30 : 0) + c.min; best.chunks.push(c); }
    else spill.push(...c.items);
  });
  // Ce qui reste : on le glisse un par un là où il y a de la place, dans un quartier proche.
  spill.forEach(i => {
    const ok = days.filter(d => d.min + i.min + 20 <= cap * 1.1 && (!d.chunks.length || d.chunks.some(o => o.group === i.group || NEAR[o.group].includes(i.group))))
      .sort((a, b) => (a.chunks.some(o => o.group === i.group) ? 0 : 1) - (b.chunks.some(o => o.group === i.group) ? 0 : 1) || a.min - b.min);
    const d = ok[0];
    if (!d || (CLOSED[i.name] || []).includes(d.t.dow)) { leftover.push(i); return; }
    let c = d.chunks.find(o => o.group === i.group);
    if (!c) { c = { group: i.group, items: [], min: 0 }; d.chunks.push(c); d.min += 30; }
    c.items.push(i); c.items.sort((a, b) => a.di - b.di); c.min += i.min; d.min += i.min + 20;
  });
  leftover.sort((a, b) => a.di - b.di);
  // Soirées à date fixe.
  ITEMS.filter(i => i.evening && state.picked.includes(i.id)).forEach(i => {
    const d = days.find(x => x.t.date === i.evening);
    if (d) (d.evening = d.evening || []).push(i); else leftover.push(i);
  });
  days.forEach(d => d.chunks.sort((a, b) => a.group - b.group));
  return { days, leftover };
}

// ---------- Affichage ----------
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const fmt = m => m >= 60 ? `${Math.floor(m / 60)} h${m % 60 ? String(m % 60).padStart(2, "0") : ""}` : `${m} min`;
const shelterIcon = s => s === "I" ? `<span class="sh in" title="À l’abri">à l’abri</span>` : s === "M" ? `<span class="sh mix" title="En partie dehors">mi-abri</span>` : `<span class="sh out" title="En plein air">plein air</span>`;

function renderDays() {
  $("#days").innerHTML = TRIP.map(t => {
    const w = WEATHER[t.date] || {}; const on = state.days.includes(t.date);
    return `<button type="button" class="daychip${on ? " on" : ""}" data-day="${t.date}" aria-pressed="${on}">
      <b>${t.label}</b><span class="wx">${w.icon || ""} ${w.tmax ?? "–"}° · pluie ${w.rain ?? "–"} %</span></button>`;
  }).join("");
  $("#hours").querySelectorAll("button").forEach(b => b.classList.toggle("on", +b.dataset.h === state.hours));
  $("#wxsrc").textContent = weatherLive ? "Météo : prévision du jour (Open-Meteo), mise à jour à chaque ouverture." : "Météo : prévision du 27 octobre. Elle se met à jour toute seule quand la page est en ligne.";
}

function renderPicker() {
  let html = "";
  districts.forEach((d, di) => {
    const items = ITEMS.filter(i => i.di === di);
    const n = items.filter(i => state.picked.includes(i.id)).length;
    html += `<details class="dpick" ${di < 2 ? "open" : ""}><summary><span class="pnum" style="background:${ZONE_COLORS[di]}">${di + 1}</span>${esc(d.name)}<em>${n ? n + " choisi" + (n > 1 ? "s" : "") : ""}</em></summary><div class="opts">`;
    items.forEach(i => {
      const on = state.picked.includes(i.id);
      const tripClosed = (CLOSED[i.name] || []).filter(x => TRIP.some(t => t.dow === x));
      const closed = tripClosed.length ? `<span class="warn">fermé le ${["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"][tripClosed[0]]}</span>` : "";
      html += `<label class="opt${on ? " on" : ""}"><input type="checkbox" data-id="${esc(i.id)}" ${on ? "checked" : ""}>
        <span class="lv l${i.level.length}">${i.level}</span><span class="on-name">${esc(i.name)}</span>
        <span class="meta">${i.evening ? "le soir du " + TRIP.find(t => t.date === i.evening).label : fmt(i.min)} · ${shelterIcon(i.shelter)} ${closed}</span></label>`;
    });
    html += `</div></details>`;
  });
  $("#picker").innerHTML = html;
  $("#count").textContent = `${state.picked.length} lieu${state.picked.length > 1 ? "x" : ""} choisi${state.picked.length > 1 ? "s" : ""}`;
}

function wxLine(date) { const w = WEATHER[date]; return w ? `${w.icon} ${w.tmax}° / ${w.tmin}° · pluie ${w.rain} %` : ""; }

function renderPlan() {
  const { days, leftover } = plan();
  if (!days.length) { $("#plan").innerHTML = `<p class="empty">Choisissez au moins un jour.</p>`; return; }
  if (!state.picked.length) { $("#plan").innerHTML = `<p class="empty">Cochez ce que vous voulez voir, le programme apparaît ici.</p>`; return; }
  let html = "";
  days.forEach((d, n) => {
    const w = WEATHER[d.t.date] || {};
    const wet = w.rain >= 50;
    const items = d.chunks.flatMap(c => c.items);
    const notes = [];
    if (EVENTS[d.t.date]) notes.push(EVENTS[d.t.date]);
    const closed = d.chunks.flatMap(c => closedItems(c, d.t));
    if (closed.length) notes.push(`Attention : ${closed.map(i => i.name).join(", ")} fermé ce jour-là. Gardez-le pour un autre jour.`);
    if (wet && items.some(i => i.shelter === "O")) notes.push("Jour de pluie : gardez les lieux en plein air pour une éclaircie, parapluie dans le sac.");
    if (wet && !items.some(i => i.shelter === "O") && items.length) notes.push("Jour de pluie : tout est à l’abri aujourd’hui.");
    const start = items[0] ? items[0].district : null;
    const route = start ? (start.routes.find(r => r[0] !== "Uber") || start.routes[0]) : null;
    const dists = [...new Set(items.map(i => i.district.name))];
    html += `<article class="pday${wet ? " wet" : ""}">
      <header><div><span class="pd">Jour ${n + 1} · ${d.t.label}</span><h3>${items.length ? esc(dists.join(" → ")) : "Journée libre"}</h3></div>
      <div class="pw">${wxLine(d.t.date)}<small>${items.length ? "≈ " + fmt(d.min) + " de visite" : ""}</small></div></header>
      ${notes.map(x => `<p class="pnote">${esc(x)}</p>`).join("")}
      ${route ? `<p class="proute"><b>Depuis l’hôtel :</b> ${esc(route[0])}, ${esc(route[1])}</p>` : ""}
      <ol class="pitems">${items.map(i => `<li><div class="pi-head"><span class="lv l${i.level.length}">${i.level}</span><b>${esc(i.name)}</b><span class="meta">${esc(i.dur)} · ${shelterIcon(i.shelter)}</span></div>
        <p>${esc(i.price)}</p>${placeLinks(i.name)}</li>`).join("")}</ol>
      ${d.evening ? `<div class="peve"><b>Le soir</b>${d.evening.map(i => `<p><b>${esc(i.name)}</b> · ${esc(i.desc)}</p>${placeLinks(i.name)}`).join("")}</div>` : ""}
    </article>`;
  });
  if (leftover.length) html += `<article class="pday left"><header><div><span class="pd">Pas le temps cette fois</span><h3>${leftover.length} lieu${leftover.length > 1 ? "x" : ""} en trop</h3></div></header>
    <p class="pnote">Ajoutez un jour, passez à plus d’heures par jour ou décochez quelques lieux.</p>
    <ul class="pleft">${leftover.map(i => `<li>${esc(i.name)} <small>(${esc(i.district.name)}, ${fmt(i.min)})</small></li>`).join("")}</ul></article>`;
  $("#plan").innerHTML = html;
  window._lastPlan = { days, leftover };
}

function planText() {
  const { days, leftover } = window._lastPlan || plan();
  let t = "Istanbul · mon programme\n";
  days.forEach((d, n) => {
    const items = d.chunks.flatMap(c => c.items);
    t += `\nJour ${n + 1} · ${d.t.label} (${wxLine(d.t.date)})\n`;
    items.forEach(i => t += `• ${i.name} (${i.district.name})\n`);
    (d.evening || []).forEach(i => t += `• Le soir : ${i.name}\n`);
  });
  if (leftover.length) t += `\nPas le temps : ${leftover.map(i => i.name).join(", ")}\n`;
  return t + "\n" + location.href.split("#")[0];
}

function renderAll() { renderDays(); renderPicker(); renderPlan(); }

// ---------- Interactions ----------
document.addEventListener("change", e => {
  const c = e.target.closest("input[data-id]"); if (!c) return;
  const id = c.dataset.id;
  state.picked = c.checked ? [...new Set([...state.picked, id])] : state.picked.filter(x => x !== id);
  c.closest(".opt").classList.toggle("on", c.checked);
  save();
  const d = c.closest("details"); const n = d.querySelectorAll("input:checked").length;
  d.querySelector("summary em").textContent = n ? n + " choisi" + (n > 1 ? "s" : "") : "";
  $("#count").textContent = `${state.picked.length} lieu${state.picked.length > 1 ? "x" : ""} choisi${state.picked.length > 1 ? "s" : ""}`;
  renderPlan();
});

document.addEventListener("click", e => {
  const day = e.target.closest("[data-day]");
  if (day) { const d = day.dataset.day; state.days = state.days.includes(d) ? state.days.filter(x => x !== d) : [...state.days, d]; save(); renderDays(); renderPlan(); return; }
  const h = e.target.closest("[data-h]");
  if (h) { state.hours = +h.dataset.h; save(); renderDays(); renderPlan(); return; }
  const q = e.target.closest("[data-quick]");
  if (q) {
    const k = q.dataset.quick;
    if (k === "top") state.picked = ITEMS.filter(i => i.level === "+++").map(i => i.id);
    if (k === "none") state.picked = [];
    if (k === "churches") state.picked = [...new Set([...state.picked, ...ITEMS.filter(i => CHURCH.test(i.name) && !MOSQUE.test(i.name) && i.level !== "+").map(i => i.id)])];
    if (k === "rain") state.picked = [...new Set([...state.picked, ...ITEMS.filter(i => i.shelter === "I" && i.level === "+++").map(i => i.id)])];
    save(); renderPicker(); renderPlan(); return;
  }
  if (e.target.closest("#share")) {
    const text = planText();
    if (navigator.share) navigator.share({ title: "Istanbul · mon programme", text }).catch(() => {});
    else window.open("https://wa.me/?text=" + encodeURIComponent(text), "_blank");
  }
});

// Météo du jour, si le réseau le permet.
fetch("https://api.open-meteo.com/v1/forecast?latitude=41.01&longitude=28.97&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Europe%2FIstanbul&start_date=2026-10-28&end_date=2026-11-01")
  .then(r => r.ok ? r.json() : Promise.reject())
  .then(j => {
    const icon = c => c <= 1 ? "☀︎" : c <= 3 ? "⛅︎" : c <= 48 ? "☁︎" : c >= 95 ? "⛈︎" : "☂︎";
    j.daily.time.forEach((t, k) => {
      if (j.daily.precipitation_probability_max[k] == null) return;
      WEATHER[t] = { icon: icon(j.daily.weather_code[k]), tmax: Math.round(j.daily.temperature_2m_max[k]), tmin: Math.round(j.daily.temperature_2m_min[k]), rain: j.daily.precipitation_probability_max[k] };
    });
    weatherLive = true; renderDays(); renderPlan();
  }).catch(() => {});

renderAll();
})();
