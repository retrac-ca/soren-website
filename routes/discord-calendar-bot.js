/**
 * routes/discord-calendar-bot.js - Search-focused product page
 */

const express = require("express");
const router = express.Router();
const config = require("../config");

router.get("/", (req, res) => {
  res.render("discord-calendar-bot", {
    ...config,
    title: `Discord Calendar Bot for Events, RSVPs & Reminders | ${config.botName}`,
    metaDescription: "Soren is a Discord calendar bot for community events: slash-command scheduling, live RSVP buttons, recurring events, reminders, waitlists, Google Calendar sync, and ICS exports.",
    metaKeywords: "Discord calendar bot, Discord event calendar bot, Discord RSVP bot, Discord reminders bot, Google Calendar Discord bot, Discord recurring events bot",
    ogTitle: "Discord Calendar Bot for Events, RSVPs & Reminders | Soren",
    ogDescription: "Run a complete community events calendar inside Discord with RSVPs, reminders, recurrence, waitlists, and Google Calendar sync.",
    activePage: "features",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": `${config.siteUrl}/discord-calendar-bot#webpage`,
          url: `${config.siteUrl}/discord-calendar-bot`,
          name: "Discord Calendar Bot for Events, RSVPs & Reminders",
          description: "A search-focused guide to Soren as a Discord calendar bot for communities.",
          isPartOf: { "@id": `${config.siteUrl}/#website` },
          about: { "@id": `${config.siteUrl}/#software` },
        },
        {
          "@type": "SoftwareApplication",
          "@id": `${config.siteUrl}/#software`,
          name: "Soren",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Discord",
          url: config.siteUrl,
          image: config.ogImage,
          description: "Discord calendar bot for community events, RSVPs, reminders, recurring schedules, waitlists, and Google Calendar sync.",
          offers: [
            { "@type": "Offer", price: "0", priceCurrency: "CAD", name: "Free tier" },
            { "@type": "Offer", price: "25", priceCurrency: "CAD", name: "Premium per server" },
          ],
          featureList: [
            "Slash-command event creation",
            "Discord RSVP buttons",
            "Recurring events",
            "Multiple event reminders",
            "Google Calendar sync",
            "Weekly calendar digest posts",
            "RSVP waitlists and cutoff times",
            "ICS calendar export",
          ],
        },
        {
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What is a Discord calendar bot?",
              acceptedAnswer: { "@type": "Answer", text: "A Discord calendar bot lets a server create, publish, remind, and manage events directly in Discord channels." },
            },
            {
              "@type": "Question",
              name: "Can Soren sync Discord events with Google Calendar?",
              acceptedAnswer: { "@type": "Answer", text: "Yes. Soren supports Google Calendar sync and calendar digest integrations for Discord channels." },
            },
            {
              "@type": "Question",
              name: "Does Soren support recurring Discord events?",
              acceptedAnswer: { "@type": "Answer", text: "Yes. Soren supports daily, weekly, bi-weekly, bi-monthly, monthly, and custom recurring events." },
            },
            {
              "@type": "Question",
              name: "Is Soren free?",
              acceptedAnswer: { "@type": "Answer", text: "Soren has a free tier with core event features and a one-time premium upgrade per server for higher limits and customization." },
            },
          ],
        },
      ],
    },
  });
});

module.exports = router;
