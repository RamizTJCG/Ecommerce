const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const employeSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required:true,
        trim:true
    },
    lastName:{
        type: String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    phone:{
        type:Number,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
});

employeSchema.methods.genrateAuthToken = async function(){
    try{
        const token = await jwt.sign({_id:this._id.toString()},process.env.AUTH_TOKEN);
        this.tokens = await this.tokens.concat({token:token});
        await this.save();
        return token;
    }catch(error){
        console.log('this is error part'+ error);
        res.send('this is error part'+ error);
    }
};

employeSchema.pre("save",async function(next){

    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10);
    }
    next();
});

const EmployeDetails = new mongoose.model("EmployeDetails",employeSchema);
module.exports = EmployeDetails;