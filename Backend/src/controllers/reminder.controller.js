import Reminder from "../models/reminder.model.js"
import { User } from "../models/user.model.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import sendEmail from "../utils/sendEmail.js"
// import corn from "node-cron"

// Creating reminder 
const createReminder = async (userId, policyId, renewalDate) => {
    if (!userId || !policyId || !renewalDate) {
        throw new ApiError(400, "Fields required in createReminder function!");
    }

    const reminderDate = new Date(renewalDate);
    reminderDate.setDate(reminderDate.getDate() - 7); // Set reminder 7 days before renewal

    if (!reminderDate) {
        throw new ApiError(500, "Date not created!");
    }

    const reminder = await Reminder.create({
        userId,
        policyId,
        reminderDate,
    });

    if (!reminder) {
        throw new ApiError(500, "Reminder is not created!");
    }

    return reminder;
};

// check and submit reminder 
const checkAndSendReminder=asyncHandler(async(req,res)=>{
    const today =new Date().setHours(0,0,0,0);
    const reminders=await Reminder.find({reminderDate:{$lte:today},isSent:false});

    for (let reminder of reminders){
        const user = await User.findById(reminder.userId);

        if(!user) continue;

        await sendEmail(user.email,"Policy Renewal Reminder",`Hello ${user.name},Your policy is due for renewal on ${reminder.reminderDate.toDateString()}.`);

        reminder.isSent=true;
        await reminder.save();
    }
    console.log("Reminder sent Successfully");
})

// Get all reminder for user 
const getUserReminder=asyncHandler(async(req,res)=>{
    const userId=req.user._id;

    const reminders=await Reminder.find({userId,isSent:false}).populate("policyId");

    return res.status(200).json(new ApiResponse(200,reminders,"All reminders !"));
})

// updating reminder
const updateReminder=asyncHandler(async(req,res)=>{

})

// delete reminder 
const deleteReminder=asyncHandler(async(req,res)=>{

})

export {createReminder,checkAndSendReminder,getUserReminder};