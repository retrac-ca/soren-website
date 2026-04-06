# Soren Website

Official website for the **Soren** Discord Calendar & Events Bot.

Built with Node.js + Express + Handlebars. Designed to grow — the same server can host a dashboard later without rewriting anything.

---

## Pages

| Route | File | Description |
|---|---|---|
| `/` | `views/home.hbs` | Landing page with hero, features, pricing teaser, and CTA |
| `/features` | `views/features.hbs` | Full feature breakdown + pricing cards + comparison table |
| `/setup` | `views/setup.hbs` | Step-by-step getting started guide + self-hosting instructions |
| `/docs` | `views/docs.hbs` | Full command reference, FAQ, timezone table, and DB overview |

---

## Requirements

- **Node.js** 18 or newer ([download](https://nodejs.org/))
- **npm** (comes with Node)

That's it. No database, no build step, no bundler.

---

## Installation

```bash
# 1. Clone or download this folder
cd soren-website

# 2. Install dependencies
npm install

# 3. Start the server
npm start
# → http://localhost:3000
```

For development (auto-restarts on file changes):
```bash
npm run dev
```
> Requires `nodemon`. It's included as a dev dependency and installs with `npm install`.

---

## Configuration

**Everything site-wide lives in one file: `config.js`**

Open it and fill in your real values:

```js
// config.js
module.exports = {
  botName:       "Soren",
  botVersion:    "1.2",
  inviteUrl:     "https://discord.com/oauth2/authorize?...",  // ← your real invite link
  discordServer: "https://discord.gg/...",                    // ← your support server
  githubUrl:     "https://github.com/retrac-ca/soren",
  premiumPrice:  "$15",
  // ...
};
```

You never need to touch the HTML or route files to update links, the bot name, or pricing. `config.js` propagates to every page automatically.

---

## File Structure

```
soren-website/
├── server.js               ← Express entry point (start here)
├── config.js               ← ALL site-wide settings (bot name, links, pricing)
├── package.json
│
├── routes/                 ← One file per page; contains page-specific data
│   ├── home.js
│   ├── features.js         ← Edit featureRows[] here to change the comparison table
│   ├── setup.js
│   └── docs.js             ← Edit commandGroups[] and faqs[] here
│
├── views/
│   ├── layouts/
│   │   └── main.hbs        ← Wraps every page (head, header, footer)
│   ├── partials/
│   │   ├── header.hbs      ← Navigation bar
│   │   └── footer.hbs      ← Footer
│   ├── home.hbs
│   ├── features.hbs
│   ├── setup.hbs
│   ├── docs.hbs
│   └── 404.hbs
│
└── public/
    ├── css/
    │   ├── variables.css   ← 🎨 ALL colors, fonts, spacing — edit to retheme
    │   ├── base.css        ← Reset and global element styles
    │   ├── components.css  ← Buttons, cards, badges, tables, FAQ
    │   ├── layout.css      ← Header, footer, grid, container
    │   ├── pages.css       ← Page-specific styles
    │   └── animations.css  ← Scroll reveals, keyframes, motion
    ├── js/
    │   ├── theme.js        ← Dark/light toggle (runs before paint to avoid flash)
    │   └── main.js         ← Nav, scroll reveals, FAQ accordion, smooth scroll
    └── images/             ← Place your logo and any images here
```

---

## Customization

### Changing colors / theme

Open `public/css/variables.css`. This is the **only file you need to edit** to retheme the entire site.

```css
/* Dark theme — edit these */
:root {
  --color-accent:       #D4570A;   /* Primary burnt orange */
  --color-accent-light: #E8742C;   /* Hover state */
  --color-bg:           #0F0F0F;   /* Page background */
  /* ... */
}

/* Light theme */
[data-theme="light"] {
  --color-accent: #C04A00;
  --color-bg:     #FAF8F5;
  /* ... */
}
```

Every color, font, shadow, and spacing token is a CSS variable. Components automatically pick up changes.

### Adding / replacing the logo

The header and footer currently use an emoji placeholder (`📅`). To swap in your real logo:

1. Place your logo file in `public/images/` (e.g. `logo.svg`)
2. Open `views/partials/header.hbs` and find the `<!-- PLACEHOLDER -->` comment
3. Replace the `<div class="logo-placeholder">` block with:
   ```html
   <img src="/images/logo.svg" alt="Soren" class="logo-img" style="height:32px;" />
   ```
4. Repeat the same swap in `views/partials/footer.hbs`

### Changing fonts

Fonts are loaded in `views/layouts/main.hbs` via Google Fonts, and referenced in `public/css/variables.css`:

```css
--font-display: "Syne", sans-serif;   /* headings */
--font-body:    "DM Sans", sans-serif; /* body text */
```

To change fonts:
1. Pick new fonts on [Google Fonts](https://fonts.google.com/)
2. Replace the `<link>` tag in `views/layouts/main.hbs`
3. Update `--font-display` and `--font-body` in `variables.css`

### Updating the command list

All command data lives in `routes/docs.js` in the `commandGroups` array. Each entry looks like:

```js
{
  category: "Events",
  icon: "📅",
  commands: [
    { name: "/newevent", who: "Event Creator", description: "Create a new event..." },
    // ...
  ]
}
```

Add, remove, or reorder entries here — the page template handles the rest.

### Updating the pricing / comparison table

Edit the `featureRows` array in `routes/features.js`:

```js
featureRows: [
  { feature: "Events per server", free: "10", premium: "Unlimited" },
  // add rows here
]
```

### Adding a new page

1. Create `routes/newpage.js` (copy an existing route as a template)
2. Create `views/newpage.hbs`
3. Register the route in `server.js`:
   ```js
   const newpageRouter = require("./routes/newpage");
   app.use("/newpage", newpageRouter);
   ```
4. Add it to the `navLinks` array in `config.js` if you want it in the nav

---

## Deployment

### Any Node.js host (Railway, Render, Fly.io, VPS)

The server listens on `process.env.PORT` with a fallback to `3000`, so most platforms just work.

```bash
npm start
```

### Environment variables

Currently the site has no secrets — everything is in `config.js`. If you add a dashboard with OAuth later, you'll want a `.env` file. A starter setup when that time comes:

```bash
npm install dotenv
```
Then add `require('dotenv').config()` at the top of `server.js`.

### Reverse proxy (nginx)

If you're running on a VPS behind nginx, a minimal config:

```nginx
server {
    listen 80;
    server_name soren.retrac.ca;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Then get SSL via Certbot: `sudo certbot --nginx -d soren.retrac.ca`

### systemd service (keep it running)

```ini
# /etc/systemd/system/soren-website.service
[Unit]
Description=Soren Website
After=network.target

[Service]
Type=simple
User=YOUR_USER
WorkingDirectory=/path/to/soren-website
ExecStart=/usr/bin/node server.js
Restart=on-failure
RestartSec=5
Environment=NODE_ENV=production
Environment=PORT=3000

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl enable soren-website
sudo systemctl start soren-website
```

---

## Dark / Light Mode

Theme preference is saved to `localStorage` under the key `soren-theme`. The script in `public/js/theme.js` runs before the page paints so there's no flash of the wrong theme.

Default behavior:
- If the user has visited before → use their saved preference
- First visit → match the OS preference (`prefers-color-scheme`)
- Fallback → dark mode

Users can toggle at any time with the 🌙 / ☀️ button in the header.

---

## Future: Adding a Dashboard

The project is structured so a dashboard can be added without touching the marketing pages:

1. Add a new route group: `routes/dashboard.js`
2. Add a new layout: `views/layouts/dashboard.hbs` (different nav/sidebar)
3. Add session/auth middleware to `server.js`
4. Mount it: `app.use("/dashboard", requireAuth, dashboardRouter)`

The existing pages stay unchanged.

---

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Server | Express 4 | Industry standard, minimal, future-proof for dashboard |
| Templates | Handlebars (express-handlebars) | Simple, logic-light, no build step |
| CSS | Vanilla CSS with custom properties | No framework overhead; easy to override |
| JS | Vanilla JS | No bundle step; fast to load |
| Fonts | Google Fonts (Syne + DM Sans) | Loaded async, preconnected |

---

## License

MIT — same as the Soren bot itself.
