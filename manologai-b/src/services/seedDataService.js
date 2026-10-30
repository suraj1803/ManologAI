const mongoose = require("mongoose");
const User = require("../models/user");
const Emotion = require("../models/emotions");
const TimeTracker = require("../models/timeTracker");
const LifeRating = require("../models/lifeRating");
const Habit = require("../models/habit");
const DailyEntry = require("../models/dailyEntry");
const Timetable = require("../models/timetable");
const Pad = require("../models/pad");

function getMidnight(daysAgo = 0) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  d.setHours(0, 0, 0, 0);
  return d;
}

const JOURNAL_SNIPPETS = [
  {
    daysAgo: 0,
    text: "Finalized the project architecture and verified data flow between frontend analytics and backend Mongoose aggregation pipeline. Feeling accomplished and confident about the academic viva evaluation.",
    rating: 9,
    tags: ["btech", "project", "architecture", "viva"],
    metrics: { focusHours: 7, productivity: "high" }
  },
  {
    daysAgo: 1,
    text: "Refactored the Recharts telemetry dashboards on the Analytics page. Tested sleep vs mood correlation scatter plots with Dr. Khaskalam's feedback in mind.",
    rating: 8,
    tags: ["frontend", "react", "analytics", "ui"],
    metrics: { focusHours: 6, productivity: "high" }
  },
  {
    daysAgo: 2,
    text: "Early morning 5km run around the campus lake. Solid energy all day. Completed the Web Push notification background scheduler and VAPID key tests.",
    rating: 9,
    tags: ["fitness", "push-notifications", "backend"],
    metrics: { focusHours: 6.5, productivity: "peak" }
  },
  {
    daysAgo: 3,
    text: "Team sync with Brijesh and Narendra. We reviewed the 9 presentation slides and verified all UML diagrams for complete accuracy.",
    rating: 8,
    tags: ["team", "collaboration", "presentation"],
    metrics: { focusHours: 5.5, productivity: "good" }
  },
  {
    daysAgo: 4,
    text: "Optimized MongoDB compound indices on { user: 1, date: 1 } for DailyEntry and TimeTracker collections. Query response latency dropped significantly.",
    rating: 9,
    tags: ["mongodb", "database", "performance"],
    metrics: { focusHours: 7, productivity: "high" }
  },
  {
    daysAgo: 5,
    text: "Weekend code review sprint. Read two chapters of Martin Kleppmann's Designing Data-Intensive Applications on replication and consensus.",
    rating: 8,
    tags: ["reading", "books", "distributed-systems"],
    metrics: { focusHours: 5, productivity: "moderate" }
  },
  {
    daysAgo: 6,
    text: "Sunday weekly reflection and Life Wheel audit. Noticed a clear positive correlation between regular sleep and afternoon problem-solving agility.",
    rating: 9,
    tags: ["reflection", "wheel-of-life", "mindset"],
    metrics: { focusHours: 4, productivity: "high" }
  },
  {
    daysAgo: 7,
    text: "Implemented timetable block collision detection logic in Express router. Edge-case test cases all passing.",
    rating: 8,
    tags: ["algorithms", "timetable", "coding"],
    metrics: { focusHours: 6, productivity: "good" }
  },
  {
    daysAgo: 9,
    text: "Attended Machine Learning lab. Explored Pearson correlation formulas for behavioral telemetry feature extraction.",
    rating: 8,
    tags: ["machine-learning", "lab", "statistics"],
    metrics: { focusHours: 6.5, productivity: "good" }
  },
  {
    daysAgo: 11,
    text: "Focused morning coding session on JWT token renewal and httpOnly cookie security headers. Gym workout in the evening.",
    rating: 9,
    tags: ["security", "auth", "fitness"],
    metrics: { focusHours: 7, productivity: "peak" }
  },
  {
    daysAgo: 13,
    text: "Designed responsive mobile launch screen and bottom tab bar transitions with Framer Motion. Smooth 60fps animations.",
    rating: 8,
    tags: ["design", "framer-motion", "frontend"],
    metrics: { focusHours: 6, productivity: "good" }
  },
  {
    daysAgo: 15,
    text: "Deep work block on Cloudinary CDN upload middleware for user profile picture management with automatic aspect-ratio cropping.",
    rating: 8,
    tags: ["cloudinary", "storage", "backend"],
    metrics: { focusHours: 5.5, productivity: "good" }
  },
  {
    daysAgo: 18,
    text: "Productive technical seminar presentation at the department. Faculty appreciated the integration of mental health tracking with daily engineering habits.",
    rating: 9,
    tags: ["seminar", "academics", "presentation"],
    metrics: { focusHours: 6.5, productivity: "peak" }
  },
  {
    daysAgo: 21,
    text: "Set up Habit streak calculation algorithm with zero-break tolerance. Tested against edge cases spanning month and leap year boundaries.",
    rating: 8,
    tags: ["habits", "algorithms", "streak"],
    metrics: { focusHours: 6, productivity: "good" }
  },
  {
    daysAgo: 24,
    text: "Evening reading on cognitive reframing and journaling benefits. Started drafting the literature survey section of the project thesis.",
    rating: 8,
    tags: ["thesis", "research", "reading"],
    metrics: { focusHours: 5, productivity: "good" }
  },
  {
    daysAgo: 27,
    text: "Initial setup of ManologAI micro-services and project directory structure. Clean separation between data layer, services, and routes.",
    rating: 9,
    tags: ["setup", "architecture", "coding"],
    metrics: { focusHours: 7.5, productivity: "peak" }
  },
  {
    daysAgo: 30,
    text: "First milestone meeting with project guide Dr. Amit Kumar Khaskalam. Approved the proposed 4-tier architecture and telemetry specifications.",
    rating: 9,
    tags: ["milestone", "supervisor", "planning"],
    metrics: { focusHours: 6, productivity: "peak" }
  }
];

const DEFAULT_TIMETABLE_BLOCKS = [
  // Monday
  { day: "monday", startTime: "07:00", endTime: "08:15", activity: "Morning Fitness & Running", groupId: "fitness" },
  { day: "monday", startTime: "09:00", endTime: "10:30", activity: "University Lecture: Advanced Web Technologies", groupId: "academic" },
  { day: "monday", startTime: "11:00", endTime: "13:00", activity: "Major Project Lab: Architecture & API Development", groupId: "project" },
  { day: "monday", startTime: "14:00", endTime: "16:00", activity: "Deep Work: Machine Learning & Statistical Models", groupId: "study" },
  { day: "monday", startTime: "17:30", endTime: "19:00", activity: "Project Team Review & Code Sync", groupId: "project" },
  { day: "monday", startTime: "20:30", endTime: "21:30", activity: "Technical Reading & Evening Journaling", groupId: "reflection" },

  // Tuesday
  { day: "tuesday", startTime: "07:00", endTime: "08:15", activity: "Morning Fitness & Yoga", groupId: "fitness" },
  { day: "tuesday", startTime: "09:00", endTime: "10:30", activity: "University Lecture: Distributed Cloud Computing", groupId: "academic" },
  { day: "tuesday", startTime: "11:00", endTime: "13:00", activity: "Coding Sprint: REST Endpoints & Authentication", groupId: "project" },
  { day: "tuesday", startTime: "14:00", endTime: "16:00", activity: "Data Structures & Algorithm Problem Solving", groupId: "study" },
  { day: "tuesday", startTime: "17:30", endTime: "18:45", activity: "Outdoor Walk & Audio Tech Podcast", groupId: "wellness" },
  { day: "tuesday", startTime: "20:30", endTime: "21:30", activity: "Reading: Designing Data-Intensive Applications", groupId: "reading" },

  // Wednesday
  { day: "wednesday", startTime: "07:00", endTime: "08:15", activity: "Morning Fitness & Running", groupId: "fitness" },
  { day: "wednesday", startTime: "09:00", endTime: "10:30", activity: "University Lecture: Information Security & Cryptography", groupId: "academic" },
  { day: "wednesday", startTime: "11:00", endTime: "13:00", activity: "Major Project Lab: Recharts Dashboard UI", groupId: "project" },
  { day: "wednesday", startTime: "14:00", endTime: "16:00", activity: "Research Paper Review with Dr. Khaskalam", groupId: "research" },
  { day: "wednesday", startTime: "17:30", endTime: "19:00", activity: "Open Source Development & GitHub Maintenance", groupId: "coding" },
  { day: "wednesday", startTime: "20:30", endTime: "21:30", activity: "Mindfulness & Daily Life Wheel Rating", groupId: "reflection" },

  // Thursday
  { day: "thursday", startTime: "07:00", endTime: "08:15", activity: "Morning Fitness & Calisthenics", groupId: "fitness" },
  { day: "thursday", startTime: "09:00", endTime: "10:30", activity: "University Lecture: Big Data Analytics", groupId: "academic" },
  { day: "thursday", startTime: "11:00", endTime: "13:00", activity: "Project Testing: Unit & Integration Test Suites", groupId: "project" },
  { day: "thursday", startTime: "14:00", endTime: "16:00", activity: "System Design Practice & Database Benchmarking", groupId: "study" },
  { day: "thursday", startTime: "17:30", endTime: "18:45", activity: "Team Discussion: Slide Presentation Polish", groupId: "team" },
  { day: "thursday", startTime: "20:30", endTime: "21:30", activity: "Journal Reflection & Tomorrow Planning", groupId: "reflection" },

  // Friday
  { day: "friday", startTime: "07:00", endTime: "08:15", activity: "Morning Fitness & Running", groupId: "fitness" },
  { day: "friday", startTime: "09:00", endTime: "10:30", activity: "University Seminar & Department Colloquium", groupId: "academic" },
  { day: "friday", startTime: "11:00", endTime: "13:00", activity: "Project Deployment on Cloud VPS & SSL Setup", groupId: "project" },
  { day: "friday", startTime: "14:00", endTime: "16:00", activity: "Deep Work: Pearson Correlation Analytics Engine", groupId: "project" },
  { day: "friday", startTime: "17:30", endTime: "19:00", activity: "Project Demo Rehearsal", groupId: "team" },
  { day: "friday", startTime: "20:30", endTime: "21:30", activity: "Weekend Plan & Reading Sprint", groupId: "reading" },

  // Saturday
  { day: "saturday", startTime: "08:00", endTime: "09:30", activity: "Long Distance Cycling & Cardio", groupId: "fitness" },
  { day: "saturday", startTime: "10:30", endTime: "13:30", activity: "Open Coding Marathon & Feature Polishing", groupId: "coding" },
  { day: "saturday", startTime: "15:00", endTime: "17:00", activity: "System Architecture & UML Diagram Verification", groupId: "study" },
  { day: "saturday", startTime: "18:30", endTime: "20:30", activity: "Leisure, Film & Creative Rest", groupId: "leisure" },

  // Sunday
  { day: "sunday", startTime: "08:30", endTime: "10:00", activity: "Weekly Retrospective & Wheel of Life Audit", groupId: "reflection" },
  { day: "sunday", startTime: "11:00", endTime: "13:00", activity: "Upcoming Week Planning & Goal Setting", groupId: "planning" },
  { day: "sunday", startTime: "15:00", endTime: "17:30", activity: "Academic Viva Q&A Rehearsal with Team", groupId: "academic" },
  { day: "sunday", startTime: "19:00", endTime: "20:30", activity: "Book Reading & Peaceful Evening Walk", groupId: "wellness" }
];

const DEFAULT_PADS_DATA = [
  {
    padType: "goals",
    title: "Goals",
    items: [
      { title: "Complete B.Tech IT Major Project with Distinction", note: "Deliver comprehensive system with full analytics & documentation", done: true },
      { title: "Deploy ManologAI to Cloud Production VPS with SSL", note: "Nginx reverse proxy, PM2 daemon, MongoDB replica", done: true },
      { title: "Defend Project in Academic Viva before University Board", note: "Session 2026-27 presentation with Dr. Amit Kumar Khaskalam", done: true },
      { title: "Publish Tech Paper on Cognitive Behavior & Habit Tracking", note: "Target IEEE or Scopus indexed student symposium", done: false },
      { title: "Maintain Consistent 30+ Day Habit & Journaling Streak", note: "Achieve Silver consistency tier in ManologAI", done: true }
    ]
  },
  {
    padType: "books",
    title: "Books to Read",
    items: [
      { title: "Designing Data-Intensive Applications — Martin Kleppmann", note: "Chapters on consensus, partitioning, and stream processing", done: true },
      { title: "Atomic Habits — James Clear", note: "Four laws of behavior change & habit loop cues", done: true },
      { title: "Clean Code — Robert C. Martin", note: "Readable functions, meaningful names, unit testing", done: true },
      { title: "Thinking, Fast and Slow — Daniel Kahneman", note: "System 1 vs System 2 cognitive decision processes", done: false },
      { title: "The Pragmatic Programmer — David Thomas & Andrew Hunt", note: "Software craftsmanship and pragmatic philosophy", done: false }
    ]
  },
  {
    padType: "ideas",
    title: "Ideas",
    items: [
      { title: "Vector Embeddings for Journal Semantic Search", note: "Use local Transformers WASM to search diary entries by emotional themes", done: false },
      { title: "BLE Telemetry Integration with Smartwatch", note: "Auto-sync sleep duration and resting heart-rate via Web Bluetooth", done: false },
      { title: "AI-Powered Weekly Predictive Mood Forecast", note: "Generate proactive behavioral nudges based on correlation deltas", done: true },
      { title: "Offline PWA Sync with IndexedDB Service Worker", note: "Enable instantaneous journaling when offline, auto-sync when online", done: true }
    ]
  },
  {
    padType: "to-do",
    title: "To Do",
    items: [
      { title: "Verify high-resolution UML Class Diagram and DFD exports", note: "Ensure 300 DPI vector quality for university report", done: true },
      { title: "Run end-to-end load tests on Express router endpoints", note: "Benchmark response times under concurrent telemetry inserts", done: true },
      { title: "Format LaTeX mathematical formulas in viva documentation", note: "Verify Pearson r equation and Habit delta notation", done: true },
      { title: "Prepare viva demonstration video walk-through", note: "Showcase Dashboard heatmap, Recharts radar, and Timetable editor", done: false }
    ]
  },
  {
    padType: "to-learn",
    title: "To Learn",
    items: [
      { title: "Advanced Mongoose Aggregation & Pipeline Optimization", note: "Master $facet, $bucket, and geospatial lookups", done: true },
      { title: "Web Push Notification Protocols & RFC 8292 VAPID Spec", note: "Voluntary Application Server Identification for Web Push", done: true },
      { title: "Rust & WebAssembly (WASM) for High-Speed Client Computations", note: "Run local analytics math in client threads", done: false },
      { title: "Docker Containerization & Kubernetes Orchestration", note: "Multi-container setup for Node.js, Vite, and MongoDB", done: false }
    ]
  },
  {
    padType: "to-buy",
    title: "To Buy",
    items: [
      { title: "Ergonomic Mechanical Keyboard for Long Coding Sprints", note: "Hot-swappable tactile switches", done: true },
      { title: "Adjustable Aluminum Laptop Stand with Cooling Vent", note: "Improves posture during 6-hour research sessions", done: true },
      { title: "Active Noise-Cancelling Headphones for Deep Work", note: "Block distractions in university lab", done: false }
    ]
  }
];

/**
 * Seeds comprehensive default sample data for a user so that all graphs,
 * heatmaps, streaks, habits, timetable, and pads are fully populated.
 *
 * @param {string|mongoose.Types.ObjectId} userId
 * @param {object} options
 * @param {boolean} options.force - If true, overwrites/repopulates even if data exists
 */
async function seedUserData(userId, { force = false } = {}) {
  const uid = typeof userId === "string" ? new mongoose.Types.ObjectId(userId) : userId;

  // Check if user already has data unless force is true
  if (!force) {
    const existingCount = await TimeTracker.countDocuments({ user: uid });
    if (existingCount >= 10) {
      return { skipped: true, message: "User already has sufficient data" };
    }
  }

  // 1. Update user goals if needed
  await User.findByIdAndUpdate(uid, {
    $set: {
      goals: {
        sleep: 8,
        screenTime: 3.5,
        work: 6.5,
        expenses: 450
      }
    }
  });

  const TOTAL_DAYS = 45; // 45 days of rich historical telemetry

  // 2. Seed Habits with complete 45-day history
  const habitsConfig = [
    {
      name: "Morning Fitness & Running",
      frequency: "daily",
      completionRate: 0.84,
      currentStreak: 21,
      longestStreak: 28
    },
    {
      name: "Deep Coding & Project Dev",
      frequency: "daily",
      completionRate: 0.88,
      currentStreak: 25,
      longestStreak: 32
    },
    {
      name: "Read Tech Book / Research",
      frequency: "daily",
      completionRate: 0.80,
      currentStreak: 14,
      longestStreak: 18
    },
    {
      name: "Mindful Evening Journaling",
      frequency: "daily",
      completionRate: 0.94,
      currentStreak: 35,
      longestStreak: 35
    },
    {
      name: "Hydration (3L Water)",
      frequency: "daily",
      completionRate: 0.96,
      currentStreak: 38,
      longestStreak: 38
    }
  ];

  // Remove existing habits if force or seeding
  await Habit.deleteMany({ user: uid });

  const createdHabits = [];
  for (const cfg of habitsConfig) {
    const history = [];
    for (let day = TOTAL_DAYS - 1; day >= 0; day--) {
      const date = getMidnight(day);
      let completed = false;

      // Ensure recent days within currentStreak are strictly completed
      if (day < cfg.currentStreak) {
        completed = true;
      } else {
        // Deterministic pseudo-random pattern based on habit name and day
        const seedVal = (cfg.name.length * 37 + day * 13) % 100;
        completed = seedVal < (cfg.completionRate * 100);
      }

      history.push({ date, completed });
    }

    const habit = await Habit.create({
      user: uid,
      name: cfg.name,
      frequency: cfg.frequency,
      currentStreak: cfg.currentStreak,
      longestStreak: cfg.longestStreak,
      history,
      createdAt: getMidnight(TOTAL_DAYS)
    });
    createdHabits.push(habit);
  }

  // 3. Seed 45 Days of Telemetry: Emotion, TimeTracker, LifeRating
  // Pre-calculate realistic, correlated values
  const emotionOptions = ["happy", "calm", "excited", "neutral", "tired", "stressed"];

  for (let day = TOTAL_DAYS - 1; day >= 0; day--) {
    const date = getMidnight(day);
    const dayOfWeek = date.getDay(); // 0 is Sunday, 6 is Saturday
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    // Check if fitness habit was completed this day
    const workoutDone = createdHabits[0].history.find(h => h.date.getTime() === date.getTime())?.completed ?? true;
    const codingDone = createdHabits[1].history.find(h => h.date.getTime() === date.getTime())?.completed ?? true;
    const readingDone = createdHabits[2].history.find(h => h.date.getTime() === date.getTime())?.completed ?? true;

    // Time Tracking numbers (hours)
    let sleep = isWeekend ? (7.8 + (day % 3) * 0.3) : (7.0 + ((day * 7) % 5) * 0.3); // 7.0 - 8.4
    if (day === 8 || day === 22) sleep = 5.8; // a couple of short sleep nights for realistic contrast
    if (day === 4 || day === 18) sleep = 8.5; // great sleep nights
    sleep = Number(sleep.toFixed(1));

    let workStudy = isWeekend ? (2.5 + (day % 3) * 0.5) : (6.0 + ((day * 3) % 4) * 0.5); // 2.5-3.5 weekend, 6.0-7.5 weekday
    workStudy = Number(workStudy.toFixed(1));

    let screen = Number((3.0 + ((day * 5) % 4) * 0.4).toFixed(1)); // 3.0 - 4.2 hrs
    let expense = isWeekend ? (450 + (day % 5) * 80) : (180 + ((day * 11) % 6) * 50); // in local currency units

    // Upsert TimeTracker
    await TimeTracker.findOneAndUpdate(
      { user: uid, date },
      {
        $set: {
          sleep,
          workStudy,
          screen,
          expense,
          locked: day > 0 // only lock past days
        }
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    // Emotion selection strongly correlated with sleep and habits
    let emotion = "calm";
    if (sleep >= 7.5 && workoutDone) {
      emotion = isWeekend || day % 2 === 0 ? "happy" : "excited";
    } else if (sleep >= 7.0) {
      emotion = "calm";
    } else if (sleep < 6.5) {
      emotion = day % 2 === 0 ? "tired" : "stressed";
    } else {
      emotion = "neutral";
    }

    // Upsert Emotion
    await Emotion.findOneAndUpdate(
      { user: uid, date },
      {
        $set: {
          emotion,
          lockedUntil: day > 0 ? new Date(date.getTime() + 24 * 60 * 60 * 1000) : new Date(Date.now() + 24 * 60 * 60 * 1000)
        }
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    // Life Ratings (Wheel of Life: 0 to 10)
    // We intentionally make ratings higher on habit days so Habit Impact Analysis computes positive delta >= 1.0
    const health = workoutDone ? Number((8.2 + ((day * 3) % 4) * 0.3).toFixed(1)) : Number((6.2 + (day % 3) * 0.2).toFixed(1));
    const career = codingDone ? Number((8.4 + ((day * 5) % 4) * 0.3).toFixed(1)) : Number((6.5 + (day % 3) * 0.2).toFixed(1));
    const personalGrowth = readingDone ? Number((8.6 + ((day * 7) % 3) * 0.3).toFixed(1)) : Number((6.7 + (day % 3) * 0.2).toFixed(1));
    const finances = Number((7.2 + ((day * 2) % 4) * 0.3).toFixed(1));
    const partner = Number((7.8 + ((day * 3) % 3) * 0.4).toFixed(1));
    const familyFriends = Number((8.0 + ((day * 4) % 3) * 0.3).toFixed(1));
    const physicalEnvironment = Number((7.6 + ((day * 2) % 3) * 0.3).toFixed(1));
    const funRecreation = isWeekend ? Number((8.5 + (day % 3) * 0.4).toFixed(1)) : Number((7.0 + (day % 4) * 0.3).toFixed(1));

    await LifeRating.findOneAndUpdate(
      { user: uid, date },
      {
        $set: {
          ratings: {
            health,
            career,
            personalGrowth,
            finances,
            partner,
            familyFriends,
            physicalEnvironment,
            funRecreation
          }
        }
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  }

  // 4. Seed Journal (DailyEntry) entries for heatmap and diary reader
  for (const snippet of JOURNAL_SNIPPETS) {
    const date = getMidnight(snippet.daysAgo);
    await DailyEntry.findOneAndUpdate(
      { user: uid, date },
      {
        $set: {
          text: snippet.text,
          rating: snippet.rating,
          tags: snippet.tags,
          metrics: snippet.metrics,
          lockedUntil: snippet.daysAgo > 0 ? new Date(date.getTime() + 24 * 60 * 60 * 1000) : new Date(Date.now() + 24 * 60 * 60 * 1000)
        }
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  }

  // 5. Seed Timetable Weekly Blocks
  await Timetable.findOneAndUpdate(
    { user: uid },
    {
      $set: {
        blocks: DEFAULT_TIMETABLE_BLOCKS
      }
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  // 6. Seed Organized Pads and Items
  for (const padDef of DEFAULT_PADS_DATA) {
    const existingPad = await Pad.findOne({ user: uid, padType: padDef.padType });
    if (!existingPad) {
      await Pad.create({
        user: uid,
        padType: padDef.padType,
        title: padDef.title,
        items: padDef.items.map(item => ({
          title: item.title,
          note: item.note,
          done: item.done,
          startDate: getMidnight(14),
          endDate: getMidnight(0)
        }))
      });
    } else if (force || (!existingPad.items || existingPad.items.length === 0)) {
      existingPad.items = padDef.items.map(item => ({
        title: item.title,
        note: item.note,
        done: item.done,
        startDate: getMidnight(14),
        endDate: getMidnight(0)
      }));
      await existingPad.save();
    }
  }

  return {
    success: true,
    message: "Default sample data seeded successfully",
    counts: {
      telemetryDays: TOTAL_DAYS,
      habits: createdHabits.length,
      journalEntries: JOURNAL_SNIPPETS.length,
      timetableBlocks: DEFAULT_TIMETABLE_BLOCKS.length,
      pads: DEFAULT_PADS_DATA.length
    }
  };
}

module.exports = {
  seedUserData,
  JOURNAL_SNIPPETS,
  DEFAULT_TIMETABLE_BLOCKS,
  DEFAULT_PADS_DATA
};
