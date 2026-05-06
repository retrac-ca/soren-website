/**
 * server.js — Soren Website Entry Point
 * =======================================
 * Starts the Express server, registers routes, and configures
 * Handlebars as the templating engine.
 *
 * To run:
 *   node server.js           (production)
 *   npm run dev              (development — auto-restarts on file change)
 */

const express = require("express");
const { engine } = require("express-handlebars");
const crypto  = require("crypto");
const path    = require("path");
const helmet  = require("helmet");
const config  = require("./config");

const app = express();

// ── Configuration ────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.locals.cspNonce = crypto.randomBytes(16).toString("base64");
  next();
});

// ── Security Headers (helmet) ────────────────────────────────────────────────
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc:  ["'self'"],
      scriptSrc:   ["'self'", (req, res) => `'nonce-${res.locals.cspNonce}'`, "https://www.googletagmanager.com", "https://connect.facebook.net"],
      styleSrc:    ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc:     ["'self'", "https://fonts.gstatic.com"],
      imgSrc:      ["'self'", "https://i.postimg.cc", "https://www.facebook.com", "data:"],
      connectSrc:  ["'self'", "https://www.google-analytics.com", "https://www.facebook.com"],
    },
  },
}));

// ── Templating Engine (Handlebars) ───────────────────────────────────────────
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views/layouts"),
    partialsDir: path.join(__dirname, "views/partials"),
    helpers: {
      eq: (a, b) => a === b,
      json: (context) => JSON.stringify(context, null, 2),
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use((req, res, next) => {
  res.locals.canonicalUrl = config.siteUrl;
  next();
});

// ── Static Files (CSS, JS, images) ──────────────────────────────────────────
app.use(express.static(path.join(__dirname, "public"), {
  maxAge: "1d",
}));

// ── Health Check ─────────────────────────────────────────────────────────────
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", uptime: process.uptime() });
});

// ── Routes ───────────────────────────────────────────────────────────────────
const homeRouter     = require("./routes/home");
const featuresRouter = require("./routes/features");
const setupRouter    = require("./routes/setup");
const docsRouter     = require("./routes/docs");
const discordCalendarBotRouter = require("./routes/discord-calendar-bot");
const privacyRouter  = require("./routes/privacy");
const termsRouter    = require("./routes/terms");
const gcalRouter     = require("./routes/gcal");
const roadmapRouter  = require("./routes/roadmap");

app.use("/",         homeRouter);
app.use("/features", featuresRouter);
app.use("/setup",    setupRouter);
app.use("/docs",     docsRouter);
app.use("/discord-calendar-bot", discordCalendarBotRouter);
app.use("/privacy",  privacyRouter);
app.use("/terms",    termsRouter);
app.use("/gcal",     gcalRouter);
app.use("/roadmap",  roadmapRouter);

// ── 404 fallback ─────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).render("404", {
    ...config,
    title: "Page Not Found - Soren",
    robots: "noindex, follow",
    metaDescription: "The requested Soren page could not be found.",
  });
});

// ── Global Error Handler ──────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).render("error", {
    ...config,
    title:   "Server Error — Soren",
    robots:  "noindex, nofollow",
    message: "Something went wrong on our end. Please try again later.",
  });
});

// ── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅  Soren website running at http://localhost:${PORT}`);
});
