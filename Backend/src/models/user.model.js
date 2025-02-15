import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true,
        index:true
    },
    name:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true
    },
    avator:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:[true,"Password is Required"],
    },
    budgetAmount:{
        type:Number,
        required:true,
    },
    expendAmount:{
        type:Number,
    },
    refreshToken:{
        type:String,
    }

},{timestamps:true});


// password encryption using bcrypt
userSchema.pre("save",async function (next){
    if(!this.isModified("password")) return next();

    this.password=await bcrypt.hash(this.password,10);
    next();
})
// function for comparing the entered password with paswword save in database
userSchema.methods.isPasswordCorrect=async function (password){
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateAccessToken=function (){
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
userSchema.methods.generateRefreshToken=function (){
    return  jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:process.env.REFRESH_TOKEN_EXPIRY}
    )
}
export const User=new mongoose.model("User",userSchema);