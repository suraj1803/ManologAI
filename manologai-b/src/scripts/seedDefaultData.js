const dotenvPath = process.env.DOTENV_CONFIG_PATH || ".env.local";
require("dotenv").config({ path: dotenvPath, override: dotenvPath === ".env.local" });
const mongoose = require("mongoose");
const connectDB = require("../config/database");
const User = require("../models/user");
const { seedUserData } = require("../services/seedDataService");

async function main() {
  console.log("--------------------------------------------------");
  console.log("🌱 ManologAI — Default Sample Data Seeder");
  console.log("--------------------------------------------------");

  try {
    await connectDB();
    console.log(" Connected to MongoDB successfully.");

    const targetEmail = process.argv[2];
    let query = { isDeleted: false };
    if (targetEmail) {
      query.email = targetEmail.toLowerCase().trim();
      console.log(` Target user filter: ${targetEmail}`);
    }

    const users = await User.find(query);
    if (users.length === 0) {
      console.log("⚠️ No matching users found in database to seed.");
      process.exit(0);
    }

    console.log(` Found ${users.length} user(s). Beginning default data seeding...\n`);

    for (const user of users) {
      console.log(`▶ Seeding data for: ${user.firstName || "User"} (${user.email}) [ID: ${user._id}]...`);
      const result = await seedUserData(user._id, { force: true });
      console.log(`   ${result.message}`);
      console.log(`   - Telemetry records: ${result.counts?.telemetryDays} consecutive days`);
      console.log(`   - Daily journal entries: ${result.counts?.journalEntries} entries`);
      console.log(`   - Active habits: ${result.counts?.habits} habits with historical streaks`);
      console.log(`   - Timetable blocks: ${result.counts?.timetableBlocks} weekly scheduled blocks`);
      console.log(`   - Idea & Goal pads: ${result.counts?.pads} categorized pads`);
      console.log("");
    }

    console.log("✨ All default sample data seeded successfully! All graphs and telemetry dashboards are now populated.");
  } catch (error) {
    console.error("❌ Seeding failed with error:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log(" Disconnected from database.");
    process.exit(0);
  }
}

main();
