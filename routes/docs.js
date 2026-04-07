/**
 * routes/docs.js — Documentation / Knowledgebase Page
 * Renders the full command reference and FAQ (views/docs.hbs)
 */

const express = require("express");
const router  = express.Router();
const config  = require("../config");

router.get("/", (req, res) => {
  res.render("docs", {
    ...config,
    title:      `Documentation — ${config.botName}`,
    activePage: "docs",

    commandGroups: [
      {
        category: "General",
        icon: "🏓",
        commands: [
          { name: "/ping",    who: "Everyone",  description: "Check bot status, latency, uptime, and version info." },
          { name: "/help",    who: "Everyone",  description: "Show all available commands in a quick reference embed." },
          { name: "/premium", who: "Everyone",  description: "View the free vs. premium feature comparison and pricing." },
        ],
      },
      {
        category: "Setup & Config",
        icon: "⚙️",
        commands: [
          { name: "/setup",        who: "Admins", description: "First-time server setup. Assigns the Event Creator role." },
          { name: "/config",       who: "Admins", description: "View current server configuration and settings." },
          { name: "/embedcolor",   who: "Admins", description: "Choose the color for event embeds (3 free, 10 premium)." },
          { name: "/premiumcode",  who: "Admins", description: "Redeem a premium activation code for your server." },
        ],
      },
      {
        category: "Events",
        icon: "📅",
        commands: [
          { name: "/newevent",      who: "Event Creator", description: "Create a new event via a 4-step guided flow: type → timezone → reminder → details." },
          { name: "/editevent",     who: "Event Creator", description: "Edit an existing event by its ID (slash command fallback)." },
          { name: "/deleteevent",   who: "Event Creator", description: "Permanently delete an event and its embed." },
          { name: "/cancelevent",   who: "Event Creator", description: "Soft-cancel an event (marks as cancelled without deleting)." },
          { name: "/listevents",    who: "Everyone",      description: "View all upcoming events in this server, paginated." },
          { name: "/myevents",      who: "Everyone",      description: "List events you've RSVPed to (accepted or tentative)." },
          { name: "/eventbuttons",  who: "Event Creator", description: "Customize RSVP button labels and toggle the Tentative button." },
        ],
      },
      {
        category: "Google Calendar Sync",
        icon: "📆",
        commands: [
          { name: "/gcal connect",    who: "Admins", description: "Connect a primary Google Calendar to push new /newevent events into." },
          { name: "/gcal verify",     who: "Admins", description: "Complete the Google Calendar OAuth connection with your auth code." },
          { name: "/gcal disconnect", who: "Admins", description: "Remove the primary Google Calendar connection." },
        ],
      },
      {
        category: "G-Cal Integrations",
        icon: "🗓️",
        commands: [
          { name: "/gcalint add",        who: "Admins", description: "Connect a Google Calendar for automatic weekly digest summaries." },
          { name: "/gcalint verify",     who: "Admins", description: "Complete auth and pick which calendar to use from your account." },
          { name: "/gcalint list",       who: "Admins", description: "View all connected calendars and their posting schedules." },
          { name: "/gcalint remove",     who: "Admins", description: "Disconnect and remove a calendar integration." },
          { name: "/gcalint pause",      who: "Admins", description: "Pause or resume auto-posting for a calendar." },
          { name: "/gcalint post",       who: "Admins", description: "Manually trigger a summary post for a calendar right now." },
        ],
      },
    ],

    faqs: [
      {
        q: "Do I need Google Cloud to use Soren?",
        a: "No. The core event system (create, RSVP, reminders) works completely without Google. Google Calendar integration is optional and requires a Google Cloud project with the Calendar API enabled."
      },
      {
        q: "What happens when I hit the free event limit?",
        a: "Soren will show an error when you try to create more than 10 active events on the free tier. You can delete old events to make room, or upgrade to Premium for up to 50 active events."
      },
      {
        q: "Can multiple people create events?",
        a: "Yes — anyone with the Event Creator role (assigned during /setup) can create, edit, and delete events. Server administrators always have full access regardless of role."
      },
      {
        q: "Do RSVP buttons work after the bot restarts?",
        a: "Yes. Soren registers its views persistently so buttons remain fully functional across restarts. No need to re-post events."
      },
      {
        q: "What is the G-Cal Integrations feature vs. Google Calendar Sync?",
        a: "They're two separate systems. /gcal sync pushes events you create via /newevent into Google Calendar. G-Cal Integrations (/gcalint) reads from Google Calendar and posts weekly digest summaries into Discord — great for syncing a shared team calendar into your server. Free tier allows up to 2 integrations; Premium allows up to 10."
      },
      {
        q: "Is Premium per-server or per-account?",
        a: "Premium is per-server. Each server that wants premium features needs its own activation code."
      },
      {
        q: "Can I self-host Soren?",
        a: "Yes — Soren is fully open source. Clone the repo from GitHub, follow the setup guide, and run it on any machine or VPS with Python 3.10+."
      },
    ],
  });
});

module.exports = router;