/**
 * routes/setup.js — Setup / Getting Started Page
 * Renders the installation and first-time setup guide (views/setup.hbs)
 */

const express = require("express");
const router  = express.Router();
const config  = require("../config");

router.get("/", (req, res) => {
  res.render("setup", {
    ...config,
    title:      `Getting Started — ${config.botName}`,
    activePage: "setup",
  });
});

module.exports = router;
