# Content Preview Tools

## O projekcie

Content Preview Tools to aplikacja webowa SaaS pozwalająca użytkownikom podglądać treści marketingowe przed publikacją. MVP zawiera dwa narzędzia:

1. **LinkedIn Post Preview** — podgląd posta LinkedIn z hashtagami, obrazem i eksportem do PNG
2. **Email HTML Preview** — renderowanie HTML emaila z sanityzacją i eksportem do PNG

Pełne wymagania: `PRD.md`
Plan implementacji: `PLAN.md`

## Tech stack

- **Framework:** Nuxt 4 (Vue 3) z TypeScript
- **Styling:** Tailwind CSS
- **Backend:** Nitro (wbudowany w Nuxt)
- **Baza danych:** PostgreSQL (lazy singleton connection)
- **Screenshot export:** html-to-image (tylko przeglądarka, dynamiczny import)
- **Sanityzacja HTML:** DOMPurify (WHOLE_DOCUMENT: true)
- **Deploy:** Docker (multi-stage build, node:22-alpine)

## Struktura projektu

```
app/
  pages/              — strony
    index.vue         — landing page
    linkedin-preview  — narzędzie LinkedIn Preview
    email-preview     — narzędzie Email Preview
    linkedin-post-preview — strona SEO (LinkedIn)
    email-html-preview    — strona SEO (Email)
    admin             — panel admina (statystyki, feedback)
    privacy-policy    — polityka prywatności
    terms             — regulamin
    instagram-preview — coming soon
    facebook-preview  — coming soon
    twitter-preview   — coming soon
  components/
    editors/          — edytory treści (LinkedInEditor, EmailHtmlEditor)
    previews/         — komponenty podglądu (LinkedInPreview, EmailPreview)
    ui/               — reużywalne UI (ImageUploader, ExportButton, PreviewContainer, AppHeader, AppFooter, FeedbackWidget, CookieBanner)
  composables/        — logika biznesowa (useLinkedInPreview, useEmailPreview, useScreenshotExport, useTrackPreview, useDarkMode)
  utils/              — narzędzia (sanitize.ts)
  layouts/            — layout z headerem i footerem
  public/             — assety statyczne (favicon.svg, LinkedIn_icon.svg, Email_icon.svg)
server/
  api/
    health.ts         — health check
    feedback.post.ts  — submit feedbacku
    stats/track.post.ts — tracking użycia narzędzi
    admin/            — login, logout, check, stats, feedback (HMAC-signed httpOnly cookies)
  db/
    client.ts         — lazy singleton PostgreSQL
    migrate.ts        — migracje
  plugins/
    migrate.ts        — auto-migracja przy starcie
  routes/
    robots.txt.ts     — robots.txt
    sitemap.xml.ts    — sitemap
  utils/
    rateLimit.ts      — in-memory rate limiting
    verifyAdmin.ts    — weryfikacja sesji admina
  types/              — typy serwerowe
docker/
  Dockerfile          — multi-stage build
```

## Component auto-import (Nuxt 4)

Komponenty z podkatalogów `components/` mają prefiksy:
- `components/ui/*` → `<UiAppHeader>`, `<UiExportButton>`, itd.
- `components/editors/*` → `<EditorsLinkedInEditor>`, itd.
- `components/previews/*` → `<PreviewsLinkedInPreview>`, itd.

## Ikony

Własne ikony SVG w `app/public/`:
- `/LinkedIn_icon.svg` — ikona LinkedIn (używana w nawigacji, kartach, nagłówkach)
- `/Email_icon.svg` — ikona Email (j.w.)

Renderowane jako `<img src="/LinkedIn_icon.svg">` z odpowiednimi rozmiarami (w-4 nav, w-6 karty, w-7 nagłówki narzędzi, w-10/w-12 hero SEO).

## Skills

Masz dostęp do skilla `frontend-design` — **używaj go zawsze** gdy implementujesz cokolwiek związanego z UI/UX (komponenty, strony, layouty, stylowanie, responsywność).

## Kluczowe zasady

- **Obrazy NIE trafiają na serwer** — przetwarzanie tylko w przeglądarce (File API, `URL.createObjectURL()`)
- **HTML musi być sanityzowany** — DOMPurify przed renderowaniem (XSS protection, WHOLE_DOCUMENT: true)
- **Narzędzia dostępne bez logowania** — admin panel chroniony HMAC-signed cookies
- **SSR-safe imports** — `html-to-image` i `DOMPurify` importowane dynamicznie (tylko w przeglądarce)
- **Nuxt 4 compatibility mode** — `future: { compatibilityVersion: 4 }` w `nuxt.config.ts`, katalog `app/`
- **Nie pisz "free forever"** — używaj "Free to use"
- **Unikaj em dashes** — to wygląda jak styl AI

## Komendy

```bash
npm run dev      # development server
npm run build    # production build
npm run preview  # podgląd buildu produkcyjnego
```

## Zmienne środowiskowe

```
DATABASE_URL=postgresql://user:password@localhost:5432/content_preview
ADMIN_USER=admin
ADMIN_PASSWORD=...
ADMIN_SECRET=change-me-in-production
SITE_URL=https://contentpreviewtools.com
```
