const express=require('express');
const {validationresult}=require('express-validator');
const jwt=require('jsonwebtoken');
const Employee = require('../model/empolyee');

module.exports=(req,res,next)=>{
    const authheader=req.get('Authorization');
    console.log(authheader);
    if(!authheader){
        const err=new Error('Not Authenticated');
        throw err;
    }

    const token=authheader.split(' ')[1];
    let decodetoken;
    try {
        decodetoken=jwt.verify(token,'authecatedapp');
        
    } catch (error) {
       console.log(error);
    }

    req.userid=decodetoken.id;
    Employee.findByPk(req.userid).then((user)=>{
        req.user=user;
        next();
    }).catch(err=>{
        console.log(err);
    })

}