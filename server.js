const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const bodyParser = require('body-parser')
const connection = require('./sql')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const app = express()
dotenv.config()
app.use(bodyParser.urlencoded({
    extended:true
}))

app.use(cors())
app.use(bodyParser.json());
app.use(express.json())
app.use(cookieParser())
// app.use(session({
//     secret:process.env.SECRET,
//     resave:true,
//     saveUninitialized:true
// }))

//routes
const product = require('./routes/product')
app.use('/admin/',product)
const auth = require('./routes/auth')
app.use('/admin',auth)

connection.connect((err)=>{
    if(err){
        throw Error(`Error connecting to database ` + err)

    }
    console.log('Database connected')
})

app.listen(process.env.PORT,()=>{

    console.log(`Server running on ${process.env.PORT}`)

})