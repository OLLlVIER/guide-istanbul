const CHURCH_WORDS = /église|cathédrale|patriarcat|chora|sainte-sophie|sainte-irène|sainte-marie|pammakaristos|zeyrek|kalenderhane|christ church|surp/i;

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
    routes: [["Uber", "15–25 min · env. 5–8 €"], ["Tramway", "20–28 min · T1 vers Gülhane · env. 0,85 €"], ["Métro + marche", "22–30 min · M2 + 18 min à pied · env. 0,85 €"], ["À pied", "35–42 min · 3 km"]],
    monuments: [
      ["+++", "Palais de Topkapı", "Résidence et centre de gouvernement des sultans ottomans du XVe au XIXe siècle. Les cours, le Trésor, le Harem et les vues sur le Bosphore justifient une longue visite.", "2 750 TL · env. 49 € (palais + Harem + Sainte-Irène)", "3–4 h", "4 min vers les Musées archéologiques"],
      ["+++", "Musées archéologiques", "Trois musées réunissant des œuvres de l’Anatolie, de la Mésopotamie, de l’Égypte et du monde gréco-romain, dont le célèbre sarcophage d’Alexandre.", "env. 15 €", "1 h 30–2 h", "5 min vers Gülhane"],
      ["++", "Parc de Gülhane", "Ancien jardin extérieur du palais, ouvert au public en 1912. Ses allées offrent une pause ombragée entre la vieille ville et la Corne d’Or.", "gratuit", "30–50 min", null],
      ["++", "Sainte-Irène", "Église byzantine du VIe siècle, jamais transformée en mosquée. Sa grande croix iconoclaste en mosaïque domine l’abside nue, à l’acoustique remarquable.", "incluse dans le billet Topkapı", "20–30 min", null]
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
      ["+++", "Mosquée Kariye / ancienne Chora", "Célèbre pour ses mosaïques et fresques paléologues du XIVe siècle, l’ancienne église de la Chora offre l’un des ensembles byzantins les plus raffinés d’Istanbul.", "20 € · fermée aux visiteurs le vendredi", "60–90 min", null],
      ["+++", "Sainte-Marie-des-Mongols", "Seule église byzantine de la ville jamais convertie en mosquée, toujours orthodoxe depuis le XIIIe siècle. Souvent fermée : sonnez au portail, de préférence le matin.", "gratuit · offrande bienvenue", "20–30 min", null],
      ["++", "Pammakaristos (musée Fethiye)", "Chapelle funéraire byzantine du XIVe siècle aux mosaïques d’or, voisine du Patriarcat, aujourd’hui petit musée.", "tarif à vérifier sur place", "30–40 min", null]
    ]
  },
  {
    id: "galata", name: "Galata & Karaköy", subtitle: "Génois, banques et création", coords: [41.0257, 28.9741],
    intro: "Commencez par la tour avant l’affluence, puis descendez vers Karaköy à travers escaliers, passages et cafés.",
    routes: [["Uber", "10–20 min · env. 5–8 €"], ["Métro", "M2 Vezneciler → Şişhane · 15–22 min · env. 0,85 €"], ["Tramway", "T1 vers Karaköy · 18–25 min · env. 0,85 €"], ["À pied", "28–35 min via le pont de Galata"]],
    monuments: [
      ["+++", "Tour de Galata", "Élevée par les Génois en 1348, la tour fut tour de guet, prison et observatoire. Son belvédère offre un panorama circulaire sur la vieille ville et le Bosphore.", "30 € · e-billet galatakulesi.gov.tr", "45–75 min", "6 min vers le Mevlevihanesi"],
      ["++", "Galata Mevlevihanesi", "Premier couvent mevlevi d’Istanbul, fondé en 1491. Le musée présente l’histoire des derviches tourneurs, leur musique et leurs objets rituels.", "env. 7 €", "45–60 min", "10 min vers SALT Galata"],
      ["++", "SALT Galata", "Installé dans l’ancienne Banque ottomane, ce centre culturel associe architecture fin XIXe, archives, expositions, bibliothèque et vues sur la ville.", "gratuit", "45–75 min", "7 min vers Kılıç Ali Paşa"],
      ["++", "Mosquée Kılıç Ali Paşa", "Mimar Sinan construisit ce complexe au XVIe siècle pour l’amiral Kılıç Ali Paşa. Son plan fait clairement écho à Sainte-Sophie.", "gratuit", "25–40 min", null],
      ["++", "Église Saint-Pierre-et-Saint-Paul", "Église dominicaine reconstruite par les frères Fossati en 1843, cachée derrière une cour au pied de la tour de Galata.", "gratuit · ouverte surtout le matin", "15–25 min", null]
    ]
  },
  {
    id: "beyoglu", name: "Beyoğlu & Taksim", subtitle: "Passages, ambassades et modernité", coords: [41.0359, 28.9824],
    intro: "Une promenade urbaine à faire de préférence en fin d’après-midi, lorsque l’avenue İstiklal s’anime.",
    routes: [["Uber", "18–30 min · env. 7–11 €"], ["Métro", "M2 Vezneciler → Taksim · 12–18 min · env. 0,85 €"], ["Tramway + funiculaire", "T1 + F1 · 25–35 min · env. 1,70 €"], ["À pied", "45–55 min · montée soutenue"]],
    monuments: [
      ["+++", "Avenue İstiklal & passages", "Grande artère cosmopolite de Pera, bordée d’immeubles des XIXe et XXe siècles, de consulats, de passages, de lieux de culte et du tramway historique.", "gratuit", "1 h 30–3 h", "4 min vers Saint-Antoine"],
      ["++", "Église Saint-Antoine-de-Padoue", "La plus grande église catholique d’Istanbul, reconstruite en style néogothique vénitien au début du XXe siècle.", "gratuit", "20–30 min", "6 min vers le musée de Pera"],
      ["++", "Musée de Pera", "Musée privé installé dans l’ancien Hôtel Bristol, connu pour ses peintures orientalistes, ses collections anatoliennes et ses expositions temporaires.", "450 TL · env. 8 € (gratuit ven. 18h–22h)", "1–1 h 30", "16 min vers Taksim"],
      ["+", "Place Taksim & monument de la République", "Centre symbolique de l’Istanbul moderne, aménagé autour du monument de 1928 commémorant la fondation de la République.", "gratuit", "20–30 min", null],
      ["+++", "Cathédrale du Saint-Esprit", "Cathédrale catholique d’Istanbul, bâtie en 1846 par Giuseppe Fossati. Dans la cour, la statue du pape Benoît XV érigée par les Turcs en 1921.", "gratuit · messes le dimanche", "20–30 min", null],
      ["++", "Église Sainte-Trinité (Aya Triada)", "Grande église grecque orthodoxe néo-baroque de 1880, à deux pas de la place Taksim.", "gratuit", "15–25 min", null],
      ["++", "Église arménienne Üç Horan", "Église arménienne apostolique au cœur du marché de Balık Pazarı, avec un intérieur doré inattendu.", "gratuit", "15–20 min", null],
      ["++", "Christ Church (église anglicane de Crimée)", "Église néogothique de 1868 élevée en mémoire des soldats de la guerre de Crimée, l’une des rares de ce style en Orient.", "gratuit · ouverte aux offices", "15–20 min", null]
    ]
  },
  {
    id: "besiktas", name: "Beşiktaş & Dolmabahçe", subtitle: "Le Bosphore impérial", coords: [41.0392, 29.0005],
    intro: "Palais, collections et front de mer : consacrez au moins une demi-journée à cette portion du Bosphore.",
    routes: [["Uber", "20–35 min · env. 9–14 €"], ["Métro + marche", "M2 vers Taksim puis 22 min à pied · env. 0,85 €"], ["Tramway + marche", "T1 vers Kabataş puis 12 min à pied · env. 0,85 €"], ["Ferry", "Via Eminönü → Beşiktaş · 35–50 min · env. 1–2 €"]],
    monuments: [
      ["+++", "Palais de Dolmabahçe", "Résidence impériale achevée en 1856, elle mêle organisation ottomane et décors baroque, rococo et néoclassique. Atatürk y passa ses derniers jours.", "2 000 TL · env. 36 € (Selamlık + Harem + peinture)", "2 h 30–3 h 30", "12 min vers le Musée naval"],
      ["++", "Musée naval", "L’une des grandes collections maritimes de Turquie : caïques impériaux, maquettes, instruments et objets retraçant l’histoire de la marine ottomane.", "env. 8–12 € · à vérifier", "1–1 h 30", "20 min vers Yıldız"],
      ["+++", "Palais de Yıldız", "Complexe de pavillons et de jardins développé surtout sous Abdülhamid II à la fin du XIXe siècle, lorsqu’il devint le centre du pouvoir impérial.", "tarif à vérifier sur place", "1 h 30–2 h", null]
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
      ["++", "Parc Yıldız", "Ancien domaine impérial transformé en vaste parc paysager, avec bosquets, pavillons et points de vue au-dessus du Bosphore.", "gratuit", "1–1 h 30", null],
      ["+", "Église Hagios Phokas", "Petite église grecque orthodoxe de 1856 dans les ruelles d’Ortaköy, témoin de l’ancien village grec du Bosphore.", "gratuit · ouverture irrégulière", "10–15 min", null]
    ]
  },
  {
    id: "kadikoy", name: "Kadıköy & Moda", subtitle: "La rive asiatique et ses marchés", coords: [40.9905, 29.0255],
    intro: "Peu de grands monuments, mais l’Istanbul du quotidien : marché, cafés, librairies et promenade de Moda. La traversée en ferry fait partie de la visite.",
    routes: [["Ferry", "Marche ou tram jusqu’à Eminönü puis 20–25 min de traversée · env. 0,85 €"], ["Marmaray", "Yenikapı → Ayrılık Çeşmesi puis M4 · 30–40 min · env. 1,70 €"], ["Uber", "30–45 min par le pont · env. 12–18 €"], ["À pied", "Non réaliste : rive asiatique"]],
    monuments: [
      ["+++", "Traversée en ferry", "Vingt minutes sur la mer de Marmara, avec la vieille ville, la tour de Léandre et la gare de Haydarpaşa en toile de fond. Prenez un çay et un simit à bord.", "env. 0,85 € avec l’Istanbulkart", "20–25 min", "8 min vers le marché"],
      ["++", "Marché de Kadıköy", "Ruelles de poissonniers, primeurs, fromagers, épiciers et traiteurs de mezzés autour de Güneşlibahçe Sokak.", "gratuit", "45–75 min", "5 min vers Surp Takavor"],
      ["+", "Église arménienne Surp Takavor", "Église arménienne du XIXe siècle, discrète au milieu du quartier commerçant.", "gratuit", "15 min", "15 min vers Moda"],
      ["+", "Église Sainte-Euphémie (Aya Efimia)", "Église grecque orthodoxe du marché de Kadıköy, sur le site du concile de Chalcédoine de 451.", "gratuit", "15 min", null],
      ["++", "Moda et son front de mer", "Quartier résidentiel aux maisons anciennes, avec une longue promenade et des cafés face aux îles des Princes et au coucher du soleil.", "gratuit", "45–75 min", null],
      ["++", "Gare de Haydarpaşa — extérieur", "Gare néo-allemande de 1909 posée sur l’eau, ancienne porte de l’Anatolie et du Bagdadbahn.", "extérieur gratuit", "15–20 min", null]
    ]
  },
  {
    id: "uskudar", name: "Üsküdar", subtitle: "Mosquées de Sinan et coucher de soleil", coords: [41.0262, 29.0150],
    intro: "Un quartier conservateur et paisible, à visiter en fin d’après-midi pour la vue sur la péninsule historique au coucher du soleil.",
    routes: [["Marmaray", "Yenikapı ou Sirkeci → Üsküdar · 15–25 min · env. 0,85 €"], ["Ferry", "Eminönü → Üsküdar · 15 min · env. 0,85 €"], ["Uber", "25–40 min · env. 10–15 €"], ["À pied", "Non réaliste : rive asiatique"]],
    monuments: [
      ["++", "Mosquée Mihrimah Sultan", "Construite par Mimar Sinan pour la fille de Soliman vers 1548, face à l’embarcadère.", "gratuit", "20–30 min", "7 min vers Şemsi Paşa"],
      ["++", "Mosquée Şemsi Paşa", "Petite mosquée de Sinan de 1580 au ras de l’eau, l’une des plus délicates de la ville.", "gratuit", "15–20 min", "20 min vers Salacak"],
      ["+++", "Promenade de Salacak & tour de Léandre", "Le quai le plus photographié au coucher du soleil, face à la tour sur son îlot et à la silhouette de Sainte-Sophie et Topkapı.", "vue gratuite · visite de la tour avec bateau, tarif à vérifier", "45 min–1 h 30", null]
    ]
  },
  {
    id: "eyup", name: "Eyüp & Pierre Loti", subtitle: "Lieu saint et panorama sur la Corne d’Or", coords: [41.0478, 28.9337],
    intro: "Le lieu de pèlerinage le plus vénéré d’Istanbul. Atmosphère recueillie : tenue couvrante et discrétion, surtout le vendredi.",
    routes: [["Uber", "15–25 min · env. 5–8 €"], ["Tramway T5", "Depuis Cibali → Eyüpsultan · 20–30 min · env. 0,85 €"], ["Bus", "Le long de la Corne d’Or · 25–35 min · env. 0,85 €"], ["Ferry", "Lignes de la Corne d’Or, horaires limités"]],
    monuments: [
      ["+++", "Mosquée Eyüp Sultan", "Élevée sur la tombe d’Abu Ayyub al-Ansari, compagnon du Prophète. Les sultans y ceignaient l’épée lors de leur avènement.", "gratuit", "30–45 min", "10 min vers le cimetière"],
      ["++", "Cimetière historique", "Stèles ottomanes sculptées de turbans et de fleurs, sur la colline qui monte vers Pierre Loti.", "gratuit", "20–30 min", "Téléphérique vers Pierre Loti"],
      ["+++", "Colline Pierre Loti", "Café et belvédère nommés d’après l’écrivain français, avec une vue plongeante sur la Corne d’Or. Montée en téléphérique.", "vue gratuite · téléphérique env. 0,85 €", "45 min–1 h", null],
      ["++", "Sainte-Marie-des-Blachernes", "Église orthodoxe bâtie sur la source sacrée où l’on gardait l’icône de la Vierge protectrice de Constantinople. À Ayvansaray, entre Balat et Eyüp.", "gratuit · offrande bienvenue", "20–30 min", null]
    ]
  },
  {
    id: "bebek", name: "Arnavutköy & Bebek", subtitle: "Les villages du Bosphore", coords: [41.0720, 29.0435],
    intro: "Maisons ottomanes en bois, promenade au ras de l’eau et déjeuner de poisson : la meilleure fin de séjour, sans musée.",
    routes: [["Uber", "35–55 min · env. 13–20 €"], ["Tram + bus", "T1 jusqu’à Kabataş puis bus 22/25E · 50–65 min · env. 1,70 €"], ["Ferry", "Lignes du Bosphore, horaires limités"], ["À pied", "Non réaliste"]],
    monuments: [
      ["++", "Maisons ottomanes d’Arnavutköy", "Yalı et maisons en bois aux façades colorées, témoins de l’ancien village grec du Bosphore.", "gratuit", "30–45 min", "25–30 min à pied vers Bebek"],
      ["++", "Église des Taxiarques (Taksiarhis)", "Grande église grecque orthodoxe d’Arnavutköy, avec sa source sacrée (ayazma) dans un passage souterrain.", "gratuit", "15–20 min", null],
      ["+++", "Promenade du Bosphore", "Le quai entre Arnavutköy et Bebek longe l’eau au plus près, avec la forteresse de Rumeli Hisarı en vue.", "gratuit", "30–45 min", null],
      ["++", "Village et parc de Bebek", "Petite baie élégante, cafés, glaciers et la mosquée de Bebek au bord du parc.", "gratuit", "30–45 min", null]
    ]
  }
];

// À savoir (fermetures, usages) et où manger, par quartier.
const extras = {
  sultanahmet: {
    tips: ["Sainte-Sophie et la Mosquée Bleue ferment aux visiteurs pendant les prières, surtout le vendredi midi.", "Épaules et genoux couverts, foulard pour les femmes (prêté à l’entrée), chaussures retirées.", "Museum Pass non valable à Sainte-Sophie ni à la Citerne : arrivez à l’ouverture pour éviter la file."],
    food: [["Tarihi Sultanahmet Köftecisi", "Köfte grillées et salade de haricots piyaz, institution depuis 1920", "10–18 €"], ["Matbah", "Recettes des cuisines du palais ottoman", "35–60 €"], ["Hafız Mustafa 1864", "Lokum, baklava et sütlaç (riz au lait)", "4–10 €"]]
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
    food: [["Asitane", "Recettes reconstituées des banquets ottomans, à côté de Chora", "30–55 €"], ["Balat Sahil", "Mezzés et poissons frais au bord de la Corne d’Or", "25–45 €"], ["Cumbalı Kahve", "Café turc dans une maison colorée de Balat", "3–8 €"]]
  },
  galata: {
    tips: ["Tour de Galata ouverte tous les jours 8h30–23h ; file d’ascenseur longue au coucher du soleil.", "Le Mevlevihanesi propose des cérémonies de derviches certains soirs : vérifiez sur place."],
    food: [["Karaköy Güllüoğlu", "La référence du baklava à la pistache depuis 1949", "5–12 €"], ["Karaköy Lokantası", "Mezzés, poissons et plats du jour dans une salle de faïences turquoise", "20–40 €"]]
  },
  beyoglu: {
    tips: ["İstiklal est très fréquentée le soir et le week-end : surveillez sacs et téléphones.", "Le Musée de Pera est gratuit le vendredi de 18h à 22h."],
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
    tips: ["Quartier conservateur : tenue couvrante, alcool rare dans les restaurants.", "Coucher du soleil à Salacak vers 17h45 fin octobre, plus tôt en novembre."],
    food: [["Kanaat Lokantası", "Lokanta familiale de 1933 : plats du jour et desserts au lait", "12–25 €"], ["Çay au bord de l’eau", "Thé et simit sur les marches de Salacak", "1–3 €"]]
  },
  eyup: {
    tips: ["Lieu saint très fréquenté le vendredi et pendant les fêtes : visitez plutôt en semaine.", "Restez discret près de la tombe : pas de photos des fidèles."],
    food: [["Café Pierre Loti", "Thé ou café turc face à la Corne d’Or", "2–6 €"], ["Lokantas de la place Eyüp Sultan", "Kebabs et plats simples", "8–15 €"]]
  },
  bebek: {
    tips: ["Réservez le restaurant de poisson le week-end.", "Combinez avec Ortaköy en continuant vers le nord en bus ou en taxi."],
    food: [["Restaurants de poisson d’Arnavutköy", "Mezzés froids, poisson du jour et vue sur l’eau", "30–60 €"], ["Cafés de Bebek", "Café et pâtisserie face à la baie", "5–12 €"]]
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
  ["Akdeniz Hatay Sofrası", "Cuisine d’Antakya : agneau et poulet en croûte de sel, mezzés épicés. Pour un dîner généreux", "20–35 €", "15 min à pied ou 5 min en taxi · Fatih"],
  ["Cibalikapı Balıkçısı", "Meyhane de poisson réputée sur la Corne d’Or : mezzés, poisson du jour, rakı", "35–60 €", "18 min à pied ou 5 min en taxi · Cibali"]
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

const map = L.map("map", { zoomControl: true, attributionControl: true }).setView([41.024, 28.982], 13);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap contributors"
}).addTo(map);

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

districtButtons.innerHTML = districts.map((d, i) => `<button class="district-button" data-id="${d.id}"><strong>${i + 1}. ${d.name}</strong><span>${d.subtitle}</span></button>`).join("");

function sheetState(openSheet) {
  [detailSheet, districtList, infoSheet, restoSheet, journalSheet, churchSheet].forEach(sheet => {
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
    ${DESCRIPTIONS[district.id] ? `<section class="district-desc"><h3>Le quartier</h3><p>${DESCRIPTIONS[district.id]}</p></section>` : ""}
    <section class="route-card">
      <h3>Depuis le Mövenpick Old Town</h3>
      <div class="routes">${district.routes.map(r => `<div class="route"><b>${r[0]}</b><span>${r[1]}</span></div>`).join("")}</div>
    </section>
    <section class="musts"><h3>Les indispensables</h3><div class="must-list">${district.monuments.filter(m => m[0] === "+++").map(m => `<span class="must">${m[1]}</span>`).join("")}</div></section>
    ${extras[district.id] ? `<section class="tips"><h3>À savoir</h3><ul>${extras[district.id].tips.map(t => `<li>${t}</li>`).join("")}</ul></section>` : ""}
    <section class="monuments">
      <h3>À voir — par ordre de priorité</h3>
      ${district.monuments.map(m => `<article class="monument"><span class="rank ${rankClass(m[0])}">${m[0]}</span><h4>${m[1]}</h4><p>${m[2]}</p><div class="facts"><span>${m[3]}</span><span>${m[4]}</span></div>${m[5] ? `<p class="walk-next">À pied : ${m[5]}</p>` : ""}</article>`).join("")}
    </section>
    ${(() => { const ch = district.monuments.filter(m => CHURCH_WORDS.test(m[1])); return ch.length ? `<section class="churches"><h3>Églises qui valent le déplacement</h3>${ch.map(m => `<div class="church-row"><span class="rank-pill ${rankClass(m[0])}">${m[0]}</span><span>${m[1]}</span></div>`).join("")}</section>` : ""; })()}
    ${extras[district.id] ? `<section class="food"><h3>Où manger</h3>${extras[district.id].food.map(f => `<div class="food-item"><div><b>${f[0]}</b><span>${f[1]}</span><a class="maps-link" href="${mapsLink(f[0])}" target="_blank" rel="noreferrer">Itinéraire ↗</a></div><em class="price ${priceBand(f[2]).cls}">${f[2]}</em></div>`).join("")}</section>` : ""}
    <section class="photos"><h3>Mes photos</h3>
      <p class="photos-note">Elles restent sur cet appareil, dans ce navigateur.</p>
      <label class="add-photo" for="photoInput">+ Ajouter des photos</label>
      <input id="photoInput" type="file" accept="image/*" multiple hidden>
      <div id="photoGrid" class="photo-grid"></div>
    </section>`;
  currentDistrict = district.id;
  document.querySelector("#photoInput").addEventListener("change", e => addPhotos(district.id, e.target.files));
  renderPhotos(district.id);
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

/* ---- Églises & cathédrales ---- */
const churchSheet = document.querySelector("#churchSheet");
function renderChurches() {
  const order = { "+++": 0, "++": 1, "+": 2 };
  const rows = districts.flatMap(d => d.monuments.filter(m => CHURCH_WORDS.test(m[1])).map(m => ({ d, m })));
  rows.sort((a, b) => order[a.m[0]] - order[b.m[0]]);
  document.querySelector("#churchList").innerHTML = rows.map(({ d, m }) => `<article class="monument"><span class="rank ${rankClass(m[0])}">${m[0]}</span><h4>${m[1]}</h4><p>${m[2]}</p><div class="facts"><span>${m[3]}</span><span>${m[4]}</span></div><button class="resto-district" data-id="${d.id}">${d.name}</button></article>`).join("");
}
document.querySelector("#churchList").addEventListener("click", e => { const b = e.target.closest("[data-id]"); if (b) openDistrict(b.dataset.id); });
document.querySelector("#churchButton").addEventListener("click", () => { renderChurches(); sheetState(churchSheet); });

/* ---- Liste des restaurants ---- */
const restoSheet = document.querySelector("#restoSheet");
let restoFilter = "all";
const mapsLink = name => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + " Istanbul")}`;
function restoRow(name, desc, price, extra) {
  const band = priceBand(price);
  return `<div class="food-item"><div><b>${name}</b><span>${desc}</span>${extra || ""}<a class="maps-link" href="${mapsLink(name)}" target="_blank" rel="noreferrer">Itinéraire ↗</a></div><em class="price ${band.cls}">${band.label} · ${price}</em></div>`;
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
  if (!days.length) { box.innerHTML = `<p class="photos-note">Votre carnet est vide. Importez le tracé de votre première journée ou ajoutez des photos depuis la fiche d’un quartier.</p>`; return; }
  box.innerHTML = days.map((day, i) => {
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
