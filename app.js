const map = L.map("map", { zoomControl: true, attributionControl: true }).setView([41.024, 28.982], 13);
const baseTiles = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap contributors"
}).addTo(map);
// Plan des transports en commun : métro, tram, funiculaires, Marmaray et ferries avec leurs stations.
const transitTiles = L.tileLayer("https://tileserver.memomaps.de/tilegen/{z}/{x}/{y}.png", {
  maxZoom: 18,
  attribution: "Transports : © memomaps.de (CC BY-SA), données © OpenStreetMap contributors"
});
let transitOn = false;
function toggleTransit(on) {
  transitOn = on;
  if (on) { map.removeLayer(baseTiles); transitTiles.addTo(map); } else { map.removeLayer(transitTiles); baseTiles.addTo(map); }
  document.querySelector("#transitButton").classList.toggle("on", on);
  document.querySelector("#transitButton").setAttribute("aria-pressed", on);
  document.querySelector("#transitBox").hidden = !on;
}

drawGroups(map, L);

function pinIcon(type, label, name) {
  return L.divIcon({
    className: "custom-marker",
    html: `<div class="map-pin ${type}"><span>${label}</span></div><div class="pin-label ${type}">${name}</div>`,
    iconSize: [40, 40], iconAnchor: [20, 39]
  });
}

L.marker(HOTEL.coords, { icon: pinIcon("hotel", "H", "Mövenpick Old Town"), zIndexOffset: 1000 })
  .addTo(map)
  .bindTooltip(`<strong>${HOTEL.name}</strong><br>${HOTEL.address}`, { direction: "top", offset: [0, -34] });

const markers = new Map();
districts.forEach((district, index) => {
  const marker = L.marker(district.coords, { icon: pinIcon("district", index + 1, district.name) }).addTo(map);
  marker.bindTooltip(district.name, { direction: "top", offset: [0, -32] });
  marker.on("click", () => openDistrict(district.id));
  markers.set(district.id, marker);
});

const detailSheet = document.querySelector("#detailSheet");
const detailContent = document.querySelector("#detailContent");
const districtList = document.querySelector("#districtList");
const infoSheet = document.querySelector("#infoSheet");
const listButton = document.querySelector("#listButton");
const districtButtons = document.querySelector("#districtButtons");

districtButtons.innerHTML = districts.map((d, i) => `<button class="district-button" data-id="${d.id}">${FLASH[d.id] ? `<img src="${photoUrl(FLASH[d.id].photo, 400)}" alt="" loading="lazy" onerror="this.remove()">` : ""}<strong>${i + 1}. ${d.name}</strong><span>${FLASH[d.id]?.line || d.subtitle}</span></button>`).join("");

function sheetState(openSheet) {
  [detailSheet, districtList, infoSheet, restoSheet, journalSheet].forEach(sheet => {
    const open = sheet === openSheet;
    sheet.classList.toggle("is-open", open);
    sheet.setAttribute("aria-hidden", String(!open));
  });
  listButton.setAttribute("aria-expanded", String(openSheet === districtList));
  document.body.classList.toggle("has-sheet", Boolean(openSheet));
  setTimeout(() => map.invalidateSize(), 360);
}

function openDistrict(id) {
  const district = districts.find(d => d.id === id);
  const index = districts.findIndex(d => d.id === id);
  if (!district) return;
  document.querySelectorAll(".custom-marker").forEach(el => el.classList.remove("is-selected"));
  const marker = markers.get(id);
  if (marker?._icon) marker._icon.classList.add("is-selected");
  detailContent.innerHTML = `
    ${FLASH[district.id] ? `<figure class="hero-photo"><img src="${photoUrl(FLASH[district.id].photo)}" alt="${district.name}" loading="lazy" onerror="this.closest('figure').remove()"><figcaption><a href="${photoPage(FLASH[district.id].photo)}" target="_blank" rel="noreferrer">Photo Wikimedia Commons</a></figcaption></figure>` : ""}
    <header class="detail-hero">
      <span class="number">${index + 1}</span>
      <h2>${district.name}</h2>
      <p class="punch">${FLASH[district.id]?.line || district.subtitle}</p>
    </header>
    ${FLASH[district.id] ? `<section class="flash"><h3>En bref</h3><ol>${FLASH[district.id].top.map(t => `<li>${t}</li>`).join("")}</ol><p class="flash-tip">Le bon plan : ${FLASH[district.id].tip}</p></section>` : ""}
    ${DESCRIPTIONS[district.id] ? `<details class="district-desc"><summary>L’histoire du quartier en 2 minutes</summary><p>${DESCRIPTIONS[district.id]}</p></details>` : ""}
    <section class="route-card">
      <h3>Depuis le Mövenpick Old Town</h3>
      <div class="routes">${district.routes.map(r => `<div class="route"><b>${r[0]}</b><span>${r[1]}</span></div>`).join("")}</div>
    </section>
    ${extras[district.id] ? `<section class="tips"><h3>À savoir</h3><ul>${extras[district.id].tips.map(t => `<li>${t}</li>`).join("")}</ul></section>` : ""}
    ${typeof HOTSPOTS !== "undefined" && HOTSPOTS[district.id] ? `<section class="hotspots"><h3>Branché et à ne pas manquer</h3><ul>${HOTSPOTS[district.id].go.concat(HOTSPOTS[district.id].see).map(t => `<li>${t}</li>`).join("")}</ul></section>` : ""}
    <section class="monuments">
      <h3>À voir — par ordre de priorité</h3>
      ${district.monuments.map(m => `<article class="monument"><span class="rank ${rankClass(m[0])}">${m[0]}</span><h4>${m[1]}</h4><p>${m[2]}</p><div class="facts"><span>${m[3]}</span><span>${m[4]}</span></div>${placeLinks(m[1])}${m[5] ? `<p class="walk-next">À pied : ${m[5]}</p>` : ""}</article>`).join("")}
    </section>
    ${LEISURE[district.id] ? `<details class="leisure"><summary>Jardins, cafés et autres plaisirs</summary><h3>Jardins & cafés</h3><ul>${LEISURE[district.id].green.map(t => `<li>${t}</li>`).join("")}</ul><h3>Autres plaisirs</h3><ul>${LEISURE[district.id].more.map(t => `<li>${t}</li>`).join("")}</ul></details>` : ""}
    ${extras[district.id] ? `<section class="food"><h3>Où manger</h3>${extras[district.id].food.map(f => `<div class="food-item"><div><b>${f[0]}</b><span>${f[1]}</span>${placeLinks(f[0])}</div><em class="price ${priceBand(f[2]).cls}">${f[2]}</em></div>`).join("")}</section>` : ""}
    <section class="photos"><h3>Mes photos</h3>
      <p class="photos-note">Astuce : dans « Mon carnet », ajoutez toutes les photos de la journée d’un coup, elles se rangent seules dans le bon quartier. Elles restent sur cet appareil.</p>
      <label class="add-photo" for="photoInput">+ Ajouter des photos</label>
      <input id="photoInput" type="file" accept="image/*" multiple hidden>
      <div id="photoGrid" class="photo-grid"></div>
    </section>`;
  currentDistrict = district.id;
  document.querySelector("#photoInput").addEventListener("change", e => addPhotos(district.id, e.target.files));
  renderPhotos(district.id);
  const hero = document.querySelector("#detailSheet .hero-photo");
  if (hero) districtSlides(district).then(slides => {
    if (currentDistrict !== district.id || !hero.isConnected) return;
    hero.style.aspectRatio = "16 / 10"; hero.style.overflow = "hidden";
    hero.querySelector("img").style.visibility = "hidden";
    const cap = hero.querySelector("figcaption"); if (cap) cap.remove();
    buildCarousel(hero, slides);
  }).catch(() => {});
  sheetState(detailSheet);
  map.flyTo(district.coords, 14, { duration: .65 });
  requestAnimationFrame(() => detailSheet.scrollTop = 0);
}

function rankClass(r) { return r === "+++" ? "r3" : r === "++" ? "r2" : "r1"; }

// Fourchette de prix par personne, d'après le prix le plus haut indiqué.
const BANDS = [
  { cls: "p1", label: "€", desc: "moins de 10 €", max: 10 },
  { cls: "p2", label: "€€", desc: "10 à 25 €", max: 25 },
  { cls: "p3", label: "€€€", desc: "25 à 45 €", max: 45 },
  { cls: "p4", label: "€€€€", desc: "plus de 45 €", max: Infinity }
];
function priceBand(text) {
  const nums = (text.match(/\d+(?:,\d+)?/g) || []).map(n => parseFloat(n.replace(",", ".")));
  const top = nums.length ? Math.max(...nums) : 0;
  return BANDS.find(b => top <= b.max);
}

/* ---- Photos personnelles (IndexedDB, locales à l'appareil) ---- */
let currentDistrict = null;
const DB_NAME = "guide-istanbul-photos";
function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 2);
    req.onupgradeneeded = e => {
      const db = req.result;
      if (e.oldVersion < 1) db.createObjectStore("photos", { keyPath: "id", autoIncrement: true }).createIndex("district", "district");
      if (e.oldVersion < 2) {
        db.createObjectStore("tracks", { keyPath: "id", autoIncrement: true });
        db.createObjectStore("notes", { keyPath: "day" });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}
async function dbRun(mode, fn, store = "photos") {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, mode);
    const out = fn(tx.objectStore(store));
    tx.oncomplete = () => resolve(out && out.result);
    tx.onerror = () => reject(tx.error);
  });
}
function shrink(file) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, 1600 / Math.max(img.width, img.height));
      const c = document.createElement("canvas");
      c.width = Math.round(img.width * scale); c.height = Math.round(img.height * scale);
      c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(img.src);
      c.toBlob(b => resolve(b || file), "image/jpeg", .82);
    };
    img.onerror = () => resolve(file);
    img.src = URL.createObjectURL(file);
  });
}
async function addPhotos(district, files) {
  try {
    for (const f of files) {
      const meta = await readExif(f);
      const blob = await shrink(f);
      await dbRun("readwrite", st => st.add({ district, blob, date: Date.now(), taken: meta.taken || f.lastModified || Date.now(), lat: meta.lat, lon: meta.lon }));
    }
    drawJournal();
  } catch (e) { alertPhotos("Impossible d’enregistrer : espace de stockage indisponible dans ce navigateur."); }
  renderPhotos(district);
}
// Classement automatique : le quartier le plus proche de l'endroit où la photo a été prise.
// Points de repère des lieux principaux de chaque quartier (pour départager Sainte-Sophie et Topkapı, par exemple).
const ANCHORS = {
  sultanahmet: [[41.0086, 28.9802], [41.0054, 28.9768], [41.0084, 28.9779], [41.0057, 28.9752], [41.0027, 28.9741]],
  topkapi: [[41.0115, 28.9834], [41.0117, 28.9813], [41.0129, 28.9810], [41.0093, 28.9813]],
  eminonu: [[41.0166, 28.9706], [41.0167, 28.9719], [41.0177, 28.9694], [41.0150, 28.9766]],
  beyazit: [[41.0107, 28.9681], [41.0103, 28.9717], [41.0103, 28.9640]],
  suleymaniye: [[41.0162, 28.9640], [41.0153, 28.9584], [41.0156, 28.9555], [41.0198, 28.9573]],
  "fener-balat": [[41.0310, 28.9390], [41.0299, 28.9496], [41.0287, 28.9488], [41.0317, 28.9468]],
  eyup: [[41.0480, 28.9337], [41.0555, 28.9336], [41.0386, 28.9424]],
  galata: [[41.0256, 28.9742], [41.0228, 28.9770], [41.0262, 28.9802]],
  beyoglu: [[41.0335, 28.9777], [41.0369, 28.9850], [41.0339, 28.9763], [41.0319, 28.9748]],
  besiktas: [[41.0391, 29.0004], [41.0428, 29.0076], [41.0496, 29.0128]],
  ortakoy: [[41.0473, 29.0270], [41.0437, 29.0157], [41.0486, 29.0154]],
  bebek: [[41.0770, 29.0434], [41.0672, 29.0430]],
  kadikoy: [[40.9925, 29.0230], [40.9897, 29.0260], [40.9830, 29.0260]],
  uskudar: [[41.0270, 29.0158], [41.0211, 29.0041], [41.0244, 29.0109]]
};
function nearestDistrict(pos) {
  if (!pos) return null;
  let best = null, dist = 2000; // au-delà de 2 km de tout repère : à classer à la main
  districts.forEach(d => (ANCHORS[d.id] || []).concat([d.coords]).forEach(a => { const m = haversine(pos, a); if (m < dist) { dist = m; best = d.id; } }));
  return best;
}
function posFromTracks(taken, tracks) {
  let best = null, gap = 20 * 60 * 1000;
  tracks.forEach(tr => tr.points.forEach(p => { if (p[2] && Math.abs(p[2] - taken) < gap) { gap = Math.abs(p[2] - taken); best = [p[0], p[1]]; } }));
  return best;
}
async function addPhotosAuto(files) {
  const status = document.querySelector("#autoStatus");
  status.textContent = "Classement en cours…";
  let tracks = [];
  try { tracks = await dbRun("readonly", st => st.getAll(), "tracks") || []; } catch (e) {}
  const count = {}; let waiting = 0;
  try {
    for (const f of files) {
      const meta = await readExif(f);
      const taken = meta.taken || f.lastModified || Date.now();
      const pos = isFinite(meta.lat) ? [meta.lat, meta.lon] : posFromTracks(taken, tracks);
      const district = nearestDistrict(pos);
      const blob = await shrink(f);
      await dbRun("readwrite", st => st.add({ district: district || "", auto: true, blob, date: Date.now(), taken, lat: meta.lat, lon: meta.lon }));
      if (district) count[district] = (count[district] || 0) + 1; else waiting++;
    }
  } catch (e) { status.textContent = "Impossible d’enregistrer : espace de stockage indisponible dans ce navigateur."; return; }
  const done = Object.entries(count).map(([id, n]) => `${districts.find(d => d.id === id).name} (${n})`);
  status.textContent = (done.length ? `Rangées : ${done.join(", ")}.` : "") + (waiting ? ` ${waiting} photo(s) à classer ci-dessous.` : "");
  await drawJournal(); renderJournal();
}
// Après l'import d'un tracé, on range les photos qui attendaient faute de position.
async function reclassify() {
  let photos = [], tracks = [];
  try { photos = await dbRun("readonly", st => st.getAll()) || []; tracks = await dbRun("readonly", st => st.getAll(), "tracks") || []; } catch (e) { return; }
  for (const ph of photos.filter(p => p.auto && !p.district && !isFinite(p.lat))) {
    const d = nearestDistrict(posFromTracks(ph.taken, tracks));
    if (d) { ph.district = d; await dbRun("readwrite", st => st.put(ph)); }
  }
}

function alertPhotos(msg) { const g = document.querySelector("#photoGrid"); if (g) g.innerHTML = `<p class="photos-note">${msg}</p>`; }
async function renderPhotos(district) {
  const grid = document.querySelector("#photoGrid");
  if (!grid) return;
  let items = [];
  try { items = await dbRun("readonly", st => st.index("district").getAll(district)); }
  catch (e) { return alertPhotos("Les photos ne peuvent pas être enregistrées dans ce navigateur (navigation privée ?)."); }
  if (district !== currentDistrict) return;
  grid.querySelectorAll("img").forEach(i => URL.revokeObjectURL(i.src));
  grid.innerHTML = items.length ? items.map(it => `<figure><img src="${URL.createObjectURL(it.blob)}" alt="Photo personnelle"><button class="del-photo" data-photo="${it.id}" aria-label="Supprimer la photo">×</button></figure>`).join("") : `<p class="photos-note">Aucune photo pour ce quartier.</p>`;
}
document.addEventListener("click", async e => {
  const btn = e.target.closest("[data-photo]");
  if (!btn) return;
  if (btn.dataset.armed !== "1") { btn.dataset.armed = "1"; btn.textContent = "Suppr. ?"; btn.classList.add("armed"); return; }
  await dbRun("readwrite", st => st.delete(Number(btn.dataset.photo)));
  renderPhotos(currentDistrict); drawJournal();
});

/* ---- Liste des restaurants ---- */
const restoSheet = document.querySelector("#restoSheet");
let restoFilter = "all";
const mapsLink = name => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + " Istanbul")}`;
function restoRow(name, desc, price, extra) {
  const band = priceBand(price);
  return `<div class="food-item"><div><b>${name}</b><span>${desc}</span>${extra || ""}${placeLinks(name)}</div><em class="price ${band.cls}">${band.label} · ${price}</em></div>`;
}
const keep = price => restoFilter === "all" || priceBand(price).cls === restoFilter;
function renderRestos() {
  document.querySelector("#restoFilters").innerHTML = [`<button class="chip ${restoFilter === "all" ? "on" : ""}" data-band="all">Tous</button>`]
    .concat(BANDS.map(b => `<button class="chip ${b.cls} ${restoFilter === b.cls ? "on" : ""}" data-band="${b.cls}">${b.label} <small>${b.desc}</small></button>`)).join("");
  const near = NEAR_HOTEL.filter(r => keep(r[2]));
  let html = near.length ? `<section class="resto-group near"><h3>Près de l’hôtel</h3>${near.map(r => restoRow(r[0], r[1], r[2], `<small class="walk">${r[3]}</small>`)).join("")}</section>` : "";
  districts.forEach(d => {
    const list = (extras[d.id]?.food || []).filter(f => keep(f[2]));
    if (list.length) html += `<section class="resto-group"><h3><button class="resto-district" data-id="${d.id}">${d.name}</button></h3>${list.map(f => restoRow(f[0], f[1], f[2])).join("")}</section>`;
  });
  document.querySelector("#restoList").innerHTML = html || `<p class="photos-note">Aucune adresse dans cette gamme de prix.</p>`;
}
document.querySelector("#restoFilters").addEventListener("click", e => {
  const b = e.target.closest("[data-band]"); if (!b) return;
  restoFilter = b.dataset.band; renderRestos();
});
document.querySelector("#restoList").addEventListener("click", e => {
  const b = e.target.closest("button[data-id]"); if (b) openDistrict(b.dataset.id);
});
document.querySelector("#restoButton").addEventListener("click", () => { renderRestos(); sheetState(restoSheet); });

/* ---- Carnet de voyage : tracés GPX, photos sur la carte, notes du jour ---- */
const DAY_COLORS = ["#b2452c", "#2f6f9f", "#7b4fa0", "#c07a12", "#2f7a52", "#a33a6b", "#4d5c9e"];
const journalLayer = L.layerGroup().addTo(map);
const journalSheet = document.querySelector("#journalSheet");
const dayKey = t => { const d = new Date(t); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; };
const dayLabel = k => new Date(k + "T12:00").toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
const fmtTime = t => new Date(t).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });

function haversine(a, b) {
  const R = 6371000, r = x => x * Math.PI / 180;
  const dLat = r(b[0] - a[0]), dLon = r(b[1] - a[1]);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(r(a[0])) * Math.cos(r(b[0])) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

function parseGPX(text) {
  const doc = new DOMParser().parseFromString(text, "application/xml");
  const pts = [...doc.querySelectorAll("trkpt, rtept")].map(p => [
    parseFloat(p.getAttribute("lat")), parseFloat(p.getAttribute("lon")),
    Date.parse(p.querySelector("time")?.textContent || "") || null
  ]).filter(p => isFinite(p[0]) && isFinite(p[1]));
  return pts;
}

async function importTracks(files) {
  const status = document.querySelector("#gpxStatus");
  let ok = 0;
  for (const f of files) {
    try {
      const pts = parseGPX(await f.text());
      if (pts.length < 2) continue;
      const start = pts.find(p => p[2])?.[2] || f.lastModified || Date.now();
      await dbRun("readwrite", st => st.add({ name: f.name, day: dayKey(start), start, points: pts }), "tracks");
      ok++;
    } catch (e) { /* fichier illisible : ignoré */ }
  }
  status.textContent = ok ? `${ok} tracé(s) importé(s).` : "Aucun tracé lisible : choisissez un fichier .gpx.";
  if (ok) await reclassify();
  await drawJournal(); renderJournal();
}

// Lecture minimale des métadonnées EXIF (position GPS et date de prise de vue) d'un JPEG.
async function readExif(file) {
  try {
    const buf = await file.slice(0, 256 * 1024).arrayBuffer();
    const v = new DataView(buf);
    if (v.getUint16(0) !== 0xFFD8) return {};
    let off = 2;
    while (off < v.byteLength - 4) {
      const marker = v.getUint16(off), size = v.getUint16(off + 2);
      if (marker === 0xFFE1 && v.getUint32(off + 4) === 0x45786966) return parseTiff(v, off + 10);
      off += 2 + size;
    }
  } catch (e) {}
  return {};
}
function parseTiff(v, t) {
  const le = v.getUint16(t) === 0x4949;
  const u16 = o => v.getUint16(t + o, le), u32 = o => v.getUint32(t + o, le);
  const rat = o => u32(o) / (u32(o + 4) || 1);
  const ifd = o => { const n = u16(o), tags = {}; for (let i = 0; i < n; i++) { const e = o + 2 + i * 12; tags[u16(e)] = { type: u16(e + 2), count: u32(e + 4), val: e + 8 }; } return tags; };
  const ptr = tag => u32(tag.val);
  const str = tag => { let s = "", o = tag.count > 4 ? ptr(tag) : tag.val; for (let i = 0; i < tag.count - 1; i++) s += String.fromCharCode(v.getUint8(t + o + i)); return s; };
  const out = {};
  const root = ifd(u32(4));
  if (root[0x8769]) {
    const ex = ifd(ptr(root[0x8769]));
    const dt = ex[0x9003] && str(ex[0x9003]);
    if (dt) { const m = dt.match(/(\d+):(\d+):(\d+) (\d+):(\d+):(\d+)/); if (m) out.taken = new Date(+m[1], m[2] - 1, +m[3], +m[4], +m[5], +m[6]).getTime(); }
  }
  if (root[0x8825]) {
    const g = ifd(ptr(root[0x8825]));
    const dms = tag => { const o = ptr(tag); return rat(o) + rat(o + 8) / 60 + rat(o + 16) / 3600; };
    if (g[2] && g[4]) {
      const ns = g[1] ? String.fromCharCode(v.getUint8(t + g[1].val)) : "N", ew = g[3] ? String.fromCharCode(v.getUint8(t + g[3].val)) : "E";
      out.lat = dms(g[2]) * (ns === "S" ? -1 : 1); out.lon = dms(g[4]) * (ew === "W" ? -1 : 1);
    }
  }
  return out;
}

async function loadJournal() {
  let tracks = [], photos = [], notes = [];
  try {
    tracks = await dbRun("readonly", st => st.getAll(), "tracks") || [];
    photos = await dbRun("readonly", st => st.getAll()) || [];
    notes = await dbRun("readonly", st => st.getAll(), "notes") || [];
  } catch (e) {}
  // Position d'une photo : GPS de la photo, sinon point du tracé le plus proche dans le temps, sinon centre du quartier.
  photos.forEach(ph => {
    if (isFinite(ph.lat) && isFinite(ph.lon)) { ph.pos = [ph.lat, ph.lon]; return; }
    let best = null, gap = 20 * 60 * 1000;
    tracks.forEach(tr => tr.points.forEach(p => { if (p[2] && Math.abs(p[2] - ph.taken) < gap) { gap = Math.abs(p[2] - ph.taken); best = [p[0], p[1]]; } }));
    ph.pos = best || districts.find(d => d.id === ph.district)?.coords;
  });
  const days = [...new Set([...tracks.map(t => t.day), ...photos.map(p => dayKey(p.taken || p.date))])].sort();
  return { tracks, photos, notes: Object.fromEntries(notes.map(n => [n.day, n.text])), days };
}

async function drawJournal() {
  const { tracks, photos, days } = await loadJournal();
  journalLayer.clearLayers();
  tracks.forEach(tr => {
    const color = DAY_COLORS[days.indexOf(tr.day) % DAY_COLORS.length];
    L.polyline(tr.points.map(p => [p[0], p[1]]), { color, weight: 4, opacity: .85 }).addTo(journalLayer)
      .bindTooltip(`${dayLabel(tr.day)}`, { sticky: true });
  });
  photos.filter(p => p.pos).forEach(ph => {
    const url = URL.createObjectURL(ph.blob);
    L.marker(ph.pos, { icon: L.divIcon({ className: "photo-marker", html: `<img src="${url}" alt="">`, iconSize: [34, 34], iconAnchor: [17, 17] }) })
      .addTo(journalLayer).bindPopup(`<img class="photo-pop" src="${url}" alt="Photo personnelle"><br>${dayLabel(dayKey(ph.taken || ph.date))} · ${fmtTime(ph.taken || ph.date)}`);
  });
}

async function renderJournal() {
  const { tracks, photos, notes, days } = await loadJournal();
  const box = document.querySelector("#journalDays");
  const loose = photos.filter(p => !p.district);
  const pending = loose.length ? `<article class="journal-day pending"><header><h3>À classer (${loose.length})</h3></header>
    <p class="photos-note">Pas de position pour ces photos : choisissez le quartier, ou importez le tracé GPS du jour pour qu’elles se rangent seules.</p>
    <div class="classify">${loose.map(p => `<figure><img src="${URL.createObjectURL(p.blob)}" alt="Photo à classer"><select data-classify="${p.id}" aria-label="Quartier de cette photo"><option value="">Quartier…</option>${districts.map((d, i) => `<option value="${d.id}">${i + 1}. ${d.name}</option>`).join("")}</select></figure>`).join("")}</div></article>` : "";
  if (!days.length && !pending) { box.innerHTML = `<p class="photos-note">Votre carnet est vide. Importez le tracé de votre première journée ou ajoutez des photos depuis la fiche d’un quartier.</p>`; return; }
  box.innerHTML = pending + days.map((day, i) => {
    const color = DAY_COLORS[i % DAY_COLORS.length];
    const dayTracks = tracks.filter(t => t.day === day);
    const pts = dayTracks.flatMap(t => t.points);
    let km = 0; dayTracks.forEach(t => t.points.forEach((p, j) => { if (j) km += haversine(t.points[j - 1], p); }));
    const times = pts.map(p => p[2]).filter(Boolean);
    const crossed = districts.filter(d => pts.some(p => haversine(p, d.coords) < 700));
    const dayPhotos = photos.filter(p => dayKey(p.taken || p.date) === day).sort((a, b) => (a.taken || a.date) - (b.taken || b.date));
    return `<article class="journal-day" style="--day:${color}">
      <header><span class="day-dot"></span><h3>Jour ${i + 1} · ${dayLabel(day)}</h3></header>
      <div class="facts">${pts.length ? `<span>${(km / 1000).toFixed(1).replace(".", ",")} km</span>` : ""}${times.length ? `<span>${fmtTime(Math.min(...times))} – ${fmtTime(Math.max(...times))}</span>` : ""}<span>${dayPhotos.length} photo(s)</span></div>
      ${crossed.length ? `<p class="crossed">Quartiers parcourus : ${crossed.map(d => `<button class="resto-district" data-id="${d.id}">${d.name}</button>`).join(" ")}</p>` : ""}
      ${dayPhotos.length ? `<div class="photo-grid">${dayPhotos.map(p => `<figure><img src="${URL.createObjectURL(p.blob)}" alt="Photo personnelle"></figure>`).join("")}</div>` : ""}
      <label class="note-label" for="note-${day}">Note du jour</label>
      <textarea id="note-${day}" class="day-note" data-day="${day}" rows="3" placeholder="Restaurants testés, coups de cœur, rencontres…">${(notes[day] || "").replace(/</g, "&lt;")}</textarea>
      ${dayTracks.length ? `<button class="text-button" data-showday="${day}">Voir ce jour sur la carte</button>` : ""}
    </article>`;
  }).join("");
}

document.querySelector("#journalButton").addEventListener("click", () => { renderJournal(); sheetState(journalSheet); });
document.querySelector("#autoPhotoInput").addEventListener("change", e => { addPhotosAuto([...e.target.files]); e.target.value = ""; });
document.querySelector("#journalDays").addEventListener("change", async e => {
  const sel = e.target.closest("[data-classify]"); if (!sel || !sel.value) return;
  const all = await dbRun("readonly", st => st.getAll());
  const ph = all.find(p => p.id === Number(sel.dataset.classify)); if (!ph) return;
  ph.district = sel.value; await dbRun("readwrite", st => st.put(ph));
  await drawJournal(); renderJournal();
});
document.querySelector("#gpxInput").addEventListener("change", e => importTracks(e.target.files));
document.querySelector("#journalDays").addEventListener("input", e => {
  const ta = e.target.closest(".day-note"); if (!ta) return;
  clearTimeout(ta._t);
  ta._t = setTimeout(() => dbRun("readwrite", st => st.put({ day: ta.dataset.day, text: ta.value }), "notes").catch(() => {}), 400);
});
document.querySelector("#journalDays").addEventListener("click", async e => {
  const d = e.target.closest("[data-id]"); if (d) return openDistrict(d.dataset.id);
  const b = e.target.closest("[data-showday]"); if (!b) return;
  const { tracks } = await loadJournal();
  const pts = tracks.filter(t => t.day === b.dataset.showday).flatMap(t => t.points.map(p => [p[0], p[1]]));
  sheetState(null);
  if (pts.length) map.fitBounds(L.latLngBounds(pts), { padding: [40, 40] });
});
drawJournal();

listButton.addEventListener("click", () => sheetState(districtList));
document.querySelector("#infoButton").addEventListener("click", () => sheetState(infoSheet));
document.querySelectorAll("[data-close]").forEach(button => button.addEventListener("click", () => sheetState(null)));
districtButtons.addEventListener("click", event => {
  const button = event.target.closest("[data-id]");
  if (button) openDistrict(button.dataset.id);
});

document.addEventListener("keydown", event => { if (event.key === "Escape") sheetState(null); });
window.addEventListener("orientationchange", () => setTimeout(() => map.invalidateSize(), 250));

// Open the closest neighborhood by default without covering the map on first load.
map.fitBounds(L.latLngBounds([HOTEL.coords, ...districts.map(d => d.coords)]), {
  paddingTopLeft: [54, 125],
  paddingBottomRight: [54, 100],
  maxZoom: 12
});

document.querySelector("#transitButton").addEventListener("click", () => toggleTransit(!transitOn));
document.querySelector("#transitClose").addEventListener("click", () => { document.querySelector("#transitBox").hidden = true; });
