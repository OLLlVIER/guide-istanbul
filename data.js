// Données partagées par la carte (index.html) et le guide ordinateur (guide.html).
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
      ["Uber", "15–25 min · env. 5–8 €"], ["Tramway", "18–25 min · T1 depuis Aksaray · env. 0,75 €"],
      ["Métro + marche", "20–28 min · M2 Vezneciler puis marche · env. 0,75 €"], ["À pied", "32–38 min · 2,7 km"]
    ],
    monuments: [
      ["+++", "Sainte-Sophie", "Édifiée par Justinien entre 532 et 537, elle fut basilique impériale, mosquée, musée puis mosquée. Sa coupole et ses mosaïques racontent quinze siècles d’histoire.", "25 € · galerie touristique (Museum Pass non valable)", "1 h 15–1 h 45", "4 min vers la Citerne-Basilique"],
      ["+++", "Citerne-Basilique", "Réservoir monumental du VIe siècle, porté par 336 colonnes et célèbre pour ses deux têtes de Méduse. La scénographie contemporaine met en valeur l’architecture souterraine.", "1 950 TL · env. 35 € (séance nocturne 3 000 TL)", "45–60 min", "5 min vers la Mosquée Bleue"],
      ["+++", "Mosquée Bleue", "Construite pour Ahmed Ier entre 1609 et 1617, elle associe l’héritage de Sainte-Sophie au classicisme ottoman et conserve plus de 20 000 carreaux d’Iznik.", "gratuit", "30–45 min", "2 min vers l’Hippodrome"],
      ["++", "Hippodrome & obélisques", "Ancien centre des courses et des cérémonies de Constantinople. L’obélisque de Théodose, la colonne Serpentine et la colonne Murée en dessinent encore l’axe.", "gratuit", "25–40 min", null],
      ["++", "Petite Sainte-Sophie (Saints-Serge-et-Bacchus)", "Église de Justinien bâtie vers 527, juste avant Sainte-Sophie, dont elle annonce la coupole. Devenue mosquée, elle garde sa frise grecque d’origine.", "gratuit", "20–30 min", null]
    ]
  },
  {
    id: "topkapi", name: "Topkapı & Gülhane", subtitle: "Pouvoir impérial et collections", coords: [41.0115, 28.9833],
    intro: "Une demi-journée de palais, de trésors archéologiques et de jardins dominant le Bosphore.",
    routes: [["Uber", "15–25 min · env. 5–8 €"], ["Tramway", "20–28 min · T1 vers Gülhane · env. 0,75 €"], ["Métro + marche", "22–30 min · M2 + 18 min à pied · env. 0,75 €"], ["À pied", "35–42 min · 3 km"]],
    monuments: [
      ["+++", "Palais de Topkapı", "Résidence et centre de gouvernement des sultans ottomans du XVe au XIXe siècle. Les cours, le Trésor, le Harem et les vues sur le Bosphore justifient une longue visite.", "2 750 TL · env. 49 € (palais + Harem + Sainte-Irène)", "3–4 h", "4 min vers les Musées archéologiques"],
      ["+++", "Musées archéologiques", "Trois musées réunissant des œuvres de l’Anatolie, de la Mésopotamie, de l’Égypte et du monde gréco-romain, dont le célèbre sarcophage d’Alexandre. Le Kiosque aux faïences est en restauration en 2026.", "15–17 € · ouvert tous les jours", "1 h 30–2 h", "5 min vers Gülhane"],
      ["++", "Parc de Gülhane", "Ancien jardin extérieur du palais, ouvert au public en 1912. Ses allées offrent une pause ombragée entre la vieille ville et la Corne d’Or.", "gratuit", "30–50 min", null],
      ["++", "Sainte-Irène", "Église byzantine du VIe siècle, jamais transformée en mosquée. Sa grande croix iconoclaste en mosaïque domine l’abside nue, à l’acoustique remarquable.", "incluse dans le billet Topkapı", "20–30 min", null]
    ]
  },
  {
    id: "eminonu", name: "Eminönü & Sirkeci", subtitle: "Marchés, mosquées et Corne d’Or", coords: [41.0165, 28.9706],
    intro: "Un quartier vivant à parcourir tôt le matin, entre les parfums du Bazar aux épices et les quais.",
    routes: [["Uber", "8–15 min · env. 4–6 €"], ["Tramway", "12–18 min · T1 depuis Aksaray · env. 0,75 €"], ["Bus", "12–20 min · selon circulation · env. 0,75 €"], ["À pied", "20–25 min · 1,7 km"]],
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
    routes: [["Uber", "8–15 min · env. 4–6 €"], ["Métro", "5–10 min · M2 Vezneciler puis marche · env. 0,75 €"], ["Tramway", "8–14 min · T1 depuis Aksaray · env. 0,75 €"], ["À pied", "17–22 min · 1,4 km"]],
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
    routes: [["Uber", "4–8 min · env. 3–5 €"], ["À pied", "10–16 min · itinéraire en pente"], ["Bus", "8–14 min · env. 0,75 €"], ["Métro", "M2 peu utile pour ce trajet"]],
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
    routes: [["Uber", "10–18 min · env. 4–7 €"], ["Bus", "15–25 min vers Fener · env. 0,75 €"], ["Tramway T5", "Rejoindre Cibali puis T5 · 20–30 min · env. 1,50 €"], ["À pied", "25–35 min · 2,3 km"]],
    monuments: [
      ["++", "Église Saint-Étienne-des-Bulgares", "Cette église de la fin du XIXe siècle est célèbre pour sa structure préfabriquée en fonte, assemblée sur la rive de la Corne d’Or.", "gratuit", "30–45 min", "20 min vers Balat"],
      ["+", "Rues de Balat", "Maisons colorées, escaliers, petits commerces et édifices religieux témoignent du passé cosmopolite du quartier, longtemps habité par des communautés grecques, juives et arméniennes.", "gratuit", "1–1 h 30", "18 min vers Kariye"],
      ["+++", "Mosquée Kariye / ancienne Chora", "Célèbre pour ses mosaïques et fresques paléologues du XIVe siècle, l’ancienne église de la Chora offre l’un des ensembles byzantins les plus raffinés d’Istanbul.", "20 € · fermée aux visiteurs le vendredi", "60–90 min", null],
      ["+++", "Sainte-Marie-des-Mongols", "Seule église byzantine de la ville jamais convertie en mosquée, toujours orthodoxe depuis le XIIIe siècle. Souvent fermée : sonnez au portail, de préférence le matin.", "gratuit · offrande bienvenue", "20–30 min", null]
    ]
  },
  {
    id: "eyup", name: "Eyüp & Pierre Loti", subtitle: "Lieu saint et panorama sur la Corne d’Or", coords: [41.0478, 28.9337],
    intro: "Le lieu de pèlerinage le plus vénéré d’Istanbul. Atmosphère recueillie : tenue couvrante et discrétion, surtout le vendredi.",
    routes: [["Uber", "15–25 min · env. 5–8 €"], ["Tramway T5", "Depuis Cibali → Eyüpsultan · 20–30 min · env. 0,75 €"], ["Bus", "Le long de la Corne d’Or · 25–35 min · env. 0,75 €"], ["Ferry", "Lignes de la Corne d’Or, horaires limités"]],
    monuments: [
      ["+++", "Mosquée Eyüp Sultan", "Élevée sur la tombe d’Abu Ayyub al-Ansari, compagnon du Prophète. Les sultans y ceignaient l’épée lors de leur avènement.", "gratuit", "30–45 min", "10 min vers le cimetière"],
      ["++", "Cimetière historique", "Stèles ottomanes sculptées de turbans et de fleurs, sur la colline qui monte vers Pierre Loti.", "gratuit", "20–30 min", "Téléphérique vers Pierre Loti"],
      ["+++", "Colline Pierre Loti", "Café et belvédère nommés d’après l’écrivain français, avec une vue plongeante sur la Corne d’Or. Montée en téléphérique.", "vue gratuite · téléphérique env. 0,75 €", "45 min–1 h", null],
      ["++", "Sainte-Marie-des-Blachernes", "Église orthodoxe bâtie sur la source sacrée où l’on gardait l’icône de la Vierge protectrice de Constantinople. À Ayvansaray, entre Balat et Eyüp.", "gratuit · offrande bienvenue", "20–30 min", null]
    ]
  },
  {
    id: "galata", name: "Galata & Karaköy", subtitle: "Génois, banques et création", coords: [41.0257, 28.9741],
    intro: "Commencez par la tour avant l’affluence, puis descendez vers Karaköy à travers escaliers, passages et cafés.",
    routes: [["Uber", "10–20 min · env. 5–8 €"], ["Métro", "M2 Vezneciler → Şişhane · 15–22 min · env. 0,75 €"], ["Tramway", "T1 vers Karaköy · 18–25 min · env. 0,75 €"], ["À pied", "28–35 min via le pont de Galata"]],
    monuments: [
      ["+++", "Tour de Galata", "Élevée par les Génois en 1348, la tour fut tour de guet, prison et observatoire. Son belvédère offre un panorama circulaire sur la vieille ville et le Bosphore.", "30 € · e-billet galatakulesi.gov.tr", "45–75 min", "6 min vers le Mevlevihanesi"],
      ["++", "Galata Mevlevihanesi", "Premier couvent mevlevi d’Istanbul, fondé en 1491. Le musée présente l’histoire des derviches tourneurs, leur musique et leurs objets rituels.", "tarif à vérifier sur place", "45–60 min", "10 min vers SALT Galata"],
      ["++", "SALT Galata", "Installé dans l’ancienne Banque ottomane, ce centre culturel associe architecture fin XIXe, archives, expositions, bibliothèque et vues sur la ville.", "gratuit", "45–75 min", "7 min vers Kılıç Ali Paşa"],
      ["++", "Mosquée Kılıç Ali Paşa", "Mimar Sinan construisit ce complexe au XVIe siècle pour l’amiral Kılıç Ali Paşa. Son plan fait clairement écho à Sainte-Sophie.", "gratuit", "25–40 min", null],
      ["++", "Église Saint-Pierre-et-Saint-Paul", "Église dominicaine reconstruite par les frères Fossati en 1843, cachée derrière une cour au pied de la tour de Galata.", "gratuit · ouverte surtout le matin", "15–25 min", null]
    ]
  },
  {
    id: "beyoglu", name: "Beyoğlu & Taksim", subtitle: "Passages, ambassades et modernité", coords: [41.0359, 28.9824],
    intro: "Une promenade urbaine à faire de préférence en fin d’après-midi, lorsque l’avenue İstiklal s’anime.",
    routes: [["Uber", "18–30 min · env. 7–11 €"], ["Métro", "M2 Vezneciler → Taksim · 12–18 min · env. 0,75 €"], ["Tramway + funiculaire", "T1 + F1 · 25–35 min · env. 1,50 €"], ["À pied", "45–55 min · montée soutenue"]],
    monuments: [
      ["+++", "Avenue İstiklal & passages", "Grande artère cosmopolite de Pera, bordée d’immeubles des XIXe et XXe siècles, de consulats, de passages, de lieux de culte et du tramway historique.", "gratuit", "1 h 30–3 h", "4 min vers Saint-Antoine"],
      ["++", "Église Saint-Antoine-de-Padoue", "La plus grande église catholique d’Istanbul, reconstruite en style néogothique vénitien au début du XXe siècle.", "gratuit", "20–30 min", "6 min vers le musée de Pera"],
      ["++", "Musée de Pera", "Musée privé installé dans l’ancien Hôtel Bristol, connu pour ses peintures orientalistes, ses collections anatoliennes et ses expositions temporaires.", "450 TL · env. 8 € (gratuit ven. 18h–22h)", "1–1 h 30", "16 min vers Taksim"],
      ["+", "Place Taksim & monument de la République", "Centre symbolique de l’Istanbul moderne, aménagé autour du monument de 1928 commémorant la fondation de la République.", "gratuit", "20–30 min", null],
      ["+++", "Cathédrale du Saint-Esprit", "Cathédrale catholique d’Istanbul, bâtie en 1846 par Giuseppe Fossati. Dans la cour, la statue du pape Benoît XV érigée par les Turcs en 1921.", "gratuit · messes le dimanche", "20–30 min", null],
      ["++", "Église Sainte-Trinité (Aya Triada)", "Grande église grecque orthodoxe néo-baroque de 1880, à deux pas de la place Taksim.", "gratuit", "15–25 min", null]
    ]
  },
  {
    id: "besiktas", name: "Beşiktaş & Dolmabahçe", subtitle: "Le Bosphore impérial", coords: [41.0392, 29.0005],
    intro: "Palais, collections et front de mer : consacrez au moins une demi-journée à cette portion du Bosphore.",
    routes: [["Uber", "20–35 min · env. 9–14 €"], ["Métro + marche", "M2 vers Taksim puis 22 min à pied · env. 0,75 €"], ["Tramway + marche", "T1 vers Kabataş puis 12 min à pied · env. 0,75 €"], ["Ferry", "Via Eminönü → Beşiktaş · 35–50 min · env. 1–2 €"]],
    monuments: [
      ["+++", "Palais de Dolmabahçe", "Résidence impériale achevée en 1856, elle mêle organisation ottomane et décors baroque, rococo et néoclassique. Atatürk y passa ses derniers jours.", "2 000 TL · env. 36 € (Selamlık + Harem + peinture)", "2 h 30–3 h 30", "12 min vers le Musée naval"],
      ["++", "Musée naval", "L’une des grandes collections maritimes de Turquie : caïques impériaux, maquettes, instruments et objets retraçant l’histoire de la marine ottomane.", "env. 8–12 € · à vérifier", "1–1 h 30", "20 min vers Yıldız"],
      ["+++", "Palais de Yıldız", "Complexe de pavillons et de jardins développé surtout sous Abdülhamid II à la fin du XIXe siècle, lorsqu’il devint le centre du pouvoir impérial.", "tarif à vérifier sur place", "1 h 30–2 h", null]
    ]
  },
  {
    id: "ortakoy", name: "Ortaköy", subtitle: "Mosquée, palais et rive du Bosphore", coords: [41.0474, 29.0268],
    intro: "Un quartier compact, particulièrement agréable en fin d’après-midi pour la lumière sur le Bosphore et le pont.",
    routes: [["Uber", "25–45 min · env. 11–17 €"], ["Bus", "Depuis Eminönü ou Beşiktaş · 35–55 min · env. 0,75–1,50 €"], ["Ferry", "Eminönü → Ortaköy selon horaires · env. 1–2 €"], ["Tram + bus", "T1 jusqu’à Kabataş puis bus · 40–55 min · env. 1,50 €"]],
    monuments: [
      ["+++", "Mosquée d’Ortaköy", "La Büyük Mecidiye Camii fut achevée en 1854 par la famille Balyan. Son décor néobaroque et sa situation au bord de l’eau en font une icône du Bosphore.", "gratuit", "25–40 min", "10 min vers Çırağan"],
      ["+", "Place et marché d’Ortaköy", "Petite place vivante tournée vers le Bosphore, entourée de cafés, d’étals d’artisans et de vendeurs de kumpir.", "gratuit", "45–75 min", "10 min vers Çırağan"],
      ["++", "Palais de Çırağan — extérieur", "Ancien palais ottoman du XIXe siècle construit pour Abdülaziz, aujourd’hui hôtel. Sa façade sur le Bosphore se découvre depuis la promenade.", "extérieur gratuit", "15–25 min", "12 min vers le parc Yıldız"],
      ["++", "Parc Yıldız", "Ancien domaine impérial transformé en vaste parc paysager, avec bosquets, pavillons et points de vue au-dessus du Bosphore.", "gratuit", "1–1 h 30", null]
    ]
  },
  {
    id: "bebek", name: "Arnavutköy & Bebek", subtitle: "Les villages du Bosphore", coords: [41.0720, 29.0435],
    intro: "Maisons ottomanes en bois, promenade au ras de l’eau et déjeuner de poisson : la meilleure fin de séjour, sans musée.",
    routes: [["Uber", "35–55 min · env. 13–20 €"], ["Tram + bus", "T1 jusqu’à Kabataş puis bus 22/25E · 50–65 min · env. 1,50 €"], ["Ferry", "Lignes du Bosphore, horaires limités"], ["À pied", "Non réaliste"]],
    monuments: [
      ["++", "Maisons ottomanes d’Arnavutköy", "Yalı et maisons en bois aux façades colorées, témoins de l’ancien village grec du Bosphore.", "gratuit", "30–45 min", "25–30 min à pied vers Bebek"],
      ["++", "Église des Taxiarques (Taksiarhis)", "Grande église grecque orthodoxe d’Arnavutköy, avec sa source sacrée (ayazma) dans un passage souterrain.", "gratuit", "15–20 min", null],
      ["+++", "Promenade du Bosphore", "Le quai entre Arnavutköy et Bebek longe l’eau au plus près, avec la forteresse de Rumeli Hisarı en vue.", "gratuit", "30–45 min", null],
      ["++", "Village et parc de Bebek", "Petite baie élégante, cafés, glaciers et la mosquée de Bebek au bord du parc.", "gratuit", "30–45 min", null]
    ]
  },
  {
    id: "kadikoy", name: "Kadıköy & Moda", subtitle: "La rive asiatique et ses marchés", coords: [40.9905, 29.0255],
    intro: "Peu de grands monuments, mais l’Istanbul du quotidien : marché, cafés, librairies et promenade de Moda. La traversée en ferry fait partie de la visite.",
    routes: [["Ferry", "Marche ou tram jusqu’à Eminönü puis 20–25 min de traversée · env. 0,75 €"], ["Marmaray", "Yenikapı → Ayrılık Çeşmesi puis M4 · 30–40 min · env. 1,50 €"], ["Uber", "30–45 min par le pont · env. 12–18 €"], ["À pied", "Non réaliste : rive asiatique"]],
    monuments: [
      ["+++", "Traversée en ferry", "Vingt minutes sur la mer de Marmara, avec la vieille ville, la tour de Léandre et la gare de Haydarpaşa en toile de fond. Prenez un çay et un simit à bord.", "env. 0,75 € avec l’Istanbulkart", "20–25 min", "8 min vers le marché"],
      ["++", "Marché de Kadıköy", "Ruelles de poissonniers, primeurs, fromagers, épiciers et traiteurs de mezzés autour de Güneşlibahçe Sokak.", "gratuit", "45–75 min", "5 min vers Surp Takavor"],
      ["+", "Église arménienne Surp Takavor", "Église arménienne du XIXe siècle, discrète au milieu du quartier commerçant.", "gratuit", "15 min", "15 min vers Moda"],
      ["++", "Moda et son front de mer", "Quartier résidentiel aux maisons anciennes, avec une longue promenade et des cafés face aux îles des Princes et au coucher du soleil.", "gratuit", "45–75 min", null],
      ["++", "Gare de Haydarpaşa — extérieur", "Gare néo-allemande de 1909 posée sur l’eau, ancienne porte de l’Anatolie et du Bagdadbahn.", "extérieur gratuit", "15–20 min", null]
    ]
  },
  {
    id: "uskudar", name: "Üsküdar", subtitle: "Mosquées de Sinan et coucher de soleil", coords: [41.0262, 29.0150],
    intro: "Un quartier conservateur et paisible, à visiter en fin d’après-midi pour la vue sur la péninsule historique au coucher du soleil.",
    routes: [["Marmaray", "Yenikapı ou Sirkeci → Üsküdar · 15–25 min · env. 0,75 €"], ["Ferry", "Eminönü → Üsküdar · 15 min · env. 0,75 €"], ["Uber", "25–40 min · env. 10–15 €"], ["À pied", "Non réaliste : rive asiatique"]],
    monuments: [
      ["++", "Mosquée Mihrimah Sultan", "Construite par Mimar Sinan pour la fille de Soliman vers 1548, face à l’embarcadère.", "gratuit", "20–30 min", "7 min vers Şemsi Paşa"],
      ["++", "Mosquée Şemsi Paşa", "Petite mosquée de Sinan de 1580 au ras de l’eau, l’une des plus délicates de la ville.", "gratuit", "15–20 min", "20 min vers Salacak"],
      ["+++", "Promenade de Salacak & tour de Léandre", "Le quai le plus photographié au coucher du soleil, face à la tour sur son îlot et à la silhouette de Sainte-Sophie et Topkapı.", "vue gratuite · visite de la tour 27 € + bateau 110 TL depuis Salacak ou Karaköy", "45 min–1 h 30", null]
    ]
  }
];

// À savoir (fermetures, usages) et où manger, par quartier.
const extras = {
  sultanahmet: {
    tips: ["Sainte-Sophie et la Mosquée Bleue ferment aux visiteurs pendant les prières, surtout le vendredi midi.", "Épaules et genoux couverts, foulard pour les femmes (prêté à l’entrée), chaussures retirées.", "Museum Pass non valable à Sainte-Sophie ni à la Citerne : arrivez à l’ouverture pour éviter la file."],
    food: [["Tarihi Sultanahmet Köftecisi", "Köfte grillées et salade de haricots piyaz, institution depuis 1920", "10–18 €"], ["Hafız Mustafa 1864", "Lokum, baklava et sütlaç (riz au lait)", "4–10 €"]]
  },
  topkapi: {
    tips: ["Topkapı est fermé le mardi. Arrivez à 9h et commencez par le Harem, le plus fréquenté.", "Audioguide inclus dans le billet : prévoyez des écouteurs filaires.", "Le Trésor et les Reliques sacrées exigent une tenue respectueuse ; pas de photo aux Reliques."],
    food: [["Hocapaşa Pidecisi", "Pide (pain plat garni) cuit au feu de bois, derrière Sirkeci", "6–12 €"], ["Cantines de Sirkeci", "Plats du jour turcs (lokanta) autour de la gare", "6–12 €"]]
  },
  eminonu: {
    tips: ["Le Bazar aux épices est bondé après 11h : venez tôt.", "Goûtez avant d’acheter, comparez les prix et demandez le poids exact.", "Rüstem Paşa : entrée par l’escalier discret de la rue marchande."],
    food: [["Balık ekmek des quais", "Sandwich au maquereau grillé, oignon et citron, face au pont de Galata", "4–8 €"], ["Hamdi", "Kebabs du sud-est avec vue sur la Corne d’Or", "25–45 €"], ["Kurukahveci Mehmet Efendi", "Le café turc moulu depuis 1871, à emporter", "3–8 €"], ["Pandeli", "Cuisine ottomane dans une salle de faïences au-dessus du bazar", "25–45 €"]]
  },
  beyazit: {
    tips: ["Le Grand Bazar est fermé le dimanche et les jours fériés religieux.", "Le marchandage est attendu : commencez à 50–60 % du prix annoncé, restez courtois.", "Refusez poliment les invitations insistantes à « juste regarder » une boutique de tapis."],
    food: [["Havuzlu", "Lokanta dans le bazar : plats mijotés du jour", "12–25 €"], ["Şeyhmuz Kebap Salonu", "Kebab à la viande hachée au couteau, depuis 1975, dans un passage près du bazar", "10–20 €"], ["Şark Kahvesi", "Café turc traditionnel sous les voûtes", "3–6 €"]]
  },
  suleymaniye: {
    tips: ["À deux pas de l’hôtel : idéal en début de matinée ou au coucher du soleil depuis la terrasse de la mosquée.", "Le tombeau de Soliman et celui de Sinan se visitent librement dans l’enclos."],
    food: [["Erzincanlı Ali Baba", "Kuru fasulye (haricots blancs mijotés) et pilaf, face à la mosquée depuis 1924", "6–12 €"], ["Vefa Bozacısı", "Boza, boisson de millet fermenté, en saison froide", "2–4 €"]]
  },
  "fener-balat": {
    tips: ["Chora (Kariye) : 20 €, fermée aux visiteurs le vendredi, visite hors heures de prière.", "Rues très pentues et pavées : chaussures confortables.", "Le Patriarcat est un lieu de culte actif : tenue sobre et silence."],
    food: [["Balat Sahil", "Mezzés et poissons frais au bord de la Corne d’Or", "25–45 €"], ["Cumbalı Kahve", "Café turc dans une maison colorée de Balat", "3–8 €"]]
  },
  galata: {
    tips: ["Tour de Galata ouverte tous les jours 8h30–23h ; file d’ascenseur longue au coucher du soleil.", "Le Mevlevihanesi propose des cérémonies de derviches certains soirs : vérifiez sur place."],
    food: [["Karaköy Güllüoğlu", "La référence du baklava à la pistache depuis 1949", "5–12 €"], ["Karaköy Lokantası", "Mezzés, poissons et plats du jour dans une salle de faïences turquoise", "20–40 €"]]
  },
  beyoglu: {
    tips: ["İstiklal est très fréquentée le soir et le week-end : surveillez sacs et téléphones.", "Le Musée de Pera est gratuit le vendredi de 18h à 22h, et l’était aussi le 29 octobre 2025 : à vérifier pour 2026."],
    food: [["Hacı Abdullah", "Plats ottomans mijotés et compotes maison depuis 1888", "20–40 €"], ["Çiçek Pasajı", "Meyhanes : mezzés et rakı dans un passage du XIXe siècle", "25–45 €"]]
  },
  besiktas: {
    tips: ["Dolmabahçe est fermé le lundi ; guichet fermé vers 16h. Billet officiel sur millisaraylar.gov.tr.", "Photos intérieures autorisées depuis janvier 2026."],
    food: [["Rue du petit-déjeuner (Kahvaltıcılar Sokağı)", "Kahvaltı complet et menemen (œufs, tomates, poivrons)", "8–15 €"], ["Marché aux poissons de Beşiktaş", "Poisson grillé choisi à l’étal", "15–30 €"]]
  },
  ortakoy: {
    tips: ["Le meilleur moment : fin d’après-midi, pour la mosquée éclairée devant le pont du Bosphore.", "Le week-end, le marché artisanal est plein : venez en semaine pour flâner."],
    food: [["Kumpir d’Ortaköy", "Pomme de terre géante garnie à volonté", "6–12 €"], ["Waffle d’Ortaköy", "Gaufre couverte de fruits et chocolat, la spécialité de la place", "5–8 €"]]
  },
  kadikoy: {
    tips: ["Prenez le ferry au départ d’Eminönü au coucher du soleil pour la plus belle vue.", "Le marché est à son meilleur le matin et en fin d’après-midi."],
    food: [["Çiya Sofrası", "Cuisine régionale d’Anatolie, plats rarement servis ailleurs", "15–25 €"], ["Yanyalı Fehmi", "Lokanta historique de plats mijotés", "12–22 €"], ["Midye dolma du marché", "Moules farcies au riz épicé, à l’unité", "0,50–1 € pièce"]]
  },
  uskudar: {
    tips: ["Quartier conservateur : tenue couvrante, alcool rare dans les restaurants.", "Le soleil se couche vers 18 h pendant le séjour : soyez à Salacak vers 17 h 30. Dernier bateau retour de la tour de Léandre à 17 h 45."],
    food: [["Kanaat Lokantası", "Lokanta familiale de 1933 : plats du jour et desserts au lait", "12–25 €"], ["Çay au bord de l’eau", "Thé et simit sur les marches de Salacak", "1–3 €"]]
  },
  eyup: {
    tips: ["Lieu saint très fréquenté le vendredi et pendant les fêtes : visitez plutôt en semaine.", "Restez discret près de la tombe : pas de photos des fidèles."],
    food: [["Café Pierre Loti", "Thé ou café turc face à la Corne d’Or", "2–6 €"], ["Lokantas de la place Eyüp Sultan", "Kebabs et plats simples", "8–15 €"]]
  },
  bebek: {
    tips: ["Réservez le restaurant de poisson le week-end.", "Combinez avec Ortaköy en continuant vers le nord en bus ou en taxi."],
    food: [["Cafés de Bebek", "Café et pâtisserie face à la baie", "5–12 €"]]
  }
};

// Les bonnes adresses à pied du Mövenpick Old Town.
const NEAR_HOTEL = [
  ["Siirt Şeref Büryan 1892", "Agneau büryan rôti 6 à 8 h dans un four creusé, et perde pilavı (riz en croûte). Le meilleur repas typique du quartier, à midi.", "12–22 €", "8 min à pied · Kadınlar Pazarı"],
  ["Baran Et Mangal", "Grillades et kebabs commandés au kilo, très bonne viande", "15–30 €", "8 min à pied · Kadınlar Pazarı"],
  ["Erzincanlı Ali Baba", "Kuru fasulye (haricots mijotés) et pilaf face à Süleymaniye, depuis 1924", "6–12 €", "12 min à pied · Süleymaniye"],
  ["Karadeniz Pide Kebab Salonu", "Pide et güveç de la mer Noire, adresse de quartier", "8–15 €", "7 min à pied · Vefa"],
  ["Vefa Bozacısı", "Boza (millet fermenté) dans une boutique de 1876, saison froide", "2–4 €", "8 min à pied · Vefa"],
  ["Zeyrekhane", "Cuisine ottomane en terrasse sous le Pantocrator, vue sur la Corne d’Or. Fermé le lundi, réservation conseillée", "20–40 €", "6 min à pied · Zeyrek"],
  ["Akdeniz Hatay Sofrası", "Cuisine d’Antakya : agneau et poulet en croûte de sel, mezzés épicés. Pour un dîner généreux", "20–35 €", "15 min à pied ou 5 min en taxi · Fatih"]
];

// Présentation de chaque quartier, affichée avant les lieux à voir.
const DESCRIPTIONS = {
  sultanahmet: "Sultanahmet occupe la pointe de la péninsule historique, là où les Grecs fondèrent Byzance au VIIe siècle av. J.-C. Constantin en fit en 330 la capitale de l’Empire romain d’Orient, et pendant mille ans le cœur du pouvoir byzantin battit ici, entre le Grand Palais, l’Hippodrome et Sainte-Sophie. Après la conquête de 1453, les Ottomans y superposèrent leur propre empire : la Mosquée Bleue répond à Sainte-Sophie de l’autre côté d’un même jardin. Sous les pavés dorment des citernes, des mosaïques et les fondations du palais impérial, dont on aperçoit des fragments au musée des Mosaïques. Le quartier est le plus visité d’Istanbul et les rabatteurs y sont nombreux, mais tôt le matin, quand les cars ne sont pas encore arrivés, on mesure l’échelle de ces monuments presque seul. Comptez une matinée complète et revenez le soir : les coupoles éclairées au-dessus des jardins sont l’une des plus belles images de la ville.",
  topkapi: "Sur la colline qui domine la rencontre de la Corne d’Or, du Bosphore et de la mer de Marmara, Mehmet II fit construire dès 1459 le palais d’où les sultans gouvernèrent pendant près de quatre siècles. Topkapı n’est pas un bâtiment unique mais une succession de cours, de pavillons et de jardins, de plus en plus privés à mesure qu’on avance, jusqu’au Harem et aux terrasses sur le Bosphore. On y voit le Trésor, les cuisines impériales et la salle des Reliques sacrées, l’une des plus vénérées du monde musulman. Dans la première cour, Sainte-Irène rappelle que la colline était déjà sacrée à l’époque byzantine. En contrebas, les Musées archéologiques réunissent des trésors de tout l’empire, et le parc de Gülhane, ancien jardin du palais, descend vers les quais. Prévoyez une demi-journée, et venez à l’ouverture pour profiter du Harem avant la foule.",
  eminonu: "Eminönü est le port historique de la vieille ville, au débouché du pont de Galata. Depuis des siècles, les marchandises de tout l’empire arrivaient ici, et le quartier en garde une énergie commerçante unique : ferries qui partent toutes les dix minutes, vendeurs de simit et de maïs grillé, pêcheurs alignés sur le pont. Le Bazar aux épices, construit au XVIIe siècle avec la Nouvelle Mosquée, vend toujours épices, fruits secs, lokum et café. Dans les rues en pente de Tahtakale, derrière, on trouve tout ce qu’une maison turque peut contenir, des ustensiles de cuisine aux tissus. La petite mosquée Rüstem Paşa, cachée au-dessus des boutiques, abrite certains des plus beaux carreaux d’Iznik de la ville. Un peu plus loin, la gare de Sirkeci fut le terminus de l’Orient-Express. Venez le matin pour les marchés, et revenez au coucher du soleil manger un sandwich au poisson face à la Corne d’Or.",
  beyazit: "Beyazıt est le cœur marchand et intellectuel de la vieille ville. Le Grand Bazar, fondé juste après 1453, est un labyrinthe de plus de soixante rues couvertes et de milliers de boutiques : bijoutiers, tapis, cuir, lampes, céramiques. Autour de lui s’étend un réseau de hans, ces anciens caravansérails à cour où artisans et grossistes travaillent encore. La place Beyazıt, sur l’emplacement de l’ancien forum de Théodose, ouvre sur la grande porte de l’Université d’Istanbul et sur l’une des premières mosquées impériales ottomanes. Juste à côté, le marché des bouquinistes perpétue une tradition vieille de plusieurs siècles. La mosquée Nuruosmaniye marque l’entrée du bazar et l’apparition du baroque ottoman. Le quartier est animé, parfois oppressant aux heures de pointe : allez-y en matinée, prenez le temps de vous perdre, et n’hésitez pas à négocier. Le bazar est fermé le dimanche.",
  suleymaniye: "Süleymaniye est le quartier de l’hôtel et l’un des plus beaux de la ville. Il couronne la troisième colline d’Istanbul autour de la mosquée que Mimar Sinan, le plus grand architecte ottoman, construisit pour Soliman le Magnifique entre 1550 et 1557. Autour d’elle s’étendait toute une cité : écoles, hôpital, cuisines pour les pauvres, bains et bibliothèque, dont beaucoup subsistent. Les rues alentour gardent des maisons ottomanes en bois, des ateliers et des cafés où se retrouvent les étudiants. Vers l’ouest, Vefa est connu pour sa boza et ses petites mosquées, et l’aqueduc de Valens, du IVe siècle, enjambe encore le boulevard. Zeyrek, tout proche, conserve l’ancien monastère byzantin du Pantocrator, l’un des plus importants de Constantinople. Moins touristique que Sultanahmet, le quartier se parcourt facilement à pied depuis l’hôtel, de préférence en fin de journée, quand la lumière tombe sur la Corne d’Or.",
  "fener-balat": "Fener et Balat s’étirent le long de la Corne d’Or, au nord-ouest de la vieille ville. Pendant des siècles, ces quartiers furent ceux des minorités : Fener, celui des grandes familles grecques orthodoxes autour du Patriarcat œcuménique, qui y siège toujours ; Balat, celui des communautés juives, arméniennes et grecques. Les rues pentues sont bordées de maisons de couleur, d’escaliers, d’églises, de synagogues et d’écoles, comme l’imposant lycée grec de brique rouge qui domine Fener. On y trouve aussi Sainte-Marie-des-Mongols, seule église byzantine jamais transformée en mosquée, et l’église bulgare Saint-Étienne, entièrement en fonte. Un peu plus haut, l’ancienne église de Chora abrite les plus belles mosaïques byzantines d’Istanbul. Le quartier est devenu à la mode, avec ses cafés et ses photographes, mais il reste très vivant et populaire. C’est le quartier idéal pour qui aime les églises : prévoyez de bonnes chaussures et une demi-journée.",
  galata: "Sur l’autre rive de la Corne d’Or, Galata fut à partir du XIIIe siècle une colonie génoise fortifiée, presque une ville indépendante face à Constantinople. La tour de Galata, élevée en 1348, en est le dernier grand vestige et offre le plus beau panorama de la ville. Au XIXe siècle, le quartier devint celui de la finance et du commerce international : banques, sièges de compagnies maritimes et immeubles de pierre bordent encore la rue Voyvoda. Les escaliers Camondo, offerts par une famille de banquiers juifs, relient le haut et le bas du quartier. En contrebas, Karaköy, ancien port de marchandises, s’est transformé en quartier de cafés, de galeries et de restaurants, prolongé par le port de croisière de Galataport et le musée Istanbul Modern. On y trouve aussi des églises latines discrètes et un couvent de derviches tourneurs. Montez à la tour tôt le matin, puis descendez à pied vers les quais.",
  beyoglu: "Beyoğlu, l’ancienne Péra, est l’Istanbul européenne du XIXe siècle. C’est là que s’installèrent les ambassades, les marchands levantins, les hôtels de voyageurs et les grandes églises catholiques, arméniennes et grecques. L’avenue İstiklal, piétonne et parcourue par un petit tramway rouge, en est la colonne vertébrale : on y passe devant des passages couverts, des consulats, des cinémas anciens et l’église Saint-Antoine. Les rues latérales cachent des meyhanes, ces tavernes où l’on partage mezzés et rakı, et le marché aux poissons de Balık Pazarı. Le Musée de Pera, installé dans un ancien hôtel, conserve de belles peintures orientalistes. Au nord, la place Taksim marque l’entrée de l’Istanbul moderne, avec la cathédrale catholique du Saint-Esprit un peu au-delà. Le quartier est très animé le soir et le week-end, parfois bondé : surveillez vos affaires, et descendez ensuite vers Galata à pied.",
  besiktas: "Beşiktaş longe le Bosphore au nord de Karaköy. Au XIXe siècle, les sultans quittèrent Topkapı, jugé démodé, pour s’installer ici, au bord de l’eau, dans des palais inspirés de l’Europe. Le palais de Dolmabahçe, achevé en 1856, en est le symbole : façades de marbre, escalier de cristal et le plus grand lustre du monde, offert par la reine Victoria selon la tradition. Atatürk y mourut en 1938, et toutes les horloges du palais sont arrêtées sur 9 h 05. Plus haut, le palais et le parc de Yıldız furent le centre du pouvoir à la fin de l’empire. Le centre de Beşiktaş est un quartier étudiant et populaire, avec son marché aux poissons, sa rue des petits-déjeuners et ses bars. Le Musée naval présente les caïques impériaux. Prévoyez une demi-journée pour Dolmabahçe, en évitant le lundi, jour de fermeture.",
  ortakoy: "Ortaköy est un ancien village du Bosphore où vivaient côte à côte musulmans, Grecs, Arméniens et Juifs, ce dont témoignent encore une mosquée, des églises et une synagogue à quelques rues d’écart. Sa mosquée néobaroque, posée au bord de l’eau au pied du premier pont du Bosphore, est l’une des images les plus célèbres d’Istanbul. Autour de la petite place, les étals d’artisans, les vendeurs de kumpir et de gaufres et les cafés donnent au quartier une ambiance de fête, surtout le week-end. En longeant le Bosphore, on passe devant le palais de Çırağan, devenu hôtel de luxe. Au-dessus, le parc de Yıldız offre une respiration verte. Ortaköy se découvre idéalement en fin d’après-midi, quand la lumière dorée éclaire la mosquée et que le pont s’illumine à la tombée de la nuit.",
  kadikoy: "Kadıköy, sur la rive asiatique, est l’antique Chalcédoine, fondée avant même Byzance. C’est aujourd’hui le quartier le plus vivant de ce côté du Bosphore, et celui où l’on mesure le mieux l’Istanbul du quotidien. On y arrive en ferry, et la traversée de vingt minutes, avec la vieille ville qui s’éloigne, fait partie de la visite. Le marché, autour de quelques rues piétonnes, réunit poissonniers, fromagers, épiciers, traiteurs de mezzés et pâtisseries. Les rues voisines regorgent de librairies, de disquaires, de cafés et de bars fréquentés par les étudiants et les artistes. Plus au sud, Moda est un quartier résidentiel tranquille, avec ses maisons anciennes et une longue promenade face à la mer de Marmara et aux îles des Princes. Peu de grands monuments ici, mais une atmosphère détendue et une excellente cuisine. C’est le quartier idéal pour une demi-journée plus légère.",
  uskudar: "Üsküdar, face à la vieille ville sur la rive asiatique, est l’un des plus anciens quartiers d’Istanbul. Point de départ des caravanes vers l’Anatolie et La Mecque, il a gardé un caractère plus traditionnel et plus pieux que la rive européenne. Mimar Sinan y a laissé plusieurs mosquées, dont celle de Mihrimah Sultan, face à l’embarcadère, et la petite mosquée Şemsi Paşa, posée au ras de l’eau. On y vient surtout pour la promenade de Salacak : en face, la tour de Léandre se dresse sur son îlot, et derrière elle se découpe toute la silhouette de la péninsule historique, Sainte-Sophie, la Mosquée Bleue et Topkapı. Au coucher du soleil, les habitants s’installent sur les marches avec un thé et un simit. Le quartier est calme et conservateur : tenue couvrante dans les mosquées, et peu d’alcool dans les restaurants. Venez en ferry depuis Eminönü en fin d’après-midi.",
  eyup: "Eyüp se trouve au fond de la Corne d’Or, hors des anciennes murailles. C’est le lieu le plus sacré d’Istanbul pour les musulmans : la mosquée y abrite la tombe d’Abu Ayyub al-Ansari, compagnon du Prophète, mort lors du siège arabe de Constantinople au VIIe siècle. Après la conquête, les sultans venaient y ceindre l’épée d’Osman lors de leur avènement. Autour de la mosquée s’étend un vaste cimetière ottoman aux stèles sculptées de turbans et de fleurs, qui grimpe la colline. Au sommet, le café Pierre Loti, nommé d’après l’écrivain français qui aimait y écrire, offre une vue plongeante sur toute la Corne d’Or ; un téléphérique y monte. Le quartier est un lieu de pèlerinage très fréquenté, surtout le vendredi et pendant les fêtes : tenue respectueuse, discrétion près de la tombe. En chemin depuis Balat, ne manquez pas l’église de la source sacrée des Blachernes.",
  bebek: "Arnavutköy et Bebek sont deux anciens villages du Bosphore, au nord d’Ortaköy, reliés par une promenade au ras de l’eau. Arnavutköy fut longtemps un village grec : ses ruelles pentues sont bordées de maisons ottomanes en bois aux façades colorées, et l’église des Taxiarques, avec sa source sacrée, rappelle ce passé. Le long de l’eau s’alignent des restaurants de poisson et de mezzés réputés. Bebek, un peu plus au nord, est l’un des quartiers les plus élégants d’Istanbul, autour d’une petite baie où mouillent les bateaux, avec son parc, ses cafés et la mosquée de Bebek. Plus loin se dresse la forteresse de Rumeli Hisarı, construite en 1452 pour préparer la conquête de Constantinople. On ne vient pas ici pour les musées, mais pour la lumière sur le Bosphore, une longue marche et un déjeuner face à l’eau. C’est la sortie idéale pour finir le séjour en douceur."
};

// Jardins, cafés et centres d'intérêt hors culture, par quartier.
const LEISURE = {
  sultanahmet: { green: ["Jardin de Sultanahmet : bancs et fontaine entre Sainte-Sophie et la Mosquée Bleue, magique le soir", "Terrasses des toits de l’Arasta Bazaar, avec vue sur la mer de Marmara"], more: ["Hammam : Cağaloğlu Hamamı (1741), l’un des plus célèbres de la ville, env. 95 €", "Shopping : céramiques et tapis de l’Arasta Bazaar, plus calme que le Grand Bazar"] },
  topkapi: { green: ["Parc de Gülhane : grands platanes, roseraie et çay bahçesi au bout du parc, face au Bosphore", "Quatrième cour de Topkapı : terrasse avec vue sur la rencontre des deux mers"], more: ["Promenade de Sarayburnu, au pied du palais, au bord de l’eau"] },
  eminonu: { green: ["Pont de Galata : promenade avec pêcheurs, restaurants de poisson sous le tablier", "Quais d’Eminönü au coucher du soleil, avec les mouettes et les ferries"], more: ["Croisière publique sur le Bosphore (Şehir Hatları) depuis Eminönü, bien moins chère que les bateaux touristiques", "Shopping populaire dans les rues de Tahtakale : ustensiles, tissus, cuivres"] },
  beyazit: { green: ["Cour de la médersa Çorlulu Ali Paşa : thé et narguilé sous les arbres", "Place Beyazıt et cour de la mosquée, entre les étudiants et les pigeons"], more: ["Shopping : bijoux, cuir, lampes et tapis au Grand Bazar ; textiles et articles de maison au marché Mahmutpaşa", "Université d’Istanbul : la grande porte et le campus historique"] },
  suleymaniye: { green: ["Terrasse de la mosquée Süleymaniye : la plus belle vue gratuite sur la Corne d’Or", "Parc de Saraçhane, au pied de l’aqueduc de Valens"], more: ["Hammams : Zeyrek Çinili (6 min, haut de gamme, env. 125 €), Süleymaniye (couples et familles, env. 90 €), Acemoğlu (mixte, dès 25 €)", "Marché Kadınlar Pazarı (« marché des femmes ») : produits du sud-est, miel, fromages et viandes séchées", "Mosquée Fatih et son vaste complexe, très fréquenté le vendredi"] },
  "fener-balat": { green: ["Parc du bord de la Corne d’Or, entre Fener et Balat : pelouses et vue sur l’eau", "Cafés des ruelles colorées de Balat, comme Cumbalı Kahve"], more: ["Hammam local : Mihrimah Sultan Hamamı, à côté de Chora, env. 18 € gommage compris", "Antiquaires et brocantes de Çukurbostan et de la rue Vodina", "Street art et façades photographiées de Kiremit Caddesi"] },
  galata: { green: ["Promenade de Galataport, le long du Bosphore, avec ses bancs et ses cafés", "Cafés de Karaköy autour de la rue Kemankeş"], more: ["Istanbul Modern : art contemporain turc dans un bâtiment signé Renzo Piano", "Hammam Kılıç Ali Paşa (Sinan, XVIe siècle), restauré et haut de gamme", "Boutiques de créateurs et galeries autour de la rue Serdar-ı Ekrem"] },
  beyoglu: { green: ["Parc Gezi, à côté de la place Taksim", "Cafés de Cihangir et de Firuzağa, quartier des artistes, avec vues sur le Bosphore"], more: ["Vie nocturne : meyhanes de Nevizade et bars en terrasse de Beyoğlu", "Shopping sur İstiklal ; boutiques de luxe à Nişantaşı, à 15 min au nord", "Concerts et cinéma : Atlas 1948, salle historique restaurée"] },
  besiktas: { green: ["Parc de Yıldız : grand parc boisé avec pavillons et salons de thé", "Parc Abbasağa et la place de Beşiktaş, très vivante"], more: ["Football : le Beşiktaş JK joue au Tüpraş Stadyumu, au bord du Bosphore ; billets via la carte Passolig", "Quartier étudiant : bars et cafés de Çarşı, le cœur des supporters", "Musée naval : caïques impériaux et histoire maritime"] },
  ortakoy: { green: ["Promenade au bord de l’eau sous le pont du Bosphore", "Parc de Yıldız, juste au-dessus"], more: ["Vie nocturne : clubs du bord du Bosphore à Kuruçeşme, voisins d’Ortaköy", "Marché d’artisans et bijoux de la place, surtout le week-end"] },
  kadikoy: { green: ["Parc de Moda et sa promenade face à la mer de Marmara", "Parc de Fenerbahçe : presqu’île avec phare et grands arbres, idéal pour courir"], more: ["Football : le Fenerbahçe joue au stade Şükrü Saracoğlu, à 15 min à pied ; ambiance réputée", "Street art du quartier Yeldeğirmeni", "Shopping : rue Bahariye et, plus loin, Bağdat Caddesi, la grande avenue commerçante de la rive asiatique", "Bars et disquaires de la rue Kadife (« rue des bars »)"] },
  uskudar: { green: ["Bois de Fethi Paşa : parc en terrasses avec cafés et vue sur le Bosphore", "Colline de Çamlıca : panorama sur toute la ville et la plus grande mosquée de Turquie (2019)"], more: ["Kuzguncuk, village voisin aux maisons de bois, cafés et potagers urbains", "Promenade de Salacak au coucher du soleil"] },
  eyup: { green: ["Café et colline Pierre Loti, avec la plus belle vue sur la Corne d’Or", "Parcs du bord de la Corne d’Or, vers Feshane"], more: ["Musée Rahmi M. Koç, de l’autre côté de la Corne d’Or : trains, avions, voitures et sous-marin, idéal hors culture", "Miniatürk, parc des monuments de Turquie en miniature, à Sütlüce"] },
  bebek: { green: ["Parc de Bebek, au bord de la baie", "Parc d’Emirgan, plus au nord : grands jardins et pavillons ottomans"], more: ["Course à pied ou vélo le long du Bosphore, d’Arnavutköy à Rumeli Hisarı", "Forteresse de Rumeli Hisarı (1452), sur la colline au nord de Bebek", "Campus de l’université du Bosphore, l’un des plus beaux de la ville"] }
};

// Version courte et visuelle de chaque quartier (photos libres de Wikimedia Commons).
const FLASH = {
  sultanahmet: { photo: "Hagia_Sophia_(Aya_Sofya)_front_facade,_Istanbul,_Turkey_(9606808746).jpg", line: "Le cœur de Byzance : mille ans d’empire en quelques centaines de mètres.", top: ["Sainte-Sophie", "Citerne-Basilique", "Mosquée Bleue"], tip: "Viens dès l’ouverture, avant les groupes." },
  topkapi: { photo: "Topkapi_Palace_(Topkapı_Sarayı),_Istanbul,_Turkey_(9603571659).jpg", line: "Le palais des sultans, leurs trésors et leur harem.", top: ["Le Harem", "Le Trésor", "La terrasse sur le Bosphore"], tip: "Fermé le mardi. Commence par le Harem." },
  eminonu: { photo: "Istanbul_spice_bazaar_02.jpg", line: "Le port, les épices et le sandwich au poisson face à la Corne d’Or.", top: ["Bazar aux épices", "Mosquée Rüstem Paşa", "Balık ekmek sur les quais"], tip: "Le bazar est bondé après 11 h." },
  beyazit: { photo: "Istanbul_asv2021-11_img41_Grand_Bazaar.jpg", line: "Des milliers de boutiques sous des voûtes : ici, on négocie.", top: ["Grand Bazar", "Thé dans la cour Çorlulu Ali Paşa", "Marché des bouquinistes"], tip: "Fermé le dimanche. Commence à 50–60 % du prix." },
  suleymaniye: { photo: "Süleymaniye_Mosque,_İstanbul_(12965958983).jpg", line: "Le quartier de l’hôtel : la plus belle mosquée de Sinan et la meilleure vue gratuite.", top: ["Mosquée Süleymaniye et sa terrasse", "Zeyrek, l’ancien Pantocrator", "Büryan à Kadınlar Pazarı"], tip: "À 12 min à pied : parfait au coucher du soleil." },
  "fener-balat": { photo: "Balat_houses.jpg", line: "Maisons colorées, églises et les plus belles mosaïques byzantines.", top: ["Chora", "Sainte-Marie-des-Mongols", "Les ruelles de Balat"], tip: "Chora est fermée aux visiteurs le vendredi." },
  galata: { photo: "Galata_Tower_of_Istanbul.jpg", line: "La tour génoise, les escaliers et les cafés de Karaköy.", top: ["Tour de Galata", "Escaliers Camondo", "Baklava chez Güllüoğlu"], tip: "Monte à la tour tôt : file longue au coucher du soleil." },
  beyoglu: { photo: "Istanbul_İstiklâl_Caddesi_old_tram_2022-05.jpg", line: "L’avenue qui ne dort jamais.", top: ["İstiklal et son tram rouge", "Cathédrale du Saint-Esprit", "Mezzés à Nevizade"], tip: "Le soir, sac fermé devant toi." },
  besiktas: { photo: "Dolmabahçe_Palace,_Istanbul_cropped.jpg", line: "Le Versailles du Bosphore et le quartier des supporters.", top: ["Palais de Dolmabahçe", "Kahvaltı rue du petit-déjeuner", "Ambiance de Çarşı"], tip: "Dolmabahçe est fermé le lundi." },
  ortakoy: { photo: "Ortaköy_Mosque_and_Bosphorus_Bridge,_Istanbul_2008.jpg", line: "La photo la plus célèbre d’Istanbul.", top: ["La mosquée sous le pont", "Un kumpir sur la place", "Le pont illuminé à la nuit"], tip: "Viens en fin d’après-midi." },
  kadikoy: { photo: "Kadikoy_Pier_Library.IMG_1698.jpg", line: "L’Istanbul des jeunes, côté Asie.", top: ["La traversée en ferry", "Le marché", "Les bars de la rue Kadife"], tip: "Samedi 31 : Fenerbahçe joue à domicile." },
  uskudar: { photo: "Istanbul_asv2020-02_img53_Maiden's_Tower.jpg", line: "Le plus beau coucher de soleil de la ville.", top: ["Salacak et la tour de Léandre", "Mosquée Şemsi Paşa", "Un çay sur les marches"], tip: "Soleil couchant vers 18 h : sois là à 17 h 30." },
  eyup: { photo: "20110711_Pierre_Loti_hill_view_Istanbul_Turkey_Panorama.jpg", line: "Le lieu saint et la vue de Pierre Loti sur la Corne d’Or.", top: ["Mosquée Eyüp Sultan", "Le téléphérique", "Un thé au café Pierre Loti"], tip: "Tenue couvrante, surtout le vendredi." },
  bebek: { photo: "Bebek_Istanbul.jpg", line: "Une balade au bord de l’eau pour finir en douceur.", top: ["Promenade Arnavutköy–Bebek", "Les maisons en bois", "Poisson face au Bosphore"], tip: "Réserve le restaurant le week-end." }
};
const photoUrl = (f, w = 900) => `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(f)}?width=${w}`;
const photoPage = f => `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(f)}`;



// Quartiers qui se font ensemble dans la même sortie (affichés en cercles clairs sur les cartes).
const GROUPS = [
  { ids: ["sultanahmet", "topkapi"], label: "Sultanahmet + Topkapı : une journée à pied", color: "#b2452c" },
  { ids: ["eminonu", "beyazit", "suleymaniye"], label: "Bazars et Süleymaniye : une journée à pied depuis l’hôtel", color: "#d0763f" },
  { ids: ["fener-balat", "eyup"], label: "Fener, Balat et Eyüp : une demi-journée le long de la Corne d’Or", color: "#2f6f9f" },
  { ids: ["galata", "beyoglu"], label: "Galata et Beyoğlu : un après-midi et une soirée", color: "#7b4fa0" },
  { ids: ["besiktas", "ortakoy", "bebek"], label: "Le Bosphore : Dolmabahçe, Ortaköy puis Bebek", color: "#1f7a72" },
  { ids: ["kadikoy", "uskudar"], label: "Côté Asie : Kadıköy puis coucher de soleil à Üsküdar", color: "#c07a12" }
];

// Trace un cercle clair autour de chaque groupe de quartiers.
function drawGroups(map, L) {
  const R = 6371000, rad = x => x * Math.PI / 180;
  const dist = (a, b) => 2 * R * Math.asin(Math.sqrt(Math.sin(rad(b[0] - a[0]) / 2) ** 2 + Math.cos(rad(a[0])) * Math.cos(rad(b[0])) * Math.sin(rad(b[1] - a[1]) / 2) ** 2));
  GROUPS.forEach(g => {
    const pts = g.ids.map(id => districts.find(d => d.id === id).coords);
    const c = [pts.reduce((s, p) => s + p[0], 0) / pts.length, pts.reduce((s, p) => s + p[1], 0) / pts.length];
    const r = Math.max(...pts.map(p => dist(c, p))) + 550;
    L.circle(c, { radius: r, color: g.color, weight: 2, dashArray: "6 6", fillColor: g.color, fillOpacity: 0.12, interactive: true })
      .addTo(map).bindTooltip(g.label, { sticky: true });
  });
}


// Pour chaque quartier : les adresses branchées et les spots à ne pas manquer.
const HOTSPOTS = {
 "sultanahmet": {
  "go": [
   "Seven Hills Restaurant : terrasse sur le toit face à Sainte-Sophie et à la Mosquée Bleue, au petit-déjeuner",
   "Hafız Mustafa 1864 : la vitrine de lokum et baklava la plus photographiée"
  ],
  "see": [
   "La place Sultanahmet au lever du soleil, avant 9 h",
   "La cour de la Mosquée Bleue à l’ouverture",
   "Les têtes de Méduse de la Citerne, en début de visite"
  ]
 },
 "topkapi": {
  "go": [
   "Le çay bahçesi au bout du parc de Gülhane, face au Bosphore"
  ],
  "see": [
   "La terrasse de la 4e cour de Topkapı, sur la rencontre des deux mers",
   "Le Harem dès l’ouverture, avant la foule"
  ]
 },
 "eminonu": {
  "go": [
   "Hamdi : kebab en terrasse avec la Corne d’Or en fond",
   "Pandeli : la salle de faïences turquoise au-dessus du bazar"
  ],
  "see": [
   "Les voûtes du Bazar aux épices, en semaine le matin",
   "Le pont de Galata au coucher du soleil, avec les pêcheurs"
  ]
 },
 "beyazit": {
  "go": [
   "Le thé sous les arbres de la cour Çorlulu Ali Paşa",
   "Şeyhmuz Kebap, l’adresse des habitués du bazar"
  ],
  "see": [
   "Les boutiques de lampes du Grand Bazar",
   "La grande porte de l’Université d’Istanbul"
  ]
 },
 "suleymaniye": {
  "go": [
   "Zeyrekhane : terrasse sous le Pantocrator, vue sur la Corne d’Or",
   "Siirt Şeref Büryan : le repas que les Stambouliotes font découvrir"
  ],
  "see": [
   "La terrasse de Süleymaniye au lever ou au coucher du soleil",
   "L’aqueduc de Valens vu du parc de Saraçhane"
  ]
 },
 "fener-balat": {
  "go": [
   "Cumbalı Kahve : café dans une maison colorée",
   "Balat Sahil : poisson et mezzés au bord de l’eau"
  ],
  "see": [
   "Les façades de Kiremit Caddesi, tôt le matin",
   "Le lycée grec rouge de Fener vu des ruelles"
  ]
 },
 "eyup": {
  "go": [
   "Le café Pierre Loti, thé face à la Corne d’Or"
  ],
  "see": [
   "La vue de la colline Pierre Loti au coucher du soleil",
   "Le téléphérique au-dessus du cimetière ottoman"
  ]
 },
 "galata": {
  "go": [
   "Karaköy Güllüoğlu : le baklava le plus célèbre de la ville",
   "Karaköy Lokantası : la salle turquoise la plus élégante du quartier",
   "Fil Books : café-librairie aux chaises suspendues"
  ],
  "see": [
   "Les escaliers Camondo",
   "La rue Büyük Hendek avec la tour au bout, tôt le matin",
   "La promenade de Galataport au coucher du soleil"
  ]
 },
 "beyoglu": {
  "go": [
   "Hacı Abdullah : plats ottomans dans une salle de 1888",
   "La Pâtisserie de Pera, au Pera Palace",
   "Les meyhanes de Nevizade, le soir"
  ],
  "see": [
   "Le petit tram rouge sur İstiklal",
   "La verrière du Çiçek Pasajı, le matin",
   "Les escaliers arc-en-ciel entre Cihangir et Fındıklı"
  ]
 },
 "besiktas": {
  "go": [
   "Les bars de Çarşı, le QG des supporters de Beşiktaş",
   "La rue du petit-déjeuner pour un kahvaltı géant",
   "Le marché aux poissons de Beşiktaş, poisson grillé à l’étal"
  ],
  "see": [
   "Les grilles de Dolmabahçe à l’ouverture",
   "Le stade de Beşiktaş au bord du Bosphore"
  ]
 },
 "ortakoy": {
  "go": [
   "Les kumpir et gaufres de la place, face au pont",
   "Les terrasses de thé au bord de l’eau",
   "Les clubs du bord du Bosphore à Kuruçeşme"
  ],
  "see": [
   "La mosquée d’Ortaköy sous le pont illuminé",
   "Un kumpir sur la place, face à l’eau"
  ]
 },
 "bebek": {
  "go": [
   "Les cafés de la baie de Bebek",
   "Un thé ou une glace face à la baie"
  ],
  "see": [
   "Les maisons en bois d’Arnavutköy",
   "La forteresse de Rumeli Hisarı depuis la promenade",
   "Le jardin japonais de Baltalimanı"
  ]
 },
 "kadikoy": {
  "go": [
   "Çiya Sofrası : la cuisine d’Anatolie que les chefs viennent goûter",
   "Les bars de la rue Kadife",
   "Yanyalı Fehmi, Bib Gourmand Michelin 2026"
  ],
  "see": [
   "Le street art de Yeldeğirmeni",
   "Le coucher de soleil depuis le front de mer de Moda",
   "L’ambiance autour du stade de Fenerbahçe"
  ]
 },
 "uskudar": {
  "go": [
   "Kanaat Lokantası : la lokanta familiale de 1933",
   "Le café aux bougainvilliers de Kuzguncuk"
  ],
  "see": [
   "La tour de Léandre et toute la vieille ville au coucher du soleil depuis Salacak",
   "Les maisons pastel de Kuzguncuk"
  ]
 }
};
