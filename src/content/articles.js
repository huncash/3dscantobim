const ARTICLES = [
  {
    slug: 'mit-varjon-egy-bim-modellezo-a-terepi-felmerestol',
    path: '/cikkek/mit-varjon-egy-bim-modellezo-a-terepi-felmerestol',
    title: 'Mit várjon egy BIM-modellező a terepi felméréstől?',
    description:
      'Egy modellező csapatnak nem bemutató szkennelés kell, hanem olyan pontfelhő és átadási lap, ami a saját munkafolyamatához illeszkedik.',
    published: '2026-11-09',
    kicker: 'Átadás',
    html: `
      <p>A terepi felmérés akkor hasznos egy BIM-modellezőnek, ha a kapott anyagból el lehet kezdeni a munkát anélkül, hogy a helyszínt újra végig kellene járni a hiányzó döntések miatt. Ehhez nem elég egy nyers állománylistát átadni. Kell egy brief, ami megmondja, mit mérünk, milyen rendszerben, milyen formátumban, és mit hagyunk ki.</p>
      <h2>Mit ad át a terepi csapat, és mit nem</h2>
      <p>Az alapkimenet mért geometria: illesztett pontfelhő és egy rövid átadási lap. A lap tartalmazza a formátumot, az egységet, a koordinátarendszert, a bejárt tereket és a kizárásokat. Nem tartalmaz kész falat, födémet, gépészeti elemet vagy LOD-ígéretet. A modell csak akkor készül, ha a Scan-to-BIM külön munkacsomag, és abban néven van nevezve, ki modellez és meddig.</p>
      <p>A modellező saját sablonja, családjai és a megrendelő felé vállalt információs igénye nem kerül át hozzánk automatikusan. Ha ezekhez kell igazítani a felmérést, a partner adja meg őket a munka elején. Így nem egy idegen modellkonvencióval találkozik az átadáskor.</p>
      <h2>Amit a modellezés előtt rögzíteni kell</h2>
      <p>Három dolog szokott később vitát okozni, ha a helyszín előtt nincs leírva. Az első a koordinátarendszer és az egység: méter és milliméter keverése, vagy egy elforgatott helyi rendszer, órákig tartó igazítást jelent a szerzői szoftverben. A második a lefedettség: mely szintek, mely homlokzatok, mely gépészeti terek kellenek, és melyik helyiség zárva marad. A harmadik a formátum: E57 a nyílt átadás, de ha a csapat ReCap- vagy más Autodesk-munkafolyamatban dolgozik, az exportot előre kell kérni.</p>
      <p>Érdemes megmondani azt is, mire fogják használni az anyagot. Ütközésvizsgálathoz, felújítási döntéshez, mennyiségi közelítéshez vagy egy meglévő állapot dokumentálásához nem ugyanaz a sűrűség és nem ugyanaz az ellenőrzés kell. A felhasználás nélkül a „legyen minél részletesebb” kérés nem specifikáció.</p>
      <h2>Lefedettség, nem egyetlen szám</h2>
      <p>A modellező jogosan kérdezi meg, mennyire támaszkodhat egy felületre. Erre nem egy általános pontossági címke a válasz. Egy közeli, jól látott sík és egy távoli, takart gépészeti vezeték nem ugyanabban a helyzetben van. Ahol a brief szűkebb tűrést kér, ott megnevezzük az ellenőrzést: ismert távolság, illesztési maradék, vagy a partner által adott alappont. Ahol a tér csak tájékoztató szinten kellett, azt is leírjuk.</p>
      <p>A takart szerkezetet nem találjuk ki. Egyoldalról látott fal vastagsága, álmennyezet feletti légtechnika vagy bútorral takart lábazat csak akkor mért adat, ha ténylegesen látszott. Ami feltételezés, az nem kerülhet a pontfelhő helyére mérésként.</p>
      <h2>Amikor a felmérés megáll</h2>
      <p>Ha a helyszínen nincs kísérő, a gépsor üzemel, vagy egy szint nem nyitható, a munkát nem erőltetjük végig „teljes épület” felirattal. A kimaradó részt kizárásként rögzítjük, és jelezzük, kell-e második kiszállás. Ez kiszámíthatóbb, mint egy lyukas állomány, amiről utólag derül ki, hogy a modellező arra a zónára épített volna.</p>
      <p>Ugyanígy megállunk, ha a kimenet a helyszínen változik meg: ha a pontfelhő helyett hirtelen teljes modellt kérnek, az új scope, nem a meglévő felmérés hallgatólagos bővítése.</p>
      <h2>Hogyan illeszkedik a saját sablonjához</h2>
      <p>A jó átadás úgy érkezik, hogy a modellező a saját szoftverében meg tudja nyitni, a tengelyek stimmelnek a kapott leírással, és a jegyzőkönyvből látja, hol szabad modell elemet rátenni és hol nem. Ehhez a felmérési brief a modellező nyelvén készül: szintnevek, rácsok, ha vannak, formátum, egység, kizárás. A terepi munka ezekhez igazodik, nem fordítva.</p>
      <p>Ha bizonytalan, milyen átadás fér bele a saját környezetébe, előbb <a href="/minta-anyagok">minta-anyagot</a> érdemes kérni, és csak utána rögzíteni a projekt specifikációját. A minta nem helyettesíti a briefet, de megmutatja a formátumot, mielőtt egy egész épület állománya elkészül.</p>
    `,
  },
  {
    slug: 'pontfelho-ifc-es-revit',
    path: '/cikkek/pontfelho-ifc-es-revit',
    title: 'Pontfelhő, IFC és Revit: mire való mindegyik?',
    description:
      'A pontfelhő mért geometria, a Revit és az Archicad szerzői környezet, az IFC pedig csere. Összekeverésük hibás átadáshoz vezet.',
    published: '2026-11-09',
    kicker: 'Formátum',
    html: `
      <p>Egy felmérési egyeztetésen gyakran hangzik el egymás után a pontfelhő, az IFC és a Revit, mintha ugyanannak a dolognak három neve lenne. Nem az. Ha a brief ezeket felcseréli, a terepi csapat és a modellező más-más fájlt vár az átadáskor.</p>
      <h2>A pontfelhő mért geometria</h2>
      <p>A pontfelhő a helyszínen rögzített pontok halmaza. Lehet több álláspontból illesztve, lehet strukturált vagy egységesített, lehet E57-ben vagy a partner eszközéhez exportálva. Nem fal, nem ajtó, nem berendezés. Nem tudja önmagában, melyik pont tartozik egy szerkezethez, és nem hordoz családot, fázist vagy ütemet.</p>
      <p>Modellezéshez ez az alapanyag. Ütközésvizsgálatnál referenciaként is megállhat, ha a szerzői szoftver be tudja tölteni. A minősége az illesztéstől, a lefedettségtől és a zajtól függ, nem attól, hogy utána milyen modell készül belőle.</p>
      <h2>A Revit és az Archicad szerzői környezet</h2>
      <p>A Revit és az Archicad abban erős, amiben egy pontfelhő nem: szintek, rácsok, elemtípusok, nézetek, a tervezőiroda saját sablonja. Magyarországi irodák jelentős része Archicadben modellez, mások Revitben. A terepi átadásnak ehhez kell igazodnia, de a felmérés önmagában nem Archicad- és nem Revit-fájl.</p>
      <p>Ha a partner a saját környezetében modellez, a kért kimenet a pontfelhő és az átadási lap. Ha azt kéri, hogy mi modellezzünk, az már Scan-to-BIM: meg kell nevezni a szoftvert, a sablont, ha adnak ilyet, és hogy mely elemek készüljenek el. A kettő nem cserélhető fel egy mondattal a megbízás végén.</p>
      <h2>Az IFC csere, nem felmérési formátum</h2>
      <p>Az IFC épületelem-adatok cseréjére való sémák együttese. Ajtót, falat, tulajdonságkészletet tud vinni két szerzői rendszer között, a fogadó szoftver korlátaival. Pontfelhőt nem helyettesít. Egy IFC, amiben nincsenek a mért felületek, nem alkalmas arra, hogy a modellező ellenőrizze a modellt a helyszínhez képest.</p>
      <p>Ezért egy vegyes munkában a pontfelhő marad a felmérés hiteles geometriai nyoma, az IFC pedig csak akkor kerül az átadásba, ha modell is készült, és a felek a csereformátumot külön kérték. Az IFC verzióját és a fogadó szoftvert ilyenkor ugyanúgy rögzíteni kell, mint az E57 egységét.</p>
      <h2>Melyiket kérje a briefben</h2>
      <p>Ha a modellezés a partnernél marad, a brief középpontja az E57 vagy az egyeztetett pontfelhő-export, a koordinátarendszer, az egység és az ellenőrzési jegyzőkönyv. Ha a modell is a megbízás része, külön sor a szerzői szoftver és külön sor az, ami csak felhőben marad: például egy zsúfolt gépház, ahol az elemek szétválasztása nem egyértelmű.</p>
      <p>A „mindent adjunk át minden formátumban” kérés lassú és félrevezető. Minden további export munka, és egy rosszul beállított második fájl ellentmondhat az elsőnek. Kevesebb, néven nevezett kimenet jobb, mint egy könyvtár, amiben senki nem tudja, melyik a mérvadó.</p>
      <h2>Tipikus keveredés</h2>
      <p>A leggyakoribb hiba, hogy a megrendelő IFC-t kér, a modellező Revitben dolgozna, a felmérés pedig egy helyi, dokumentálatlan koordinátában készül el. A három fájl technikailag megszülethet, mégis használhatatlan együtt. A másik tipikus hiba az egység: a felhő méterben van, a projekt milliméterben, és a modell „majdnem” jó helyen ül, csak éppen ezerszeres eltéréssel.</p>
      <p>Ezek a hibák a helyszínen már nem látszanak. Az átadási specifikációban igen. Ezért kérjük a projektigényben a szoftvert, a formátumot és a koordinátarendszert akkor is, ha a válasz még az, hogy egyeztetni kell.</p>
    `,
  },
  {
    slug: 'hogyan-zajlik-egy-scan-to-bim-egyuttmukodes',
    path: '/cikkek/hogyan-zajlik-egy-scan-to-bim-egyuttmukodes',
    title: 'Hogyan zajlik egy Scan-to-BIM együttműködés?',
    description:
      'A Scan-to-BIM akkor tiszta, ha előre rögzítjük, ki modellez, milyen szoftverben, mely elemekre, és mi marad pontfelhő.',
    published: '2026-11-09',
    kicker: 'Együttműködés',
    html: `
      <p>A Scan-to-BIM kifejezés a domain nevében is szerepel, ezért fontos tisztán beszélni róla. Nálunk nem az a kiinduló ajánlat, hogy minden felmérés végén modellt adunk. A kiinduló ajánlat a terepi felmérés és a pontfelhő. A modell akkor készül, ha a partner ezt külön kéri, és a munkacsomag határai írásban megvannak.</p>
      <h2>A Scan-to-BIM nem jár automatikusan</h2>
      <p>Egy épületfelmérés lezárható úgy, hogy a modellező csapat a saját Revit- vagy Archicad-sablonjában dolgozik tovább a kapott felhőn. Ez a gyakoribb és tisztább felállás, ha az irodának megvan a modellfelelőse. Ilyenkor a mi átadásunk a felhő, az illesztés dokumentálása és a kizárások listája.</p>
      <p>Ha a partner a modellezést is ki akarja szervezni, az új megbízás. Más a vállalt idő, más a felelősség, és más az, amin később észrevételt lehet tenni. A felmérés árából nem következik modell, és a modell árából nem következik korlátlan tervezési átdolgozás.</p>
      <h2>Ki modellez</h2>
      <p>Két működő mód van. Az elsőben a partner modellez, mi a terepi anyagot adjuk a saját folyamatához. A másodikban mi modellezünk egy körülhatárolt elemkörre, a partner sablonjához igazodva, ha azt átadják. A kettő keveréke is lehet: például a tartószerkezet és az építészet a partnernél marad, egy gépház pedig nálunk készül, mert arra kértek külön csomagot.</p>
      <p>Amit nem vállalunk el hallgatólagosan: a partner megrendelője felé tett tervezési ígéretek átvétele, hatósági beadás, és olyan elemek modellezése, amelyek a pontfelhőből nem olvashatók ki. A látszó felület és a feltételezett vastagság nem ugyanaz.</p>
      <h2>Amit a munka előtt írásba foglalunk</h2>
      <p>A munkacsomag legalább ezeket nevezi meg: szerzői szoftver és verzió, ha releváns; szintek és a modellezendő zónák; elemtípusok, amelyek elkészülnek, és amelyek csak felhőben maradnak; a partner osztályozása vagy saját névkonvenciója, ha van; a koordinátarendszer; az észrevételek köre. Uniclass vagy más rendszer csak akkor kerül bele, ha a partner ezt kéri. Nem vezetünk be új osztályozást a modell közepén.</p>
      <p>A mintaterület hasznos, mielőtt egy teljes épület modellezése elindul. Egy tipikus szint vagy egy jellemző gépház megmutatja, hogyan kezeljük a takart éleket és a zajos felületeket. Ezen a mintán olcsóbb vitatkozni, mint a kész állományon.</p>
      <h2>Mintaterület, aztán a teljes épület</h2>
      <p>A mintán rögzítjük, mi számít elfogadott elemnek. Például egy fal a látott síkokból épül, a vastagságát csak ott adjuk meg, ahol mindkét oldal mért, különben a hiányt jelöljük. Egy gépészeti vezetéket csak ott választunk szét elemre, ahol a felhő ezt ténylegesen mutatja. Ahol a nyomvonal egybeolvad, ott a felhő marad a hivatkozás, nem egy kitalált tengely.</p>
      <p>Ha a minta után a szabály változik, a változást a további szintekre írjuk elő, a már elfogadott mintát nem írjuk újra észrevétel nélkül. Így a munka követhető marad mindkét félnek.</p>
      <h2>Átadás és észrevétel</h2>
      <p>A modell mellé ott marad a pontfelhő. A modellező vagy a partner a felhőhöz tudja hasonlítani az elemeket, nem egy levált, önálló fájlhoz. Az észrevétel konkrét: melyik szint, melyik elem, mi az eltérés a felhőtől vagy a briefben rögzített szabálytól. A „legyen szebb” nem feldolgozható észrevétel.</p>
      <p>A javítási kör a munkacsomag része, nem végtelen. Tervezési változtatás, új funkció vagy a megrendelői igény módosulása nem a felmérés hibája. Ezeket külön egyeztetjük, árat az űrlap akkor sem ad, ha a modell már folyamatban van.</p>
    `,
  },
  {
    slug: 'milyen-adatok-kellenek-egy-jo-felmeresi-briefhez',
    path: '/cikkek/milyen-adatok-kellenek-egy-jo-felmeresi-briefhez',
    title: 'Milyen adatok kellenek egy jó felmérési briefhez?',
    description:
      'A használható brief megmondja a helyszínt, a döntést, a formátumot, a koordinátát és a kizárásokat. Enélkül árat sem lehet felelősen adni.',
    published: '2026-11-09',
    kicker: 'Brief',
    html: `
      <p>A felmérési brief nem hosszú tanulmány. Egy olyan lap, amiből a terepi munka és az átadás ugyanazt a feladatot látja, mint a modellező. Ha ez a lap hiányos, az ajánlat vagy túl tág lesz, vagy olyan kimenetet ígér, amit a helyszínen nem lehet teljesíteni. Ezért nem adunk árat egy üres megkeresésre.</p>
      <h2>A helyszín és a hozzáférés</h2>
      <p>Kell a település, az épület vagy az ipari tér jellege, a szintszám nagyságrendje, és hogy a terület üzemel-e. Egy lakott irodaház, egy műemlék lépcsőház és egy működő csarnok nem ugyanaz a kiszállás. Írják le, kell-e kíséret, beléptetés, éjszakai munka vagy leállás. A pontos házszámot az ajánlat előtt is meg lehet adni, de a munka indításához már kell.</p>
      <p>A hozzáférés része a kizárás is. Ha egy szárny bérlő miatt zárva van, vagy egy gépsor mögé nem lehet állni, azt a briefben előre jelezni őszintébb, mint a helyszínen deríteni ki. A kimaradó zóna így az árban és a lefedettségben is megjelenik.</p>
      <h2>A döntés, amihez az adat kell</h2>
      <p>A leghasznosabb mondat a briefben az, hogy mire fogják használni az anyagot a következő két hónapban. Felújítási koncepció, gépészeti ütközés, homlokzati csomópont vagy egy teljes as-built modell más-más sűrűséget és más dokumentációt kér. Ha ez még nincs eldöntve, azt is írják le. Ilyenkor a kimenetet együtt szűkítjük, és nem találunk ki egy „általános BIM-et”.</p>
      <p>Ide tartozik az is, ki a fogadó. A modellező csapat, a generáltervező vagy a kivitelező BIM-felelőse más fájlt tud megnyitni, és más kérdést tesz fel az ellenőrzéskor. A brief a fogadót nevezi meg, nem csak a megrendelő cégét.</p>
      <h2>Formátum, koordináta, egység</h2>
      <p>Legalább egy mondat kell a formátumról. Az E57 a nyílt, szokásos választás. Ha a csapat Revitben vagy Archicadben dolgozik, attól még a felmérés lehet E57, a modell pedig náluk készül. Ha konkrét exportot kérnek, annak a neve kerüljön a lapra. Az egység méter vagy milliméter, leírva. A koordinátarendszer a partner helyi rendszere, EOV vagy relatív helyszíni rendszer, a tengelyek irányával.</p>
      <p>Ha van meglévő rács, szintnév vagy régi terv, csatolják a megbízhatóságával együtt. Egy húszéves alaprajz segíthet a tájékozódásban, de nem mérvadó geometria, amíg a felmérés mást mutat. A briefben ezt külön kell választani: tájékoztató rajz, vagy illesztési alap.</p>
      <h2>Kizárások és meglévő tervek</h2>
      <p>Írják le, mi nem kell. Tető, ami nem járható, álmennyezet feletti tér, bútorozott bérlemény, föld alatti közmű a telken kívül: ezek gyakori, jogos kizárások. A „teljes épület” kifejezés ezek nélkül üres. A jó brief rövidebb attól, hogy a felesleget kiveszi, nem hosszabb.</p>
      <p>A pontossági igényt is a felhasználáshoz kössék, ne egyetlen szóhoz. Ha egy zónában szűkebb tűrés kell, nevezzék meg a zónát és azt, mihez ellenőrizzünk. A többi területen elég a modellezési döntéshez szükséges lefedettség. Ezt a különbséget az átadási lapon is megtartjuk.</p>
      <h2>Átadás és ütem</h2>
      <p>Kell egy reális ütem: mikor járható a helyszín, mikor kell a felhő a modellezés indításához, és van-e kemény határidő egy beadási dátum miatt. A fájl várható mérete segít eldönteni az átadás csatornáját. A megjegyzésben elfér a biztonsági oktatás, a fotózási tilalom és az, hogy kell-e minta egy tipikus szintről, mielőtt az egész épület elkészül.</p>
      <p>Ha ezekből több is hiányzik, az űrlapot akkor is be lehet küldeni, a „még egyeztetjük” választással. Ajánlatot ilyenkor nem küldünk ki találgatással. Visszakérdezünk, és a kiegészített briefre adunk írásos ajánlatot. A <a href="/kapcsolat#igeny">projektigény űrlap</a> ezeket a mezőket kéri, fájlt nem tölt fel.</p>
    `,
  },
  {
    slug: 'mikor-erdemes-kiszervezni-a-terepi-felmerest',
    path: '/cikkek/mikor-erdemes-kiszervezni-a-terepi-felmerest',
    title: 'Mikor érdemes kiszervezni a terepi felmérést?',
    description:
      'Akkor érdemes terepi kapacitást kérni, ha a modellező csapat a modellnél hasznos, a helyszíni munka pedig külön ütemben fut.',
    published: '2026-11-09',
    kicker: 'Partneri munka',
    html: `
      <p>A terepi felmérés kiszervezése nem azt jelenti, hogy a modellező iroda lemond a modellről. Épp fordítva: a modell náluk marad, a helyszíni kapacitást pedig akkor kérik, amikor a saját műszer, a saját operátor vagy a saját határidő nem fedi le a futó munkákat. Ez partneri munkamegosztás, nem egy általános „BIM-et készítünk” megbízás.</p>
      <h2>Amikor a modellező csapat a szűk keresztmetszet</h2>
      <p>Ha az iroda modellfelelősei egyszerre több tervezési munkán dolgoznak, a helyszíni nap drága óra. A szkennelés, az illesztés és az átadási lap olyan munka, ami jól leírható specifikációval, és nem igényli, hogy ugyanaz az ember vigye a tervezési döntést is. Ilyenkor a terepi rész kiszervezése felszabadítja a modellezőt arra, amiben a megrendelője őt kéri.</p>
      <p>Ez különösen igaz generáltervezőknél és nagyobb kivitelezőknél, ahol több helyszín fut párhuzamosan, a modellezési szabvány viszont egy kézben van. A felmérésnek ehhez a szabványhoz kell igazodnia, nem egy újabb, idegen modellcsomagot kell behoznia a projektbe.</p>
      <h2>Amikor a saját műszer nem elég kapacitás</h2>
      <p>Egy iroda rendelkezhet szkennerrel, és mégis kiszervezhet egy időszakot: betegség, párhuzamos vidékhelyszínek, vagy egy ipari tér, ahol a helyszíni idő a vártnál hosszabb. A kiszervezés feltétele ilyenkor is a rögzített átadás. Ha a saját csapat E57-et és egy adott helyi koordinátát használ, a külső felmérés ugyanezt adja, nem egy másik szokást.</p>
      <p>Ismétlődő partneri ritmusnál érdemes az első munkánál mintát nézni, és a további helyszíneken ugyanazt az átadási lapot használni. A második és a harmadik épület így nem új találkozó a formátumról, hanem ugyanannak a specifikációnak a következő helyszíne.</p>
      <h2>Amikor nem ezt a megbízást keresi</h2>
      <p>Nem ezt a szolgáltatást keresi, aki földhivatali térképet, kitűzést vagy hatósági záradékolt felmérést szeretne. Azt nem vállaljuk. Nem ezt keresi az sem, akinek még nincs fogadó modellezője, nincs döntés a kimenetről, és egy kész, beadható modellt szeretne határidőre, brief nélkül. Ilyenkor előbb a feladatot kell tisztázni, árat nem adunk a homályra.</p>
      <p>Önálló lakossági „mérjék fel a lakást, mert felújítunk” kérés sem a fő közönségünk. Dolgozunk meglévő épületen, de a megbízó oldalán olyan partnerrel, aki a modellezési munkafolyamatot viszi: BIM-csapat, tervezőiroda, generáltervező, nagyobb kivitelező.</p>
      <h2>Partneri ritmus, nem egyszeri mentés</h2>
      <p>Az egyszeri, sürgős kiszállás is vállalható, ha a specifikáció röviden, de egyértelműen megvan. A kiszámíthatóbb munka mégis a partneri ritmus: ismert átadási lap, ismert szoftver, ismert kizárási lista, és egy kapcsolattartó, aki a helyszíni hozzáférést intézi. Ezt nem keretszerződésként kötjük az oldalon. Az oldal csak a projektigényt fogadja, a megállapodás külön, írásban születik.</p>
      <p>A fizetést, az ütemezést és a második kiszállás szabályát az ajánlat tartalmazza. Automatikus szerződés és online fizetés nincs, mert a helyszín és a kimenet nélkül ezek a tételek nem ellenőrizhetők.</p>
      <h2>Mit tartson meg a partner</h2>
      <p>A partnernél marad a modellezési szabvány, a sablon, a megrendelővel való tervezési kapcsolat és a döntés, hogy egy adott pontfelhőből mit emel modellbe. Nálunk a terepi munka, az illesztés, a minőség-ellenőrzés a briefhez képest, és az átadás a megbeszélt formátumban. Ha a modell egy részét is kérik, az a <a href="/scan-to-bim">Scan-to-BIM együttműködés</a> lapján leírt külön csomag.</p>
      <p>Ez a vágás attól tiszta, hogy mindkét fél látja a határt. A modellező nem kap idegen modellt, amit utólag a saját szabványára kell fordítania. A terepi csapat nem vállal olyat, ami a helyszínen nem volt mérhető.</p>
    `,
  },
  {
    slug: 'hogyan-ellenorizheto-egy-pontfelho-minosege',
    path: '/cikkek/hogyan-ellenorizheto-egy-pontfelho-minosege',
    title: 'Hogyan ellenőrizhető egy pontfelhő minősége?',
    description:
      'Egyetlen középhiba nem elég. Az illesztés, az ismert távolság, a lefedettség és a kizárások együtt mutatják, mire használható a felhő.',
    published: '2026-11-09',
    kicker: 'Ellenőrzés',
    html: `
      <p>Egy pontfelhő minősége nem egy címke a fájlnéven. A modellező akkor tudja használni, ha látja, hol megbízható a geometria, hol zajos, és hol nincs is adat. Ehhez ellenőrzés kell, mégpedig a briefhez képest, nem egy általános jóságérzethez.</p>
      <h2>Ne egyetlen középhibából induljon</h2>
      <p>Az illesztő szoftverek adnak maradékot, középhibát, jelentést. Ezek hasznosak, és az átadási lapra valók, de önmagukban kevesek. Egy szép átlag elfedheti, hogy egyetlen álláspont elforgott, vagy hogy egy távoli homlokzat ritka és zajos. A számot mindig a helyéhez kell kötni: mely álláspontok, mely szintek, milyen átfedéssel.</p>
      <p>Ugyanígy félrevezető egyetlen milliméteres ígéret az egész épületre. A tűrés függ a távolságtól, a beesési szögtől, a felület anyagától és attól, hogy a pont egyáltalán oda esett-e. Ahol a brief szűkebb ellenőrzést kér, ott konkrét vizsgálatot írunk, nem egy mindenre érvényes mondatot.</p>
      <h2>Illesztés, átfedés, ismert távolság</h2>
      <p>Az első kérdés: az álláspontok ugyanabban a rendszerben vannak-e. Átfedő zónában a két álláspont felületei nem eshetnek szét szemmel látható kettős fallá. Ha a partner adott alappontot vagy egy ismert hosszt – két oszlop tengelye, egy nyílászáró gyártási mérete, egy meglévő rács –, azt a felhőn ellenőrizni lehet. Az eltérést leírjuk, nem hallgatjuk el, és nem „igazítjuk szebbre” a mérési nyersanyagot egy kívánt számhoz.</p>
      <p>A koordinátarendszer külön vizsgálandó. A tengelyek iránya, a magasság előjele és az egység a jegyzőkönyvben szerepel. Egy felhő, ami önmagában szépen illesztett, még mindig rossz helyen ülhet a partner Revit- vagy Archicad-projektjében, ha a rendszer leírása hiányzik.</p>
      <h2>Lefedettség a briefhez képest</h2>
      <p>A második kérdés nem az, hogy „szép-e a felhő”, hanem hogy a kért terek benne vannak-e. Végig kell nézni a szinteket, a közlekedőket, a homlokzat kért oldalait és a gépészeti tereket. A lyuk lehet kizárás: zárt helyiség, takarás, biztonsági határ. A lyuk lehet hiba is: kihagyott álláspont. A kettőt az átadási lap választja szét. Ami kizárás, azt nem modellezési alapnak adjuk.</p>
      <p>Sűrűségről zónánként érdemes beszélni. Egy homlokzati tagozat és egy nagy ipari padló nem ugyanazt a pontsűrűséget igényli. A brief mondja meg, hol kell részlet, és hol elég a térbeli váz a modellezési döntéshez. Az ellenőrzés ezt a kérést nézi, nem egy minden felületre kiírt azonos számot.</p>
      <h2>Zaj, lyuk, kizárás</h2>
      <p>Üveg, fényes fém, nedves padló és mozgó ember zajt vagy lyukat hagy. Ezt a jegyzőkönyvben jelezni kell, különösen ott, ahol a modellező éléket szeretne szerkeszteni. A zajos felületből húzott vonal bizonytalanabb, mint egy nyugodt, közelről mért sík. Ha egy ilyen él mégis fontos, azt a briefben előre meg kell nevezni, és a helyszíni munkát ehhez kell igazítani: más álláspont, más időpont, vagy a kizárás vállalása.</p>
      <p>A színes megjelenítés és a panorámakép csak akkor része az átadásnak, ha kérték. A modellezéshez sokszor az intenzitás és a geometria elég. Egy látványos kép nem javítja a hiányzó álláspontot.</p>
      <h2>Mit tartalmazzon az ellenőrzési jegyzőkönyv</h2>
      <p>Egy használható jegyzőkönyv rövid. Benne van a formátum és az egység, a koordinátarendszer, az álláspontok kapcsolata és a vizsgált maradék, az ismert távolság eredménye, ha volt ilyen, a bejárt terek, a kizárások, és a zajos vagy takart zónák. Benne van az is, hogy a fájl egyetlen mérvadó export, nem egy könyvtárnyi próbálkozás.</p>
      <p>A modellező ezt a lapot a saját szoftverében tett ellenőrzéssel egészíti ki: metszet a felhőn, egy-két ismert méret, a szintmagasságok összevetése. Ha itt ellentmondást lát, azt az átadás utáni egyeztetésen konkrét helyhez kötve jelzi. A felhő attól még a mérés nyoma marad. Nem írjuk felül azért, hogy egy modell „szebb” legyen, és nem állítjuk, hogy minden helyzetre hibátlan.</p>
    `,
  },
];

function articleBySlug(slug) {
  return ARTICLES.find((article) => article.slug === slug) || null;
}

module.exports = { ARTICLES, articleBySlug };
