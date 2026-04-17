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
          { name: "/premium", who: "Everyone",  description: "View the free vs. premium feature comparison and pricing directly in Discord." },
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
          { name: "/newevent",          who: "Event Creator", description: "Create an event in a single command. Required: channel, title, start. Optional: timezone (autocomplete), recurrence (autocomplete), role (@mention picker), reminder (minutes), end, description, max_rsvp." },
          { name: "/editeventdetails",  who: "Event Creator", description: "Edit an event's title and description by its ID." },
          { name: "/editeventtime",     who: "Event Creator", description: "Edit an event's start and end time by its ID. Resets the reminder so it fires correctly for the new time." },
          { name: "/editeventmentions", who: "Event Creator", description: "Edit the notify roles for an event by its ID." },
          { name: "/deleteevent",       who: "Event Creator", description: "Permanently delete an event and its embed." },
          { name: "/cancelevent",       who: "Event Creator", description: "Soft-cancel an event (marks as cancelled without deleting)." },
          { name: "/listevents",        who: "Everyone",      description: "View all upcoming events in this server, paginated." },
          { name: "/myevents",          who: "Everyone",      description: "List all events you've RSVPed to (accepted or tentative) across the server." },
          { name: "/eventbuttons",      who: "Event Creator", description: "Toggle the Tentative button on any event. Custom RSVP label renaming requires Premium." },
        ],
      },
      {
        category: "G-Cal Integrations",
        icon: "🗓️",
        commands: [
          { name: "/gcalint add",       who: "Admins", description: "Connect a Google Calendar for automatic digest summaries and reminders. Walks through a 3-step setup wizard." },
          { name: "/gcalint verify",    who: "Admins", description: "Complete OAuth and pick which calendar to use from your account." },
          { name: "/gcalint list",      who: "Admins", description: "View all connected calendars and their posting schedules." },
          { name: "/gcalint remove",    who: "Admins", description: "Disconnect and remove a calendar integration." },
          { name: "/gcalint pause",     who: "Admins", description: "Pause or resume auto-posting for a calendar." },
          { name: "/gcalint post",      who: "Admins", description: "Manually trigger a summary post for a calendar right now." },
          { name: "/gcalint reminder",  who: "Admins", description: "Set the reminder offset for a calendar integration (15, 30, 60, or 1440 minutes before an event)." },
          { name: "/gcalint reminders", who: "Admins", description: "Toggle reminders on or off for a specific calendar integration." },
        ],
      },
      {
        category: "Mod Logs",
        icon: "📋",
        commands: [
          { name: "/modlogs setchannel", who: "Admins", description: "Set the channel where Soren posts structured audit logs for event and RSVP activity." },
          { name: "/modlogs disable",    who: "Admins", description: "Disable mod log posting without removing the channel config." },
          { name: "/modlogs resume",     who: "Admins", description: "Resume mod log posting to the previously configured channel." },
          { name: "/modlogs status",     who: "Admins", description: "Check whether mod logs are enabled and which channel they're posting to." },
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
        q: "How do I set a timezone or recurrence when creating an event?",
        a: "Both are optional fields in /newevent. As you type in the timezone field, Discord will autocomplete matching options from a curated list first, then fall back to all IANA timezones for more specific searches. Recurrence shows 7 options — Single, Daily, Weekly, Bi-Weekly, Bi-Monthly, Monthly, and Custom — as a searchable autocomplete list."
      },
      {
        q: "What is the G-Cal Integrations feature?",
        a: "G-Cal Integrations (/gcalint) connects a Google Calendar to your Discord server. Soren posts weekly digest summaries of upcoming events into a channel of your choice, and can fire reminders before GCal events. Free tier allows up to 2 integrations; Premium allows up to 5."
      },
      {
        q: "Can I notify multiple roles when a reminder fires?",
        a: "Free servers can notify 1 role per event reminder. Premium servers can notify up to 3 roles — useful for communities with multiple member groups or divisions."
      },
      {
        q: "How do I see which events I've RSVPed to?",
        a: "Run /myevents in any channel to see a list of all events you've accepted or marked tentative in the server."
      },
      {
        q: "Can I set a cap on how many people can RSVP?",
        a: "Yes — use the max_rsvp field in /newevent to set a cap on accepted RSVPs for that event."
      },
      {
        q: "Is Premium per-server or per-account?",
        a: "Premium is per-server. Each server that wants premium features needs its own activation code. Run /premium in Discord to see the full feature comparison."
      },
      {
        q: "Can I self-host Soren?",
        a: "Yes — Soren is fully open source. Clone the repo from GitHub, follow the setup guide, and run it on any machine or VPS with Python 3.10+."
      },
    ],
  });
});

module.exports = router;