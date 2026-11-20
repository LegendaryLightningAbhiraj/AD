const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const blockedApps = [
  {
    id: 1,
    name: "Instagram",
    icon: "logo-instagram",
    category: "Social Media",
    blocked: true,
  },
  {
    id: 2,
    name: "YouTube",
    icon: "logo-youtube",
    category: "Entertainment",
    blocked: true,
  },
  {
    id: 3,
    name: "TikTok",
    icon: "musical-notes",
    category: "Social Media",
    blocked: true,
  },
];

const squads = [
  {
    id: 1,
    name: "Early Risers",
    members: 5,
    streak: 12,
  },
  {
    id: 2,
    name: "Deep Work Club",
    members: 8,
    streak: 7,
  },
  {
    id: 3,
    name: "No Distractions",
    members: 4,
    streak: 15,
  },
];

app.get("/api/health", (req, res) => {
  res.json({ status: "API running" });
});

app.get("/api/summary", (req, res) => {
  res.json({
    screenTime: 245,
    goal: 180,
    focusTime: 120,
    pickups: 35,
  });
});

app.get("/api/blocked-apps", (req, res) => {
  res.json(blockedApps);
});

app.patch("/api/blocked-apps/:id", (req, res) => {
  const appItem = blockedApps.find(
    (item) => item.id === Number(req.params.id)
  );

  if (!appItem) {
    return res.status(404).json({ message: "App not found" });
  }

  appItem.blocked = Boolean(req.body.blocked);

  res.json(appItem);
});

app.get("/api/squads", (req, res) => {
  res.json(squads);
});

app.listen(5000, "0.0.0.0", () => {
  console.log("FOCUSLY API running on port 5000");
});