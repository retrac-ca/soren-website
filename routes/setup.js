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
    title:      `How to Add a Discord Calendar Bot | ${config.botName} Setup Guide`,
    metaDescription: "Install Soren in minutes. Follow the Discord calendar bot setup guide for /setup, /newevent, reminders, recurring events, RSVP buttons, and Google Calendar sync.",
    metaKeywords: "add Discord calendar bot, Discord bot setup guide, setup Discord event bot, Discord Google Calendar setup",
    ogTitle: "How to Add a Discord Calendar Bot | Soren Setup Guide",
    ogDescription: "A practical setup guide for adding Soren to Discord, configuring event roles, creating events, and connecting Google Calendar.",
    activePage: "setup",
    schema: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to add a Discord calendar bot with Soren",
      description: "Install Soren, run setup, create your first Discord event, and connect Google Calendar.",
      totalTime: "PT5M",
      step: [
        { "@type": "HowToStep", name: "Add Soren to Discord", text: "Invite Soren to your server and approve the required bot permissions." },
        { "@type": "HowToStep", name: "Run /setup", text: "Assign the Event Creator role for people who can create and manage events." },
        { "@type": "HowToStep", name: "Create an event", text: "Use /newevent with a channel, title, start time, and optional recurrence, reminders, roles, and RSVP limits." },
        { "@type": "HowToStep", name: "Connect Google Calendar", text: "Use /gcalint add and /gcalint verify to sync calendar digests and reminders into Discord." },
      ],
    },
  });
});

module.exports = router;
