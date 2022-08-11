const route = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const connection = require('../sql')
const uid = require('../constants/uid')
const dotenv = require('dotenv')
const {validateToken} = require('../constants/validateToken')

dotenv.config()

route.post('/login',(req,res)=>{
    //get inputs from front end
    const {email,password} = req.body
    connection.query(`SELECT * FROM users WHERE email='${email}'`,async(err,data,fields)=>{
        if(err){
            res.send({
                message:"Data not available or query error",
                body:err,
                success:false
            })
            return
        }
        else if(data){
            let oldPassword = data[0].user_password
            // res.send(data[0].email)
            try{
                const comparePwd = await bcrypt.compare(password,oldPassword)
                if(comparePwd){
                    const token = await jwt.sign({id:data[0].user_id},process.env.SECRET)
                    if(token){
                        res.cookie('access-token',token,{
                            maxAge:60*60*24*30*1000,
                        })
                        res.send({
                            message:"Successfully signed in",
                            token:token
                        })
                    }else{
                        res.send({
                            message:"Unable to generate token"
                        })
                    }
                }else{
                    res.send("Password is wrong")
                }
            }catch(e){
                res.send({
                    message:"Problem with bcrypt",
                    body:e,
                    success:false
                })
            }
            

            
            
        }
    })
    //hash password
    //validate with database
    //report validation results with user
})

route.get('/dashboard',validateToken,(req,res)=>{
    res.json('dashboard')
})

route.post('/signup',async(req,res)=>{
    const {email,fullname,password,role} = req.body
    const hashedPassword = await bcrypt.hash(password,10)

    connection.query(`INSERT INTO users (user_id,fullname,email,user_password,role) VALUES('${uid}','${fullname}','${hashedPassword}','${email}','${role}')`,
    (err,data)=>{
        if(err){
            res.status(404).send({
                message:"Unable to insert new user",
                body:err,
                success:false
            })
            return
        }
        res.status(200).send({
            message:"New user added to database",
            body:data,
            success:true
        })
    }
    
    )
})

module.exports = route;


//if hash successful, assign web token
                // else if(result){
                //     //req.session()
                //     jwt.sign({id:data[0].user_id},'shhhh').then((token)=>{
                //         res.cookie('access-token',token,{
                //             maxAge:60*60*24*30*1000,
                //         })
                //         res.json("logged in")
                        
                //     }).catch(e=>{
                //         return res.status(400).json({
                //             error:e,
                //             message:"JWT Error"
                //         })
                //     })
                // }