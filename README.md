# WardrobeAI

WardrobeAI egy mobilbarát, magyar nyelvű személyes AI stylist és virtuális tükör MVP. A saját ruháidból ad szettötleteket, testprofilból szintetikus avatart készít, és Gemini-kompatibilis try-on folyamattal mutatja meg az összeállítást.

## Fő funkciók

- **Dashboard**: időjárás-kártya, gardrób-statisztika, napi ajánlás és legutóbbi szettek.
- **Gardrób** (`/wardrobe`): képes galéria kategória-, szín- és szöveges szűréssel.
- **Új ruhadarab** (`/wardrobe/new`): drag & drop / kamera-kompatibilis képválasztás, metaadatok és AI-asszisztált kitöltés demó.
- **Testprofil** (`/body`): méretek, megjelenési adatok, 3 avatarjelölt és kiválasztott alap-avatar.
- **AI sztylista** (`/stylist`): alkalom, időjárás, hangulat és szabad szöveg alapján 3 szett.
- **Virtuális felpróbálás** (`/tryon/[outfitId]`): outfit-kép, ruhadarabok, indoklás, értékelés és mentés.

A bemutató mód kezdőadatokkal indul és a kliens oldali állapotot `localStorage`-ban tartja meg, így API kulcs nélkül is végigkattintható. A feltöltött képek a demóban data URL-ként kerülnek a kliens állapotába; a szerveroldali `/api/upload` route már tartalmazza a típus- és 8 MB-os méretellenőrzést, illetve a `public/uploads/items` mentést.

## Futtatás

```bash
npm install
cp .env.example .env.local
npm run dev
```

Nyisd meg a [http://localhost:3000](http://localhost:3000) címet.

## AI integráció

Minden AI hívás szerveroldali Route Handleren keresztül megy:

- `POST /api/stylist` — OpenAI SDK, Nexos.ai OpenAI-kompatibilis gateway; strukturált JSON válasz.
- `POST /api/avatar` — `@google/genai`, avatar prompt a testméretekből.
- `POST /api/tryon` — `@google/genai`, avatar + ruhaképek + vizuális leírás.
- `POST /api/upload` — ellenőrzött képmentés MVP helyi storage-ba.

A szükséges változókat az `.env.example` dokumentálja. Kulcsokat soha ne tegyél `NEXT_PUBLIC_*` változóba. Ha nincs beállítva Nexos vagy Gemini kulcs, a UI barátságos demó/fallback állapotot mutat, a kulcs nem kerül a kliens bundle-be.

## Adatmodell

A `prisma/schema.prisma` SQLite fejlesztési sémát tartalmaz: `User`, `BodyProfile`, `ClothingItem` és `GeneratedOutfit`. A specifikációbeli tömbmezők SQLite-kompatibilitás miatt `Json` mezők (`styleTags`, `season`, `occasion`, `itemIds`).

```bash
npm run prisma:generate
npm run prisma:push
```

## Technológia

Next.js 14 App Router, TypeScript, Tailwind CSS, lucide-react ikonok, Prisma + SQLite, OpenAI SDK a Nexos gateway-hez és hivatalos `@google/genai` SDK a képgeneráláshoz.
