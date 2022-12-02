const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const regiserSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phnumber:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        unique:true
    },
    gender:{
        type:String
    }
})

regiserSchema.pre("save",async function(next){
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

const register = new mongoose.model("Register",regiserSchema);

module.exports = register;