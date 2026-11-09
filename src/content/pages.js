const { esc } = require('../util');
const { FAQ, HOME_FAQ } = require('./faq');
const { ARTICLES } = require('./articles');
const { ctaBand } = require('../form');

const PAGES = {
  home: {
    path: '/',
    title: 'Terepi felmérés és pontfelhő BIM-csapatoknak | 3dscantobim.hu',
    description:
      'BIM-modellezőknek és tervezőirodáknak: terepi felmérés, rögzített pontfelhő-átadás. A Scan-to-BIM külön munkacsomag.',
    crumb: 'Főoldal',
  },
  field: {
    path: '/terepi-felmeres',
    title: 'Terepi felmérés épülethez és ipari térhez | 3dscantobim.hu',
    description:
      'Épületfelmérés és ipari, gépészeti terek felmérése modellező partnereknek. A lefedettséget és a kizárásokat a feladat szerint rögzítjük.',
    crumb: 'Terepi felmérés',
  },
  delivery: {
    path: '/pontfelho-atadas',
    title: 'Pontfelhő átadás E57 és egyeztetett formátumban | 3dscantobim.hu',
    description:
      'Az átadás formátumot, egységet, koordinátarendszert és ellenőrzési jegyzőkönyvet jelent. A modell nem jár automatikusan a felhő mellé.',
    crumb: 'Pontfelhő átadás',
  },
  scan: {
    path: '/scan-to-bim',
    title: 'Scan-to-BIM együttműködés, külön munkacsomag | 3dscantobim.hu',
    description:
      'A Scan-to-BIM nem része minden felmérésnek. Ha kérik, a szoftvert, az elemkört és a pontfelhőben maradó részeket előre rögzítjük.',
    crumb: 'Scan-to-BIM',
  },
  partner: {
    path: '/partneri-egyuttmukodes',
    title: 'Partneri együttműködés modellező irodáknak | 3dscantobim.hu',
    description:
      'Terepi kapacitás BIM-csapatoknak, tervezőirodáknak, generáltervezőknek és nagyobb kivitelezőknek, rögzített adatátadással.',
    crumb: 'Partneri együttműködés',
  },
  samples: {
    path: '/minta-anyagok',
    title: 'Minta anyagok és átadási formátumok | 3dscantobim.hu',
    description:
      'Minta-anyag a partner saját szoftveréhez: rövid szemelvény és formátumjegyzet, nem teljes épület és nem azonnali ár.',
    crumb: 'Minta anyagok',
  },
  process: {
    path: '/folyamat',
    title: 'Hogyan zajlik a terepi együttműködés | 3dscantobim.hu',
    description:
      'Specifikáció, helyszíni felmérés, feldolgozás, majd átadás a megbeszélt formátumban. Hiányos briefre nem adunk találgatott árat.',
    crumb: 'Folyamat',
  },
  pricing: {
    path: '/arak',
    title: 'Árazási logika felmérési projekthez | 3dscantobim.hu',
    description:
      'Az árat a helyszín, a hozzáférés, a kimenet és az ütem együtt adja. Nincs kalkulátor és nincs azonnali ár hiányos specifikációra.',
    crumb: 'Árak',
  },
  faq: {
    path: '/gyik',
    title: 'Gyakori kérdések a pontfelhő-átadásról | 3dscantobim.hu',
    description:
      'Scan-to-BIM, formátum, koordinátarendszer, pontosság és az, amit nem vállalunk. Rövid válaszok modellező partnereknek.',
    crumb: 'GYIK',
  },
  contact: {
    path: '/kapcsolat',
    title: 'Projektigény és kapcsolat | 3dscantobim.hu',
    description:
      'Küldje el a felmérési specifikációt, vagy kérjen minta-anyagot. A projektigényt rögzítjük, árat a hiányos adatokra nem ígérünk.',
    crumb: 'Kapcsolat',
  },
  privacy: {
    path: '/adatvedelem',
    title: 'Adatkezelési tájékoztató | 3dscantobim.hu',
    description:
      'Hogyan kezeli a 3dscantobim.hu a projektigény űrlapján megadott partneri adatokat. Az adatkezelő azonosítása a tájékoztatóban szerepel.',
    crumb: 'Adatvédelem',
  },
  impressum: {
    path: '/impresszum',
    title: 'Impresszum | 3dscantobim.hu',
    description:
      'A 3dscantobim.hu szolgáltatójának azonosító adatai és elérhetősége. Az üzemeltető adatai az ÁSZF-ben is szerepelnek.',
    crumb: 'Impresszum',
  },
  terms: {
    path: '/aszf',
    title: 'ÁSZF, üzemeltető adatai | 3dscantobim.hu',
    description:
      'A 3dscantobim.hu üzemeltetőjének azonosító adatai. A projektigény elküldése nem hoz létre szerződést.',
    crumb: 'ÁSZF',
  },
  articles: {
    path: '/cikkek',
    title: 'Tudnivalók modellező partnereknek | 3dscantobim.hu',
    description:
      'Cikkek a terepi felmérésről, a pontfelhő ellenőrzéséről, az IFC és a Revit szerepéről, valamint a Scan-to-BIM együttműködésről.',
    crumb: 'Tudnivalók',
  },
  thanks: {
    path: '/koszonjuk',
    title: 'A projektigényt rögzítettük | 3dscantobim.hu',
    description: 'A felmérési specifikáció beérkezett. Ajánlatot a hiányzó adatok tisztázása után küldünk.',
    crumb: 'Visszaigazolás',
  },
};

function faqList(items) {
  return `<div class="faq-list">${items
    .map(
      (item) => `<details>
        <summary>${esc(item.q)}</summary>
        <div><p>${esc(item.a)}</p></div>
      </details>`
    )
    .join('')}</div>`;
}

function figure(src, alt, caption) {
  return `<figure class="plate">
    <img src="${src}" alt="${esc(alt)}" width="960" height="540">
    <figcaption>${esc(caption)}</figcaption>
  </figure>`;
}

function pageHead(kicker, title, lede) {
  return `<header class="page-head wrap">
    <p class="kicker">${esc(kicker)}</p>
    <h1>${esc(title)}</h1>
    <p class="lede">${esc(lede)}</p>
  </header>`;
}

function renderHome({ formHtml }) {
  return `
  <section class="hero">
    <div class="wrap hero-grid">
      <div>
        <p class="kicker">Partneri terepi kapacitás</p>
        <h1>Terepi felmérés és pontfelhő a saját modellezési munkafolyamatához</h1>
        <p class="lede">BIM-modellező csapatoknak és tervezőirodáknak, rögzített átadási specifikációval.</p>
        <p class="offer">Ön modellez. Mi biztosítjuk a terepi felmérést és az egyeztetett pontfelhő-alapanyagot.</p>
        <div class="actions">
          <a class="btn" href="#specifikacio">Küldje el a felmérési specifikációt</a>
          <a class="btn btn-ghost" href="/kapcsolat?igeny=minta#igeny">Kérjen minta-anyagot</a>
        </div>
      </div>
      <aside class="titleblock" aria-label="Átadási lap, röviden">
        <header>
          <span>Átadási lap</span>
          <span>3dscantobim</span>
        </header>
        <dl>
          <dt>Kimenet</dt><dd>egyeztetett pontfelhő</dd>
          <dt>Formátum</dt><dd>E57 vagy a partner szoftvere</dd>
          <dt>Koordináta</dt><dd>a briefben rögzített rendszer</dd>
          <dt>Ellenőrzés</dt><dd>lefedettség, illesztés, kizárás</dd>
          <dt>Modell</dt><dd>csak külön Scan-to-BIM megbízásra</dd>
        </dl>
      </aside>
    </div>
  </section>
  <section class="statement">
    <div class="wrap">
      <p>Rögzített átadási specifikáció, partneri együttműködés, kiszámítható terepi munka.</p>
    </div>
  </section>
  <section class="section">
    <div class="wrap">
      <h2>Miben kérhet terepi kapacitást</h2>
      <p class="lede">A közönség BIM-modellező csapat, építészeti vagy mérnöki tervezőiroda, generáltervező és nagyobb kivitelező. A modellfelelősség náluk marad, hacsak a modellezést külön csomagban nem kérik.</p>
      <div class="cards">
        <article class="card">
          <p class="index">01</p>
          <h3>Épületfelmérés és pontfelhő</h3>
          <p>Meglévő épület bejárása a modellezéshez kért szintekre és homlokzatokra. Az átadás a felhő és a lefedettség leírása, nem egy általános „BIM modell készül” ígéret.</p>
          <p><a href="/terepi-felmeres">A terepi felmérés</a></p>
        </article>
        <article class="card">
          <p class="index">02</p>
          <h3>Ipari és gépészeti tér felmérés</h3>
          <p>Csarnok, gépház, üzemelő tér. A hozzáférés, a leállás és a takart zónák a specifikáció része. Amit nem lehetett bejárni, azt kizárásként írjuk.</p>
          <p><a href="/terepi-felmeres#ipari-gepeszet">Ipari és gépészeti tér</a></p>
        </article>
        <article class="card">
          <p class="index">03</p>
          <h3>Scan-to-BIM együttműködés</h3>
          <p>A Scan-to-BIM modell külön, egyeztetett szolgáltatás, nem része automatikusan minden felmérési megbízásnak. A szoftvert és az elemkört előre rögzítjük.</p>
          <p><a href="/scan-to-bim">A modellezési együttműködés</a></p>
        </article>
      </div>
    </div>
  </section>
  <section class="section band">
    <div class="wrap">
      <h2>Hogyan dolgozunk</h2>
      <ol class="steps">
        <li><strong>1. Feladat és kimenet egyeztetése</strong> A briefből látszik a helyszín, a formátum, a koordináta és az, ami nem kell.</li>
        <li><strong>2. Helyszíni terepi felmérés</strong> A bejárható területen, a megbeszélt ütemben. A zárt vagy veszélyes zóna nem „teljes épület”.</li>
        <li><strong>3. Feldolgozás és minőség-ellenőrzés</strong> Illesztés, a briefhez kötött ellenőrzés, kizárások. Nem egyetlen, mindenre kimondott szám.</li>
        <li><strong>4. Adatátadás a megbeszélt formátumban</strong> A mérvadó fájl és az átadási lap. A modell csak akkor, ha külön kért munkacsomag.</li>
      </ol>
    </div>
  </section>
  <section class="section">
    <div class="wrap">
      <h2>Kimenet, amit egyeztetünk</h2>
      <div class="cards">
        <article class="card">
          <h3>E57 vagy más pontfelhő formátum</h3>
          <p>Az E57 a szokásos nyílt átadás. Más export csak akkor készül, ha a partner szoftvere ezt a briefben kéri, és az egység le van írva.</p>
          <p><a href="/pontfelho-atadas">Az átadás rendje</a></p>
        </article>
        <article class="card">
          <h3>Ellenőrzött felmérési dokumentáció</h3>
          <p>Rövid jegyzőkönyv: koordinátarendszer, bejárt terek, illesztés, ismert távolság ha volt, és a kizárások. Nem hatósági záradék.</p>
          <p><a href="/cikkek/hogyan-ellenorizheto-egy-pontfelho-minosege">Hogyan ellenőrizhető</a></p>
        </article>
        <article class="card">
          <h3>Egyeztetett Scan-to-BIM munkacsomag</h3>
          <p>Szoftver, elemkör, és ami pontfelhőben marad. A partner sablonjához igazodik, ha azt átadják. Tervezési döntést nem veszünk át.</p>
          <p><a href="/scan-to-bim">Mikor külön csomag</a></p>
        </article>
      </div>
      ${figure(
        '/images/hely-atadas.svg',
        'Helyőrző rajz egy átadási csomaghoz. A keretbe később valós minta vagy projektkép kerül.',
        'Helyőrző. Ide valós átadási szemelvény vagy projektkép kerül, nem kész eredményként mutatjuk.'
      )}
    </div>
  </section>
  <section class="section band" id="specifikacio">
    <div class="wrap">
      <h2>Partneri projektigény</h2>
      <p class="lede">Írja le a helyszínt és a kért kimenetet. Ha egy mező még nincs eldöntve, válassza az egyeztetést. Azonnali árat így sem adunk.</p>
      ${formHtml}
    </div>
  </section>
  <section class="section">
    <div class="wrap trust">
      <p>A terepi munkát és az átadást a rögzített specifikáció szerint végezzük. Nem vállalunk földhivatali vagy hatósági záradékolást, és nem állítjuk, hogy minden helyszíni helyzet ugyanazzal a módszerrel lezárható.</p>
    </div>
  </section>
  <section class="section band">
    <div class="wrap">
      <h2>Gyakori kérdések</h2>
      ${faqList(HOME_FAQ)}
      <p class="section-link"><a href="/gyik">Az összes kérdés</a></p>
    </div>
  </section>`;
}

function renderField() {
  return `
  ${pageHead(
    'Terepi felmérés',
    'Terepi felmérés a modellező partner saját folyamatához',
    'A helyszíni munka akkor kiszámítható, ha előtte megvan, mely tereket mérjük, milyen rendszerben adjuk át, és mi marad ki.'
  )}
  <div class="wrap prose">
    ${figure(
      '/images/hely-epulet.svg',
      'Helyőrző rajz egy épületfelmérés helyszínéhez. A keretbe később valós projektfotó kerül.',
      'Helyőrző egy épületfelmérés fotójának. A keret nem valós megbízás képe.'
    )}
    <p>Épületfelmérést és ipari tér felmérést olyan partnereknek végzünk, akik a kapott pontfelhőt a saját BIM-munkafolyamatukban használják. A bejárás előtt egyeztetjük a szintet, a homlokzatot, a gépészeti teret és azt a döntést, amihez az adat kell. A „teljes épület” kifejezést csak akkor használjuk, ha a kizárások listája üres, és a hozzáférés ezt ténylegesen lehetővé teszi.</p>
    <h2>Épületfelmérés</h2>
    <p>Lakóépületnél, irodánál, középületnél és műemléki szerkezetnél a modellező jellemzően szinteket, nyílásokat, falvastagságot és a közlekedőket keresi. Ezek közül csak az a mért, ami látszott. Egyoldalról látott fal, bútorral takart lábazat vagy lezárt bérlemény nem kap utólag kitalált geometriát. Ha a partner régi alaprajzot ad, azt tájékoztatónak vesszük, amíg a felmérés mást nem mutat.</p>
    <p>A helyszíni idő függ a szintszámtól, a bútorozottságtól és attól, hogy a ház üzemel-e. Üzemelő irodában a kíséret és a munkaidő a brief része. Ezek nélkül a lefedettség szűkebb lesz, és ezt az átadáskor leírjuk, nem utólag magyarázzuk.</p>
    <h2 id="ipari-gepeszet">Ipari és gépészeti tér</h2>
    ${figure(
      '/images/hely-ipar.svg',
      'Helyőrző rajz egy ipari vagy gépészeti tér felméréséhez. A keretbe később valós projektfotó kerül.',
      'Helyőrző egy ipari tér fotójának. A keret nem valós megbízás képe.'
    )}
    <p>Csarnokban és gépházban a nehézség ritkán a négyzetméter. A működő berendezés, a biztonsági távolság, a hő, a leállási ablak és a takart vezeték határozza meg, mit lehet álláspontból látni. A briefben jelezni kell, kell-e kíséret, éjszakai munka vagy a technológia rövid leállása. Szétszerelést nem végzünk.</p>
    <p>Gépészeti térben a modellező gyakran ütközést nézne. Ehhez a látható nyomvonal és a nagy berendezések felülete ad támpontot. Ahol a vezetékek egybeolvadnak, vagy a szigetelés takarja a kötést, ott a felhő marad a hivatkozás. Elemekre bontás csak a külön Scan-to-BIM csomagban, és csak a látható részen vállalható.</p>
    <h2>Amit a kiszállás előtt rögzítünk</h2>
    <ul>
      <li>a bejárandó szintek és a kültér kért oldalai</li>
      <li>a koordinátarendszer és az egység</li>
      <li>a formátum, jellemzően E57, vagy a partner szoftveréhez kért export</li>
      <li>a hozzáférés, a kíséret és a munkaidő</li>
      <li>a kizárások: zárt szárny, tető, álmennyezet feletti tér, üzemelő gépsor</li>
    </ul>
    <p>A pontossági igényt ugyanitt, a felhasználáshoz kötjük. Egy homlokzati csomóponthoz kért szűkebb ellenőrzés nem terjed ki automatikusan a pincére. A vizsgálat módját – ismert távolság, a partner alappontja, illesztési maradék – a jegyzőkönyv írja le.</p>
    <div class="note">
      <p>Nem vállalunk földhivatali térképet, kitűzést és hatósági záradékolást. Rejtett szerkezetet bontás nélkül nem állítunk helyre. Ha a helyszín a megbeszéltnél szűkebben járható, a munkát a tényleges lefedettséggel zárjuk, vagy külön egyeztetünk második kiszállást.</p>
    </div>
  </div>
  ${ctaBand()}`;
}

function renderDelivery() {
  return `
  ${pageHead(
    'Pontfelhő átadás',
    'Pontfelhő átadás rögzített specifikációval',
    'A fájl csak akkor használható a partner szoftverében, ha mellé van írva a formátum, az egység, a koordináta és a kizárás.'
  )}
  <div class="wrap prose">
    <p>Az átadás nem egy csatolmány név nélkül. A modellezőnek tudnia kell, melyik fájl a mérvadó, milyen egységben van, melyik tengely merre mutat, és hol nincs adat. Ezek nélkül a leggondosabb szkennelés is órákig tartó igazítást okoz Revitben vagy Archicadben.</p>
    <h2>Mit tartalmaz az átadási lap</h2>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Tétel</th><th>Amit rögzítünk</th></tr></thead>
        <tbody>
          <tr><td>Formátum</td><td>Jellemzően E57. Más export csak a briefben megnevezett szoftverhez, egy mérvadó fájllal.</td></tr>
          <tr><td>Egység</td><td>Méter vagy milliméter, leírva. A kettőt nem keverjük egy átadásban.</td></tr>
          <tr><td>Koordináta</td><td>A partner helyi rendszere, EOV vagy relatív helyszíni rendszer, a tengelyek irányával.</td></tr>
          <tr><td>Illesztés</td><td>Az álláspontok kapcsolata és a vizsgált maradék. Egy átlag nem fedi el a széthúzó zónát.</td></tr>
          <tr><td>Lefedettség</td><td>A bejárt terek, és külön a kizárás. A lyuk nem lesz utólag „mért” felület.</td></tr>
          <tr><td>Modell</td><td>Nem része az átadásnak, kivéve ha Scan-to-BIM munkacsomag is készült.</td></tr>
        </tbody>
      </table>
    </div>
    <h2>E57 és a partner saját eszköze</h2>
    <p>Az E57 azért az alap, mert nyílt, és a legtöbb pontfelhő- valamint szerzői szoftver be tudja olvasni. Ha a csapat ReCapben vagy más Autodesk-eszközben dolgozik, az ehhez kért exportot a specifikációban néven nevezzük. A második fájl nem írhatja felül az elsőt észrevétlenül: megmondjuk, melyik a mérvadó.</p>
    <p>Strukturált állomány és egységesített felhő más-más további munkát jelent. Ha a modellezőnek álláspontonként kell a felhő, ezt előre jelezni kell. Egy utólag kért, más szerkezetű export új munka, nem a meglévő átadás hallgatólagos része.</p>
    <h2>Fájlméret és átadás</h2>
    <p>Egy több szintet és homlokzatot tartalmazó felhő könnyen túllép azon, amit e-mailben értelmes elküldeni. Az űrlap ezért nagyságrendet kér. A csatornát – lemez, a partner saját tárhelye vagy más, előre megnevezett mód – az ajánlatban rögzítjük. Jelszót és hozzáférést nem kérünk az űrlapon, és fájlt sem töltünk fel ezen az oldalon.</p>
    <h2>Amit a modellező az átvételkor ellenőriz</h2>
    <p>Érdemes megnyitni a fájlt a saját szoftverben, ellenőrizni az egységet és a tengelyt, majd egy metszeten megnézni az ismert szintet. Ha volt kontrollméret, azt a jegyzőkönyv számmal írja. Az eltérést jelezni lehet, a felhőt nem „szépítjük” egy kívánt modellhez. A részletes szempontok a <a href="/cikkek/hogyan-ellenorizheto-egy-pontfelho-minosege">pontfelhő minőségéről szóló cikkben</a> vannak.</p>
    <div class="note">
      <p>Az átadás nem jogilag hitelesített földmérési munkarész, és nem hatósági dokumentum. A tűrést a konkrét feladathoz írjuk, nem egy minden épületre érvényes mondattal.</p>
    </div>
  </div>
  ${ctaBand()}`;
}

function renderScan() {
  return `
  ${pageHead(
    'Scan-to-BIM',
    'Scan-to-BIM együttműködés, ha a modell is a feladat',
    'A domain neve miatt külön mondjuk: a modell nem az alapcsomag. Akkor készül, ha a szoftvert, az elemkört és a határt előre leírjuk.'
  )}
  <div class="wrap prose">
    <p>A Scan-to-BIM modell külön, egyeztetett szolgáltatás, nem része automatikusan minden felmérési megbízásnak. Sok partnerünk éppen azért keres minket, hogy a terepi munkát levegyük a modellezőiről, a modellt viszont a saját sablonjában tartsa. Ezt támogatjuk. A modellezést csak külön kérésre vesszük a munkába.</p>
    <h2>Ki modellez</h2>
    <p>Ha a partner modellez, az átadásunk a pontfelhő és a jegyzőkönyv. Ha mi modellezünk, megnevezzük a szoftvert: Revit, Archicad vagy IFC-központú átadás. A partner sablonját, családjait és névkonvencióját csak akkor használjuk, ha átadják. Új osztályozást nem vezetünk be a munka közepén.</p>
    <p>Vegyes felállás is lehet. Az építészet a partnernél marad, egy gépház pedig nálunk készül, mert arra kértek csomagot. A határ a zóna és az elemtípus, nem egy laza „a gépészet is legyen benne” mondat.</p>
    <h2>Amit a munkacsomag rögzít</h2>
    <ul>
      <li>szerzői szoftver, és ha kell, a verzió</li>
      <li>szintek, zónák, elemtípusok, amelyek elkészülnek</li>
      <li>ami szándékosan pontfelhőben marad</li>
      <li>koordinátarendszer és egység, ugyanaz, mint a felhőé</li>
      <li>egy mintaterület, mielőtt az egész épület modellezése elindul</li>
      <li>az észrevételek köre: konkrét eltérés a felhőtől vagy a leírt szabálytól</li>
    </ul>
    <p>A mintaterület egy tipikus szint vagy egy jellemző gépház. Itt dől el, hogyan jelöljük a csak egyik oldalról látott falat, és hol nem bontunk elemmé egy egybeolvadt vezetéket. Ezt a szabályt visszük tovább, nem találunk ki szintenként újat.</p>
    <h2>Amit a modell nem vált ki</h2>
    <p>A pontfelhő a mérés nyoma, a modell ennek egy értelmezése. Ahol a geometria takart, a modell vagy jelöli a hiányt, vagy nem készül el az az elem. Nem adunk be hatósági tervet, nem vállaljuk a partner megrendelőjének tervezési programját, és nem végzünk korlátlan átdolgozást, ha a funkció a munka közben változik.</p>
    <p>A folyamat részletesebben a <a href="/cikkek/hogyan-zajlik-egy-scan-to-bim-egyuttmukodes">Scan-to-BIM együttműködésről szóló cikkben</a> olvasható. Árat erre a csomagra is csak a leírt elemkör után adunk.</p>
  </div>
  ${ctaBand()}`;
}

function renderPartner() {
  return `
  ${pageHead(
    'Partneri együttműködés',
    'Terepi kapacitás annak az irodának, aki modellez',
    'BIM-csapatoknak, tervezőirodáknak, generáltervezőknek és nagyobb kivitelezőknek, ismételhető átadással.'
  )}
  <div class="wrap prose">
    <p>A megkülönböztetés nem egy hangzatos módszernév. Az a munka, amikor a modellező partner előre megmondja a kimenetet, mi ahhoz mérünk, és az átadás ugyanazzal a lappal érkezik a következő helyszínen is. Nem versenyzünk a partner modelljéért. A tervezési kapcsolat a megrendelőjével nála marad.</p>
    <h2>Kinek való</h2>
    <p>Annak a BIM-modellező csapatnak, amelyik a saját Revit- vagy Archicad-sablonját viszi, és a helyszíni napokat nem tudja vagy nem akarja a modell mellett felvállalni. Annak a generáltervezőnek, akinél több szakág várja ugyanazt a meglévő állapotot. Annak a nagyobb kivitelezőnek, akinek a BIM-felelőse a helyszíni eltérést a modellhez akarja kötni, de a felmérést nem a saját létszámából oldja meg.</p>
    <p>Nem az a fő út, ha valaki kész, beadható modellt keres brief nélkül, vagy hatósági záradékolt felmérést szeretne. Ezeket az első levélben jelezzük, hogy ne fusson felesleges kört egyik fél sem.</p>
    <h2>Amit a partnertől kérünk</h2>
    <ul>
      <li>egy kapcsolattartó, aki a helyszín hozzáférését intézi</li>
      <li>a fogadó szoftver és a kért formátum</li>
      <li>a koordinátarendszer, vagy az, hogy relatív rendszer elég</li>
      <li>a kizárások és a felhasználás: ütközés, felújítás, dokumentálás</li>
      <li>ismétlődő munkánál ugyanaz az átadási lap, nem minden épületnél új szokás</li>
    </ul>
    <p>Az első közös munkánál a <a href="/minta-anyagok">minta-anyag</a> segít, hogy a formátum a partner gépén megnyíljon, mielőtt egy nagy állomány elkészül. A további helyszínek erre a mintára és a briefre épülnek. Keretszerződést az oldal nem köt. Minden megbízás írásos ajánlat és külön megállapodás.</p>
    <h2>Amit mi tartunk stabilan</h2>
    <p>A terepi munkát a leírt lefedettségre szervezzük, az illesztést és a kizárásokat dokumentáljuk, és a mérvadó fájlt nevesítjük. Ha a helyszín szűkebb, azt még az átadás előtt jelezzük, nem egy csendes lyukkal. A Scan-to-BIM-et nem csúsztatjuk bele a felmérésbe. Ha kell, külön csomagként, látható határral kerül az ajánlatba.</p>
  </div>
  ${ctaBand()}`;
}

function renderSamples() {
  return `
  ${pageHead(
    'Minta anyagok',
    'Minta-anyag a saját szoftveréhez, mielőtt az egész épület elkészül',
    'Rövid szemelvény és formátumjegyzet. Nem teljes felmérés, nem referencia-lista, és nem ár.'
  )}
  <div class="wrap prose">
    ${figure(
      '/images/hely-minta.svg',
      'Helyőrző rajz egy minta-anyag formátumjegyzetéhez. A keretbe később valós szemelvény kerül.',
      'Helyőrző a minta-anyag képének. Konkrét projekt eredményét nem helyettesíti.'
    )}
    <p>A minta arra való, hogy a modellező a saját gépén lássa: az E57 vagy a kért export megnyílik, az egység stimmel, a tengely a jegyzet szerint áll. Egy idegen nézőprogramban készült látványkép ezt nem bizonyítja. Ezért a mintát a partner szoftveréhez kérjük, nem egy általános galériához.</p>
    <h2>Mi van egy mintában</h2>
    <ul>
      <li>rövid pontfelhő-szemelvény, nem egy teljes épület állománya</li>
      <li>a formátum, az egység és a koordináta leírása</li>
      <li>egy példa arra, hogyan néz ki a kizárás jelölése az átadási lapon</li>
      <li>ha a Scan-to-BIM is kérdés, egy mondat arról, mi maradt csak felhő</li>
    </ul>
    <p>A mintához nem tartozik ügyfélnév, és nem állítjuk, hogy egy korábbi munka minden részlete nyilvános. A képek az oldalon addig helyőrzők, amíg ide saját, publikálható szemelvény nem kerül. A keret aláírása ezt jelzi, hogy ne lehessen kész projektfotónak nézni.</p>
    <h2>Amit a minta nem válaszol meg</h2>
    <p>A minta nem mond árat, nem ígér határidőt egy konkrét címre, és nem helyettesíti a briefet. Két épület ugyanabban a formátumban is más munka, ha az egyik üres iroda, a másik pedig üzemelő csarnok. A minta után a <a href="/kapcsolat?igeny=minta#igeny">projektigényt</a> a helyszínnel és a kimenettel együtt érdemes elküldeni. Az űrlap a minta kérésére előre kitölti a projekt típusát, a többi mező a partneré.</p>
    <h2>Formátumok, amelyekről beszélünk</h2>
    <p>Az alap az E57. Revit-munkafolyamathoz egyeztetett Autodesk-export is kérhető. Archicadben a felhő jellemzően a pontfelhő-kezelőn keresztül érkezik, nem natív modellként. IFC-t mintafelhő helyett nem küldünk: az IFC modellcsere, és csak akkor értelmes, ha modellezési csomag is van. A részletes szétválasztás a <a href="/cikkek/pontfelho-ifc-es-revit">pontfelhő, IFC és Revit cikkben</a> van.</p>
  </div>
  ${ctaBand()}`;
}

function renderProcess() {
  return `
  ${pageHead(
    'Folyamat',
    'Hogyan zajlik az együttműködés',
    'Négy lépés a felmérésig, és egy ötödik csak akkor, ha a modell is külön csomag.'
  )}
  <div class="wrap prose">
    <ol class="process">
      <li>
        <h2>Feladat és kimenet egyeztetése</h2>
        <p>A projektigényből látjuk a partnert, a helyszínt, a kért kimenetet, a szoftvert és a koordinátát. Ha ezekből a pontos árhoz kevés van, visszakérdezünk. Nem indulunk el egy „majd a helyszínen kiderül” feladattal, és az űrlap nem küld automatikus ajánlatot.</p>
      </li>
      <li>
        <h2>Írásos ajánlat, külön a felmérésre és külön a modellre</h2>
        <p>Az ajánlat a terepi munkát, az átadás formátumát, a kizárásokat és az ütemet tartalmazza. Ha Scan-to-BIM is szóba került, az külön tétel, saját határral. Az ajánlat elfogadása hoz létre megbízást, nem az űrlap elküldése. Fizetési felület az oldalon nincs.</p>
      </li>
      <li>
        <h2>Helyszíni terepi felmérés</h2>
        <p>A bejárható területen, a megbeszélt időben, kísérettel, ha a helyszín ezt kéri. A helyszínen kiderülő új zártságot jegyezzük. Ha emiatt a kért lefedettség nem teljesül, még feldolgozás előtt jelezzük, kell-e második kiszállás.</p>
      </li>
      <li>
        <h2>Feldolgozás és minőség-ellenőrzés</h2>
        <p>Illesztjük az álláspontokat, a briefben kért kontrollt elvégezzük, és összeírjuk a kizárásokat meg a zajos zónákat. Amit nem mértünk, azt nem töltjük fel feltételezéssel. A jegyzőkönyv rövid, a modellezőnek szól.</p>
      </li>
      <li>
        <h2>Adatátadás a megbeszélt formátumban</h2>
        <p>A mérvadó fájl és az átadási lap a megbeszélt csatornán megy. A partner a saját szoftverében ellenőriz. Az észrevétel konkrét helyhez és a briefhez kötött. Új formátum vagy új zóna új egyeztetés.</p>
      </li>
      <li>
        <h2>Scan-to-BIM, ha megrendelték</h2>
        <p>Csak a külön munkacsomagban indul. Mintaterület, majd a leírt elemkör, a pontfelhő végig hivatkozás marad. A tervezési program változása nem észrevétel a felmérésen, hanem új feladat.</p>
      </li>
    </ol>
    <p>A lépések részletesebben a <a href="/cikkek/milyen-adatok-kellenek-egy-jo-felmeresi-briefhez">felmérési briefről</a> és a <a href="/cikkek/mikor-erdemes-kiszervezni-a-terepi-felmerest">kiszervezésről szóló cikkben</a> vannak.</p>
  </div>
  ${ctaBand()}`;
}

function renderPricing() {
  return `
  ${pageHead(
    'Árak',
    'Árazási logika, kalkulátor nélkül',
    'Az ár a helyszín, a hozzáférés, a kimenet és az ütem együttese. Hiányos briefre nem mondunk számot.'
  )}
  <div class="wrap prose">
    <p>Nincs az oldalon négyzetméterár, és nincs űrlap, ami a mezők kitöltése után összeget ír ki. Egy üres iroda és egy üzemelő gépház azonos alapterületen sem ugyanaz a terepi nap. A számot akkor tudjuk vállalni, ha a specifikációból a munka már látszik. Addig visszakérdezünk.</p>
    <h2>Ami az árat mozgatja</h2>
    <ul>
      <li>a szintek, a bejárandó zónák és a helyszín jellege</li>
      <li>üzem, kíséret, éjszakai munka, leállási ablak</li>
      <li>kiszállás Budapesten kívül, és az, ha második alkalom kell a zárt részek miatt</li>
      <li>a kért pontsűrűség ott, ahol a brief részletet kér, nem minden felületen ugyanaz</li>
      <li>koordinátarendszer: relatív rendszer, partneri helyi rendszer vagy EOV</li>
      <li>hány mérvadó export kell, és kell-e ellenőrzési jegyzőkönyv a kontrollmérettel</li>
      <li>a sürgetett ütem, ha a feldolgozást össze kell húzni</li>
      <li>a Scan-to-BIM órái, ha van ilyen csomag: elemkör szerint, nem a felhő gigabájtjából</li>
    </ul>
    <h2>Amit nem árazunk vakon</h2>
    <p>Nem árazunk „teljes BIM modellt” elemkör nélkül. Nem árazunk hatósági vagy földhivatali munkarészt, mert ilyet nem készítünk. Nem árazunk rejtett szerkezetet, amit nem lehetett látni. Nem árazunk korlátlan átdolgozást és nem árazunk fájlfeltöltést ezen az oldalon: a méret az átadás csatornájához kell, nem egy kosárhoz.</p>
    <p>Az írásos ajánlat a tisztázott brief után készül. Az ajánlat elfogadásáig nincs szerződés. A fizetés nem ezen a felületen történik, automatikus díjbekérőt sem küld az űrlap.</p>
    <p>Ha a költségkeret szűk, a hasznos kérdés nem egy alacsonyabb egységár, hanem egy szűkebb lefedettség: mely szintek kellenek az első döntéshez, és mi maradhat későbbre. Ezt a briefben lehet csökkenteni, és az ár ehhez a szűkítéshez igazodik.</p>
  </div>
  ${ctaBand()}`;
}

function renderFaqPage() {
  return `
  ${pageHead(
    'GYIK',
    'Gyakori kérdések',
    'Rövid válaszok a modell határáról, a formátumról és arról, amit a felmérés nem ígér.'
  )}
  <div class="wrap prose">
    ${faqList(FAQ)}
  </div>
  ${ctaBand()}`;
}

function renderContact({ formHtml, config }) {
  const email = config.contactEmail;
  return `
  ${pageHead(
    'Kapcsolat',
    'Projektigény és kapcsolat',
    'A specifikációt az űrlapon küldje. Ha minta kell a saját szoftveréhez, az űrlap a minta kérésére áll be.'
  )}
  <div class="wrap contact-grid">
    <div class="prose">
      <h2>Elérhetőség</h2>
      <p><a href="mailto:${esc(email)}">${esc(email)}</a></p>
      <p><a href="tel:${esc(String(config.contactPhone).replace(/[^\d+]/g, ''))}">${esc(config.contactPhone)}</a></p>
      <p>Telefonon hétfőtől péntekig, 8:00 és 19:00 között hívhat.</p>
      <p>A levélben vagy az űrlapon írja meg a helyszínt és a kért kimenetet. Telefonon a hozzáférést és az ütemet lehet pontosítani, árat szóban, adatok nélkül nem mondunk.</p>
      <p>A Scan-to-BIM modell külön, egyeztetett szolgáltatás, nem része automatikusan minden felmérési megbízásnak. Ha modellezés is szóba jön, az űrlap projekt típusánál ezt válassza.</p>
    </div>
    <div id="projektigeny">
      <h2 id="igeny">Felmérési specifikáció</h2>
      ${formHtml}
    </div>
  </div>`;
}

function renderPrivacy(config) {
  const hosting = config.hostingProvider
    ? `A tárhelyszolgáltató: ${esc(config.hostingProvider)}${config.hostingAddress ? `, ${esc(config.hostingAddress)}` : ''}.${config.hostingEmail ? ` Elérhetőség: ${esc(config.hostingEmail)}.` : ''}`
    : 'A projektigények a szolgáltató saját szerverén, külön sqlite fájlban vannak. A tárhelyszolgáltató nevét az üzemeltető a közzétételkor tölti ki; amíg a mező üres, külső tárhelyszolgáltató nincs megnevezve.';
  const smtp = config.smtp.host
    ? `Az e-mail értesítés a(z) ${esc(config.smtp.host)} kiszolgálón keresztül megy. Ha ez a kiszolgáló az Európai Gazdasági Térségen kívül van, az üzemeltető a közzététel előtt rendezi az adattovábbítás feltételét.`
    : 'Amíg SMTP-kiszolgáló nincs beállítva, a projektigény csak a saját adatfájlba kerül, e-mail nem megy ki.';
  return `
  ${pageHead(
    'Adatvédelem',
    'Adatkezelési tájékoztató',
    'A 3dscantobim.hu projektigény űrlapjához. Hírlevelet nem küldünk, fizetést nem kezelünk.'
  )}
  <div class="wrap prose">
    <p>Ez a tájékoztató a 3dscantobim.hu oldal partneri projektigényeire vonatkozik. Nem helyettesíti egy konkrét megbízás külön adatfeldolgozói megállapodását, ha a helyszíni munka során további, a felmérési állományra vonatkozó adat keletkezik. Azt a megbízás rögzíti.</p>
    <h2>Adatkezelő</h2>
    <p>${esc(config.companyLegalName)}<br>${esc(config.companySeat)}<br>Cégjegyzékszám: ${esc(config.companyRegNumber)}<br>Adószám: ${esc(config.companyTaxId)}<br>E-mail: <a href="mailto:${esc(config.contactEmail)}">${esc(config.contactEmail)}</a><br>Telefon: <a href="tel:${esc(String(config.contactPhone).replace(/[^\d+]/g, ''))}">${esc(config.contactPhone)}</a>, hétfőtől péntekig, 8:00 és 19:00 között.</p>
    <p>Az üzemeltető azonosító adatai az <a href="/aszf">ÁSZF</a> Üzemeltető adatai részében is szerepelnek.</p>
    <h2>Milyen adatot rögzítünk</h2>
    <p>Az űrlap és a technikai környezet az alábbiakat menti: beküldés időpontja, forrásdomain, forrás URL, kampány és UTM paraméterek, partner neve, kapcsolattartó, e-mail, telefon, cég, projekt típusa, épület típusa, helyszín, tervezett ütemezés, kért kimenet, szoftver, koordinátarendszer, pontossági igény, fájlméret, megjegyzés, a hozzájárulás ténye, valamint a megkeresés státusza. Fájlt az űrlap nem fogad. Az IP-címet az adatbázisba nem írjuk. A napló a kérés idejét, a HTTP-módszert, az útvonalat és az állapotkódot tartalmazza, a mezők szövegét nem.</p>
    <h2>Cél és jogalap</h2>
    <p>Az adatokat a projektigény megválaszolásához, az ajánlat előkészítéséhez és a kapcsolattartáshoz használjuk. A jogalap a hozzájárulás (GDPR 6. cikk (1) a) pont), valamint a megkeresésre adott válaszhoz szükséges, szerződéskötést megelőző lépés (6. cikk (1) b) pont). Hírlevelet, profilalkotást és automatizált döntést nem végzünk. Az adatokat nem adjuk el.</p>
    <h2>Megőrzés</h2>
    <p>A projektigényt ${esc(String(config.retentionMonths))} hónapig őrizzük, majd töröljük vagy anonimizáljuk, ha nincs folyamatban lévő ajánlat vagy jogi igény a megőrzésre. A hozzájárulás visszavonható a ${esc(config.contactEmail)} címen. A visszavonás nem érinti a visszavonás előtt, jogalappal végzett kezelést. Ha az ajánlat már folyamatban van, a szükséges adatot a megőrzési időn belül megtartjuk a válaszadás lezárásáig.</p>
    <h2>Kik férnek hozzá</h2>
    <p>Az adatokat az adatkezelő munkatársai látják, jelszóval védett admin felületen. ${hosting} ${smtp} A levelező szolgáltató adatfeldolgozónak minősül, ha be van állítva. Hatóságnak csak jogszabályi kötelezettség esetén adunk át adatot.</p>
    <h2>Az érintett jogai</h2>
    <p>Kérheti a hozzáférést, a helyesbítést, a törlést, a kezelés korlátozását és az adathordozhatóságot, valamint tiltakozhat a jogos érdeken alapuló kezelés ellen, ha ilyet alkalmaznánk. Kérelmét a fenti e-mail címen fogadjuk. Panasszal a Nemzeti Adatvédelmi és Információszabadság Hatósághoz fordulhat: 1055 Budapest, Falk Miksa utca 9–11., ugyfelszolgalat@naih.hu, naih.hu.</p>
    <p>Az oldal sütit a nyilvános lapokon nem helyez el. Az admin felület egy saját, httpOnly munkamenet-sütit használ a belépés idejére. Ez a süti más oldalakkal nincs megosztva.</p>
  </div>`;
}

function renderImpressum(config) {
  const hosting = config.hostingProvider
    ? `<p>Tárhelyszolgáltató: ${esc(config.hostingProvider)}${config.hostingAddress ? `, ${esc(config.hostingAddress)}` : ''}${config.hostingEmail ? `, ${esc(config.hostingEmail)}` : ''}.</p>`
    : '<p>A tárhelyszolgáltató adatait az üzemeltető a közzétételkor tölti ki. Amíg a mező üres, a szolgáltatás a saját szerveren fut.</p>';
  return `
  ${pageHead('Impresszum', 'Impresszum', 'A 3dscantobim.hu tartalmáért felelős szolgáltató adatai.')}
  <div class="wrap prose">
    <p><strong>${esc(config.companyLegalName)}</strong><br>
    Székhely: ${esc(config.companySeat)}<br>
    Cégjegyzékszám: ${esc(config.companyRegNumber)}<br>
    Bejegyezve: ${esc(config.companyCourt)}<br>
    Adószám: ${esc(config.companyTaxId)}<br>
    EU adószám: ${esc(config.companyEuTaxId)}</p>
    <p>E-mail: <a href="mailto:${esc(config.contactEmail)}">${esc(config.contactEmail)}</a><br>
    Telefon: <a href="tel:${esc(String(config.contactPhone).replace(/[^\d+]/g, ''))}">${esc(config.contactPhone)}</a><br>
    Telefonon hétfőtől péntekig, 8:00 és 19:00 között hívhat.</p>
    <p>Az oldal tájékoztat és projektigényt fogad. Nem minősül ajánlattételnek, nem köt szerződést, és nem kezel fizetést. Az üzemeltető adatai az <a href="/aszf">ÁSZF</a> azonos szakaszában is olvashatók.</p>
    ${hosting}
    <p>Kapcsolódó mérnöki felület, ettől az oldaltól külön tartalommal: <a href="https://bim.vrgo.hu/" rel="noopener">bim.vrgo.hu</a>.</p>
  </div>`;
}

function renderTerms(config) {
  const phoneHref = String(config.contactPhone || '').replace(/[^\d+]/g, '');
  return `
  ${pageHead(
    'ÁSZF',
    'Általános szerződési feltételek',
    'Az oldal üzemeltetőjének azonosító adatai. A projektigény elküldése nem hoz létre szerződést.'
  )}
  <div class="wrap prose">
    <h2>Üzemeltető adatai</h2>
    <p><strong>${esc(config.companyLegalName)}</strong><br>
    Székhely: ${esc(config.companySeat)}<br>
    Cégjegyzékszám: ${esc(config.companyRegNumber)}<br>
    Bejegyezve: ${esc(config.companyCourt)}<br>
    Adószám: ${esc(config.companyTaxId)}<br>
    EU adószám: ${esc(config.companyEuTaxId)}</p>
    <p>E-mail: <a href="mailto:${esc(config.contactEmail)}">${esc(config.contactEmail)}</a><br>
    Telefon: <a href="tel:${esc(phoneHref)}">${esc(config.contactPhone)}</a><br>
    Telefonon hétfőtől péntekig, 8:00 és 19:00 között hívhat.</p>
    <h2>Az oldal szerepe</h2>
    <p>A 3dscantobim.hu tájékoztat és projektigényt fogad. Az űrlap elküldése nem ajánlat, nem szerződés, és nem keletkeztet fizetési kötelezettséget. A megbízás feltételeit a felek külön, írásban rögzítik, ha a specifikációból a feladat megállapítható.</p>
    <p>Az adatkezelés rendje az <a href="/adatvedelem">adatkezelési tájékoztatóban</a> van.</p>
  </div>`;
}

function renderArticlesIndex() {
  const cards = ARTICLES.map(
    (article) => `<article class="card">
      <p class="index">${esc(article.kicker)}</p>
      <h2><a href="${esc(article.path)}">${esc(article.title)}</a></h2>
      <p>${esc(article.description)}</p>
    </article>`
  ).join('');
  return `
  ${pageHead(
    'Tudnivalók',
    'Cikkek a felmérés és az átadás rendjéről',
    'Hat hosszabb jegyzet modellező partnereknek. Nem általános BIM-ismertető.'
  )}
  <div class="wrap">
    <div class="cards cards-2">${cards}</div>
  </div>`;
}

function renderArticle(article) {
  const more = ARTICLES.filter((item) => item.slug !== article.slug)
    .slice(0, 3)
    .map((item) => `<li><a href="${esc(item.path)}">${esc(item.title)}</a></li>`)
    .join('');
  return `
  <article>
    ${pageHead(article.kicker, article.title, article.description)}
    <div class="wrap prose">
      <p class="muted">Közzétéve: 2026. november 9. · ${esc(article.kicker)}</p>
      ${article.html}
      <h2>Kapcsolódó jegyzetek</h2>
      <ul>${more}</ul>
    </div>
  </article>
  ${ctaBand()}`;
}

function renderThanks(ref) {
  const code = /^S7-\d{5}$/.test(ref) ? ref : '';
  return `
  <article>
    ${pageHead('Projektigény', 'Rögzítettük a projektigényt', 'Az elküldés megtörtént. Ajánlatot akkor küldünk, ha a specifikációból a feladat már megállapítható.')}
    <div class="wrap prose">
      ${code ? `<p class="ref">Hivatkozási szám: ${esc(code)}</p>` : ''}
      <p>Átnézzük a helyszínt, a kért kimenetet, a szoftvert és a koordinátarendszert. Ha ezekből a pontos árhoz kevés az adat, visszakérdezünk, és csak utána adunk írásos ajánlatot. Az űrlap nem számolt árat, és nem hozott létre szerződést.</p>
      <p>Ha a levelezés be van állítva, rövid visszaigazolást is küldünk a megadott címre. A rögzítés ettől függetlenül megtörtént. Ha néhány munkanapon belül nem jelentkezünk, írjon a kapcsolati e-mail címre, és tüntesse fel a hivatkozási számot.</p>
      <p><a href="/">Vissza a főoldalra</a></p>
    </div>
  </article>`;
}

function renderNotFound() {
  return `
  ${pageHead('404', 'Ez a cím nem tartozik az oldalhoz', 'A kért útvonal nincs a 3dscantobim.hu lapjai között.')}
  <div class="wrap prose">
    <p><a href="/">Főoldal</a> · <a href="/kapcsolat">Projektigény</a> · <a href="/cikkek">Tudnivalók</a></p>
  </div>`;
}

module.exports = {
  PAGES,
  renderHome,
  renderField,
  renderDelivery,
  renderScan,
  renderPartner,
  renderSamples,
  renderProcess,
  renderPricing,
  renderFaqPage,
  renderContact,
  renderPrivacy,
  renderImpressum,
  renderTerms,
  renderArticlesIndex,
  renderArticle,
  renderThanks,
  renderNotFound,
};
