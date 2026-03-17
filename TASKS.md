# Content Preview Tools MVP — Task List

Status: `[ ]` = TODO, `[x]` = DONE, `[~]` = IN PROGRESS

---

## Task 1: Inicjalizacja projektu Nuxt 4

- [x] Nadpisać `package.json` — ustawić `"type": "module"`, dodać scripts (`dev`, `build`, `generate`, `preview`), dodać zależności
- [x] Utworzyć `nuxt.config.ts`
- [x] Utworzyć `tsconfig.json`
- [x] Utworzyć `app/app.vue`
- [x] Utworzyć `.env.example`
- [x] Zaktualizować `.gitignore`
- [x] Uruchomić `npm install`
- [x] Uruchomić `npm run dev` i sprawdzić czy aplikacja startuje bez błędów

---

## Task 2: Serwer — Health endpoint i klient bazy danych

- [x] Zainstalować zależności: `pg`, `@types/pg` (dev)
- [x] Utworzyć `server/api/health.ts`
- [x] Utworzyć `server/db/client.ts` — lazy singleton Pool
- [x] Utworzyć `server/types/index.ts` — interfejsy Preview, PreviewEvent
- [x] Utworzyć `server/db/migrate.ts` — auto-migracja tabelki `preview_events`
- [x] Utworzyć `server/plugins/migrate.ts` — plugin uruchamiający migrację przy starcie
- [x] Przetestować: `curl http://localhost:3000/api/health` → `{"status":"ok"}`

---

## Task 2b: Statystyki preview (dodatkowe)

- [x] Utworzyć `POST /api/stats/track` — zapisuje event (tool_type, action) do bazy
- [x] Utworzyć `GET /api/stats` — zwraca statystyki (totals, today, last 7 days)
- [x] Utworzyć `app/composables/useTrackPreview.ts` — fire-and-forget tracking
- [x] Podpiąć tracking na stronach linkedin-preview i email-preview (preview + export)

---

## Task 3: Landing page

- [x] Utworzyć `app/components/ui/PreviewContainer.vue`
- [x] Utworzyć `app/pages/index.vue` — hero, karty narzędzi, SEO meta
- [x] Sprawdzić czy strona główna się renderuje i linki działają

---

## Task 4: LinkedIn Post Preview

- [x] Utworzyć `app/composables/useLinkedInPreview.ts`
- [x] Utworzyć `app/components/editors/LinkedInEditor.vue`
- [x] Utworzyć `app/components/ui/ImageUploader.vue`
- [x] Utworzyć `app/components/previews/LinkedInPreview.vue`
- [x] Utworzyć `app/pages/linkedin-preview.vue`

---

## Task 5: Email HTML Preview

- [x] Zainstalować: `dompurify`, `@types/dompurify`
- [x] Utworzyć `app/utils/sanitize.ts`
- [x] Utworzyć `app/composables/useEmailPreview.ts`
- [x] Utworzyć `app/components/editors/EmailHtmlEditor.vue`
- [x] Utworzyć `app/components/previews/EmailPreview.vue`
- [x] Utworzyć `app/pages/email-preview.vue`

---

## Task 6: Eksport screenshotów

- [x] Utworzyć `app/composables/useScreenshotExport.ts`
- [x] Utworzyć `app/components/ui/ExportButton.vue`
- [x] Dodać ExportButton do linkedin-preview.vue i email-preview.vue

---

## Task 7: Strony SEO

- [x] Utworzyć `app/pages/linkedin-post-preview.vue`
- [x] Utworzyć `app/pages/email-html-preview.vue`
- [x] Linki do stron SEO w footerze

---

## Task 8: Layout, nawigacja i polish

- [x] Utworzyć `app/components/ui/AppHeader.vue` — sticky, logo, nav, mobile hamburger
- [x] Utworzyć `app/components/ui/AppFooter.vue` — linki, copyright
- [x] Utworzyć `app/layouts/default.vue`
- [x] `app/app.vue` używa `<NuxtLayout>` i `<NuxtPage />`
- [x] `.env.example` istnieje
- [x] `.gitignore` poprawny
- [x] `npm run build` — buduje się bez błędów
