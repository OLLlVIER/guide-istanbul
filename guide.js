// Guide « ordinateur » : construit à partir des mêmes données que la carte (data.js).

const ZONES = [
  { id: "z1", name: "La vieille ville", intro: "Là où tout a commencé : Byzance, Constantinople, puis la capitale des sultans. Deux ou trois matinées, à pied depuis l’hôtel.", ids: ["sultanahmet", "topkapi", "eminonu", "beyazit", "suleymaniye"] },
  { id: "z2", name: "La Corne d’Or", intro: "Le long de l’estuaire, les quartiers grecs, juifs et arméniens, et le lieu le plus sacré de la ville.", ids: ["fener-balat", "eyup"] },
  { id: "z3", name: "Galata & Beyoğlu", intro: "De l’autre côté du pont, l’Istanbul européenne : la tour génoise, les cafés et l’avenue qui ne dort jamais.", ids: ["galata", "beyoglu"] },
  { id: "z4", name: "Le Bosphore", intro: "Les palais du XIXe siècle, la mosquée la plus photographiée et les villages au bord de l’eau.", ids: ["besiktas", "ortakoy", "bebek"] },
  { id: "z5", name: "Côté Asie", intro: "Vingt minutes de ferry, un thé à la main, et l’on change de continent.", ids: ["kadikoy", "uskudar"] }
];

const DAYS = [
  ["28", "Mercredi", "Veille de fête", "Demi-journée fériée dès 13 h. Les ferries de la ville sont souvent gratuits l’après-midi."],
  ["29", "Jeudi", "Fête de la République", "103 ans de la République : drapeaux, défilé aux flambeaux, feux d’artifice sur le Bosphore. Ferry spécial depuis Eminönü vers 19 h 30."],
  ["30", "Vendredi", "Foot et jazz", "Galatasaray joue en championnat. Concert de jazz au CRR à 20 h. Chora fermée aux visiteurs."],
  ["31", "Samedi", "Fenerbahçe à Kadıköy", "Match à domicile, ambiance unique. Billets avec la carte Passolig et le passeport."],
  ["1er", "Dimanche", "Marathon", "Arrivée à Sultanahmet, routes fermées jusque vers 15 h 30. Grand Bazar fermé."]
];

const DISHES = [
  ["Kahvaltı", "Le petit-déjeuner turc qui couvre toute la table : fromages, olives, miel, œufs, thé."],
  ["Simit", "L’anneau de pain au sésame des charrettes de rue, avec un çay."],
  ["Balık ekmek", "Sandwich au maquereau grillé sur les quais d’Eminönü."],
  ["Büryan", "Agneau rôti des heures dans un four creusé, à 8 min de l’hôtel."],
  ["Kebab", "Adana épicé, urfa doux, iskender au yaourt et au beurre fondu."],
  ["Pide & lahmacun", "La pizza turque en barque, et la galette fine à rouler avec du persil."],
  ["Mezzés & rakı", "Le dîner de meyhane, petites assiettes à partager."],
  ["Kokoreç", "Le sandwich de fin de soirée, pour les courageux."],
  ["Kumpir", "La pomme de terre géante garnie à volonté, à Ortaköy."],
  ["Baklava & künefe", "Pistache et sirop, ou fromage fondant servi brûlant."],
  ["Lokum", "Le loukoum, à la rose ou à la pistache, à rapporter."],
  ["Çay & café turc", "Thé rouge à toute heure ; le café se boit sans remuer le marc."]
];

const DO = [
  "Mosquées : épaules et genoux couverts, foulard pour les filles, chaussures à la main. Pas pendant la prière, surtout le vendredi midi.",
  "Atatürk et le drapeau : respect total, c’est la loi. Surtout le 29 octobre.",
  "Accepter le çay offert dans une boutique : ça n’oblige à rien acheter.",
  "Négocier au Grand Bazar, jamais au restaurant.",
  "Pourboire de 5 à 10 % au restaurant.",
  "Dire merhaba (bonjour), teşekkürler (merci), hesap lütfen (l’addition)."
];
const DONT = [
  "Les débats sur la politique et les manifestations.",
  "Photographier policiers, militaires et bâtiments officiels.",
  "Tarlabaşı et Dolapdere la nuit ; préférer un taxi le soir autour d’Aksaray, près de l’hôtel.",
  "Le « nouvel ami » qui invite à boire un verre : addition de plusieurs centaines d’euros.",
  "Le cireur qui fait tomber sa brosse : ne pas la ramasser.",
  "Les taxis sans compteur : prendre Uber ou BiTaksi.",
  "Les restaurants à rabatteurs sans prix affichés.",
  "Les bureaux de change touristiques : retirer au distributeur d’une banque. Urgences : 112."
];

const STATS = [
  ["15,75 M", "habitants à Istanbul, près d’un Turc sur cinq", "--z2"],
  ["34,9 ans", "âge médian en Turquie", "--z4"],
  ["16e", "économie mondiale (FMI) ; Istanbul fait 29,2 % du PIB", "--z3"],
  ["29,7 %", "d’inflation sur un an en septembre 2026", "--z1"],
  ["≈ 500 €", "salaire minimum net (28 075 TL par mois)", "--z5"],
  ["≈ 1 000 €", "salaire moyen net à Istanbul (≈ 1 170 $)", "--z5"],
  ["≈ 3 000", "mosquées à Istanbul, majorité musulmane sunnite", "--z4"],
  ["1923", "proclamation de la République par Atatürk, le 29 octobre", "--z2"]
];

const TIMELINE = [
  ["660 av.", "Fondation de Byzance par des colons grecs."],
  ["330", "Constantin en fait Constantinople, capitale de l’Empire romain d’Orient."],
  ["1453", "Conquête ottomane par Mehmet II."],
  ["1550", "Apogée sous Soliman et l’architecte Sinan."],
  ["1923", "Fin de l’empire, naissance de la République."]
];

const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
const bg = (file, w = 1600) => `background-image:url('${photoUrl(file, w)}')`;
const rk = r => r === "+++" ? "r3" : r === "++" ? "r2" : "r1";

function districtCard(d, n, color) {
  const f = FLASH[d.id], e = extras[d.id], L = LEISURE[d.id];
  const sights = d.monuments.map(m => `<li><span class="rank ${rk(m[0])}">${m[0]}</span><div><b>${esc(m[1])}</b><span class="d">${esc(m[2])}</span>${placeLinks(m[1])}</div><span class="price">${esc(m[3])}</span></li>`).join("");
  const eat = e ? `<div class="box eat"><h4>Où manger</h4><ul>${e.food.map(x => `<li><b>${esc(x[0])}</b> : ${esc(x[1])} (${esc(x[2])}) ${placeLinks(x[0])}</li>`).join("")}</ul></div>` : "";
  const know = e ? `<div class="box know"><h4>Bon à savoir</h4><ul>${e.tips.map(t => `<li>${esc(t)}</li>`).join("")}</ul></div>` : "";
  const pause = L ? `<div class="box pause"><h4>Pauses & plaisirs</h4><ul>${L.green.concat(L.more.slice(0, 2)).map(t => `<li>${esc(t)}</li>`).join("")}</ul></div>` : "";
  const H = typeof HOTSPOTS !== "undefined" ? HOTSPOTS[d.id] : null;
  const hot = H ? `<div class="hot"><div><h4>Les adresses branchées</h4><ul>${H.go.map(t => `<li>${esc(t)}</li>`).join("")}</ul></div><div><h4>Les spots à ne pas manquer</h4><ul>${H.see.map(t => `<li>${esc(t)}</li>`).join("")}</ul></div></div>` : "";
  const go = d.routes.slice(0, 2).map(r => `<b>${esc(r[0])}</b> ${esc(r[1])}`).join(" · ");
  return `<article class="district" id="${d.id}" style="--zc:${color}">
    <div class="photo" role="img" aria-label="${esc(d.name)}" style="${f ? bg(f.photo, 1000) : ""}"><span class="num">${n}</span>${f ? `<a class="credit" href="${photoPage(f.photo)}" target="_blank" rel="noreferrer">Photo Wikimedia Commons</a>` : ""}</div>
    <div class="body">
      <h3 class="name">${esc(d.name)}</h3>
      <p class="punch">${esc(f ? f.line : d.subtitle)}</p>
      <p class="story">${esc(DESCRIPTIONS[d.id] || d.intro)}</p>
      ${f ? `<div class="flash"><span class="label">En bref</span><ol>${f.top.map(t => `<li>${esc(t)}</li>`).join("")}</ol><p class="tip">Le bon plan : ${esc(f.tip)}</p></div>` : ""}
      <ul class="sights">${sights}</ul>
      ${hot}
      <div class="boxes">${eat}${know}${pause}</div>
      <p class="go">Depuis l’hôtel : ${go}</p>
    </div>
  </article>`;
}

function render() {
  const num = id => districts.findIndex(d => d.id === id) + 1;
  const zones = ZONES.map(z => {
    const color = `var(--${z.id})`;
    return `<div class="zone" style="--zc:${color}">
      <div class="zone-head"><h2>${z.name}</h2><p>${z.intro}</p></div>
      ${z.ids.map(id => districtCard(districts.find(d => d.id === id), num(id), color)).join("")}
    </div>`;
  }).join("");

  document.querySelector("#guide").innerHTML = `
  <header class="hero" style="${bg("Istanbul_(Turkey)_banner_Galata_Tower.jpg", 2000)}">
    <div class="wrap">
      <div class="kicker">Du 28 octobre au 1er novembre 2026 · au départ du Mövenpick Old Town</div>
      <h1>Istanbul, la ville entre deux mondes</h1>
      <p>Quatorze quartiers, ce qu’il faut voir, où manger, comment se comporter, et de quoi comprendre la Turquie d’aujourd’hui.</p>
    </div>
    <a class="credit" href="${photoPage("Istanbul_(Turkey)_banner_Galata_Tower.jpg")}" target="_blank" rel="noreferrer">Photo Wikimedia Commons</a>
  </header>

  <section class="block" id="sejour"><div class="wrap">
    <div class="kicker" style="color:var(--z1)">Le séjour</div>
    <h2 class="title">Cinq jours pas comme les autres</h2>
    <p class="lead">Le séjour tombe pendant la fête de la République et le week-end du marathon. Voici ce qui se passe chaque jour.</p>
    <div class="days">${DAYS.map(d => `<div class="day"><div class="dow">${d[1]}</div><div class="date">${d[0]}</div><h3>${d[2]}</h3><p>${d[3]}</p></div>`).join("")}</div>
    <div class="infos">
      <div class="info"><h3>L’hôtel</h3><p>Mövenpick Istanbul Old Town, Atatürk Bulvarı 9, Unkapanı. À 12 min à pied de Süleymaniye, tram T1 à Aksaray, métro M2 à Vezneciler.</p></div>
      <div class="info"><h3>Se déplacer</h3><p>Carte Istanbulkart : 42 TL le trajet (env. 0,75 €) en tram, métro, bus et ferry. En taxi : Uber ou BiTaksi.</p></div>
      <div class="info"><h3>Applis à installer</h3><p>Uber ou BiTaksi pour le taxi (au compteur, sans négocier), Martı pour la trottinette, İstanbulkart pour recharger la carte de transport depuis le téléphone.</p><span class="plinks"><a class="pl" href="https://m.uber.com/" target="_blank" rel="noreferrer">Uber</a><a class="pl" href="https://apps.apple.com/app/id589500723" target="_blank" rel="noreferrer">BiTaksi</a><a class="pl" href="https://apps.apple.com/app/id1454358771" target="_blank" rel="noreferrer">Martı (trottinette)</a><a class="pl" href="https://apps.apple.com/app/id1352307391" target="_blank" rel="noreferrer">İstanbulkart</a><a class="pl" href="https://www.google.com/maps/@41.015,28.975,13z/data=!5m1!1e2" target="_blank" rel="noreferrer">Google Maps transports</a></span></div>
      <div class="info"><h3>Trottinette</h3><p>Applis Martı, BinBin ou HOP : on scanne et on paie à la minute, sans permis. Seul sur la trottinette, casque conseillé. À éviter dans la vieille ville (pavés, pentes, rails de tram, circulation). Parfait le long de l’eau : Kadıköy–Moda, ou Ortaköy–Bebek sur le Bosphore. Un vrai scooter demande un permis adapté : à vérifier avec le loueur et l’assurance.</p></div>
      <div class="info"><h3>Payer</h3><p>Revolut sur le téléphone ou la carte passe presque partout : restaurants, boutiques, supermarchés, Uber, bornes Istanbulkart. Garde 500 à 1 000 TL en petits billets (10 à 20 €) pour les pourboires, le simit, les petits cafés, les bazars et certains hammams. Retrait aux distributeurs des banques (Ziraat, İş Bankası, Garanti) et toujours payer en livres turques, jamais en euros.</p></div>
      <div class="info"><h3>Fermetures</h3><p>Topkapı le mardi, Dolmabahçe le lundi, Chora le vendredi, Grand Bazar le dimanche. Mosquées fermées aux visiteurs pendant les prières.</p></div>
    </div>
  </div></section>

  <section class="block" id="essentiel"><div class="wrap">
    <div class="kicker" style="color:var(--z1)">Peu de temps ?</div>
    <h2 class="title">Les 10 incontournables</h2>
    <p class="lead">Si tu ne dois voir que dix choses à Istanbul. Budget total des entrées : environ 165 €.</p>
    <ol class="top10"><li><span class="tnum">1</span><div><b>Sainte-Sophie</b><small>Quartier 1 · Sultanahmet</small></div><span class="tmeta">1 h<br><em>25 €</em></span></li><li><span class="tnum">2</span><div><b>Palais de Topkapı et Harem</b><small>Quartier 2 · Topkapı</small></div><span class="tmeta">2 h 30<br><em>env. 49 €</em></span></li><li><span class="tnum">3</span><div><b>Citerne-Basilique</b><small>Quartier 1 · Sultanahmet</small></div><span class="tmeta">45 min<br><em>env. 35 €</em></span></li><li><span class="tnum">4</span><div><b>Mosquée Bleue</b><small>Quartier 1 · Sultanahmet</small></div><span class="tmeta">30 min<br><em>gratuit</em></span></li><li><span class="tnum">5</span><div><b>Mosquée Süleymaniye et sa terrasse</b><small>Quartier 5 · à 12 min de l’hôtel</small></div><span class="tmeta">45 min<br><em>gratuit</em></span></li><li><span class="tnum">6</span><div><b>Grand Bazar</b><small>Quartier 4 · Beyazıt</small></div><span class="tmeta">1 h<br><em>gratuit</em></span></li><li><span class="tnum">7</span><div><b>Bazar aux épices et balık ekmek sur les quais</b><small>Quartier 3 · Eminönü</small></div><span class="tmeta">1 h<br><em>4–8 € le sandwich</em></span></li><li><span class="tnum">8</span><div><b>Chora et ses mosaïques</b><small>Quartier 6 · Fener & Balat</small></div><span class="tmeta">1 h<br><em>20 €</em></span></li><li><span class="tnum">9</span><div><b>Tour de Galata</b><small>Quartier 8 · Galata</small></div><span class="tmeta">45 min<br><em>30 €</em></span></li><li><span class="tnum">10</span><div><b>Une traversée en ferry au coucher du soleil</b><small>Quartier 13 · Eminönü → Kadıköy ou Üsküdar</small></div><span class="tmeta">25 min<br><em>env. 0,75 €</em></span></li></ol>
    <h3 class="sub2">Le programme express : 3 heures par jour</h3>
    <p class="lead small">Calé sur les fermetures, les événements et la météo prévue le 27 octobre (à revérifier la veille). Jeudi, le jour le plus pluvieux, tombe bien : Sainte-Sophie, la Citerne et la Mosquée Bleue sont à l’abri. Samedi et dimanche, les plus beaux, sont réservés aux balades et au ferry.</p>
    <div class="xplan"><div class="xday"><span class="xd">Mer. 28</span><span class="xw"><i>☁︎</i> 17° / 14° · pluie 30 %</span><b>Les bazars, depuis l’hôtel</b><p>Süleymaniye à pied, puis Grand Bazar et Bazar aux épices. À faire le matin : c’est la veille de la fête, le pays s’arrête à 13 h.</p><small>Quartiers 5 · 4 · 3</small></div><div class="xday"><span class="xd">Jeu. 29</span><span class="xw"><i>☂︎</i> 17° / 15° · pluie 75 %</span><b>Sultanahmet</b><p>Sainte-Sophie à l’ouverture, Citerne-Basilique, Mosquée Bleue. Le soir, feux d’artifice de la fête de la République sur le Bosphore.</p><small>Quartiers 1</small></div><div class="xday"><span class="xd">Ven. 30</span><span class="xw"><i>☁︎</i> 16° / 14° · pluie 25 %</span><b>Topkapı et Galata</b><p>Topkapı le matin (fermé le mardi seulement), puis la tour de Galata et Karaköy. Évite les mosquées vers midi, heure de la grande prière.</p><small>Quartiers 2 · 8</small></div><div class="xday"><span class="xd">Sam. 31</span><span class="xw"><i>☀︎</i> 17° / 14° · pluie 10 %</span><b>Balat et Chora</b><p>Chora (fermée le vendredi, donc samedi), puis les ruelles de Balat. Le soir, ferry pour Kadıköy : Fenerbahçe joue à domicile.</p><small>Quartiers 6 · 13</small></div><div class="xday"><span class="xd">Dim. 1er</span><span class="xw"><i>☀︎</i> 18° / 14° · pluie 15 %</span><b>Ferry et coucher de soleil</b><p>Le marathon ferme Sultanahmet et les quais le matin : grasse matinée, puis ferry pour Üsküdar et coucher de soleil sur la vieille ville vers 18 h. Grand Bazar fermé le dimanche.</p><small>Quartiers 14</small></div></div>
  </div></section>

  <section class="block" id="regles"><div class="wrap">
    <div class="kicker" style="color:var(--z4)">Coutumes</div>
    <h2 class="title">À faire, à éviter</h2>
    <p class="lead">Istanbul est accueillante et sûre pour qui respecte quelques usages et connaît les pièges classiques.</p>
    <div class="rules">
      <div class="rule-col do"><h3>À faire</h3><ul>${DO.map(t => `<li>${t}</li>`).join("")}</ul></div>
      <div class="rule-col dont"><h3>À éviter</h3><ul>${DONT.map(t => `<li>${t}</li>`).join("")}</ul></div>
    </div>
  </div></section>

  <section class="block" id="lexique"><div class="wrap">
    <div class="kicker" style="color:var(--z3)">Parler turc</div>
    <h2 class="title">Les 10 mots qui ouvrent les portes</h2>
    <p class="lead small">En turc, le ş se dit « ch », le ç « tch », le ü comme en français, le ı entre « i » et « eu », et chaque lettre se prononce.</p>
    <p class="lead small">Touchez 🔊 pour entendre le mot, une deuxième fois pour l’entendre lentement.</p><div class="lexgrid"><div class="lex"><b>Merhaba</b><button type="button" class="say" data-say="Merhaba" aria-label="Écouter « Merhaba »">🔊</button><span>[mèr-ha-ba]</span><em>Bonjour</em></div><div class="lex"><b>Teşekkürler</b><button type="button" class="say" data-say="Teşekkürler" aria-label="Écouter « Teşekkürler »">🔊</button><span>[té-chèk-kur-lèr]</span><em>Merci</em></div><div class="lex"><b>Lütfen</b><button type="button" class="say" data-say="Lütfen" aria-label="Écouter « Lütfen »">🔊</button><span>[lut-fène]</span><em>S’il vous plaît</em></div><div class="lex"><b>Evet / Hayır</b><button type="button" class="say" data-say="Evet, Hayır" aria-label="Écouter « Evet / Hayır »">🔊</button><span>[é-vèt / ha-yeur]</span><em>Oui / Non</em></div><div class="lex"><b>Ne kadar?</b><button type="button" class="say" data-say="Ne kadar?" aria-label="Écouter « Ne kadar? »">🔊</button><span>[né ka-dar]</span><em>Combien ?</em></div><div class="lex"><b>Hesap lütfen</b><button type="button" class="say" data-say="Hesap lütfen" aria-label="Écouter « Hesap lütfen »">🔊</button><span>[hé-sap lut-fène]</span><em>L’addition, s’il vous plaît</em></div><div class="lex"><b>Nerede?</b><button type="button" class="say" data-say="Nerede?" aria-label="Écouter « Nerede? »">🔊</button><span>[né-ré-dé]</span><em>Où ?</em></div><div class="lex"><b>Su</b><button type="button" class="say" data-say="Su" aria-label="Écouter « Su »">🔊</button><span>[sou]</span><em>Eau</em></div><div class="lex"><b>Afiyet olsun</b><button type="button" class="say" data-say="Afiyet olsun" aria-label="Écouter « Afiyet olsun »">🔊</button><span>[a-fi-yèt ol-soun]</span><em>Bon appétit</em></div><div class="lex"><b>Tamam</b><button type="button" class="say" data-say="Tamam" aria-label="Écouter « Tamam »">🔊</button><span>[ta-mam]</span><em>D’accord</em></div></div>
  </div></section>

  <section class="block" id="quartiers" style="padding-top:20px"><div class="wrap">
    <div class="kicker" style="color:var(--z2)">Les quartiers</div>
    <h2 class="title">Quatorze quartiers, cinq zones</h2>
    <p class="lead">Les lieux sont classés en trois niveaux : <span class="rank r3" style="padding:0 8px">+++</span> à ne pas rater, <span class="rank r2" style="padding:0 8px">++</span> si tu as le temps, <span class="rank r1" style="padding:0 8px">+</span> en passant. Prix pour un visiteur étranger, octobre 2026.</p>
    <div class="zmap-wrap"><div id="zmap" class="zmap" aria-label="Carte des quatorze quartiers"></div>
      <aside class="zindex">${ZONES.map(z => `<div class="zgroup"><h5 style="color:var(--${z.id})">${z.name}</h5>${z.ids.map(id => `<a href="#${id}"><b style="background:var(--${z.id})">${districts.findIndex(d => d.id === id) + 1}</b>${districts.find(d => d.id === id).name}</a>`).join("")}</div>`).join("")}<div class="zgroup"><a><b style="background:#d4a24c;color:#1d1608">H</b>Mövenpick Old Town</a></div><p class="zhint">Les cercles clairs regroupent les quartiers à faire dans la même sortie : passe la souris dessus pour voir la suggestion. Clique sur un numéro ou un nom pour aller au quartier.</p></aside></div>
    ${zones}
  </div></section>

  <section class="block food-band" id="manger"><div class="wrap">
    <div class="kicker" style="color:#ffd9a8">Manger</div>
    <h2 class="title">Les 12 choses à goûter</h2>
    <p class="lead">La cuisine turque mêle les héritages ottoman, anatolien, balkanique et méditerranéen. On partage, et le pain accompagne tout.</p>
    <div class="dishes">${DISHES.map(d => `<div class="dish"><b>${d[0]}</b><span>${d[1]}</span></div>`).join("")}</div>
    <div class="near">
      <h3>Les bonnes tables près de l’hôtel</h3>
      <div class="table-scroll"><table>
        <tr><th>Adresse</th><th>Spécialité</th><th>Prix</th><th>Accès</th></tr>
        ${NEAR_HOTEL.map(r => `<tr><td><b>${esc(r[0])}</b><br>${placeLinks(r[0])}</td><td>${esc(r[1])}</td><td>${esc(r[2])}</td><td>${esc(r[3])}</td></tr>`).join("")}
      </table></div>
    </div>
  </div></section>

  <section class="block" id="healthy"><div class="wrap">
    <div class="kicker" style="color:var(--z4)">Tables, vues et parcs</div>
    <h2 class="title">Où bien manger, les plus belles vues, les coins de verdure</h2>
    <h3 class="sub2">Les tables à ne pas manquer</h3>
    <p class="lead small">Les adresses dont tout le monde parle, toutes à moins de 50 € par personne. € moins de 15 € · €€ 15–40 € par personne, à titre indicatif.</p>
    <div class="hgrid"><div class="hcard green2"><div class="hhead"><b>Karaköy Güllüoğlu</b><span class="htag">€</span></div><p class="hmeta">Karaköy · Pâtisserie</p><p>Le baklava à la pistache de référence depuis 1949.</p>${placeLinks("Karaköy Güllüoğlu")}</div><div class="hcard green2"><div class="hhead"><b>Hafız Mustafa 1864</b><span class="htag">€</span></div><p class="hmeta">Sultanahmet, Sirkeci · Pâtisserie</p><p>Lokum, baklava et vitrines les plus photographiées.</p>${placeLinks("Hafız Mustafa 1864")}</div><div class="hcard green2"><div class="hhead"><b>Siirt Şeref Büryan 1892</b><span class="htag">€€</span></div><p class="hmeta">Kadınlar Pazarı, 8 min de l’hôtel · Sud-est de la Turquie</p><p>L’agneau rôti au four creusé que les Stambouliotes font découvrir.</p>${placeLinks("Siirt Şeref Büryan 1892")}</div><div class="hcard green2"><div class="hhead"><b>Çiya Sofrası</b><span class="htag">€€</span></div><p class="hmeta">Kadıköy · Anatolie</p><p>La cuisine régionale que les chefs du monde entier viennent goûter.</p>${placeLinks("Çiya Sofrası")}</div><div class="hcard green2"><div class="hhead"><b>Yanyalı Fehmi</b><span class="htag">€</span></div><p class="hmeta">Kadıköy · Lokanta, Bib Gourmand 2026</p><p>Plats mijotés, distingué par le guide Michelin.</p>${placeLinks("Yanyalı Fehmi")}</div><div class="hcard green2"><div class="hhead"><b>Hamdi</b><span class="htag">€€</span></div><p class="hmeta">Eminönü · Kebabs</p><p>Kebabs du sud-est en terrasse face à la Corne d’Or.</p>${placeLinks("Hamdi")}</div><div class="hcard green2"><div class="hhead"><b>Karaköy Lokantası</b><span class="htag">€€</span></div><p class="hmeta">Karaköy · Mezzés et plats du jour</p><p>La salle turquoise la plus élégante du quartier.</p>${placeLinks("Karaköy Lokantası")}</div><div class="hcard green2"><div class="hhead"><b>Pandeli</b><span class="htag">€€</span></div><p class="hmeta">au-dessus du Bazar aux épices · Ottoman</p><p>Une salle de faïences turquoise au-dessus du bazar.</p>${placeLinks("Pandeli")}</div><div class="hcard green2"><div class="hhead"><b>Hacı Abdullah</b><span class="htag">€€</span></div><p class="hmeta">Beyoğlu · Ottoman</p><p>Plats mijotés et compotes maison depuis 1888.</p>${placeLinks("Hacı Abdullah")}</div><div class="hcard green2"><div class="hhead"><b>Balat Sahil</b><span class="htag">€€</span></div><p class="hmeta">Balat · Poisson et mezzés</p><p>Au bord de la Corne d’Or, après la visite de Chora.</p>${placeLinks("Balat Sahil")}</div></div>
    <h3 class="sub2">Les plus belles vues et les lieux à photographier</h3>
    <div class="igrid"><div class="icard"><b>Kiremit Caddesi</b><small>Balat</small><p>Les façades multicolores les plus photographiées. Tôt le matin.</p></div><div class="icard"><b>Terrasse de Süleymaniye</b><small>à 12 min de l’hôtel</small><p>La Corne d’Or et le Bosphore à perte de vue. Au lever ou au coucher du soleil.</p></div><div class="icard"><b>Escaliers Camondo et rue Büyük Hendek</b><small>Galata</small><p>Escaliers Art nouveau et la tour au bout de la rue. Tôt le matin.</p></div><div class="icard"><b>Mosquée d’Ortaköy</b><small>Ortaköy</small><p>La mosquée sous le pont illuminé. Au coucher du soleil.</p></div><div class="icard"><b>Allées du Bazar aux épices</b><small>Eminönü</small><p>Voûtes, pyramides d’épices et lokum. En semaine, le matin.</p></div><div class="icard"><b>Lampes du Grand Bazar</b><small>Beyazıt</small><p>Les boutiques de lampes en mosaïque de verre. En semaine.</p></div><div class="icard"><b>Çiçek Pasajı</b><small>Beyoğlu</small><p>Passage du XIXe siècle sous verrière. Le matin, avant l’ouverture des restaurants.</p></div><div class="icard"><b>Pâtisserie de Pera</b><small>Pera Palace, Beyoğlu</small><p>Le salon de thé du palace de l’Orient-Express.</p></div><div class="icard"><b>Fil Books</b><small>Karaköy</small><p>Café-librairie au comptoir de marbre et aux chaises suspendues.</p></div><div class="icard"><b>Kuzguncuk</b><small>rive asiatique</small><p>Village aux maisons pastel et café couvert de bougainvilliers.</p></div></div>
    <h3 class="sub2">Les parcs</h3>
    <div class="igrid"><div class="pcard"><b>Gülhane</b><small>Sultanahmet</small><p>Ancien jardin de Topkapı, grands platanes et thé face au Bosphore.</p></div><div class="pcard"><b>Esplanade de Süleymaniye</b><small>près de l’hôtel</small><p>Jardins calmes de la mosquée, vue sur toute la ville.</p></div><div class="pcard"><b>Yıldız</b><small>Beşiktaş</small><p>Grand parc boisé et vallonné, pavillons ottomans et brunch le week-end.</p></div><div class="pcard"><b>Maçka</b><small>Beşiktaş–Şişli</small><p>Pentes ensoleillées pour pique-niquer, courir ou faire du yoga.</p></div><div class="pcard"><b>Parc côtier de Moda</b><small>Kadıköy</small><p>Promenade en bord de mer, coucher de soleil sur la vieille ville.</p></div><div class="pcard"><b>Fethi Paşa</b><small>Üsküdar</small><p>Parc en terrasses avec cafés et vue sur le Bosphore.</p></div><div class="pcard"><b>Emirgan</b><small>Sarıyer, au bord du Bosphore</small><p>Le plus grand parc de la ville, pavillons ottomans et lacs.</p></div><div class="pcard"><b>Jardin japonais de Baltalimanı</b><small>Bosphore</small><p>Petit jardin japonais au bord de l’eau, très calme.</p></div></div>
  </div></section>

  <section class="block" id="insolite"><div class="wrap">
    <div class="kicker" style="color:var(--z3)">Insolite</div>
    <h2 class="title">Istanbul autrement</h2>
    <p class="lead small">Dix expériences qu’on ne trouve pas dans tous les guides.</p>
    <div class="igrid"><div class="icard"><b>Le Tünel</b><small>Karaköy → Beyoğlu</small><p>Le deuxième plus vieux métro souterrain du monde, ouvert en 1875 : une minute et demie de montée sous la colline de Galata.</p><em class="ip">Istanbulkart</em>${placeLinks("Le Tünel")}</div><div class="icard"><b>Les îles des Princes</b><small>ferry depuis Kabataş ou Eminönü</small><p>Environ 1 h 30 de ferry pour des îles sans voitures : maisons en bois, pinèdes, tour de Büyükada à vélo.</p><em class="ip">Istanbulkart</em>${placeLinks("Les îles des Princes")}</div><div class="icard"><b>Les remparts de Théodose</b><small>Edirnekapı, à côté de Chora</small><p>Les murailles byzantines du Ve siècle qui ont arrêté les envahisseurs pendant mille ans. On peut longer les tours à pied.</p><em class="ip">gratuit</em>${placeLinks("Les remparts de Théodose")}</div><div class="icard"><b>La Citerne-Basilique la nuit</b><small>Sultanahmet</small><p>Séance nocturne de 19 h 30 à 22 h, lumières et parfois musique live, avec beaucoup moins de monde.</p><em class="ip">3 000 TL, env. 54 €</em>${placeLinks("La Citerne-Basilique la nuit")}</div><div class="icard"><b>La citerne de Şerefiye</b><small>Sultanahmet</small><p>Une citerne byzantine plus petite et plus calme, avec un spectacle de lumière projeté sur les colonnes.</p><em class="ip">env. 17 €</em>${placeLinks("La citerne de Şerefiye")}</div><div class="icard"><b>Le musée de l’Innocence</b><small>Çukurcuma, Beyoğlu</small><p>Créé par le prix Nobel Orhan Pamuk à partir des objets de son roman : un musée qui est aussi une histoire d’amour.</p><em class="ip">tarif à vérifier</em>${placeLinks("Le musée de l’Innocence")}</div><div class="icard"><b>La cérémonie des derviches tourneurs</b><small>Galata Mevlevihanesi</small><p>Le sema, la danse mystique des derviches, certains soirs dans le couvent de 1491.</p><em class="ip">horaires à vérifier</em>${placeLinks("La cérémonie des derviches tourneurs")}</div><div class="icard"><b>Se faire lire l’avenir dans le café</b><small>cafés traditionnels</small><p>Le kahve falı : on retourne la tasse de café turc et on lit les dessins du marc.</p><em class="ip">selon le café</em>${placeLinks("Se faire lire l’avenir dans le café")}</div><div class="icard"><b>Les chats d’Istanbul</b><small>partout</small><p>La ville appartient aux chats : nourris et soignés par chaque quartier, ils dorment dans les boutiques et les mosquées.</p><em class="ip">gratuit</em>${placeLinks("Les chats d’Istanbul")}</div><div class="icard"><b>Le musée Rahmi M. Koç</b><small>Hasköy, Corne d’Or</small><p>Un sous-marin, des avions, des trains et des voitures anciennes dans un ancien chantier naval.</p><em class="ip">tarif à vérifier</em>${placeLinks("Le musée Rahmi M. Koç")}</div></div>
  </div></section>

  <section class="block" id="hammams"><div class="wrap">
    <div class="kicker" style="color:var(--z2)">Bien-être</div>
    <h2 class="title">Bien-être</h2>
    <p class="lead">Le hammam est une institution : on y passe du chaud au tiède, on se fait frotter au gant de crin (kese) puis masser à la mousse. Les tarifs ci-dessous viennent des sites des hammams, vérifiés en septembre et octobre 2026.</p>
    <div class="hotelbox"><b>À l’hôtel</b><p>Le Mövenpick Old Town a un spa avec hammam, sauna et hammam de vapeur, une piscine intérieure et une salle de sport ouverte 24 h/24. Certains clients signalent qu’il faut réserver la piscine et la salle : demande à la réception en arrivant.</p></div>
    <h3 class="sub2">Près de l’hôtel</h3>
    <div class="hgrid"><div class="hcard"><div class="hhead"><b>Zeyrek Çinili Hamam</b><span class="htag">Haut de gamme</span></div><p class="hmeta">Zeyrek · 6 min à pied</p><p>Hammam du XVIe siècle aux faïences d’Iznik, rouvert en 2023 après 13 ans de restauration, avec un petit musée. Formules hommes et femmes réservées séparément.</p><em>6 957 TL, env. 125 €</em>${placeLinks("Zeyrek Çinili Hamam")}</div><div class="hcard"><div class="hhead"><b>Acemoğlu Hamamı</b><span class="htag">Abordable</span></div><p class="hmeta">Vezneciler · 10 min à pied</p><p>Hammam mixte pour les couples, maillot de bain obligatoire.</p><em>env. 25 € l’entrée seule, 40 € avec gommage</em>${placeLinks("Acemoğlu Hamamı")}</div><div class="hcard"><div class="hhead"><b>Süleymaniye Hamamı</b><span class="htag">Historique</span></div><p class="hmeta">Süleymaniye · 12 min à pied</p><p>Bâti par Sinan pour la mosquée de Soliman. Réservé aux couples et aux familles : pas pour un garçon seul.</p><em>env. 90 €, espèces uniquement</em>${placeLinks("Süleymaniye Hamamı")}</div><div class="hcard"><div class="hhead"><b>Gedikpaşa Hamamı</b><span class="htag">Classique</span></div><p class="hmeta">près du Grand Bazar · 20 min à pied</p><p>L’un des plus anciens de la ville (1475), sections hommes et femmes.</p><em>50 € en libre, 70 € avec rituel</em>${placeLinks("Gedikpaşa Hamamı")}</div><div class="hcard"><div class="hhead"><b>Çemberlitaş Hamamı</b><span class="htag">Classique</span></div><p class="hmeta">Çemberlitaş, tram T1 · 20 min</p><p>Œuvre de Sinan, ouvert de 6 h à minuit, sections hommes et femmes séparées.</p><em>4 050 TL, env. 72 €</em>${placeLinks("Çemberlitaş Hamamı")}</div></div>
    <h3 class="sub2">Les hammams des Stambouliotes</h3>
    <p class="lead small">Moins de décor, plus d’ambiance : ceux où vont les habitants.</p>
    <div class="hgrid"><div class="hcard local"><div class="hhead"><b>Mihrimah Sultan Hamamı</b><span class="htag">Local</span></div><p class="hmeta">Edirnekapı, à côté de Chora</p><p>Le vrai hammam de quartier, fréquenté par les habitants. Hommes 7 h–23 h, femmes 9 h–20 h. Parfait avant ou après la visite de Chora.</p><em>1 000 TL, env. 18 € gommage et mousse compris</em>${placeLinks("Mihrimah Sultan Hamamı")}</div><div class="hcard local"><div class="hhead"><b>Ağa Hamamı</b><span class="htag">Local</span></div><p class="hmeta">Cihangir, Beyoğlu</p><p>Petit hammam de quartier ancien, dans les rues des artistes de Cihangir.</p><em>3 100 TL en espèces, env. 55 €</em>${placeLinks("Ağa Hamamı")}</div><div class="hcard local"><div class="hhead"><b>Tarihi Galatasaray Hamamı</b><span class="htag">Local</span></div><p class="hmeta">près d’İstiklal</p><p>Fondé en 1481, l’un des plus anciens de la ville, encore très fréquenté.</p><em>prix à demander sur place</em>${placeLinks("Tarihi Galatasaray Hamamı")}</div><div class="hcard local"><div class="hhead"><b>Kılıç Ali Paşa Hamamı</b><span class="htag">Local</span></div><p class="hmeta">Tophane, près de Karaköy</p><p>Chef-d’œuvre de Sinan restauré, haut de gamme. Femmes 8 h–16 h, hommes 16 h 45–23 h 30.</p><em>4 700 TL, env. 84 €</em>${placeLinks("Kılıç Ali Paşa Hamamı")}</div></div>
    <div class="hhow"><b>Mode d’emploi</b> On reçoit une serviette (peştemal) et des sandales ; on garde la serviette ou un maillot. Hommes et femmes sont séparés, sauf mention contraire. Compter 1 h à 1 h 30, boire de l’eau, et laisser un pourboire de 10 % au masseur (tellak) ou à la masseuse (natır).</div>
    <div class="hhow sport"><b>Courir</b> La salle de l’hôtel suffit pour la muscu. Pour courir, deux belles boucles : le long de la Corne d’Or de Fener à Eyüp, ou au bord de la mer de Marmara sous Topkapı, sur la promenade de Kennedy Caddesi. Le dimanche 1er novembre, le marathon passe sur cette promenade.</div>
  </div></section>


  <section class="block" id="turquie" style="background:var(--sand)"><div class="wrap">
    <div class="kicker" style="color:var(--z3)">Comprendre</div>
    <h2 class="title">La Turquie en chiffres</h2>
    <p class="lead">Un pays jeune, une économie puissante mais minée par l’inflation, et une vie politique passionnée.</p>
    <div class="stats">${STATS.map(s => `<div class="stat" style="--sc:var(${s[2]})"><div class="v">${s[0]}</div><div class="l">${s[1]}</div></div>`).join("")}</div>
    <div class="timeline">${TIMELINE.map(t => `<div><b>${t[0]}</b>${t[1]}</div>`).join("")}</div>
    <div class="politics"><b>Politique.</b> La Turquie est une république présidentielle depuis 2018. Recep Tayyip Erdoğan (AKP) dirige le pays depuis 2003, d’abord comme Premier ministre puis comme président depuis 2014, avec l’Alliance populaire (AKP et MHP). La principale opposition est le CHP, dirigé par Özgür Özel. Le maire CHP d’Istanbul, Ekrem İmamoğlu, est détenu depuis mars 2025 pour des accusations de corruption qu’il conteste : l’opposition y voit une affaire politique, le gouvernement une procédure judiciaire. Prochaine présidentielle au plus tard en 2028.</div>
  </div></section>

  <section class="end" style="${bg("Bosphorus_(Istanbul)_banner_Dolmabahce_Palace.jpg", 2000)}"><div class="wrap">
    <div class="kicker">Le mot de la fin</div>
    <h2 class="title">Ne cherche pas à tout voir</h2>
    <p>Istanbul a été trois fois capitale d’un empire, et elle est posée sur deux continents. Prends un ferry sans but, perds-toi dans Balat, accepte le çay d’un commerçant, regarde le soleil se coucher sur les coupoles depuis Üsküdar. Dis « merhaba » et « teşekkürler » : on te répondra avec un sourire.</p>
    <p class="sign">Bon voyage. İyi yolculuklar !</p>
  </div></section>

  <section id="programme" class="block"><div class="wrap">
    <div class="kicker">Mon programme</div>
    <h2 class="title">Cochez, on s’occupe du reste</h2>
    <p class="lead">Choisissez vos jours et ce que vous voulez vraiment voir : le programme se construit tout seul. Il regroupe les quartiers voisins, évite les jours de fermeture, met les visites à l’abri les jours de pluie et profite des événements. Vos choix restent enregistrés sur cet appareil.</p>
    <div id="plannerMount"></div>
  </div></section>

  <footer><div class="wrap">
    Photos : Wikimedia Commons, sous licences libres (cliquer sur « Photo Wikimedia Commons » pour l’auteur et la licence).
    Prix et horaires vérifiés le 27 octobre 2026, au taux de 1 € = 55,67 TL ; ils peuvent changer.
    Sources détaillées dans la rubrique « Infos pratiques » de la <a href="./">carte interactive</a>.
  </div></footer>`;
}
render();

// Carte des quartiers, numérotés et colorés par zone.
(function initMap() {
  if (!window.L) return;
  const css = getComputedStyle(document.documentElement);
  const zoneOf = id => ZONES.find(z => z.ids.includes(id));
  const map = L.map("zmap", { scrollWheelZoom: false, zoomControl: true, zoomSnap: 0.25 });
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 18, attribution: "© OpenStreetMap" }).addTo(map);
  drawGroups(map, L);
  const pin = (label, name, color, cls = "") => L.divIcon({ className: "zpin " + cls, html: `<b style="background:${color}">${label}</b>`, iconSize: [34, 34], iconAnchor: [17, 17] });
  const pts = [];
  districts.forEach((d, i) => {
    const z = zoneOf(d.id); const color = css.getPropertyValue(`--${z.id}`).trim();
    L.marker(d.coords, { icon: pin(i + 1, d.name, color) }).addTo(map).bindTooltip(`${i + 1}. ${d.name}`, { direction: "top", offset: [0, -16] })
      .on("click", () => document.getElementById(d.id)?.scrollIntoView({ behavior: "smooth", block: "start" }));
    pts.push(d.coords);
  });
  L.marker(HOTEL.coords, { icon: pin("H", "Mövenpick Old Town", "#d4a24c", "hotel"), zIndexOffset: 1000 }).addTo(map).bindTooltip("Mövenpick Old Town", { direction: "top", offset: [0, -16] });
  pts.push(HOTEL.coords);
  map.fitBounds(L.latLngBounds(pts), { padding: [24, 24] });
})();

// Le guide s'ouvre toujours en haut, même depuis un lien qui pointe vers une rubrique ou après un rechargement.
if ("scrollRestoration" in history) history.scrollRestoration = "manual";
if (location.hash) history.replaceState(null, "", location.pathname + location.search);
window.scrollTo(0, 0);

// Mes photos : celles ajoutées dans le carnet de la carte apparaissent à la fin de chaque quartier (même appareil, même navigateur).
(function () {
  if (!("indexedDB" in window)) return;
  const req = indexedDB.open("guide-istanbul-photos", 2);
  req.onupgradeneeded = e => {
    const db = req.result;
    if (e.oldVersion < 1) db.createObjectStore("photos", { keyPath: "id", autoIncrement: true }).createIndex("district", "district");
    if (e.oldVersion < 2) { db.createObjectStore("tracks", { keyPath: "id", autoIncrement: true }); db.createObjectStore("notes", { keyPath: "day" }); }
  };
  req.onsuccess = () => {
    let all;
    try { all = req.result.transaction("photos").objectStore("photos").getAll(); } catch (e) { return; }
    all.onsuccess = () => {
      const photos = (all.result || []).filter(p => p.district).sort((a, b) => (a.taken || a.date) - (b.taken || b.date));
      districts.forEach(d => {
        const mine = photos.filter(p => p.district === d.id);
        const card = document.getElementById(d.id);
        if (!mine.length || !card) return;
        const box = document.createElement("div");
        box.className = "myphotos";
        box.innerHTML = `<h4>Mes photos · ${mine.length}</h4><div class="mygrid">${mine.map(p => { const u = URL.createObjectURL(p.blob); return `<a href="${u}" target="_blank" rel="noopener"><img src="${u}" alt="Photo personnelle, ${d.name}" loading="lazy"></a>`; }).join("")}</div>`;
        card.appendChild(box);
      });
    };
  };
})();

// Plusieurs photos à faire défiler en tête de chaque quartier.
districts.forEach(d => districtSlides(d).then(slides => {
  const host = document.querySelector(`#${CSS.escape(d.id)} .photo`);
  buildCarousel(host, slides);
}).catch(() => {}));

// Des liens partout où un lieu est nommé.
autoPlaceLinks(document, ".icard, .hcard, .pcard, .top10 li > div", false);
autoPlaceLinks(document, ".hot li, .box.pause li", true);
