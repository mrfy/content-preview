# Content Preview Tools

## O projekcie

Content Preview Tools to aplikacja webowa SaaS pozwalająca użytkownikom podglądać treści marketingowe przed publikacją. MVP zawiera dwa narzędzia:

1. **LinkedIn Post Preview** — podgląd posta LinkedIn z hashtagami, obrazem i eksportem do PNG
2. **Email HTML Preview** — renderowanie HTML emaila z sanityzacją i eksportem do PNG

Pełne wymagania: `PRD.md`
Plan implementacji: `PLAN.md`
Lista tasków: `TASKS.md`

## Tech stack

- **Framework:** Nuxt 4 (Vue 3) z TypeScript
- **Styling:** Tailwind CSS
- **Backend:** Nitro (wbudowany w Nuxt)
- **Baza danych:** PostgreSQL (minimalne użycie w MVP, lazy connection)
- **Screenshot export:** html-to-image (tylko przeglądarka)
- **Sanityzacja HTML:** DOMPurify

## Struktura projektu

```
app/
  pages/           — strony (index, linkedin-preview, email-preview, strony SEO)
  components/
    editors/       — edytory treści (LinkedInEditor, EmailHtmlEditor)
    previews/      — komponenty podglądu (LinkedInPreview, EmailPreview)
    ui/            — reużywalne UI (ImageUploader, ExportButton, PreviewContainer, AppHeader, AppFooter)
  composables/     — logika biznesowa (useLinkedInPreview, useEmailPreview, useScreenshotExport)
  utils/           — narzędzia (sanitize.ts)
  layouts/         — layout z headerem i footerem
server/
  api/             — endpointy API (health.ts)
  db/              — klient bazy danych
  types/           — typy serwerowe
```

## Skills

Masz dostęp do skilla `frontend-design` — **używaj go zawsze** gdy implementujesz cokolwiek związanego z UI/UX (komponenty, strony, layouty, stylowanie, responsywność).

## Kluczowe zasady

- **Obrazy NIE trafiają na serwer** — przetwarzanie tylko w przeglądarce (File API, `URL.createObjectURL()`)
- **HTML musi być sanityzowany** — DOMPurify przed renderowaniem (XSS protection)
- **Brak autentykacji w MVP** — narzędzia dostępne bez logowania
- **SSR-safe imports** — `html-to-image` importowany dynamicznie (tylko w przeglądarce)
- **Nuxt 4 compatibility mode** — `future: { compatibilityVersion: 4 }` w `nuxt.config.ts`, katalog `app/`

## Komendy

```bash
npm run dev      # development server
npm run build    # production build
npm run preview  # podgląd buildu produkcyjnego
```

## Zmienne środowiskowe

```
DATABASE_URL=postgresql://user:password@localhost:5432/content_preview
```
