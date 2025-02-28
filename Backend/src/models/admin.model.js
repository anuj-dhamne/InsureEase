import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const adminSchema=new mongoose.Schema({
    companyName: {
        type: String,
        required: [true, "Company Name is required"],
        trim: true,
      },
      email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
      },
      phone: {
        type: String,
        required: [true, "Phone number is required"],
        trim: true,
      },
      address: {
        type: String,
        trim: true,
      },
      password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"],
      },
      termsAndConditions: {
        type: Boolean,
        required: [true, "Accepting Terms & Conditions is required"],
      },
      insuranceTypes: {
        type: [String], // Array of strings for different insurance types
        required: [true, "At least one insurance type is required"],
      },
    refreshToken:{
        type:String,
    }

},{timestamps:true});


// password encryption using bcrypt
adminSchema.pre("save",async function (next){
    if(!this.isModified("password")) return next();

    this.password=await bcrypt.hash(this.password,10);
    next();
})
// function for comparing the entered password with paswword save in database
adminSchema.methods.isPasswordCorrect=async function (password){
    return await bcrypt.compare(password,this.password);
}

adminSchema.methods.generateAccessToken=function (){
  return  jwt.sign(
        {
            _id:this._id,
             email:this.email,
             username:this.username,
             fullname:this.fullname    
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:process.env.ACCESS_TOKEN_EXPIRY}
    )
}
adminSchema.methods.generateRefreshToken=function (){
    return  jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:process.env.REFRESH_TOKEN_EXPIRY}
    )
}
export const Admin=new mongoose.model("Admin",adminSchema);