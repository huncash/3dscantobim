# 3dscantobim.hu

Magyar nyelvű B2B oldal BIM-modellező csapatoknak, tervezőirodáknak, generáltervezőknek és nagyobb kivitelezőknek. A fő ajánlat a terepi felmérés és az egyeztetett pontfelhő-átadás. A Scan-to-BIM modell külön, írásban rögzített munkacsomag. Az oldal nem számol árat, nem köt szerződést, és nem kezel fizetést.

Az alkalmazás önálló Node.js folyamat a **site-7** mappában. A saját portja **7000**, a saját adatfájlja a `data/leads.sqlite`, a saját admin sütije a `s7bim_admin`. Nem használja a site-1, site-6 vagy site-8 portját, munkamenetét, gyorsítótárát vagy feltöltési könyvtárát. Fájlfeltöltés nincs. A korábbi, 3000–5200 közötti portokon futó alkalmazásokat nem indítja és nem módosítja.

Helyi fejlesztői mappa: ez a tároló. A VPS-en a javasolt útvonal: `/var/www/site-7`.

## Követelmények

- Node.js 22.5 vagy újabb, a beépített `node:sqlite` miatt. A fejlesztés Node.js 24-en készült.
- A 7000-es port legyen szabad. Ha foglalt, az alkalmazás nem választ másik portot: leáll, és a foglaló folyamatot külön kell azonosítani.
- Éles levélküldéshez SMTP. Enélkül a projektigény akkor is rögzül.

## Első indítás

```bash
cp .env.example .env
```

Windows PowerShellben: `Copy-Item .env.example .env`

A `.env` fájlban cserélje le az `ADMIN_TOKEN` értékét. A példa szöveg szándékosan nem fogadható el. Token készítése:

```bash
node -e "console.log(require('crypto').randomBytes(24).toString('base64url'))"
```

Állítsa be a figyelt `CONTACT_EMAIL` címet és a `SMTP_*` mezőket. A `SMTP_PASS` csak a `.env` fájlba kerül, nem a verziókezelt példába. A `BIND_HOST` maradjon `127.0.0.1`, a `PORT` maradjon `7000`.

```bash
npm install
npm start
```

Fejlesztés közben, újraindítással fájlváltozáskor:

```bash
npm run dev
```

Az oldal: `http://127.0.0.1:7000/`  
Az admin: `http://127.0.0.1:7000/admin`

## Build

Nincs külön frontend-build. Az éles telepítés a függőségek telepítése és a folyamat indítása:

```bash
npm ci --omit=dev
npm start
```

A `NODE_ENV=production` a `.env` fájlban állítható. A statikus fájlok a `public/` könyvtárból mennek. Az Open Graph kép a `public/images/og.png`, a fejléc logója a `public/images/logo.png`. Mindkettő a felső sávból kivágott márkalogó; újragenerálás: `npm run og`.

Ellenőrzés telepítés előtt:

```bash
npm test
```

## Docker

A `docker-compose.yml` külön konténert indít, `unless-stopped` újraindítással. A konténeren belül a folyamat a `0.0.0.0:7000` címen figyel, a gazdagépen viszont csak a `127.0.0.1:7000` van kinyitva. Az adat a `scantobim7_data` volume-on van, nem egy másik site könyvtárában.

Ne indítsa a konténert és a systemd szolgáltatást egyszerre: mindkettő a 7000-es portot kéri.

```bash
docker compose up -d --build
docker compose ps
docker compose logs -f
```

A compose felülírja a `PORT`, a `BIND_HOST` és a `DATA_FILE` értékét. A titkok a `.env` fájlból jönnek, a képbe nem kerülnek bele.

## systemd

A `deploy/3dscantobim.service` sablon külön felhasználóval indul, és `Restart=always` miatt újraindul. A példa útvonal `/var/www/site-7`. Ezt a tényleges könyvtárra kell cserélni, ha a VPS-en máshol van a mappa.

```bash
sudo useradd --system --home /var/www/site-7 --shell /usr/sbin/nologin scantobim
sudo chown -R scantobim:scantobim /var/www/site-7
sudo cp deploy/3dscantobim.service /etc/systemd/system/3dscantobim.service
sudo systemctl daemon-reload
sudo systemctl enable --now 3dscantobim
```

A `BIND_HOST=127.0.0.1` mellett a folyamat a gépen kívülről nem hallgat, csak a helyi reverse proxy éri el.

## Naplók

Az alkalmazás a szabványos kimenetre ír: idő, metódus, útvonal, állapotkód, időtartam. A projektigény szövegét és a jelszót nem naplózza. Közös naplófájl más site-okkal nincs.

- systemd: `journalctl -u 3dscantobim -f`
- Docker: `docker compose logs -f` (a json-file driver 5×10 MB-nál rotál)
- közvetlen indítás: a folyamat saját terminálja

## Reverse proxy

Minta: `deploy/nginx-3dscantobim.conf`. A `3dscantobim.hu` a `127.0.0.1:7000` címre továbbít. A `www` cím 301-gyel az apexre megy. TLS után a `SITE_URL` legyen `https://3dscantobim.hu`.

```nginx
proxy_pass http://127.0.0.1:7000;
```

A fájl csak ennek a domainnek a server blokkját tartalmazza. A site-1, site-6 és site-8 konfigurációjához nem nyúl.

A `TRUST_PROXY=1` csak akkor kerüljön a `.env` fájlba, ha a 7000-es port kívülről nem érhető el, csak a proxy felől. Különben a továbbított IP-fejléc hamisítható.

Caddy, ha a gépen ez a proxy:

```caddy
3dscantobim.hu {
    reverse_proxy 127.0.0.1:7000
}
www.3dscantobim.hu {
    redir https://3dscantobim.hu{uri} permanent
}
```

## Adat és mentés

A projektigények sqlite fájlban vannak. Alaphelyzetben: `data/leads.sqlite`. Másik fájl a `DATA_FILE`, vagy `DATABASE_URL=sqlite:./data/leads.sqlite`. Postgres és más közös adatbázis nem támogatott: az alkalmazás ilyen címmel nem indul.

A kötelező mezők: név, e-mail, a projekt rövid leírása és a hozzájárulás. A műszaki mezők üresen is menthetők. A tárolt oszlopok változatlanul megmaradnak, köztük a korábbi fájlméret; ehhez jött a specifikáció hivatkozása. Fájlfeltöltés nincs.

Mentés leállított folyamattal:

```bash
sudo systemctl stop 3dscantobim
cp data/leads.sqlite /mentes/leads-$(date +%F).sqlite
sudo systemctl start 3dscantobim
```

Futás közben a `-wal` és `-shm` fájl is a `data/` könyvtárban lehet. Ezeket is ennek a projektnek a könyvtárában kell tartani.

## E-mail

Ha az `SMTP_HOST` üres, a projektigény rögzül, levél nem megy. Ha ki van töltve, az üzemeltető a `CONTACT_EMAIL` címre kap értesítést, válaszcímként a partner címével. A `SMTP_SEND_CUSTOMER_COPY=true` rövid visszaigazolást küld a kapcsolattartónak is, ár nélkül. A küldés legfeljebb néhány másodpercig vár; hiba esetén a tétel megmarad, a státusza az adminban látszik.

## Admin és CSV

A `/admin` jelszava az `ADMIN_TOKEN`. A munkamenet 12 óráig él, csak ebben a folyamatban, `s7bim_admin` httpOnly sütiben. Újraindítás után újra be kell lépni.

A lista szűrhető, a státusz módosítható, a CSV a `/admin/export.csv` címen tölthető. A fájl UTF-8, pontosvesszővel tagolt, a magyar Excelhez. A `=`, `+`, `-` vagy `@` kezdetű cellák elé aposztróf kerül, hogy a táblázat ne futtasson képletet.

## SEO

A kanonikus cím, a megosztási kép és a sitemap mindig `https://3dscantobim.hu`. Helyi cím, `127.0.0.1` és a `7000`-es port nem kerül a nyilvános SEO-adatokba. A perjeles útvonal 301-gyel a perjel nélküli címre megy, a `www` a minta nginxben és az alkalmazásban is az apexre. Az UTM és más lekérdezési paraméter nem része a kanonikus címnek.

Indexelés csak akkor van, ha egyszerre igaz: `NODE_ENV=production`, `SITE_URL=https://3dscantobim.hu` és `SEO_INDEX=igen`. Fejlesztői és teszt környezet `noindex`. A `robots.txt` nem helyettesíti az admin jelszót. Az admin, a `/koszonjuk` és a `/healthz` nincs a sitemapben.

Search Console HTML-igazolás: `GOOGLE_SITE_VERIFICATION`, csak ha már van token. A jelenlegi éles főoldalon ilyen meta nem volt, ezért a kódban nincs beégetett érték. Domain property DNS-igazolás, tulajdonosi hozzáféréssel: TXT rekord a `3dscantobim.hu` gyökerére, a Search Console által kiadott `google-site-verification=...` értékkel. Sikeres igazolás után a sitemap címe `https://3dscantobim.hu/sitemap.xml`, majd URL Inspection a főoldalra, a `/pontfelho-atadas` és a `/partneri-egyuttmukodes` címre. Ezt a fiókban nem küldtük be.

Bing: `BING_SITE_VERIFICATION` a `msvalidate.01` meta, üresen nem jelenik meg. IndexNow nincs bekötve, amíg nincs ellenőrzött kulcsfájl. Google Indexing API-t szolgáltatásoldalakra nem használunk.

Google cégprofil: a meglévő vrgo.hu profilhoz tartozik a kapcsolat. Új profilt nem hozunk létre, a fő weboldalt, a nevet, a címet, a kategóriát és a nyitvatartást nem írjuk felül. A H–P 8:00–19:00 telefonos elérhetőség, nem ügyfélfogadás. Jóváhagyásra váró javaslat, ha a profil támogatja a bejegyzést: egy poszt a `https://3dscantobim.hu/pontfelho-atadas` címre, a fő weboldal mező változtatása nélkül. Ellenőrzött profil-URL nincs a kódban, ezért a kapcsolatoldalra nem került ilyen link.

A fejléc, a borítókép és a favicon a felső sávból kivágott 3D scan to BIM logó. Az ADP-TOP lábléclogó ettől külön, a szolgáltató jele marad.

A partneri együttműködés kanonikus címe `/partneri-egyuttmukodes`. A briefben elírt `/partneri-egytuutmuves` 301-gyel ide mutat.

## Amit az alkalmazás szándékosan nem tud

- Nincs árkalkulátor és nincs közzétett négyzetméterár.
- Nincs fizetés, számla és automatikus szerződés.
- Nincs fájlfeltöltés és nincs közös feltöltési könyvtár.
- Nincs mérőkód, hírlevél és közös gyorsítótár.
- Nincs településenkénti tömeges oldal.
- Nem ígér földhivatali vagy hatósági záradékolást.

## Éles közzététel előtt

- Valódi, figyelt e-mail cím és SMTP.
- Egyedi admin jelszó és, ha kell, külön `SESSION_SECRET`.
- `HOSTING_PROVIDER`, `HOSTING_ADDRESS`, `HOSTING_EMAIL` az impresszumban és az adatkezelési tájékoztatóban.
- `SITE_URL=https://3dscantobim.hu`.
- A tárhely és az adatkezelési szöveg átnézése, ha a levelező szolgáltató az EGT-n kívül dolgozik.
- A `deploy/nginx-3dscantobim.conf` bemásolása a proxy konfigurációjába, majd a 7000-es port tűzfalon zárva tartása a helyi gépen kívülről.
