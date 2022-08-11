const mongoose = require('mongoose')

const product = mongoose.Schema({
    productName:{
        type:String,
        
    },
    imagePath:{
        type:Buffer,
      
    },
    productPrice:{
        type:Number,
        
    }
})

module.exports = mongoose.model('Catalogue',product)