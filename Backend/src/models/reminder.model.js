import mongoose from "mongoose"

const reminderSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    policyId:{
        type:String,
        required:true,
    },
    reminderDate:{
        type:Date,
        required:true,
    },
    isSent:{
        type:Boolean,
        default : false,
    }
}, { timestamps: true });

const Reminder = mongoose.model('Reminder', reminderSchema);
export default Reminder;
