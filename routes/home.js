/**
 * routes/home.js - Home Page
 * Renders the landing page (views/home.hbs)
 */

const express = require("express");
const router = express.Router();
const config = require("../config");

router.get("/", (req, res) => {
  res.render("home", {
    ...config,
    title: `Discord Calendar Bot for Events, RSVPs & Google Calendar Sync | ${config.botName}`,
    metaDescription: "Add Soren, the Discord calendar bot built for communities. Create events, collect RSVPs, schedule reminders, run recurring events, and sync Google Calendar.",
    metaKeywords: "Discord calendar bot, Discord event bot, Discord RSVP bot, Google Calendar Discord bot, Discord event reminders",
    ogTitle: "Soren | Discord Calendar Bot for Events, RSVPs & Reminders",
    ogDescription: "Create Discord events, manage live RSVPs, automate reminders, and sync Google Calendar with Soren.",
    activePage: "home",
    isHome: true,
    activeServers: config.activeServers,
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": `${config.siteUrl}/#website`,
          url: config.siteUrl,
          name: "Soren",
          description: config.metaDescription,
          inLanguage: "en-US",
        },
        {
          "@type": "SoftwareApplication",
          "@id": `${config.siteUrl}/#software`,
          name: "Soren",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Discord",
          description: config.metaDescription,
          url: config.siteUrl,
          image: config.ogImage,
          offers: [
            { "@type": "Offer", price: "0", priceCurrency: "CAD", name: "Free tier" },
            { "@type": "Offer", price: "25", priceCurrency: "CAD", name: "Premium per server" },
          ],
          featureList: [
            "Discord event creation",
            "Live RSVP buttons",
            "Recurring events",
            "Event reminders",
            "Google Calendar sync",
            "RSVP waitlists",
            "ICS event export",
          ],
        },
        {
          "@type": "Organization",
          "@id": `${config.siteUrl}/#organization`,
          name: "Soren",
          url: config.siteUrl,
          logo: config.ogImage,
          sameAs: [config.githubUrl, config.topggVoteUrl],
        },
      ],
    },
  });
});

module.exports = router;
