/**
 * config.js — Soren Website Configuration
 * =========================================
 * This is the single source of truth for site-wide settings.
 * Change your bot invite link, support server, colors, and metadata here.
 * These values are passed into every page automatically via the main layout.
 *
 * HOW TO USE:
 *   In route files: const config = require("../config");
 *   Then pass to render: res.render("page", { ...config, title: "Page Title" });
 */

module.exports = {

  // ── Bot Info ───────────────────────────────────────────────────────────────
  botName:        "Soren",
  botVersion:     "4.0 Beta",
  botTagline:     "The calendar & events bot built for communities.",
  botDescription: "Create events, manage RSVPs, and sync with Google Calendar — all inside Discord. Built for clans, guilds, and communities who want full ownership of their events.",
  supportUrl:     "https://soren.retrac.ca",
  creatorName:    "Toadle",
  creatorGithub:  "https://github.com/retrac-ca/soren",

  // ── Links ──────────────────────────────────────────────────────────────────
  inviteUrl:      "https://discord.com/oauth2/authorize?client_id=1423474696783138839&permissions=17929878105152&integration_type=0&scope=bot",
  discordServer:  "https://discord.gg/rrgds8nGUx",
  githubUrl:      "https://github.com/retrac-ca/soren",
  purchaseUrl:    "https://ko-fi.com/s/7cefffca89",

  // ── Pricing ────────────────────────────────────────────────────────────────
  premiumPrice:   "$25 CAD",
  premiumType:    "one-time per server",

  // ── Open Graph / Social Preview ────────────────────────────────────────────
  ogTitle:        "Soren — Discord Events & Calendar Bot",
  ogDescription:  "Create events, manage RSVPs, and sync with Google Calendar — all inside Discord. Built for clans, guilds, and communities.",
  ogImage:        "https://i.postimg.cc/brwRqpwb/Soren-Regular-Logo.jpg",
  ogUrl:          "https://soren.retrac.ca",

  // ── Navigation Links ────────────────────────────────────────────────────────
  navLinks: [
    { label: "Home",     href: "/",         icon: "🏠" },
    { label: "Features", href: "/features", icon: "✨" },
    { label: "Setup",    href: "/setup",    icon: "⚙️" },
    { label: "Docs",     href: "/docs",     icon: "📖" },
  ],

};