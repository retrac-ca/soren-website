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
const path    = require("path");
const helmet  = require("helmet");

const app = express();

// ── Configuration ────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;

// ── Security Headers (helmet) ────────────────────────────────────────────────
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc:  ["'self'"],
      scriptSrc:   ["'self'", "'unsafe-inline'"],
      styleSrc:    ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc:     ["'self'", "https://fonts.gstatic.com"],
      imgSrc:      ["'self'", "https://i.postimg.cc", "data:"],
      connectSrc:  ["'self'"],
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
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

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
const privacyRouter  = require("./routes/privacy");
const termsRouter    = require("./routes/terms");
const gcalRouter     = require("./routes/gcal");
const roadmapRouter  = require("./routes/roadmap");

app.use("/",         homeRouter);
app.use("/features", featuresRouter);
app.use("/setup",    setupRouter);
app.use("/docs",     docsRouter);
app.use("/privacy",  privacyRouter);
app.use("/terms",    termsRouter);
app.use("/gcal",     gcalRouter);
app.use("/roadmap",  roadmapRouter);

// ── 404 fallback ─────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).render("404", { title: "Page Not Found — Soren" });
});

// ── Global Error Handler ──────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).render("error", {
    title:   "Server Error — Soren",
    message: "Something went wrong on our end. Please try again later.",
  });
});

// ── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅  Soren website running at http://localhost:${PORT}`);
});