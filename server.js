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
const path = require("path");

const app = express();

// ── Configuration ────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;

// ── Templating Engine (Handlebars) ───────────────────────────────────────────
// Views live in /views, layout file is /views/layouts/main.hbs
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views/layouts"),
    partialsDir: path.join(__dirname, "views/partials"),
    // ── Custom Helpers ──────────────────────────────────────────────────
    helpers: {
      // eq: equality check used in templates for active nav states
      // Usage: {{#if (eq activePage 'home')}}active{{/if}}
      eq: (a, b) => a === b,
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// ── Static Files (CSS, JS, images) ──────────────────────────────────────────
app.use(express.static(path.join(__dirname, "public")));

// ── Routes ───────────────────────────────────────────────────────────────────
// Each page has its own route file in /routes/
const homeRouter    = require("./routes/home");
const featuresRouter= require("./routes/features");
const setupRouter   = require("./routes/setup");
const docsRouter    = require("./routes/docs");
const privacyRouter = require("./routes/privacy");
const termsRouter   = require("./routes/terms");

app.use("/",         homeRouter);
app.use("/features", featuresRouter);
app.use("/setup",    setupRouter);
app.use("/docs",     docsRouter);
app.use("/privacy",  privacyRouter);
app.use("/terms",    termsRouter);

// ── 404 fallback ─────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).render("404", { title: "Page Not Found — Soren" });
});

// ── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅  Soren website running at http://localhost:${PORT}`);
});
