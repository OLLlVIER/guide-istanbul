# Melbourne : 5 zones, 16 quartiers, ~100 lieux.
# Lieu : (rang, nom, histoire/intérêt, durée, accès, lat, lon, titre Wikipédia anglais pour la photo, insolite?)

ZONES = [
  ("z1", "Le centre-ville", "#c4532e", "Le CBD, quadrillage tracé en 1837 : ruelles, galeries victoriennes, cafés et institutions. Tout se fait à pied, et le tram y est gratuit."),
  ("z2", "La Yarra, les arts et les jardins", "#2f7a52", "Au sud du fleuve, les grandes institutions culturelles et les jardins qui ont valu à Melbourne son surnom de « ville jardin »."),
  ("z3", "Le nord et l’est bohèmes", "#7a4fa0", "Les anciens faubourgs ouvriers devenus quartiers d’artistes, de cafés, d’universités et de communautés immigrées."),
  ("z4", "La baie", "#1f6fa5", "Plages, jetées et marchés le long de Port Phillip Bay : le Melbourne des week-ends."),
  ("z5", "Escapades", "#c08a12", "Ce qu’on ne voit qu’en sortant de la ville : art, géologie, forêts, vignobles et manchots."),
]

Q = []  # quartiers

Q.append(dict(id="cbd-sud", zone="z1", name="Flinders & Collins", sub="Le cœur victorien et ses ruelles",
 history="C’est ici que Melbourne est née en 1835, au bord de la Yarra. Le géomètre Robert Hoddle trace en 1837 le quadrillage de grandes rues séparées par d’étroites ruelles de service, les « laneways ». Avec la ruée vers l’or des années 1850, l’argent afflue : banques, galeries marchandes et églises de pierre poussent le long de Collins Street, dont l’extrémité est reste surnommée « Paris End ».",
 identity="Le quartier des employés de bureau, des étudiants et des touristes, qui se croisent dans les ruelles à cafés. C’est la vitrine de la culture du café et du street art.",
 economy="Quartier de la banque et du commerce depuis le XIXe siècle. Les ruelles servaient aux livraisons et aux ateliers ; elles ont été réinvesties par les cafés et les bars à partir des années 1990, grâce à une politique municipale qui a assoupli les licences.",
 change="Des années 1960 aux années 1980, le centre se vide le soir. La ville le reconquiert ensuite : logements, ruelles rouvertes, Federation Square (2002). Aujourd’hui c’est l’un des centres-villes les plus vivants d’Australie.",
 why="Pour l’architecture victorienne, les ruelles à cafés et le street art : c’est le Melbourne de carte postale, concentré en quelques rues.",
 go="Gare de Flinders Street (tous les trains) ou tram gratuit dans le centre.", time="Une demi-journée", budget="Gratuit, hors cafés et bars",
 places=[
  ("+++","Flinders Street Station","Ouverte en 1910, la gare au dôme vert et à la façade jaune est le symbole de la ville. « Sous les horloges » de l’entrée principale est le rendez-vous classique des Melburniens.","15 min","gratuit",-37.8183,144.9671,"Flinders Street railway station"),
  ("+++","Federation Square","Inaugurée en 2002 pour le centenaire de la Fédération, cette place aux façades géométriques est le salon de la ville : écrans géants, événements, et le musée ACMI consacré au cinéma et aux jeux vidéo.","30 min à 2 h","place gratuite, ACMI gratuit (expositions temporaires payantes)",-37.8180,144.9691,"Federation Square"),
  ("+++","Hosier Lane","La ruelle la plus célèbre de Melbourne, entièrement couverte de graffitis et de fresques qui changent sans cesse. Le street art y est toléré et devenu une attraction.","20 min","gratuit",-37.8166,144.9691,"Hosier Lane"),
  ("++","St Paul’s Cathedral","Cathédrale anglicane néogothique achevée en 1891, dessinée par l’architecte anglais William Butterfield. Ses flèches ne furent ajoutées qu’en 1933.","20 min","gratuit",-37.8170,144.9675,"St Paul's Cathedral, Melbourne"),
  ("+++","Degraves Street","La ruelle des cafés en terrasse, en face de la gare. Avec Centre Place, c’est l’image même de la culture du café melburnienne.","30 min","gratuit",-37.8172,144.9656,"Degraves Street"),
  ("++","Centre Place","Une ruelle étroite bordée de petits cafés et de street art, qui relie Flinders Lane à Collins Street.","15 min","gratuit",-37.8160,144.9654,"Centre Place, Melbourne"),
  ("+++","Block Arcade","Galerie marchande de 1892, sol en mosaïque et verrière, inspirée de la galerie Vittorio Emanuele de Milan. Le salon de thé Hopetoun y sert des gâteaux depuis la fin du XIXe siècle.","30 min","gratuit",-37.8156,144.9650,"Block Arcade"),
  ("++","Royal Arcade","La plus ancienne galerie marchande d’Australie, ouverte en 1869. Les géants Gog et Magog y sonnent les heures.","15 min","gratuit",-37.8141,144.9643,"Royal Arcade, Melbourne"),
  ("+","Cathedral Arcade","Galerie Art déco au rez-de-chaussée du Nicholas Building (1926), avec sa verrière colorée. Les étages abritent des ateliers d’artistes.","15 min","gratuit",-37.8163,144.9668,"Nicholas Building"),
  ("+","Presgrave Place","Minuscule ruelle tapissée de petites œuvres, cadres et objets accrochés aux murs.","10 min","gratuit",-37.8146,144.9653,""),
  ("+","AC/DC Lane","Ruelle rebaptisée en 2004 en hommage au groupe AC/DC, formé en Australie ; street art rock et bar Cherry, haut lieu du rock.","10 min","gratuit",-37.8162,144.9715,"AC/DC Lane"),
  ("++","ACMI","Le musée du cinéma, de la télévision et du jeu vidéo, sur Federation Square ; l’exposition permanente est gratuite.","1 h 30","entrée gratuite",-37.8176,144.9690,"Australian Centre for the Moving Image"),
  ("++","Immigration Museum","Dans l’ancienne douane de 1876 : l’histoire des migrants qui ont fait Melbourne, des bagnards aux réfugiés d’aujourd’hui.","1 h 30","payant, gratuit jusqu’à 16 ans",-37.8192,144.9605,"Immigration Museum, Melbourne"),
 ],
 insolite=[
  ("Beneath Driver Lane","Un bar en sous-sol installé dans une ancienne salle des coffres de banque, au bout d’une petite ruelle.",-37.8148,144.9656),
  ("Bar Americano","Un bar à cocktails minuscule, debout, dans Presgrave Place.",-37.8145,144.9655),
 ]))

Q.append(dict(id="cbd-nord", zone="z1", name="Chinatown, Bibliothèque & Marché", sub="Le nord du centre",
 history="Le marché Queen Victoria s’installe en 1878 sur l’ancien premier cimetière de la ville. Chinatown naît dans les années 1850, quand les chercheurs d’or chinois s’établissent autour de Little Bourke Street : c’est l’un des plus anciens quartiers chinois du monde occidental. La Bibliothèque d’État ouvre en 1856, l’une des premières bibliothèques publiques gratuites au monde.",
 identity="Le quartier des étudiants (les universités RMIT et Melbourne sont tout près), des communautés chinoise et grecque, et des petits restaurants pas chers.",
 economy="Marché de gros puis de détail, entrepôts et ateliers de confection : beaucoup de ruelles gardent leurs murs de briques d’anciens entrepôts.",
 change="Les entrepôts sont devenus logements, bars et cafés ; les tours d’appartements pour étudiants ont poussé depuis les années 2000.",
 why="Pour la salle de lecture de la bibliothèque, le marché, les dumplings de Chinatown et les ruelles d’entrepôts les plus authentiques.",
 go="Tram gratuit dans le centre, ou gare de Melbourne Central.", time="Une demi-journée", budget="Gratuit ; marché et repas à petit prix",
 places=[
  ("+++","State Library Victoria","Ouverte en 1856. Sa salle de lecture La Trobe, sous un immense dôme octogonal de 1913, est l’un des plus beaux intérieurs du pays. On y voit aussi l’armure de Ned Kelly, le hors-la-loi le plus célèbre d’Australie.","45 min","gratuit",-37.8098,144.9652,"State Library Victoria"),
  ("+++","Queen Victoria Market","Le plus grand marché à ciel ouvert de l’hémisphère sud selon la ville, ouvert en 1878 : produits frais, épicerie fine, vêtements. Fermé lundi et mercredi ; marché de nuit le mercredi en été.","1 à 2 h","gratuit",-37.8076,144.9568,"Queen Victoria Market"),
  ("++","Coop’s Shot Tower","Une tour en briques de 1888, où l’on fabriquait des plombs de chasse en laissant tomber du plomb fondu, conservée sous le cône de verre du centre commercial Melbourne Central.","15 min","gratuit",-37.8105,144.9631,"Coop's Shot Tower"),
  ("++","Chinatown & Heffernan Lane","Little Bourke Street et ses arches rouges, ses restaurants et Heffernan Lane, ruelle graffée à lanternes. Le musée chinois raconte l’histoire de la communauté depuis la ruée vers l’or.","45 min","gratuit (musée payant)",-37.8114,144.9677,"Chinatown, Melbourne"),
  ("++","Old Melbourne Gaol","Prison de 1845 à 1924, où fut pendu Ned Kelly en 1880. Visites des cellules, et visites nocturnes théâtralisées.","1 h","payant",-37.8078,144.9653,"Old Melbourne Gaol"),
  ("+","Quartier grec de Lonsdale Street","Restaurants et pâtisseries grecs sur Lonsdale Street, vestige de la grande immigration grecque d’après-guerre.","30 min","gratuit",-37.8118,144.9665,"Greek Precinct, Melbourne"),
  ("+","Guildford Lane","Ruelle d’anciens entrepôts en briques, avec plantes grimpantes et cafés cachés.","10 min","gratuit",-37.8124,144.9612,""),
  ("+","Niagara Lane","Ruelle pavée bordée d’entrepôts victoriens, l’une des mieux conservées du centre.","10 min","gratuit",-37.8146,144.9586,""),
  ("+","Drewery, Warburton & Sutherland","Petites ruelles discrètes du nord du centre, entre fresques et adresses gourmandes.","20 min","gratuit",-37.8107,144.9640,""),
  ("+","Equitable Place & Scott Alley","Ruelles animées à l’heure du déjeuner, entre vieux immeubles et comptoirs où manger sur le pouce.","15 min","gratuit",-37.8160,144.9620,""),
  ("+","Hardware Lane","Ruelle pavée bordée de terrasses et de petits restaurants, très animée le midi et le soir.","45 min","gratuit",-37.8133,144.9596,"Hardware Lane"),
 ],
 insolite=[
  ("Berlin Bar","Bar à cocktails caché, avec deux salles qui jouent sur l’opposition Berlin-Est et Berlin-Ouest.",-37.8113,144.9681),
  ("Loop Roof","Rooftop planté au-dessus des toits du centre, pour un verre au coucher du soleil.",-37.8114,144.9733),
 ]))

Q.append(dict(id="parlement", zone="z1", name="Parlement & Fitzroy Gardens", sub="L’est du centre, siège du pouvoir",
 history="De 1901 à 1927, Melbourne est la capitale de l’Australie : le Parlement fédéral siège dans le bâtiment du Parlement de Victoria, en attendant Canberra, ville créée de toutes pièces pour départager Melbourne et Sydney. Les jardins de Fitzroy et de Treasury sont aménagés dès les années 1850.",
 identity="Quartier institutionnel et résidentiel chic : ministères, cathédrale catholique, maisons victoriennes d’East Melbourne.",
 economy="Le pouvoir politique de l’État de Victoria et l’administration.",
 change="Les grands bâtiments du XIXe siècle sont restés en place ; East Melbourne est l’un des quartiers victoriens les mieux préservés.",
 why="Pour l’architecture de l’âge d’or, les jardins et le cottage du capitaine Cook, transporté d’Angleterre pierre par pierre.",
 go="Gare de Parliament, ou tram gratuit dans le centre.", time="2 à 3 h", budget="Gratuit (cottage payant)",
 places=[
  ("+++","Parliament House","Construit à partir de 1856, siège du Parlement fédéral de 1901 à 1927. Visites guidées gratuites en semaine, hors séances.","1 h","gratuit",-37.8110,144.9737,"Parliament House, Melbourne"),
  ("++","St Patrick’s Cathedral","Cathédrale catholique néogothique, construite de 1858 à 1939 pour une communauté largement d’origine irlandaise.","20 min","gratuit",-37.8100,144.9762,"St Patrick's Cathedral, Melbourne"),
  ("++","Fitzroy Gardens Conservatory","Serre des années 1930 aux massifs changés à chaque saison, au cœur des jardins de Fitzroy.","20 min","gratuit",-37.8139,144.9793,"Fitzroy Gardens"),
  ("++","Cooks’ Cottage","La maison des parents du navigateur James Cook, achetée en Angleterre et reconstruite ici en 1934 pour le centenaire de l’État.","30 min","payant",-37.8146,144.9795,"Cooks' Cottage"),
  ("+","Old Treasury Building","Ancien Trésor de 1862, où l’on stockait l’or des mines ; aujourd’hui musée de la ville, avec ses chambres fortes.","45 min","selon les expositions",-37.8131,144.9741,"Old Treasury Building, Melbourne"),
 ],
 insolite=[("Les maisons victoriennes d’East Melbourne","Une promenade dans les rues résidentielles derrière les jardins, entre balcons en fonte et terrasses du XIXe siècle.",-37.8125,144.9840)]))

Q.append(dict(id="southbank", zone="z2", name="Southbank & le quartier des arts", sub="La rive sud de la Yarra",
 history="Longtemps zone industrielle et portuaire, la rive sud accueille à partir des années 1960 le quartier des arts : la National Gallery of Victoria s’y installe en 1968, l’Arts Centre et sa flèche dans les années 1980. La promenade, les hôtels et les tours viennent dans les années 1990.",
 identity="Le quartier des sorties : spectacles, musées, restaurants au bord de l’eau et casino Crown.",
 economy="Industrie et entrepôts, puis culture, tourisme et loisirs. C’est aujourd’hui l’un des quartiers les plus denses en tours d’habitation.",
 change="Un exemple de reconversion : des usines à la promenade piétonne.",
 why="Pour la NGV, la plus ancienne galerie publique d’Australie, les spectacles de l’Arts Centre et la vue depuis la Yarra.",
 go="À pied depuis Flinders Street par le pont Princes Bridge, ou tram sur St Kilda Road.", time="Une demi-journée", budget="Gratuit pour la NGV ; spectacles et Skydeck payants",
 places=[
  ("+++","NGV International","La National Gallery of Victoria, fondée en 1861, est la plus ancienne galerie publique d’Australie. Collection permanente gratuite ; ne pas manquer le plafond de vitraux du Great Hall et le mur d’eau de l’entrée.","2 h","gratuit (expositions temporaires payantes)",-37.8225,144.9689,"National Gallery of Victoria"),
  ("++","Arts Centre Melbourne","Théâtres, opéra et salle de concert sous la flèche illuminée qui domine St Kilda Road.","30 min (ou un spectacle)","gratuit pour l’extérieur, spectacles payants",-37.8215,144.9690,"Arts Centre Melbourne"),
  ("++","Southbank Promenade","La promenade au bord de la Yarra, entre restaurants et vues sur le centre ; animée le soir.","45 min","gratuit",-37.8200,144.9640,"Southbank, Victoria"),
  ("+","Polly Woodside","Voilier à coque de fer construit en 1885 à Belfast, amarré dans une ancienne cale sèche de South Wharf.","45 min","payant",-37.8245,144.9535,"Polly Woodside"),
  ("++","Eureka Skydeck","Observatoire au 88e étage de la tour Eureka, avec une cabine de verre en surplomb.","1 h","payant",-37.8214,144.9646,"Eureka Tower"),
 ],
 insolite=[("Ponyfish Island","Un petit bar sous la passerelle piétonne qui enjambe la Yarra : un verre au ras de l’eau.",-37.8198,144.9632)]))

Q.append(dict(id="kings-domain", zone="z2", name="Kings Domain & Jardins botaniques", sub="Le poumon vert de la ville",
 history="Réservés dès 1846, les Jardins botaniques royaux sont aménagés à partir de 1873 par William Guilfoyle dans le style paysager anglais. Le Shrine of Remembrance est inauguré en 1934 en mémoire des soldats de la Première Guerre mondiale.",
 identity="Le grand parc des joggeurs, des pique-niques et des cérémonies de l’Anzac Day, le 25 avril.",
 economy="Espace public et scientifique : herbier, recherche botanique.",
 change="Les jardins s’adaptent au climat plus sec : plantations plus résistantes, gestion de l’eau.",
 why="Pour une promenade calme, la vue du balcon du Shrine et les coins secrets du parc.",
 go="Tram sur St Kilda Road jusqu’au Shrine, ou à pied depuis Southbank.", time="2 à 3 h", budget="Gratuit",
 places=[
  ("+++","Royal Botanic Gardens","38 hectares de pelouses, lacs et collections du monde entier, dont le vallon de fougères arborescentes de Fern Gully.","1 h 30","gratuit",-37.8304,144.9796,"Royal Botanic Gardens, Melbourne"),
  ("+++","Shrine of Remembrance","Le grand mémorial de guerre de l’État, inspiré du mausolée d’Halicarnasse. Le 11 novembre à 11 h, un rayon de soleil éclaire la pierre du souvenir. Balcon panoramique.","45 min","gratuit",-37.8305,144.9734,"Shrine of Remembrance"),
  ("+","The Grotto, Kings Domain","Une grotte artificielle avec cascade et fougères, cachée dans les jardins.","15 min","gratuit",-37.8235,144.9735,"Kings Domain"),
  ("+","Pioneer Women’s Memorial Garden","Jardin en contrebas avec bassin, créé en hommage aux femmes pionnières de l’État.","15 min","gratuit",-37.8278,144.9752,""),
  ("+","Sidney Myer Music Bowl","Grande scène en plein air sous une toile de 1959 : concerts d’été, cinéma en plein air et Carols by Candlelight à Noël.","30 min","gratuit hors concerts",-37.8236,144.9737,"Sidney Myer Music Bowl"),
 ],
 insolite=[("The Tan","La boucle de course de 3,8 km autour des jardins, la piste préférée des Melburniens : on y croise des milliers de coureurs.",-37.8290,144.9760)]))

Q.append(dict(id="richmond", zone="z2", name="Richmond & le quartier des stades", sub="Sport et « Little Saigon »",
 history="Faubourg ouvrier du XIXe siècle, Richmond accueille dans les années 1970 et 1980 les réfugiés vietnamiens, qui font de Victoria Street la « Little Saigon » de Melbourne. À côté, le MCG, ouvert en 1853, et Melbourne Park forment le plus grand quartier sportif du pays.",
 identity="Quartier mêlant familles vietnamiennes, jeunes actifs et supporters du Richmond Football Club, « les Tigres ».",
 economy="Usines (dont la célèbre enseigne Pelaco), puis bureaux, commerces et événements sportifs.",
 change="Les entrepôts sont devenus lofts et bureaux ; Swan Street est devenue une rue de bars.",
 why="Pour un match au MCG, l’Open d’Australie en janvier et le meilleur pho de la ville.",
 go="Gare de Richmond ou de Jolimont, tram 70 et 75.", time="Une demi-journée ou un match", budget="Repas pas chers ; matchs et visites payants",
 places=[
  ("+++","Melbourne Cricket Ground (MCG)","Le « G », ouvert en 1853, peut accueillir 100 024 spectateurs. Stade des Jeux olympiques de 1956, de la finale du football australien et du Boxing Day Test de cricket. Visites et musée national du sport.","1 h 30 (ou un match)","payant",-37.8200,144.9834,"Melbourne Cricket Ground"),
  ("++","Melbourne Park","Le site de l’Open d’Australie, en janvier, et de grands concerts à la Rod Laver Arena.","30 min","gratuit pour flâner",-37.8217,144.9785,"Melbourne Park"),
  ("++","Victoria Street, « Little Saigon »","La rue vietnamienne de Richmond : pho, bánh mì, épiceries asiatiques.","1 h","gratuit",-37.8110,144.9980,"Victoria Street, Melbourne"),
  ("+","Burnley Gardens","Les jardins historiques de l’école d’horticulture de Burnley : grands arbres, étang et allées fleuries.","30 min","gratuit",-37.8285,145.0210,""),
 ],
 insolite=[("Le panneau Skipping Girl","Une enseigne lumineuse de 1936 représentant une petite fille qui saute à la corde, classée et chère aux Melburniens (Abbotsford, près de Victoria Street).",-37.8105,145.0060)]))

Q.append(dict(id="fitzroy", zone="z3", name="Fitzroy & Collingwood", sub="Le quartier créatif",
 history="Fitzroy est la première banlieue de Melbourne, lotie dès 1839. Quartier pauvre et ouvrier au XXe siècle, il accueille les immigrés et les communautés aborigènes, dont Gertrude Street fut un foyer militant. Collingwood, voisin, était un quartier d’usines et de tanneries.",
 identity="Artistes, étudiants, créateurs et cafés indépendants : le quartier le plus « alternatif » de Melbourne, qui se gentrifie fortement.",
 economy="Petites usines et ateliers, aujourd’hui boutiques de créateurs, galeries, bars et studios.",
 change="La gentrification depuis les années 1990 a fait monter les loyers ; les entrepôts sont devenus galeries et appartements.",
 why="Pour les friperies, le street art, les bars et la meilleure ambiance du soir.",
 go="Tram 11 sur Brunswick Street, tram 86 sur Gertrude et Smith Street.", time="Une demi-journée et une soirée", budget="Gratuit ; bars et restaurants",
 places=[
  ("+++","Brunswick Street","La rue bohème : friperies, disquaires, cafés, bars et façades peintes.","1 h 30","gratuit",-37.7985,144.9784,"Brunswick Street, Melbourne"),
  ("++","Gertrude Street","Boutiques de créateurs, restaurants et histoire militante aborigène.","45 min","gratuit",-37.8058,144.9810,"Gertrude Street, Fitzroy"),
  ("++","Smith Street","Frontière entre Fitzroy et Collingwood : brocantes, cafés et bars plus populaires.","45 min","gratuit",-37.8020,144.9840,"Smith Street, Melbourne"),
  ("+","Rose Street Artists’ Market","Marché de créateurs du week-end : bijoux, illustrations, céramiques.","30 min","gratuit",-37.7987,144.9811,""),
 ],
 insolite=[
  ("Easey’s","Un restaurant de burgers installé dans d’anciens wagons de métro peints, perchés sur le toit d’un immeuble de Collingwood.",-37.7998,144.9893),
  ("The Everleigh","Un bar à cocktails à l’ambiance années 1920 sur Gertrude Street.",-37.8058,144.9826),
 ]))

Q.append(dict(id="carlton", zone="z3", name="Carlton & Parkville", sub="Le quartier italien et universitaire",
 history="Le Royal Exhibition Building est construit pour l’Exposition internationale de 1880 ; le premier Parlement fédéral y siège en 1901. Après la guerre, les immigrés italiens font de Lygon Street la « Little Italy » de Melbourne. L’Université de Melbourne, fondée en 1853, borde le quartier.",
 identity="Étudiants, chercheurs, familles d’origine italienne et grecque.",
 economy="Université, hôpitaux et recherche médicale : Parkville est l’un des grands pôles biomédicaux du pays.",
 change="Les maisons ouvrières sont devenues des résidences recherchées ; les cafés italiens côtoient des restaurants du monde entier.",
 why="Pour le seul bâtiment classé au patrimoine mondial de l’UNESCO de la ville, le café italien et le zoo.",
 go="Tram sur Swanston Street (1, 3, 5, 6, 16, 64, 67, 72) ou tram 1 et 6 sur Lygon Street.", time="Une demi-journée", budget="Musée et zoo payants",
 places=[
  ("+++","Royal Exhibition Building & Carlton Gardens","Palais d’exposition de 1880, classé au patrimoine mondial de l’UNESCO en 2004 avec ses jardins. Visites guidées certains jours.","45 min","jardins gratuits, visite payante",-37.8047,144.9717,"Royal Exhibition Building"),
  ("++","Melbourne Museum","Le grand musée d’histoire naturelle et de société : forêt intérieure, dinosaures, histoire des peuples aborigènes de Victoria.","2 h","payant",-37.8033,144.9717,"Melbourne Museum"),
  ("++","Lygon Street","La rue italienne : cafés, gelaterias et restaurants depuis les années 1950.","1 h","gratuit",-37.7990,144.9670,"Lygon Street"),
  ("+","System Garden, University of Melbourne","Jardin botanique de 1856 sur le campus, où les plantes sont classées par familles.","30 min","gratuit",-37.7975,144.9620,"University of Melbourne"),
  ("++","Melbourne Zoo","Ouvert en 1862, le plus ancien zoo d’Australie : kangourous, koalas, ornithorynques.","3 h","payant",-37.7841,144.9515,"Melbourne Zoo"),
  ("+","Ian Potter Museum of Art","Le musée d’art de l’université de Melbourne : art aborigène, antiquités et art contemporain.","1 h","entrée gratuite",-37.7976,144.9640,"Ian Potter Museum of Art"),
 ],
 insolite=[("Le café Pellegrini’s","Un café italien de Bourke Street resté dans son décor des années 1950, souvent cité comme l’un des premiers à servir l’espresso à Melbourne.",-37.8115,144.9706)]))

Q.append(dict(id="abbotsford", zone="z3", name="Abbotsford & Yarra Bend", sub="La nature au bord de la Yarra",
 history="Le couvent d’Abbotsford est fondé en 1863 par les Sœurs du Bon Pasteur ; il a accueilli des milliers de femmes et de jeunes filles. Sauvé de la démolition par une campagne publique, il devient un lieu d’art en 2004. Le parc de Yarra Bend protège les berges du fleuve depuis le XIXe siècle.",
 identity="Familles, artistes et amoureux de nature, à quelques kilomètres du centre.",
 economy="Ancienne zone d’asiles et d’industries le long du fleuve, aujourd’hui loisirs et culture.",
 change="Du couvent fermé au centre culturel ouvert à tous.",
 why="Pour une journée hors du béton : ferme, jardins, fleuve et chauves-souris au crépuscule.",
 go="Gare de Victoria Park puis 15 min à pied ; bus 200 et 207.", time="Une demi-journée", budget="Gratuit (ferme payante)",
 places=[
  ("+++","Abbotsford Convent","Ancien couvent devenu lieu d’artistes : ateliers, galeries, cafés et jardins au bord de la Yarra.","1 h 30","gratuit",-37.8027,145.0045,"Abbotsford Convent"),
  ("++","Collingwood Children’s Farm","Une vraie ferme au bord de la Yarra : animaux, potagers et café. Marché fermier certains samedis.","1 h","payant",-37.8020,145.0060,"Collingwood Children's Farm"),
  ("++","Yarra Bend Park","Le plus grand espace naturel près du centre : sentiers, canoës et colonie de roussettes, ces grandes chauves-souris qui s’envolent au crépuscule.","1 h 30","gratuit",-37.7905,145.0095,"Yarra Bend Park"),
  ("+","Dights Falls","Un petit barrage sur la Yarra, construit pour un moulin au XIXe siècle ; on y voit parfois des cormorans.","20 min","gratuit",-37.7979,144.9989,""),
 ],
 insolite=[]))

Q.append(dict(id="south-melbourne", zone="z4", name="South Melbourne & Albert Park", sub="Marché et Grand Prix",
 history="Emerald Hill, devenu South Melbourne, est l’un des premiers quartiers bâtis hors du centre, dans les années 1850. Le lac d’Albert Park, ancien marécage, accueille depuis 1996 le Grand Prix de Formule 1.",
 identity="Quartier résidentiel aisé, maisons victoriennes et marché de quartier très vivant.",
 economy="Ancien quartier industriel et portuaire, aujourd’hui commerces, bureaux et sport.",
 change="Les usines ont laissé place aux bureaux et aux logements ; le marché est resté.",
 why="Pour le marché le plus convivial de Melbourne et le tour du lac.",
 go="Tram 96 ou 12.", time="2 à 3 h", budget="Petits prix au marché",
 places=[
  ("+++","South Melbourne Market","Marché couvert depuis 1867, réputé pour ses « dim sims », ces raviolis géants inventés à Melbourne, et ses huîtres.","1 h","gratuit",-37.8328,144.9563,"South Melbourne Market"),
  ("++","Albert Park Lake","Lac de 5 km de tour, cygnes noirs et coureurs ; circuit du Grand Prix de F1 en mars.","1 h","gratuit",-37.8460,144.9700,"Albert Park and Lake"),
  ("+","Station Pier & Port Melbourne Beach","Jetée historique de 1854 où débarquaient les immigrants, et longue plage tranquille face à la baie.","1 h","gratuit",-37.8445,144.9330,"Station Pier"),
 ],
 insolite=[]))

Q.append(dict(id="st-kilda", zone="z4", name="St Kilda", sub="La plage historique",
 history="Station balnéaire chic au XIXe siècle, St Kilda devient après la guerre un quartier populaire, puis le repaire des artistes et des musiciens rock dans les années 1970 et 1980. Luna Park ouvre en 1912.",
 identity="Mélange de backpackers, de familles, de communauté juive (Balaclava, tout proche) et de fêtards.",
 economy="Tourisme, loisirs et vie nocturne.",
 change="Gentrification progressive ; le front de mer a été réaménagé.",
 why="Pour la plage, la jetée, les gâteaux d’Acland Street et les manchots au coucher du soleil.",
 go="Tram 96 depuis Bourke Street, ou tram 16 depuis Swanston Street (30 min).", time="Une demi-journée", budget="Gratuit ; manèges et gâteaux",
 places=[
  ("+++","St Kilda Pier","La jetée et son kiosque de 1904, reconstruit à l’identique après un incendie. Au coucher du soleil, on aperçoit les petits manchots qui nichent dans le brise-lames. Ne pas les toucher ni utiliser de flash.","1 h","gratuit",-37.8634,144.9715,"St Kilda Pier"),
  ("++","Luna Park","Fête foraine de 1912 avec sa bouche géante, et l’une des plus anciennes montagnes russes en bois encore en service.","1 h","entrée gratuite, manèges payants",-37.8678,144.9765,"Luna Park Melbourne"),
  ("++","Acland Street","La rue des pâtisseries d’Europe centrale, vitrines de gâteaux héritées de l’immigration juive.","45 min","gratuit",-37.8676,144.9800,"Acland Street"),
  ("+","St Kilda Esplanade Market","Marché d’artisans du dimanche le long du front de mer.","45 min","gratuit",-37.8655,144.9745,""),
  ("+","St Kilda Botanical Gardens","Jardin victorien de 1859 avec roseraie, serre tropicale et étang, à deux pas d’Acland Street.","45 min","gratuit",-37.8665,144.9805,"St Kilda Botanical Gardens"),
 ],
 insolite=[]))

Q.append(dict(id="prahran", zone="z4", name="South Yarra, Prahran & Windsor", sub="Shopping et villas",
 history="Quartiers résidentiels aisés depuis le XIXe siècle ; Chapel Street devient la grande rue commerçante. Le domaine de Rippon Lea est construit dans les années 1860 par un homme d’affaires enrichi.",
 identity="Mode, sorties, jeunesse branchée ; communauté LGBT+ historique autour de Commercial Road.",
 economy="Commerce, mode et restauration.",
 change="Montée des tours d’appartements autour de la gare de South Yarra.",
 why="Pour le shopping sur Chapel Street, le marché de Prahran et un film à l’Astor.",
 go="Trains de la ligne Sandringham (South Yarra, Prahran, Windsor, Rippon Lea) ; tram 78 et 58.", time="Une demi-journée", budget="Gratuit ; cinéma et domaine payants",
 places=[
  ("++","Prahran Market","Marché de produits frais depuis 1864, l’un des plus anciens d’Australie.","45 min","gratuit",-37.8462,144.9925,"Prahran Market"),
  ("++","Chapel Street","Boutiques, friperies vintage côté Windsor, bars et restaurants.","1 h","gratuit",-37.8450,144.9930,"Chapel Street, Melbourne"),
  ("++","The Astor Theatre","Cinéma Art déco de 1936 au grand écran unique, qui projette classiques et films récents.","2 h (une séance)","payant",-37.8591,144.9922,"Astor Theatre, Melbourne"),
  ("++","Rippon Lea Estate","Manoir victorien dans un parc paysager avec lac, cascade et serre.","1 h 30","payant",-37.8783,144.9968,"Rippon Lea Estate"),
  ("+","Como House & Garden","Demeure de 1847 sur une colline de South Yarra, meublée comme au XIXe siècle, avec jardins à l’italienne.","1 h","jardins gratuits, maison payante",-37.8390,144.9998,"Como House"),
 ],
 insolite=[]))

Q.append(dict(id="bayside", zone="z4", name="Brighton & la côte sud", sub="Cabanes et criques",
 history="Banlieues balnéaires prospères depuis le XIXe siècle. Les cabanes de plage de Brighton existent depuis la fin du XIXe siècle. L’épave du Cerberus, navire de guerre de 1868, fut sabordée en 1926 pour servir de brise-lames à Half Moon Bay.",
 identity="Quartiers résidentiels parmi les plus riches de Melbourne.",
 economy="Résidentiel et loisirs balnéaires.",
 change="Les cabanes, simples abris de bain, s’échangent aujourd’hui à des prix très élevés.",
 why="Pour les photos des cabanes colorées et une baignade ou du snorkeling au calme.",
 go="Train de la ligne Sandringham jusqu’à Brighton Beach (25 min) ; puis bus ou vélo vers Black Rock.", time="Une demi-journée", budget="Gratuit",
 places=[
  ("+++","Brighton Bathing Boxes","Rangée de cabanes de plage peintes de toutes les couleurs, avec la skyline au loin, à Dendy Street Beach.","45 min","gratuit",-37.9169,144.9870,"Brighton, Victoria"),
  ("++","Half Moon Bay, Black Rock","Petite crique aux falaises rouges, avec l’épave du HMVS Cerberus.","45 min","gratuit",-37.9707,145.0137,"HMVS Cerberus"),
  ("++","Ricketts Point Marine Sanctuary","Réserve marine avec rochers et bassins, idéale pour le snorkeling.","1 h","gratuit",-37.9965,145.0310,"Ricketts Point Marine Sanctuary"),
 ],
 insolite=[]))

Q.append(dict(id="ouest", zone="z4", name="Williamstown, Footscray & l’ouest", sub="Le vieux port et l’ouest multiculturel",
 history="Williamstown fut le premier port de la colonie, avant Melbourne. L’ouest, autour de Footscray, est le Melbourne industriel : abattoirs, usines, docks. Il accueille les vagues successives d’immigration, des Européens aux Vietnamiens puis aux Africains de l’Est.",
 identity="Le Melbourne populaire et multiculturel, en pleine transformation ; Williamstown garde un air de village marin.",
 economy="Industrie, port et logistique ; le port de Melbourne, tout proche, est le premier port à conteneurs d’Australie.",
 change="Les usines ferment, les friches deviennent parcs et logements.",
 why="Pour la plus belle vue sur la skyline, la cuisine du monde à Footscray et les lieux insolites de l’ouest.",
 go="Train de la ligne Williamstown, ou ferry depuis Southbank en saison ; train vers Footscray.", time="Une journée", budget="Gratuit ; Scienceworks payant",
 places=[
  ("++","Gem Pier, Williamstown","Jetée du vieux port, avec l’une des plus belles vues sur la skyline de l’autre côté de la baie.","1 h","gratuit",-37.8605,144.9065,"Williamstown, Victoria"),
  ("++","Footscray Market","Marché couvert vietnamien et africain : la meilleure adresse pour la cuisine du monde à petit prix.","1 h","gratuit",-37.8000,144.9000,"Footscray, Victoria"),
  ("+","Scienceworks","Musée des sciences installé dans une ancienne station de pompage des égouts.","2 h","payant",-37.8295,144.8950,"Scienceworks (Melbourne)"),
  ("+","Jawbone Marine Sanctuary","Réserve côtière à Williamstown, avec mangroves et oiseaux.","45 min","gratuit",-37.8705,144.8880,""),
 ],
 insolite=[("Westgate Park","Parc sous le pont West Gate dont le lac salé devient rose certaines années, à cause d’une micro-algue.",-37.8306,144.9118)]))

Q.append(dict(id="nord-est", zone="z5", name="Heide & Montsalvat", sub="Le nord-est des artistes",
 history="Dans les années 1930 et 1940, des artistes s’installent dans les vergers du nord-est : John et Sunday Reed accueillent à Heide les peintres qui renouvellent l’art australien, comme Sidney Nolan et sa série sur Ned Kelly ; à Eltham, Justus Jörgensen bâtit avec ses élèves le village de Montsalvat.",
 identity="Banlieues boisées, familles et artistes.",
 economy="Résidentiel, art et tourisme culturel.",
 change="Les fermes sont devenues banlieues, les maisons d’artistes des musées.",
 why="Pour comprendre la naissance de l’art moderne australien dans des lieux magnifiques.",
 go="Heide : train jusqu’à Heidelberg puis bus. Montsalvat : train ligne Hurstbridge jusqu’à Eltham puis 20 min à pied.", time="Une journée", budget="Entrées payantes",
 places=[
  ("+++","Heide Museum of Modern Art","Musée d’art moderne dans l’ancienne propriété des Reed, avec parc de sculptures et potager.","2 h","payant",-37.7576,145.0841,"Heide Museum of Modern Art"),
  ("++","Montsalvat, Eltham","Colonie d’artistes aux bâtiments de style médiéval, ateliers, galeries et jardins.","1 h 30","payant",-37.7258,145.1386,"Montsalvat"),
  ("+","Warrandyte","Village au bord de la Yarra, entouré de bush, avec la promenade de la rivière et de vieilles maisons de chercheurs d’or.","demi-journée","gratuit",-37.7440,145.2140,"Warrandyte, Victoria"),
 ],
 insolite=[]))

Q.append(dict(id="escapades", zone="z5", name="Les grandes escapades", sub="Excursions d’une journée",
 history="Autour de Melbourne, la géologie volcanique, les forêts et la côte offrent des paysages très variés à une ou deux heures de route.",
 identity="Les sorties du week-end des Melburniens.",
 economy="Agriculture, vignobles et tourisme.",
 change="Le tourisme a remplacé une partie de l’agriculture ; la protection de la nature s’est renforcée, notamment pour les manchots de Phillip Island.",
 why="Pour voir les kangourous, les manchots, les vignobles et la côte sauvage.",
 go="Voiture conseillée ; excursions organisées au départ du centre. Puffing Billy : train jusqu’à Belgrave.", time="Une journée par sortie", budget="De gratuit à payant selon la sortie",
 places=[
  ("+++","Phillip Island Penguin Parade","Chaque soir, des centaines de petits manchots sortent de l’eau pour rejoindre leurs terriers. À environ 2 h de route.","Une soirée","payant",-38.5110,145.1500,"Penguin Parade"),
  ("+++","Great Ocean Road","Route côtière construite par d’anciens soldats après la Première Guerre mondiale, en mémoire de leurs camarades. Départ à Torquay ; les Douze Apôtres sont plus loin.","Une journée (au moins)","gratuit",-38.3320,144.3250,"Great Ocean Road"),
  ("++","Puffing Billy & Dandenong Ranges","Train à vapeur centenaire dans la forêt de fougères et d’eucalyptus des Dandenong Ranges.","Une demi-journée","payant",-37.9105,145.3550,"Puffing Billy Railway"),
  ("++","Yarra Valley","Vignobles, fromageries et sanctuaire animalier de Healesville, à 1 h de route.","Une journée","dégustations payantes",-37.6550,145.5170,"Yarra Valley"),
  ("+","Peninsula Hot Springs","Bains de sources chaudes sur la péninsule de Mornington.","Une demi-journée","payant",-38.3770,144.8710,"Peninsula Hot Springs"),
  ("+","Organ Pipes National Park","Orgues basaltiques formées par d’anciennes coulées de lave, au fond d’une petite gorge.","2 h","gratuit",-37.6680,144.7660,"Organ Pipes National Park"),
  ("+","Werribee Gorge State Park","Gorge spectaculaire avec un sentier au bord de la rivière, à 1 h de route.","Une demi-journée","gratuit",-37.6670,144.3500,"Werribee Gorge State Park"),
  ("++","Healesville Sanctuary","Le meilleur endroit pour voir koalas, kangourous, wombats et ornithorynques, dans la vallée de la Yarra, à 1 h 15 de Melbourne.","demi-journée","payant",-37.6811,145.5306,"Healesville Sanctuary"),
 ],
 insolite=[]))
