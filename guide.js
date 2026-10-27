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
  const sights = d.monuments.map(m => `<li><span class="rank ${rk(m[0])}">${m[0]}</span><div><b>${esc(m[1])}</b><span class="d">${esc(m[2])}</span></div><span class="price">${esc(m[3])}</span></li>`).join("");
  const eat = e ? `<div class="box eat"><h4>Où manger</h4><ul>${e.food.map(x => `<li><b>${esc(x[0])}</b> : ${esc(x[1])} (${esc(x[2])})</li>`).join("")}</ul></div>` : "";
  const know = e ? `<div class="box know"><h4>Bon à savoir</h4><ul>${e.tips.map(t => `<li>${esc(t)}</li>`).join("")}</ul></div>` : "";
  const pause = L ? `<div class="box pause"><h4>Pauses & plaisirs</h4><ul>${L.green.concat(L.more.slice(0, 2)).map(t => `<li>${esc(t)}</li>`).join("")}</ul></div>` : "";
  const go = d.routes.slice(0, 2).map(r => `<b>${esc(r[0])}</b> ${esc(r[1])}`).join(" · ");
  return `<article class="district" id="${d.id}" style="--zc:${color}">
    <div class="photo" role="img" aria-label="${esc(d.name)}" style="${f ? bg(f.photo, 1000) : ""}"><span class="num">${n}</span>${f ? `<a class="credit" href="${photoPage(f.photo)}" target="_blank" rel="noreferrer">Photo Wikimedia Commons</a>` : ""}</div>
    <div class="body">
      <h3 class="name">${esc(d.name)}</h3>
      <p class="punch">${esc(f ? f.line : d.subtitle)}</p>
      <p class="story">${esc(DESCRIPTIONS[d.id] || d.intro)}</p>
      ${f ? `<div class="flash"><span class="label">En bref</span><ol>${f.top.map(t => `<li>${esc(t)}</li>`).join("")}</ol><p class="tip">Le bon plan : ${esc(f.tip)}</p></div>` : ""}
      <ul class="sights">${sights}</ul>
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
      <div class="info"><h3>Fermetures</h3><p>Topkapı le mardi, Dolmabahçe le lundi, Chora le vendredi, Grand Bazar le dimanche. Mosquées fermées aux visiteurs pendant les prières.</p></div>
    </div>
  </div></section>

  <section class="block" id="quartiers" style="padding-top:20px"><div class="wrap">
    <div class="kicker" style="color:var(--z2)">Les quartiers</div>
    <h2 class="title">Quatorze quartiers, cinq zones</h2>
    <p class="lead">Les lieux sont classés en trois niveaux : <span class="rank r3" style="padding:0 8px">+++</span> à ne pas rater, <span class="rank r2" style="padding:0 8px">++</span> si tu as le temps, <span class="rank r1" style="padding:0 8px">+</span> en passant. Prix pour un visiteur étranger, octobre 2026.</p>
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
        ${NEAR_HOTEL.map(r => `<tr><td><b>${esc(r[0])}</b></td><td>${esc(r[1])}</td><td>${esc(r[2])}</td><td>${esc(r[3])}</td></tr>`).join("")}
      </table></div>
    </div>
  </div></section>

  <section class="block" id="regles"><div class="wrap">
    <div class="kicker" style="color:var(--z4)">Coutumes</div>
    <h2 class="title">Les règles d’or</h2>
    <p class="lead">Istanbul est accueillante et sûre pour qui respecte quelques usages et connaît les pièges classiques.</p>
    <div class="rules">
      <div class="rule-col do"><h3>À faire</h3><ul>${DO.map(t => `<li>${t}</li>`).join("")}</ul></div>
      <div class="rule-col dont"><h3>À éviter</h3><ul>${DONT.map(t => `<li>${t}</li>`).join("")}</ul></div>
    </div>
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

  <footer><div class="wrap">
    Photos : Wikimedia Commons, sous licences libres (cliquer sur « Photo Wikimedia Commons » pour l’auteur et la licence).
    Prix et horaires vérifiés le 27 octobre 2026, au taux de 1 € = 55,67 TL ; ils peuvent changer.
    Sources détaillées dans la rubrique « Infos pratiques » de la <a href="./">carte interactive</a>.
  </div></footer>`;
}
render();
