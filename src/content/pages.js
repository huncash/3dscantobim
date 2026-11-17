const { esc } = require('../util');
const { FAQ, HOME_FAQ } = require('./faq');
const { ARTICLES } = require('./articles');
const { ctaBand } = require('../form');
const { HANDOFF_ITEMS, SERVICE_LEVELS, PENDING_APPROVAL, publicInstrumentClaims } = require('./claims');

const UPDATED = '2026-11-17';

const PAGES = {
  home: {
    path: '/',
    title: '3D felmérés és pontfelhő BIM-hez | 3D scan to BIM',
    description:
      'Terepi 3D felmérés tervezőirodáknak és BIM-modellezőknek. Egyeztetett pontfelhő-átadás, formátum és műszaki tartalom. Küldje el projektigényét!',
    shareTitle: 'Ön modellez. Mi felmérünk. | 3D scan to BIM',
    shareDescription:
      'Terepi 3D felmérés és egyeztetett pontfelhő-átadás a tervezőiroda saját munkafolyamatához. A modell nem az alapcsomag.',
    crumb: 'Főoldal',
    updated: UPDATED,
  },
  field: {
    path: '/terepi-felmeres',
    title: 'Terepi felmérés épülethez és ipari térhez',
    description:
      'Helyszíni adatfelvétel BIM-csapatoknak: szintek, homlokzat és gépház. Amit nem lehetett bejárni, az kizárásként kerül az átadásba.',
    shareTitle: 'Terepi munka a modellező partnernek',
    shareDescription: 'Épület és ipari tér felmérése a saját tervezési folyamathoz. A modell ettől még a partner feladata.',
    crumb: 'Terepi felmérés',
    updated: UPDATED,
  },
  delivery: {
    path: '/pontfelho-atadas',
    title: 'Regisztrált pontfelhő és átadási specifikáció',
    description:
      'Formátum, koordináta, ellenőrzés és elfogadás előre egyeztetve. Az E57 pontfelhő-állomány, nem kész BIM-modell.',
    shareTitle: 'Egyeztetett pontfelhő-átadás',
    shareDescription: 'A specifikáció mondja meg, mit adunk át és mi marad a partner modellezése. Az IFC nem pontfelhő.',
    crumb: 'Pontfelhő átadás',
    updated: UPDATED,
  },
  scan: {
    path: '/scan-to-bim',
    title: 'Scan-to-BIM adatfelvétel, a modell külön csomag',
    description:
      'A felmérés nem készít automatikusan Revit- vagy Archicad-modellt. Modellezési csomag csak külön rögzített határral készül.',
    shareTitle: 'Scan-to-BIM: előbb az adat, a modell külön',
    shareDescription: 'A domain neve nem ígér minden projekthez kész modellt. A natív fájl csak külön, jóváhagyott csomagban lehet téma.',
    crumb: 'Scan-to-BIM',
    updated: UPDATED,
  },
  partner: {
    path: '/partneri-egyuttmukodes',
    title: 'Felmérő partner tervezőirodáknak',
    description:
      'Kiszervezett terepi kapacitás BIM-modellező irodáknak, generáltervezőknek és mérnöki csapatoknak, rögzített pontfelhő-átadással.',
    shareTitle: 'Felmérő partner, nem helyettes modellezőcsapat',
    shareDescription: 'A terepi munkát vesszük át. A sablon, a szabvány és a modell a partnernél marad, ha a modellezést nem kérik külön.',
    crumb: 'Partneri együttműködés',
    updated: UPDATED,
  },
  samples: {
    path: '/minta-anyagok',
    title: 'Átadási formátumok, letölthető minta nélkül',
    description:
      'Az E57, az IFC és a natív modell külön csoport. Publikálható mintaállomány és letöltés ezen az oldalon nincs.',
    shareTitle: 'Formátumok, fájlletöltés nélkül',
    shareDescription: 'Pontfelhő, csereformátum és natív modell nem ugyanaz. Mintaállományt az oldal nem ad.',
    crumb: 'Minta anyagok',
    updated: UPDATED,
  },
  process: {
    path: '/folyamat',
    title: 'A felmérés menete az egyeztetéstől az átadásig',
    description:
      'Először a specifikáció, utána a helyszín, majd a vállalt ellenőrzés és a megbeszélt export. Hiányos briefre nem adunk árat.',
    shareTitle: 'Hogyan készül a terepi átadás',
    shareDescription: 'A folyamat a rögzített kimenethez igazodik. Azonnali ár és automatikus szerződés nincs.',
    crumb: 'Folyamat',
    updated: UPDATED,
  },
  pricing: {
    path: '/arak',
    title: 'Mi mozgatja egy terepi felmérés árát',
    description:
      'A helyszín, a hozzáférés, a kért kimenet és az ütem együtt adja az árat. Kalkulátor és azonnali díj nincs.',
    shareTitle: 'Ár csak tisztázott felmérési brief után',
    shareDescription: 'Nem árazunk teljes BIM-modellt elemkör nélkül, és nem árazunk hatósági munkarészt.',
    crumb: 'Árak',
    updated: UPDATED,
  },
  faq: {
    path: '/gyik',
    title: 'Kérdések a pontfelhőről és a modell határáról',
    description:
      'Mi tartozik a felméréshez, mi marad a partner modellezése, és mit nem vállalunk. Rövid válaszok tervezőirodáknak.',
    shareTitle: 'Gyakori kérdések a felmérés határáról',
    shareDescription: 'A Scan-to-BIM nem automatikus. Az E57 pontfelhő, az IFC pedig nem helyettesíti.',
    crumb: 'GYIK',
    updated: UPDATED,
  },
  contact: {
    path: '/kapcsolat',
    title: 'Projektigény terepi felméréshez',
    description:
      'Név, e-mail és rövid leírás elég az első megkereséshez. A műszaki mezők opcionálisak, árat az űrlap nem ad.',
    shareTitle: 'Küldje el a felmérési projektigényt',
    shareDescription: 'Rövid brief tervezőirodáknak. Pontfelhőt az űrlap nem fogad, szerződést nem hoz létre.',
    crumb: 'Kapcsolat',
    updated: UPDATED,
  },
  privacy: {
    path: '/adatvedelem',
    title: 'Adatkezelési tájékoztató a projektigényhez',
    description:
      'A 3dscantobim.hu projektigényének adatkezelője, a kezelt mezők és a megőrzés. Hírlevelet nem küldünk.',
    crumb: 'Adatvédelem',
    updated: UPDATED,
  },
  impressum: {
    path: '/impresszum',
    title: 'Impresszum és a szolgáltató azonosítása',
    description:
      'A 3dscantobim.hu szolgáltatójának azonosító adatai és telefonos elérhetősége. Az üzemeltető az ÁSZF-ben is szerepel.',
    crumb: 'Impresszum',
    updated: UPDATED,
  },
  terms: {
    path: '/aszf',
    title: 'ÁSZF: az üzemeltető adatai',
    description:
      'Az oldal üzemeltetőjének azonosító adatai. A projektigény elküldése nem hoz létre szerződést.',
    crumb: 'ÁSZF',
    updated: UPDATED,
  },
  articles: {
    path: '/cikkek',
    title: 'Szakmai tudástár a terepi felmérésről',
    description:
      'Jegyzetek a modellezőnek: mit várjon a felméréstől, hogyan válik el a pontfelhő az IFC-től, és mikor érdemes kiszervezni a helyszínt.',
    shareTitle: 'Tudástár modellező irodáknak',
    shareDescription: 'Nem szoftverletöltés és nem modellkönyvtár. A cikkek a terepi átadás rendjéről szólnak.',
    crumb: 'Tudnivalók',
    updated: UPDATED,
  },
  thanks: {
    path: '/koszonjuk',
    title: 'A projektigényt rögzítettük',
    description: 'A megkeresés beérkezett. Ajánlatot a hiányzó adatok tisztázása után küldünk.',
    crumb: 'Visszaigazolás',
    updated: UPDATED,
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
        <h1>Ön modellez. Mi felmérünk.</h1>
        <p class="lede">Terepi 3D felmérés és egyeztetett pontfelhő-átadás a saját tervezési munkafolyamatához.</p>
        <div class="actions">
          <a class="btn" href="#specifikacio">Projektet egyeztetek</a>
          <a class="btn btn-ghost" href="/pontfelho-atadas">Átadási specifikáció</a>
        </div>
      </div>
      <aside class="titleblock" aria-label="Átadási lap, röviden">
        <header>
          <span>Átadási lap</span>
          <span class="slip-brand">3D scan to BIM</span>
        </header>
        <dl>
          <dt>Kimenet</dt><dd>egyeztetett pontfelhő</dd>
          <dt>Formátum</dt><dd>egyeztetett pontfelhő, jellemzően E57</dd>
          <dt>Koordináta</dt><dd>a specifikációban rögzített rendszer</dd>
          <dt>Ellenőrzés</dt><dd>lefedettség, illesztés, kizárás</dd>
          <dt>Modell</dt><dd>nem része a felmérésnek</dd>
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
      <h2>Három dolog, amit előre tisztázunk</h2>
      <div class="cards">
        <article class="card">
          <p class="index">01</p>
          <h3>Átadási specifikáció</h3>
          <p>A terület, a pontosság, a koordináta, a formátum és a kizárás a munka előtt kerül a lapra. Nem minden tétel jár az alapfelméréshez.</p>
          <p><a href="/pontfelho-atadas">Az átadási specifikáció</a></p>
        </article>
        <article class="card">
          <p class="index">02</p>
          <h3>Pontfelhő a saját folyamathoz</h3>
          <p>A felmérés kimenete az egyeztetett pontfelhő. Az E57 nyílt pontfelhő-állomány. Önmagában nem BIM-modell, és nem natív Revit- vagy Archicad-fájl.</p>
          <p><a href="/terepi-felmeres">A terepi felmérés</a></p>
        </article>
        <article class="card">
          <p class="index">03</p>
          <h3>A modell külön döntés</h3>
          <p>A modellezés a partner feladata marad, hacsak egy külön Scan-to-BIM csomagban mást nem rögzítünk. IFC-t pontfelhő helyett nem adunk át.</p>
          <p><a href="/scan-to-bim">A modellezési csomag</a></p>
        </article>
      </div>
    </div>
  </section>
  <section class="section band" id="specifikacio">
    <div class="wrap">
      <h2>Projektet egyeztetek</h2>
      <p class="lede">A név, az e-mail és a rövid leírás elég. A műszaki blokk csak akkor kell, ha a helyszín, a határidő vagy a formátum már ismert.</p>
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

function renderHandoffRows() {
  return HANDOFF_ITEMS.map(
    ([title, text], index) => `<tr><td>${index + 1}. ${esc(title)}</td><td>${esc(text)}</td></tr>`
  ).join('');
}

function renderLevels() {
  return SERVICE_LEVELS.map(
    (level) => `<article class="card"><p class="index">${esc(level.id)}</p><h3>${esc(level.title)}</h3><p>${esc(level.text)}</p></article>`
  ).join('');
}

function renderInstrumentNote() {
  const claims = publicInstrumentClaims();
  if (!claims.length) {
    return `<p>Számszerű műszerteljesítményt ezen az oldalon nem közlünk. Gyártói maximum csak akkor jelenhet meg, ha a forrás, a tényleges hozzáférés és a tulajdonosi jóváhagyás együtt rögzítve van. Ilyen közzétehető sor jelenleg nincs. Saját műszerparkot nem állítunk.</p>`;
  }
  const rows = claims
    .map(
      (item) =>
        `<tr><td>${esc(item.instrument)} ${esc(item.version)}</td><td>${esc(item.manufacturerMaximum)} ${esc(item.unit)}</td><td>${esc(item.conditions)}</td><td><a href="${esc(item.sourceUrl)}">${esc(item.sourceUrl)}</a></td><td>${esc(item.verifiedOn)}</td></tr>`
    )
    .join('');
  return `<div class="table-wrap"><table><thead><tr><th>Műszer</th><th>Gyártói maximum</th><th>Feltétel</th><th>Forrás</th><th>Ellenőrzés</th></tr></thead><tbody>${rows}</tbody></table></div>`;
}

function renderDelivery() {
  return `
  ${pageHead(
    'Pontfelhő átadás',
    'Átadási specifikáció',
    'A felmérés előtt rögzítjük, mit adunk át, mit ad meg a partner, és mi marad az ő modellezési feladata.'
  )}
  <div class="wrap prose">
    <p>A lista egyeztetési rend, nem automatikus alapcsomag. Egy tétel csak akkor része a munkának, ha a specifikációban vállaljuk. Amit a partner nem adott meg, azt nem töltjük ki helyette.</p>
    <h2>Mit egyeztetünk előre</h2>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Tétel</th><th>Mit jelent</th></tr></thead>
        <tbody>${renderHandoffRows()}</tbody>
      </table>
    </div>
    <h2>Ki mit ad</h2>
    <ul>
      <li>Mi adjuk át a vállalt terepi adatot, és ha a szint ezt tartalmazza, a regisztrált pontfelhőt a leírt ellenőrzéssel.</li>
      <li>A partner adja meg a területet, a kritikus részletet, a kért kimenetet és a már ismert koordinátarendszert.</li>
      <li>A modellezés, a sablon és a tervezési döntés a partner feladata marad.</li>
      <li>A képi dokumentáció, a külön bontás és a modellezési csomag opcionális, külön egyeztetéssel.</li>
    </ul>
    <h2>Formátumok</h2>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Csoport</th><th>Példa</th><th>Hogyan kezeljük</th></tr></thead>
        <tbody>
          <tr><td>Pontfelhő</td><td>E57</td><td>Nyílt pontfelhő-állomány. Az E57 átadása nem BIM-modell és nem natív tervfájl.</td></tr>
          <tr><td>Szoftverhez előkészített állomány</td><td>RCP</td><td>Nem támogatott átadásként közöljük, amíg az export munkafolyamata nincs ellenőrizve.</td></tr>
          <tr><td>BIM-csereformátum</td><td>IFC</td><td>Modellcsere, nem pontfelhő. Csak külön modellezési csomagban értelmezhető, és nem helyettesíti az E57-et.</td></tr>
          <tr><td>Natív modellállomány</td><td>Revit, Archicad</td><td>Nem a felmérés kimenete. Natív fájlt nem ígérünk pontfelhő-átadás helyett.</td></tr>
        </tbody>
      </table>
    </div>
    <p>Jóváhagyásra vár, ezért nem szerepel támogatott formátumként: ${esc(PENDING_APPROVAL.join('; '))}.</p>
    <h2>Egyeztethető szintek</h2>
    <p>Árat nem írunk ki. A három szint a munka terjedelmét választja el. Egyik sem jelent kedvezményt, lekötött kapacitást vagy szerződésen kívüli titoktartási ígéretet. Az együttműködés feltételeit a konkrét feladatnál egyeztetjük.</p>
    <div class="cards">${renderLevels()}</div>
    <h2>Műszeradat</h2>
    ${renderInstrumentNote()}
    <p>A pontosság, a pontköz, a távolságmérési zaj és a regisztrációs maradékhiba külön fogalom. Az illesztés maradéka önmagában nem a teljes projekt abszolút pontossága.</p>
    <div class="note">
      <p>Az átadás nem földhivatali munkarész és nem hatósági dokumentum. Publikálható mintaállomány nincs, letöltőgombot ezért nem teszünk ki. Pontfelhőt ezen az oldalon nem lehet feltölteni.</p>
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
    <p>Ha a partner modellez, az átadásunk a pontfelhő és a jegyzőkönyv. Natív Revit- vagy Archicad-fájlt a felmérés nem ígér. Ilyen állomány csak akkor lehet szóba, ha a modellezési csomag ezt külön rögzíti, és a munkafolyamat jóváhagyott. Az IFC ebben az esetben csereformátum, nem a pontfelhő helye. A partner sablonját csak akkor használjuk, ha átadják.</p>
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
    <p>Az első közös munkánál az <a href="/pontfelho-atadas">átadási specifikáció</a> mondja meg, melyik formátum a mérvadó. Publikálható mintaállományt nem töltünk fel. Keretszerződést az oldal nem köt. Minden megbízás írásos ajánlat és külön megállapodás.</p>
    <h2>Amit mi tartunk stabilan</h2>
    <p>A terepi munkát a leírt lefedettségre szervezzük, az illesztést és a kizárásokat dokumentáljuk, és a mérvadó fájlt nevesítjük. Ha a helyszín szűkebb, azt még az átadás előtt jelezzük, nem egy csendes lyukkal. A Scan-to-BIM-et nem csúsztatjuk bele a felmérésbe. Ha kell, külön csomagként, látható határral kerül az ajánlatba.</p>
  </div>
  ${ctaBand()}`;
}

function renderSamples() {
  return `
  ${pageHead(
    'Minta anyagok',
    'Formátumjegyzet, letölthető minta nélkül',
    'Az oldal elmagyarázza a formátumok különbségét. Publikálható mintaállomány és letöltés nincs.'
  )}
  <div class="wrap prose">
    ${figure(
      '/images/hely-minta.svg',
      'Helyőrző rajz egy átadási formátumjegyzethez. A keretbe később valós, publikálható szemelvény kerülhet.',
      'Helyőrző. Nem letölthető minta és nem kész projekt eredménye.'
    )}
    <p>Publikálható pontfelhő-mintát jelenleg nem adunk ki, és az oldalon nincs letöltés. A formátumot az <a href="/pontfelho-atadas">átadási specifikáció</a> választja el: az E57 pontfelhő, az IFC modellcsere, a natív tervfájl pedig egyik sem.</p>
    <h2>Amit egy átadásnál leírunk</h2>
    <ul>
      <li>a mérvadó pontfelhő formátuma, jellemzően E57</li>
      <li>az egység és a koordinátarendszer</li>
      <li>a kizárás, ha egy rész nem volt bejárható</li>
      <li>az, hogy a modell nem része a felmérésnek</li>
    </ul>
    <p>A képek helyőrzők. Amíg saját, publikálható szemelvény nincs, nem teszünk ki olyan gombot, amelyik fájlt ígérne.</p>
    <h2>Ha a formátumot egyeztetné</h2>
    <p>A <a href="/kapcsolat#projektigeny">projektbrief</a> a névvel, az e-maillel és a rövid leírással elküldhető. A kért kimenet opcionális. Az űrlap állományt nem fogad.</p>
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
    'Az első megkereséshez a név, az e-mail és a projekt rövid leírása elég.'
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
      <h2 id="igeny">Projektet egyeztetek</h2>
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
    <p>Az űrlap a nevet, az e-mail címet és a projekt rövid leírását kéri. Ha a partner megadja, mentjük az irodát, a telefont, a helyszínt, a határidőt, a kért kimenetet, a szoftvert, a koordinátarendszert, a pontossági igényt és a specifikáció hivatkozását. A korábbi fájlméret mező a tárolásban megmarad, az új űrlap nem kéri, és fájlt nem fogad. Mellé kerül a beküldés ideje, a forrás, a kampányadatok, a hozzájárulás és a státusz. Az IP-címet az adatbázisba nem írjuk.</p>
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
