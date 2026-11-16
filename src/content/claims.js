const INSTRUMENTS = [
  {
    id: 'trimble-x9-core',
    instrument: 'Trimble X9',
    version: 'Core / Core LT, gyártói adatlap',
    manufacturerMaximum: '500000',
    unit: 'pont/s',
    conditions: 'Gyártói felső érték. Nem saját mérés, és nem átadott pont/s.',
    sourceUrl: 'https://geospatial.trimble.com/en/products/hardware/trimble-x9',
    verifiedOn: '2026-11-16',
    accessConfirmed: false,
    ownerApproved: false,
    publishable: false,
  },
  {
    id: 'trimble-x9-premium',
    instrument: 'Trimble X9',
    version: 'Premium, gyártói adatlap',
    manufacturerMaximum: '1000000',
    unit: 'pont/s',
    conditions: 'Gyártói felső érték. Nem saját mérés, és nem átadott pont/s.',
    sourceUrl: 'https://geospatial.trimble.com/en/products/hardware/trimble-x9',
    verifiedOn: '2026-11-16',
    accessConfirmed: false,
    ownerApproved: false,
    publishable: false,
  },
  {
    id: 'leica-rtc360',
    instrument: 'Leica RTC360',
    version: 'gyártói adatlap',
    manufacturerMaximum: '2000000',
    unit: 'pont/s',
    conditions: 'Gyártói felső érték. Nem saját mérés, és nem átadott pont/s.',
    sourceUrl: 'https://leica-geosystems.com/-/media/files/leicageosystems/products/datasheets/leica-rtc360-ds.ashx',
    verifiedOn: '2026-11-16',
    accessConfirmed: false,
    ownerApproved: false,
    publishable: false,
  },
  {
    id: 'riegl-vz-600i',
    instrument: 'RIEGL VZ-600i',
    version: 'gyártói adatlap',
    manufacturerMaximum: '2.2',
    unit: 'MHz impulzusismétlési frekvencia',
    conditions: 'Impulzusismétlési frekvencia. Nem azonos az átadott pont/s értékkel, és nem igazol saját eszközhozzáférést.',
    sourceUrl: 'https://www.riegl.com/de-deutschland/products/detail/riegl-vz-600i',
    verifiedOn: '2026-11-16',
    accessConfirmed: false,
    ownerApproved: false,
    publishable: false,
  },
];

const PENDING_APPROVAL = [
  'RCP vagy más, szoftverhez előkészített pontfelhő-állomány',
  'IFC mint vállalt BIM-csere, ha nincs külön modellezési csomag',
  'Natív Revit- vagy Archicad-állomány',
  'Saját műszerpark és számszerű teljesítmény',
];

const HANDOFF_ITEMS = [
  ['Felmérendő terület és kritikus részletek', 'A partner jelöli ki a zónát és azt a részletet, ami a modellezési döntéshez kell.'],
  ['Szükséges pontosság és részletesség', 'A pontosság, a pontköz, a távolságmérési zaj és az illesztési maradék külön kérdés. Egyiket sem írjuk át a másik helyére.'],
  ['Koordinátarendszer, origó és mértékegység', 'A partnertől jön, ha már ismert. Ha nem, az egyeztetés része, nem egy csendes alapértelmezés.'],
  ['Regisztráció és ellenőrzés', 'Külön mondjuk meg, ki végzi az illesztést, és milyen ellenőrzés tartozik az átadáshoz.'],
  ['Exportformátum', 'A pontfelhő, a szoftverhez előkészített állomány, a BIM-csere és a natív modell nem ugyanaz.'],
  ['Állományok bontása és méretkezelése', 'A szintek vagy zónák bontását és az átadás csatornáját akkor rögzítjük, ha a feladat ezt kéri.'],
  ['Képi dokumentáció', 'Csak akkor része a csomagnak, ha előre kérik. Nem jár minden felméréshez.'],
  ['Hozzáférési korlátok és takarások', 'A zárt, veszélyes vagy takart rész kizárás, nem utólag kitalált felület.'],
  ['Átadási ütem és elfogadási szempontok', 'Az ütem és az elfogadás szempontjai a konkrét feladathoz tartoznak, nem egy általános ígéret.'],
];

const SERVICE_LEVELS = [
  {
    id: 'A',
    title: 'Terepi adatfelvétel',
    text: 'A helyszíni felvétel. A specifikációban külön szerepel, ki végzi a regisztrációt, és milyen adatot kap a partner. Regisztrált pontfelhő csak akkor, ha ezt külön vállaljuk.',
  },
  {
    id: 'B',
    title: 'Regisztrált pontfelhő',
    text: 'A regisztráció, a rögzített ellenőrzés és az egyeztetett export együtt. Az ellenőrzés az illesztésre és a lefedettségre vonatkozik, nem a teljes projekt abszolút pontosságára.',
  },
  {
    id: 'C',
    title: 'Tervezésre előkészített adatcsomag',
    text: 'Egyeztetett bontás, formátum és a kért kiegészítő anyag. A modellkészítés ettől még külön döntés, és nem jár a csomaggal.',
  },
];

function publicInstrumentClaims(items = INSTRUMENTS) {
  return items.filter(
    (item) =>
      item.publishable === true &&
      item.ownerApproved === true &&
      item.accessConfirmed === true &&
      typeof item.sourceUrl === 'string' &&
      /^https:\/\//.test(item.sourceUrl) &&
      Boolean(item.verifiedOn) &&
      Boolean(item.manufacturerMaximum) &&
      Boolean(item.unit)
  );
}

module.exports = {
  INSTRUMENTS,
  PENDING_APPROVAL,
  HANDOFF_ITEMS,
  SERVICE_LEVELS,
  publicInstrumentClaims,
};
