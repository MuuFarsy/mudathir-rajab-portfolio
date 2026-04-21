# Mudathir Rajab Portfolio

A production-ready personal portfolio website built with Next.js, TypeScript, Tailwind CSS, Framer Motion, lucide-react, and a real contact email API using Nodemailer.

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
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=example@gmail.com
SMTP_PASS=your_app_password_here
PORTFOLIO_SENDER_EMAIL=Portfolio Contact <example@gmail.com>
PORTFOLIO_RECEIVER_EMAIL=mudathirrajab69@gmail.com
```

### What each variable does

- `SMTP_HOST`: your SMTP server host
- `SMTP_PORT`: your SMTP server port
- `SMTP_SECURE`: `true` for SSL/TLS transports such as port `465`, otherwise `false`
- `SMTP_USER`: the SMTP login username
- `SMTP_PASS`: the SMTP login password or app password
- `PORTFOLIO_SENDER_EMAIL`: sender address shown on outgoing emails
- `PORTFOLIO_RECEIVER_EMAIL`: inbox that should receive contact form messages

The contact form sends all messages to `PORTFOLIO_RECEIVER_EMAIL`.

For Gmail SMTP, use `smtp.gmail.com` with port `465`, set `SMTP_SECURE=true`, and generate a Google App Password for `SMTP_PASS`. Regular Gmail account passwords will not work.

## Deploy to Vercel

1. Push this project to GitHub.
2. Import the repository into Vercel.
3. Add `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `PORTFOLIO_SENDER_EMAIL`, and `PORTFOLIO_RECEIVER_EMAIL` in Vercel project settings.
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
- For Gmail SMTP, enable 2-Step Verification and create an App Password for `SMTP_PASS`.
- Keep `PORTFOLIO_RECEIVER_EMAIL` set to the personal inbox where you want portfolio inquiries delivered.
