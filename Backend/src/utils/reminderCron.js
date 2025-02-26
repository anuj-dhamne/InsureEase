import cron from "node-cron";
import { checkAndSendReminder } from "../controllers/reminder.controller.js";
// Schedule the function to run every day at 9 AM
cron.schedule("0 9 * * *", async () => {
  console.log("🚀 Running Reminder Check at 9 AM...");
  checkAndSendReminder();
});
