/**
 * routes/features.js — Features & Pricing Page
 * Renders the features comparison and pricing (views/features.hbs)
 */

const express = require("express");
const router  = express.Router();
const config  = require("../config");

router.get("/", (req, res) => {
  res.render("features", {
    ...config,
    title:      `Features & Pricing — ${config.botName}`,
    activePage: "features",

    // Feature comparison table data
    // To add/remove rows, edit this array — the template handles the rest
    featureRows: [
      { feature: "Active events per server",        free: "10",               premium: "50" },
      { feature: "RSVP names shown per event",      free: "50",               premium: "100" },
      { feature: "Embed color choices",             free: "3 colors",         premium: "10 colors" },
      { feature: "Recurring events",                free: "✅",                premium: "✅" },
      { feature: "Google Calendar sync",            free: "✅",                premium: "✅" },
      { feature: "G-Cal integrations",              free: "Up to 2",          premium: "Up to 10" },
      { feature: "Mention & reminder notifications",free: "1 role",           premium: "Up to 3 roles" },
      { feature: "Custom button labels",            free: "❌",                premium: "✅" },
      { feature: "Future premium features",         free: "❌",                premium: "✅ Included" },
      { feature: "Support",                         free: "Community",        premium: "Priority" },
    ],
  });
});

module.exports = router;