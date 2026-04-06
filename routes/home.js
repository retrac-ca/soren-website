/**
 * routes/home.js — Home Page
 * Renders the landing page (views/home.hbs)
 */

const express = require("express");
const router  = express.Router();
const config  = require("../config");

router.get("/", (req, res) => {
  res.render("home", {
    ...config,
    title:       `${config.botName} — ${config.botTagline}`,
    activePage:  "home",
    isHome:      true,
  });
});

module.exports = router;
