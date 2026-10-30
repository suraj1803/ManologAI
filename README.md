# ManologAI — Unified Personal Life Analytics & Behavioral Insight Engine

[![Academic Project](https://img.shields.io/badge/Academic_Project-B.Tech_IT_Sem_7-indigo.svg)](#-academic-information)
[![Institution](https://img.shields.io/badge/University-Guru_Ghasidas_Vishwavidyalaya-blue.svg)](#-academic-information)
[![Frontend](https://img.shields.io/badge/Frontend-React_19_+_Vite_8_+_Tailwind_v4-61dafb.svg)](https://react.dev/)
[![Backend](https://img.shields.io/badge/Backend-Node.js_+_Express_5-green.svg)](https://expressjs.com/)
[![Database](https://img.shields.io/badge/Database-MongoDB_+_Mongoose_9-emerald.svg)](https://www.mongodb.com/)
[![PWA](https://img.shields.io/badge/PWA-Service_Worker_+_VAPID_Push-pink.svg)](#-progressive-web-app--vapid-push-engine)
[![Tests](https://img.shields.io/badge/E2E_Tests-16%2F16_Passed_(100%25)-brightgreen.svg)](#-testing--quality-verification)

> **ManologAI** is an engineering-grade, privacy-first personal life analytics platform and behavioral insight engine. Designed to solve the fragmented "Quantified-Self" problem, it unites qualitative daily reflections (journaling, 8-scale emotion tracking) with quantitative lifestyle tracking (sleep duration, screen time, study hours, habits, expenses, and weekly timetables) into a single cohesive data pipeline. Through statistical regression models (Pearson correlation coefficient $r$) and counterfactual baseline analysis ($\Delta$), ManologAI transforms everyday behavioral logs into actionable, evidence-based personal intelligence.

---

## 📑 Table of Contents
1. [Academic Information & Project Credits](#-academic-information--project-credits)
2. [Executive Summary & Motivation](#-executive-summary--motivation)
3. [System Architecture & Tier Breakdown](#-system-architecture--tier-breakdown)
4. [End-to-End Dataflow & Sequence Pipelines](#-end-to-end-dataflow--sequence-pipelines)
5. [Behavioral Intelligence & Mathematical Modeling](#-behavioral-intelligence--mathematical-modeling)
6. [Mongoose Database Schemas & Data Modeling](#-mongoose-database-schemas--data-modeling)
7. [REST API Specification & Endpoints Matrix](#-rest-api-specification--endpoints-matrix)
8. [Security Engineering & Data Integrity](#-security-engineering--data-integrity)
9. [Progressive Web App & VAPID Push Engine](#-progressive-web-app--vapid-push-engine)
10. [Repository Structure](#-repository-structure)
11. [Environment Variables Setup](#-environment-variables-setup)
12. [Installation & Getting Started](#-installation--getting-started)
13. [Testing & Quality Verification](#-testing--quality-verification)
14. [Academic Defense & Viva Q&A Guide](#-academic-defense--viva-qa-guide)
15. [Future Engineering Roadmap](#-future-engineering-roadmap)

---

## 🎓 Academic Information & Project Credits

* **Institution**: **Guru Ghasidas Vishwavidyalaya**, Bilaspur (C.G.) *(A Central University)*
* **Faculty**: School of Studies in Engineering & Technology
* **Department**: Department of Information Technology
* **Program**: Bachelor of Technology (B.Tech) in Information Technology
* **Academic Term**: 7th Semester | **Academic Session**: 2026 – 2027
* **Project Supervisor**: **Dr. Amit Kumar Khaskalam**, Department of Information Technology

### Student Team
| S.No. | Student Name | University Roll Number |
| :---: | :--- | :---: |
| 1. | **Brijesh Kumar** | `23036115` |
| 2. | **Narendra** | `23036134` |
| 3. | **Suraj Biswas** | `23036168` |

---

## 💡 Executive Summary & Motivation

### The "Fragmented Quantified-Self" Problem
In modern digital productivity, personal life data is fundamentally fragmented across isolated silos:
1. **Isolated Islands of Telemetry**: Users record daily habits in apps like Streaks, daily journals in Notion, mood check-ins in Daylio, and sleep metrics in Apple Health or Google Fit. None of these applications communicate with each other.
2. **Zero Cross-Domain Behavioral Correlation**: Isolated apps cannot answer critical, multi-variate lifestyle questions:
   * *"How does getting under 6.5 hours of sleep directly affect daytime stress and work output?"*
   * *"On days when I exercise, by how many points does my mental wellness and career satisfaction increase?"*
   * *"Which day of the week is my emotional resilience at its lowest?"*
3. **Absence of Data Integrity**: The majority of personal habit and journaling trackers allow retroactive backfilling and historical revisionism. Users frequently falsify logs days later to preserve streaks, introducing cognitive bias and invalidating historical analysis.
4. **High Tracking Friction**: Switching between 4–5 different single-purpose apps leads to high cognitive load, causing most users to abandon tracking within 2 to 3 weeks.

### The ManologAI Solution
* **Unified Behavioral Telemetry**: Captures diary entries, 8 quantized emotional states, sleep duration, screen time, study hours, custom recurring habits, and an 8-dimensional "Wheel of Life" in a **single unified datastore**.
* **Sub-2-Minute Daily Ritual**: An ergonomic, responsive layout built for desktop and mobile PWA, enabling complete daily check-ins in under two minutes.
* **Deterministic Behavioral Intelligence**: Built-in statistical engines calculate Pearson correlation coefficients ($r$) and counterfactual baseline impact scores ($\Delta$), outputting natural-language diagnostic feedback.
* **24-Hour Temporal Integrity Lock**: Strict API middleware rejection of future timestamps and historical backfilling past 24 hours, guaranteeing pristine, unbiased datasets for analytical inference.
* **Standards-Based Web Push**: Direct RFC 8291/8292 VAPID push notification protocol implementation without third-party proprietary SDKs or surveillance trackers.

---

## 🏛 System Architecture & Tier Breakdown

> 📊 **High-Resolution Visual Architectural Artifacts:**
> * **Level-1 Data Flow Diagram (DFD)**: [Data_Flow_Diagram.png](./Data_Flow_Diagram.png) • [Data_Flow_Diagram.jpg](./Data_Flow_Diagram.jpg)
> * **UML 2.5 Class Diagram**: [UML_Class_Diagram.png](./UML_Class_Diagram.png) • [UML_Class_Diagram.jpg](./UML_Class_Diagram.jpg)

ManologAI follows a clean, decoupled, four-tier full-stack architecture:

```
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│                                   TIER 1: PRESENTATION (PWA)                                │
│   React 19 • Vite 8 • Tailwind CSS v4 • Recharts v3 (Scatter/Radar/Bar/Line) • Framer Motion│
│   Service Worker (sw.js) • PWA Standalone Manifest • jsPDF Client Document Synthesis        │
└──────────────────────────────────────────────┬──────────────────────────────────────────────┘
                                               │ Secure HTTPS Requests
                                               │ Credentials: 'include' (HttpOnly JWT Cookies)
                                               ▼
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│                              TIER 2: INGESTION GATEWAY & SECURITY                           │
│   Vite Reverse Proxy (/api -> :5000) • CORS Origin Whitelist • Dual-Token JWT Verification  │
│   Rate Limiting • 24-Hour Temporal Integrity Guard (Rejects Future & Backdated Logs)        │
└──────────────────────────────────────────────┬──────────────────────────────────────────────┘
                                               │ Sanitized & Verified Payload
                                               │ req.user Identity Context
                                               ▼
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│                           TIER 3: APPLICATION & INTELLIGENCE TIER                           │
│   Node.js (Async/Await) • Express 5.x REST API Engine                                       │
│   ├── Domain Routers: /diary, /emotions, /habits, /timeTracker, /lifeRatings, /pads, etc.    │
│   ├── Statistical Insight Engine: Pearson Correlation (r), Habit Counterfactual Delta (Δ)   │
│   └── Proactive Background Daemon: 60-second Cron Scheduler for Web-Push Notification Dispatches
└──────────────────────────────────────────────┬──────────────────────────────────────────────┘
                                               │ Mongoose 9.3 ODM
                                               │ Compound Index Constraints { user: 1, date: 1 }
                                               ▼
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│                                  TIER 4: PERSISTENCE & STORAGE                              │
│   MongoDB Database: Collections (users, dailyentries, emotions, habits, liferatings, etc.)  │
│   Cloudinary CDN: Cloud Media Bucket for Multipart Profile Image Transformations             │
└─────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Architectural Tier Descriptions

1. **Presentation Tier (React 19 PWA)**:
   * Built on React 19 leveraging modern reactive hooks (`useMemo`, `useCallback`, `useEffect`).
   * Bundled with Vite 8 for instant Hot Module Replacement (HMR) and optimized chunk splitting.
   * Visualized via Recharts v3 using hardware-accelerated SVG elements for multi-axis radar charts, scatter plots, and time-series line charts.
   * Service Worker precaches critical assets and acts as a push message receiver for background notification wakeups.

2. **Ingestion Gateway & Security Middleware**:
   * Uses Vite proxy in development and Express security headers in production.
   * `auth.js` middleware extracts JWT access tokens from HttpOnly cookies or Bearer Authorization headers.
   * Rejects requests containing date timestamps beyond the user's local midnight or older than 24 hours.

3. **Application & Intelligence Tier (Express 5.x)**:
   * RESTful controllers modularized by functional domains.
   * Statistical calculation functions compute correlation matrices across sliding temporal windows ($7$, $30$, and $90$ days).
   * Background Node.js scheduler ticks every 60 seconds to match pending user reminders against current UTC timestamps.

4. **Persistence Tier (MongoDB & Cloudinary)**:
   * Schema-enforced document storage via Mongoose 9.3.
   * Strict compound unique indexes (`{ user: 1, date: 1 }`) prevent duplicate daily logs and race conditions.
   * Cloudinary manages multipart file streams for user avatar uploads with automated thumbnail compression.

---

## 🔄 End-to-End Dataflow & Sequence Pipelines

### 1. Daily Log Ingestion & Temporal Integrity Pipeline
```
[User Browser / PWA]
        │  1. Submit check-in payload (diary, emotion, hours, habits)
        ▼
[Vite Proxy / Express API]
        │  2. Extract JWT from HttpOnly Cookie -> Authenticate User
        ▼
[24-Hour Integrity Guard]
        │  3. Check Date: entryDate > Today? -> HTTP 400 Bad Request
        │  4. Check Lock: entryDate < (Today - 24h)? -> HTTP 403 Write-Locked
        ▼
[Mongoose Validation Layer]
        │  5. Validate hours sum (sleep + screen + work <= 24)
        │  6. Validate emotion enum & rating boundaries (0-10)
        ▼
[MongoDB Datastore]
        │  7. Atomic Upsert: findOneAndUpdate({ user, date }, update, { upsert: true })
        ▼
[Response to Client]
        │  8. Return HTTP 200 OK + Updated Streak & Milestone Badge
```

### 2. Behavioral Analytics & Correlation Pipeline
```
[Analytics Page Mount]
        │  1. GET /timeTracker/range?from=...&to=...
        │  2. GET /emotions/range?from=...&to=...
        │  3. GET /life-ratings/range?from=...&to=...
        │  4. GET /habits
        ▼
[Client Intelligence Engine (AnalyticsPage.jsx)]
        │  5. Emotion Quantization: Map strings -> continuous valence scores (1.0 - 5.0)
        │  6. Merge datasets on common DateKey ("YYYY-MM-DD")
        │  7. Compute Pearson r between X (sleep/screen/study) and Y (emotion valence)
        │  8. Partition Habit Days: Compute Δ = Mean(With Habit) - Mean(Without Habit)
        │  9. Synthesize Natural-Language Diagnostics
        ▼
[Recharts Visualization Layer]
        │  10. Render Interactive Scatter Plots, Baseline Bars & Life Balance Radar Chart
```

### 3. VAPID Push Notification Daemon Pipeline
```
[User Profile Settings]
        │  1. Request Notification.requestPermission()
        │  2. navigator.serviceWorker.pushManager.subscribe({ applicationServerKey })
        │  3. POST /notifications/subscribe -> Save endpoint & p256dh/auth keys
        ▼
[Backend 60s Cron Scheduler]
        │  4. Every 60 seconds: Compare current UTC "HH:mm" with user reminderSettings
        │  5. User matches reminder time & has active subscriptions?
        ▼
[Web-Push RFC 8291 Engine]
        │  6. Encrypt JSON payload using server VAPID Private Key & subscriber public keys
        │  7. HTTP POST to push service (e.g., https://fcm.googleapis.com/...)
        ▼
[Device Operating System]
        │  8. OS Push Service wakes up Service Worker (sw.js)
        │  9. self.registration.showNotification("ManologAI", { body, icon, data })
        │  10. User taps notification -> Focuses or opens target URL (e.g., /dashboard)
```

---

## 🧠 Behavioral Intelligence & Mathematical Modeling

Unlike black-box generative models that hallucinate patterns, ManologAI uses **deterministic, explainable behavioral statistics**:

### 1. Discrete Emotion Quantization Matrix
To perform longitudinal mathematical analysis on subjective human sentiment, qualitative emotional reports are quantized onto a continuous numerical valence scale:

| Emotion | Numerical Valence Score | Visual Hex Code | Psychological Classification |
| :--- | :---: | :---: | :--- |
| **Excited** | `5.0` | `#f472b6` | High Arousal, Positive Valence |
| **Happy** | `4.0` | `#34d399` | Moderate Arousal, Positive Valence |
| **Calm** | `3.5` | `#38bdf8` | Low Arousal, Positive Valence |
| **Neutral** | `3.0` | `#94a3b8` | Baseline Equilibrium |
| **Tired** | `2.5` | `#a78bfa` | Low Energy, Depleted State |
| **Stressed** | `2.0` | `#f59e0b` | High Arousal, Negative Valence |
| **Sad** | `1.5` | `#60a5fa` | Low Arousal, Negative Valence |
| **Angry** | `1.0` | `#fb7185` | High Arousal, Negative Valence |

### 2. Pearson Correlation Coefficient ($r$) Engine
* **Source Location**: [`AnalyticsPage.jsx` (Lines 753–826)](file:///home/suraj/sources/ManologAI/manologai-f/src/pages/AnalyticsPage.jsx#L753-L826)

The engine cross-correlates quantitative independent variables ($x \in \{\text{Sleep Duration}, \text{Screen Time}, \text{Work/Study Hours}\}$) against the quantized emotion valence ($y$):

$$\bar{x} = \frac{1}{n} \sum_{i=1}^n x_i, \quad \bar{y} = \frac{1}{n} \sum_{i=1}^n y_i$$

$$r = \frac{\sum_{i=1}^n (x_i - \bar{x})(y_i - \bar{y})}{\sqrt{\sum_{i=1}^n (x_i - \bar{x})^2 \cdot \sum_{i=1}^n (y_i - \bar{y})^2}}$$

#### Dynamic Insight Synthesis
* **Sample Validation**: Requires a minimum sample size of $n \ge 4$ with non-zero variance ($S_x > 0, S_y > 0$).
* **Strength Thresholds**:
  * $|r| \ge 0.5 \implies \text{\textbf{Strong Correlation}}$
  * $0.3 \le |r| < 0.5 \implies \text{\textbf{Moderate Correlation}}$
  * $|r| < 0.3 \implies \text{\textbf{Weak / Negligible Correlation}}$
* **Percentile Band Analysis**: Partitions points into upper and lower 30% bands. If $\Delta_{\text{bands}} \ge 0.25$, it produces sentences like:
  > *"Higher sleep days align with more calm emotions."*  
  > *"Overall correlation looks strong and positive."*

### 3. Counterfactual Habit Impact Engine
* **Source Location**: [`AnalyticsPage.jsx` (Lines 550–640, 852–876)](file:///home/suraj/sources/ManologAI/manologai-f/src/pages/AnalyticsPage.jsx#L550-L640)

To determine whether completing a habit actually improves life satisfaction across the 8 "Wheel of Life" categories (*Health, Finances, Career, Partner, Family/Friends, Environment, Fun, Growth*), the engine conducts an empirical counterfactual A/B evaluation:

$$\Delta_{\text{habit, field}} = \bar{X}_{\text{completed}} - \bar{X}_{\text{skipped}}$$

$$\text{Where: } \bar{X}_{\text{completed}} = \frac{1}{N_A}\sum_{d \in A} R_d(\text{field}), \quad \bar{X}_{\text{skipped}} = \frac{1}{N_B}\sum_{d \in B} R_d(\text{field})$$

* **Noise Filtration**: Requires $N_A \ge 2$, $N_B \ge 2$, and $|\Delta| \ge 1.0$ (on a 0–10 scale).
* **Automated Output**:
  > *"On days you do Morning Workout, Health averages 8.2 vs baseline 6.4 (+1.8)."*

### 4. Dynamic Habit Consistency Scoring
* **Source Location**: [`habits.js` (Lines 124–170)](file:///home/suraj/sources/ManologAI/manologai-b/src/routes/habits.js#L124-L170)

Computes habit consistency across arbitrary calendar windows ($N = 7, 30, 90$ days):
$$\text{Score} = \text{round}\left(\frac{\sum_{\text{habits}} \text{Completed Scheduled Days}}{\sum_{\text{habits}} \text{Total Scheduled Days}} \times 100\right)\%$$

---

## 🗄 Mongoose Database Schemas & Data Modeling

ManologAI uses eight dedicated MongoDB models designed with relational references and compound integrity constraints:

```
┌──────────────┐         1:N         ┌──────────────────┐
│     User     │────────────────────<│    DailyEntry    │
└──────┬───────┘                     └──────────────────┘
       │                 1:N         ┌──────────────────┐
       ├────────────────────────────<│     Emotion      │
       │                             └──────────────────┘
       │                 1:N         ┌──────────────────┐
       ├────────────────────────────<│   TimeTracker    │
       │                             └──────────────────┘
       │                 1:N         ┌──────────────────┐
       ├────────────────────────────<│    LifeRating    │
       │                             └──────────────────┘
       │                 1:N         ┌──────────────────┐
       ├────────────────────────────<│      Habit       │
       │                             └──────────────────┘
       │                 1:1         ┌──────────────────┐
       ├────────────────────────────<│    Timetable     │
       │                             └──────────────────┘
       │                 1:N         ┌──────────────────┐
       └────────────────────────────<│       Pad        │
                                     └──────────────────┘
```

### Schema Definitions

#### 1. `DailyEntry` Schema ([`dailyEntry.js`](file:///home/suraj/sources/ManologAI/manologai-b/src/models/dailyEntry.js))
```javascript
{
  user:        { type: ObjectId, ref: 'User', required: true },
  date:        { type: Date, required: true },
  text:        { type: String, default: "" },
  rating:      { type: Number, min: 0, max: 10, default: null },
  metrics:     { type: Object, default: {} },
  tags:        { type: [String], default: [] },
  lockedUntil: { type: Date, default: () => Date.now() + 24*60*60*1000 },
  createdAt:   { type: Date, default: Date.now }
}
// Compound Unique Index:
dailyEntrySchema.index({ user: 1, date: 1 }, { unique: true });
```

#### 2. `Emotion` Schema ([`emotions.js`](file:///home/suraj/sources/ManologAI/manologai-b/src/models/emotions.js))
```javascript
{
  user:        { type: ObjectId, ref: 'User', required: true },
  date:        { type: Date, required: true },
  emotion:     { type: String, enum: ['happy', 'calm', 'neutral', 'sad', 'stressed', 'angry', 'tired', 'excited'], required: true },
  lockedUntil: { type: Date, default: () => Date.now() + 24*60*60*1000 },
  createdAt:   { type: Date, default: Date.now },
  updatedAt:   { type: Date, default: Date.now }
}
// Compound Unique Index:
emotionSchema.index({ user: 1, date: 1 }, { unique: true });
```

#### 3. `TimeTracker` Schema ([`timeTracker.js`](file:///home/suraj/sources/ManologAI/manologai-b/src/models/timeTracker.js))
```javascript
{
  user:      { type: ObjectId, ref: 'User', required: true },
  date:      { type: Date, required: true },
  sleep:     { type: Number, min: 0, default: 0 },
  screen:    { type: Number, min: 0, default: 0 },
  workStudy: { type: Number, min: 0, default: 0 },
  expense:   { type: Number, min: 0, default: 0 },
  locked:    { type: Boolean, default: false }
}
// Compound Unique Index:
timeTrackerSchema.index({ user: 1, date: 1 }, { unique: true });
```

#### 4. `LifeRating` Schema ([`lifeRating.js`](file:///home/suraj/sources/ManologAI/manologai-b/src/models/lifeRating.js))
```javascript
{
  user:    { type: ObjectId, ref: 'User', required: true },
  date:    { type: Date, required: true },
  ratings: {
    partner:             { type: Number, min: 0, max: 10, default: null },
    familyFriends:       { type: Number, min: 0, max: 10, default: null },
    health:              { type: Number, min: 0, max: 10, default: null },
    finances:            { type: Number, min: 0, max: 10, default: null },
    career:              { type: Number, min: 0, max: 10, default: null },
    physicalEnvironment: { type: Number, min: 0, max: 10, default: null },
    funRecreation:       { type: Number, min: 0, max: 10, default: null },
    personalGrowth:      { type: Number, min: 0, max: 10, default: null }
  }
}
// Compound Unique Index:
lifeRatingSchema.index({ user: 1, date: 1 }, { unique: true });
```

#### 5. `Habit` Schema ([`habit.js`](file:///home/suraj/sources/ManologAI/manologai-b/src/models/habit.js))
```javascript
{
  user:          { type: ObjectId, ref: 'User', required: true },
  name:          { type: String, required: true, maxlength: 60 },
  frequency:     { type: String, enum: ['daily', 'weekly', 'custom'], default: 'daily' },
  customDays:    [{ type: String, enum: ['monday','tuesday','wednesday','thursday','friday','saturday','sunday'] }],
  currentStreak: { type: Number, default: 0 },
  longestStreak: { type: Number, default: 0 },
  history:       [{ date: { type: Date, required: true }, completed: { type: Boolean, default: false } }]
}
```

#### 6. `User` Schema ([`user.js`](file:///home/suraj/sources/ManologAI/manologai-b/src/models/user.js))
```javascript
{
  email:             { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash:      { type: String, required: true },
  firstName:         { type: String, trim: true },
  lastName:          { type: String, trim: true },
  profilePicture:    { url: String, publicId: String },
  country:           { type: String },
  currency:          { type: String, uppercase: true, minlength: 3, maxlength: 3 },
  pushSubscriptions: [{ endpoint: String, keys: { p256dh: String, auth: String } }],
  reminderSettings:  {
    habits:   { enabled: Boolean, time: String },
    journal:  { enabled: Boolean, time: String },
    tracking: { enabled: Boolean, time: String },
    dailyLog: { enabled: Boolean, time: String }
  },
  sessions:          [{ token: String, userAgent: String, ip: String, lastActive: Date }]
}
```

---

## 📡 REST API Specification & Endpoints Matrix

All endpoints are hosted at prefix `/api` (or directly proxied by Vite in development).

| Domain | HTTP Method | Endpoint | Auth | Description |
| :--- | :---: | :--- | :---: | :--- |
| **Auth** | `POST` | `/auth/signup` | ❌ | Create new account, salt password, return JWT cookies |
| **Auth** | `POST` | `/auth/login` | ❌ | Authenticate email/password, issue 15m access + 7d refresh token |
| **Auth** | `POST` | `/auth/refresh` | ❌ | Rotate access token via valid `refreshToken` cookie |
| **Auth** | `POST` | `/auth/logout` | 🔒 | Invalidate active session and clear client cookies |
| **Auth** | `DELETE`| `/auth/sessions/:id` | 🔒 | Revoke a specific active multi-device session |
| **Profile** | `GET` | `/profile/me` | 🔒 | Get authenticated user profile, stats, and settings |
| **Profile** | `PATCH` | `/profile/me` | 🔒 | Update user name, country, and currency |
| **Profile** | `PATCH` | `/profile/me/profile-picture` | 🔒 | Multipart image upload via Multer $\rightarrow$ Cloudinary |
| **Diary** | `POST` | `/diary` | 🔒 | Upsert daily diary entry (Enforces $\le \text{Today}$ & 24h lock) |
| **Diary** | `GET` | `/diary/:date` | 🔒 | Fetch single day diary entry by `YYYY-MM-DD` |
| **Diary** | `GET` | `/diary/range?from=...&to=...` | 🔒 | Fetch time-series entries across date window |
| **Emotions**| `POST` | `/emotions` | 🔒 | Log daily emotion check-in (1 of 8 quantized states) |
| **Emotions**| `GET` | `/emotions` | 🔒 | Get recent emotion entries |
| **Emotions**| `GET` | `/emotions/range?from=...&to=...` | 🔒 | Retrieve emotion history for longitudinal analysis |
| **Habits** | `POST` | `/habits` | 🔒 | Create a new habit with custom frequency schedule |
| **Habits** | `GET` | `/habits` | 🔒 | List user habits with streaks and historical records |
| **Habits** | `POST` | `/habits/:id/toggle` | 🔒 | Toggle completion for a specific calendar date |
| **Habits** | `GET` | `/habits/score?days=7`| 🔒 | Calculate dynamic habit adherence score ($0\text{--}100\%$) |
| **Time** | `POST` | `/timeTracker` | 🔒 | Log sleep, screen, study hours, and daily expenses |
| **Time** | `GET` | `/timeTracker/:date` | 🔒 | Get single date breakdown |
| **Time** | `GET` | `/timeTracker/range?from=...` | 🔒 | Range telemetry for scatter plots and trendlines |
| **Ratings** | `POST` | `/life-ratings` | 🔒 | Record weekly 8-dimension Wheel of Life ratings |
| **Ratings** | `GET` | `/life-ratings/range?from=...` | 🔒 | Fetch ratings history for baseline calculation |
| **Pads** | `POST` | `/pads` | 🔒 | Create structured pad (Goals, Books, Ideas, Tasks) |
| **Pads** | `GET` | `/pads/:padType` | 🔒 | Fetch pads by category with completion counters |
| **Timetable**| `GET` | `/timetable` | 🔒 | Fetch user weekly timetable matrix |
| **Timetable**| `PUT` | `/timetable/blocks` | 🔒 | Add/update time block with real-time overlap checking |
| **Push** | `POST` | `/notifications/subscribe` | 🔒 | Register Web Push subscription endpoint & keys |
| **Push** | `PATCH` | `/notifications/settings` | 🔒 | Update daily alert schedules and toggles |
| **Push** | `POST` | `/notifications/test` | 🔒 | Dispatch immediate test VAPID push notification |

---

## 🔒 Security Engineering & Data Integrity

1. **Dual-Token Authentication Architecture**:
   * **Access Token**: Short lifespan ($15$ minutes) signed with `JWT_SECRET`. Contains minimal payload (`{ userId }`).
   * **Refresh Token**: Long lifespan ($7$ days) signed with `REFRESH_SECRET`. Stored inside user document `sessions` array.
   * **Cookie Hardening**: Dispatched with `httpOnly: true` (inaccessible to JavaScript `document.cookie`, defeating XSS token theft), `SameSite: Lax` (mitigating CSRF), and `path: '/'`.

2. **24-Hour Temporal Integrity Lock**:
   * Behavioral self-reports are prone to retrospective fabrication.
   * The API middleware rejects any log submission where $\text{Timestamp} > \text{CurrentMidnight}$ (*Future date prevention*) or where entry creation date is older than 24 hours.
   * Guarantees that historical datasets remain an authentic reflection of actual daily behavior.

3. **Rate Limiting & Input Sanitization**:
   * Password hashing via `bcrypt` using 10 salt rounds ($2^{10}$ key-derivation iterations).
   * Request sanitization ensuring numbers are non-negative and hours conform to diurnal constraints ($\text{Sleep} + \text{Screen} + \text{Study} \le 24$).

4. **Multi-Device Session Revocation & Pruning**:
   * Users can inspect all active logins in the Profile interface (User Agent string, IP address, Last Active timestamp).
   * Supports selective session termination (`DELETE /auth/sessions/:id`) and global revocation (`DELETE /auth/sessions/others`).

5. **Automatic Dead-Subscription Pruning**:
   * In [`pushNotificationService.js`](file:///home/suraj/sources/ManologAI/manologai-b/src/services/pushNotificationService.js), if the browser push endpoint returns HTTP `410 Gone` or HTTP `404 Not Found`, the worker automatically executes an atomic `$pull` on `user.pushSubscriptions` to maintain clean subscriber tables.

---

## 📱 Progressive Web App & VAPID Push Engine

### Progressive Web App (PWA) Capabilities
* **Full-Screen Standalone Execution**: Includes a Web App Manifest (`manifest.webmanifest`) configured with `display: standalone`, eliminating browser URL bars on iOS and Android.
* **Offline Asset Precaching**: Powered by Workbox and `vite-plugin-pwa`. JavaScript chunks, stylesheet bundles, and web fonts are cached locally for instantaneous load times even on slow 3G networks.
* **Responsive Ergonomics**: Automatically transitions between a fixed desktop productivity sidebar and an thumb-friendly mobile bottom tab bar.

### Standards-Based VAPID Web Push
* Implements the **Voluntary Application Server Identification (VAPID)** protocol (RFC 8291 and RFC 8292).
* **Zero Third-Party Trackers**: No proprietary Firebase/OneSignal client SDKs injected into the frontend. Everything communicates through standard W3C Push API and Service Worker interfaces.
* **Encrypted Push Handshake**:
  1. Frontend converts base64 VAPID public key into `Uint8Array`.
  2. Calls `pushManager.subscribe({ userVisibleOnly: true, applicationServerKey })`.
  3. Returns client `p256dh` and `auth` public curve keys to the backend.
  4. Backend signs messages using Elliptic Curve Digital Signature Algorithm (ECDSA) on curve `P-256`.

---

## 📁 Repository Structure

```
ManologAI/
├── manologai-b/                           # Backend Application Service
│   ├── src/
│   │   ├── config/
│   │   │   ├── cloudinary.js              # Cloudinary SDK credentials & storage
│   │   │   ├── currency.js                # ISO country-to-currency mapper
│   │   │   └── database.js                # Mongoose connection with retry logic
│   │   ├── middleware/
│   │   │   └── auth.js                    # JWT extraction & identity middleware
│   │   ├── models/                        # Mongoose schemas & compound indexes
│   │   │   ├── dailyEntry.js              # Journal diary model
│   │   │   ├── emotions.js                # Discrete emotions model
│   │   │   ├── habit.js                   # Habit schedules & streak history
│   │   │   ├── lifeRating.js              # 8-domain Wheel of Life model
│   │   │   ├── pad.js                     # Structured pads (goals, books, tasks)
│   │   │   ├── timeTracker.js             # Sleep, screen, work, expense model
│   │   │   ├── timetable.js               # Weekly timetable block model
│   │   │   └── user.js                    # User account, sessions, alerts model
│   │   ├── routes/                        # REST API domain routers
│   │   │   ├── auth.js                    # Signup, login, refresh, sessions
│   │   │   ├── diary.js                   # Daily diary endpoints
│   │   │   ├── emotions.js                # Emotion tracking endpoints
│   │   │   ├── goals.js                   # User metric targets
│   │   │   ├── habits.js                  # Habit management & score calculation
│   │   │   ├── lifeRatings.js             # Wheel of Life ratings endpoints
│   │   │   ├── notifications.js           # Push subscription & test triggers
│   │   │   ├── pads.js                    # Pads CRUD & task checklist toggles
│   │   │   ├── profile.js                 # User profile, photo uploads, deletion
│   │   │   ├── timeTracker.js             # Time & financial tracker endpoints
│   │   │   └── timetable.js               # Timetable CRUD with conflict detection
│   │   └── services/
│   │       └── pushNotificationService.js # 60s cron worker & RFC 8291 sender
│   ├── app.js                             # Express initialization & middleware stack
│   ├── package.json                       # Backend dependencies & scripts
│   └── .env.local                         # Backend private credentials
│
├── manologai-f/                           # Frontend Client Service
│   ├── src/
│   │   ├── components/                    # UI widgets, layout shells, skeletons
│   │   │   ├── AppLayout.jsx              # Main authenticated layout shell
│   │   │   ├── AppNavbar.jsx              # Desktop sidebar & mobile navigation
│   │   │   ├── AnalyticsPreview.jsx       # Landing page interactive charts
│   │   │   └── ui/                        # Reusable Radix & Tailwind components
│   │   ├── context/                       # Shared React Context providers
│   │   │   ├── AuthContext.jsx            # User authentication state & methods
│   │   │   ├── ThemeContext.jsx           # Dark / Light theme management
│   │   │   └── SaveAlertContext.jsx       # Non-intrusive save notifications
│   │   ├── lib/                           # Utility libraries & service wrappers
│   │   │   ├── api.js                     # Axios instance with auto-refresh retry
│   │   │   ├── NotificationService.js     # W3C PushManager registration wrapper
│   │   │   └── utils.js                   # Classnames merging (clsx + twMerge)
│   │   ├── pages/                         # Route view pages
│   │   │   ├── AnalyticsPage.jsx          # Correlation engine & Recharts visualizations
│   │   │   ├── DashboardPage.jsx          # Daily habit, mood, and logging dashboard
│   │   │   ├── JournalPage.jsx            # Diary notepad with PDF export
│   │   │   ├── TrackPage.jsx              # Time, habits, and life ratings logging
│   │   │   ├── OrganisePage.jsx           # Pads, timetable, and goal checklists
│   │   │   ├── ProfilePage.jsx            # Sessions, push settings, account deletion
│   │   │   ├── LoginPage.jsx              # Login view
│   │   │   └── SignupPage.jsx             # Account registration view
│   │   ├── sw.js                          # Service worker push and caching logic
│   │   ├── App.jsx                        # React Router configuration
│   │   └── index.css                      # Tailwind CSS v4 setup & theme variables
│   ├── vite.config.js                     # Vite build configuration & API proxy
│   ├── package.json                       # Frontend dependencies & scripts
│   └── .env.local                         # Frontend environment configuration
│
├── presentation.html                      # Academic presentation HTML (9 widescreen slides)
├── ManologAI_Presentation.pdf             # Compiled academic presentation PDF
├── test_integration.mjs                   # 16-Scenario Automated End-to-End Test Suite
└── README.md                              # Comprehensive project documentation
```

---

## 🔑 Environment Variables Setup

### 1. Backend (`manologai-b/.env.local`)
Create `manologai-b/.env.local` with the following variables:

```ini
# Application Port & Database
PORT=5000
MONGO_URI=mongodb://localhost:27017/manologai

# Cryptographic Keys (Generate with: openssl rand -base64 32)
JWT_SECRET=your_jwt_access_secret_key_minimum_32_characters_long
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key_minimum_32_characters_long

# Cloudinary Storage (For Profile Photo Uploads)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# VAPID Web Push Keys (Generate with: npx web-push generate-vapid-keys)
VAPID_PUBLIC_KEY=BHhCpbsvqOX-o5RsQoKbIHwWlXTbGuRPK1gYoZuHRkz1ipfT-ArLZ5l5bQxpGYcqE_O3YVcbYYycZu4TNuLbqJY
VAPID_PRIVATE_KEY=your_vapid_private_key_here
VAPID_SUBJECT=mailto:admin@manolog.ai
```

### 2. Frontend (`manologai-f/.env.local`)
Create `manologai-f/.env.local`:

```ini
# Public VAPID Key for Browser Subscription Handshake
VITE_VAPID_PUBLIC_KEY=BHhCpbsvqOX-o5RsQoKbIHwWlXTbGuRPK1gYoZuHRkz1ipfT-ArLZ5l5bQxpGYcqE_O3YVcbYYycZu4TNuLbqJY

# Optional: In development, Vite automatically proxies /api to http://localhost:5000
# VITE_API_URL=http://localhost:5000/api
```

---

## 🛠 Installation & Getting Started

### Prerequisites
* **Node.js**: Version $\ge 18.0.0$ (`node -v`)
* **npm**: Version $\ge 9.0.0$ (`npm -v`)
* **MongoDB**: Active local daemon on port `27017` or a remote MongoDB Atlas connection string.

### Step 1: Clone the Repository
```bash
git clone https://github.com/surajbiswas367/ManologAI.git
cd ManologAI
```

### Step 2: Setup and Launch the Backend
```bash
cd manologai-b
npm install
npm run dev
```
* Backend server boots on **`http://localhost:5000`**.
* MongoDB connection initializes and push scheduler starts.

### Step 3: Setup and Launch the Frontend
In a separate terminal:
```bash
cd manologai-f
npm install
npm run dev
```
* Vite development server boots on **`http://localhost:5174`** (or `5173`).
* Requests to `/api/*` are automatically proxied to port `5000`.

---

## 🧪 Testing & Quality Verification

ManologAI features an end-to-end automated integration test suite ([`test_integration.mjs`](file:///home/suraj/sources/ManologAI/test_integration.mjs)) covering all critical workflows without third-party testing dependencies:

```bash
# Run the complete test suite against local servers:
node test_integration.mjs
```

### Verified Test Matrix
```text
=== ManologAI Integration Test Suite ===
✓  1. Health check & Root API availability
✓  2. User Signup with auto-session issuance
✓  3. User Login & HttpOnly cookie verification
✓  4. Profile Retrieval & country currency auto-assignment
✓  5. Profile Update & Preference mutation
✓  6. Diary Entry Creation with tag support
✓  7. 24-Hour Temporal Integrity Lock (Future entry rejection)
✓  8. Emotion Logging with 8-scale valence quantization
✓  9. Time Tracking (Sleep, Screen, Study, Expense)
✓ 10. Time Constraint Validation (Diurnal sum <= 24h)
✓ 11. Habit Creation with custom frequency schedules
✓ 12. Habit Toggle & Dynamic Streak Calculation
✓ 13. Habit Adherence Score Algorithm (GET /habits/score)
✓ 14. Wheel of Life 8-Domain Ratings Range Logging
✓ 15. Timetable Weekly Block Conflict Detection
✓ 16. VAPID Push Subscription Registration & Alert Dispatch
===================================================
Summary: 16 / 16 Scenarios Passed (100% Success Rate)
```

### Code Quality Verification
* **ESLint Verification**: `npm run lint` inside `manologai-f` completes with **0 errors and 0 warnings**.
* **Browser CDP Diagnostics**: Headless Chrome DevTools Protocol inspection confirms **0 uncaught exceptions, 0 runtime errors, and 0 console warnings** across all views.

---

## 🎓 Academic Defense & Viva Q&A Guide

Common questions during university vivas/project evaluations and their structured answers:

### Q1: Why is this platform called "ManologAI" if it doesn't call an external LLM API like OpenAI or Gemini?
> **Answer**: The name *ManologAI* refers to **Deterministic Behavioral Intelligence**. Rather than relying on non-deterministic generative models that can hallucinate patterns, ManologAI applies algorithmic statistical regression—specifically the **Pearson Correlation Coefficient ($r$)** and **Counterfactual Baseline Analysis ($\Delta$)**—to discover empirical relationships between a user's sleep, screen time, study habits, and mood. Slide 9 outlines the architectural roadmap for on-device local LLM integration for conversational journaling summaries.

### Q2: How does the system prevent users from retroactively falsifying their habits or journal entries?
> **Answer**: Through the **24-Hour Temporal Integrity Lock**. The API middleware inspects incoming entry dates against the server's local midnight timestamp. Requests with future dates are blocked with HTTP `400 Bad Request`, and attempts to mutate entries older than 24 hours are rejected with HTTP `403 Forbidden`. Furthermore, MongoDB enforces a compound unique index `{ user: 1, date: 1 }`, ensuring historical entries cannot be duplicated or overwritten.

### Q3: How do Web Push notifications work without Google Firebase or OneSignal SDKs?
> **Answer**: ManologAI uses the native W3C **VAPID Web Push Protocol** (RFC 8291 and RFC 8292). The backend signs outgoing payloads using an Elliptic Curve Digital Signature (ECDSA on curve `P-256`) with a private key. The browser's native `PushManager` registers directly with the platform's native push service (e.g., Google FCM or Mozilla Autopush), waking up the browser's Service Worker (`sw.js`) even when the web application is completely closed.

### Q4: How is user session security managed across multiple devices?
> **Answer**: Using a **Dual-Token JWT Rotation Architecture**. The short-lived access token ($15$ minutes) and long-lived refresh token ($7$ days) are stored in `httpOnly`, `SameSite: Lax` cookies, protecting them against XSS and CSRF attacks. Active sessions are tracked in the database, allowing users to inspect device agents, IP addresses, and revoke individual sessions on demand.

---

## 🚀 Future Engineering Roadmap

1. **On-Device Local LLM Integration**: Incorporating WebLLM / Ollama for privacy-preserving, on-device natural language diary summaries and proactive coaching nudges without sending private reflections to cloud servers.
2. **Passive Wearables Telemetry Sync**: Integrating Google Health Connect and Apple HealthKit REST APIs for automated background ingestion of sleep stages, heart-rate variability (HRV), and step counts.
3. **CRDT Peer-to-Peer Synchronization**: Implementing Conflict-free Replicated Data Types (CRDTs) to enable fully decentralized offline multi-device synchronization.

---

## 📊 Presentation Deliverables

The repository includes a 9-slide academic project presentation in 16:9 widescreen format designed for university project reviews:
* **Presentation Source**: [`presentation.html`](./presentation.html)
* **Compiled PDF**: [`ManologAI_Presentation.pdf`](./ManologAI_Presentation.pdf)

To open the presentation:
```bash
xdg-open ManologAI_Presentation.pdf
```

---

## 📄 License & Attribution
Developed for academic assessment at **Guru Ghasidas Vishwavidyalaya, Bilaspur (C.G.)**, Department of Information Technology, B.Tech 7th Semester (Session 2026–2027). All rights reserved.
