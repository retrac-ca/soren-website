/**
 * routes/gcal.js — Google Calendar OAuth Callback
 * =================================================
 * Handles the redirect from Google after a user authorizes
 * a G-Cal integration via /gcalint add.
 *
 * Google redirects to: https://soren.retrac.ca/gcal/callback?code=...
 * This route reads the code and shows the user a clean success page
 * so they can copy it and paste it into /gcalint verify in Discord.
 */

const express = require("express");
const router  = express.Router();
const config  = require("../config");

router.get("/callback", (req, res) => {
  const code  = req.query.code  || null;
  const error = req.query.error || null;

  // Google denied access or user cancelled
  if (error || !code) {
    return res.render("gcal-callback", {
      ...config,
      title:   "Authorization Failed — Soren",
      success: false,
      error:   error || "No authorization code was returned by Google.",
    });
  }

  // Success — show the code so the user can paste it into /gcalint verify
  res.render("gcal-callback", {
    ...config,
    title:   "Google Calendar Authorized — Soren",
    success: true,
    code:    code,
  });
});

module.exports = router;