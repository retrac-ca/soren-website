/**
 * routes/privacy.js — Privacy Policy Page
 * Renders the privacy policy (views/privacy.hbs)
 *
 * Last updated date is set here — update it whenever the policy changes.
 */

const express = require("express");
const router  = express.Router();
const config  = require("../config");

router.get("/", (req, res) => {
  res.render("privacy", {
    ...config,
    title:       `Privacy Policy — ${config.botName}`,
    activePage:  "privacy",
    lastUpdated: config.privacyLastUpdated,
  });
});

module.exports = router;
