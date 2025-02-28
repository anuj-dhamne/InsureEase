import mongoose from "mongoose"

const purchaseSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    policyId:{
        type:String,
        required:true,
    },
    provider_id:{
        type:String,
        required:true,
    },
    purchaseDate:{
        type:Date,
        default:Date.now(),
    },
    renewalDate:{
        type:Date,
        required:true,
    },
    premiumAmount:{
        type:Number,
        required:true
    },
    paymentStatus:{
        type:String,
        enum:["Pending","Completed","Failed"],
        default:"Pending"
    },
    // premiumPaid:{
    //     type:Boolean,
    //     default:false,
    // },
    status :{
        type:String,
        enum: ["Active", "Expired", "Cancelled","Pending"],
        default: "Active",
    },
    documents: [
        {
          filename: { type: String, required: true },
          url: { type: String, required: true },
        }
      ]
},{timestamps:true});

const Purchase = mongoose.model("Purchase",purchaseSchema);

export default Purchase;