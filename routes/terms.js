/**
 * routes/terms.js — Terms of Service Page
 * Renders the terms of service (views/terms.hbs)
 *
 * Last updated date is set here — update it whenever the terms change.
 */

const express = require("express");
const router  = express.Router();
const config  = require("../config");

router.get("/", (req, res) => {
  res.render("terms", {
    ...config,
    title:       `Terms of Service — ${config.botName}`,
    activePage:  "terms",
    lastUpdated: "April 6, 2025",
  });
});

module.exports = router;
