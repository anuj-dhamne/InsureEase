import {Router} from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { checkAndSendReminder, createRemider, getUserReminder } from "../controllers/reminder.controller.js";

const reminderRouter=new Router();

// create reminder route
reminderRouter.route("/create-reminder").post(createRemider);

// get all reminder route
reminderRouter.route("/all-reminders").get(verifyJWT,getUserReminder);

//check and senemail route (temporily)
reminderRouter.route("/check-send-reminder").get(checkAndSendReminder);


export default reminderRouter;