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
      { feature: "Events per server",        free: "10",          premium: "Unlimited" },
      { feature: "RSVP list per event",      free: "50 shown",    premium: "Unlimited" },
      { feature: "Embed color choices",      free: "3 colors",    premium: "8 colors" },
      { feature: "Single & recurring events",free: "✅",           premium: "✅" },
      { feature: "Accept / Tentative / Decline RSVP", free: "✅", premium: "✅" },
      { feature: "Pre-event reminders",      free: "✅",           premium: "✅" },
      { feature: "Google Calendar sync",     free: "✅",           premium: "✅" },
      { feature: "G-Cal integrations",       free: "Up to 5",     premium: "Unlimited" },
      { feature: "Custom button labels",     free: "❌",           premium: "✅ (coming soon)" },
      { feature: "Future premium features",  free: "❌",           premium: "✅ Included" },
      { feature: "Support",                  free: "Community",   premium: "Priority" },
    ],
  });
});

module.exports = router;
