const HOTEL = {
  name: "Mövenpick Istanbul Old Town",
  address: "Zeyrek Mahallesi, Atatürk Bulvarı No 9, Unkapanı, Fatih",
  coords: [41.0176, 28.9568]
};

const districts = [
  {
    id: "sultanahmet", name: "Sultanahmet", subtitle: "Le cœur byzantin et ottoman", coords: [41.0055, 28.9767],
    intro: "Le quartier le plus dense en chefs-d’œuvre : arrivez tôt et avancez à pied autour de l’ancien Hippodrome.",
    routes: [
      ["Uber", "15–25 min · env. 5–8 €"], ["Tramway", "18–25 min · T1 depuis Aksaray · env. 0,85 €"],
      ["Métro + marche", "20–28 min · M2 Vezneciler puis marche · env. 0,85 €"], ["À pied", "32–38 min · 2,7 km"]
    ],
    monuments: [
      ["+++", "Sainte-Sophie", "Édifiée par Justinien entre 532 et 537, elle fut basilique impériale, mosquée, musée puis mosquée. Sa coupole et ses mosaïques racontent quinze siècles d’histoire.", "env. 25 € pour la galerie touristique", "1 h 15–1 h 45", "4 min vers la Citerne-Basilique"],
      ["+++", "Citerne-Basilique", "Réservoir monumental du VIe siècle, porté par 336 colonnes et célèbre pour ses deux têtes de Méduse. La scénographie contemporaine met en valeur l’architecture souterraine.", "env. 16 €", "45–60 min", "5 min vers la Mosquée Bleue"],
      ["+++", "Mosquée Bleue", "Construite pour Ahmed Ier entre 1609 et 1617, elle associe l’héritage de Sainte-Sophie au classicisme ottoman et conserve plus de 20 000 carreaux d’Iznik.", "gratuit", "30–45 min", "2 min vers l’Hippodrome"],
      ["++", "Hippodrome & obélisques", "Ancien centre des courses et des cérémonies de Constantinople. L’obélisque de Théodose, la colonne Serpentine et la colonne Murée en dessinent encore l’axe.", "gratuit", "25–40 min", null]
    ]
  },
  {
    id: "topkapi", name: "Topkapı & Gülhane", subtitle: "Pouvoir impérial et collections", coords: [41.0115, 28.9833],
    intro: "Une demi-journée de palais, de trésors archéologiques et de jardins dominant le Bosphore.",
    routes: [["Uber", "15–25 min · env. 5–8 €"], ["Tramway", "20–28 min · T1 vers Gülhane · env. 0,85 €"], ["Métro + marche", "22–30 min · M2 + 18 min à pied · env. 0,85 €"], ["À pied", "35–42 min · 3 km"]],
    monuments: [
      ["+++", "Palais de Topkapı", "Résidence et centre de gouvernement des sultans ottomans du XVe au XIXe siècle. Les cours, le Trésor, le Harem et les vues sur le Bosphore justifient une longue visite.", "env. 49 € combiné palais + Harem + Sainte-Irène", "3–4 h", "4 min vers les Musées archéologiques"],
      ["+++", "Musées archéologiques", "Trois musées réunissant des œuvres de l’Anatolie, de la Mésopotamie, de l’Égypte et du monde gréco-romain, dont le célèbre sarcophage d’Alexandre.", "env. 15 €", "1 h 30–2 h", "5 min vers Gülhane"],
      ["++", "Parc de Gülhane", "Ancien jardin extérieur du palais, ouvert au public en 1912. Ses allées offrent une pause ombragée entre la vieille ville et la Corne d’Or.", "gratuit", "30–50 min", null]
    ]
  },
  {
    id: "eminonu", name: "Eminönü & Sirkeci", subtitle: "Marchés, mosquées et Corne d’Or", coords: [41.0165, 28.9706],
    intro: "Un quartier vivant à parcourir tôt le matin, entre les parfums du Bazar aux épices et les quais.",
    routes: [["Uber", "8–15 min · env. 4–6 €"], ["Tramway", "12–18 min · T1 depuis Aksaray · env. 0,85 €"], ["Bus", "12–20 min · selon circulation · env. 0,85 €"], ["À pied", "20–25 min · 1,7 km"]],
    monuments: [
      ["+++", "Bazar aux épices", "Construit au XVIIe siècle comme partie du complexe de la Nouvelle Mosquée, il demeure un marché d’épices, de fruits secs, de douceurs et de produits traditionnels.", "gratuit", "45–75 min", "3 min vers la Nouvelle Mosquée"],
      ["++", "Nouvelle Mosquée", "Commencée en 1597 et achevée en 1665, elle forme avec le marché voisin un vaste ensemble pieux financé par les sultanes de la cour.", "gratuit", "25–40 min", "6 min vers Rüstem Paşa"],
      ["++", "Mosquée Rüstem Paşa", "Chef-d’œuvre plus intime de Mimar Sinan, achevé vers 1563 et remarquable pour l’abondance de ses carreaux d’Iznik bleus et rouges.", "gratuit", "20–35 min", "10 min vers la gare de Sirkeci"],
      ["+", "Gare de Sirkeci", "Terminal européen historique de l’Orient-Express, inauguré en 1890. Sa façade mêle orientalisme européen et détails ottomans.", "gratuit", "20–30 min", null]
    ]
  },
  {
    id: "beyazit", name: "Beyazıt & Grand Bazar", subtitle: "Le labyrinthe commerçant", coords: [41.0108, 28.9680],
    intro: "Prévoyez du temps pour vous perdre : les monuments encadrent un réseau de rues commerçantes couvertes et découvertes.",
    routes: [["Uber", "8–15 min · env. 4–6 €"], ["Métro", "5–10 min · M2 Vezneciler puis marche · env. 0,85 €"], ["Tramway", "8–14 min · T1 depuis Aksaray · env. 0,85 €"], ["À pied", "17–22 min · 1,4 km"]],
    monuments: [
      ["+++", "Grand Bazar", "Fondé après la conquête de 1453 et agrandi pendant des siècles, ce réseau de hans et de rues couvertes rassemble des milliers de boutiques sous ses voûtes.", "gratuit", "1 h 30–3 h", "5 min vers Nuruosmaniye"],
      ["++", "Mosquée Nuruosmaniye", "Achevée en 1755, elle marque l’apparition du baroque ottoman. Sa cour en fer à cheval et sa lumière la distinguent des mosquées classiques.", "gratuit", "25–40 min", "9 min vers la place Beyazıt"],
      ["++", "Mosquée & place Beyazıt", "La mosquée de 1506 est l’un des premiers grands ensembles impériaux après la conquête. La place ouvre aujourd’hui sur l’Université d’Istanbul.", "gratuit", "30–45 min", "5 min vers le marché aux livres"],
      ["+", "Sahaflar Çarşısı", "Le marché des bouquinistes perpétue la tradition des libraires et copistes installés autour des médersas ottomanes.", "gratuit", "20–30 min", null]
    ]
  },
  {
    id: "suleymaniye", name: "Süleymaniye & Vefa", subtitle: "Sinan, coupoles et vues", coords: [41.0162, 28.9638],
    intro: "Le quartier le plus proche de l’hôtel : une promenade architecturale avec des vues spectaculaires sur la Corne d’Or.",
    routes: [["Uber", "4–8 min · env. 3–5 €"], ["À pied", "10–16 min · itinéraire en pente"], ["Bus", "8–14 min · env. 0,85 €"], ["Métro", "M2 peu utile pour ce trajet"]],
    monuments: [
      ["+++", "Mosquée Süleymaniye", "Construite par Mimar Sinan pour Soliman le Magnifique entre 1550 et 1557, elle domine la Corne d’Or par l’équilibre de ses volumes et de son complexe social.", "gratuit", "45–70 min", "10 min vers Vefa"],
      ["++", "Mosquée Kalenderhane", "Ancienne église byzantine probablement dédiée à la Theotokos Kyriotissa, convertie en mosquée après 1453. Elle conserve une architecture médiobyzantine lisible.", "gratuit", "25–40 min", "8 min vers l’aqueduc"],
      ["++", "Aqueduc de Valens", "Édifié au IVe siècle sous l’empereur Valens, il fut un élément majeur du réseau d’alimentation en eau de Constantinople puis de la ville ottomane.", "gratuit", "20–30 min", "12 min vers Zeyrek"],
      ["+++", "Mosquée Zeyrek", "L’ancien monastère du Pantocrator, fondé au XIIe siècle, est l’un des plus importants ensembles religieux byzantins conservés après Sainte-Sophie.", "gratuit", "35–50 min", null]
    ]
  },
  {
    id: "fener-balat", name: "Fener & Balat", subtitle: "Mémoires grecques, juives et ottomanes", coords: [41.0298, 28.9496],
    intro: "Un itinéraire de rues en pente et de lieux de culte : chaussures confortables et tenue respectueuse recommandées.",
    routes: [["Uber", "10–18 min · env. 4–7 €"], ["Bus", "15–25 min vers Fener · env. 0,85 €"], ["Tramway T5", "Rejoindre Cibali puis T5 · 20–30 min · env. 1,70 €"], ["À pied", "25–35 min · 2,3 km"]],
    monuments: [
      ["++", "Église Saint-Étienne-des-Bulgares", "Cette église de la fin du XIXe siècle est célèbre pour sa structure préfabriquée en fonte, assemblée sur la rive de la Corne d’Or.", "gratuit", "30–45 min", "8 min vers le Patriarcat"],
      ["++", "Patriarcat œcuménique & Saint-Georges", "Siège spirituel majeur de l’orthodoxie grecque. L’église patriarcale conserve un riche décor et des reliques dans un ensemble discret.", "gratuit", "30–45 min", "12 min vers Balat"],
      ["+", "Rues de Balat", "Maisons colorées, escaliers, petits commerces et édifices religieux témoignent du passé cosmopolite du quartier, longtemps habité par des communautés grecques, juives et arméniennes.", "gratuit", "1–1 h 30", "18 min vers Kariye"],
      ["+++", "Mosquée Kariye / ancienne Chora", "Célèbre pour ses mosaïques et fresques paléologues du XIVe siècle, l’ancienne église de la Chora offre l’un des ensembles byzantins les plus raffinés d’Istanbul.", "tarif à vérifier sur place", "60–90 min", null]
    ]
  },
  {
    id: "galata", name: "Galata & Karaköy", subtitle: "Génois, banques et création", coords: [41.0257, 28.9741],
    intro: "Commencez par la tour avant l’affluence, puis descendez vers Karaköy à travers escaliers, passages et cafés.",
    routes: [["Uber", "10–20 min · env. 5–8 €"], ["Métro", "M2 Vezneciler → Şişhane · 15–22 min · env. 0,85 €"], ["Tramway", "T1 vers Karaköy · 18–25 min · env. 0,85 €"], ["À pied", "28–35 min via le pont de Galata"]],
    monuments: [
      ["+++", "Tour de Galata", "Élevée par les Génois en 1348, la tour fut tour de guet, prison et observatoire. Son belvédère offre un panorama circulaire sur la vieille ville et le Bosphore.", "env. 30 €", "45–75 min", "6 min vers le Mevlevihanesi"],
      ["++", "Galata Mevlevihanesi", "Premier couvent mevlevi d’Istanbul, fondé en 1491. Le musée présente l’histoire des derviches tourneurs, leur musique et leurs objets rituels.", "env. 7 €", "45–60 min", "10 min vers SALT Galata"],
      ["++", "SALT Galata", "Installé dans l’ancienne Banque ottomane, ce centre culturel associe architecture fin XIXe, archives, expositions, bibliothèque et vues sur la ville.", "gratuit", "45–75 min", "7 min vers Kılıç Ali Paşa"],
      ["++", "Mosquée Kılıç Ali Paşa", "Mimar Sinan construisit ce complexe au XVIe siècle pour l’amiral Kılıç Ali Paşa. Son plan fait clairement écho à Sainte-Sophie.", "gratuit", "25–40 min", null]
    ]
  },
  {
    id: "beyoglu", name: "Beyoğlu & Taksim", subtitle: "Passages, ambassades et modernité", coords: [41.0359, 28.9824],
    intro: "Une promenade urbaine à faire de préférence en fin d’après-midi, lorsque l’avenue İstiklal s’anime.",
    routes: [["Uber", "18–30 min · env. 7–11 €"], ["Métro", "M2 Vezneciler → Taksim · 12–18 min · env. 0,85 €"], ["Tramway + funiculaire", "T1 + F1 · 25–35 min · env. 1,70 €"], ["À pied", "45–55 min · montée soutenue"]],
    monuments: [
      ["+++", "Avenue İstiklal & passages", "Grande artère cosmopolite de Pera, bordée d’immeubles des XIXe et XXe siècles, de consulats, de passages, de lieux de culte et du tramway historique.", "gratuit", "1 h 30–3 h", "4 min vers Saint-Antoine"],
      ["++", "Église Saint-Antoine-de-Padoue", "La plus grande église catholique d’Istanbul, reconstruite en style néogothique vénitien au début du XXe siècle.", "gratuit", "20–30 min", "6 min vers le musée de Pera"],
      ["++", "Musée de Pera", "Musée privé installé dans l’ancien Hôtel Bristol, connu pour ses peintures orientalistes, ses collections anatoliennes et ses expositions temporaires.", "env. 5–8 €", "1–1 h 30", "16 min vers Taksim"],
      ["+", "Place Taksim & monument de la République", "Centre symbolique de l’Istanbul moderne, aménagé autour du monument de 1928 commémorant la fondation de la République.", "gratuit", "20–30 min", null]
    ]
  },
  {
    id: "besiktas", name: "Beşiktaş & Dolmabahçe", subtitle: "Le Bosphore impérial", coords: [41.0392, 29.0005],
    intro: "Palais, collections et front de mer : consacrez au moins une demi-journée à cette portion du Bosphore.",
    routes: [["Uber", "20–35 min · env. 9–14 €"], ["Métro + marche", "M2 vers Taksim puis 22 min à pied · env. 0,85 €"], ["Tramway + marche", "T1 vers Kabataş puis 12 min à pied · env. 0,85 €"], ["Ferry", "Via Eminönü → Beşiktaş · 35–50 min · env. 1–2 €"]],
    monuments: [
      ["+++", "Palais de Dolmabahçe", "Résidence impériale achevée en 1856, elle mêle organisation ottomane et décors baroque, rococo et néoclassique. Atatürk y passa ses derniers jours.", "env. 36 € combiné", "2 h 30–3 h 30", "12 min vers le Musée naval"],
      ["++", "Musée naval", "L’une des grandes collections maritimes de Turquie : caïques impériaux, maquettes, instruments et objets retraçant l’histoire de la marine ottomane.", "env. 8–12 €", "1–1 h 30", "20 min vers Yıldız"],
      ["+++", "Palais de Yıldız", "Complexe de pavillons et de jardins développé surtout sous Abdülhamid II à la fin du XIXe siècle, lorsqu’il devint le centre du pouvoir impérial.", "env. 25–30 €", "1 h 30–2 h", null]
    ]
  },
  {
    id: "ortakoy", name: "Ortaköy", subtitle: "Mosquée, palais et rive du Bosphore", coords: [41.0474, 29.0268],
    intro: "Un quartier compact, particulièrement agréable en fin d’après-midi pour la lumière sur le Bosphore et le pont.",
    routes: [["Uber", "25–45 min · env. 11–17 €"], ["Bus", "Depuis Eminönü ou Beşiktaş · 35–55 min · env. 0,85–1,70 €"], ["Ferry", "Eminönü → Ortaköy selon horaires · env. 1–2 €"], ["Tram + bus", "T1 jusqu’à Kabataş puis bus · 40–55 min · env. 1,70 €"]],
    monuments: [
      ["+++", "Mosquée d’Ortaköy", "La Büyük Mecidiye Camii fut achevée en 1854 par la famille Balyan. Son décor néobaroque et sa situation au bord de l’eau en font une icône du Bosphore.", "gratuit", "25–40 min", "10 min vers Çırağan"],
      ["+", "Place et marché d’Ortaköy", "Petite place vivante tournée vers le Bosphore, entourée de cafés, d’étals d’artisans et de vendeurs de kumpir.", "gratuit", "45–75 min", "10 min vers Çırağan"],
      ["++", "Palais de Çırağan — extérieur", "Ancien palais ottoman du XIXe siècle construit pour Abdülaziz, aujourd’hui hôtel. Sa façade sur le Bosphore se découvre depuis la promenade.", "extérieur gratuit", "15–25 min", "12 min vers le parc Yıldız"],
      ["++", "Parc Yıldız", "Ancien domaine impérial transformé en vaste parc paysager, avec bosquets, pavillons et points de vue au-dessus du Bosphore.", "gratuit", "1–1 h 30", null]
    ]
  }
];

const map = L.map("map", { zoomControl: true, attributionControl: true }).setView([41.024, 28.982], 13);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap contributors"
}).addTo(map);

function pinIcon(type, label) {
  return L.divIcon({
    className: "custom-marker",
    html: `<div class="map-pin ${type}"><span>${label}</span></div>`,
    iconSize: [40, 40], iconAnchor: [20, 39]
  });
}

L.marker(HOTEL.coords, { icon: pinIcon("hotel", "H") })
  .addTo(map)
  .bindTooltip(`<strong>${HOTEL.name}</strong><br>${HOTEL.address}`, { direction: "top", offset: [0, -34] });

const markers = new Map();
districts.forEach((district, index) => {
  const marker = L.marker(district.coords, { icon: pinIcon("district", index + 1) }).addTo(map);
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

districtButtons.innerHTML = districts.map((d, i) => `<button class="district-button" data-id="${d.id}"><strong>${i + 1}. ${d.name}</strong><span>${d.subtitle}</span></button>`).join("");

function sheetState(openSheet) {
  [detailSheet, districtList, infoSheet].forEach(sheet => {
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
    <header class="detail-hero">
      <span class="number">${index + 1}</span>
      <h2>${district.name}</h2>
      <p>${district.subtitle}</p>
      <p>${district.intro}</p>
    </header>
    <section class="route-card">
      <h3>Depuis le Mövenpick Old Town</h3>
      <div class="routes">${district.routes.map(r => `<div class="route"><b>${r[0]}</b><span>${r[1]}</span></div>`).join("")}</div>
    </section>
    <section class="monuments">
      <h3>Les monuments — par ordre de priorité</h3>
      ${district.monuments.map(m => `<article class="monument"><span class="rank">${m[0]}</span><h4>${m[1]}</h4><p>${m[2]}</p><div class="facts"><span>${m[3]}</span><span>${m[4]}</span></div>${m[5] ? `<p class="walk-next">À pied : ${m[5]}</p>` : ""}</article>`).join("")}
    </section>`;
  sheetState(detailSheet);
  map.flyTo(district.coords, 14, { duration: .65 });
  requestAnimationFrame(() => detailSheet.scrollTop = 0);
}

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
