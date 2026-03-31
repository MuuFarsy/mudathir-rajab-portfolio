# Mudathir Rajab Portfolio

A production-ready personal portfolio website built with Next.js, TypeScript, Tailwind CSS, Framer Motion, lucide-react, and a real contact email API using Resend.

## Features

- Premium responsive portfolio layout
- Dark mode and light mode with local storage persistence
- Sticky navigation with mobile menu
- Custom downloadable MR SVG logo
- Hero profile image placeholder
- Professional sections for services, strengths, skills, projects, process, branding, and contact
- Filterable projects area
- Contact form with validation, loading, success, and error states
- `/api/contact` backend endpoint for real email sending
- Vercel-ready structure

## Install dependencies

```bash
npm install
```

## Run locally

Create a local environment file:

```bash
cp .env.example .env.local
```

Then update `.env.local` with your real values.

Start the development server:

```bash
npm run dev
```

Open:

```bash
http://localhost:3000
```

## Environment variables

Set these in `.env.local`:

```env
RESEND_API_KEY=your_resend_api_key_here
PORTFOLIO_RECEIVER_EMAIL=your-real-email@example.com
PORTFOLIO_SENDER_EMAIL=Portfolio Contact <onboarding@resend.dev>
```

### What each variable does

- `RESEND_API_KEY`: your Resend API key
- `PORTFOLIO_RECEIVER_EMAIL`: the email address where contact form messages should arrive
- `PORTFOLIO_SENDER_EMAIL`: verified sender identity used by Resend

## Deploy to Vercel

1. Push this project to GitHub.
2. Import the repository into Vercel.
3. Add the same environment variables in Vercel project settings.
4. Deploy.

## Where to edit your personal details

Edit this file:

```bash
lib/data.ts
```

Update:
- name
- title
- email
- phone
- github
- linkedin
- intro
- about
- CV path
- profile image path

## Where to put your real profile image

Replace this file:

```bash
public/profile-placeholder.svg
```

Or add your own image in `public/` and update this value in `lib/data.ts`:

```ts
profileImagePath: '/your-image-file.jpg'
```

## Where to put your real CV

Replace this file:

```bash
public/cv-placeholder.pdf
```

Or change the path in `lib/data.ts`.

## Where to add your real email credentials

Add them to:

```bash
.env.local
```

For production, also add them in Vercel environment variables.

## Main project structure

```bash
app/
  api/contact/route.ts
  globals.css
  layout.tsx
  page.tsx
components/
  logo-mark.tsx
  portfolio-page.tsx
  theme-provider.tsx
  theme-toggle.tsx
lib/
  data.ts
  utils.ts
public/
  cv-placeholder.pdf
  mr-logo.svg
  profile-placeholder.svg
.env.example
README.md
```

## Notes

- The contact form already calls `/api/contact`.
- Replace placeholder demo links, profile image, CV, and contact details with your real information.
- For Resend production use, verify your sending domain and update `PORTFOLIO_SENDER_EMAIL`.
