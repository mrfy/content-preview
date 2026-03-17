# PRD — Content Preview Tools (MVP)

# 1. Product Overview

Content Preview Tools is a lightweight web application that allows users to preview how their marketing content will appear before publishing.

The MVP includes two tools:

1. LinkedIn Post Preview
2. Email HTML Preview

The system is designed as a simple SaaS platform that may evolve into a suite of marketing preview tools.

Target users:

- marketers
- founders
- freelancers
- agencies
- social media managers

The application should be simple, fast, and require no account creation for the MVP.

---

# 2. Goals

## Primary Goal

Allow users to preview marketing content before publishing.

## Secondary Goals

- reduce publishing errors
- provide instant visual feedback
- create a simple tool that works immediately without setup

---

# 3. MVP Scope

The MVP includes two tools.

---

## Tool 1 — LinkedIn Post Preview

Inputs:

- post text
- optional image
- hashtags
- links

Outputs:

- realistic LinkedIn post preview
- downloadable screenshot

---

## Tool 2 — Email HTML Preview

Inputs:

- HTML email content

Outputs:

- rendered email preview
- downloadable screenshot

The preview should show how the email layout appears in a typical email client environment.

---

# 4. User Flow

## Landing Page

User visits the website.

User sees:

- LinkedIn Post Preview
- Email HTML Preview

User can immediately start using tools.

No login required.

---

## LinkedIn Preview Flow

1. User writes post text
2. User optionally uploads an image
3. Preview updates instantly
4. User exports preview as image

---

## Email Preview Flow

1. User pastes HTML email
2. Email is rendered
3. User exports screenshot preview

---

# 5. Core Features

## LinkedIn Post Preview

Features:

- real-time preview
- LinkedIn-style layout
- hashtag highlighting
- optional image preview
- screenshot export

---

## Email HTML Preview

Features:

- HTML rendering
- safe HTML sanitization
- screenshot export

---

# 6. Image Handling (MVP)

Images must NOT be uploaded to the server.

Images are processed only in the browser.

Implementation:

- use browser File API
- generate preview using `URL.createObjectURL()`
- keep image only in frontend state

Images disappear after page refresh.

---

# 7. Monetization Strategy

The MVP implements only a **Free plan**.

Future monetization may include:

- removing watermark from screenshots
- unlimited preview generation
- shareable preview links
- preview history
- team collaboration features

Billing is NOT implemented in MVP.

---

# 8. SEO Strategy

SEO is the primary acquisition channel.

Dedicated landing pages should exist for each tool.

Examples:

/linkedin-post-preview  
/email-html-preview  

Each page should contain:

- explanation of the tool
- screenshots
- FAQ
- call to action

Target keywords:

- linkedin post preview
- email html preview
- preview linkedin post
- html email preview

---

# 9. Technology Stack

Language:

TypeScript across the entire codebase.

---

## Frontend

Framework:

Vue 3

Meta Framework:

Nuxt 4

Styling:

Tailwind CSS

Frontend responsibilities:

- text editors
- HTML editor
- preview rendering
- browser image uploads
- screenshot export

Screenshots should be generated in the browser using libraries like:

html-to-image

---

## Backend

Backend runs inside Nuxt using Nitro.

Language:

TypeScript

Purpose:

Provide minimal API infrastructure and prepare architecture for future features.

The backend is intentionally simple in MVP.

---

# 10. Database

A database connection should exist but usage should be minimal.

Connection parameters are provided via environment variables.

Example environment variables:

DATABASE_URL

Example format:

postgresql://user:password@host:port/database

The backend should initialize a database connection on startup.

No complex schema is required for MVP.

---

# 11. Optional Data Model (Future)

If preview persistence is added later.

Preview

Fields:

id  
tool_type  
content_json  
created_at  

---

# 12. API Endpoints

Health Check

GET /api/health

Response:

status: ok

---

Future endpoints may include:

POST /api/previews  
GET /api/previews/:id  

These are not required in MVP.

---

# 13. Project Structure (Nuxt 4)

content-preview/

app/

pages/
index.vue
linkedin-preview.vue
email-preview.vue

components/

editors/
LinkedInEditor.vue
EmailHtmlEditor.vue

previews/
LinkedInPreview.vue
EmailPreview.vue

ui/
ImageUploader.vue
PreviewContainer.vue
ExportButton.vue

composables/

utils/

server/

api/
health.ts

db/
client.ts

types/

---

# 14. Security Requirements

The system must implement:

- HTML sanitization for email preview
- XSS protection
- file size limits for images
- safe HTML rendering

---

# 15. Development Milestones

Milestone 1

Project setup

- Nuxt 4 initialization
- TypeScript setup
- Tailwind setup

---

Milestone 2

LinkedIn Preview

- LinkedIn preview component
- text editor
- image upload (browser only)

---

Milestone 3

Email Preview

- HTML editor
- email preview renderer

---

Milestone 4

Screenshot Export

- screenshot generation using html-to-image

---

Milestone 5

Landing Page

- tool descriptions
- entry points to preview tools
