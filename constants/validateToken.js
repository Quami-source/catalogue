const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const express = require('express').Router

dotenv.config()

const validateToken = async(req,res,next) => {
    const accessToken = req.cookies['access-token']

    if(!accessToken){
        return res.status(400).json({error:'Not authenticated'})
    }
    try{
        const validToken = jwt.verify(accessToken,process.env.SECRET)
        if(validToken){
            req.authenticated = true
            return next
        }
    }catch(e){
        return res.status(400).json({error:e})
    }
}

module.exports = {validateToken}