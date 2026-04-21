/**
 * routes/roadmap.js — Roadmap Page
 * Renders the public feature roadmap (views/roadmap.hbs)
 *
 * To update the roadmap, edit roadmap.json in the repo root.
 * No code changes needed — just update the JSON and push to GitHub.
 */

const express = require("express");
const router  = express.Router();
const path    = require("path");
const fs      = require("fs");
const config  = require("../config");

router.get("/", (req, res) => {
  const roadmapPath = path.join(__dirname, "../roadmap.json");

  let all;
  try {
    all = JSON.parse(fs.readFileSync(roadmapPath, "utf8"));
  } catch (err) {
    console.error("Failed to load roadmap.json:", err);
    return res.status(500).render("error", {
      ...config,
      title: `Roadmap Unavailable — ${config.botName}`,
      message: "The roadmap couldn't be loaded. Please try again later.",
    });
  }

  // Sort by priority
  all.sort((a, b) => a.priority - b.priority);

  // Attach display helpers to each item
  const features = all.map(f => ({
    ...f,
    isFree:    f.tier === "Both" || f.tier === "Free",
    isPremium: f.tier === "Both" || f.tier === "Premium",
    tierBoth:  f.tier === "Both",
    tierFree:  f.tier === "Free",
    tierPremium: f.tier === "Premium",
    isPlanned:    f.status === "Planned",
    isInProgress: f.status === "In Progress",
    isComplete:   f.status === "Complete",
    isDeferred:   f.status === "Deferred",
    isEasy:   f.complexity === "Easy",
    isMedium: f.complexity === "Medium",
    isHard:   f.complexity === "Hard",
    isV46: f.version === "v4.6",
    isV50: f.version === "v5.0",
  }));

  // Buckets for version sections
  const v46 = features.filter(f => f.version === "v4.6");
  const v50 = features.filter(f => f.version === "v5.0");

  // Summary counts for the stats bar
  const totalFeatures  = features.length;
  const plannedCount   = features.filter(f => f.status === "Planned").length;
  const inProgressCount = features.filter(f => f.status === "In Progress").length;
  const completeCount  = features.filter(f => f.status === "Complete").length;

  res.render("roadmap", {
    ...config,
    title:      `Roadmap — ${config.botName}`,
    activePage: "roadmap",
    features,
    v46,
    v50,
    totalFeatures,
    plannedCount,
    inProgressCount,
    completeCount,
  });
});

module.exports = router;