# Cloudflare DDNS UI

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

A modern web interface for managing Dynamic DNS (DDNS) records in Cloudflare. Automatically keep your domain pointing to your correct IP address with minimal configuration.

## What It Does

**Cloudflare DDNS UI** simplifies dynamic DNS management by providing a user-friendly dashboard to:
- Monitor and manage DDNS records for your Cloudflare domains
- Automatically update DNS records when your IP changes (configurable intervals)
- Track update history and current IP associations
- Securely authenticate with email/password or GitHub OAuth

## Key Features

- 🔐 **Secure Authentication** – Email/password login + GitHub OAuth integration via [Better Auth](https://better-auth.com/)
- 📊 **Dashboard** – Real-time view of your DDNS records and status
- ⚡ **Automatic Updates** – Scheduled tasks to sync IP changes (configurable via `DDNS_UPDATE_CRON_SCHEDULE`)
- 🎨 **Modern UI** – Built with Nuxt 3, Vue 3, Tailwind CSS, and daisyUI components
- ♿ **Accessible** – WCAG 2.2 Level AA compliance via [@nuxt/a11y](https://nuxt.org/modules/a11y)
- 🚀 **Fast** – Server-side rendering and optimized performance
- 🐳 **Docker-Ready** – Included `Dockerfile` and `docker-compose.yml` for easy deployment

## Getting Started

### Prerequisites

- **Node.js** 18+ or use [mise](https://mise.jdx.dev/) (configured in `mise.toml`)
- **npm** 9+
- Cloudflare API Token (with DNS edit permissions)
- *(Optional)* GitHub OAuth credentials for social login
- *(Optional)* Gitlab OAuth credentials for social login

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/voidrot/cloudflare-ddns-ui.git
   cd cloudflare-ddns-ui
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.template .env
   ```
   Then edit `.env` and set:
   ```env
   # Cloudflare
   CLOUDFLARE_API_TOKEN=your_api_token_here

   # Better Auth
   BETTER_AUTH_SECRET=your_secret_key_here
   BETTER_AUTH_URL=http://localhost:3000

   # Optional: GitHub OAuth
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret

   # Optional: Signup control
   BETTER_AUTH_DISABLE_SIGNUP=false

   # Optional: DDNS update schedule (cron format, default: every 5 minutes)
   DDNS_UPDATE_CRON_SCHEDULE=*/5 * * * *
   ```

4. **Generate database schema** (first-time setup):
   ```bash
   npm run auth:generate
   npm run db:generate
   npm run db:push
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Docker

Build and run with Docker:

```bash
docker compose up --build
```

The application will:
1. Automatically run database migrations on startup
2. Start the development server on `http://localhost:3000`

## Usage

### First Time

1. **Sign up** at `http://your.domain/register` or sign in with GitHub or Gitlab OAuth if configured
2. **Add your Cloudflare API token** in the dashboard settings
3. **Configure DDNS records** – Select domains and specify which records to auto-update
4. The app will automatically update your IP every 5 minutes (configurable)

### Dashboard

Once authenticated, the dashboard displays:
- Current IP address
- Monitored DNS records and their current values
- Last update timestamp
- Update history and status logs

### Database Management

Manage your SQLite database:

```bash
npm run db:generate   # Generate new migrations
npm run db:migrate    # Run pending migrations
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | [Nuxt 3](https://nuxt.com) + [Vue 3](https://vuejs.org) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com) + [daisyUI 5](https://daisyui.com) |
| **Backend** | Nitro (Nuxt Server) |
| **Database** | SQLite + [Drizzle ORM](https://orm.drizzle.team) |
| **Auth** | [Better Auth](https://better-auth.com) |
| **API Client** | [@cloudflare/sdk](https://github.com/cloudflare/cloudflare-sdk-js) |
| **Accessibility** | [@nuxt/a11y](https://nuxt.org/modules/a11y) |

## Project Structure

```
app/                           # Nuxt app directory (frontend)
├── pages/                     # Route pages (index, login, register, dashboard)
├── components/                # Reusable Vue components
├── composables/               # Composable utilities
├── layouts/                   # Layout templates
└── lib/                       # Client utilities (e.g., auth-client.ts)

server/                        # Backend (Nitro)
├── api/auth/                  # Better Auth endpoints
├── database/                  # Database config & schema
├── lib/auth.ts                # Better Auth setup
└── tasks/                     # Scheduled tasks

public/                        # Static assets
```

## Development

### Common Scripts

```bash
npm run dev          # Start dev server with hot reload
npm run build        # Build for production
npm run generate     # Generate static site
npm run preview      # Preview production build
npm run lint         # Run ESLint with auto-fix
```

### Code Quality

- **Linting:** ESLint with Nuxt preset (see `eslint.config.mjs`)
- **Type Safety:** TypeScript 5 + ES2022
- **Accessibility:** WCAG 2.2 Level AA compliance
- **Performance:** Optimized for Core Web Vitals

### Testing

Run tests with:
```bash
npm run test  # (if configured)
```

## Deployment

### Docker Compose

This project is optimized for deployment on any AMD64/ARM64-compatible host using Docker. Use the provided `docker-compose.yml`:

```bash
curl -O https://raw.githubusercontent.com/voidrot/cloudflare-ddns-ui/main/docker-compose.yml
curl -O https://raw.githubusercontent.com/voidrot/cloudflare-ddns-ui/main/.env.template
mv .env.template .env
# Edit .env with your configuration
docker compose up -d
```

### Environment Configuration

Set these environment variables in your `.env` file:
- `CLOUDFLARE_API_TOKEN` – Your Cloudflare API token
- `BETTER_AUTH_SECRET` – Strong random secret for session signing (use `openssl rand -base64 32` to generate)
- `BETTER_AUTH_URL` – Your production domain URL

## Support & Documentation

- 📖 **[Nuxt Docs](https://nuxt.com/docs)** – Framework documentation
- 🔐 **[Better Auth Docs](https://better-auth.com)** – Authentication setup
- ☁️ **[Cloudflare API Docs](https://developers.cloudflare.com/api)** – DNS API reference
- 🐳 **Docker** – See `Dockerfile` for containerization details

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/your-feature`)
3. Commit your changes with clear messages
4. Push to your fork and open a pull request

See `package.json` scripts for development workflows.

## License

Licensed under the MIT License – see [LICENSE](LICENSE) for details.

---

**Made with ❤️ for the open-source community**
