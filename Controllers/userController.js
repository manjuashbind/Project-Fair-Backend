//This file contains all backend logic

const {json}=require('express');
//mongodb schema
const users=require('../Models/userSchema')
//import jwt tokn
const jwt=require('jsonwebtoken')


//Register Logic
exports.register=async(req,res)=>{
    console.log("inside register function");

    const{username,email,password,github,link}=req.body
    console.log(username,email,password,github,link);
    try{

                //if check the email is already in db ->user already regiaterd
        const existingUser=await users.findOne({email})
        if(existingUser){
            res.status(401).json("User Already Registered")
        }
        else{
            const newUser=await users({
                username,email,password,github,link,profile:""
            })
            await newUser.save()//save data to databaseres
            res.status(200).json("User registration Successfull")
        }
    }
    catch(err){
        res.status(500).json("Server error"+ err.message)
    }

    console.log(`${username} ${email} ${password} ${github} ${link}`);
    // res.status(200).json("Register request Received")
}


// login logic

exports.login=async(req,res)=>{
    const {email,password}=req.body
    try{
        const user=await users.findOne({email,password})
        if(user){
            //token generation = jwt variable.sign(payload ,secretkey)-----sign is a method
            const token=jwt.sign({userId:user._id},"superkey2024") //_id is the unique key that mongodb creates for each document

            console.log(token);
            res.status(200).json({user,token})
        }
        else{
            res.status(404).json("Invalid Login")
        }
    }
    catch(err){
        res.status(500).json("Server error :" + err.message)

    }
}