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
    title:      `Discord Event Bot Features & Pricing | ${config.botName}`,
    metaDescription: "Compare Soren's Discord calendar bot features: RSVPs, recurring events, reminders, Google Calendar sync, waitlists, event threads, ICS export, and premium upgrades.",
    metaKeywords: "Discord event bot features, Discord calendar bot pricing, Discord RSVP bot, Discord recurring events, Discord event reminders",
    ogTitle: "Discord Event Bot Features & Pricing | Soren",
    ogDescription: "See every Soren feature, including RSVP buttons, recurring events, Google Calendar sync, reminders, waitlists, and premium limits.",
    activePage: "features",
    schema: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Soren",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Discord",
      url: config.siteUrl,
      description: "Discord calendar and event bot with RSVPs, reminders, recurring events, waitlists, Google Calendar sync, and ICS exports.",
      offers: [
        { "@type": "Offer", price: "0", priceCurrency: "CAD", name: "Free" },
        { "@type": "Offer", price: "25", priceCurrency: "CAD", name: "Premium" },
      ],
    },

    // Feature comparison table data
    // To add/remove rows, edit this array — the template handles the rest
    featureRows: [
      { feature: "Active events per server",        free: "10",               premium: "50" },
      { feature: "RSVP names shown per event",      free: "50",               premium: "100" },
      { feature: "Embed color choices",             free: "3 colors",         premium: "10 colors" },
      { feature: "Recurring events",                free: "✅",                premium: "✅" },
      { feature: "Event discussion threads",        free: "✅",                premium: "✅" },
      { feature: "Event duplication",               free: "✅",                premium: "✅" },
      { feature: "RSVP cutoff time",                free: "✅",                premium: "✅" },
      { feature: "RSVP waitlist",                   free: "✅",                premium: "✅" },
      { feature: "Export events (.ics)",            free: "✅",                premium: "✅" },
      { feature: "Google Calendar sync",            free: "✅",                premium: "✅" },
      { feature: "G-Cal integrations",              free: "Up to 2",          premium: "Up to 5" },
      { feature: "Notify roles per event",          free: "1 role",           premium: "Up to 3 roles" },
      { feature: "Reminders per event",             free: "Up to 2",          premium: "Up to 5" },
      { feature: "Custom button labels",            free: "❌",                premium: "✅" },
      { feature: "Future premium features",         free: "❌",                premium: "✅ Included" },
      { feature: "Support",                         free: "Community",        premium: "Priority" },
    ],
  });
});

module.exports = router;
