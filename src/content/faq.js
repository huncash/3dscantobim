const FAQ = [
  {
    q: 'A Scan-to-BIM minden felmérési megbízás része?',
    a: 'Nem. Az alapmegbízás a terepi felmérés és az egyeztetett pontfelhő-átadás. A Scan-to-BIM modell külön, írásban rögzített munkacsomag: szoftverrel, elemkörrel és azzal, hogy mi marad csak pontfelhő. Ha ezt nem kérik, nem modellezünk a felmérés mellé.',
  },
  {
    q: 'Kapok azonnali árat az űrlap elküldése után?',
    a: 'Nem. Az űrlap projektigényt rögzít, árat nem számol. Ha a helyszín, a hozzáférés, a kimenet vagy a koordinátarendszer még hiányos, előbb visszakérdezünk. Írásos ajánlatot csak ezután adunk. Az elküldés szerződést sem hoz létre.',
  },
  {
    q: 'Milyen pontosságra lehet számítani?',
    a: 'A tűrést a feladathoz, a módszerhez, a távolsághoz és a bejárhatósághoz kötjük, és a briefben rögzítjük. Nem mondunk ki egyetlen számot minden épületre és minden részletre. Amit nem lehetett mérni, azt nem pótoljuk feltételezett geometriával.',
  },
  {
    q: 'Vállalnak földhivatali vagy hatósági záradékolást?',
    a: 'Nem. Nem készítünk földhivatali térképet, kitűzést vagy hatósági záradékolást. A leadott anyag a modellezési és egyeztetési munkához készül, a rögzített átadási specifikáció szerint.',
  },
  {
    q: 'Milyen formátumban érkezik a pontfelhő?',
    a: 'A szokásos nyílt átadás az E57. Ha a partner munkafolyamata más exportot kér, például Autodesk-környezethez, azt a briefben néven nevezzük. A formátum, az egység és a koordinátarendszer az átadás része, nem utólagos találgatás.',
  },
  {
    q: 'Revitben vagy Archicadben dolgoznak?',
    a: 'A partner szerzői környezete az övé marad. A felmérés kimenete a pontfelhő és a hozzá tartozó dokumentáció. Ha modellezést is kérnek, a szoftvert – Revit, Archicad vagy IFC-központú átadás – a Scan-to-BIM munkacsomagban rögzítjük. Az IFC csereformátum, nem helyettesíti a pontfelhőt.',
  },
  {
    q: 'Milyen koordinátarendszert használnak?',
    a: 'Azt, amit a brief megnevez: a partner helyi rendszerét, EOV-t vagy a helyszínen rögzített relatív rendszert. A tengelyek irányát és az egységet az átadási lapon írjuk. Csendben nem váltunk rendszert.',
  },
  {
    q: 'Mi történik, ha egy teret nem lehet bejárni?',
    a: 'Kizárásnak írjuk. Üzemelő gépsor, zárt helyiség, álmennyezet feletti tér vagy biztonsági korlát miatt kimaradó rész nem kerül be mért adatként. A lefedettséget a bejárt területhez képest adjuk át, nem a teljes épület ígéretével.',
  },
  {
    q: 'Kérhetek minta-anyagot a saját szoftveremhez?',
    a: 'Igen. A minta rövid szemelvény és formátumjegyzet, hogy a saját Revit-, Archicad- vagy pontfelhő-eszközében megnézze az átadást. Nem teljes épület, és nem helyettesíti a projekt specifikációját.',
  },
  {
    q: 'Ez helyettesíti a saját modellező csapatunkat?',
    a: 'Nem. A megbízás terepi kapacitás és rögzített adatátadás. A modellezési szabvány, a sablon, a családok és a megrendelő felé vállalt modell a partnernél marad, kivéve ha a Scan-to-BIM-et külön, körülhatárolt csomagban kérik.',
  },
  {
    q: 'Nagy fájlt is át tudnak adni?',
    a: 'Az átadás módját a becsült mérethez igazítjuk. Több tíz gigabájt nem e-mail melléklet. Az űrlapon ezért kérjük a nagyságrendet, a pontos csatornát pedig a specifikációban rögzítjük.',
  },
  {
    q: 'Ki kezeli a beküldött adatokat?',
    a: 'A projektigényt a megkeresés megválaszolásához használjuk, hírlevelet nem küldünk. Az adatkezelő azonosító adatai az adatkezelési tájékoztatóban, az üzemeltető adatai az ÁSZF-ben vannak.',
  },
];

const HOME_FAQ = [FAQ[0], FAQ[1], FAQ[2], FAQ[9]];

module.exports = { FAQ, HOME_FAQ };
