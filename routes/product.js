const routes = require('express').Router()
const connection = require('../sql')

routes.post('/add',(req,res)=>{
    const {image,name,price} = req.body
    connection.query(`INSERT INTO products (name,price,image) VALUES('${name}',${price},'${image}')`,(err)=>{
        if(err){
            console.log('Error inserting data into data '+err)
            res.send({
                message:"Inserting products failed",
                body:err,
                success:false
            })
            return
        }
        res.status(200).send({
            message:"Successfully added products",
            body:null,
            success:true
        })
    })
    
})

routes.get('/products',(req,res)=>{
    
    connection.query('SELECT * FROM products',(err,data)=>{
        if(err){
            res.send({
                message:"Error getting products",
                body:err,
                success:false
            })
            throw Error("Error getting products")
        }

        res.send({
            message:"Successful getting products",
            body:data,
            success:true
        })
    })
})


module.exports = routes