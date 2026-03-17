# Content Preview Tools MVP — Plan implementacji

## Kontekst

Projekt jest całkowicie pusty (tylko `package.json` z metadanymi i `PRD.md`). Trzeba zbudować od zera aplikację Nuxt 4 z dwoma narzędziami: LinkedIn Post Preview i Email HTML Preview.

---

## Task 1: Inicjalizacja projektu Nuxt 4

**Cel:** Działająca aplikacja Nuxt 4 z TypeScript i Tailwind CSS.

**Pliki:**
- `package.json` — nadpisać, dodać zależności (nuxt, vue, @nuxtjs/tailwindcss, typescript)
- `nuxt.config.ts` — compatibilityVersion: 4, moduł Tailwind, runtimeConfig (databaseUrl)
- `tsconfig.json` — extends `.nuxt/tsconfig.json`
- `app/app.vue` — `<NuxtLayout><NuxtPage /></NuxtLayout>`
- `.env.example` — `DATABASE_URL=`
- Zaktualizować `.gitignore` — `.output`, `.nuxt`, `.data`, `node_modules`, `.env`

**Weryfikacja:** `npm install && npm run dev` — aplikacja startuje na localhost:3000.

---

## Task 2: Serwer — Health endpoint i klient bazy danych

**Cel:** API health check + przygotowanie połączenia z PostgreSQL.

**Pliki:**
- `server/api/health.ts` — zwraca `{ status: 'ok' }`
- `server/db/client.ts` — lazy singleton Pool z `pg`, czyta `DATABASE_URL` z runtimeConfig
- `server/types/index.ts` — interfejs `Preview` (id, tool_type, content_json, created_at)

**Zależności:** `pg`, `@types/pg`

**Weryfikacja:** `curl http://localhost:3000/api/health` zwraca `{"status":"ok"}`.

---

## Task 3: Landing page

**Cel:** Strona główna z opisem produktu i linkami do narzędzi.

**Pliki:**
- `app/pages/index.vue` — hero section, dwie karty narzędzi (LinkedIn, Email), `useHead()` dla SEO
- `app/components/ui/PreviewContainer.vue` — reużywalny wrapper karty podglądu (props: title, slot)

**Weryfikacja:** Otwórz `/` — widać landing page z linkami do `/linkedin-preview` i `/email-preview`.

---

## Task 4: LinkedIn Post Preview

**Cel:** Edytor tekstu + podgląd w stylu LinkedIn z obsługą obrazów.

**Pliki:**
- `app/composables/useLinkedInPreview.ts` — stan reaktywny (postText, imageUrl, imageFile), parsowanie hashtagów (regex `/#[\w]+/g`), walidacja obrazów (5MB, typy image/*), `URL.createObjectURL()`
- `app/components/editors/LinkedInEditor.vue` — textarea z v-model, licznik znaków (limit 3000)
- `app/components/ui/ImageUploader.vue` — input file + drag&drop, walidacja rozmiaru, thumbnail, przycisk usuwania. Tylko przeglądarka, zero uploadu na serwer
- `app/components/previews/LinkedInPreview.vue` — karta w stylu LinkedIn: avatar placeholder, nazwa, treść z hashtagami na niebiesko (#0a66c2), obraz, pasek reakcji. Root element z `id="linkedin-preview-container"`
- `app/pages/linkedin-preview.vue` — layout dwukolumnowy (edytor | podgląd), `useHead()`

**Weryfikacja:** `/linkedin-preview` — wpisz tekst z hashtagami, dodaj obraz, sprawdź real-time preview.

---

## Task 5: Email HTML Preview

**Cel:** Edytor HTML + bezpieczny podgląd wyrenderowanego emaila.

**Pliki:**
- `app/utils/sanitize.ts` — wrapper na DOMPurify, pozwala na tagi emailowe (table, inline style), blokuje script/iframe/event handlery/javascript: URLs
- `app/composables/useEmailPreview.ts` — stan (htmlContent), computed sanitizedHtml, domyślny szablon HTML emaila
- `app/components/editors/EmailHtmlEditor.vue` — textarea monospace, przycisk "Załaduj przykład"
- `app/components/previews/EmailPreview.vue` — iframe z `srcdoc` (izolacja CSS emaila od strony), max-width 600px. Root z `id="email-preview-container"`
- `app/pages/email-preview.vue` — layout dwukolumnowy, `useHead()`

**Zależności:** `dompurify`, `@types/dompurify`

**Weryfikacja:** `/email-preview` — wklej HTML, sprawdź renderowanie. Wklej `<script>alert('xss')</script>` — nie powinno się wykonać.

---

## Task 6: Eksport screenshotów

**Cel:** Przycisk pobierania podglądu jako PNG na obu stronach narzędzi.

**Pliki:**
- `app/composables/useScreenshotExport.ts` — `exportAsImage(elementId, filename)` używa dynamicznego importu `html-to-image` (SSR-safe), toPng → pobranie pliku, stan `isExporting`
- `app/components/ui/ExportButton.vue` — props: targetId, filename. Przycisk z loading state, owinięty w `<ClientOnly>`

**Zależności:** `html-to-image`

**Podpięcie:** Dodać ExportButton do `linkedin-preview.vue` i `email-preview.vue`.

**Weryfikacja:** Wpisz treść → kliknij Export → pobierze się plik PNG.

---

## Task 7: Strony SEO

**Cel:** Dedykowane landing pages dla SEO pod konkretne keywordy.

**Pliki:**
- `app/pages/linkedin-post-preview.vue` — H1 z keywordem, opis narzędzia, "jak to działa", FAQ (`<details>`), CTA → `/linkedin-preview`
- `app/pages/email-html-preview.vue` — analogicznie, CTA → `/email-preview`

**SEO:** `useHead()` + `useSeoMeta()` z title, description, og:tags na każdej stronie.

**Weryfikacja:** Otwórz `/linkedin-post-preview` i `/email-html-preview`, sprawdź meta tagi w devtools.

---

## Task 8: Layout, nawigacja i polish

**Cel:** Spójny wygląd na wszystkich stronach — header, footer, responsywność.

**Pliki:**
- `app/layouts/default.vue` — header + slot + footer
- `app/components/ui/AppHeader.vue` — logo/nazwa → `/`, linki do narzędzi, hamburger na mobile
- `app/components/ui/AppFooter.vue` — linki do stron SEO, copyright

**Weryfikacja:** Nawiguj po wszystkich stronach — header/footer wszędzie, responsywność na mobile.

---

## Kolejność wykonania

```
Task 1 (Init)
  ├── Task 2 (Serwer/DB)        — niezależne
  ├── Task 3 (Landing page)     — niezależne
  ├── Task 4 (LinkedIn Preview) — niezależne
  └── Task 5 (Email Preview)    — niezależne
        └── Task 6 (Screenshot Export) — po Task 4 i 5
              └── Task 7 (SEO pages)   — po Task 3
                    └── Task 8 (Layout) — na końcu
```

## Zależności npm

**Produkcyjne:** nuxt, vue, dompurify, html-to-image, pg
**Dev:** @nuxtjs/tailwindcss, typescript, @types/dompurify, @types/pg

## Lista plików (23 pliki)

```
nuxt.config.ts, tsconfig.json, package.json, .env.example
app/app.vue
app/layouts/default.vue
app/pages/index.vue, linkedin-preview.vue, email-preview.vue
app/pages/linkedin-post-preview.vue, email-html-preview.vue
app/components/editors/LinkedInEditor.vue, EmailHtmlEditor.vue
app/components/previews/LinkedInPreview.vue, EmailPreview.vue
app/components/ui/ImageUploader.vue, PreviewContainer.vue, ExportButton.vue, AppHeader.vue, AppFooter.vue
app/composables/useLinkedInPreview.ts, useEmailPreview.ts, useScreenshotExport.ts
app/utils/sanitize.ts
server/api/health.ts, server/db/client.ts, server/types/index.ts
```
